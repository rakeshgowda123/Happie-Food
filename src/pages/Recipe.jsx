import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  let params = useParams();

  const [details, setDetails] = useState({});
  const [activetab, setActiveTab] = useState("Instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    console.log(detailData);

    setDetails(detailData);
  };

  useEffect(() => {
    console.log("Params:", params);
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button
          className={activetab === "Instructions" ? "active" : ""}
          onClick={() => setActiveTab("Instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activetab === "Ingredients" ? "active" : ""}
          onClick={() => setActiveTab("Ingredients")}
        >
          Ingredints
        </Button>
        {activetab === "Instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
            <a href={details.sourceUrl}>click here</a>
          </div>
        )}
        {activetab === "Ingredients" && (
          <ul>
            {details.extendedIngredients &&
              details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}
const DetailWrapper = styled.div`
  margin: 5rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  max-width: 1200px;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  img {
    width: 100%;
    max-width: 500px;
    object-fit: cover;
    margin-bottom: 2rem;
  }

  h2 {
    margin-bottom: 2rem;
    font-size: clamp(1.5rem, 4vw, 2rem);
  }

  li {
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.8;
  }
`;

const Info = styled.div`
  @media (min-width: 768px) {
    margin-left: 2rem;
  }

  h3 {
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.6;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  margin: 1rem 1rem 1rem 0;
  font-size: clamp(0.8rem, 2vw, 1rem);
`;

export default Recipe;
