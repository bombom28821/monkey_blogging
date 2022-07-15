import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const PostTilteStyles = styled.h3`
  font-weight: bold;
  line-height: 1.5;
  display: block;
  color: inherit;
  ${(props) =>
    props.size === "sm-normal" &&
    css`
      font-size: 16px;
    `};
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `};
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
    `};
`;
const PostTilte = ({
  className = "",
  size = "sm-normal",
  to = "",
  children,
}) => {
  return (
    <PostTilteStyles size={size} className={`${className} post-title`}>
      <Link to={`/${to}`}>{children}</Link>
    </PostTilteStyles>
  );
};

export default PostTilte;
