import React from "react";
import styled from "styled-components";

const Boxes = () => {
  return (
    <Container>
      <Line>
        <Name>Novato</Name>
        <Name>Inicial</Name>
        <Name>Avanzado</Name>
        <Name>Experto</Name>
      </Line>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  position: relative;
  margin: 5px;
  margin-left: 295px;
`;

const Name = styled.p`
  height: 20px;
  width: 120px;
  margin: 0 5px;
  text-align: center;
  font-family: "Roboto";
  text-transform: uppercase;
  font-weight: bold;
  font-family: 0.8em;
  opacity: 0.6;
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default Boxes;
