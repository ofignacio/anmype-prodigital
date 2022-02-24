import React from "react";
import styled from "styled-components";
import Container from "./Container";
import { Button, Icon, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const Bottom = ({ backTo, text, isEnd, to, onClick = () => {}, ready }) => {
  const handleClick = (e) => {
    if (ready) {
      onClick();
    }
  };

  return (
    <Container>
      <Content>
        {backTo && (
          <Link to={backTo}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Icon>arrow_back_ios</Icon>}
            >
              Volver
            </Button>
          </Link>
        )}

        <Text variant="body1" component="p">
          {text}
        </Text>

        {to ? (
          <Link to={to} onClick={handleClick}>
            <Button
              variant="contained"
              color={isEnd ? "secondary" : "primary"}
              endIcon={<Icon>arrow_forward_ios</Icon>}
              disabled={!ready}
            >
              {isEnd ? "Finalizar" : "Siguente"}
            </Button>
          </Link>
        ) : (
          <Button
            onClick={handleClick}
            variant="contained"
            color={isEnd ? "secondary" : "primary"}
            endIcon={<Icon>arrow_forward_ios</Icon>}
            disabled={!ready}
          >
            {isEnd ? "Finalizar" : "Siguente"}
          </Button>
        )}
      </Content>
    </Container>
  );
};

const Text = styled(Typography)`
  flex: 1;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: white;
`;

export default Bottom;
