import React from "react";
import { IconContext } from "react-icons";
import styled, { withTheme, css } from "styled-components";

import BackgroundBase from "../../assets/decorations/BackgroundBase";

const footerHeight = "120px";

export const IdentifyContainer = styled.div`
  display: flex;
`;

export const Background = styled(BackgroundBase)`
  border: none;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.mainBackground};
`;

const HighlightableBlock = styled.div`
  ${props =>
    props.interactions.displayBlocks &&
    css`
      background-color: ${props.theme.colors.blue_transparent} !important;
      outline: 1px solid ${props.theme.colors.blue};
      position: relative;

      ${props.interactions.displayBlockLabels &&
        css`
          ::after {
            content: "${props.label}";
            position: absolute;
            top: -12px;
            right: 5px;
            background-color: ${props.theme.colors.blue};
            border-radius: 3px;
            color: ${props.theme.colors.lightest};
            padding: 1px 3px;
            font-size: 0.45rem;
            font-weight: bold;
          }
      `}
    `}
`;

const HighlightableSection = HighlightableBlock.withComponent("section");

export const MainContainer = styled(HighlightableBlock)`
  padding: 2rem 0;
  width: 100%;
  height: calc(100% - ${footerHeight});
  box-sizing: border-box;
  color: rgba(43, 27, 11, 1);
  font-size: 0.5rem;
`;

export const HeadSection = styled(HighlightableSection)`
  margin-bottom: 1rem;
  padding: 0 2rem;
`;

export const ContactSection = styled(HighlightableSection)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.lightest};
  padding: 0 2rem;
`;

const HighlightableFooter = HighlightableBlock.withComponent("footer");

export const FooterBackground = styled.div`
  background-color: ${props => props.theme.colors.lightest_transparent};
  position: absolute;
  left: 0;
  bottom: 0;
  width: 384px;
  height: ${footerHeight};
  z-index: -10;
`;
export const DisclaimerSection = styled(HighlightableFooter)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 384px;
  height: ${footerHeight};
  box-sizing: border-box;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.lightest_transparent};
  color: ${props => props.theme.colors.grey_dark};
  font-size: 0.5rem;
`;

export const InlineContainer = styled(HighlightableBlock)`
  display: flex;
  align-items: center;
  ${props => props.centered && "justify-content: center;"}

  > :not(:last-child) {
    margin-right: 1rem;
  }
`;

const SectionWrapper = styled(HighlightableBlock)`
  text-align: right;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0.25rem;
  box-sizing: border-box;
`;
SectionWrapper.Background = styled.div`
  margin-bottom: 0.25rem;
  margin-left: auto;
  width: 60%;
  background-color: ${props => props.theme.colors.lightest_transparent};
`;

const getIconContext = ({ colors }) => ({
  style: {
    verticalAlign: "middle",
    marginLeft: "0.5rem",
    flexShrink: 0
  },
  size: "0.75rem",
  color: colors.cocoa
});
export const Section = withTheme(({ children, icon, theme, ...otherProps }) => (
  <SectionWrapper.Background>
    <SectionWrapper {...otherProps}>
      <section>{children}</section>
      <IconContext.Provider value={getIconContext(theme)}>
        {icon}
      </IconContext.Provider>
    </SectionWrapper>
  </SectionWrapper.Background>
));
Section.displayName = "Section";

export const Column = styled(HighlightableBlock)`
  margin-top: 0.5rem;
  flex: 1;
  width: 100%;
  padding: 0 2rem 1.5rem 0;
  box-sizing: border-box;
`;
