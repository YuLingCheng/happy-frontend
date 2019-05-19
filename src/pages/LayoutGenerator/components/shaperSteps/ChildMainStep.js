import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import Input from 'antd/lib/input/Input';
import Row from 'antd/lib/row';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { Tip } from '../components';

const ChildMainStep = ({
  id,
  isRowDirection,
  childrenContentMap,
  setChildContent,
  childrenPropsMap,
  setChildProp,
}) => (
  <>
    <h4>3 strategies to define the size:</h4>
    <Divider orientation="left" style={{ marginTop: 0 }}>
      <b>1) Take the size of its content</b>:
    </Divider>
    <p>Simulate content in the child (text only)</p>
    <TextArea
      value={childrenContentMap[id]}
      autosize={{ minRows: 2, maxRows: 6 }}
      onChange={setChildContent(id)}
    />
    <Divider orientation="left">
      <b>2) Specific size</b>:
    </Divider>
    <Row gutter={8}>
      <Col span={12}>
        <Input
          addonBefore="width:"
          size="small"
          value={childrenPropsMap[id] && childrenPropsMap[id].width}
          onChange={setChildProp(id)('width')}
        />
      </Col>
      <Col span={12}>
        <Input
          addonBefore="height:"
          size="small"
          value={childrenPropsMap[id] && childrenPropsMap[id].height}
          onChange={setChildProp(id)('height')}
        />
      </Col>
    </Row>
    <Divider orientation="left">
      <b>3) Take available space {isRowDirection ? 'horizontally' : 'vertically'}</b>:
    </Divider>
    <Row gutter={8}>
      <Col span={12}>
        <Input
          addonBefore="flex-grow:"
          size="small"
          value={childrenPropsMap[id] && childrenPropsMap[id].flexGrow}
          onChange={setChildProp(id)('flexGrow')}
        />
      </Col>
      <Tip
        title="flex-grow"
        content={
          <div>
            <p>Set flex-grow = 1 if you need your child to take the available space.</p>
            <p>Set a bigger if you want it to grow more than another child.</p>
          </div>
        }
      />
    </Row>
  </>
);

export default ChildMainStep;
