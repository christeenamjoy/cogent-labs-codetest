import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import store from "./store/store";
import Container from "./components/Container";
import MapContainer from "./components/MapContainer";
import Restaurant from "./components/Restaurant";
import ErrorElement from "./components/ErrorElement";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    children: [
      {
        path: "/",
        element: <MapContainer />,
      },
      {
        path: "restaurant/:id",
        element: <Restaurant />,
      },
    ],
    errorElement:<ErrorElement/>

  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
