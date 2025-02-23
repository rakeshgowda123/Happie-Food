import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { Link } from "react-router-dom";

function Veggie() {
  const [veggie, setVeggie] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    getVeggie();

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVeggie = async () => {
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await api.json();
      setVeggie(data.recipes || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Render mobile layout
  if (isMobile) {
    return (
      <MobileWrapper>
        <h3>Veggie Picks</h3>
        <GridContainer>
          {veggie.map((recipe) => (
            <Card key={recipe.id}>
              <Link to={"/recipe/" + recipe.id}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
              </Link>
            </Card>
          ))}
        </GridContainer>
      </MobileWrapper>
    );
  }

  // Render desktop slider layout
  return (
    <Wrapper>
      <h3>Veggie Picks</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: true,
          pagination: false,
          drag: "free",
          gap: "2rem",
          autoScroll: {
            speed: 1,
            pauseOnHover: true,
          },
        }}
        extensions={{ AutoScroll }}
      >
        {veggie.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <Card>
              <Link to={"/recipe/" + recipe.id}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
              </Link>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 2rem 0;
  padding: 0 1rem;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .splide {
    padding: 1rem 0;
  }
`;

const MobileWrapper = styled.div`
  margin: 2rem 0;
  padding: 0 1rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0.5rem;
`;

const Card = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;

  @media (min-width: 769px) {
    height: 15rem;
  }

  @media (max-width: 768px) {
    height: 200px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
    padding: 1rem;
  }

  &:hover {
    transform: scale(0.98);
    transition: transform 0.2s ease-in-out;
  }
`;

export default Veggie;
