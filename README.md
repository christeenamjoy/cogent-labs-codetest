# Restaurant Finder Web App

This is a web app that helps users find restaurants close to their office (Here Cogent Labs office in Roppongi, Tokyo). It shows the top 50 restaurants with 1 km of the office and do a keyword search for restaurants. If the use is confused it provide an option to a select a random restaurant too. Also the use can view details about each restaurant, such as menu, pictures, and reviews by clicking them.


## Table of Contents
* [Getting Started](#getting-started)
* [Architecture](#architecture)
* [API](#api)
* [Techical choices](#technical-choices)
* [Trades-offs](#tade-offs)

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


# Architecture

The web app is built using React and Redux. It consists of the following components:

**App**: The main component that renders all other components and handles the application state.\
  **Header**: The component which dispaly the compnay name , searchbar and the button for random selection of the           restaurant.\
    **SearchBar**: A component that allows the user to search for restaurants based on keywords.\
   **MapContainer**: A component which display the the list of restaurant in a map and as a list side by side in web and     one below another in mobile.\
    **RestaurantList**: A component that displays a list of restaurants based on the search query or random selection.\
    **Map**: A component that displays a map with markers for each restaurant.\
   **RestaurantCard**: A component that displays information about a single restaurant, such as name, address, menu,             pictures, and reviews.

    
The application state is managed using Redux, with the following actions and reducers:

fetchRestaurants: Sets the list of restaurants based on the search query or random selection.
selectRestaurant: Sets the details of a single restaurant, on random selection or use selection.

restaurantSlice: slice of reducer for all the actions related to restaurant selection.

# API
The web app uses the Foursquare Places API to fetch data about restaurants. The API provides endpoints for searching restaurants and getting details about a single restaurant. You will need to create an account and get an API key to use the API. The API documentation is available at [Foursquare Places API](https://developer.foursquare.com/places-api).

# Technical choices

* React and Redux: As specified in the technical spec, React is the preferred choice for front-end development at Cogent, and Redux is a popular state management library that can be used with React to manage complex data flows and state changes in a scalable manner. This combination provides a solid foundation for building complex web applications with a great user interface and seamless user experience.

* React Router: React Router is a library that enables client-side routing for React applications. It allows for easy navigation between pages of the web app without the need for a page refresh, making the app feel more like a native desktop or mobile application. This helps to improve the user experience and provides a more seamless navigation experience.

* Tailwind CSS: Tailwind CSS is a utility-first CSS framework that provides pre-built styles and classes for common user interface components, such as buttons, forms, and navigation bars. Using Tailwind CSS can help to speed up development by providing a set of reusable components that can be quickly styled to match the design of the web app.

* Jest and React Testing Library: Jest is a popular JavaScript testing framework that is commonly used for testing React applications. React Testing Library is a library that provides utilities for testing React components in a way that simulates user behavior. Together, these tools provide a solid testing infrastructure that ensures that the web app is reliable, stable, and bug-free.

* Webpack: Webpack is a popular module bundler for JavaScript applications. It is used to package all of the JavaScript, CSS, and other assets used in the web app into a single, optimized file that can be loaded quickly by the user's web browser. This helps to improve the performance and speed of the web app, making it more responsive and user-friendly.

# Trade Offs





