import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import Input from 'antd/lib/input/Input';
import Row from 'antd/lib/row';
import React from 'react';
import { Tip } from '../components';

const Step6 = ({
  isRowDirection, childrenMargin, setChildrenMarginValue, onDoneButtonClick,
}) => (
  <>
    <div>
      <h3>Finally, define the children position relatively to each other</h3>
      <Divider orientation="left" style={{ marginTop: 0 }}>
        Gutter size:
      </Divider>
      <Row gutter={8}>
        <Col span={14}>
          <Input
            addonBefore={`margin-${isRowDirection ? 'right' : 'bottom'}:`}
            size="small"
            value={childrenMargin}
            onChange={setChildrenMarginValue}
          />
        </Col>
        {
          <Tip
            title="Defining gutter"
            content={
              <div>
                <p>
                  It's best to space siblings with margin and put the margin definition on the
                  container (see the code for example).
                  <br />
                  Always use the same convention for margins to avoid technical debt.
                </p>
                <p>
                  Here we use the following:
                  <br /> - when the direction is row, use margin-right
                  <br /> - when it's column, use margin-bottom.
                </p>
              </div>
            }
          />
        }
      </Row>
    </div>
    <Button type="primary" style={{ marginTop: '10px' }} onClick={onDoneButtonClick}>
      Done! Show me the code
    </Button>
  </>
);

export default Step6;
