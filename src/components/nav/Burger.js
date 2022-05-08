import React, {useState} from 'react';
import styled from 'styled-components';
import RightNav from './RightNav';

const StyledBurger = styled.div `
    font-size: 2px;
    width: 2rem;
    height: 2rem;
    position: fixed;
    top: 15px;
    right: 20px;
    z-index: 20;
    display: none;

    @media (max-width: 768px) {
        display: flex;
        justify-content: space-around;
        flex-flow: column nowrap;
    }

    div{
        width: 2rem;
        height: 0.25 rem;
        background-color: ${({open}) => open ? '#ccc' : '#333'};
        color: ${({open}) => open ? '#ccc' : '#333'};
        border-radius: 10px;
        transform-origin: 10px;
        transition: all 0.3s linear;

        &:nth-child(1){
            transform:  ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
        }

        &:nth-child(2){
            transform:  ${({open}) => open ? 'translateX(100%)' : 'translateX(0)'};
            opacity:  ${({open}) => open ? 0 : 1};
        }

        &:nth-child(3){
            transform:  ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
            margin-top:  ${({open}) => open ? '-120%' : '0'};
        }
    }
`;

const Burger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div>-----</div>
        <div>-----</div>
        <div>-----</div>
    </StyledBurger>
    <RightNav open={open}/>
    </>
  )
}

export default Burger