import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import store from "./store/store";
import MapContainer from "./components/MapContainer";
import Restaurant from "./components/Restaurant";
import ErrorElement from "./components/common/ErrorElement";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./components/common/ErrorBoundary";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ErrorBoundary>
  <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>  </ErrorBoundary>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
