import React, { Component } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import ListMenu from './ListMenu';
import Cup from '../assets/decorations/Cup';

const HeaderContainer = styled.header`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
`

const Menu = styled.div`
  position: absolute;
  top: 40px;
  transition: all 0.5s ease-out;
`
const DropdownMenu = () => <Menu><ListMenu /></Menu>;
const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

class Header extends Component {
  state = {
    displayMenu: false,
  };

  toggleMenu = () => {
    console.log("TOTO")
    this.setState({displayMenu: !this.state.displayMenu});
  }

  render() {
    return (
      <HeaderContainer>
        {this.props.location.pathname !== '/' &&
          <MenuContainer onClick={this.toggleMenu}>
            <Cup.Icon cupSize="32" sizeUnit="px" top="-3px">
              <Cup.Handle cupSize="32" sizeUnit="px" />
            </Cup.Icon>
            {this.state.displayMenu ? <IoIosArrowUp/> : <IoIosArrowDown/>}
            {this.state.displayMenu && <DropdownMenu />}
          </MenuContainer>
        }
      </HeaderContainer>
    );
  }
};

export default withRouter(Header);