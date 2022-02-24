import React from "react";
import styled, { css } from "styled-components";

const Boxes = ({ type, name }) => {
  return (
    <Container>
      <Name>{name}</Name>
      <Line>
        <Box type={type} index={1} />
        <Box type={type} index={2} />
        <Box type={type} index={3} />
        <Box type={type} index={4} />
      </Line>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 5px;
  opacity: 0.8;
`;

const Name = styled.p`
  font-family: "Roboto";
  text-align: right;
  width: 280px;
  margin: 0 5px;
  text-transform: uppercase;
  font-weight: bold;
  font-family: 0.8em;
  opacity: 0.7;
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 120px;
  height: 20px;
  margin: 0px 5px;
  border-radius: 5px;
  background-color: ${({ type }) =>
    type === 1 ? "red" : type === 2 ? "orange" : type === 3 ? "gold" : "green"};
  ${({ type, index }) =>
    type !== index &&
    css`
      background-color: gray;
      filter: grayscale(1);
    `}
`;

export default Boxes;
