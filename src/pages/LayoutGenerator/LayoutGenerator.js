import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';
import _range from 'lodash/range';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDropzone } from 'react-dropzone';
import ReactGA from 'react-ga';
import { Rnd } from 'react-rnd';
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
  position: relative;
  border: 3px solid ${highlightContainerColor};
  width: 100%;
  height: 100%;

  & :not(:last-child) {
    ${props => `margin-${props.margininfo.isRowDirection ? 'right' : 'bottom'}: ${props.margininfo.childrenMargin};`}
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
    display: 'flex',
    flexDirection: 'row',
    padding: '0',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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
    position: 'static',
  };
  const changeChildrenNb = (newNumber) => {
    setChildrenNb(prevNumber => {
      if (prevNumber < newNumber) {
        const childRange = _range(prevNumber + 1, newNumber + 1);
        setChildPropsMap(prev => ({
          ...prev,
          ...childRange.reduce((previousChildren, childIndex) => ({
            ...previousChildren,
            [childIndex]: initialChildProps,
          }), {})
        }));
        setChildContentMap(prev => ({
          ...prev,
          ...childRange.reduce((previousChildren, childIndex) => ({
            ...previousChildren,
            [childIndex]: `Child ${childIndex}`,
          }), {})
        }));
      }
      return newNumber;
    });
  }

  const childrenList = _range(1, childrenNb + 1);
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
    `width: SET_ME_IF_NEEDED;`,
    `height: SET_ME_IF_NEEDED;`,
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
  if (_isEqual(_omit(childProperties, ['top', 'left', 'right', 'bottom']), initialChildProps)) return undefined;
  return `.child${id} {
    ${[
      getChildFlexProp(initialChildProps) !== childFlexProperties ? `flex: ${childFlexProperties};` : undefined,
      childProperties.alignSelf !== initialChildProps.alignSelf ? `align-self: ${childProperties.alignSelf};`: undefined,
      childProperties.position !== initialChildProps.position ? `position: ${childProperties.position};`: undefined,
      childProperties.top ? `top: ${childProperties.top};`: undefined,
      childProperties.left ? `left: ${childProperties.left};`: undefined,
      childProperties.right ? `right: ${childProperties.right};`: undefined,
      childProperties.bottom ? `bottom: ${childProperties.bottom};`: undefined,
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
          updateNotification(7);
          return 6;
        });
      }
      ReactGA.event({
        category: 'LayoutGenerator',
        action: 'Display code'
      });
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
        updateNotification(7, true);
        return 6;
      });
    }
    exportCode(); setLayoutToolActiveKey('2');
    ReactGA.event({
      category: 'LayoutGenerator',
      action: 'Done button click'
    });
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
    ReactGA.event({
      category: 'LayoutGenerator',
      action: 'Stop Tuto'
    });
    setDisplayBlocks(true);
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
    ReactGA.event({
      category: 'LayoutGenerator',
      action: 'Move Tuto step',
      value: step,
    });
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
    ReactGA.event({
      category: 'LayoutGenerator',
      action: 'Init Tuto'
    });
    setDisplayBlocks(false);
    const btn = <Button onClick={() => {updateNotification(1);setDisplayBlocks(true);}}>Next</Button>;
    if (tutoStep === null) {
      setMockupPreview(null);
      setLayoutToolActiveKey('1');
      setShaperActiveKey(1);
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
    <PreviewContainer mockupPreview={mockupPreview} id="preview-container">
      { displayBlocks && <Rnd bounds="parent" style={{zIndex: 10}} default={{
        x: 20,
        y: 60,
        width: 150,
        height: 150,
      }}><RootContainer style={rootContainerProps} margininfo={marginInfo} >
        {childrenList.map(id => (
          <Child
            key={id}
            style={{fontWeight: 'bold', filter: getChildColor(id), whiteSpace: 'pre-wrap', ...childrenPropsMap[id]}}
          >
            {childrenContentMap[id]}
          </Child>)
        )}
      </RootContainer></Rnd>}
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
                <Icon type="star" />
                <span>You don't know what the best css practice are when it comes to layout.</span>
              </div>
              <div className="keypoint">
                <Icon type="gold" />
                <span>You don't know how to split the mockup integration.</span>
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
        style={{height: '100%', overflow: 'auto'}}
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
                <h3>Visualize the container you want to integrate</h3>
                <p>Always start from the root container, follow these 7 steps, then repeat recursively.</p>
                <p>Cover the container you want to integrate with the yellow container</p>
                <div style={{backgroundColor: rootContainerBg, border: `3px solid ${highlightContainerColor}`, width: 40, height: 40, margin: '0 auto 10px'}} />
                <p>Simply resize it <Icon type="arrows-alt" /> and move it <Icon type="drag" /> by dragging it.</p>
                <NextStepButton />
              </Tabs.TabPane>
              <Tabs.TabPane tab="2" key={2}>
                <div>
                  <h3>How many child blocks in the main container?</h3>
                  <InputNumber size="small" value={childrenNb} min={1} onChange={changeChildrenNb} />
                  <p><br/>Let's make these <span style={{backgroundColor: childBaseColor}}>blocks</span> cover the right areas on the mockup.</p>
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
                  <h3>Adjust the size and placement of each child</h3>
                  <Collapse defaultActiveKey={['1']} accordion>
                    {childrenList.map(id => (
                      <Collapse.Panel header={<span><Icon type="build" theme="filled" style={{color: childBaseColor, filter: getChildColor(id)}} /> Child {id}</span>} key={id}>
                        <Tabs size="small">
                          <Tabs.TabPane tab="Size" key={1}>
                            <Divider orientation="left" style={{marginTop: 0}}><b>Specific {isRowDirection ? 'width' : 'height'}</b>:</Divider>
                            <Row gutter={8}>
                              <Col span={20}>
                                <Input addonBefore="flex-basis:" size="small" value={childrenPropsMap[id] && childrenPropsMap[id].flexBasis} onChange={setChildProp(id)('flexBasis')}/>
                              </Col>
                              <Col span={16}>
                                <Input addonBefore="flex-shrink:" size="small" value={childrenPropsMap[id] && childrenPropsMap[id].flexShrink} onChange={setChildProp(id)('flexShrink')}/>
                                Set flex-shrink to 0 if fixed size, > 0 if it should shrink when not enough space
                              </Col>
                            </Row>
                            <Divider orientation="left"><b>Take available space {isRowDirection ? 'horizontally' : 'vertically'}</b>:</Divider>
                            <Row gutter={8}>
                              <Col span={22}>
                                <Input addonBefore="flex-grow:" size="small" value={childrenPropsMap[id] && childrenPropsMap[id].flexGrow} onChange={setChildProp(id)('flexGrow')}/>
                              </Col>
                            </Row>
                            <Divider orientation="left"><b>Take the size of its content</b>:</Divider>
                            <p>Simulate content in the child (text only)</p>
                            <TextArea
                              value={childrenContentMap[id]}
                              autosize={{ minRows: 2, maxRows: 6 }}
                              onChange={setChildContent(id)}
                            />
                            <Divider />
                            <Row gutter={8}>
                              <Col span={22}>
                                <Input addonBefore="flex:" size="small" disabled value={getChildFlexProp(getChildProperties(id))} />
                              </Col>
                            </Row>
                          </Tabs.TabPane>
                          <Tabs.TabPane tab="Advanced" key={2}>
                            <h4>Does this child have a <b>{isRowDirection ? 'vertical' : 'horizontal'} position</b> that's different from it's siblings?</h4>
                            <p>Use align-self to define it:</p>
                            <Radio.Group size="small" value={childrenPropsMap[id] && childrenPropsMap[id].alignSelf} buttonStyle="solid" onChange={setChildProp(id)('alignSelf')}>
                              <Radio.Button value="auto">auto</Radio.Button>
                              <Radio.Button value="flex-start">flex-start</Radio.Button>
                              <Radio.Button value="flex-end">flex-end</Radio.Button>
                              <Radio.Button value="center">center</Radio.Button>
                              <Radio.Button value="baseline">baseline</Radio.Button>
                              <Radio.Button value="stretch">stretch</Radio.Button>
                            </Radio.Group>
                            <br/>
                            <Divider orientation="left"><b>Absolute position</b>:</Divider>
                            <p>Is the child at a specific position relatively to the container? If yes, set its position to "absolute"</p>
                            <p>If the child has a spacific position relatively to the window and not its container, set the position to "fixed"</p>
                            <Radio.Group size="small" value={childrenPropsMap[id] && childrenPropsMap[id].position} buttonStyle="solid" onChange={setChildProp(id)('position')}>
                              <Radio.Button value="static">static</Radio.Button>
                              <Radio.Button value="absolute">absolute</Radio.Button>
                              <Radio.Button value="fixed">fixed</Radio.Button>
                              <Radio.Button value="relative">relative</Radio.Button>
                            </Radio.Group>
                            <Col span={12}>
                              <Input addonBefore="top:" size="small" value={childrenPropsMap[id] && childrenPropsMap[id].top} onChange={setChildProp(id)('top')}/>
                              <Input addonBefore="left:" size="small" value={childrenPropsMap[id] && childrenPropsMap[id].left} onChange={setChildProp(id)('left')}/>
                              <Input addonBefore="right:" size="small" value={childrenPropsMap[id] && childrenPropsMap[id].right} onChange={setChildProp(id)('right')}/>
                              <Input addonBefore="bottom:" size="small" value={childrenPropsMap[id] && childrenPropsMap[id].bottom} onChange={setChildProp(id)('bottom')}/>
                            </Col>
                          </Tabs.TabPane>
                        </Tabs>
                      </Collapse.Panel>
                    ))}
                  </Collapse>
                </div>
                <NextStepButton />
              </Tabs.TabPane>
              <Tabs.TabPane tab="6" key={6}>
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
              <Tabs.TabPane tab="+" key={7}>
                <div>
                  <h3>Advanced customization</h3>
                  <p>In rare cases, you might need these.</p>
                  <h4>Can children display on several {isRowDirection ? 'lines' : 'columns'}?</h4>
                  <div>
                    <p>Select 'wrap' for multi {isRowDirection ? 'lines' : 'columns'}.</p>
                    <p>In the next step you can combine 'wrap' with 'flex-basis: 100%;' to isolate a child on one {isRowDirection ? 'line' : 'column'}.</p>
                  </div>
                  <Radio.Group size="small" value={rootContainerProps.flexWrap} buttonStyle="solid" onChange={setRootContainerValue('flexWrap')}>
                    <Radio.Button value="nowrap">nowrap</Radio.Button>
                    <Radio.Button value="wrap">wrap</Radio.Button>
                    <Radio.Button value="wrap-reverse">wrap-reverse</Radio.Button>
                  </Radio.Group>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span><Icon type="code" theme="filled" /> Code</span>} key="2">
            <p>Adapt the fixed sizes values (<i>width</i>, <i>height</i>, <i>flex-basis</i>) according to the actual values from the mockup.</p>
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