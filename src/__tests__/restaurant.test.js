import { act, render, screen, waitFor } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import store from "../store/store";
import Restaurant from "../Components/Restaurant";
import * as api from "../utils/api";
import {
  FETCH_PLACE_DETAILS,
  FETCH_PLACE_DETAILS_WITHOUT_MENU,
} from "./mocks/data";

jest.mock("../utils/api");
beforeEach(() => jest.clearAllMocks());

const setup = () => {
  render(
    <StaticRouter>
      <Provider store={store}>
        <Restaurant />
      </Provider>
    </StaticRouter>
  );
};

describe("Restaurant", () => {
  test("renders shimmer initially", () => {
    setup();
    const shimmer = screen.getAllByTestId("shimmer");
    expect(shimmer).toHaveLength(20);
  });

  test("renders restaurant name and rating", async () => {
    api.fetchPlacesDetails.mockResolvedValue(FETCH_PLACE_DETAILS);
    setup();

    await waitFor(() => screen.findByTestId("restaurant"));
    act(() => {
      expect(screen.getByText(/pompadour 7.7/i)).toBeInTheDocument();
    });
  });

  test("renders menu link if menu is available", async () => {
    api.fetchPlacesDetails.mockResolvedValue(FETCH_PLACE_DETAILS);

    setup();

    await waitFor(() => screen.findByTestId("restaurant"));

    const menuLink = screen.getByRole("link", { name: "Menu" });
    expect(menuLink).toHaveAttribute(
      "href",
      "http://www.pompadour.co.jp/product/"
    );
  });

  test("renders sorry message if menu is not available", async () => {
    api.fetchPlacesDetails.mockResolvedValue(FETCH_PLACE_DETAILS_WITHOUT_MENU);

    setup();

    await waitFor(() => screen.findByTestId("restaurant"));
    const sorryMessage = screen.getByText(/sorry Menu is not available/i);
    expect(sorryMessage).toBeInTheDocument();
  });

  test("renders photos", async () => {
    api.fetchPlacesDetails.mockResolvedValue(FETCH_PLACE_DETAILS);

    setup();

    await waitFor(() => screen.findByTestId("restaurant"));

    const photos = screen.getAllByRole("img");
    expect(photos).toHaveLength(5);
  });
});
