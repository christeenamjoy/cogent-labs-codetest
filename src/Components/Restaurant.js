import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPlacesDetails } from "../utils/api";
import Shimmer from "./Shimmer";

const Restaurant = () => {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [place, setPlace] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlace() {
      try {
        setLoading(true);
        const data = await fetchPlacesDetails(id);
        setPlace(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchPlace();
  }, [id]);

  if (loading) {
    return <Shimmer />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-3 text-black" data-testid="restaurant">
      <div className="font-bold text-3xl m-2 mt-8">
        {place?.name}
        <span className="m-2 text-md">({place.rating ? `${place.rating}/10` : "No rating found"})</span>
      </div>

      {place.menu ? (
        <Link
          to={place.menu}
          className="flex m-2 underline text-blue-600 my-5 text-lg"
        >
          Menu
        </Link>
      ) : (
        <div className="m-2 text-lg">Sorry Menu is not available</div>
      )}

      <div className="flex overflow-scroll">
        {place.photos?.length > 0 ? (
          place?.photos?.map((photo) => (
            <img
              key={photo.id}
              className="w-64 h-64 mx-2"
              src={
                photo.prefix +
                `${photo.width / 2}x${photo.height / 2}` +
                photo.suffix
              }
              alt=""
              loading="lazy"
            />
          ))
        ) : (
          <Shimmer />
        )}
      </div>
    </div>
  );
};

// Restaurant.propTypes = {
//   id: PropTypes.string.isRequired,
// };

export default Restaurant;
