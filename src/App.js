import React, { Component, Fragment } from "react";
import { IconContext } from "react-icons";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Home, Identify } from "./pages";
import EdgeCases from "./pages/EdgeCases";
import Assets from "./pages/Assets";
import Responsive from "./pages/Responsive";

const AppRouter = () => (
  <Router>
    <Fragment>
      <Route path="/" exact component={Home} />
      <Route path="/identify-layouts-components" exact component={Identify} />
      <Route path="/edge-cases" exact component={EdgeCases} />
      <Route path="/assets" exact component={Assets} />
      <Route path="/responsive" exact component={Responsive} />
    </Fragment>
  </Router>
);

const theme = {
  colors: {
    primary: "#f6b93b",
    primary_dark: "#fa983a",
    primary_light: "#d5a973",
    mainBackground: "#e55039",
    error: "#EF5B5B",
    cocoa: "#4c3013",
    lighter: "#dad2ca",
    lightest: "#f8efe5",
    lightest_transparent: "rgba(248,239,229, 0.75)",
    grey_dark: "#3f3a36",
    grey_light: "#A6B0B5",
    grey_shadow: "rgba(102, 102, 102, 0.3)",
    blue: "rgba(30, 55, 153, 1.0)",
    blue_transparent: "rgba(30, 55, 153, 0.3)",
    bottleGreen: "rgba(56, 173, 169,1.0)",
    bottleGreen_transparent: "rgba(56, 173, 169, 0.3)"
  }
};

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
          <AppRouter />
        </IconContext.Provider>
      </ThemeProvider>
    );
  }
}

export default App;
