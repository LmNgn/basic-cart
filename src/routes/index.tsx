import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClientRoute from "./ClientRoute";
import NotFound from "../pages/NotFound";

const route = createBrowserRouter([
  ...ClientRoute,
  { path: "*", element: <NotFound /> },
]);
const PageRoute = () => {
  return <RouterProvider router={route} />;
};
export default PageRoute;
