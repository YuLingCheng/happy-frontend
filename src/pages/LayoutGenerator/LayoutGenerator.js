import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Col, Collapse, Divider, Input, InputNumber, Tabs, Radio, Row } from 'antd';
import { MainContainer, Ol, PreviewContainer, ToolContainer } from './components';

const rootContainerBg = 'rgba(213, 183, 84, 0.3)';
const RootContainer = styled.div`
  background: ${rootContainerBg};
  display: flex;
  box-sizing: border-box;

  & :not(:last-child) {
    ${props => `margin-${props.marginInfo.isRowDirection ? 'right' : 'bottom'}: ${props.marginInfo.childrenMargin};`}
  }
`;
const childBaseColor = 'rgba(11, 139, 0, 0.54)';
const Child = styled.div`
background: ${childBaseColor};
color: white;
`;
const ElementIcon = ({color}) => (<span style={{color: color, fontSize: '20px'}}>&#9635;</span>)

const LayoutGenerator = () => {
  const [rootContainerProps, setRootContainerProps] = useState({
    flexDirection: 'row',
    padding: '0',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: 'auto',
  })
  const isRowDirection = rootContainerProps.flexDirection === 'row';
  const setRootContainerValue = (prop) => ({target}) => setRootContainerProps({...rootContainerProps, [prop]: target.value})
  const [childrenProps, setChildrenProps] = useState({
    padding: '10px',
  })
  const [childrenNb, setChildrenNb] = useState(1)
  const childrenList = [...Array(childrenNb).keys()].map(id => id + 1)
  const getChildColor = (id) => `hue-rotate(${id/childrenList.length*360}deg)`
  const [childrenPropsMap, setChildPropsMap] = useState({})
  const setChildProp = (id) => (prop) => ({target}) => setChildPropsMap({
    ...childrenPropsMap,
    [id]: {
      ...childrenPropsMap[id],
      [prop]: target.value
    }
  })
  const [childrenMargin, setChildrenMargin] = useState('0')
  const setChildrenMarginValue = ({target}) => setChildrenMargin(target.value)
  const marginInfo = { isRowDirection, childrenMargin }

  return (
  <MainContainer>
    <PreviewContainer>
      <RootContainer style={rootContainerProps} marginInfo={marginInfo}>
        {childrenList.map(id => (
          <Child key={id} style={{...childrenProps, ...childrenPropsMap[id], filter: getChildColor(id)}}>Child {id}</Child>)
        )}
      </RootContainer>
    </PreviewContainer>
    <ToolContainer>
      <Card title="Layout Toolbox">
        <Tabs size="small" type="card">
          <Tabs.TabPane tab={<span>Root container <ElementIcon color={rootContainerBg} /></span>} key={1}>
            <Card type="inner" title="1. Define the root container size" style={{backgroundColor: rootContainerBg}}>
              <Row gutter={10}>
              <Col span={10}>
                <Input addonBefore="width:" size="small" defaultValue="100%" onChange={setRootContainerValue('width')}/>
              </Col>
              <Col span={10}>
                <Input addonBefore="height:" size="small" defaultValue="auto" onChange={setRootContainerValue('height')}/>
              </Col>
              </Row>
            </Card>
            <Card type="inner" title="2. Define the number of children">
              <InputNumber size="small" defaultValue={1} min={1} onChange={setChildrenNb} />
            </Card>
            <Card type="inner" title="3. Define the chlidren sorting direction">
                <Radio.Group size="small" defaultValue="row" buttonStyle="solid" onChange={setRootContainerValue('flexDirection')}>
                  <Radio.Button value="row">row</Radio.Button>
                  <Radio.Button value="column">column</Radio.Button>
                </Radio.Group>
            </Card>
            <Card type="inner" title="4. Define the children position relatively to their container">
              <Divider orientation="left" style={{marginTop: 0}}>Space between container and children:</Divider>
              <Row>
                <Col span={10}>
                  <Input addonBefore="padding:" size="small" defaultValue="0" onChange={setRootContainerValue('padding')}/>
                </Col>
              </Row>
              <Divider orientation="left">justify-content:</Divider>
              <Radio.Group size="small" defaultValue="flex-start" buttonStyle="solid" onChange={setRootContainerValue('justifyContent')}>
                <Radio.Button value="flex-start">flex-start</Radio.Button>
                <Radio.Button value="flex-end">flex-end</Radio.Button>
                <Radio.Button value="center">center</Radio.Button>
                <Radio.Button value="space-between">space-between</Radio.Button>
                <Radio.Button value="space-around">space-around</Radio.Button>
              </Radio.Group>
            <Divider orientation="left">align-items:</Divider>
              <Radio.Group size="small" defaultValue="flex-start" buttonStyle="solid" onChange={setRootContainerValue('alignItems')}>
                <Radio.Button value="flex-start">flex-start</Radio.Button>
                <Radio.Button value="flex-end">flex-end</Radio.Button>
                <Radio.Button value="center">center</Radio.Button>
                <Radio.Button value="stretch">stretch</Radio.Button>
              </Radio.Group>
            </Card>
            <Card type="inner" title={`5. Can children display on several ${isRowDirection ? 'lines' : 'columns'} ?`}>
              <Divider orientation="left" style={{marginTop: 0}}>flex-wrap:</Divider>
              <Radio.Group size="small" defaultValue="nowrap" buttonStyle="solid" onChange={setRootContainerValue('flexWrap')}>
                <Radio.Button value="nowrap">nowrap</Radio.Button>
                <Radio.Button value="wrap">wrap</Radio.Button>
                <Radio.Button value="wrap-reverse">wrap-reverse</Radio.Button>
              </Radio.Group>
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span>Children <ElementIcon color={childBaseColor} /></span>} key={2}>
            <Card type="inner" title="If a child has specific size in the container, define it">
              <Collapse defaultActiveKey={['1']}>
                {childrenList.map(id => (
                  <Collapse.Panel header={`Child ${id}`} key={id} style={{backgroundColor: childBaseColor, filter: getChildColor(id)}}>
                    <Tabs size="small">
                      <Tabs.TabPane tab="Size" key={1}>
                        <Divider orientation="left" style={{marginTop: 0}}>Specific size:</Divider>
                        <Row gutter={8}>
                          <Col span={20}>
                            <Input addonBefore="flex-basis:" size="small" defaultValue="auto" onChange={setChildProp(id)('flexBasis')}/>
                          </Col>
                        </Row>
                        <Divider orientation="left">Take available space:</Divider>
                        <Row gutter={8}>
                          <Col span={22}>
                            <Input addonBefore="flex-grow:" size="small" defaultValue="0" onChange={setChildProp(id)('flexGrow')}/>
                          </Col>
                        </Row>
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Advanced" key={2}>
                        <Divider orientation="left" style={{marginTop: 0}}>align-self:</Divider>
                        <Radio.Group size="small" defaultValue="auto" buttonStyle="solid" onChange={setChildProp(id)('alignSelf')}>
                          <Radio.Button value="auto">auto</Radio.Button>
                          <Radio.Button value="flex-start">flex-start</Radio.Button>
                          <Radio.Button value="flex-end">flex-end</Radio.Button>
                          <Radio.Button value="center">center</Radio.Button>
                          <Radio.Button value="baseline">baseline</Radio.Button>
                          <Radio.Button value="stretch">stretch</Radio.Button>
                        </Radio.Group>
                      </Tabs.TabPane>
                    </Tabs>
                  </Collapse.Panel>
                ))}
              </Collapse>
            </Card>
            <Card type="inner" title="Else, define the children position relatively to each other">
              <Divider orientation="left" style={{marginTop: 0}}>Gutter size:</Divider>
              <Row gutter={8}>
                <Col span={14}>
                  <Input addonBefore={`margin-${isRowDirection ? 'right' : 'bottom'}:`} size="small" defaultValue="0" onChange={setChildrenMarginValue}/>
                </Col>
              </Row>
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </Card>

    </ToolContainer>
  </MainContainer>
)};

export default LayoutGenerator;