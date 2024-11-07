import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout.jsx";
import CreatePosts from "./CreatePosts.jsx";
import Posts from "./Posts.jsx";
import UpdatePosts from "./UpdatePosts.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<App />} />
        <Route index={false} path="/createPosts" element={<CreatePosts />} />
        <Route index={false} path="/posts/:id" element={<Posts />} />
        <Route
          index={false}
          path="/updatePosts/:id"
          element={<UpdatePosts />}
        />
        {/* <Route index={false} path="/coinDetails/:symbol" element={<DetailView />} />
        <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);
