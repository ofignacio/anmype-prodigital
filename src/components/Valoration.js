// Principal libraries
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";

// Components
import Container from "./Container";

// Extras
import { selectors, actions as questionActions } from "../reducers/question";
import actions from "../actions/questions";

const Valoration = ({
  title,
  options,
  start,
  end,
  question,
  setReady = () => {},
}) => {
  const dispatch = useDispatch();
  const id = useSelector(selectors.getId);
  const [value, setValue] = useState(null);

  const handleChange = ({ target }) => {
    setValue(target.value);
    setReady(question.id);
    dispatch(
      actions.updateQuestion({
        question: question.id,
        answer: target.value,
        id,
      })
    );
    if (question.dimension > 0) {
      dispatch(
        questionActions.setValues({
          dimension: question.dimension,
          value: !isNaN(target.value)
            ? target.value * question.multiplicator
            : 1 * question.multiplicator,
        })
      );
    }
    if (question.sdimension > 0) {
      dispatch(
        questionActions.setValues({
          dimension: question.sdimension,
          value: !isNaN(target.value)
            ? target.value * question.smultiplicator
            : 1 * question.smultiplicator,
        })
      );
    }
  };

  return (
    <Container>
      <Text>{title}</Text>
      <Form component="fieldset">
        <Description>{start}</Description>
        <RadioForm name="multipleChoice" value={value} onChange={handleChange}>
          {options.map((item) => (
            <Label
              key={item.label}
              value={item.value}
              control={<Radio />}
              label={item.label}
            />
          ))}
        </RadioForm>
        <Description>{end}</Description>
      </Form>
    </Container>
  );
};

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row !important;
  justify-content: center;
  align-items: center;
`;

const Description = styled.p`
  margin: 0;
  max-width: 200px;
`;

const RadioForm = styled(RadioGroup)`
  display: flex;
  flex-direction: row !important;
  justify-content: center;
  align-items: center;
  width: 350px;
`;

const Label = styled(FormControlLabel)`
  width: fit-content;
  display: flex;
  flex-direction: column-reverse;
`;

const Text = styled.p`
  font-family: "Roboto";
  font-weight: bold;
  font-size: 1.4rem;
`;

export default Valoration;
