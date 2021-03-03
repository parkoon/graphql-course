import React from "react";
import { Container } from "react-bootstrap";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ApolloProvider from "./ApolloProvider";

function App() {
  return (
    <ApolloProvider>
      <Router>
        <Container className="pt-5">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;
