import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Cusin() {
  const [cusine, setCusine] = useState([]);
  let params = useParams(); // ✅ Correctly calling useParams()

  const getCusin = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );

    const recipes = await data.json();

    setCusine(recipes.results);
  };

  useEffect(() => {
    getCusin(params.type);
    console.log(params.type);
  }, [params.type]);

  return (
    <div>
      <h2>{params.type} Recipes</h2>
      <Grid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {cusine && cusine.length > 0 ? (
          cusine.map((item) => (
            <Link key={item.id} to={"/recipe/" + item.id}>
              <Card>
                <img src={item.image} alt="" />
                <h4>{item.title}</h4>
              </Card>
            </Link>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </Grid>
    </div>
  );
}
// Cusin.js and Searched.js
const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 1rem;
  }

  h4 {
    text-align: center;
    padding: 0.5rem;
    font-size: clamp(0.9rem, 2vw, 1.1rem);
  }
`;

export default Cusin;
