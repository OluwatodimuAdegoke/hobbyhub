import { comment } from "postcss";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "./client";
import {
  ArrowBigUp,
  Delete,
  Edit,
  FilePenLine,
  Pencil,
  Trash2,
} from "lucide-react";

const Posts = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [post, setPost] = useState({
    title: "",
    content: "",
    upvotes: 0,
    comments: [],
    image_url: "",
  });

  const upVote = async () => {
    let { data, error } = await supabase
      .from("Posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id);
    if (error) {
      console.error("Error upvoting post:", error.message);
      return;
    }
    setPost((prevPost) => ({ ...prevPost, upvotes: prevPost.upvotes + 1 }));
  };

  const deletePost = async () => {
    let { data, error } = await supabase.from("Posts").delete().eq("id", id);
    if (error) {
      console.error("Error deleting post:", error.message);
      return;
    }
    window.location = "/";
  };

  const addComment = async () => {
    let { data, error } = await supabase
      .from("Posts")
      .update({ comments: [...post.comments, comment] })
      .eq("id", id);
    if (error) {
      console.error("Error adding comment:", error.message);
      return;
    }
    setPost((prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, comment],
    }));
    setComment("");
  };
  useEffect(() => {
    const fetchPost = async () => {
      let { data, error } = await supabase
        .from("Posts")
        .select("*")
        .eq("id", id);
      if (error) {
        console.error("Error fetching post:", error.message);
        return;
      }
      setPost(data[0]);
    };
    console.log("Fetching post");
    fetchPost();
  }, []);
  return (
    <div className="px-2 bg-gray-700 mt-4 rounded-md self-center mx-20 justify-center flex flex-col gap-4 text-white p-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <span>
            Posted{" "}
            {(() => {
              const now = new Date();
              const postDate = new Date(post.created_at);
              const diffInSeconds = Math.floor((now - postDate) / 1000);
              const diffInMinutes = Math.floor(diffInSeconds / 60);
              const diffInHours = Math.floor(diffInMinutes / 60);
              const diffInDays = Math.floor(diffInHours / 24);
              const diffInWeeks = Math.floor(diffInDays / 7);

              if (diffInWeeks > 0)
                return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
              if (diffInDays > 0)
                return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
              if (diffInHours > 0)
                return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
              if (diffInMinutes > 0)
                return `${diffInMinutes} minute${
                  diffInMinutes > 1 ? "s" : ""
                } ago`;
              return `${diffInSeconds} second${
                diffInSeconds > 1 ? "s" : ""
              } ago`;
            })()}
          </span>
          <div className="flex flex-row gap-4">
            <Link to={`/updatePosts/${id}`} className="text-white">
              <FilePenLine className="hover:text-blue-500" />
            </Link>

            <Trash2 className="hover:text-red-500" onClick={deletePost} />
          </div>
        </div>
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="flex flex-row gap-2">
          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-40 h-40 object-cover rounded-md "
            />
          )}
          <p>{post.content}</p>
        </div>
        <div className="flex items-center gap-2">
          <ArrowBigUp onClick={upVote} className="hover:text-blue-500 " />

          <p>{post.upvotes} upvotes</p>
        </div>
        <div className="p-2 gap-1 flex flex-col bg-gray-500 rounded-lg">
          <h2 className="font-bold text-xl">Comments</h2>
          {post.comments.map((comment, ind) => (
            <div className="flex flex-col gap-2" key={ind}>
              <p>
                {"..."}
                {comment}
              </p>
            </div>
          ))}
          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="Add a comment"
              className="w-1/2 p-2 rounded-md"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={addComment}
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Posts;
