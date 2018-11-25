import React from 'react';
import { IconContext } from 'react-icons';
import { IoMdGrid, IoIosListBox, IoIosImages, IoMdTabletPortrait } from 'react-icons/io';
import styled from 'styled-components';
import { A } from './Styleguide';

const Menu = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 250px;
  background-color: ${props => props.theme.colors.lightest};
`
const Link = styled(A)`
  text-transform: uppercase;
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
`;
const MenuItem = (props) => (
  <li><Link to={props.to}>{props.children}</Link></li>
);

const Separator = styled.hr`
  border: none;
  border-bottom: 1px solid rgba(102,102,102,0.3);
  width: 50%;
  margin: 0.5rem auto 0.5rem 0;
`;

const ListMenu = () => (
  <Menu>
    <IconContext.Provider value={{style: {marginRight: '0.25rem'}}}>
      <MenuItem to="/">Home</MenuItem>
      <li><Separator /></li>
      <MenuItem to="identify-layouts-components"><IoMdGrid/>Identify layouts and components</MenuItem>
      <MenuItem to="edge-cases"><IoIosListBox/>List Edge Cases</MenuItem>
      <MenuItem to="assets"><IoIosImages/>Assets</MenuItem>
      <MenuItem to="responsive"><IoMdTabletPortrait/>Responsive</MenuItem>
    </IconContext.Provider>
  </Menu>
);

export default ListMenu;
