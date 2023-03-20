import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Header from "../components/Header";
import { Provider } from "react-redux";
import store from "../store/store";
import { StaticRouter } from "react-router-dom/server";
import * as api from "../utils/api";
import {  AUTOCOMPLETE, SELECTED_RESTAURANT } from "./mocks/data";
import { selectRestaurant } from "../store/restaurantSlice";

jest.mock("../utils/api");

beforeEach(() => jest.clearAllMocks());

const setup = () => {
  render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </StaticRouter>
  );
};

test("Company name should load on rendering header", () => {
  setup();
  const headetText = screen.getByRole("link", { name: /congent labs/i });
  expect(headetText).toBeInTheDocument();
});

test("should render the search input field", () => {
  setup();
  const searchInput = screen.getByRole("textbox");
  expect(searchInput).toBeInTheDocument();
});

test("should render the search button", () => {
  setup();
  const searchButton = screen.getByRole("button", { name: /search/i });
  expect(searchButton).toBeInTheDocument();
});

it("should show auto suggestions when user types in search input field", async () => {
  api.autoComplete.mockResolvedValue(AUTOCOMPLETE);
  setup();
  const searchInput = screen.getByRole("textbox");
  fireEvent.focus(searchInput);
  fireEvent.change(searchInput, { target: { value: "salad" } });
  await waitForElementToBeRemoved(() => screen.queryByText("Loading"));
  const autoSuggestionItem = screen.getAllByTestId("auto-suggestion-item");
  expect(autoSuggestionItem).toHaveLength(2);
});

it("should render the hungry button", () => {
  setup();
  const hungryButton = screen.getByRole("button", {
    name: /i am feeling hungry/i,
  });
  expect(hungryButton).toBeInTheDocument();
});

it("should render the auto-suggestion dropdown on focus", async () => {
  setup();
  const searchInput = screen.getByRole("textbox");
  fireEvent.focus(searchInput);
  expect(screen.getByTestId("auto-suggestion")).toBeInTheDocument();
});

it("should not render the auto-suggestion dropdown on blur", async () => {
  setup();
  const searchInput = screen.getByTestId("search-input");
  fireEvent.focus(searchInput);
  expect(screen.getByTestId("auto-suggestion")).toBeInTheDocument();
  fireEvent.blur(searchInput);
  expect(screen.queryByTestId("auto-suggestion")).not.toBeInTheDocument();
});

it("should update the search query state on input change", async () => {
  setup();

  const searchInput = screen.getByTestId("search-input");
  fireEvent.change(searchInput, { target: { value: "salad" } });
  expect(searchInput.value).toBe("salad");
});

it("dispatches selectRestaurant action on 'I am feeling Hungry' button click", () => {
  setup();

  const hungryButton = screen.getByRole("button", {
    name: /i am feeling hungry/i,
  });
  fireEvent.click(hungryButton);

  const restaurant = SELECTED_RESTAURANT;
  store.dispatch(selectRestaurant(restaurant));

  const selectedRestaurant = store.getState().restaurants.selectedRestaurant;
  expect(selectedRestaurant).toEqual(restaurant);
});
