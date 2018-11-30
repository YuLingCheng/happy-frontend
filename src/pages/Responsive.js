import React, { Fragment } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';
import { H1, P } from '../components/Styleguide';

import BackgroundBase from '../assets/decorations/BackgroundBase';
import Pencil from '../assets/decorations/Pencil';

const Responsive = () => (
  <Fragment>
    <Header />
    <Main>
      <H1>Responsive</H1>
      <P>
        Understand how the layout and component should adapt to the screen.
      </P>
    </Main>
    <BackgroundBase>
      <Pencil.Shadow rotate="93" left="50vw" top="60vh"><Pencil /></Pencil.Shadow>
    </BackgroundBase>
  </Fragment>
);

export default Responsive;
