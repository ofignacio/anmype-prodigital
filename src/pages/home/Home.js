import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { TextField, Grid as MaterialGrid } from "@material-ui/core";
import { AccountCircle, AlternateEmail, Phone } from "@material-ui/icons";
import { Redirect } from "react-router-dom";

// Components
import Container from "../../components/Container";
import Description from "../../components/Description";
import Bottom from "../../components/Bottom";
import Title from "../../components/Title";

// Extras
import actions from "../../actions/questions";
import { selectors, actions as questionActions } from "../../reducers/question";

const Home = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({ email: "", fname: "", phone: "" });
  const [redirect, setRedirect] = useState(false);
  const response = useSelector(selectors.getResponse);

  const handleClick = () => {
    dispatch(actions.createUser(values));
  };

  useEffect(() => {
    if (response === 200) {
      setRedirect(true);
      dispatch(questionActions.setResponse(0));
    }
  }, [response]);

  if (redirect) {
    return <Redirect to="/step1" />;
  }

  return (
    <Body>
      <Description title="Autodiagnóstico Digital" subtitle="" />

      <Title text="Completa los datos para iniciar el proceso" />

      <Container maxWidth="md">
        <Form noValidate autoComplete="off">
          <Grid container spacing={1} item alignItems="flex-end">
            <Grid item>
              <AlternateEmail />
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                label="Correo electrónico"
                value={values.email}
                onChange={({ target }) =>
                  setValues({ ...values, email: target.value })
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} item alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                label="Nombre"
                value={values.fname}
                onChange={({ target }) =>
                  setValues({ ...values, fname: target.value })
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} item alignItems="flex-end">
            <Grid item>
              <Phone />
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                label="Teléfono"
                value={values.phone}
                onChange={({ target }) =>
                  setValues({ ...values, phone: target.value })
                }
              />
            </Grid>
          </Grid>
        </Form>
      </Container>

      <Bottom
        ready={
          values.email.trim().length > 0 &&
          values.fname.trim().length > 0 &&
          values.phone.trim().length > 0
        }
        onClick={handleClick}
      />
    </Body>
  );
};

const Body = styled.div`
  text-align: center;
`;

const Form = styled.form`
  text-align: center;
`;

const Grid = styled(MaterialGrid)`
  margin: 10px 0 !important;
`;

export default Home;
