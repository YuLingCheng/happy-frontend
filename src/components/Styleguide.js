import React from "react";
import { Link } from 'react-router-dom';
import Switch from "react-switch";
import styled, { withTheme } from 'styled-components';

export const H1 = styled.h1`
  font-weight: 700;
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 1rem;
`;

export const H2 = styled.h2`
  font-weight: 700;
  font-size: 1.25rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const H3 = styled.h3`
  font-weight: 700;
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 0.25rem;
`;

export const P = styled.p`
  font-weight: 400;
  margin-top: 0.5rem;
  font-size: 1rem;
`;

export const Explanations = styled.article`
  font-size: 0.75rem;
  padding: 0.5rem;

  ${P} {
    font-size: inherit;
    margin-top: 0;
    margin-block-end: 0;

    &:not(:last-child) {
      margin-bottom: 0.25rem;
    }
  }
`;


export const A = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.grey_dark};
  &:hover {
    text-decoration: underline;
  }
`;

const ExternalA = A.withComponent('a');
export const ExternalLink = (props) => (<ExternalA target="_blank" rel="noopener noreferrer" {...props}/>)

export const ButtonLink = styled(A)`
  display: block;
  width: fit-content;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 3px;

  &:hover {
    background-color: ${props => props.theme.colors.primary_dark};
    text-decoration: none;
  }
`;

export const Ul = styled.ul`
  margin: 0;
  padding-inline-start: 1.25rem;
`;

export const Toggle = withTheme(({ theme, ...props }) => (
  <Switch
    checkedIcon={false}
    uncheckedIcon={false}
    height={16}
    width={32}
    onColor={theme.colors.green}
    offColor={theme.colors.grey_light}
    {...props}
  />
));