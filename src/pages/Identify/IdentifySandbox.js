import React, { Fragment } from "react";
import styled from "styled-components";
import {
  IoIosArrowDroprightCircle,
  IoMdGrid,
  IoIosListBox,
  IoIosImages,
  IoMdTabletPortrait
} from "react-icons/io";
import {
  Description,
  CTA,
  FakeInput,
  FakeLink,
  ButtonLink,
  H1,
  H2,
  P,
  ColumnHeader
} from "./Identify.Components";
import {
  MainContainer,
  HeadSection,
  Section,
  Column,
  Background,
  ContactSection,
  InlineContainer,
  DisclaimerSection,
  FooterBackground
} from "./Identify.Layout";
import Cup from "../../assets/decorations/Cup";

const SandboxContainer = styled.main`
  position: fixed;
  right: 4rem;
  width: 384px;
  height: 552px;
  flex-shrink: 0;
  box-shadow: 7px -8px 0 ${props => props.theme.colors.grey_shadow};
  background-color: ${props => props.theme.colors.mainBackground};
`;

const IdentifySandbox = ({ interactions }) => {
  return (
    <SandboxContainer>
      <MainContainer interactions={interactions} label="Main container <body>">
        <HeadSection interactions={interactions} label="Head section <section>">
          <H1 interactions={interactions}>Happier Design Integration</H1>
          <P>
            Frontend development can be a pain when it comes to translating a
            mockup into code. Learn a few tips to make it smoother.
          </P>
          <CTA>
            Get Started <IoIosArrowDroprightCircle />
          </CTA>
        </HeadSection>
        <Column
          interactions={interactions}
          label="Tutorial List section <main>"
        >
          <ColumnHeader>Interactive tutorials</ColumnHeader>
          <Fragment>
            <Section
              icon={<IoMdGrid />}
              interactions={interactions}
              label="Tutorial section <article>"
            >
              <H2>Identify layouts and components</H2>
              <Description>
                Make sure that you have all the information about the design:
                appearance, size, position, alignment.
              </Description>
            </Section>
            <Section
              icon={<IoIosListBox />}
              interactions={interactions}
              label="Tutorial section <article>"
            >
              <H2>List Edge Cases</H2>
              <Description>
                Avoid rework and unplaned strategy shift because you missed a
                behaviour.
              </Description>
            </Section>
            <Section
              icon={<IoIosImages />}
              interactions={interactions}
              label="Tutorial section <article>"
            >
              <H2>Assets</H2>
              <Description>
                Check that you have the right files or resources and that they
                are usable.
              </Description>
            </Section>
            <Section
              icon={<IoMdTabletPortrait />}
              interactions={interactions}
              label="Tutorial section <article>"
            >
              <H2>Responsive</H2>
              <Description>
                Understand how the layout and component should adapt to the
                screen.
              </Description>
            </Section>
          </Fragment>
        </Column>
        <ContactSection
          interactions={interactions}
          label="Contact section <section>"
        >
          <H2>Subscribe to our newsletter</H2>
          <InlineContainer interactions={interactions} label="Form <form>">
            <FakeInput>john@gmail.com</FakeInput>
            <ButtonLink>Submit</ButtonLink>
          </InlineContainer>
        </ContactSection>
        <Background>
          <Cup cupSize="185" sizeUnit="px" x="16px" top="140px">
            <Cup.Handle cupSize="185" sizeUnit="px" />
          </Cup>
        </Background>
      </MainContainer>
      <DisclaimerSection interactions={interactions} label="Footer <footer>">
        <H2>Lorem Ipsum</H2>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </P>
        <InlineContainer
          centered
          interactions={interactions}
          label="Footer navigation <nav>"
        >
          <FakeLink>Link 1</FakeLink>
          <FakeLink>Link 2</FakeLink>
          <FakeLink>Link 3</FakeLink>
        </InlineContainer>
      </DisclaimerSection>
      <FooterBackground />
    </SandboxContainer>
  );
};

export default IdentifySandbox;
