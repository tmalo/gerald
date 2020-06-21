import React, { Component, Suspense } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import Routes from "./Routes";
import { LinearProgress } from "@material-ui/core";

const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Suspense fallback={<LinearProgress />}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </Suspense>
      </ThemeProvider>
    );
  }
}
