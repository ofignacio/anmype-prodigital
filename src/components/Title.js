// Principal libraries
import React from "react";
import styled from "styled-components";

// Components
import Container from "./Container";

const Title = ({ text }) => (
  <Container>
    <Text>{text}</Text>
  </Container>
);

const Text = styled.p`
  font-family: "Roboto";
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0;
`;

export default Title;
