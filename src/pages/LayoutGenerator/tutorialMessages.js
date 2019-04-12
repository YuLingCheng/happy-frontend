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
      The aim is to cover :
      <br/> - The <span style={{border: `solid 2px ${highlightContainerColor}`}}>green border block</span> with the <span style={{backgroundColor: rootContainerBg}}>yellow container</span>,
      <br/> - Each of the <span style={{border: `solid 2px ${highlightChildColor}`}}>3 children containers (nav, main, footer)</span> by the <span style={{backgroundColor: childBaseColor}}>child boxes</span>.
      <br /><br />So First, in the <Icon type="layout" theme="filled" /> Layout Toolbox > "Shape" tab, define the root container's width and height, so that the <span style={{backgroundColor: rootContainerBg}}>yellow container</span> covers the <span style={{border: `solid 2px ${highlightContainerColor}`}}>main container</span>.
      <br /><br />Ex: Try <i>width = 100%</i> and <i>height = 600px</i>
      <br/><br/> When you are done, click on the "Next" button.
    </p>)
  },
  2: {
    message: 'Step 2 : Define the number of children',
    description: (<p>
      We have <span style={{border: `solid 2px ${highlightChildColor}`}}>3 children containers (nav, main, footer)</span>,
      <br/>so set the number of children to <i>3</i>.
      <br /><br />You'll see more <span style={{backgroundColor: childBaseColor}}>child boxes</span> apear in the <span style={{backgroundColor: rootContainerBg}}>main container</span>
      <br/><br/> When you are done, click on the "Next" button.
    </p>)
  },
  3: {
    message: 'Step 3 : Define the children sorting direction',
    description: (<p>
      Pick <i>column</i>.
      <br /> The <span style={{backgroundColor: childBaseColor}}>child boxes</span> should have stacked vertically.
      <br/><br/> When you are done, click on the "Next" button.
    </p>)
  },
  4: {
    message: 'Step 4 : Define the children position relatively to their container',
    description: (<div>
      <h4>Vertical distribution:</h4>
      <p>We are happy with the <span style={{backgroundColor: childBaseColor}}>children</span> stacking from the top, so we'll leave the default value of <i>justify-content</i>, <i>flex-start</i>.</p>
      <h4>Horizontal distribution:</h4>
      <p>We are also happy with the <span style={{backgroundColor: childBaseColor}}>children</span> stretching to 100% width, so we'll leave the default value of <i>align-items</i>, <i>stretch</i>.</p>
      <h4>Spacing:</h4>
      <p>Here there is no gap between the <span style={{backgroundColor: rootContainerBg}}>main container</span> and the <span style={{backgroundColor: childBaseColor}}>children</span>, so we'll leave the <i>padding</i> to <i>0</i>.</p>
      <br/> When you are done, click on the "Next" button.
    </div>)
  },
  5: {
    message: 'Step 5 : Can children display on several columns?',
    description: (<p>
      No, so we'll leave <i>flex-wrap</i> to <i>nowrap</i>.
      <br/><br/> When you are done, click on the "Next" button.
    </p>)
  },
  6: {
    message: 'Step 6 : If a child has specific size in the container, define it',
    description: (<p>
      This is the step is where you'll need to infer the information from the mockup or ask the designer:
      <ul>
        <li>Is the height of the <span style={{backgroundColor: childBaseColor}}>children</span> fixed to a px value or % of the space available?</li>
        <li>Should it take it's content height, or should it grow to the maximum space the <span style={{backgroundColor: rootContainerBg}}>container</span> has to offer?</li>
        <li>Should it shrink in favor or other <span style={{backgroundColor: childBaseColor}}>siblings</span>?</li>
      </ul>
      Here, for Child 1, we want a fixed size,
      <br />so set: <i>flex-basis: 46px</i> and <i>flex-shrink: 0</i>
      <br />The other <span style={{backgroundColor: childBaseColor}}>siblings</span> will take the size of their content, so leave the default values.
      <br />You can play around and enter some fancy content for them.
      <br /><br /> When you are done, click on the "Next" button.
    </p>)
  },
  7: {
    message: 'Step 7 : Finally, define the children position relatively to each other',
    description: (<p>
      If after all previous settings, we still need to add a gap between two <span style={{backgroundColor: childBaseColor}}>siblings</span>, we'll set a <i>margin</i>.
      <br />Here, we'll leave it at <i>0</i>.
      <br /><br /> You should now be ready to get the code to apply it on your project !. Click the "Done!" button.
    </p>)
  },
  8: {
    message: 'Step 8 : Get the code',
    description: (<p>
      In the <Icon type="code" theme="filled" /> Code tab you'll see the css code to apply to the <span style={{backgroundColor: rootContainerBg}}>container</span> and <span style={{backgroundColor: childBaseColor}}>children</span>.
      <br />Adapt the fixed sizes values (<i>width</i>, <i>height</i>, <i>flex-basis</i>) according to the actual values from the mockup.
    </p>)
  },
  finish: {
    message: 'Congratulations!',
    description: (<p>Now you can repeat the exercice on one of the previous <span style={{backgroundColor: childBaseColor}}>child</span>, or upload your own mockup to try.</p>),
  }
});