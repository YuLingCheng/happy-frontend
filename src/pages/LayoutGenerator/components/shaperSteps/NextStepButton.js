import Button from 'antd/lib/button';
import React from 'react';

const NextStepButton = ({
  onClick,
}) => (
  <Button
    onClick={onClick}
    ghost
    type="primary"
    style={{ marginTop: '10px' }}
  >
    Next
  </Button>
);

export default NextStepButton;
