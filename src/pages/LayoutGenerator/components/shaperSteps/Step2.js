import InputNumber from 'antd/lib/input-number';
import React from 'react';
import { colorUsage } from '../../../../stylesheet';
import NextStepButton from './NextStepButton';

const Step2 = ({ childrenNb, changeChildrenNb, onNextStepButtonClick }) => (
  <>
    <div>
      <h3>How many child blocks in the main container?</h3>
      <p>
        Vizualize how many blocs there are inside the main container. To help you, think about the
        meaning of blocks: what should we group?
      </p>
      <b>Child blocks: </b>
      <InputNumber size="small" value={childrenNb} min={0} onChange={changeChildrenNb} />
      <p>
        <br />
        Let's make these <span style={{ backgroundColor: colorUsage.childBaseColor }}>
          blocks
        </span>{' '}
        cover the right areas on the mockup.
      </p>
    </div>
    <NextStepButton onClick={onNextStepButtonClick} />
  </>
);

export default Step2;
