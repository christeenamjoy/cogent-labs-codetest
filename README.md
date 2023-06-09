# Restaurant Finder Web App

This is a web application designed to assist users in finding nearby restaurants, specifically within a 1 km radius of the Cogent Labs office in Roppongi, Tokyo. The app presents the top 50 restaurants in the area and allows users to conduct a keyword search to find restaurants that meet their preferences. If the user is uncertain, the app provides the option to randomly select a restaurant. Additionally, users can view detailed information about each restaurant, such as menu items, photos, and reviews, by clicking on them.


## Table of Contents
* [Getting Started](#getting-started)
* [Architecture](#architecture)
* [API](#api)
* [Techical choices](#technical-choices)
* [Trade-offs](#tade-offs)

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

restaurantSlice: slice of the reducer for all the actions related to restaurant selection.

# API
The web app uses the Foursquare Places API to fetch data about restaurants. The API provides endpoints for searching restaurants and getting details about a single restaurant. You will need to create an account and get an API key to use the API. The API documentation is available at [Foursquare Places API](https://developer.foursquare.com/places-api).

# Technical choices

* React and Redux: Redux is a popular state management library that can be used with React to manage complex data flows and state changes in a scalable manner. React-Redux combination provides a solid foundation for building complex web applications with a great user interface and seamless user experience. Although existing features can be accomplished using Context or component state, when considering scalability, I prefer Redux as the strong foundation.

* React Router: React Router is a library that enables client-side routing for React applications. It allows for easy navigation between pages of the web app without the need for a page refresh, making the app feel more like a native desktop or mobile application. This helps to improve the user experience and provides a more seamless navigation experience. 

* Tailwind CSS: Tailwind CSS is a utility-first CSS framework that provides pre-built styles and classes for common user interface components. Using Tailwind CSS can help to speed up development by providing a set of reusable components that can be quickly styled to match the design of the web app.

* Jest and React Testing Library: Jest is a popular JavaScript testing framework that is commonly used for testing React applications. React Testing Library is a library that provides utilities for testing React components in a way that simulates user behavior. Together, these tools provide a solid testing infrastructure that ensures that the web app is reliable, stable, and bug-free.

* Webpack: Webpack is a popular module bundler for JavaScript applications. It is used to package all of the JavaScript, CSS, and other assets used in the web app into a single, optimized file that can be loaded quickly by the user's web browser. This helps to improve the performance and speed of the web app, making it more responsive and user-friendly.

# Trade offs

* Map center is not changing as the restaurant is randomly selected or searched.
* Mobile responsiveness is yet to be completed.
* Test cases is added to only the main components. <70% coverage.
* Tried to add autocomplete feature but not completed.
* Shimmer UI is added after adding the loading text, so some of the test cases are based on loading text.
* Monitoring tool is not Integrated. I would be using Sentry for  error monitoring and logging tool, Since It provides real-time error tracking, performance monitoring, and issue resolution workflows. It also has features like release tracking, event grouping, and user tracking, making it an ideal choice for tracking errors and issues in a production application.


Feel free to look to my other repositories. 
Currenlt I am developing a scalable Youtube-clone with advanced features like nested comments, live chatting etc..
Development is still in process.
https://github.com/christeenamjoy/my-youtube

