import _isEqual from 'lodash/isEqual';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDropzone } from 'react-dropzone';
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import xcode from 'react-syntax-highlighter/dist/esm/styles/hljs/xcode';
import styled from 'styled-components';
import { Button, Card, Col, Collapse, Divider, Drawer, Icon, Input, InputNumber, Tabs, Radio, Row } from 'antd';
import { ExampleHeader, ExampleFooter, Helper, MainContainer, PreviewContainer, ToolContainer } from './components';
import Cup from '../../assets/decorations/Cup';

SyntaxHighlighter.registerLanguage('css', css);

const rootContainerBg = 'rgba(252, 209, 67, 0.3)';
const RootContainer = styled.div`
  background: ${rootContainerBg};
  display: flex;
  box-sizing: border-box;
  position: relative;
  z-index: 10;

  & :not(:last-child) {
    ${props => `margin-${props.marginInfo.isRowDirection ? 'right' : 'bottom'}: ${props.marginInfo.childrenMargin};`}
  }
`;
const childBaseColor = 'rgba(0, 113, 139, 0.54)';
const Child = styled.div`
background: ${childBaseColor};
color: white;
position: relative;
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
  const initialChildProps = {
    flexBasis: 'auto',
    flexGrow: 0,
    alignSelf: 'auto',
  };
  const [childrenNb, setChildrenNb] = useState(1)
  const childrenList = [...Array(childrenNb).keys()].map(id => id + 1)
  const getChildColor = (id) => `hue-rotate(${(id-1)/childrenList.length*360}deg)`
  const [childrenPropsMap, setChildPropsMap] = useState({
    1: initialChildProps
  })
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

  const [mockupPreview, setMockupPreview] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => setMockupPreview(URL.createObjectURL(acceptedFiles[0]))
  });
  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    URL.revokeObjectURL(mockupPreview);
  }, [mockupPreview]);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [codeString, setCodeString] = useState('.container { background-color: blue; }');
  const exportCode = () => {
    setCodeString(`.container {
  width: ${rootContainerProps.width};
  height: ${rootContainerProps.height};
  box-sizing: border-box;
  display: flex;
  flexDirection: ${rootContainerProps.flexDirection};
  padding: ${rootContainerProps.padding};
  justify-content: ${rootContainerProps.justifyContent};
  align-items: ${rootContainerProps.alignItems};
}
${marginInfo.childrenMargin !== '0' ? `.container :not(:last-child) {
  margin-${isRowDirection ? 'right' : 'bottom'}: ${marginInfo.childrenMargin};
}` : ''}
${childrenList.map(id => {
  const childProperties = { ...initialChildProps, ...childrenPropsMap[id] };
  if (_isEqual(childProperties, initialChildProps)) return '';
  return `.child${id} {
  flex-basis: ${childProperties.flexBasis};
  flex-grow: ${childProperties.flexGrow};
  align-self: ${childProperties.alignSelf};
}`}).join('\n')}`);
    setDrawerOpen(true);
  }

  const renderPageHeader = () => (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <span>Layout Toolbox</span>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <Button type="primary" icon="upload" ghost size="small">Load Mockup</Button>
        </div>&nbsp;
        <Button type="primary" size="small" onClick={exportCode}>Export Code</Button>
      </div>
    </div>
  )

  return (
  <MainContainer>
    <PreviewContainer mockupPreview={mockupPreview}>
      <RootContainer style={rootContainerProps} marginInfo={marginInfo}>
        {childrenList.map(id => (
          <Child key={id} style={{padding: '10px', filter: getChildColor(id), ...childrenPropsMap[id]}}>Child {id}</Child>)
        )}
      </RootContainer>
      {!mockupPreview && <Helper>
          <ExampleHeader>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Cup.Icon cupSize="32" sizeUnit="px" top="-3px">
                  <Cup.Handle cupSize="32" sizeUnit="px" />
                </Cup.Icon>
                Layout Generator
              </div>
              <div>
                HOME ABOUT LOGIN
              </div>
          </ExampleHeader>
          <Helper.Content>
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
                <h2>How to</h2>
                <p>1. Drag and drop a mockup here or click to upload <Icon type="upload" /></p>
                <p>2. Shape the container <ElementIcon color={rootContainerBg} /> and its children <ElementIcon color={childBaseColor} /> to match the layout using the Layout Toolbox</p>
                <p>3. Export the code to use it on your project</p>
            </div>
          </Helper.Content>
          <ExampleFooter>
            Privacy policy - Terms and conditions
          </ExampleFooter>
      </Helper>}
    </PreviewContainer>
    <ToolContainer>
      <Card title={renderPageHeader()}>
        <Tabs type="card">
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
                        <Divider orientation="left" style={{marginTop: 0}}>Specific size ({isRowDirection ? 'Width' : 'Height'}):</Divider>
                        <Row gutter={8}>
                          <Col span={20}>
                            <Input addonBefore="flex-basis:" size="small" defaultValue="auto" onChange={setChildProp(id)('flexBasis')}/>
                          </Col>
                        </Row>
                        <Divider orientation="left">Take available space ({isRowDirection ? 'Width' : 'Height'}):</Divider>
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
    <Drawer
      title="Generated Layout Code"
      visible={isDrawerOpen}
      placement="right"
      width="40%"
      onClose={() => setDrawerOpen(false)}
      bodyStyle={{ padding: '15px', position: 'relative'}}
    >
      <CopyToClipboard text={codeString} onCopy={() => setDrawerOpen(false)}>
        <Button icon="copy" size="small" style={{position: 'absolute', right: '5px', top: '5px'}}>
          Copy to clipboard
        </Button>
      </CopyToClipboard>
      <SyntaxHighlighter language='css' style={xcode}>{codeString}</SyntaxHighlighter>
    </Drawer>
  </MainContainer>
)};

export default LayoutGenerator;