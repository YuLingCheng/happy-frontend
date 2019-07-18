import _range from 'lodash/range';
import React, { useState, lazy, Suspense } from 'react';
import ReactGA from 'react-ga';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import notification from 'antd/lib/notification';
import {
  AnimatedButton,
  Header,
  Intro,
  MainContent,
  MainContainer,
  PreviewContainer,
  ToolContainer,
  Loader,
} from './components/components';
import getTutoMessageMap from './components/tutorialMessages';
import logo from '../../assets/images/happyfrontend-logo.png';
import exportCode from '../../services/codeGenerator';
import { addOrRemoveChild, initialChildProps } from '../../services/childrenFactory';
import { colorUsage } from '../../stylesheet';

const LayoutToolbox = lazy(() => import('./components/LayoutToolbox'));
const Sandbox = lazy(() => import('./components/Sandbox'));

const {
  childBaseColor,
  rootContainerBg,
  highlightContainerColor,
  highlightChildColor,
} = colorUsage;

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
  const setRootContainerValue = prop => ({ target }) => setRootContainerProps({
    ...rootContainerProps,
    [prop]: target.value,
  });

  const isRowDirection = rootContainerProps.flexDirection === 'row';

  // initialize the children layers
  const [childrenNb, setChildrenNb] = useState(0);
  const childrenList = _range(1, childrenNb + 1);

  const initialChildPropsMap = { 1: initialChildProps };
  const [childrenPropsMap, setChildPropsMap] = useState(initialChildPropsMap);
  const setChildProp = id => prop => ({ target }) => setChildPropsMap(prev => ({
    ...prev,
    [id]: {
      ...prev[id],
      [prop]: target.value,
    },
  }));

  const initialChildContentMap = { 1: 'Child 1' };
  const [childrenContentMap, setChildContentMap] = useState(initialChildContentMap);
  const setChildContent = id => ({ target }) => setChildContentMap(prev => ({
    ...prev,
    [id]: target.value,
  }));
  const changeChildrenNb = addOrRemoveChild(setChildrenNb, setChildPropsMap, setChildContentMap);

  // Initialize the margin between children
  const [childrenMargin, setChildrenMargin] = useState('0');
  const setChildrenMarginValue = ({ target }) => setChildrenMargin(target.value);
  const marginInfo = { isRowDirection, childrenMargin };

  const getChildProperties = id => ({ ...initialChildProps, ...childrenPropsMap[id] });
  const getChildFlexProp = childProperties => `${childProperties.flexGrow} ${childProperties.flexShrink} ${childProperties.flexBasis}`;

  // Logic to compute the css code
  const [codeString, setCodeString] = useState('');

  // LayoutTabs Navigation
  const [layoutToolActiveKey, setLayoutToolActiveKey] = useState('1');

  // ShaperTool Navigation
  const [shaperActiveKey, setShaperActiveKey] = useState(1);

  // Tutorial
  const [displayBlocks, setDisplayBlocks] = useState(true);
  const [tutoStep, setTutoStep] = useState(null);
  const highlightExampleBlocks = tutoStep !== null;

  // Examples Navigation
  const [examplesActiveKey, setExamplesActiveKey] = useState('1');

  // AnimateRootContainer
  const [animateElements, setAnimateElements] = useState(true);
  const [animate1stNextButton, setAnimate1stNextButton] = useState(false);
  const disableElementsAnimation = () => {
    setAnimateElements(false);
    if (shaperActiveKey === 1) setAnimate1stNextButton(true);
  };

  // ResetLayout
  const resetLayout = () => {
    setRootContainerProps(initialRootContainerProps);
    setChildPropsMap(initialChildPropsMap);
    setChildContentMap(initialChildContentMap);
    setChildrenNb(0);
    setChildrenMargin('0');
    setShaperActiveKey(1);
    setLayoutToolActiveKey('1');
    setAnimateElements(true);
    setAnimate1stNextButton(false);
  };

  // Tutorial
  const tutoMessageMap = getTutoMessageMap(
    childBaseColor,
    rootContainerBg,
    highlightContainerColor,
    highlightChildColor,
  );
  const stopTuto = () => {
    ReactGA.event({
      category: 'LayoutGenerator',
      action: 'Stop Tuto',
    });
    setDisplayBlocks(true);
    setTutoStep(null);
  };
  const defaultNotificationOptions = {
    duration: 0,
    key: 'tuto',
    onClose: stopTuto,
    style: { width: 650, backgroundColor: 'rgba(255, 255, 255, 0.95)' },
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
        btn: (
          <Button
            onClick={() => {
              stopTuto();
              notification.close(defaultNotificationOptions.key);
            }}
          >
            Done
          </Button>
        ),
        message: tutoMessageMap.finish.message,
        description: tutoMessageMap.finish.description,
      });
      return;
    }
    notification.info({
      ...defaultNotificationOptions,
      message: tutoMessage.message,
      description: tutoMessage.description,
      btn: showNextButton && <Button onClick={() => updateNotification(step + 1)}>Next</Button>,
    });
  };
  const onNextStepButtonClick = () => {
    if (highlightExampleBlocks) {
      setTutoStep(() => {
        updateNotification(tutoStep + 2);
        return tutoStep + 1;
      });
    }
    setShaperActiveKey(prevKey => prevKey + 1);
    setAnimate1stNextButton(false);
  };
  const onStepClick = (key) => {
    if (highlightExampleBlocks) {
      setDisplayBlocks(true);
      setTutoStep(() => {
        updateNotification(parseInt(key, 10));
        return parseInt(key, 10) - 1;
      });
    }
    setShaperActiveKey(parseInt(key, 10));
    setAnimate1stNextButton(false);
  };
  const onDoneButtonClick = () => {
    if (highlightExampleBlocks) {
      setDisplayBlocks(true);
      setTutoStep(() => {
        updateNotification(7, true);
        return 6;
      });
    }
    exportCode(
      setCodeString,
      rootContainerProps,
      initialRootContainerProps,
      marginInfo,
      isRowDirection,
      childrenList,
      getChildProperties,
      getChildFlexProp,
      initialChildProps,
    );
    setLayoutToolActiveKey('2');
    ReactGA.event({
      category: 'LayoutGenerator',
      action: 'Done button click',
    });
  };
  const initTuto = () => {
    ReactGA.event({
      category: 'LayoutGenerator',
      action: 'Init Tuto',
    });
    setDisplayBlocks(false);
    setAnimateElements(false);
    setAnimate1stNextButton(false);
    setExamplesActiveKey('1');
    const btn = (
      <Button
        onClick={() => {
          updateNotification(1);
          setAnimateElements(true);
          setDisplayBlocks(true);
        }}
      >
        Next
      </Button>
    );
    if (tutoStep === null) {
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

  // Layout Toolbox tabs
  const manageTabs = (key) => {
    setAnimate1stNextButton(false);
    if (key === '2') {
      if (highlightExampleBlocks) {
        setDisplayBlocks(true);
        setTutoStep(() => {
          updateNotification(7);
          return 6;
        });
      }
      ReactGA.event({
        category: 'LayoutGenerator',
        action: 'Display code',
      });
      exportCode(
        setCodeString,
        rootContainerProps,
        initialRootContainerProps,
        marginInfo,
        isRowDirection,
        childrenList,
        getChildProperties,
        getChildFlexProp,
        initialChildProps,
      );
    }
    if (key === '1') {
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

  return (
    <MainContainer>
      <PreviewContainer id="preview-container">
        <MainContent>
          <Header>
            <Header.Left>
              <img src={logo} alt="Happyfrontend logo" />
              <h1>Happy frontend</h1>
            </Header.Left>
            <div>
              <AnimatedButton type="primary" onClick={initTuto}>
                <Icon type="caret-right" /> Walk me through!
              </AnimatedButton>
            </div>
          </Header>
          <Intro>
            <p>
              Learn how to integrate your mockup's layout by using the panel on the right. Follow
              the 6 steps! Become at ease with size, padding, margin and flex properties.
              <br />
              Train on the examples below or upload your own mockup.
            </p>
          </Intro>
          <Suspense fallback={<Loader text="Loading Sandbox..." />}>
            <Sandbox
              displayBlocks={displayBlocks}
              animateElements={animateElements}
              childrenContentMap={childrenContentMap}
              childrenList={childrenList}
              childrenPropsMap={childrenPropsMap}
              disableElementsAnimation={disableElementsAnimation}
              marginInfo={marginInfo}
              rootContainerProps={rootContainerProps}
              examplesActiveKey={examplesActiveKey}
              setExamplesActiveKey={setExamplesActiveKey}
              highlightExampleBlocks={highlightExampleBlocks}
            />
          </Suspense>
        </MainContent>
      </PreviewContainer>
      <ToolContainer>
        <Suspense
          fallback={
            <Loader>
              <p style={{ color: colorUsage.mainColor }}>Loading Toolbox...</p>
            </Loader>
          }
        >
          <LayoutToolbox
            layoutToolActiveKey={layoutToolActiveKey}
            setLayoutToolActiveKey={setLayoutToolActiveKey}
            manageTabs={manageTabs}
            resetLayout={resetLayout}
            shaperActiveKey={shaperActiveKey}
            onStepClick={onStepClick}
            animate1stNextButton={animate1stNextButton}
            onNextStepButtonClick={onNextStepButtonClick}
            childrenNb={childrenNb}
            changeChildrenNb={changeChildrenNb}
            rootContainerProps={rootContainerProps}
            setRootContainerValue={setRootContainerValue}
            isRowDirection={isRowDirection}
            childrenContentMap={childrenContentMap}
            setChildContent={setChildContent}
            childrenList={childrenList}
            childrenPropsMap={childrenPropsMap}
            setChildProp={setChildProp}
            getChildFlexProp={getChildFlexProp}
            getChildProperties={getChildProperties}
            childrenMargin={childrenMargin}
            setChildrenMarginValue={setChildrenMarginValue}
            onDoneButtonClick={onDoneButtonClick}
            codeString={codeString}
            initTuto={initTuto}
            setExamplesActiveKey={setExamplesActiveKey}
          />
        </Suspense>
      </ToolContainer>
    </MainContainer>
  );
};

export default LayoutGenerator;
