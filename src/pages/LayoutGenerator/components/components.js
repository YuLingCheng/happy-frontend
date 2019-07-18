import React from 'react';
import styled, { keyframes } from 'styled-components';
import Icon from 'antd/lib/icon';
import Popover from 'antd/lib/popover';
import { colorUsage, fontFamily } from '../../../stylesheet';
import logo from '../../../assets/images/happyfrontend-logo.png';

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: ${colorUsage.darkColor};
`;

export const PreviewContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  min-width: 600px;
  position: relative;
  background-color: ${colorUsage.darkColor};
`;
export const ToolContainer = styled.div`
  flex: 0 0 35%;
  height: 96%;
  background: ${colorUsage.white};
  border-radius: 0 0 0 4px;
  overflow: auto;
  min-width: 358px;

  .ant-card {
    height: calc(100% - 30px);
    overflow: auto;
  }
  .ant-card-head {
    min-height: 40px;
    padding: 0 15px;
  }
  .ant-card-head-title {
    padding: 10px 0 5px;
  }
  .ant-card-type-inner .ant-card-head {
    min-height: 20px;
  }
  .ant-card-type-inner .ant-card-head-title {
    padding: 5px;
    colorusage.white-space: normal;
    line-height: 15px;
  }
  .ant-card-type-inner .ant-card-head {
    padding: 0 10px;
  }
  .ant-card-body {
    padding: 10px;
  }
  .ant-input-group-addon {
    background-color: lightGrey;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 5px 45px;
  }
  .ant-collapse-content > .ant-collapse-content-box {
    padding-top: 0;
  }
  .ant-divider-horizontal.ant-divider-with-text-left {
    font-size: medium;
    margin-bottom: 10px;
  }
`;

export const Copyright = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  font-size: small;
`;

export const MainContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Intro = styled.div`
  padding: 0 5%;
  color: ${colorUsage.reverseColor};
  flex-shrink: 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  flex-shrink: 0;
  padding: 0 5%;
  color: ${colorUsage.reverseColor};
  font-family: ${fontFamily.main};
  font-weight: bold;
  h1 {
    color: ${colorUsage.reverseColor};
    font-size: medium;
    font-weight: bold;
    margin: 0;
  }
`;

Header.Left = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 32px;
    margin-right: 10px;
  }
`;

export const Clickable = styled.span`
  color: ${colorUsage.mainColor};
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #40a9ff;
  }
`;

export const Tip = ({ title, content }) => (
  <Popover title={title} content={content}>
    <Icon type="question-circle" theme="twoTone" />
  </Popover>
);

const borderColorChange2x = keyframes`
  0% {
    border-color: ${colorUsage.mainColor};
  }
  100% {
    border-color: ${colorUsage.secondaryColor};
  }
`;

export const AnimatedButton = styled.button`
  background: transparent;
  color: ${colorUsage.reverseColor};
  border: solid 2px ${colorUsage.mainColor};
  -webkit-animation: ${borderColorChange2x} 1s linear infinite alternate both;
  animation: ${borderColorChange2x} 1s linear infinite alternate both;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.043) 0px 2px 0px 0px;
  box-sizing: border-box;
  cursor: pointer;
  font-family: ${fontFamily.main};
  font-stretch: 100%;
  font-weight: 400;
  height: 32px;
  line-height: 21px;
  outline: none;
  padding: 4px 15px;
`;

export const Code = styled.code`
  background-color: ${colorUsage.reverseColor};
  color: ${colorUsage.mainColor};
  font-family: Monospace;
  padding: 4px;
`;

const rotation = keyframes`
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
`;

const CenteredOverlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${colorUsage.white};
  text-align: center;
  p {
    margin-top: 10px;
  }
`;
const SpiningLogo = styled.img`
  width: 40px;
  height: 40px;
  -webkit-animation: ${rotation} 2s infinite linear;
  animation: ${rotation} 2s infinite linear;
`;

export const Loader = ({ text, children }) => (
  <CenteredOverlay>
    <SpiningLogo src={logo} alt="Loading..." />
    {text && <p>{text}</p>}
    {children}
  </CenteredOverlay>
);
