import styled, { css } from "styled-components";

const HighlightableComponent = styled.p`
  margin: 0;

  ${props =>
    props.interactions && props.interactions.displayComponents &&
    css`
      background-color: ${props.theme.colors
        .bottleGreen_transparent} !important;
      outline: 1px solid ${props.theme.colors.bottleGreen};
      position: relative;

      ${props.interactions && props.interactions.displayComponentLabels &&
        css`
          ::after {
            content: "${props.label}";
            position: absolute;
            top: ${props.top ? `0` : '-12px'};
            ${props.right ? `right:${props.right};` : 'left: 0;'}
            width: max-content;
            background-color: ${props.theme.colors.bottleGreen};
            border-radius: 3px;
            color: ${props.theme.colors.lightest};
            padding: 1px 3px;
            font-size: 0.5rem;
            font-weight: bold;
          }
      `}
    `}
`;

export const HighlightableSpan = HighlightableComponent.withComponent("span");
export const A = styled(HighlightableSpan)`
  text-decoration: none;
  color: ${props => props.theme.colors.grey_dark};
`;

const HighlightableH1 = HighlightableComponent.withComponent("h1");
export const H1 = styled(HighlightableH1)`
  font-weight: 700;
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 0.75rem;
`;

const HighlightableH2 = HighlightableComponent.withComponent("h2");
export const H2 = styled(HighlightableH2)`
  font-weight: 700;
  font-size: 0.75rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

export const P = styled(HighlightableComponent)`
  font-weight: 400;
  margin-top: 0.25rem;
  font-size: ${props => props.small ? '0.5rem' : '0.75rem'};
  margin-bottom: 0.75rem;
`;

export const ButtonLink = styled(A)`
  display: block;
  width: fit-content;
  padding: 0.25rem 0.5rem;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 1px;
`;
export const PrimaryButtonBackground = styled.div`
  background-color: ${props => props.theme.colors.primary};
  border-radius: 1px;
  width: fit-content;
`;

export const Description = styled(P)`
  font-size: 0.55rem;
  margin: 0;
`;

const HighlightableDiv = HighlightableComponent.withComponent("div");
export const FakeInput = styled(HighlightableDiv)`
  border-radius: 3px;
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.primary_light};
  padding: 0.25rem 0.5rem;
  width: 5.5rem;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.grey_dark};
`;

export const FakeLink = styled(HighlightableDiv)`
  text-decoration: underline;
  color: ${props => props.theme.colors.grey_dark};
`;

export const HighlightableIcon = styled(HighlightableDiv)`
  margin-left: 0.5rem;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  ${props => props.centered && "justify-content: center;"}

  > :not(:last-child) {
    margin-right: 1rem;
  }
`;

export const CTA = styled(ButtonLink)`
  margin-top: 0.25rem;
`;

export const ColumnHeader = styled(HighlightableComponent)`
  margin: 0 0 0.25rem 0;
  font-weight: bold;
  text-align: right;
  font-size: 0.75rem;
  color: ${props => props.theme.colors.lightest};
`;
