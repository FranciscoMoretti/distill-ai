"use client";
import React, { createContext, useContext, useState } from "react";
import { type Post } from "@prisma/client";

interface PostContextProps {
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const PostProvider: React.FC<
  { initialValue: Post } & { children: React.ReactNode }
> = ({ initialValue, children }) => {
  const [post, setPost] = useState<Post>(initialValue);

  const postProps: PostContextProps = {
    post,
    setPost,
  };

  return (
    <PostContext.Provider value={postProps}>{children}</PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
