import {
  API_KEY,
  FETCH_AUTOCOMPLETE,
  FETCH_PLACE_DETAILS,
  FETCH_RESTAURANTS,
} from "./Constants";

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: API_KEY,
  },
};

const getSearchParams = (searchQuery) =>
  new URLSearchParams({
    query: `restaurants,${searchQuery}`,
    ll: "35.66,139.73",
    open_now: "true",
    radius: 1000,
    sort: "DISTANCE",
    limit: 50,
  });

export const placeSearch = async (searchQuery) => {
  try {
    const searchParams = getSearchParams(searchQuery);
    const response = await fetch(
      `${FETCH_RESTAURANTS}${searchParams}`,
      options
    );
    if (response.ok) return await response.json();
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error(error);
  }
};

export const autoComplete = async (searchQuery) => {
  try {
    const searchParams = getSearchParams(searchQuery);
    const response = await fetch(
      `${FETCH_AUTOCOMPLETE}${searchParams}`,
      options
    );
    if (response.ok) return await response.json();
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error(error);
  }
};

export const fetchPlacesDetails = async (fsqId) => {
  try {
    const searchParams = new URLSearchParams({
      fields: "fsq_id,name,geocodes,location,photos,rating,menu",
    }).toString();
    const results = await fetch(
      `${FETCH_PLACE_DETAILS}${fsqId}?${searchParams}`,
      options
    );
    return await results.json();
  } catch (error) {
    console.error(error);
  }
};
