import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { Link } from "react-router-dom";

function Popular() {
  const [popular, setPopular] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    getPopular();

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPopular = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
    );
    const data = await api.json();
    setPopular(data.recipes || []);
  };

  // Render mobile layout
  if (isMobile) {
    return (
      <MobileWrapper>
        <h3>Popular Picks</h3>
        <GridContainer>
          {popular.map((recipe) => (
            <Card key={recipe.id}>
              <Link to={"/recipe/" + recipe.id}>
                <img src={recipe.image} alt={recipe.title} />
                <TextOverlay>
                  <p>{recipe.title}</p>
                </TextOverlay>
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
      <h3>Popular Picks</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "2rem",
          rewind: true,
          autoplay: true,
          interval: 2000,
          direction: "rtl",
          pauseOnHover: false,
          autoScroll: {
            speed: 1,
          },
        }}
        extensions={{ AutoScroll }}
      >
        {popular.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <Card>
              <Link to={"/recipe/" + recipe.id}>
                <img src={recipe.image} alt={recipe.title} />
                <TextOverlay>
                  <p>{recipe.title}</p>
                </TextOverlay>
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
    margin-bottom: 2rem;
    color: #333;
  }

  .splide {
    padding: 1rem 0;
  }
`;

const MobileWrapper = styled.div`
  margin: 1rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #333;
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.5rem;
`;

const Card = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background: #fff;
  transition: transform 0.3s ease;

  @media (min-width: 769px) {
    height: 15rem;
  }

  @media (max-width: 768px) {
    height: 250px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);

    img {
      transform: scale(1.05);
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  padding: 1.5rem 1rem;

  p {
    color: white;
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
    text-align: center;
    font-weight: 600;
    margin: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
`;

export default Popular;
