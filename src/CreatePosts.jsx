import React, { useState } from "react";
import supabase from "./client.js";
import { comment } from "postcss";

const CreatePosts = () => {
  const [posts, setPosts] = useState({
    title: "",
    content: "",
    image_url: "",
    upvotes: 0,
    comments: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (posts.title === "" || posts.content === "") {
      alert("Title and Content are required");
      return;
    }
    console.log(posts);
    let { data, error } = await supabase
      .from("Posts")
      .insert({
        title: posts.title,
        content: posts.content,
        image_url: posts.image_url,
        upvotes: posts.upvotes,
        comments: posts.comments,
      })
      .select();

    if (error) {
      console.error("Error creating post:", error.message);
      return;
    }

    alert("Post created successfully");

    window.location = "/";
  };
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="font-bold text-2xl text-white">Create Post</h1>
      <form
        action=""
        className="flex-col flex gap-4 p-6 bg-gray-400 rounded-md mt-10 w-96"
      >
        <input
          type="text"
          placeholder="Title"
          className="p-2 rounded-md"
          onChange={(e) => {
            setPosts({ ...posts, title: e.target.value });
          }}
        />
        <textarea
          placeholder="Content"
          rows={5}
          className="p-2 rounded-md"
          onChange={(e) => {
            setPosts({ ...posts, content: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Image URL(Optional)"
          className="p-2 rounded-md"
          onChange={(e) => {
            setPosts({ ...posts, image_url: e.target.value });
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          Create Post
        </button>
      </form>
    </div>
  );
};
export default CreatePosts;
