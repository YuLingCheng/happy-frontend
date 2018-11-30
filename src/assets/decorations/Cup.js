import styled from 'styled-components';

const Cup = styled.div`
  position: absolute;
  left: ${props => props.x};
  bottom: ${props => props.y};
  top: ${props => props.top};
  background-color: ${props => props.theme.colors.lightest};
  width: ${props => props.cupSize}${props => props.sizeUnit};
  height: ${props => props.cupSize}${props => props.sizeUnit};
  border-radius: 50%;
  box-shadow: ${props => props.cupSize*0.075}${props => props.sizeUnit} ${props => props.cupSize*0.09}${props => props.sizeUnit} 0 ${props => props.theme.colors.grey_shadow};
  transform: rotate(22deg);

  &::before, &::after {
    content: '';
    border-radius: 50%;
    position: absolute;
  }
  &::before {
    background-color: ${props => props.theme.colors.lighter};
    width: ${props => props.cupSize*0.6}${props => props.sizeUnit};
    height: ${props => props.cupSize*0.6}${props => props.sizeUnit};
    top: ${props => props.cupSize*0.2}${props => props.sizeUnit};
    left: ${props => props.cupSize*0.2}${props => props.sizeUnit};
    box-shadow: ${props => props.cupSize*0.025}${props => props.sizeUnit} ${props => props.cupSize*0.04}${props => props.sizeUnit} 0 rgb(190, 190, 190);
  }
  &::after {
    background-color: ${props => props.theme.colors.cocoa};
    box-shadow: inset ${props => props.cupSize*0.05}${props => props.sizeUnit} ${props => props.cupSize*0.025}${props => props.sizeUnit} 0 ${props => props.cupSize*0.05}${props => props.sizeUnit} rgba(43, 27, 11, 0.5);
    width: ${props => props.cupSize*0.45}${props => props.sizeUnit};
    height: ${props => props.cupSize*0.45}${props => props.sizeUnit};
    top: ${props => props.cupSize*0.275}${props => props.sizeUnit};
    left: ${props => props.cupSize*0.275}${props => props.sizeUnit};
  }
`;
Cup.Handle = styled.div`
  width: ${props => props.cupSize*0.18}${props => props.sizeUnit};
  height: ${props => props.cupSize*0.125}${props => props.sizeUnit};
  background-color: ${props => props.theme.colors.lighter};
  box-shadow: ${props => props.cupSize*0.035}${props => props.sizeUnit} ${props => props.cupSize*0.03}${props => props.sizeUnit} 0 rgb(190,190,190);
  border-radius: 32%;
  position: absolute;
  top: ${props => props.cupSize*0.415}${props => props.sizeUnit};
  left: ${props => props.cupSize*0.75}${props => props.sizeUnit};
  z-index: 1;
`;

Cup.Icon = styled(Cup)`
  position: relative;
  margin-right: 0.5rem;
`;

export default Cup;
