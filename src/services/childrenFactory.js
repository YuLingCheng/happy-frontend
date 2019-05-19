import _range from 'lodash/range';

export const initialChildProps = {
  flexBasis: 'auto',
  flexGrow: '0',
  flexShrink: '1',
  alignSelf: 'auto',
  width: '',
  height: '',
  position: 'static',
};

export const addOrRemoveChild = (
  setChildrenNb,
  setChildPropsMap,
  setChildContentMap,
) => (newNumber) => {
  setChildrenNb((prevNumber) => {
    if (prevNumber < newNumber) {
      const childRange = _range(prevNumber + 1, newNumber + 1);
      setChildPropsMap(prev => ({
        ...prev,
        ...childRange.reduce(
          (previousChildren, childIndex) => ({
            ...previousChildren,
            [childIndex]: initialChildProps,
          }),
          {},
        ),
      }));
      setChildContentMap(prev => ({
        ...prev,
        ...childRange.reduce(
          (previousChildren, childIndex) => ({
            ...previousChildren,
            [childIndex]: `Child ${childIndex}`,
          }),
          {},
        ),
      }));
    }
    return newNumber;
  });
};
