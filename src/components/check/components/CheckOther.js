import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Checkbox } from "@material-ui/core";
import actions from "../../../actions/questions";
import { selectors } from "../../../reducers/question";

const CheckOther = ({ label, question, value, setValue }) => {
  const id = useSelector(selectors.getId);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [oldText, setOldText] = useState("");
  const [checked, setChecked] = useState(false);

  const handleText = () => {
    const array = value;
    if (array.includes(text) || text.trim().length === 0) return;
    array.push(text);
    if (oldText.trim().length > 0) {
      const id = array.indexOf(oldText);
      if (id > -1) {
        array.splice(id, 1);
      }
    }
    setOldText(text);
    setValue([...array]);
    dispatch(
      actions.updateQuestion({ question, answer: array.toString(), id })
    );
  };

  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (!e.target.checked) {
      const array = value;
      let id = array.indexOf(oldText);
      if (id > -1) {
        array.splice(id, 1);
      } else {
        id = array.indexOf(text);
        if (id > -1) {
          array.splice(id, 1);
        }
      }
      setValue([...array]);
      dispatch(
        actions.updateQuestion({ question, answer: array.toString(), id })
      );
    } else if (text.trim().length > 0) {
      const array = value;
      if (array.includes(text) || text.trim().length === 0) return;
      array.push(text);
      setOldText(text);
      setValue([...array]);
      dispatch(
        actions.updateQuestion({ question, answer: array.toString(), id })
      );
    }
  };

  return (
    <Container>
      <Checkbox onChange={handleChange} />
      <Label>{label}</Label>
      {checked && (
        <Input
          value={text}
          onChange={(evt) => setText(evt.target.value)}
          onBlur={handleText}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

const Input = styled(TextField)`
  flex: 1;
  margin: 0 5px !important;
  padding: 0 5px !important;
`;

const Label = styled.label`
  font-family: "Roboto", sans-serif;
`;

export default CheckOther;
