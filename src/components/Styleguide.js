import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const A = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.grey_dark};
  &:hover {
    text-decoration: underline;
  }
`;

export const H1 = styled.h1`
  font-weight: 700;
  font-size: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const H2 = styled.h2`
  font-weight: 700;
  font-size: 1.25rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const P = styled.p`
  font-weight: 400;
  margin-top: 0.5rem;
  font-size: 1rem;
`;

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
