import React, { lazy, Suspense, useEffect, memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectRestaurant, fetchRestaurants } from "../store/restaurantSlice";

const Map = lazy(() => import("./Map"));
const Restaurants = lazy(() => import("./Restaurants"));

const Body = memo(() => {
  const dispatch = useDispatch();
  const { restaurants, selectedRestaurant, loading } = useSelector(
    (state) => state.restaurants
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
        <div>Loading</div>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Map
            restaurants={restaurants}
            selectedRestaurant={selectedRestaurant}
            onSelect={handleSelect}
          />
          <Restaurants
            restaurants={
              selectedRestaurant
                ? restaurants.filter(
                    (r) => r.fsq_id === selectedRestaurant.fsq_id
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
