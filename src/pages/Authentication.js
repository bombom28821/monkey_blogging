import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .image {
    margin: 20px auto 30px;
  }
  .heading {
    text-align: center;
    font-weight: 600;
    font-size: 40px;
    color: ${(props) => props.theme.primary};
    margin-bottom: 50px;
    text-transform: capitalize;
  }
  .have-account {
    margin-bottom: 20px;
    transition: all 0.2s linear;
    a:hover {
      text-decoration: underline;
    }
  }
`;
const Authentication = ({ children }) => {
  return (
    <AuthenticationStyles>
      <div className="container">
        <div className="text-center">
          <NavLink to="/" className="inline-block">
            <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
          </NavLink>
        </div>
        <h1 className="heading">Monkey blogging</h1>
        {children}
      </div>
    </AuthenticationStyles>
  );
};

export default Authentication;
