import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import React from 'react';
import styled from 'styled-components';
import { colorUsage } from '../../../stylesheet';

const MockupContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Mockup = styled.div`
  width: 100%;
  height: 90%;
  background-image: url(${props => props.mockup});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;

const Dropzone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${colorUsage.darkColor};

  ${props => !props.mockup
    && `
    border: 1px dashed ${colorUsage.mainColor};
  `}

  &:focus {
    outline: none;
  }

  > i {
    font-size: xx-large;
    margin-bottom: 10px;
  }
`;

const MockupSandbox = ({ mockupPreview, getInputProps, getRootProps }) => (
  <MockupContainer>
    {mockupPreview && <Mockup mockup={mockupPreview} />}
    <Dropzone {...getRootProps()} mockup={mockupPreview}>
      <input {...getInputProps()} />
      {!mockupPreview && (
        <>
          <Icon type="file-image" />
          <p>Drag and drop your mockup here</p>
        </>
      )}
      <Button type="primary" icon="upload" ghost size="small">
        {mockupPreview ? 'Replace Mockup' : 'Load Mockup'}
      </Button>
    </Dropzone>
  </MockupContainer>
);

export default MockupSandbox;
