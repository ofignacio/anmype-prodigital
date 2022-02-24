// Principal libraries
import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// Components
import Description from "../../components/Description";
import { selectors } from "../../reducers/question";

// Extras
import reduxActions from "../../actions/questions";
import Cont from "../../components/Container";
import { Button as Btn } from "@material-ui/core";

const Finish = () => {
  const { result, idUser } = useSelector((state) => ({
    result: selectors.getValues(state),
    idUser: selectors.getId(state),
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reduxActions.sendMail({ id: idUser }));
    Object.keys(result)
      .filter((result) => !isNaN(result))
      .forEach((dimension) => {
        dispatch(
          reduxActions.setResult({
            dimension,
            score: result[dimension],
            id: idUser,
          })
        );
      });
  }, []);

  return (
    <Body>
      <Description
        title="Autodiagnóstico Digital"
        subtitle="Gracias por completar el autodiagnóstico, en unos minutos recibiras por email el resultado."
      />
      <Container>
        <Text>
          <strong>ANMYPE</strong> con el apoyo de <strong>ANDE</strong> te
          brinda herramientas <storng>gratuitas y accesibles</storng> para{" "}
          <strong>potenciar tu empresa</strong> mediante la{" "}
          <strong>digitalización</strong>.
        </Text>
        <Button
          href="https://anmype.org.uy/pro-digital/"
          target="_blank"
          variant="contained"
          color="primary"
        >
          Mas información
        </Button>
      </Container>
    </Body>
  );
};

const Body = styled.div`
  text-align: center;
`;

const Text = styled.p`
  font-family: "Roboto";
  font-size: 1.2em;
  text-align: center;
`;

const Button = styled(Btn)`
  margin: 0 auto;
`;

const Container = styled(Cont)`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Finish;
