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
import TextArea from 'antd/lib/input/TextArea';
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
        setChildContentMap(prev => ({
          ...prev,
          [newNumber]: `Child ${newNumber}`,
        }));
      }
      return newNumber;
    });
  }

  const childrenList = [...Array(childrenNb).keys()].map(id => id + 1);
  const getChildColor = (id) => `hue-rotate(${(id-1)/childrenList.length*360}deg)`;

  const initialChildPropsMap = { 1: initialChildProps };
  const [childrenPropsMap, setChildPropsMap] = useState(initialChildPropsMap);
  const setChildProp = (id) => (prop) => ({target}) => setChildPropsMap(prev => ({
    ...prev,
    [id]: {
      ...prev[id],
      [prop]: target.value,
    },
  }));

  const initialChildContentMap = { 1: 'Child 1' };
  const [childrenContentMap, setChildContentMap] = useState(initialChildContentMap);
  const setChildContent = (id) => ({target}) => setChildContentMap(prev => ({
    ...prev,
    [id]: target.value,
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

  // LayoutTabs Navigation
  const [layoutToolActiveKey, setLayoutToolActiveKey] = useState('1');
  const manageTabs = key => {
    if (key === "2") {
      if (highlightExampleBlocks) {
        setDisplayBlocks(true);
        setTutoStep(() => {
          updateNotification(8);
          return 7;
        });
      }
      exportCode();
    }
    if (key === "1") {
      if (highlightExampleBlocks) {
        setDisplayBlocks(true);
        setTutoStep(() => {
          updateNotification(1);
          return 0;
        });
      }
      setShaperActiveKey(1);
    }
  };
  // ShaperTool Navigation
  const [shaperActiveKey, setShaperActiveKey] = useState(1);
  const NextStepButton = () => (
    <Button
      onClick={() => {
        if (highlightExampleBlocks) {
          setTutoStep(prevStep => {
            updateNotification(tutoStep + 2);
            return tutoStep + 1
          });
        }
        setShaperActiveKey(prevKey => prevKey + 1);
      }}
      ghost
      type="primary"
      style={{ marginTop: '10px'}}
      >
      Next
    </Button>
  );
  const onStepClick = (key) => {
    if (highlightExampleBlocks) {
      setDisplayBlocks(true);
      setTutoStep(() => {
        updateNotification(parseInt(key));
        return parseInt(key) - 1;
      });
    }
    setShaperActiveKey(parseInt(key));
  };
  const onDoneButtonClick = () => {
    if (highlightExampleBlocks) {
      setDisplayBlocks(true);
      setTutoStep(() => {
        updateNotification(8, true);
        return 7;
      });
    }
    exportCode(); setLayoutToolActiveKey('2');
  }

  // ResetLayout
  const resetLayout = () => {
    setRootContainerProps(initialRootContainerProps);
    setChildPropsMap(initialChildPropsMap);
    setChildContentMap(initialChildContentMap);
    setChildrenNb(1);
    setChildrenMargin("0");
    setShaperActiveKey(1);
    setLayoutToolActiveKey('1');
  }

  // Tutorial
  const [displayBlocks, setDisplayBlocks] = useState(true);
  const [tutoStep, setTutoStep] = useState(null);
  const highlightExampleBlocks = tutoStep !== null;
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
  const updateNotification = (step, showNextButton = false) => {
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
      message: tutoMessage.message,
      description: tutoMessage.description,
      btn: showNextButton && (<Button onClick={() => updateNotification(step + 1)}>Next</Button>)
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
          <Child
            key={id}
            style={{fontWeight: 'bold', filter: getChildColor(id), whiteSpace: 'pre-wrap', ...childrenPropsMap[id]}}
          >
            {childrenContentMap[id]}
          </Child>)
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
              <div className="keypoint">
                <Icon type="border-verticle" />
                <span>You know about flex, padding and margin but you don't know how to combine them.</span>
              </div>
              <div className="keypoint">
                <Icon type="gold" />
                <span>You don't know how to split the mockup integration.</span>
              </div>
              <div className="keypoint">
                <Icon type="star" />
                <span>You don't know what the best css practice are when it comes to layout.</span>
              </div>
            </Helper.KeyPoints>
            <Helper.Content>
              <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                  <h2>How to</h2>
                  <p>Two options :</p>
                  <p>1. Follow the tutorial "<Icon type="caret-right"/> Walk me through!"</p>
                  <p>2. Import an screenshot of your mockup using drag and drop here <Icon type="upload" /></p>
              </div>
            </Helper.Content>
          </ExampleMain>
          <ExampleFooter highlight={highlightExampleBlocks}>
            Privacy policy - Terms and conditions
          </ExampleFooter>
      </Helper>}
    </PreviewContainer>
    <ToolContainer>
      <Card
        title={<PageHeader getInputProps={getInputProps} getRootProps={getRootProps} />}
        style={{height: '100%'}}
      >
        <Tabs
          type="card"
          activeKey={layoutToolActiveKey}
          onChange={setLayoutToolActiveKey}
          onTabClick={manageTabs}
          tabBarExtraContent={<Button onClick={resetLayout}>Reset</Button>}
        >
          <Tabs.TabPane tab={<span>Shape</span>} key={1}>
            <Tabs
              size="small"
              tabPosition="left"
              activeKey={`${shaperActiveKey}`}
              onChange={onStepClick}
            >
              <Tabs.TabPane tab="1" key={1} style={{height: '100%'}}>
                <h3>Visualize the root container you want to integrate</h3>
                <p>Use these inputs to make the <span style={{backgroundColor: rootContainerBg}}>yellow container</span> cover the root container.</p>
                <Row gutter={10}>
                  <Col span={10}>
                    <Input addonBefore="width:" size="small" value={rootContainerProps.width} onChange={setRootContainerValue('width')}/>
                  </Col>
                  <Col span={10}>
                    <Input addonBefore="height:" size="small" value={rootContainerProps.height} onChange={setRootContainerValue('height')}/>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={10}>
                    <Input addonBefore="x offset:" size="small" value={rootContainerProps.left} onChange={setRootContainerValue('left')}/>
                  </Col>
                  <Col span={10}>
                    <Input addonBefore="y offset:" size="small" value={rootContainerProps.top} onChange={setRootContainerValue('top')}/>
                  </Col>
                  {<Tip title="Offset" content={(<p>Move the container on the mockup</p>)} />}
                </Row>
                <NextStepButton />
              </Tabs.TabPane>
              <Tabs.TabPane tab="2" key={2}>
                <div>
                  <h3>How many child blocks in the main container?</h3>
                  <InputNumber size="small" value={childrenNb} min={1} onChange={changeChildrenNb} />
                </div>
                <NextStepButton />
              </Tabs.TabPane>
              <Tabs.TabPane tab="3" key={3}>
                <div>
                  <h3>In what direction are the children arranged?</h3>
                  <Radio.Group size="small" value={rootContainerProps.flexDirection} buttonStyle="solid" onChange={setRootContainerValue('flexDirection')}>
                    <Radio.Button value="row">row</Radio.Button>
                    <Radio.Button value="column">column</Radio.Button>
                  </Radio.Group>
                </div>
                <NextStepButton />
              </Tabs.TabPane>
              <Tabs.TabPane tab="4" key={4}>
                <div>
                  <h3>Define the children position relatively to their container</h3>
                  <h4>What is the {isRowDirection ? 'Horizontal' : 'Vertical'} distribution?</h4>
                  <p>Use justify-content to define it:</p>
                  <Radio.Group size="small" value={rootContainerProps.justifyContent} buttonStyle="solid" onChange={setRootContainerValue('justifyContent')}>
                    <Radio.Button value="flex-start">flex-start</Radio.Button>
                    <Radio.Button value="flex-end">flex-end</Radio.Button>
                    <Radio.Button value="center">center</Radio.Button>
                    <Radio.Button value="space-between">space-between</Radio.Button>
                    <Radio.Button value="space-around">space-around</Radio.Button>
                  </Radio.Group>
                  <Divider />
                  <h4>What is the {!isRowDirection ? 'Horizontal' : 'Vertical'} distribution?</h4>
                  <p>Use align-items to define it:</p>
                  <Radio.Group size="small" value={rootContainerProps.alignItems} buttonStyle="solid" onChange={setRootContainerValue('alignItems')}>
                    <Radio.Button value="flex-start">flex-start</Radio.Button>
                    <Radio.Button value="flex-end">flex-end</Radio.Button>
                    <Radio.Button value="center">center</Radio.Button>
                    <Radio.Button value="stretch">stretch</Radio.Button>
                  </Radio.Group>
                  <Divider />
                  <h4>
                    Is there a specific space between the container's border and its children ?&nbsp;
                    {<Tip title="Padding" content={(
                      <div>
                        <p>Use this only if all children are at the same distance from the container</p>
                        <p>Imagine that children have a colored background.
                          <br/>Should there be a gap between them and the parent?
                        </p>
                      </div>
                    )} />}
                  </h4>
                  <p>If yes, set the padding</p>
                  <Row>
                    <Col span={16}>
                      <Input addonBefore="padding:" size="small" value={rootContainerProps.padding} onChange={setRootContainerValue('padding')}/>
                    </Col>
                  </Row>
                </div>
                <NextStepButton />
              </Tabs.TabPane>
              <Tabs.TabPane tab="5" key={5}>
                <div>
                  <h3>Can children display on several {isRowDirection ? 'lines' : 'columns'}?</h3>
                  <div>
                    <p>Select 'wrap' for multi {isRowDirection ? 'lines' : 'columns'}.</p>
                    <p>You can combine 'wrap' with 'flex-basis: 100%;' to isolate a child on one {isRowDirection ? 'line' : 'column'}.</p>
                  </div>
                  <Radio.Group size="small" value={rootContainerProps.flexWrap} buttonStyle="solid" onChange={setRootContainerValue('flexWrap')}>
                    <Radio.Button value="nowrap">nowrap</Radio.Button>
                    <Radio.Button value="wrap">wrap</Radio.Button>
                    <Radio.Button value="wrap-reverse">wrap-reverse</Radio.Button>
                  </Radio.Group>
                </div>
                <NextStepButton />
              </Tabs.TabPane>
              <Tabs.TabPane tab="6" key={6}>
                <div>
                  <h3>If a child has specific size in the container, define it now</h3>
                  <Collapse defaultActiveKey={['1']}>
                    {childrenList.map(id => (
                      <Collapse.Panel header={<span><Icon type="build" theme="filled" style={{color: childBaseColor, filter: getChildColor(id)}} /> Child {id}</span>} key={id}>
                        <Tabs size="small">
                          <Tabs.TabPane tab="Size" key={1}>
                            <Divider orientation="left" style={{marginTop: 0}}>Specific {isRowDirection ? 'width' : 'height'}:</Divider>
                            <Row gutter={8}>
                              <Col span={20}>
                                <Input addonBefore="flex-basis:" size="small" value={childrenPropsMap[id] && childrenPropsMap[id].flexBasis} onChange={setChildProp(id)('flexBasis')}/>
                              </Col>
                              <Col span={16}>
                                <Input addonBefore="flex-shrink:" size="small" value={childrenPropsMap[id] && childrenPropsMap[id].flexShrink} onChange={setChildProp(id)('flexShrink')}/>
                                Set flex-shrink to 0 if fixed size, > 0 if it should shrink when not enough space
                              </Col>
                            </Row>
                            <Divider orientation="left">Take available space {isRowDirection ? 'horizontally' : 'vertically'}:</Divider>
                            <Row gutter={8}>
                              <Col span={22}>
                                <Input addonBefore="flex-grow:" size="small" value={childrenPropsMap[id] && childrenPropsMap[id].flexGrow} onChange={setChildProp(id)('flexGrow')}/>
                              </Col>
                            </Row>
                            <Divider orientation="left">Take the size of its content:</Divider>
                            <p>Simulate content in the child (text only)</p>
                            <Row gutter={8}>
                              <TextArea
                                value={childrenContentMap[id]}
                                autosize={{ minRows: 2, maxRows: 6 }}
                                onChange={setChildContent(id)}
                              />
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
                            <Radio.Group size="small" value={childrenPropsMap[id] && childrenPropsMap[id].alignSelf} buttonStyle="solid" onChange={setChildProp(id)('alignSelf')}>
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
                </div>
                <NextStepButton />
              </Tabs.TabPane>
              <Tabs.TabPane tab="7" key={7}>
                <div>
                  <h3>Finally, define the children position relatively to each other</h3>
                  <Divider orientation="left" style={{marginTop: 0}}>Gutter size:</Divider>
                  <Row gutter={8}>
                    <Col span={14}>
                      <Input addonBefore={`margin-${isRowDirection ? 'right' : 'bottom'}:`} size="small" value={childrenMargin} onChange={setChildrenMarginValue}/>
                    </Col>
                    {<Tip title="Defining gutter" content={(
                      <div>
                        <p>It's best to space siblings with margin and put the margin definition on the container (see the code for example).<br/>Always use the same convention for margins to avoid technical debt.</p>
                        <p>Here we use the following:<br/> - when the direction is row, use margin-right<br/> - when it's column, use margin-bottom.</p>
                      </div>
                    )} />}
                  </Row>
                </div>
                <Button type="primary" style={{marginTop: '10px'}} onClick={onDoneButtonClick}>Done! Show me the code</Button>
              </Tabs.TabPane>
            </Tabs>
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