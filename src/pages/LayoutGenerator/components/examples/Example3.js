import Icon from 'antd/lib/icon';
import React from 'react';
import styled from 'styled-components';

import { colorUsage, fontFamily } from '../../../../stylesheet';

const Example3Container = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  background: ${colorUsage.lightGrey};
  font-family: ${fontFamily.main};
  margin: auto;
  padding: 10px 0 20px;
  position: relative;

  h2 {
    font-size: small;
    margin-bottom: 10px;
    padding: 0 15px;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    width: 250px;
    height: 10px;
    background: linear-gradient(
        45deg,
        transparent 33.333%,
        ${colorUsage.reverseColor} 33.333%,
        ${colorUsage.reverseColor} 66.667%,
        transparent 66.667%
      ),
      linear-gradient(
        -45deg,
        transparent 33.333%,
        ${colorUsage.reverseColor} 33.333%,
        ${colorUsage.reverseColor} 66.667%,
        transparent 66.667%
      );
    background-size: 20px 40px;
  }
`;
const Statement = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: baseline;

  > :not(:last-child) {
    margin-right: 10px;
  }
  > div {
    flex: 1;

    h3 {
      font-size: medium;
      margin: 0;
    }
    p {
      font-size: x-small;
      margin: 0;
    }
  }
  > p {
      font-size: x-small;
      margin: 0;
    }
  }
  > i {
    font-size: small;
  }
`;

const Example3 = () => (
  <Example3Container>
    <h2>Recent transactions</h2>
    <Statement>
      <Icon type="coffee" />
      <div>
        <h3>Coffee store</h3>
        <p>Ice coffee and cookie</p>
      </div>
      <p>-5€</p>
    </Statement>
    <Statement>
      <Icon type="home" />
      <div>
        <h3>Landlord</h3>
        <p>Rent</p>
      </div>
      <p>-900€</p>
    </Statement>
    <Statement>
      <Icon type="money-collect" />
      <div>
        <h3>Best friend</h3>
        <p>Refund</p>
      </div>
      <p>+120€</p>
    </Statement>
  </Example3Container>
);

export default Example3;
