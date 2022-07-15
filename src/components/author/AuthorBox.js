import React from "react";
import styled from "styled-components";

const AuthorBoxStyles = styled.div`
  .author {
    margin-top: 40px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 100%;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 20px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
`;
const AuthorBox = ({ postInfo }) => {
  return (
    <AuthorBoxStyles>
      <div className="author">
        <div className="author-image">
          <img src={postInfo.user.avatar} alt="" />
        </div>
        <div className="author-content">
          <h3 className="author-name">{postInfo.user.fullname}</h3>
          <p className="author-desc">{postInfo?.user?.description}</p>
        </div>
      </div>
    </AuthorBoxStyles>
  );
};

export default AuthorBox;
