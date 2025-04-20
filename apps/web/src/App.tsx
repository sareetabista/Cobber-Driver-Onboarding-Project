import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import RegistrationForm from "./components/form";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
import Protected from "./components/shared/protected";
import Home from "./components/landing-page";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Home />
        {/* <RegistrationForm /> */}
      </Protected>
    ),
  },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <Toaster
          toastOptions={{
            classNames: {
              error: "text-red-500",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
};

export default App;
