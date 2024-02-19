import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage.jsx";
import PopularPage from "./pages/PopularPage.jsx";
import LatestPage from "./pages/LatestPage.jsx";
import RandomPage from "./pages/RandomPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/popular",
        element: <PopularPage />,
      },
      {
        path: "/latest",
        element: <LatestPage />,
      },
      {
        path: "/random",
        element: <RandomPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
