import React from 'react';
import { Icon } from 'antd';

export const getTutoMessageMap = (childBaseColor, rootContainerBg, highlightContainerColor, highlightChildColor) => {
  const rootContainerBorder = `solid 2px ${highlightContainerColor}`;
  const childContainerBorder = `solid 2px ${highlightChildColor}`;
  const mainContainerStyle = { border: rootContainerBorder, padding: '2px'};
  const childContainerStyle = { border: childContainerBorder, padding: '2px'};
  const yellowContainerStyle = { backgroundColor: rootContainerBg, border: rootContainerBorder, padding: '2px' };
  const blueContainerStyle = { backgroundColor: childBaseColor, padding: '2px'};

  return {
    start: {
      message: 'How to use this platform ?',
      description: (
        <div>
          <p>Let's pretend we are integrating the mockup on the left.</p>
          <p>First, let's map out the main blocks. Here we have :
            <br /> - <span style={mainContainerStyle}>1 main container</span>
            <br /> - 3 children containers (<span style={childContainerStyle}>nav</span>, <span style={childContainerStyle}>main</span>, <span style={childContainerStyle}>footer</span>)
          </p>
        </div>
      ),
    },
    1: {
      message: 'Step 1 : Shape the container',
      description: (<p>
        The aim is to cover :
        <br/> - The <span style={mainContainerStyle}>green border block</span> with the <span style={yellowContainerStyle}>yellow container</span>,
        <br/> - Each of the 3 children containers (<span style={childContainerStyle}>nav</span>, <span style={childContainerStyle}>main</span>, <span style={childContainerStyle}>footer</span>) by the <span style={blueContainerStyle}>child boxes</span>.
        <br /><br />Simply resize <Icon type="arrows-alt" /> and move <Icon type="drag" /> the <span style={yellowContainerStyle}>yellow container</span> by dragging it.
        <br/><br/> When you are done, click on the "Next" button in the right panel.
      </p>)
    },
    2: {
      message: 'Step 2 : Define the number of children',
      description: (<p>
        We have 3 children containers (<span style={childContainerStyle}>nav</span>, <span style={childContainerStyle}>main</span>, <span style={childContainerStyle}>footer</span>),
        <br/>so in set the number of children to <i>3</i>.
        <br /><br />You'll see more <span style={blueContainerStyle}>child boxes</span> apear in the <span style={yellowContainerStyle}>main container</span>
        <br/><br/> When you are done, click on the "Next" button.
      </p>)
    },
    3: {
      message: 'Step 3 : Define the children sorting direction',
      description: (<p>
        Pick <i>column</i>.
        <br /> The <span style={blueContainerStyle}>child boxes</span> should have stacked vertically.
        <br/><br/> When you are done, click on the "Next" button.
      </p>)
    },
    4: {
      message: 'Step 4 : Define the children position relatively to their container',
      description: (<div>
        <h4>Vertical distribution:</h4>
        <p>We are happy with the <span style={blueContainerStyle}>children</span> stacking from the top, so we'll leave the default value of <i>justify-content</i>, <i>flex-start</i>.</p>
        <h4>Horizontal distribution:</h4>
        <p>We are also happy with the <span style={blueContainerStyle}>children</span> stretching to 100% width, so we'll leave the default value of <i>align-items</i>, <i>stretch</i>.</p>
        <h4>Spacing:</h4>
        <p>Here there is no gap between the <span style={yellowContainerStyle}>main container</span> and the <span style={blueContainerStyle}>children</span>, so we'll leave the <i>padding</i> to <i>0</i>.</p>
        <br/> When you are done, click on the "Next" button.
      </div>)
    },
    5: {
      message: 'Step 5 : If a child has specific size in the container, define it',
      description: (<div>
        This is the step is where you'll need to infer the information from the mockup or ask the designer:
        <ul>
          <li>Is the height of the <span style={blueContainerStyle}>children</span> fixed to a px value or % of the space available?</li>
          <li>Should it take it's content height, or should it grow to the maximum space the <span style={yellowContainerStyle}>container</span> has to offer?</li>
          <li>Should it shrink in favor or other <span style={blueContainerStyle}>siblings</span>?</li>
        </ul>
        Here, for Child 1, we want a fixed size,
        <br />so set: <i>flex-basis: 46px</i> and <i>flex-shrink: 0</i>
        <br />The other <span style={blueContainerStyle}>siblings</span> will take the size of their content, so leave the default values.
        <br />You can play around and enter some fancy content for them.
        <br /><br /> When you are done, click on the "Next" button.
      </div>)
    },
    6: {
      message: 'Step 6 : Finally, define the children position relatively to each other',
      description: (<p>
        If after all previous settings, we still need to add a gap between two <span style={blueContainerStyle}>siblings</span>, we'll set a <i>margin</i>.
        <br />Here, we'll leave it at <i>0</i>.
        <br /><br /> You should now be ready to get the code to apply it on your project. Click the "Done!" button.
      </p>)
    },
    7: {
      message: 'Step 7 : Get the code',
      description: (<p>
        In the <Icon type="code" theme="filled" /> Code tab you'll see the css code to apply to the <span style={yellowContainerStyle}>container</span> and <span style={blueContainerStyle}>children</span>.
        <br /><br />Adapt the fixed sizes values (<i>width</i>, <i>height</i>, <i>flex-basis</i>) according to the actual values from the mockup.
      </p>)
    },
    finish: {
      message: 'Congratulations!',
      description: (<p>Now you can repeat the exercice on one of the previous <span style={blueContainerStyle}>child</span>, or upload your own mockup to try.</p>),
    }
  }
};