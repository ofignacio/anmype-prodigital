// Principal libraries
import React, { useState } from "react";
import styled from "styled-components";
import { FormControl, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

// Components
import Container from "./Container";

// Extras
import actions from "../actions/questions";
import { selectors } from "../reducers/question";

const Write = ({ title, question, placeholder }) => {
  const id = useSelector(selectors.getId);
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);

  const handleBlur = () => {
    dispatch(actions.updateQuestion({ question: question.id, answer: value, id }));
  };

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  return (
    <Container>
      <Text>{title}</Text>
      <Form component="fieldset">
        <TextField
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form>
    </Container>
  );
};

const Form = styled(FormControl)`
  width: 100%;
`;

const Text = styled.p`
  font-family: "Roboto";
  font-weight: bold;
  font-size: 1.4rem;
`;

export default Write;
