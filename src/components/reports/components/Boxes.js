import React from "react";
import styled from "styled-components";

const Type = ({ type }) => {
  if (type === 1) return <Text>Nivel: Novato</Text>;
  if (type === 2) return <Text>Nivel: Inicial</Text>;
  if (type === 3) return <Text>Nivel: Avanzado</Text>;
  if (type === 4) return <Text>Nivel: Experto</Text>;
};

const Boxes = ({ type }) => {
  return (
    <Container>
      <Type type={type} />
      <Line>
        <Box type={type} />
      </Line>
    </Container>
  );
};

const Container = styled.div`
  display: block;
`;

const Text = styled.p`
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-family: "Roboto";
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
  border-radius: 10px;
  background-color: ${({ type }) =>
    type === 1
      ? "red"
      : type === 2
      ? "orange"
      : type === 3
      ? "gold"
      : "green"};
`;

export default Boxes;
