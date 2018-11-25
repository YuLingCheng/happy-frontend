import React, { Fragment } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';
import { H1, P } from '../components/Styleguide';

import BackgroundBase from '../assets/decorations/BackgroundBase';
import Pencil from '../assets/decorations/Pencil';

const EdgeCases = () => (
  <Fragment>
    <Header />
    <Main>
      <H1>List Edge Cases</H1>
      <P>
        Avoid rework and unplaned strategy shift because you missed a behaviour.
      </P>
    </Main>
    <BackgroundBase>
      <Pencil.Shadow rotate="185" left="80vw" top="30vh"><Pencil /></Pencil.Shadow>
    </BackgroundBase>
  </Fragment>
);

export default EdgeCases;
