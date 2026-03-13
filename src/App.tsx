import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./componunts/layout/Header";
import Login from "./pages/login/login";
import ChangePassword from "./pages/changePassword/changePassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Signup from "./pages/signup/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/changePassword",
        element: <ChangePassword />
      },
      {
        path: "/resetPassword",
        element: <ResetPassword />
      },
      {
        path: "/signup",
        element: <Signup />
      }
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
