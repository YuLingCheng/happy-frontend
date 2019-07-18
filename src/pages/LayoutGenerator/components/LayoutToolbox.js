import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import Tabs from 'antd/lib/tabs';
import React from 'react';
import { Copyright } from './components';
import Step1 from './shaperSteps/Step1';
import Step2 from './shaperSteps/Step2';
import Step3 from './shaperSteps/Step3';
import Step4 from './shaperSteps/Step4';
import Step5 from './shaperSteps/Step5';
import Step6 from './shaperSteps/Step6';
import AdvancedStep from './shaperSteps/AdvancedStep';
import CodePanel from './CodePanel';
import Help from './Help';

const LayoutToolbox = ({
  layoutToolActiveKey,
  setLayoutToolActiveKey,
  manageTabs,
  resetLayout,
  shaperActiveKey,
  onStepClick,
  animate1stNextButton,
  onNextStepButtonClick,
  childrenNb,
  changeChildrenNb,
  rootContainerProps,
  setRootContainerValue,
  isRowDirection,
  childrenContentMap,
  setChildContent,
  childrenList,
  childrenPropsMap,
  setChildProp,
  getChildFlexProp,
  getChildProperties,
  childrenMargin,
  setChildrenMarginValue,
  onDoneButtonClick,
  codeString,
  initTuto,
  setExamplesActiveKey,
}) => (
  <>
    <Card
      title={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>
            <Icon type="layout" theme="filled" /> Layout Toolbox
          </span>
        </div>
      }
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
            <Tabs.TabPane tab="1" key={1} style={{ height: '100%' }}>
              <Step1
                animate1stNextButton={animate1stNextButton}
                onNextStepButtonClick={onNextStepButtonClick}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="2" key={2}>
              <Step2
                childrenNb={childrenNb}
                changeChildrenNb={changeChildrenNb}
                onNextStepButtonClick={onNextStepButtonClick}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="3" key={3}>
              <Step3
                rootContainerProps={rootContainerProps}
                setRootContainerValue={setRootContainerValue}
                onNextStepButtonClick={onNextStepButtonClick}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="4" key={4}>
              <Step4
                isRowDirection={isRowDirection}
                rootContainerProps={rootContainerProps}
                setRootContainerValue={setRootContainerValue}
                onNextStepButtonClick={onNextStepButtonClick}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="5" key={5}>
              <Step5
                isRowDirection={isRowDirection}
                childrenContentMap={childrenContentMap}
                setChildContent={setChildContent}
                childrenList={childrenList}
                childrenPropsMap={childrenPropsMap}
                setChildProp={setChildProp}
                getChildFlexProp={getChildFlexProp}
                getChildProperties={getChildProperties}
                onNextStepButtonClick={onNextStepButtonClick}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="6" key={6}>
              <Step6
                isRowDirection={isRowDirection}
                childrenMargin={childrenMargin}
                setChildrenMarginValue={setChildrenMarginValue}
                onDoneButtonClick={onDoneButtonClick}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="+" key={7}>
              <AdvancedStep
                isRowDirection={isRowDirection}
                rootContainerProps={rootContainerProps}
                setRootContainerValue={setRootContainerValue}
              />
            </Tabs.TabPane>
          </Tabs>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <Icon type="code" theme="filled" /> Code
            </span>
          }
          key="2"
        >
          <CodePanel codeString={codeString} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <Icon type="question-circle" theme="filled" /> Help
            </span>
          }
          key="3"
        >
          <Help initTuto={initTuto} setExamplesActiveKey={setExamplesActiveKey} />
        </Tabs.TabPane>
      </Tabs>
    </Card>
    <Copyright>
      <span>
        Made with <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> by{' '}
        <a href="https://twitter.com/YuLingEC" rel="noopener noreferrer" target="_blank">
          <Icon type="twitter" /> Yu Ling Cheng
        </a>
      </span>
    </Copyright>
  </>
);

export default LayoutToolbox;
