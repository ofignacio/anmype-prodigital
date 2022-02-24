// Principal libraries
import React from "react";
import styled from "styled-components";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// Components
import Home from "./pages/home/Home";
import Step1 from "./pages/step1/Step1";
import Container from "./components/Container";
import Result from "./components/reports/Result";
import FullResult from "./components/reports/FullResult";
import FullAnswers from "./components/reports/FullAnswers";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Body>
          <Container maxWidth="xl" withoutMargin>
            <Flex>
              <Image src="assets/images/logo.jpg" />
              <Image src="assets/images/ande.png" />
            </Flex>
          </Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/step1" component={Step1} />
            <Route exact path="/result" component={Result} />
            <Route exact path="/fullResult" component={FullResult} />
            <Route exact path="/export" component={FullAnswers} />
            <Route path="*" component={() => <Redirect to="/" />} />
          </Switch>
        </Body>
      </BrowserRouter>
    </Provider>
  );
};

const Body = styled.div`
  text-align: center;
`;

const Flex = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 300px;
`;

export default App;
