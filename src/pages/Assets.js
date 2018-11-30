import React, { Fragment } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';
import { H1, P } from '../components/Styleguide';

import BackgroundBase from '../assets/decorations/BackgroundBase';
import Pencil from '../assets/decorations/Pencil';

const Assets = () => (
  <Fragment>
    <Header />
    <Main>
      <H1>Assets</H1>
      <P>
        Check that you have the right files or resources and that they are usable.
      </P>
    </Main>
    <BackgroundBase>
      <Pencil.Shadow rotate="-38" left="80vw" top="5vh"><Pencil /></Pencil.Shadow>
    </BackgroundBase>
  </Fragment>
);

export default Assets;
