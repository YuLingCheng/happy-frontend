import Collapse from 'antd/lib/collapse';
import Icon from 'antd/lib/icon';
import Tabs from 'antd/lib/tabs';
import React from 'react';
import { colorUsage } from '../../../../stylesheet';
import ChildMainStep from './ChildMainStep';
import ChildAdvancedStep from './ChildAdvancedStep';
import NextStepButton from './NextStepButton';
import getChildHueRotation from '../../../../services/colorGenerator';

const Step5 = ({
  isRowDirection,
  childrenContentMap,
  setChildContent,
  childrenList,
  childrenPropsMap,
  setChildProp,
  getChildFlexProp,
  getChildProperties,
  onNextStepButtonClick,
}) => (
  <>
    <div>
      <h3>Adjust the size and placement of each child</h3>
      <Collapse defaultActiveKey={['1']} accordion>
        {childrenList.map(id => (
          <Collapse.Panel
            header={
              <span>
                <Icon
                  type="build"
                  theme="filled"
                  style={{
                    color: colorUsage.childBaseColor,
                    filter: getChildHueRotation(id, childrenList.length),
                  }}
                />{' '}
                Child {id}
              </span>
            }
            key={id}
          >
            <Tabs size="small">
              <Tabs.TabPane tab="Size" key={1}>
                <ChildMainStep
                  id={id}
                  isRowDirection={isRowDirection}
                  childrenContentMap={childrenContentMap}
                  setChildContent={setChildContent}
                  childrenPropsMap={childrenPropsMap}
                  setChildProp={setChildProp}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Advanced" key={2}>
                <ChildAdvancedStep
                  id={id}
                  isRowDirection={isRowDirection}
                  childrenPropsMap={childrenPropsMap}
                  setChildProp={setChildProp}
                  getChildFlexProp={getChildFlexProp}
                  getChildProperties={getChildProperties}
                />
              </Tabs.TabPane>
            </Tabs>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
    <NextStepButton onClick={onNextStepButtonClick} />
  </>
);

export default Step5;
