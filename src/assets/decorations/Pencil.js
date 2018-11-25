import styled from 'styled-components';

const Shadow = styled.div`
  width: 22px;
  height: 425px;
  position: absolute;
  left: ${props => props.left || '75vw'};
  top: ${props => props.top || '-90vh'};
  transform: rotate(${props => props.rotate || '105'}deg);
  border-radius: 3px 3px 0 0;
  background-color: ${props => props.theme.colors.grey_shadow};
  box-shadow: 0 -17px 0 ${props => props.theme.colors.grey_shadow};

  &::before, &::after {
    content: '';
    position: absolute;
  }
  &::before {
    top: 425px;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-top: 60px solid ${props => props.theme.colors.grey_shadow};
  }
`;

const Pencil = styled(Shadow)`
  background-color: ${props => props.theme.colors.primary};
  box-shadow: 0 -5px 0 ${props => props.theme.colors.grey_light}, 0 -17px 0 ${props => props.theme.colors.error};
  top: 13px;
  left: -9px;
  transform: rotate(-0.7deg);
  z-index: 1;
  &::before {
    border-top: 60px solid ${props => props.theme.colors.primary_light};
  }
  &::after {
    top: 469px;
    left: 8px;
    border-left: 2.5px solid transparent;
    border-right: 3px solid transparent;
    border-top: 18px solid ${props => props.theme.colors.grey_dark};
  }
`
Pencil.Shadow = Shadow;

export default Pencil;
