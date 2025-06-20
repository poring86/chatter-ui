import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;