import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./client";
import { Link } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const sortByNewest = (e) => {
    setFilteredPosts(
      [...filteredPosts].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
    );
  };

  const sortByPopular = (e) => {
    setFilteredPosts([...filteredPosts].sort((a, b) => b.upvotes - a.upvotes));
  };

  const searchPosts = (e) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);
    setFilteredPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      let { data, error } = await supabase.from("Posts").select("*");
      if (error) {
        console.error("Error fetching posts:", error.message);
        return;
      }

      setPosts(data);
      setFilteredPosts(data); // Initialize filteredPosts with all posts
    };
    fetchPosts();
  }, []);

  return (
    <div className="px-10">
      <div className="flex flex-row items-center gap-2 mt-2 justify-between">
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchQuery}
          onChange={searchPosts}
          className="p-2 border rounded"
        />
        <div className="flex flex-row items-center gap-2">
          <h1>Order by:</h1>
          <button
            className="p-2 hover:bg-slate-800 hover:border-white "
            onClick={sortByNewest}
          >
            Newest
          </button>
          <button
            className="p-2 hover:bg-slate-800 hover:border-white "
            onClick={sortByPopular}
          >
            Most Popular
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredPosts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <div className="flex flex-row mt-10 text-start gap-4 bg-gray-700 rounded-md p-4">
              <div className="w-full">
                <h1 className="font-bold text-2xl text-white">{post.title}</h1>
                <p className="text-white">{post.content}</p>
                <span className="text-white flex flex-row justify-between w-full">
                  <div>
                    <span className="font-bold">Upvotes:</span>{" "}
                    <span className="text-blue-500">{post.upvotes}</span>
                  </div>
                  <div>
                    <span>
                      Posted{" "}
                      {(() => {
                        const now = new Date();
                        const postDate = new Date(post.created_at);
                        const diffInSeconds = Math.floor(
                          (now - postDate) / 1000
                        );
                        const diffInMinutes = Math.floor(diffInSeconds / 60);
                        const diffInHours = Math.floor(diffInMinutes / 60);
                        const diffInDays = Math.floor(diffInHours / 24);
                        const diffInWeeks = Math.floor(diffInDays / 7);

                        if (diffInWeeks > 0)
                          return `${diffInWeeks} week${
                            diffInWeeks > 1 ? "s" : ""
                          } ago`;
                        if (diffInDays > 0)
                          return `${diffInDays} day${
                            diffInDays > 1 ? "s" : ""
                          } ago`;
                        if (diffInHours > 0)
                          return `${diffInHours} hour${
                            diffInHours > 1 ? "s" : ""
                          } ago`;
                        if (diffInMinutes > 0)
                          return `${diffInMinutes} minute${
                            diffInMinutes > 1 ? "s" : ""
                          } ago`;
                        return `${diffInSeconds} second${
                          diffInSeconds > 1 ? "s" : ""
                        } ago`;
                      })()}
                    </span>
                  </div>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
