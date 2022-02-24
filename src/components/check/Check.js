// Principal libraries
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FormControl, Checkbox } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

// Components
import Container from "../Container";

// Extras
import actions from "../../actions/questions";
import { selectors, actions as questionActions } from "../../reducers/question";
import CheckOther from "./components/CheckOther";

const Check = ({ title, options, setReady = () => {}, question }) => {
  const id = useSelector(selectors.getId);
  const dispatch = useDispatch();
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (value.length > 0) {
      value.forEach((item) => {
        if (options[item - 1].isJump === 1) {
          dispatch(
            questionActions.hiddeQuestions(question.id, question.jumpTo, false)
          );
        } else {
          dispatch(
            questionActions.hiddeQuestions(question.id, question.jumpTo, true)
          );
        }
      });
    } else {
      dispatch(
        questionActions.hiddeQuestions(question.id, question.jumpTo, true)
      );
    }
  }, [value]);

  const handleChange = (e, index) => {
    const array = value;
    if (e.target.checked === true) {
      array.push(index + 1);
    } else {
      const id = array.indexOf(index + 1);
      if (id > -1) {
        array.splice(id, 1);
      }
    }
    setValue([...array]);
    setReady(question.id);
    dispatch(
      actions.updateQuestion({
        question: question.id,
        answer: array.toString(),
        id,
      })
    );
    if (question.dimension > 0) {
      dispatch(
        questionActions.setValues({
          question: question.id,
          dimension: question.dimension,
          value: !isNaN(options[index].value)
            ? options[index].value * question.multiplicator
            : 1 * question.multiplicator,
        })
      );
    }
    if (question.sdimension > 0) {
      dispatch(
        questionActions.setValues({
          question: question.id,
          dimension: question.sdimension,
          value: !isNaN(options[index].value)
            ? options[index].value * question.smultiplicator
            : 1 * question.smultiplicator,
        })
      );
    }
  };

  return (
    <Container>
      <Text>{title}</Text>
      <Form component="fieldset">
        <CheckForm>
          {options.map((item, index) =>
            item.hasText === 1 ? (
              <CheckOther
                key={`${item.idQuestion}-${item.label}`}
                value={value}
                setValue={setValue}
                question={question.id}
                label={item.label}
              />
            ) : (
              <Box key={`${item.idQuestion}-${item.label}`}>
                <Checkbox onChange={(e) => handleChange(e, index)} />
                <Label>{item.label}</Label>
              </Box>
            )
          )}
        </CheckForm>
      </Form>
    </Container>
  );
};

const Form = styled(FormControl)`
  width: 100%;
`;

const CheckForm = styled.div`
  width: 100%;
`;

const Box = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-family: "Roboto", sans-serif;
`;

const Text = styled.p`
  font-family: "Roboto";
  font-weight: bold;
  font-size: 1.4rem;
`;

export default Check;
