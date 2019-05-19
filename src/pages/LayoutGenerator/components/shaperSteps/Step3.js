import Radio from 'antd/lib/radio';
import React from 'react';
import NextStepButton from './NextStepButton';

const Step3 = ({ rootContainerProps, setRootContainerValue, onNextStepButtonClick }) => (
  <>
    <div>
      <h3>In what direction are the children arranged?</h3>
      <Radio.Group
        size="small"
        value={rootContainerProps.flexDirection}
        buttonStyle="solid"
        onChange={setRootContainerValue('flexDirection')}
      >
        <Radio.Button value="row">row</Radio.Button>
        <Radio.Button value="column">column</Radio.Button>
      </Radio.Group>
    </div>
    <NextStepButton onClick={onNextStepButtonClick} />
  </>
);

export default Step3;
