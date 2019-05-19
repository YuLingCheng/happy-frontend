import { Icon, Tooltip } from 'antd';
import React from 'react';
import { Rnd } from 'react-rnd';
import styled, { css } from 'styled-components';

import { colorUsage, heartbeatAnimation } from '../../../stylesheet';
import getChildHueRotation from '../../../services/colorGenerator';

const { childBaseColor, highlightContainerColor, rootContainerBg } = colorUsage;

const RootContainer = styled.div`
  background: ${rootContainerBg};
  position: relative;
  border: 3px solid ${highlightContainerColor};
  width: 100%;
  height: 100%;

  & > :not(:last-child) {
    ${props => `margin-${props.margininfo.isRowDirection ? 'right' : 'bottom'}: ${props.margininfo.childrenMargin};`}
  }

  ${props => props.displayCTA && css`-webkit-animation: ${heartbeatAnimation} 2s ease-in-out infinite both;`}
  ${props => props.displayCTA && css`animation: ${heartbeatAnimation} 2s ease-in-out infinite both;`}
`;
const Child = styled.div`
  background: ${childBaseColor};
  color: white;
  position: relative;
`;

const EditableContainers = ({
  animateElements,
  childrenContentMap,
  childrenList,
  childrenPropsMap,
  disableElementsAnimation,
  marginInfo,
  rootContainerProps,
}) => (
  <Tooltip
    visible={animateElements}
    title={
      <span>
        Drag me <Icon type='arrows-alt' />, move me <Icon type='drag' /> to
        cover the block you want to integrate
      </span>
    }
    placement='right'
  >
    <Rnd
      bounds='parent'
      style={{ zIndex: 10 }}
      default={{
        x: 30,
        y: 60,
        width: 50,
        height: 50,
      }}
      onMouseDown={disableElementsAnimation}
      onResizeStart={disableElementsAnimation}
    >
      <RootContainer
        displayCTA={animateElements}
        style={rootContainerProps}
        margininfo={marginInfo}
      >
        {childrenList.map(id => (
          <Child
            key={id}
            style={{
              fontWeight: 'bold',
              filter: getChildHueRotation(id, childrenList.length),
              whiteSpace: 'pre-wrap',
              ...childrenPropsMap[id],
            }}
          >
            {childrenContentMap[id]}
          </Child>
        ))}
      </RootContainer>
    </Rnd>
  </Tooltip>
);

export default EditableContainers;
