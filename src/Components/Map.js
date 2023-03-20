import React from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import { CONGENT_LABS, GOOGLE_API_KEY } from "../utils/Constants";

const Marker = ({ item, selected, onSelect }) => (
  <div className="flex" onClick={() => onSelect(item)}>
    <div
      className={`absolute w-3 h-3 mx-2 mt-3 rounded-full cursor-pointer hover:z-1 ${
        selected ? "bg-red-600 z-50" : "bg-black"
      }`}
    ></div>
    <div
      className={`pl-6 text-md p-2 hover:text-sm ${
        selected
          ? "text-red-600 text-md bg-white z-20 rounded-3xl shadow-2xl"
          : "text-black"
      }`}
    >
      {item?.name}
    </div>
  </div>
);

const CenterMarker = () => (
  <div>
    <div className={`absolute w-5 h-5 rounded-full bg-blue-700`}></div>
    <div className={`pl-6 pt-1 text-md text-blue-700`}>Congent Labs</div>
  </div>
);

const Map = ({
  restaurants,
  selectedRestaurant = null,
  onSelect = () => {},
}) => {
  const defaultProps = {
    center: CONGENT_LABS,
    zoom: 17,
  };


  return (
    <div className="sm:w-8/12 sm:h-screen w-full h-96" data-testid="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY, libraries: ["places"] }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {restaurants.map((restaurant) => (
          <Marker
            data-testid="map-marker"
            key={restaurant.fsq_id}
            lat={restaurant.geocodes.main.latitude}
            lng={restaurant.geocodes.main.longitude}
            selected={selectedRestaurant?.fsq_id === restaurant.fsq_id}
            item={restaurant}
            onSelect={onSelect}
          />
        ))}
        <CenterMarker />
      </GoogleMapReact>
    </div>
  );
};

Map.propTypes = {
  restaurants: PropTypes.array.isRequired,
  selectedRestaurant: PropTypes.object,
  onSelect: PropTypes.func,
};

export default Map;
