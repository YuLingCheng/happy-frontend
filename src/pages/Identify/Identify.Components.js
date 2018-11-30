import styled, { css } from "styled-components";
import { InlineContainer } from "./Identify.Layout";

const HighlightableBlock = styled.p`
  ${props =>
    props.interactions.displayComponents &&
    css`
      background-color: ${props.theme.colors
        .bottleGreen_transparent} !important;
      outline: 1px solid ${props.theme.colors.bottleGreen};
      position: relative;

      ${props.interactions.displayComponentLabels &&
        css`
          ::after {
            content: "${props.label}";
            position: absolute;
            top: -12px;
            right: 5px;
            background-color: ${props.theme.colors.bottleGreen};
            border-radius: 3px;
            color: ${props.theme.colors.lightest};
            padding: 1px 3px;
            font-size: 0.45rem;
            font-weight: bold;
          }
      `}
    `}
`;

export const A = styled.span`
  text-decoration: none;
  color: ${props => props.theme.colors.grey_dark};
`;

export const H1 = styled.h1`
  font-weight: 700;
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

export const H2 = styled.h2`
  font-weight: 700;
  font-size: 0.55rem;
  margin-top: 0;
  margin-bottom: 0.25rem;
`;

export const P = styled.p`
  font-weight: 400;
  margin-top: 0.25rem;
  font-size: 0.5rem;
`;

export const ButtonLink = styled(A)`
  display: block;
  width: fit-content;
  padding: 0.25rem 0.5rem;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 1px;
`;

export const Description = styled(P)`
  font-size: 0.35rem;
  margin: 0;
`;

export const FakeInput = styled.div`
  border-radius: 3px;
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.primary_light};
  padding: 0.25rem 0.5rem;
  width: 5.5rem;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.grey_dark};
`;

export const FakeLink = styled.div`
  text-decoration: underline;
  color: ${props => props.theme.colors.grey_dark};
`;

export const Label = InlineContainer.withComponent("label");

export const CTA = styled(ButtonLink)`
  margin-top: 0.25rem;
`;

export const ColumnHeader = styled.p`
  margin: 0 0 0.25rem 0;
  font-weight: bold;
  text-align: right;
  font-size: 0.55rem;
  color: ${props => props.theme.colors.lightest};
`;
