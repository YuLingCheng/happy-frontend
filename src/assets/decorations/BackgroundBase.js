import styled from 'styled-components';

const BackgroundBase = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
  opacity: ${props => props.opacity || '1'};
`

export default BackgroundBase;
