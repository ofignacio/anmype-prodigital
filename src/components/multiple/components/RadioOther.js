import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Radio, FormControlLabel, TextField } from "@material-ui/core";
import actions from "../../../actions/questions";
import { selectors } from "../../../reducers/question";

const RadioOther = ({ value, label, selected, question }) => {
  const id = useSelector(selectors.getId);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleText = () => {
    dispatch(
      actions.updateQuestion({
        question,
        answer: text.length > 0 ? text : value,
        id,
      })
    );
  };

  return (
    <Container>
      <Label value={value} control={<Radio />} label={label} />
      {selected === value && (
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
`;

const Input = styled(TextField)`
  flex: 1;
  margin: 0 5px !important;
  padding: 0 5px !important;
`;

const Label = styled(FormControlLabel)`
  width: fit-content;
`;

export default RadioOther;
