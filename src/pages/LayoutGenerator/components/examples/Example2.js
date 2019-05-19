import TextArea from 'antd/lib/input/TextArea';
import Button from 'antd/lib/button';
import React from 'react';
import styled from 'styled-components';

import example2 from '../../../../assets/images/example2.png';
import { colorUsage, fontFamily } from '../../../../stylesheet';

const Example2Wrapper = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
`;
const Example2Guide = styled.div`
  align-self: flex-start;
  margin-left: 30px;
  color: ${colorUsage.darkColor};
  h2 {
    color: ${colorUsage.darkColor};
  }
`;

const Example2Container = styled.div`
  height: 350px;
  width: 250px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid ${colorUsage.lightGrey};
  font-family: ${fontFamily.main};
`;
const Header = styled.div`
  height: 70px;
  background-color: ${colorUsage.mainColor};
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: center;
  padding: 10px 20px;

  img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
    border-radius: 50%;
    border: 2px solid ${colorUsage.reverseColor};
  }
  h2 {
    margin: 0;
    font-size: small;
    font-weight: bold;
    color: ${colorUsage.reverseColor};
  }
  p {
    margin: 0;
    font-size: x-small;
    color: ${colorUsage.reverseColor};
  }
`;
const Messages = styled.div`
  flex: 1;
  border-bottom: 1px solid ${colorUsage.lightGrey};
  overflow: auto;
`;
const MessageList = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  div {
    max-width: 80%;
    margin-bottom: 5px;
    font-size: small;
    padding: 5px;
    flex: 0 0;
  }
  .received {
    background: ${colorUsage.mainColor};
    color: ${colorUsage.white};
    border-radius: 0 4px 4px 4px;
    a {
      color: ${colorUsage.reverseColor};
      text-decoration: underline;
    }
  }
  .sent {
    align-self: flex-end;
    background: ${colorUsage.lightGrey};
    border-radius: 4px 0 4px 4px;
  }
`;
const TextInput = styled.div`
  display: flex;
  textarea.ant-input {
    min-height: 30px;
    height: 30px;
    font-size: small;
    line-height: 18px;
    border: none;
    resize: none;
    outline: none;
  }
  button {
    border: none;
    color: ${colorUsage.mainColor};
    height: 30px;
  }
`;

const Example2 = () => (
  <Example2Wrapper>
    <Example2Container>
      <Header>
        <img src={example2} alt="Learn CSS Layout" />
        <div>
          <h2>Best friend</h2>
          <p>active</p>
        </div>
      </Header>
      <Messages>
        <MessageList>
          <div className="received">Hello!</div>
          <div className="received">How can I help you?</div>
          <div className="sent">
            I'm learning how to integrate mockups using flex, do you have any tips?
          </div>
          <div className="received">
            Sure, learn flex with{' '}
            <a href="https://flexboxfroggy.com" rel="noopener noreferrer" target="_blank">
              Flexbox Froggy
            </a>
            , and use Happy frontend to train on real mockups :)
          </div>
          <div className="sent">Thanks!</div>
        </MessageList>
      </Messages>
      <TextInput>
        <TextArea autosize placeholder="Write your message..." />
        <Button ghost size="small">
          SEND
        </Button>
      </TextInput>
    </Example2Container>
    <Example2Guide>
      <h2>A chat layout</h2>
      <p>You can try to integrate recusrively:</p>
      <ul>
        <li>the chat layout,</li>
        <li>the chat header,</li>
        <li>the messages bloc,</li>
        <li>the input bloc.</li>
      </ul>
    </Example2Guide>
  </Example2Wrapper>
);

export default Example2;
