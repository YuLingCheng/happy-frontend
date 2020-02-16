import CookieConsent from "react-cookie-consent";
import { createBrowserHistory } from "history"; // eslint-disable-line
import React, { lazy, Suspense } from "react";
import ReactGA from "react-ga";
import { IconContext } from "react-icons";
import { Redirect } from "react-router";
import { Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import "antd/dist/antd.min.css";
import "./assets/css/index.css"; // import after to override

const LayoutGenerator = lazy(() => import("./pages/LayoutGenerator"));
const ExpertLayoutGenerator = lazy(() =>
  import("./pages/ExpertLayoutGenerator")
);

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Suspense fallback={null}>
      <Route path="/" exact render={() => <Redirect to="/dev/learn" />} />
      <Route path="/dev/learn" exact component={LayoutGenerator} />
      <Route path="/dev/advanced" exact component={ExpertLayoutGenerator} />
    </Suspense>
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
    blue: "rgba(74, 105, 189, 1.0)",
    blue_transparent: "rgba(74, 105, 189, 0.3)",
    bottleGreen: "rgba(56, 173, 169,1.0)",
    bottleGreen_transparent: "rgba(56, 173, 169, 0.3)",
    green: "#78e08f"
  }
};

const loadGA = () => {
  console.log("ga");

  if (process.env.NODE_ENV === "production") {
    ReactGA.initialize("UA-138978525-1");
    history.listen(location => ReactGA.pageview(location.pathname));
  }
};
const loadHotjar = () => {
  (function(h, o, t, j, a, r) {
    h.hj =
      h.hj ||
      function() {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
    h._hjSettings = { hjid: 1273071, hjsv: 6 };
    a = o.getElementsByTagName("head")[0];
    r = o.createElement("script");
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
    console.log("hotjar");
  })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
};

const onCookieAccepted = () => {
  loadGA();
  loadHotjar();
};

const App = () => {
  const cookieConsentName = "cookie-consent";
  const cookieConsentMatch = document.cookie.match(
    new RegExp(`(^| )${cookieConsentName}=([^;]+)`)
  );
  if (cookieConsentMatch && cookieConsentMatch[2] === "true") {
    onCookieAccepted();
  }

  return (
    <ThemeProvider theme={theme}>
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
        <AppRouter />
        <CookieConsent
          location="bottom"
          buttonText="I understand"
          style={{ background: "rgba(0,0,0,.75)", fontSize: "13px" }}
          buttonStyle={{
            backgroundColor: "#1890ff",
            color: "#fff",
            fontSize: "13px",
            borderRadius: "4px"
          }}
          onAccept={onCookieAccepted}
          cookieName={cookieConsentName}
        >
          This website was build with love and uses cookies to enhance the user
          experience.
        </CookieConsent>
      </IconContext.Provider>
    </ThemeProvider>
  );
};

export default App;
