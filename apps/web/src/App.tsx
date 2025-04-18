import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./components/login";
import RegisterPage from "./components/register";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/",
    element: (
      <div className="bg-black h-screen text-white font-semibold flex justify-center items-center">
        hi
      </div>
    )
  },
])

const App = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
