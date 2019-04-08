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
  ColumnHeader,
  HighlightableIcon,
  HighlightableSpan,
  PrimaryButtonBackground,
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
  FooterBackground,
} from "./Identify.Layout";
import Cup from "../../assets/decorations/Cup";

const SandboxContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: ${props => props.sandboxWidth};
  height: 100vh;
  flex-shrink: 0;
  background-color: ${props => props.theme.colors.mainBackground};
`;

const IdentifySandbox = ({ interactions, sandboxWidth }) => {
  return (
    <SandboxContainer sandboxWidth={sandboxWidth}>
      <MainContainer interactions={interactions} label="Main container <main>">
        <HeadSection interactions={interactions} label="Head section <section>">
          <H1 interactions={interactions} label="First title <h1>">Happier Design Integration</H1>
          <P interactions={interactions} label="Paragraph <p>">
            Frontend development can be a pain when it comes to translating a
            mockup into code. Learn a few tips to make it smoother.
          </P>
          <PrimaryButtonBackground><CTA interactions={interactions} label="Primary button <a>">
            <HighlightableSpan interactions={interactions} label="Span <span>" top right="56px">Get Started</HighlightableSpan> <HighlightableSpan interactions={interactions} label="Icon <svg>" top right="-47px"><IoIosArrowDroprightCircle /></HighlightableSpan>
          </CTA></PrimaryButtonBackground>
        </HeadSection>
        <Column
          interactions={interactions}
          label="Tutorial List section <section>"
          left
        >
          <ColumnHeader interactions={interactions} label="List title <p>">Interactive tutorials</ColumnHeader>
          <Fragment>
            <Section
              icon={<HighlightableIcon interactions={interactions} label="Icon <svg>" right="-1px"><IoMdGrid /></HighlightableIcon>}
              interactions={interactions}
              label="Tutorial section <article>"
            >
              <H2 interactions={interactions} label="Second title <h2>">Identify layouts and components</H2>
              <Description interactions={interactions} label="Tuto Description <p>">
                Make sure that you have all the information about the design:
                appearance, size, position, alignment.
              </Description>
            </Section>
            <Section
              icon={<HighlightableIcon interactions={interactions} label="Icon <svg>" right="-1px"><IoIosListBox /></HighlightableIcon>}
              interactions={interactions}
              label="Tutorial section <article>"
            >
              <H2 interactions={interactions} label="Second title <h2>">List Edge Cases</H2>
              <Description interactions={interactions} label="Tuto Description <p>">
                Avoid rework and unplaned strategy shift because you missed a
                behaviour.
              </Description>
            </Section>
            <Section
              icon={<HighlightableIcon interactions={interactions} label="Icon <svg>" right="-1px"><IoIosImages /></HighlightableIcon>}
              interactions={interactions}
              label="Tutorial section <article>"
            >
              <H2 interactions={interactions} label="Second title <h2>">Assets</H2>
              <Description interactions={interactions} label="Tuto Description <p>">
                Check that you have the right files or resources and that they
                are usable.
              </Description>
            </Section>
            <Section
              icon={<HighlightableIcon interactions={interactions} label="Icon <svg>" right="-1px"><IoMdTabletPortrait /></HighlightableIcon>}
              interactions={interactions}
              label="Tutorial section <article>"
            >
              <H2 interactions={interactions} label="Second title <h2>">Responsive</H2>
              <Description interactions={interactions} label="Tuto Description <p>">
                Understand how the layout and component should adapt to the
                screen.
              </Description>
            </Section>
          </Fragment>
        </Column>
        <ContactSection
          interactions={interactions}
          label="Contact section <section>"
          top
        >
          <H2 interactions={interactions} label="Second title <h2>">Subscribe to our newsletter</H2>
          <InlineContainer interactions={interactions} label="Form <form>">
            <FakeInput interactions={interactions} label="Text Input <input>">john@gmail.com</FakeInput>
            <PrimaryButtonBackground><ButtonLink interactions={interactions} label="Primary Button <button>">Submit</ButtonLink></PrimaryButtonBackground>
          </InlineContainer>
        </ContactSection>
        <Background>
          <Cup cupSize="185" sizeUnit="px" x="16px" top="190px">
            <Cup.Handle cupSize="185" sizeUnit="px" />
          </Cup>
        </Background>
      </MainContainer>
      <DisclaimerSection interactions={interactions} label="Footer <footer>">
        <H2 interactions={interactions} label="Second title <h2>">Lorem Ipsum</H2>
        <P interactions={interactions} label="Disclaimer <p>" small>
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
          <FakeLink interactions={interactions} label="Link <a>">Link 1</FakeLink>
          <FakeLink interactions={interactions} label="Link <a>">Link 2</FakeLink>
          <FakeLink interactions={interactions} label="Link <a>">Link 3</FakeLink>
        </InlineContainer>
      </DisclaimerSection>
      <FooterBackground />
    </SandboxContainer>
  );
};

export default IdentifySandbox;
