import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import logo from '../../assets/images/cadmos-logo.jpg'

const Nav = styled.nav`
    width: 100%;
    height: 65px;
    border-bottom: 2px solid #f1f1f1;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;

    .logo{
       padding: 15px 0;
    }
`;

const Navbar = () => {
    return (
        <Nav>
            <img src={logo} alt="Logo"/>
            <Burger />
        </Nav>
    )
}

export default Navbar