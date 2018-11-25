import React, { Component, Fragment } from 'react';
import {
  IoIosArrowDroprightCircle,
  IoMdGrid,
  IoIosListBox,
  IoIosImages,
  IoMdTabletPortrait,
} from 'react-icons/io';

import {
  HomeContainer,
  Background,
  Description,
  HeadSection,
  CTA,
  Section,
  Column,
} from './Home.Style';
import Header from '../../components/Header';
import Main from '../../components/Main';
import { A, H1, H2, P } from '../../components/Styleguide';

import Cup from '../../assets/decorations/Cup';
import Pencil from '../../assets/decorations/Pencil';

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Main>
          <HomeContainer>
            <HeadSection>
              <H1>Happier Design Integration</H1>
              <P>
                Frontend development can be a pain when it comes to translating a mockup into code.
                Learn a few tips to make it smoother.
              </P>
              <CTA to="identify-layouts-components">Get Started <IoIosArrowDroprightCircle /></CTA>
            </HeadSection>
            <Column>
              <Fragment>
                <Section icon={<IoMdGrid />}>
                  <A to="identify-layouts-components"><H2>Identify layouts and components</H2></A>
                  <Description>Make sure that you have all the information about the design: appearance, size, position, alignment.</Description>
                </Section>
                <Section icon={<IoIosListBox />}>
                  <A to="edge-cases"><H2>List Edge Cases</H2></A>
                  <Description>Avoid rework and unplaned strategy shift because you missed a behaviour.</Description>
                </Section>
                <Section icon={<IoIosImages />}>
                  <A to="assets"><H2>Assets</H2></A>
                  <Description>Check that you have the right files or resources and that they are usable.</Description>
                </Section>
                <Section icon={<IoMdTabletPortrait />}>
                  <A to="responsive"><H2>Responsive</H2></A>
                  <Description>Understand how the layout and component should adapt to the screen.</Description>
                </Section>
              </Fragment>
            </Column>
          </HomeContainer>
        </Main>
        <Background>
          <Cup cupSize="305" sizeUnit="px" x="32px" y="46px">
            <Cup.Handle cupSize="305" sizeUnit="px" />
          </Cup>
          <Pencil.Shadow><Pencil /></Pencil.Shadow>
        </Background>
      </Fragment>
    );
  }
};

export default Home;
