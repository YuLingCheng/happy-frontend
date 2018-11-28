import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.main`
  padding: 0 ${props => props.narrow ? '2rem' : '8rem'};
  color: rgba(43, 27, 11, 1);
  ${props => !props.expandable && 'max-width: 1024px;'}
  z-index: 10;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const Main = ({ children, expandable, narrow }) => (<MainContainer expandable={expandable} narrow={narrow}>
  {children}
</MainContainer>);

export default Main;