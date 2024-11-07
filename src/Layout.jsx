import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav className="bg-gray-500 flex justify-center  w-full">
        <ul className="flex items-center w-full">
          <li
            key="home-button"
            className="flex flex-row items-center text-center p-4 justify-between w-full"
          >
            <Link style={{ color: "white" }} to="/">
              <h1 className="font-bold mr-4 text-white">DogHub</h1>
            </Link>

            <div className="gap-4 flex">
              <Link style={{ color: "white" }} to="/" className="text-center">
                Home
              </Link>
              <Link
                style={{ color: "white" }}
                to="/createPosts"
                className="text-center"
              >
                Create New Post
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
