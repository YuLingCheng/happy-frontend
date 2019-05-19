import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import Input from 'antd/lib/input/Input';
import Radio from 'antd/lib/radio';
import Row from 'antd/lib/row';
import React from 'react';

const ChildAdvancedStep = ({
  id,
  isRowDirection,
  childrenPropsMap,
  setChildProp,
  getChildFlexProp,
  getChildProperties,
}) => (
  <>
    <h4>
      Does this child have a <b>{isRowDirection ? 'vertical' : 'horizontal'} position</b> that's
      different from it's siblings?
    </h4>
    <p>Use align-self to define it:</p>
    <Radio.Group
      size="small"
      value={childrenPropsMap[id] && childrenPropsMap[id].alignSelf}
      buttonStyle="solid"
      onChange={setChildProp(id)('alignSelf')}
    >
      <Radio.Button value="auto">auto</Radio.Button>
      <Radio.Button value="flex-start">flex-start</Radio.Button>
      <Radio.Button value="flex-end">flex-end</Radio.Button>
      <Radio.Button value="center">center</Radio.Button>
      <Radio.Button value="baseline">baseline</Radio.Button>
      <Radio.Button value="stretch">stretch</Radio.Button>
    </Radio.Group>
    <br />
    <Divider orientation="left">
      <b>absolute position</b>:
    </Divider>
    <p>
      Is the child at a specific position relatively to the container? If yes, set its position to
      "absolute"
    </p>
    <p>
      If the child has a spacific position relatively to the window and not its container, set the
      position to "fixed"
    </p>
    <Radio.Group
      size="small"
      value={childrenPropsMap[id] && childrenPropsMap[id].position}
      buttonStyle="solid"
      onChange={setChildProp(id)('position')}
    >
      <Radio.Button value="static">static</Radio.Button>
      <Radio.Button value="absolute">absolute</Radio.Button>
      <Radio.Button value="fixed">fixed</Radio.Button>
      <Radio.Button value="relative">relative</Radio.Button>
    </Radio.Group>
    <Row gutter={8}>
      <Col span={12}>
        <Input
          addonBefore="top:"
          size="small"
          value={childrenPropsMap[id] && childrenPropsMap[id].top}
          onChange={setChildProp(id)('top')}
        />
        <Input
          addonBefore="left:"
          size="small"
          value={childrenPropsMap[id] && childrenPropsMap[id].left}
          onChange={setChildProp(id)('left')}
        />
        <Input
          addonBefore="right:"
          size="small"
          value={childrenPropsMap[id] && childrenPropsMap[id].right}
          onChange={setChildProp(id)('right')}
        />
        <Input
          addonBefore="bottom:"
          size="small"
          value={childrenPropsMap[id] && childrenPropsMap[id].bottom}
          onChange={setChildProp(id)('bottom')}
        />
      </Col>
    </Row>
    <Divider orientation="left">
      <b>Advanced Flex</b>
    </Divider>
    <p>
      <b>Does the child have an initial main size?</b> If yes, set a flex-basis instead of a width
    </p>
    <Row gutter={8}>
      <Col span={20}>
        <Input
          addonBefore="flex-basis:"
          size="small"
          value={childrenPropsMap[id] && childrenPropsMap[id].flexBasis}
          onChange={setChildProp(id)('flexBasis')}
        />
      </Col>
    </Row>
    <br />
    <p>
      <b>Does the child shrink if there is not enough space available?</b> Set flex-shrink to 0 if
      fixed size, > 0 if it should shrink when not enough space
    </p>
    <Row gutter={8}>
      <Col span={16}>
        <Input
          addonBefore="flex-shrink:"
          size="small"
          value={childrenPropsMap[id] && childrenPropsMap[id].flexShrink}
          onChange={setChildProp(id)('flexShrink')}
        />
      </Col>
    </Row>
    <Divider orientation="left">
      <b>Synthetic flex property</b>
    </Divider>
    <p>flex : flex-grow flex-shrink flex-basis</p>
    <Row gutter={8}>
      <Col span={22}>
        <Input
          addonBefore="flex:"
          size="small"
          disabled
          value={getChildFlexProp(getChildProperties(id))}
        />
      </Col>
    </Row>
  </>
);

export default ChildAdvancedStep;
