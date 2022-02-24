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
      if (
        data.filter((dt) => dt.idUser === usr.id).length > 0 &&
        dimensions.length > 0
      ) {
        let total = 0;
        let totalDimensionC = 0;
        let final = {};
        Object.assign(final, {
          id: `${usr.id}`,
          name: usr.fname,
          email: usr.email,
          phone: usr.phone,
        });
        dimensions.forEach((dimension) => {
          const result = data
            .filter((dt) => dt.idUser === usr.id)
            .find((dat) => dat.dimension === dimension.id);
          let score = result.score * dimension.multiplicator;
          total += score;
          if (dimension.id === 2 || dimension.id === 3) {
            totalDimensionC += result.score;
            return;
          }

          if (score < dimension.rookie) {
            const maturity = maturities.find((maturity) => maturity.id === 1);
            Object.assign(final, {
              [`dimension${dimension.id}score`]: "Novato",
            });
          } else if (score < dimension.initial) {
            const maturity = maturities.find((maturity) => maturity.id === 2);
            Object.assign(final, {
              [`dimension${dimension.id}score`]: "Inicial",
            });
          } else if (score < dimension.advanced) {
            const maturity = maturities.find((maturity) => maturity.id === 3);
            Object.assign(final, {
              [`dimension${dimension.id}score`]: "Avanzado",
            });
          } else {
            const maturity = maturities.find((maturity) => maturity.id === 4);
            Object.assign(final, {
              [`dimension${dimension.id}score`]: "Experto",
            });
          }
        });

        if (total < 168) {
          const maturity = maturities.find((maturity) => maturity.id === 1);
          Object.assign(final, {
            total: "Novato",
          });
        } else if (total < 336) {
          const maturity = maturities.find((maturity) => maturity.id === 2);
          Object.assign(final, {
            total: "Inicial",
          });
        } else if (total < 504) {
          const maturity = maturities.find((maturity) => maturity.id === 3);
          Object.assign(final, {
            total: "Avanzado",
          });
        } else {
          const maturity = maturities.find((maturity) => maturity.id === 4);
          Object.assign(final, {
            total: "Experto",
          });
        }

        if (dimensions.length > 0) {
          totalDimensionC = totalDimensionC * 1.58;
          const dimensionC = dimensions.find((dimension) => dimension.id === 2);
          if (totalDimensionC < dimensionC.rookie) {
            const maturity = maturities.find((maturity) => maturity.id === 1);
            Object.assign(final, {
              dimensionCscore: "Novato",
            });
          } else if (totalDimensionC < dimensionC.initial) {
            const maturity = maturities.find((maturity) => maturity.id === 2);
            Object.assign(final, {
              dimensionCscore: "Inicial",
            });
          } else if (totalDimensionC < dimensionC.advanced) {
            const maturity = maturities.find((maturity) => maturity.id === 3);
            Object.assign(final, {
              dimensionCscore: "Avanzado",
            });
          } else {
            const maturity = maturities.find((maturity) => maturity.id === 4);
            Object.assign(final, {
              dimensionCscore: "Experto",
            });
          }
        }
        questions &&
          questions[1].map((item, index) => {
            Object.assign(final, {
              [`q${index + 1}`]:
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
          });
        Object.assign(usrFinal, { [usr.id]: final });
      }
    });
    setValues(usrFinal);
  }, [users, data, dimensions, maturities, answers, questions]);

  if (values && questions) {
    return (
      <CSVLink
        filename={"Reporte Pro Digital.csv"}
        data={Object.values(values)}
        headers={[
          { label: "Id", key: "id" },
          { label: "Nombre", key: "name" },
          { label: "Correo", key: "email" },
          { label: "Teléfono", key: "phone" },
          ...questions[1].map((item, index) => ({
            label: item.question,
            key: `q${index + 1}`,
          })),
          { label: "Dimension 1", key: "dimension1score" },
          { label: "Dimension 2/3", key: "dimensionCscore" },
          { label: "Dimension 4", key: "dimension4score" },
          { label: "Dimension 5", key: "dimension5score" },
          { label: "Dimension 6", key: "dimension6score" },
          { label: "Dimension 7", key: "dimension7score" },
          { label: "Total", key: "total" },
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
