// Principal libraries
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

// Components
import Container from "../Container";
import RadioOther from "./components/RadioOther";

// Extras
import actions from "../../actions/questions";
import { selectors, actions as questionActions } from "../../reducers/question";

const Multiple = ({ title, options, setReady = () => {}, question }) => {
  const id = useSelector(selectors.getId);
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value && options[value.split(",", 2)[0] - 1].isJump === 1) {
      dispatch(
        questionActions.hiddeQuestions(question.id, question.jumpTo, false)
      );
    } else {
      dispatch(
        questionActions.hiddeQuestions(question.id, question.jumpTo, true)
      );
    }
  }, [value]);

  const handleChange = ({ target }) => {
    const values = target.value.split(",", 2);
    setValue(target.value);
    setReady(question.id);
    dispatch(
      actions.updateQuestion({
        question: question.id,
        answer: values[0],
        id,
      })
    );
    if (question.dimension > 0) {
      dispatch(
        questionActions.setValues({
          question: question.id,
          dimension: question.dimension,
          value: !isNaN(values[1])
            ? values[1] * question.multiplicator
            : 1 * question.multiplicator,
        })
      );
    }
    if (question.sdimension > 0) {
      dispatch(
        questionActions.setValues({
          question: question.id,
          dimension: question.sdimension,
          value: !isNaN(values[1])
            ? values[1] * question.smultiplicator
            : 1 * question.smultiplicator,
        })
      );
    }
  };

  return (
    <Container>
      <Text>{title}</Text>
      <Form component="fieldset">
        <RadioForm name="multipleChoice" value={value} onChange={handleChange}>
          {options.map((item) =>
            item.hasText === 1 ? (
              <RadioOther
                question={question.id}
                key={`${item.idQuestion}-${item.label}`}
                label={item.label}
                value={item.value}
                selected={value}
              />
            ) : (
              <Label
                key={`${item.idQuestion}-${item.label}`}
                value={item.value}
                control={<Radio />}
                label={item.label}
              />
            )
          )}
        </RadioForm>
      </Form>
    </Container>
  );
};

const Form = styled(FormControl)`
  width: 100%;
`;

const RadioForm = styled(RadioGroup)`
  width: 100%;
`;

const Label = styled(FormControlLabel)`
  width: fit-content;
`;

const Text = styled.p`
  font-family: "Roboto";
  font-weight: bold;
  font-size: 1.4rem;
`;

export default Multiple;
