import { Icon } from 'antd';
import React from 'react';
import styled from 'styled-components';

import example1 from '../../../../assets/images/example1.png';
import { colorUsage, fontFamily } from '../../../../stylesheet';

const Example1Container = styled.div`
  width: 80%;
  height: 200px;
  border: 1px solid ${colorUsage.lightGrey};
  padding: 40px;
  display: flex;
  font-family: ${fontFamily.main};
  align-items: center;
  box-sizing: border-box;
  margin: auto;

  ${props => props.highlight && `border: solid 3px ${colorUsage.highlightContainerColor};`}
`;

const Text = styled.div`
  h2,
  p {
    color: ${colorUsage.darkColor};
  }
  box-sizing: border-box;
  ${props => props.highlight && `border: solid 3px ${colorUsage.highlightChildColor};`}
`;
const Img = styled.img`
  height: 130px;
  margin-right: 20px;
  box-sizing: border-box;
  ${props => props.highlight && `border: solid 3px ${colorUsage.highlightChildColor};`}
`;

const KeyPoints = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: start;
  color: ${colorUsage.darkColor};
  padding: 20px 5% 0;
  text-align: left;
  flex-wrap: wrap
  font-size: x-small;
  margin-top: 20px;

  > :not(:last-child) {
    margin-right: 40px;
  }

  .keypoints__header {
    font-size: small;
  }

  .keypoint {
    flex: 1;
    display: flex;

    i {
      font-size: 25px;
      margin-right: 15px;
    }
  }
`;

const Example1 = ({ highlightExampleBlocks }) => (
  <>
    <Example1Container highlight={highlightExampleBlocks}>
      <Img
        src={example1}
        alt="Learn CSS Layout"
        highlight={highlightExampleBlocks}
      />
      <Text highlight={highlightExampleBlocks}>
        <h2>First example</h2>
        <p>If you know how to do the layout for this block, then you know the basics :)</p>
      </Text>
    </Example1Container>
    <KeyPoints>
      <div className="keypoints__header">This will help you if</div>
      <div className="keypoint">
        <Icon type="border-verticle" />
        <span>
          You know about{' '}
          <a href="https://flexboxfroggy.com" rel="noopener noreferrer" target="_blank">
            flex
          </a>
          , padding and margin but you don't know how to combine them.
        </span>
      </div>
      <div className="keypoint">
        <Icon type="file-unknown" />
        <span>You don't know what the best css practice are when it comes to layout.</span>
      </div>
      <div className="keypoint">
        <Icon type="gold" />
        <span>You don't know how to split the mockup integration.</span>
      </div>
    </KeyPoints>
  </>
);

export default Example1;
