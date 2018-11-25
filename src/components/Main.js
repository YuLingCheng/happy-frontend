import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.main`
  padding: 0 8rem;
  color: rgba(43, 27, 11, 1);
  max-width: 1024px;
  z-index: 10;

  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const Main = (props) => (<MainContainer>
  {props.children}
</MainContainer>);

export default Main;