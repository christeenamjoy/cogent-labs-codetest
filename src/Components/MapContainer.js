import React, { lazy, Suspense, useEffect, memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectRestaurant, fetchRestaurants } from "../store/restaurantSlice";
import Shimmer from "./common/Shimmer";


const Map = lazy(() => import("./Map"));
const RestaurantList = lazy(() => import("./RestaurantList"));

const Body = memo(() => {
  const dispatch = useDispatch();
  const { restaurants, selectedRestaurant, loading } = useSelector(
    (state) => state?.restaurants
  );

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const handleSelect = useCallback(
    (restaurant) => {
      dispatch(selectRestaurant(restaurant));
    },
    [dispatch]
  );
  return (
    <div className="flex flex-wrap" data-testid="map-container">
      {loading ? (
        <div>
          Loading <Shimmer />
        </div>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Map
            restaurants={restaurants}
            selectedRestaurant={selectedRestaurant}
            onSelect={handleSelect}
          />
          <RestaurantList
            restaurants={
              selectedRestaurant
                ? restaurants?.filter(
                    (r) => r?.fsq_id === selectedRestaurant?.fsq_id
                  )
                : restaurants
            }
          />
        </Suspense>
      )}
    </div>
  );
});

export default Body;
