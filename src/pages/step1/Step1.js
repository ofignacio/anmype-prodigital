/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import styled from "styled-components";

// Components
import Multiple from "../../components/multiple/Multiple";
import Write from "../../components/Write";
import Check from "../../components/check/Check";
import actions from "../../actions/questions";
import { selectors } from "../../reducers/question";
import Valoration from "../../components/Valoration";
import Bottom from "../../components/Bottom";
import Finish from "../finish/Finish";

const Step1 = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { questions, id } = useSelector((state) => ({
    questions: selectors.getQuestions(state),
    id: selectors.getId(state),
  }));

  useEffect(() => {
    dispatch(actions.getQuestions());
  }, []);

  useEffect(() => {
    if (id === -1) {
      history.push("/");
    }
  }, [id]);

  return (
    <Body>
      <BrowserRouter>
        <Switch>
          {questions &&
            questions.map((question, index) => (
              <Route
                key={`question-${index}`}
                exact
                path={`/step${index}`}
                render={() => (
                  <Questions
                    key={`component-${index}`}
                    question={question}
                    index={index}
                    isVisible={question.isVisible}
                    length={questions.length}
                  />
                )}
              />
            ))}
          <Route exact path="/finish" component={Finish} />
        </Switch>
      </BrowserRouter>
    </Body>
  );
};

const Body = styled.div`
  text-align: center;
`;

const renderComponent = (item) => {
  if (item.isVisible === false) {
    return null;
  }
  switch (item.render) {
    case "text":
      return (
        <Write
          key={item.id}
          question={item}
          placeholder="Tu respuesta"
          title={item.question}
        />
      );
    case "valoration":
      return (
        <Valoration
          key={item.id}
          question={item}
          title={item.question}
          start={item.start}
          end={item.end}
          options={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
          ]}
        />
      );
    case "multiple":
      return (
        <Multiple
          key={item.id}
          question={item}
          options={item.options.map((option) => ({
            ...option,
            value: `${option.position},${option.score}`,
          }))}
          title={item.question}
        />
      );
    case "check":
      return (
        <Check
          key={item.id}
          question={item}
          options={item.options.map((option) => ({
            ...option,
            value: `${option.position},${option.score}`,
          }))}
          title={item.question}
        />
      );
    default:
      break;
  }
};

const Questions = ({ question, index, length }) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div key={`component-${index}`}>
      {question.map((item) => renderComponent(item))}
      <Bottom
        key={`bottom-${question.id}`}
        to={index === length - 1 ? "/finish" : `/step${index + 1}`}
        isEnd={index === length - 1}
        ready={true}
      />
    </div>
  );
};

export default Step1;
