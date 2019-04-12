import _isEqual from 'lodash/isEqual';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDropzone } from 'react-dropzone';
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import xcode from 'react-syntax-highlighter/dist/esm/styles/hljs/xcode';
import styled from 'styled-components';
import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Icon,
  Input,
  InputNumber,
  notification,
  Radio,
  Row,
  Tabs,
} from 'antd';
import {
  ExampleHeader,
  ExampleFooter,
  ExampleMain,
  Helper,
  highlightContainerColor,
  highlightChildColor,
  MainContainer,
  PageHeader,
  PreviewContainer,
  Tip,
  ToolContainer,
} from './components';
import Cup from '../../assets/decorations/Cup';
import { getTutoMessageMap } from './tutorialMessages';

SyntaxHighlighter.registerLanguage('css', css);

// Colored layers for container and children
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

// The LayoutGenerator, where all the logic is
const LayoutGenerator = () => {
  // initialize the root container layer
  const initialRootContainerProps = {
    flexDirection: 'row',
    padding: '0',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '200px',
    height: '200px',
    top: '0px',
    left: '0px',
    flexWrap: 'nowrap',
  };
  const [rootContainerProps, setRootContainerProps] = useState(initialRootContainerProps);
  const setRootContainerValue = (prop) => ({target}) => setRootContainerProps({
    ...rootContainerProps,
    [prop]: target.value
  });

  const isRowDirection = rootContainerProps.flexDirection === 'row';

  // initialize the children layers
  const [childrenNb, setChildrenNb] = useState(1);
  const initialChildProps = {
    flexBasis: 'auto',
    flexGrow: '0',
    flexShrink: '1',
    alignSelf: 'auto',
  };
  const changeChildrenNb = (newNumber) => {
    setChildrenNb(prevNumber => {
      if (prevNumber < newNumber) {
        setChildPropsMap(prev => ({
          ...prev,
          [newNumber]: initialChildProps,
        }));
      }
      return newNumber;
    });
  }

  const childrenList = [...Array(childrenNb).keys()].map(id => id + 1);
  const getChildColor = (id) => `hue-rotate(${(id-1)/childrenList.length*360}deg)`;

  const [childrenPropsMap, setChildPropsMap] = useState({
    1: initialChildProps,
  });
  const setChildProp = (id) => (prop) => ({target}) => setChildPropsMap(prev => ({
    ...prev,
    [id]: {
      ...prev[id],
      [prop]: target.value,
    },
  }));

  // Initialize the margin between children
  const [childrenMargin, setChildrenMargin] = useState('0');
  const setChildrenMarginValue = ({target}) => setChildrenMargin(target.value);
  const marginInfo = { isRowDirection, childrenMargin };

  const getChildProperties = id => {
    return { ...initialChildProps, ...childrenPropsMap[id] };
  }
  const getChildFlexProp = childProperties => {
    return `${childProperties.flexGrow} ${childProperties.flexShrink} ${childProperties.flexBasis}`;
  }

  // Initialize mockup preview
  const [mockupPreview, setMockupPreview] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => setMockupPreview(URL.createObjectURL(acceptedFiles[0]))
  });
  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    URL.revokeObjectURL(mockupPreview);
  }, [mockupPreview]);

  // Logic to compute the css code
  const [codeString, setCodeString] = useState('');
  const exportCode = () => {
    setCodeString(`.container {
    ${[
    `width: ${rootContainerProps.width};`,
    `height: ${rootContainerProps.height};`,
    `box-sizing: border-box;`,
    `display: flex;`,
    `flex-direction: ${rootContainerProps.flexDirection};`,
    `padding: ${rootContainerProps.padding};`,
    `justify-content: ${rootContainerProps.justifyContent};`,
    rootContainerProps.alignItems !== initialRootContainerProps.alignItems && `align-items: ${rootContainerProps.alignItems};`,
    rootContainerProps.flexWrap !== initialRootContainerProps.flexWrap && `flex-wrap: ${rootContainerProps.flexWrap};`,
  ].filter(Boolean).join('\n    ')}
}
${marginInfo.childrenMargin !== '0' ? `.container :not(:last-child) {
  margin-${isRowDirection ? 'right' : 'bottom'}: ${marginInfo.childrenMargin};
}` : ''}
${childrenList.map(id => {
  const childProperties = getChildProperties(id);
  const childFlexProperties = getChildFlexProp(childProperties);
  if (_isEqual(childProperties, initialChildProps)) return undefined;
  return `.child${id} {
    ${[
      getChildFlexProp(initialChildProps) !== childFlexProperties ? `flex: ${childFlexProperties};` : undefined,
      childProperties.alignSelf !== initialChildProps.alignSelf ? `align-self: ${childProperties.alignSelf};`: undefined
    ].filter(Boolean).join('\n    ')}
}`}).filter(Boolean).join('\n')}`);
  }

  // Tutorial
  const [displayBlocks, setDisplayBlocks] = useState(true);
  const [tutoStep, setTutoStep] = useState(null);
  const highlightExampleBlocks = tutoStep === 0;
  const tutoMessageMap = getTutoMessageMap(
    childBaseColor,
    rootContainerBg,
    highlightContainerColor,
    highlightChildColor
  );
  const stopTuto = () => {
    setTutoStep(null);
  };
  const defaultNotificationOptions = {
    duration: 0,
    key: 'tuto',
    onClose: stopTuto,
    style: { width: 500 }
  };
  notification.config({
    placement: 'bottomLeft',
    bottom: 10,
  });
  const updateNotification = (step) => {
    const tutoMessage = tutoMessageMap[step];
    if (!tutoMessage) {
      notification.success({
        ...defaultNotificationOptions,
        btn: <Button onClick={() => {stopTuto(); notification.close(defaultNotificationOptions.key);}}>Done</Button>,
        message: tutoMessageMap.finish.message,
        description: tutoMessageMap.finish.description,
      });
      return;
    }
    notification.info({
      ...defaultNotificationOptions,
      btn: <Button onClick={() =>updateNotification(step + 1)}>Next</Button>,
      message: tutoMessage.message,
      description: tutoMessage.description,
    });
  };
  const initTuto = () => {
    setDisplayBlocks(false);
    const btn = <Button onClick={() => {updateNotification(1);setDisplayBlocks(true);}}>Next</Button>;
    if (tutoStep === null) {
      setMockupPreview(null);
      notification.info({
        ...defaultNotificationOptions,
        btn,
        message: tutoMessageMap.start.message,
        description: tutoMessageMap.start.description,
      });
    }
    setTutoStep(0);
  };

  return (
  <MainContainer>
    <PreviewContainer mockupPreview={mockupPreview}>
      { displayBlocks && <RootContainer style={rootContainerProps} marginInfo={marginInfo}>
        {childrenList.map(id => (
          <Child key={id} style={{padding: '10px', filter: getChildColor(id), ...childrenPropsMap[id]}}>Child {id}</Child>)
        )}
      </RootContainer>}
      {!mockupPreview && <Helper highlight={highlightExampleBlocks}>
          <ExampleHeader highlight={highlightExampleBlocks}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Cup.Icon cupSize="32" sizeUnit="px" top="-3px">
                  <Cup.Handle cupSize="32" sizeUnit="px" />
                </Cup.Icon>
                Happy frontend
              </div>
              <div>
                <Icon type="home" /> Home <Icon type="question" /> About <Icon type="user" /> Login
              </div>
          </ExampleHeader>
          <ExampleMain highlight={highlightExampleBlocks}>
            <Helper.Intro>
              <h1>Happier frontend development</h1>
              <p>Learn how to integrate your mockup's layout by using this tool.</p>
              <p><Button type="primary" icon="caret-right" onClick={initTuto}>Walk me through!</Button></p>
            </Helper.Intro>
            <Helper.KeyPoints>
              <div className="keypoints__header">This will help you if</div>
              <div className="keypoint"><Icon type="border-verticle" /><span>You know about flex, padding and margin but you don't know how to combine them.</span></div>
              <div className="keypoint"><Icon type="gold" /><span>You don't know how to split the mockup integration.</span></div>
              <div className="keypoint"><Icon type="star" /><span>You don't know what the best css practice are when it comes to layout.</span></div>
            </Helper.KeyPoints>
            <Helper.Content>
              <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                  <h2>How to</h2>
                  <p>1. <Icon type="picture" /> Save your mockup as an image</p>
                  <p>2. <Icon type="table" /> Map out the different blocks, <b>always start from the biggest block</b> (You can print it and draw it if it helps)</p>
                  <p>3. Drag and drop a mockup here or click to upload <Icon type="upload" /></p>
                  <p>4. Shape the container <Icon type="project" theme="filled" style={{color: rootContainerBg}} /> and its children <Icon type="build" theme="filled" style={{color: childBaseColor}} /> to match the layout using the Layout Toolbox</p>
                  <p>5. Export the code <Icon type="code" theme="filled" /> to use it on your project</p>
                  <p>6. <Icon type="sync" /> Repeat the exercice recusrively</p>
              </div>
            </Helper.Content>
          </ExampleMain>
          <ExampleFooter highlight={highlightExampleBlocks}>
            Privacy policy - Terms and conditions
          </ExampleFooter>
      </Helper>}
    </PreviewContainer>
    <ToolContainer>
      <Card title={<PageHeader getInputProps={getInputProps} getRootProps={getRootProps} />}>
        <Tabs type="card" onTabClick={key => { if (key === "2") exportCode() }} >
          <Tabs.TabPane tab={<span>Shape</span>} key={1}>
            <Card type="inner" title="1. Shape the container (and move it if necessary)">
              <Row gutter={10}>
                <Col span={10}>
                  <Input addonBefore="width:" size="small" defaultValue="200px" onChange={setRootContainerValue('width')}/>
                </Col>
                <Col span={10}>
                  <Input addonBefore="height:" size="small" defaultValue="200px" onChange={setRootContainerValue('height')}/>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={10}>
                  <Input addonBefore="x offset:" size="small" defaultValue="0px" onChange={setRootContainerValue('left')}/>
                </Col>
                <Col span={10}>
                  <Input addonBefore="y offset:" size="small" defaultValue="0px" onChange={setRootContainerValue('top')}/>
                </Col>
                {<Tip title="Offset" content={(<p>Move the container on the mockup</p>)} />}
              </Row>
            </Card>
            <Card type="inner" title="2. Define the number of children">
              <InputNumber size="small" defaultValue={1} min={1} onChange={changeChildrenNb} />
            </Card>
            <Card type="inner" title="3. Define the children sorting direction">
                <Radio.Group size="small" defaultValue="row" buttonStyle="solid" onChange={setRootContainerValue('flexDirection')}>
                  <Radio.Button value="row">row</Radio.Button>
                  <Radio.Button value="column">column</Radio.Button>
                </Radio.Group>
            </Card>
            <Card type="inner" title="4. Define the children position relatively to their container">
              <Divider orientation="left" style={{marginTop: 0}}>{isRowDirection ? 'Horizontal' : 'Vertical'} distribution (justify-content):</Divider>
              <Radio.Group size="small" defaultValue="flex-start" buttonStyle="solid" onChange={setRootContainerValue('justifyContent')}>
                <Radio.Button value="flex-start">flex-start</Radio.Button>
                <Radio.Button value="flex-end">flex-end</Radio.Button>
                <Radio.Button value="center">center</Radio.Button>
                <Radio.Button value="space-between">space-between</Radio.Button>
                <Radio.Button value="space-around">space-around</Radio.Button>
              </Radio.Group>
              <Divider orientation="left">{isRowDirection ? 'Vertical' : 'Horizontal'} distribution (align-items):</Divider>
              <Radio.Group size="small" defaultValue="stretch" buttonStyle="solid" onChange={setRootContainerValue('alignItems')}>
                <Radio.Button value="flex-start">flex-start</Radio.Button>
                <Radio.Button value="flex-end">flex-end</Radio.Button>
                <Radio.Button value="center">center</Radio.Button>
                <Radio.Button value="stretch">stretch</Radio.Button>
              </Radio.Group>
              <Divider orientation="left">Known space between container's border and children:</Divider>
              <Row>
                <Col span={10}>
                  <Input addonBefore="padding:" size="small" defaultValue="0" onChange={setRootContainerValue('padding')}/>
                </Col>
                {<Tip title="Padding" content={(
                  <div>
                    <p>Use this only if all children are at the same distance from the container</p>
                    <p>Imagine that children have a colored background.
                      <br/>Should there be a gap between it and the parent?
                    </p>
                  </div>
                )} />}
              </Row>
            </Card>
            <Card type="inner" title={`5. Can children display on several ${isRowDirection ? 'lines' : 'columns'} ?`}>
              <Divider orientation="left" style={{marginTop: 0}}>flex-wrap:</Divider>
              <Radio.Group size="small" defaultValue="nowrap" buttonStyle="solid" onChange={setRootContainerValue('flexWrap')}>
                <Radio.Button value="nowrap">nowrap</Radio.Button>
                <Radio.Button value="wrap">wrap</Radio.Button>
                <Radio.Button value="wrap-reverse">wrap-reverse</Radio.Button>
              </Radio.Group>
              {<Tip title="Flex-wrap" content={(
                <div>
                  <p>Select 'wrap' for multi {isRowDirection ? 'lines' : 'columns'} </p>
                  <p>You can combine 'wrap' with 'flex-basis: 100%;' to isolate a child on one {isRowDirection ? 'line' : 'column'}</p>
                </div>
              )} />}
            </Card>
            <Card type="inner" title="If a child has specific size in the container, define it">
              <Collapse defaultActiveKey={['1']}>
                {childrenList.map(id => (
                  <Collapse.Panel header={<span><Icon type="build" theme="filled" style={{color: childBaseColor, filter: getChildColor(id)}} /> Child {id}</span>} key={id}>
                    <Tabs size="small">
                      <Tabs.TabPane tab="Size" key={1}>
                        <Divider orientation="left" style={{marginTop: 0}}>Specific {isRowDirection ? 'width' : 'height'}:</Divider>
                        <Row gutter={8}>
                          <Col span={20}>
                            <Input addonBefore="flex-basis:" size="small" defaultValue="auto" onChange={setChildProp(id)('flexBasis')}/>
                          </Col>
                          <Col span={16}>
                            <Input addonBefore="flex-shrink:" size="small" defaultValue="1" onChange={setChildProp(id)('flexShrink')}/>
                            0 if fixed size, > 0 if it should shrink when not enough space
                          </Col>
                        </Row>
                        <Divider orientation="left">Take available space ({isRowDirection ? 'Width' : 'Height'}):</Divider>
                        <Row gutter={8}>
                          <Col span={22}>
                            <Input addonBefore="flex-grow:" size="small" defaultValue="0" onChange={setChildProp(id)('flexGrow')}/>
                          </Col>
                        </Row>
                        <Row gutter={8}>

                        </Row>
                        <Divider />
                        <Row gutter={8}>
                          <Col span={22}>
                            <Input addonBefore="flex:" size="small" disabled value={getChildFlexProp(getChildProperties(id))} />
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
            <Card type="inner" title="Finally, define the children position relatively to each other">
              <Divider orientation="left" style={{marginTop: 0}}>Gutter size:</Divider>
              <Row gutter={8}>
                <Col span={14}>
                  <Input addonBefore={`margin-${isRowDirection ? 'right' : 'bottom'}:`} size="small" defaultValue="0" onChange={setChildrenMarginValue}/>
                </Col>
                {<Tip title="Defining gutter" content={(
                  <div>
                    <p>It's best to space siblings with margin and put the margin definition on the container (see the code for example).<br/>Always use the same convention for margins to avoid technical debt.</p>
                    <p>Here we use the following:<br/> - when the direction is row, use margin-right<br/> - when it's column, use margin-bottom.</p>
                  </div>
                )} />}
              </Row>
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span><Icon type="code" theme="filled" /> Code</span>} key="2">
            <div style={{position: 'relative'}}>
              <CopyToClipboard text={codeString} onCopy={() => alert('copied')}>
                <Button icon="copy" size="small" style={{position: 'absolute', right: '5px', top: '5px'}}>
                  Copy to clipboard
                </Button>
              </CopyToClipboard>
              <SyntaxHighlighter language='css' style={xcode}>{codeString}</SyntaxHighlighter>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span><Icon type="question-circle" theme="filled" /></span>} key="3">
            <Card title="Happier frontend development">
            <p>Learn how to integrate your mockup's layout by using this tool.</p>
            <p><Button type="primary" icon="caret-right" onClick={initTuto}>Walk me through!</Button></p>
            <p>This will help you if :
              <ul>
                <li>you know about flex, padding and margin but you don't know how to combine them.</li>
                <li>you don't know how to split the mockup integration.</li>
                <li>you don't know what the best css practice are when it comes to layout.</li>
              </ul>
            </p>
            <Card type="inner" title="How to">
              <p>1. <Icon type="picture" /> Save your mockup as an image</p>
              <p>2. <Icon type="table" /> Map out the different blocks, <b>always start with the biggest root container</b> (You can print it and draw it if it helps)</p>
              <p>3. Drag and drop a mockup here or click to upload <Icon type="upload" /></p>
              <p>4. Shape the container <Icon type="project" theme="filled" style={{color: rootContainerBg}} /> and its children <Icon type="build" theme="filled" style={{color: childBaseColor}} /> to match the layout using the Layout Toolbox</p>
              <p>5. Export the code <Icon type="code" theme="filled" /> to use it on your project</p>
              <p>6. <Icon type="sync" /> Repeat the exercice recusrively.</p>
              </Card>
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </ToolContainer>
  </MainContainer>
)};

export default LayoutGenerator;