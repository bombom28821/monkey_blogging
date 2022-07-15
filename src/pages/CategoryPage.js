import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import DashboardHeader from "module/dashboard/DashboardHeader";
import DashboardHeading from "module/dashboard/DashboardHeading";
import PostItem from "module/post/PostItem";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const CategoryPage = () => {
  const { slug } = useParams();
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("category.name", "==", slug));
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
  }, []);
  if (!slug) return <PageNotFound></PageNotFound>;
  if (postList.length <= 0) return;
  return (
    <div>
      <DashboardHeading
        title="List post"
        desc={`List post by category: ${slug}`}
      ></DashboardHeading>
      <div className="grid-layout grid-layout--primary">
        {postList.length > 0 &&
          postList.map((post) => (
            <PostItem key={post.id} post={post}></PostItem>
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
