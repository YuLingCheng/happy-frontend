import Radio from 'antd/lib/radio';
import React from 'react';

const AdvancedStep = ({
  isRowDirection,
  rootContainerProps,
  setRootContainerValue,
}) => (
  <>
    <h3>Advanced customization</h3>
    <p>In rare cases, you might need these.</p>
    <h4>Can children display on several {isRowDirection ? 'lines' : 'columns'}?</h4>
    <div>
      <p>Select 'wrap' for multi {isRowDirection ? 'lines' : 'columns'}.</p>
      <p>
        In the next step you can combine 'wrap' with 'flex-basis: 100%;' to isolate a child on one{' '}
        {isRowDirection ? 'line' : 'column'}.
      </p>
    </div>
    <Radio.Group
      size="small"
      value={rootContainerProps.flexWrap}
      buttonStyle="solid"
      onChange={setRootContainerValue('flexWrap')}
    >
      <Radio.Button value="nowrap">nowrap</Radio.Button>
      <Radio.Button value="wrap">wrap</Radio.Button>
      <Radio.Button value="wrap-reverse">wrap-reverse</Radio.Button>
    </Radio.Group>
  </>
);

export default AdvancedStep;
