import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 18px 10px;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    z-index: 1;

    a {
      color: white;
    }

    li {
      color: #fff;
    }
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <li>
        <NavLink exact to="/home" activeClassName="active-link">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/about-us" activeClassName="active-link">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/">
          Log Out
        </NavLink>
      </li>
    </Ul>
  );
};

export default RightNav;
