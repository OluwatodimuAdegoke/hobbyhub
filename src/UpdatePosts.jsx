import React, { useEffect, useState } from "react";
import supabase from "./client.js";
import { useParams } from "react-router-dom";

const UpdatePosts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState({
    title: "",
    content: "",
    image_url: "",
    upvotes: 0,
    comments: [],
  });

  useEffect(() => {
    const fetchPost = async () => {
      let { data, error } = await supabase
        .from("Posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching post:", error.message);
        return;
      }
      setPosts(data);
    };
    console.log(posts);
    fetchPost();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (posts.title === "" || posts.content === "") {
      alert("Title and Content are required");
      return;
    }
    console.log(posts);
    let { data, error } = await supabase
      .from("Posts")
      .update({
        title: posts.title,
        content: posts.content,
        image_url: posts.image_url,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating post:", error.message);
      return;
    }

    alert("Post updated successfully");

    window.location = "/posts/" + id;
  };
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="font-bold text-2xl text-white">Update Post</h1>
      <form
        action=""
        className="flex-col flex gap-4 p-6 bg-gray-400 rounded-md mt-10 w-96"
      >
        <input
          type="text"
          placeholder="Title"
          className="p-2 rounded-md"
          value={posts.title}
          onChange={(e) => {
            setPosts({ ...posts, title: e.target.value });
          }}
        />
        <textarea
          placeholder="Content"
          rows={5}
          className="p-2 rounded-md"
          value={posts.content}
          onChange={(e) => {
            setPosts({ ...posts, content: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Image URL(Optional)"
          className="p-2 rounded-md"
          value={posts.image_url}
          onChange={(e) => {
            setPosts({ ...posts, image_url: e.target.value });
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          Update Post
        </button>
      </form>
    </div>
  );
};
export default UpdatePosts;
