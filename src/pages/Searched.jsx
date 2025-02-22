import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Searched() {
  const [searchedRecipe, getSerchrecipe] = useState([]);

  let params = useParams();

  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );

    const recipes = await data.json();

    getSerchrecipe(recipes.results);
  };

  useEffect(() => {
    getSearched(params.Search);
  }, [params.Search]);

  return (
    <Grid>
      {searchedRecipe.map((item) => {
        return (
          <Link key={item.title} to={"/recipe/" + item.id}>
            <Card>
              <img src={item.image} alt="" />
              <h4>{item.title}</h4>
            </Card>
          </Link>
        );
      })}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 2rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 1rem;
  }
  h4 {
    text-align: center;
    padding: 0.5rem;
  }
  a {
    text-decoration: none;
  }
`;
export default Searched;
