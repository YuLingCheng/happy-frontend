import Icon from 'antd/lib/icon';
import React from 'react';
import { Code } from './components/components';

const getTutoMessageMap = (
  childBaseColor,
  rootContainerBg,
  highlightContainerColor,
  highlightChildColor,
) => {
  const rootContainerBorder = `solid 2px ${highlightContainerColor}`;
  const childContainerBorder = `solid 2px ${highlightChildColor}`;
  const mainContainerStyle = { border: rootContainerBorder, padding: '2px' };
  const childContainerStyle = { border: childContainerBorder, padding: '2px' };
  const yellowContainerStyle = {
    backgroundColor: rootContainerBg,
    border: rootContainerBorder,
    padding: '2px',
  };
  const blueContainerStyle = { backgroundColor: childBaseColor, padding: '2px' };

  return {
    start: {
      message: 'How to use this platform ?',
      description: (
        <div>
          <p>Let's pretend we are integrating the mockup above.</p>
          <p>
            First, let's map out the main blocks. Here we have :
            <br /> - <span style={mainContainerStyle}>1 main container</span>
            <br /> - 2 children containers: an <span style={childContainerStyle}>
              image
            </span> and <span style={childContainerStyle}>a text container</span>)
          </p>
          <p>
            In the next steps, we will create <span style={blueContainerStyle}>colored boxes</span>{' '}
            and make them cover the main blocks using css properties.
          </p>
        </div>
      ),
    },
    1: {
      message: 'Step 1 : Shape the container',
      description: (
        <p>
          Let's cover the <span style={mainContainerStyle}>main container</span> with the{' '}
          <span style={yellowContainerStyle}>yellow container</span>
          <br />
          Simply resize <Icon type="arrows-alt" /> and move <Icon type="drag" /> the block by
          dragging it.
          <br />
          <br /> When you are done, click on the "Next" button in the right panel.
        </p>
      ),
    },
    2: {
      message: 'Step 2 : Define the number of children',
      description: (
        <p>
          We have <span style={childContainerStyle}>2 children containers</span>,
          <br />
          so in set the number of children to <Code>2</Code>.
          <br />
          <br />
          You'll see more <span style={blueContainerStyle}>child boxes</span> apear in the{' '}
          <span style={yellowContainerStyle}>main container</span>
          <br />
          <br /> When you are done, click on the "Next" button.
        </p>
      ),
    },
    3: {
      message: 'Step 3 : Define the children sorting direction',
      description: (
        <p>
          Here, children are displayed in line, so we'll keep the (flex) direction to{' '}
          <Code>row</Code>.
          <br />
          <br /> When you are done, click on the "Next" button.
        </p>
      ),
    },
    4: {
      message: 'Step 4 : Define the children position relatively to their container',
      description: (
        <div>
          <h4>Horizontal distribution:</h4>
          <p>
            <span style={blueContainerStyle}>Children</span> are stacking from the left, so leave{' '}
            <Code>justify-content: flex-start</Code>.
          </p>
          <h4>Vertical distribution:</h4>
          <p>
            <span style={blueContainerStyle}>Children</span> are vertically aligned in the{' '}
            <span style={yellowContainerStyle}>container</span>, so set{' '}
            <Code>align-items: center</Code>.
          </p>
          <h4>Spacing:</h4>
          <p>
            There is a gap between the border of the{' '}
            <span style={yellowContainerStyle}>main container</span> and the{' '}
            <span style={blueContainerStyle}>children</span>, so we'll add some <Code>padding</Code>
            . Try <Code>0 40px</Code>
          </p>
        </div>
      ),
    },
    5: {
      message: 'Step 5 : If a child has specific size in the container, define it',
      description: (
        <div>
          This is the step where you'll need to infer the information from the mockup or ask the
          designer:
          <ul>
            <li>Is the height of the children fixed to a px value or % of the space available?</li>
            <li>Should it take it's content height?</li>
            <li>Should it grow to the maximum space available in the container?</li>
          </ul>
          For the image, we want a fixed size, try <Code>width: 180px; height: 130px;</Code>
          <br />
          The text block will take all the space left, so set <Code>flex-grow: 1;</Code>.
          <br />
          You can play around and enter some text in that block.
        </div>
      ),
    },
    6: {
      message: 'Step 6 : Finally, define the children position relatively to each other',
      description: (
        <p>
          If after all previous settings, we still need to add a gap between two siblings, we'll set
          a <Code>margin</Code>.
          <br />
          Here, try <Code>margin-right: 20px;</Code>.
          <br />
          <br /> You should now be ready to get the code to apply it on your project. Click the
          "Done!" button.
        </p>
      ),
    },
    7: {
      message: 'Step 7 : Get the code',
      description: (
        <p>
          In the <Icon type="code" theme="filled" /> Code tab you'll see the css code to apply to
          the <span style={yellowContainerStyle}>container</span> and{' '}
          <span style={blueContainerStyle}>children</span>.
          <br />
          <br />
          Adapt the fixed sizes values (<Code>width</Code>, <Code>height</Code>, <Code>margin</Code>
          , <Code>padding</Code>) according to the actual values from the mockup.
        </p>
      ),
    },
    finish: {
      message: 'Congratulations!',
      description: (
        <p>
          Now you can repeat the exercice on one of the previous{' '}
          <span style={blueContainerStyle}>child</span>, or upload your own mockup to try.
        </p>
      ),
    },
  };
};

export default getTutoMessageMap;
