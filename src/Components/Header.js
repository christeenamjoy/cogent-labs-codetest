import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchRestaurants, selectRestaurant } from "../store/restaurantSlice";
import { autoComplete } from "../utils/api";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const restaurants = useSelector((store) => store.restaurants.restaurants);
  //   const loading = useSelector((store) => store.restaurants.loading);
  const [searchQuery, setSearchQuery] = useState("");
  const [autoSuggestion, setAutoSuggestion] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    // debouncing is added in the search to reduce the api calls if the use type fastly
    const timer = setTimeout(async () => {
      const response = await autoComplete(searchQuery);
      setAutoSuggestion(response?.results);
    }, 200);

    return () => clearInterval(timer);
  }, [searchQuery]);

  const handleSearchSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setShowSearch(false);
      dispatch(fetchRestaurants(searchQuery));
    },
    [dispatch, searchQuery]
  );

  const handleRandomSelect = useCallback(() => {
    if (restaurants.length <= 0) return;
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    dispatch(selectRestaurant(restaurants[randomIndex]));
  }, [dispatch, restaurants]);

  const renderSearch = useCallback(() => {
    if (location.pathname === "/") {
      return (
        <>
          <div className="relative col-sapn-7 flex items-center justify-center">
            <form onSubmit={handleSearchSubmit} className="flex w-full">
              <input
                type="text"
                placeholder="search"
                data-testid="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearch(true)}
                onBlur={() => setShowSearch(false)}
                className=" border w-full py-2 rounded-l-full px-4"
              ></input>
              <button className="border py-2 rounded-r-full px-4 bg-gray-100">
                Search
              </button>
            </form>

            {showSearch && (
              <div
                data-testid="auto-suggestion"
                className="absolute shadow-lg text-black bg-white top-11 left-0 p-2 z-10"
              >
                {autoSuggestion?.length > 0 ? (
                  autoSuggestion.map((item) => (
                    <div
                      data-testid="auto-suggestion-item"
                      onClick={() => {
                        setShowSearch(true);
                        setSearchQuery(item.text.primary);
                      }}
                      key={item.text.primary}
                    >
                      {item.text.primary}
                    </div>
                  ))
                ) : (
                  <div>Loading</div>
                )}
              </div>
            )}
          </div>
          <button
            className="col-sapn-2 border bg-green-900 text-white rounded-full w-48 justify-self-end"
            onClick={handleRandomSelect}
            data-testid="hungry-button"
          >
            I am feeling Hungry
          </button>
        </>
      );
    }
    return null;
  }, [
    autoSuggestion,
    handleRandomSelect,
    handleSearchSubmit,
    searchQuery,
    location.pathname,
    showSearch,
  ]);

  return (
    <div className=" grid grid-flow-col gap-2 p-5 shadow-lg">
      <Link to="" className="flex items-center col-sapn-2" data-testid="header">
        Congent Labs
      </Link>
      {renderSearch()}
    </div>
  );
};

export default Header;
