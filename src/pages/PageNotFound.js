import React from "react";
import styled from "styled-components";
import { Button } from "../components/button";
const NotFoundPageStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  img {
    width: 200px;
  }
  h1 {
    font-weight: 600;
    font-size: 36px;
    margin: 30px 0;
  }
`;
const PageNotFound = () => {
  return (
    <NotFoundPageStyles>
      <img src="/logo.png" alt="monkey-blogging" />
      <h1>Oop! Not Found Page</h1>
      <Button to="/">Come Home</Button>
    </NotFoundPageStyles>
  );
};

export default PageNotFound;
