import React, { Fragment } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';
import { H1, P } from '../components/Styleguide';

import BackgroundBase from '../assets/decorations/BackgroundBase';
import Pencil from '../assets/decorations/Pencil';

const Identify = () => (
  <Fragment>
    <Header />
    <Main>
      <H1>Identify Layouts and Components on a Mockup</H1>
      <P>
        Make sure that you have all the information about the design:
        appearance, size, position, alignment.
      </P>
    </Main>
    <BackgroundBase>
      <Pencil.Shadow rotate="25" left="145px" top="0"><Pencil /></Pencil.Shadow>
    </BackgroundBase>
  </Fragment>
);

export default Identify;
