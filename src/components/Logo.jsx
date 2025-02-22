import React from "react";
import { SiIfood } from "react-icons/si";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
function Logo() {
  return (
    <NavLink to={"/"}>
      <Logod>
        <SiIfood />
        <h1>Happie-Food</h1>
      </Logod>
    </NavLink>
  );
}
const Logod = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  gap: 0.5rem;
  border: none;

  h1 {
    font-size: clamp(1.2rem, 4vw, 2rem);
  }

  svg {
    font-size: clamp(2rem, 6vw, 4rem);
  }

  @media (max-width: 480px) {
    margin: 0.5rem;
  }
`;
export default Logo;
