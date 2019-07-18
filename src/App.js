import { createBrowserHistory } from 'history'; // eslint-disable-line
import React, { lazy, Suspense } from 'react';
import ReactGA from 'react-ga';
import { IconContext } from 'react-icons';
import { Redirect } from 'react-router';
import { Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import 'antd/dist/antd.min.css';
import './assets/css/index.css'; // import after to override

const LayoutGenerator = lazy(() => import('./pages/LayoutGenerator'));
const ExpertLayoutGenerator = lazy(() => import('./pages/ExpertLayoutGenerator'));

const history = createBrowserHistory();

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-138978525-1');
  history.listen(location => ReactGA.pageview(location.pathname));
}

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
    primary: '#f6b93b',
    primary_dark: '#fa983a',
    primary_light: '#d5a973',
    mainBackground: '#e55039',
    error: '#EF5B5B',
    cocoa: '#4c3013',
    lighter: '#dad2ca',
    lightest: '#f8efe5',
    lightest_transparent: 'rgba(248,239,229, 0.75)',
    grey_dark: '#3f3a36',
    grey_light: '#A6B0B5',
    grey_shadow: 'rgba(102, 102, 102, 0.3)',
    blue: 'rgba(74, 105, 189, 1.0)',
    blue_transparent: 'rgba(74, 105, 189, 0.3)',
    bottleGreen: 'rgba(56, 173, 169,1.0)',
    bottleGreen_transparent: 'rgba(56, 173, 169, 0.3)',
    green: '#78e08f',
  },
};

const App = () => (
  <ThemeProvider theme={theme}>
    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
      <AppRouter />
    </IconContext.Provider>
  </ThemeProvider>
);

export default App;
