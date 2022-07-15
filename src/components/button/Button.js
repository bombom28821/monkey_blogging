import React from "react";
import styled, { css } from "styled-components";
import { LoadingSpinner } from "../loading";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
const ButtonStyles = styled.button`
  height: 63px;
  padding: 20px;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.kind === "primary"
      ? css`
          color: white;
          background-image: linear-gradient(
            to right bottom,
            ${(props) => props.theme.primary},
            ${(props) => props.theme.secondary}
          );
        `
      : css`
          color: ${(props) => props.theme.primary};
          background-color: white;
        `};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

/**
 *
 * @param {string} type Type of button is button || submit
 * @returns
 */
const Button = ({
  type = "button",
  children,
  isLoading,
  to = "",
  kind = "primary",
  ...props
}) => {
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to} className="inline-block">
        <ButtonStyles kind={kind} type={type} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles kind={kind} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  kind: PropTypes.oneOf(["primary", "secondary"]),
};
export default Button;
