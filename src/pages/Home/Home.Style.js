import React from 'react';
import { IconContext } from 'react-icons';
import styled, { withTheme } from 'styled-components';

import { P, ButtonLink } from '../../components/Styleguide';
import BackgroundBase from '../../assets/decorations/BackgroundBase';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
`;

export const Background = styled(BackgroundBase)`
  border-top: 100vh solid ${props => props.theme.colors.mainBackground};
  border-left: 0 solid transparent;
  border-right: 10vw solid transparent;
  height: 0;
  width: 55vw;
  min-width: 30rem;

  @media screen and (max-width: 425px) {
    border: none;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.mainBackground};
  }
`;

export const Description = styled(P)`
  font-size: 0.75rem;
  margin: 0;
`;

export const HeadSection = styled.section`
  max-width: 500px;
  padding-top: 3rem;
`;

const SectionWrapper = styled.div`
  margin-bottom: 0.5rem;
  margin-left: auto;
  text-align: right;
  width: 500px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  background-color: ${props => props.theme.colors.lightest_transparent};
  padding: 0.5rem;
  box-sizing: border-box;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const getIconContext = ({colors}) => ({
  style: {
    verticalAlign: 'middle',
    marginLeft: '1rem',
    flexShrink: 0,
  },
  size: '1.25rem',
  color: colors.cocoa,
});
export const Section = withTheme(({children, icon, theme}) => (
  <SectionWrapper>
    <section>{children}</section>
    <IconContext.Provider value={getIconContext(theme)}>
      {icon}
    </IconContext.Provider>
  </SectionWrapper>
));
Section.displayName = 'Section';

export const CTA = styled(ButtonLink)`
  margin-top: 0.5rem;
`;

export const Column = styled.div`
  margin-top: 1rem;
  flex: 1;
  width: 100%;
  overflow: auto;
  margin-right: 5vw;
  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
`;
