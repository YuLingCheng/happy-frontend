import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import React from 'react';
import { colorUsage } from '../../../../stylesheet';
import NextStepButton from './NextStepButton';

const Step1 = ({ animate1stNextButton, onNextStepButtonClick }) => (
  <>
    <h3>Visualize the container you want to integrate</h3>
    <p>Always start from the root container, follow these 6 steps, then repeat recursively.</p>
    <p>Cover the container you want to integrate with the yellow container</p>
    <div
      style={{
        backgroundColor: colorUsage.rootContainerBg,
        border: `3px solid ${colorUsage.highlightContainerColor}`,
        width: 40,
        height: 40,
        margin: '0 auto 10px',
      }}
    />
    <p>
      Simply resize it <Icon type="arrows-alt" /> and move it <Icon type="drag" /> by dragging it.
    </p>
    <Tooltip
      visible={animate1stNextButton}
      title="Click me when you have covered the area you want to integrate"
      placement="right"
    >
      <NextStepButton onClick={onNextStepButtonClick} />
    </Tooltip>
  </>
);

export default Step1;
