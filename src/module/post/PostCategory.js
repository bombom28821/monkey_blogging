import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.grayF3}; ;
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `};
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
`;
const PostCategory = ({
  children,
  className = "",
  type = "primary",
  to = "",
  ...props
}) => {
  return (
    <PostCategoryStyles
      type={type}
      {...props}
      className={`post-category ${className}`}
    >
      <Link to={`/category/${to}`}>{children}</Link>
    </PostCategoryStyles>
  );
};

export default PostCategory;
