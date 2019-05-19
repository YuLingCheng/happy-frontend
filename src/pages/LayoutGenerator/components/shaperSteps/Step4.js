import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import Input from 'antd/lib/input/Input';
import Radio from 'antd/lib/radio';
import Row from 'antd/lib/row';
import React from 'react';
import { Tip } from '../components';
import NextStepButton from './NextStepButton';

const Step4 = ({
  isRowDirection,
  rootContainerProps,
  setRootContainerValue,
  onNextStepButtonClick,
}) => (
  <>
    <div>
      <h3>Define the children position relatively to their container</h3>
      <h4>What is the {isRowDirection ? 'Horizontal' : 'Vertical'} distribution?</h4>
      <p>Use justify-content to define it:</p>
      <Radio.Group
        size="small"
        value={rootContainerProps.justifyContent}
        buttonStyle="solid"
        onChange={setRootContainerValue('justifyContent')}
      >
        <Radio.Button value="flex-start">flex-start</Radio.Button>
        <Radio.Button value="flex-end">flex-end</Radio.Button>
        <Radio.Button value="center">center</Radio.Button>
        <Radio.Button value="space-between">space-between</Radio.Button>
        <Radio.Button value="space-around">space-around</Radio.Button>
      </Radio.Group>
      <Divider />
      <h4>What is the {!isRowDirection ? 'Horizontal' : 'Vertical'} distribution?</h4>
      <p>Use align-items to define it:</p>
      <Radio.Group
        size="small"
        value={rootContainerProps.alignItems}
        buttonStyle="solid"
        onChange={setRootContainerValue('alignItems')}
      >
        <Radio.Button value="flex-start">flex-start</Radio.Button>
        <Radio.Button value="flex-end">flex-end</Radio.Button>
        <Radio.Button value="center">center</Radio.Button>
        <Radio.Button value="stretch">stretch</Radio.Button>
        <Radio.Button value="baseline">baseline</Radio.Button>
      </Radio.Group>
      <Divider />
      <h4>
        Is there a specific space between the container's border and its children ?&nbsp;
        {
          <Tip
            title="Padding"
            content={
              <div>
                <p>Use this only if all children are at the same distance from the container</p>
                <p>
                  Imagine that children have a colored background.
                  <br />
                  Should there be a gap between them and the parent?
                </p>
              </div>
            }
          />
        }
      </h4>
      <p>If yes, set the padding</p>
      <Row>
        <Col span={16}>
          <Input
            addonBefore="padding:"
            size="small"
            value={rootContainerProps.padding}
            onChange={setRootContainerValue('padding')}
          />
        </Col>
      </Row>
    </div>
    <NextStepButton onClick={onNextStepButtonClick} />
  </>
);

export default Step4;
