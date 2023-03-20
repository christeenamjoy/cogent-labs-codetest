import React from "react";
import { Link } from "react-router-dom";

const Restaurants = ({ restaurants }) => {
  return (
    <div
      className="p-5 shadow-lg sm:w-4/12 w-full h-screen overflow-scroll"
      data-testid="restaurants"
    >
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <Link
            data-testid="restaurant-card"
            to={`/restaurant/${restaurant.fsq_id}`}
            key={restaurant.fsq_id}
            className="flex lg:flex-nowrap flex-wrap p-2 shadow-lg my-5"
          >
            <img
              alt="res"
              src={
                restaurant.categories[0].icon.prefix +
                120 +
                restaurant.categories[0].icon.suffix
              }
              className="bg-black mr-2 w-32 h-32"
            />
            <div className="max-w-xs">
              <div className="font-bold text-lg">{restaurant.name}</div>
              <div>{restaurant.categories.map((i) => i.name).join(", ")}</div>
              <div className="text-xs">{restaurant.distance} m</div>
            </div>
          </Link>
        ))
      ) : (
        <div>No Matching Restaurants found within 1 km</div>
      )}
    </div>
  );
};

export default Restaurants;
