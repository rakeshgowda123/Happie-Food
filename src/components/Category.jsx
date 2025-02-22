import React from "react";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <CategoryWrapper>
      <SLink to={"/cusin/Italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </SLink>
      <SLink to={"/cusin/American"}>
        <FaHamburger />
        <h4>American</h4>
      </SLink>
      <SLink to={"/cusin/Thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </SLink>
      <SLink to={"/cusin/Japanese"}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </SLink>
    </CategoryWrapper>
  );
}
const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  background: black;
  height: 4rem;
  width: 8rem;
  border-radius: 50%;
  color: white;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    height: 3rem;
    width: 6rem;
  }

  @media (max-width: 480px) {
    height: 2.5rem;
    width: 5rem;
    h4 {
      font-size: 0.8rem;
    }
  }

  h4 {
    color: white;
    margin-left: 0.5rem;
  }

  &.active {
    background: linear-gradient(to right, orange, red);
  }
`;

// NavLink = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background: #f8f8f8;
//   padding: 1rem;
//   border-radius: 10px;
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover {
//     background: #e2e2e2;
//   }

//   h4 {
//     margin-top: 0.5rem;
//   }

//   svg {
//     font-size: 3rem;
//   }
// `;

export default Category;
