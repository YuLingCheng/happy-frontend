import React from 'react';
import styled from 'styled-components';
import layoutModel from '../../assets/images/mockup-placeholder.png'
export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const PreviewContainer = styled.div`
  flex: 1;
  background-image: url(${props => props.mockupPreview || layoutModel});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: lightGrey;
`
export const ToolContainer = styled.div`
  flex-basis: 35%;
  background: white;
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
    font-size: 14px;
  }
`

export const Ol = styled.ol`
  padding-inline-start: 15px;
`;

export const Helper = styled.div`
  width: 100%;
`

Helper.Content = styled.div`
  width: 50%;
  margin: auto;
  margin-top: 50px;
  border: 1px dashed #145678;
  color: #145678;
  font-family: 'Noto Sans TC', sans-serif;
  background-color: rgb(20, 86, 120, 0.05);

  .dropzone {
    padding: 20px;
    outline: none;
  }
`