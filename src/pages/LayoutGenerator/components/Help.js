import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import React from 'react';
import { Clickable } from './components';
import { colorUsage } from '../../../stylesheet';

const Help = ({ initTuto, setExamplesActiveKey }) => (
  <>
    <h2>Happier frontend development</h2>
    <p>Learn how to integrate your mockup's layout by using this tool.</p>
    <p>
      <Button type="primary" icon="caret-right" onClick={initTuto}>
        Walk me through!
      </Button>
    </p>
    <p>This will help you if :</p>
    <ul>
      <li>
        you know about{' '}
        <a href="https://flexboxfroggy.com" rel="noopener noreferrer" target="_blank">
          flex
        </a>
        , padding and margin but you don't know how to combine them.
      </li>
      <li>you don't know how to split the mockup integration.</li>
      <li>you don't know what the best css practice are when it comes to layout.</li>
    </ul>
    <Card type="inner" title="How to">
      <p>
        1. <Icon type="picture" /> Save your mockup as an image
      </p>
      <p>
        2. <Icon type="table" /> Map out the different blocks,{' '}
        <b>always start with the biggest root container</b> (You can print it and draw it if it
        helps)
      </p>
      <p>
        3. <Clickable onClick={() => setExamplesActiveKey('2')}>Upload your mockup</Clickable> in
        the left panel
      </p>
      <p>
        4. Shape the container{' '}
        <Icon type="project" theme="filled" style={{ color: colorUsage.rootContainerBg }} /> and its
        children <Icon type="build" theme="filled" style={{ color: colorUsage.childBaseColor }} />{' '}
        to match the layout by followig the steps in the "Shape" tab
      </p>
      <p>
        5. Export the code <Icon type="code" theme="filled" /> to use it on your project
      </p>
      <p>
        6. <Icon type="sync" /> Repeat the exercice recusrively.
      </p>
    </Card>
  </>
);

export default Help;
