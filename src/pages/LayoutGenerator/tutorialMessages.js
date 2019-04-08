import React from 'react';
import { Icon } from 'antd';

export const getTutoMessageMap = (childBaseColor, rootContainerBg, highlightContainerColor, highlightChildColor) => ({
  start: {
    message: 'How to use this platform ?',
    description: (
      <div>
        <p>Let's pretend we are integrating the mockup on the left.</p>
        <p>First, let's map out the main blocks. Here we have :
          <br /> - <span style={{border: `solid 2px ${highlightContainerColor}`}}>1 main container</span>
          <br /> - <span style={{border: `solid 2px ${highlightChildColor}`}}>3 children containers (nav, main, footer)</span>
        </p>
      </div>
    ),
  },
  1: {
    message: 'Step 1 : Shape the container',
    description: (<p>
      In the <Icon type="layout" theme="filled" /> Layout Toolbox "Shape" tab, define the root container's width and height, so the <span style={{backgroundColor: rootContainerBg}}>yellow container</span> covers the <span style={{border: `solid 2px ${highlightContainerColor}`}}>main container</span>.
      <br />In our example, try <i>width = 100%</i> and <i>height = 94vh</i>
    </p>)
  },
  2: {
    message: 'Step 2 : Define the number of children',
    description: (<p>
      Set the number of children to <i>3</i>.
      <br />You'll see more <span style={{backgroundColor: childBaseColor}}>child boxes</span> apear in the <span style={{backgroundColor: rootContainerBg}}>main container</span>
    </p>)
  },
  3: {
    message: 'Step 3 : Define the children sorting direction',
    description: (<p>
      Pick <i>column</i>.
      <br /> The <span style={{backgroundColor: childBaseColor}}>child boxes</span> should have stacked vertically.
    </p>)
  },
  4: {
    message: 'Step 4 : Define the children position relatively to their container',
    description: (<ul>
      <li>Here there is no gap between the <span style={{backgroundColor: rootContainerBg}}>main container</span> and the <span style={{backgroundColor: childBaseColor}}>children</span>, so we'll leave the <i>padding</i> to <i>0</i>.</li>
      <li>We are happy with the <span style={{backgroundColor: childBaseColor}}>children</span> stacking from the top, so we'll leave <i>justify-content</i> to <i>flex-start</i>.</li>
      <li>We are also happy with the <span style={{backgroundColor: childBaseColor}}>children</span> stretching to 100% width, so we'll leave <i>align-items</i> to <i>stretch</i>.</li>
    </ul>)
  },
  5: {
    message: 'Step 5 : Can children display on several columns?',
    description: (<p>
      No, so we'll leave <i>flex-wrap</i> to <i>nowrap</i>.
    </p>)
  },
  6: {
    message: 'Step 6 : If a child has specific size in the container, define it',
    description: (<p>
      Here is where you'll need to infer the information from the mockup or ask the designer:
      <ul>
        <li>Is the height of the <span style={{backgroundColor: childBaseColor}}>children</span> fixed to a px value or % of the space available?</li>
        <li>Should it take it's content height, or should it grow to the maximum space the <span style={{backgroundColor: rootContainerBg}}>container</span> has to offer?</li>
        <li>Should it shrink in favor or other <span style={{backgroundColor: childBaseColor}}>siblings</span>?</li>
      </ul>
      Here, you can set for Child 1: <i>flex-basis: 46px</i> and <i>flex-shrink: 0</i> because we want a fixed size.
      <br />The other <span style={{backgroundColor: childBaseColor}}>siblings</span> will take the size of their content, so leave the default values.
    </p>)
  },
  7: {
    message: 'Step 7 : Finally, define the children position relatively to each other',
    description: (<p>
      If after all previous settings, we still need to add a gap between two <span style={{backgroundColor: childBaseColor}}>siblings</span>, we'll set a <i>margin</i>.
      Here, we'll leave it at <i>0</i>.
    </p>)
  },
  8: {
    message: 'Step 8 : Get the code',
    description: (<p>
      Click the <Icon type="code" theme="filled" /> Code tab to get css code to apply to the <span style={{backgroundColor: rootContainerBg}}>container</span> and <span style={{backgroundColor: childBaseColor}}>children</span>.
      <br />Adapt the fixed sizes values (<i>width</i>, <i>height</i>, <i>flex-basis</i>) according to the actual values from the mockup.
    </p>)
  },
  finish: {
    message: 'Congratulations!',
    description: (<p>Now you can repeat the exercice on one of the previous <span style={{backgroundColor: childBaseColor}}>child</span>, or upload your own mockup to try.</p>),
  }
});