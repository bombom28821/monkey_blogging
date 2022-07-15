import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTilte from "./PostTilte";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-info {
      color: #6b6b6b;
      margin-left: 0%;
    }
  }
`;

const PostItem = ({ post }) => {
  const date = new Date(post?.createAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!post?.id) return;
  return (
    <PostItemStyles>
      <div className="post">
        <div className="post-image">
          <PostImage url={post.image} alt="unsplash" />
        </div>
        <PostCategory to={post.category.name}>
          {post.category.name}
        </PostCategory>
        <PostTilte size="normal" to={post.slug}>
          {post.title}
        </PostTilte>
        <PostMeta
          date={formatDate || new Date()}
          to={post?.username}
          authorName={post?.user?.fullname}
        ></PostMeta>
      </div>
    </PostItemStyles>
  );
};

export default PostItem;
