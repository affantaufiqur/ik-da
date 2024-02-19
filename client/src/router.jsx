import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Tes from "./components/Tes.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: <Tes />,
      },
    ],
  },
]);
