// Principal libraries
import React from "react";
import styled from "styled-components";

// Components
import Container from "./Container";

const Description = ({ title, subtitle }) => (
  <Container>
    <Title>{title}</Title>

    <SubTitle>{subtitle}</SubTitle>
  </Container>
);

const Title = styled.p`
  font-family: "Roboto";
  font-size: 2rem;
  font-weight: bold;
`;

const SubTitle = styled.p`
  font-family: "Roboto";
  font-size: 1rem;
`;

export default Description;
