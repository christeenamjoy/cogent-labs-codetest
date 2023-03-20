import {  fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import store from "../store/store";
import Body from "../components/MapContainer";
import Header from "../components/Header";
import * as api from "../utils/api";
import { REASTAURANT_DATA, SEARCH_RESULTS } from "./mocks/data";

jest.mock("../utils/api");

beforeEach(() => jest.clearAllMocks());

test("should Load the loading", async () => {
  render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );
  await waitFor(() => {
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});

test("should render map and restaurants after loading", async () => {
  render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryByText("Loading"));
  expect(screen.getByTestId("map")).toBeInTheDocument();
  expect(screen.getByTestId("restaurants")).toBeInTheDocument();
});

test("should load 50 restaurants", async () => {
  api.placeSearch.mockResolvedValue(REASTAURANT_DATA);
  render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryByText("Loading"));
  const restaurantCards = screen.getAllByTestId("restaurant-card");
  expect(restaurantCards).toHaveLength(50);
});

test("should update restaurants on search form submit", async () => {
  api.placeSearch.mockResolvedValue(SEARCH_RESULTS);
  render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
        <Body />
      </Provider>
    </StaticRouter>
  );

  // Fill in search input and submit form
  const searchInput = screen.getByRole("textbox");
  const searchButton = screen.getByRole("button", { name: /search/i });
  fireEvent.change(searchInput, { target: { value: "salad" } });
  fireEvent.click(searchButton);

  // Wait for loading indicator to disappear and restaurants to update
  await waitForElementToBeRemoved(() => screen.queryByText("Loading"));
  const restaurantCards = screen.getAllByTestId("restaurant-card");

  // Assert that new restaurants were loaded
  expect(api.placeSearch).toHaveBeenCalledWith("salad");
  expect(restaurantCards).toHaveLength(3);


  // Assert that search input value persisted
  expect(searchInput).toHaveValue("salad");

 
});
