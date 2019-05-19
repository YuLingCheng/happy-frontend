import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';

const exportCode = (
  setCodeString,
  rootContainerProps,
  initialRootContainerProps,
  marginInfo,
  isRowDirection,
  childrenList,
  getChildProperties,
  getChildFlexProp,
  initialChildProps,
) => {
  setCodeString(`.container {
  ${[
    'display: flex;',
    `flex-direction: ${rootContainerProps.flexDirection};`,
    `justify-content: ${rootContainerProps.justifyContent};`,
    rootContainerProps.padding !== initialRootContainerProps.padding
      && `padding: ${rootContainerProps.padding}; // Adapt`,
    rootContainerProps.alignItems !== initialRootContainerProps.alignItems
      && `align-items: ${rootContainerProps.alignItems};`,
    rootContainerProps.flexWrap !== initialRootContainerProps.flexWrap
      && `flex-wrap: ${rootContainerProps.flexWrap};`,
  ]
    .filter(Boolean)
    .join('\n  ')}
}
${
  marginInfo.childrenMargin !== '0'
    ? `.container > :not(:last-child) {
  margin-${isRowDirection ? 'right' : 'bottom'}: ${marginInfo.childrenMargin}; // Adapt
}`
    : ''
}
${childrenList
    .map((id) => {
      const childProperties = getChildProperties(id);
      const childFlexProperties = getChildFlexProp(childProperties);
      if (_isEqual(_omit(childProperties, ['top', 'left', 'right', 'bottom']), initialChildProps)) return undefined;
      return `.child${id} {
  ${[
    childProperties.width ? `width: ${childProperties.width}; // Adapt` : undefined,
    childProperties.height ? `height: ${childProperties.height}; // Adapt` : undefined,
    getChildFlexProp(initialChildProps) !== childFlexProperties
      ? `flex: ${childFlexProperties};`
      : undefined,
    childProperties.alignSelf !== initialChildProps.alignSelf
      ? `align-self: ${childProperties.alignSelf};`
      : undefined,
    childProperties.position !== initialChildProps.position
      ? `position: ${childProperties.position};`
      : undefined,
    childProperties.top ? `top: ${childProperties.top};` : undefined,
    childProperties.left ? `left: ${childProperties.left};` : undefined,
    childProperties.right ? `right: ${childProperties.right};` : undefined,
    childProperties.bottom ? `bottom: ${childProperties.bottom};` : undefined,
  ]
    .filter(Boolean)
    .join('\n  ')}
}`;
    })
    .filter(Boolean)
    .join('\n')}`);
};

export default exportCode;
