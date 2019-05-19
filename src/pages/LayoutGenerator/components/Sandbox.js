import Tabs from 'antd/lib/tabs';
import Icon from 'antd/lib/icon';
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styled, { keyframes } from 'styled-components';
import EditableContainers from './EditableContainers';
import MockupSandbox from './MockupSandbox';
import Example1 from './examples/Example1';
import Example2 from './examples/Example2';
import Example3 from './examples/Example3';
import { colorUsage } from '../../../stylesheet';

const Examples = styled.div`
  flex: 1;
  min-height: 400px;
  background: ${colorUsage.darkColor};
`;

const ExampleContainer = styled.div`
  margin: auto;
  width: 90%;
  border-radius: 4px;
  height: 95%;
  background-color: ${colorUsage.reverseColor};
  .ant-tabs {
    height: 100%;
    .ant-tabs-content {
      height: calc(100% - 36px);
      padding: 10px;
      display: flex;
      align-items: center;
    }
    .ant-tabs-bar {
      margin: 0;
      padding: 0 30px;
      .ant-tabs-nav-scroll {
        text-align: center;
      }
    }
  }
`;

const colorChange2x = keyframes`
  0% {
    color: ${colorUsage.mainColor};
  }
  100% {
    color: ${colorUsage.secondaryColor};
  }
`;

export const MockupCTA = styled.span`
  font-weight: bold;

  i {
    -webkit-animation: ${colorChange2x} 1s linear infinite alternate both;
    animation: ${colorChange2x} 1s linear infinite alternate both;
  }

  span {
    margin-right: 8px;
  }
`;

const Sandbox = ({
  displayBlocks,
  animateElements,
  childrenContentMap,
  childrenList,
  childrenPropsMap,
  disableElementsAnimation,
  marginInfo,
  rootContainerProps,
  examplesActiveKey,
  setExamplesActiveKey,
  highlightExampleBlocks,
}) => {
  // Initialize mockup preview
  const [mockupPreview, setMockupPreview] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => setMockupPreview(URL.createObjectURL(acceptedFiles[0])),
  });
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(mockupPreview);
    },
    [mockupPreview],
  );

  return (
    <Examples>
      <ExampleContainer>
        {displayBlocks && (
          <EditableContainers
            animateElements={animateElements}
            childrenContentMap={childrenContentMap}
            childrenList={childrenList}
            childrenPropsMap={childrenPropsMap}
            disableElementsAnimation={disableElementsAnimation}
            marginInfo={marginInfo}
            rootContainerProps={rootContainerProps}
          />
        )}
        <Tabs
          size="small"
          tabPosition="top"
          activeKey={examplesActiveKey}
          onChange={setExamplesActiveKey}
          animated={{ inkBar: true, tabPane: false }}
        >
          <Tabs.TabPane tab="First example" key="1">
            <Example1 highlightExampleBlocks={highlightExampleBlocks} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <MockupCTA>
                <Icon type="star" theme="filled" />
                <span>Your mockup</span>
                <Icon type="star" theme="filled" />
              </MockupCTA>
            }
            key="2"
            style={{ height: '100%' }}
          >
            <MockupSandbox
              mockupPreview={mockupPreview}
              getInputProps={getInputProps}
              getRootProps={getRootProps}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chat layout" key="3">
            <Example2 />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Bank statement" key="4">
            <Example3 />
          </Tabs.TabPane>
        </Tabs>
      </ExampleContainer>
    </Examples>
  );
};

export default Sandbox;
