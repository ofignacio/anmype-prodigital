import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";
import styled from "styled-components";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import CircularProgress from "@material-ui/core/CircularProgress";
import { executeAnonymous } from "../../middleware/api";
import Boxes from "./components/Boxes";
import Scale from "./components/Scale";
import Names from "./components/Names";
import { selectors } from "../../reducers/question";
import actions from "../../actions/questions";
import { useSelector, useDispatch } from "react-redux";

const Result = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [ready, setReady] = useState(false);
  const [dimensions, setDimensions] = useState([]);
  const [maturities, setMaturities] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState();
  const [que, setQue] = useState([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("id");
  const email = query.get("email");

  const questions = useSelector(selectors.getQuestions);

  useEffect(() => {
    dispatch(actions.getQuestions());
    executeAnonymous("/api/getFullResults").then((result) => {
      if (result.dimensions && result.results && result.maturities) {
        setMaturities(result.maturities);
        setData(result.results);
        setDimensions(result.dimensions);
        setAnswers(result.answers);
        setUsers(result.users);
      }
    });
  }, []);

  useEffect(() => {
    const usrFinal = {};
    users.map((usr) => {
      let total = 0;
      let totalDimensionC = 0;
      let final = {};
      Object.assign(final, {
        id: `${usr.id}`,
        name: usr.fname,
        email: usr.email,
        phone: usr.phone,
      });

      const que = [];

      questions &&
        questions.map((question, inde) => {
          question.map((item, index) => {
            que.push({
              label: item.question,
              key: `q${item.id + 1}`,
              id: item.id
            });
          });
        });

      setQue([...que]);

      questions &&
        questions.map((question) =>
          question.map((item, index) => {
            Object.assign(final, {
              [`q${item.id + 1}`]:
                answers &&
                answers
                  .filter((ans) => ans.idUser === usr.id)
                  .find((an) => an.question === `${item.id}`)
                  ? item.options.find(
                      (op) =>
                        op.position ===
                        answers
                          .filter((ans) => ans.idUser === usr.id)
                          .find((an) => an.question === `${item.id}`).answer
                    )
                    ? `${
                        item.options.find(
                          (op) =>
                            op.position ===
                            answers
                              .filter((ans) => ans.idUser === usr.id)
                              .find((an) => an.question === `${item.id}`).answer
                        ).label
                      }  (Resp: ${
                        answers
                          .filter((ans) => ans.idUser === usr.id)
                          .find((an) => an.question === `${item.id}`).answer
                      })`
                    : answers
                        .filter((ans) => ans.idUser === usr.id)
                        .find((an) => an.question === `${item.id}`).answer
                  : "",
            });
          })
        );
      Object.assign(usrFinal, { [usr.id]: final });
    });
    console.log(usrFinal);
    setValues(usrFinal);
  }, [users, data, dimensions, maturities, answers, questions]);

  if (values && questions && que) {
    return (
      <CSVLink
        filename={"Reporte.csv"}
        data={Object.values(values)}
        headers={[
          { label: "Id", key: "id" },
          { label: "Nombre", key: "name" },
          { label: "Correo", key: "email" },
          { label: "Teléfono", key: "phone" },
          ...que.map((item, index) => ({
            label: item.label,
            key: `q${item.id + 1}`,
          })),
        ]}
      >
        Descargar CSV
      </CSVLink>
    );
  }
  return null;
};

const Form = styled.div``;

const Container = styled.div`
  /* background-color: #000; */
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Row = styled.tr`
  border: 1px solid black;
`;

const THead = styled.th`
  top: 0px;
  position: sticky;
  background-color: white;
  padding: 20px 0;
`;

const Column = styled.td`
  width: 30%;
  padding: 20px 0;
`;

const ScaleRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const Title = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  text-transform: uppercase;
`;

const Box = styled.div`
  border-radius: 20px;
  box-sizing: border-box;
`;

export default Result;
