import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

const PostRelated = ({ categoryName }) => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("category.name", "==", categoryName));
    onSnapshot(q, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList(result);
    });
  }, [categoryName]);
  if (postList.length <= 0) return null;
  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {postList.length > 0 &&
          postList.map((post) => (
            <PostItem key={post.id} post={post}></PostItem>
          ))}
      </div>
    </div>
  );
};

export default PostRelated;
