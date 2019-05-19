import React from 'react';
import styled from 'styled-components';
import { Button, Icon, Popover } from 'antd';

const mainColor = 'rgb(24, 144, 255)';
const darkColor = '#0c3a65';
const reverseColor = 'white';
export const highlightChildColor = '#faad14';
export const highlightContainerColor = '#52c41a';

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const PreviewContainer = styled.div`
  flex: 1;
  background-image: url(${props => props.mockupPreview});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: lightGrey;
`
export const ToolContainer = styled.div`
  flex: 0 0 35%;
  background: ${reverseColor};
  overflow: auto;

  .ant-card-head {
    min-height: 40px;
    padding: 0 15px;
  }
  .ant-card-head-title {
    padding: 15px 0;
  }
  .ant-card-type-inner .ant-card-head {
    min-height: 20px;
  }
  .ant-card-type-inner .ant-card-head-title {
    padding: 5px;
    white-space: normal;
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
`

export const Helper = styled.div`
  width: 65%;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${reverseColor};

  ${props => props.highlight && `border: solid 3px ${highlightContainerColor};`}
`

Helper.Content = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0 30px;
  color: ${darkColor};
  font-family: 'Noto Sans TC', sans-serif;
  font-size: x-small;

  h2 {
    color: ${darkColor};
    font-size: small;
    font-weight: bold;
  }

  .dropzone {
    border: 1px dashed ${mainColor};
    background-color: rgb(20, 86, 120, 0.05);
    width: 40vw;
    padding: 20px;
    outline: none;
    cursor: pointer;
  }
`

Helper.Intro = styled.div`
  padding: 30px 0 15px;
  text-align: center;
  color: ${darkColor};

  h1 {
    color: ${darkColor};
    font-size: medium;
    font-weight: bold;
  }
`

Helper.KeyPoints = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: start;
  color: ${reverseColor};
  background-color: ${darkColor};
  padding: 20px 30px;
  text-align: left;
  flex-wrap: wrap
  font-size: x-small;

  .keypoints__header {
    text-align: center;
    flex: 1 0 100%;
    margin-bottom: 10px;
    font-size: small;
  }

  .keypoint {
    flex: 1;
    display: flex;

    &:not(:last-child) {
      margin-right: 20px;
    }

    i {
      font-size: 25px;
      margin-right: 5px;
    }
  }
`

export const ExampleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${mainColor};
  height: 45px;
  padding: 0 10px;
  color: ${darkColor};
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: bold;

  ${props => props.highlight && `border: solid 3px ${highlightChildColor};`}
`
export const ExampleMain = styled.div`
  ${props => props.highlight && `border: solid 3px ${highlightChildColor};`}
`;

export const ExampleFooter = styled.div`
  border-top: 1px solid ${mainColor};
  padding: 20px;
  text-align: center;
  color: ${darkColor};
  font-family: 'Noto Sans TC', sans-serif;
  font-size: x-small;

  ${props => props.highlight && `border: solid 3px ${highlightChildColor};`}
`

export const HighlightableChild = styled.div`
  ${props => props.highlight && `border: solid 3px ${highlightChildColor};`}
`
export const HighlightableContainer = styled.div`
  ${props => props.highlight && `border: solid 1px ${highlightContainerColor};`}
`

export const PageHeader = ({getRootProps, getInputProps}) => (
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <span><Icon type="layout" theme="filled" /> Layout Toolbox</span>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <Button type="primary" icon="upload" ghost size="small">Load Mockup</Button>
      </div>
    </div>
  </div>
);

export const Tip = ({title, content}) => (
  <Popover title={title} content={content}><Icon type="question-circle" theme="filled" /></Popover>
);