## May 30, 2023

## May 26, 2023

## May 25, 2023

Today I worked on:

- Centralizing how our frontend grabs data.

- Made the create shop page a modal rather than a different page

Today I worked on moving our fetch requests up the component tree and closer to the root. This way we can pass our big lists down to the components that need the data. This is better than having many components call the same data individually

I implemented a way to show the create shop page on the account page. I am hoping to centralize all of this kind of user interactivity onto one page to make it easier to move and update data in the future.

## May 24, 2023

Today I worked on:

- Adding custom hooks for grabbing users, a users shop, and the shopping cart.

- Created the base for our initial imports in app.js

- Worked on the shop page using tailwind

Today I implemented a custom hook to return the user information and all important id's related to that user. If the user has a shop, there is a hook to grab that information, and when a user logs in, a hook will also grab the carts data.

Me and Sina worked together to figure out how to get the token from our App.js file. The authprovider wrapper needed to go in index.js for our desired functionality to work.

I also implemented the basic page that will show the shop details when that shop is linked on a listing.

## May 23, 2023

Today I worked on:

- Front-end authentication login

- applying authentication by creating a form to create a shop

- created a backend point to easily grab a users important identification values

Today I resolved the problems that we were having with authentication in the front end. The problem was that while I was trying to understand the environment variables, I pruned my docker volume. Because of that I did not have a user to login with.

I created a form that creates a shop for a user. This form only creates a shop if the user is currently logged in. I implemented authentication to secure the creation of a shop.

I created an endpoint in accounts that uses an inner join of three tables to return the user id, the shopping cart id, and the shop id. It returns null on any value it does not have.

## May 22, 2023

Today I worked on:

- Endpoint replanning and project organization

- pair programming on fastApi

- Attempted Authentication on the front end

- set up initial account page components in react.

Today the team discussed restructuring a lot of the endpoints. They way we had the written did not cover all of the information we needed them too.

I gave Preeti an overview of the files within a fastApi project and how to structure a create request.

Me ans Sina started to tackle the front end authentication. Unfortunately we were unsuccessful and ran into various error along the way. Including the login function sending a post request to localhost:3000, and a CORS error afterwards.

Finally I set up the base files for a user to check their account information. This will eventually allow a user to see their purchase history, create or manage their shop, alow users to navigate to the create a shop form and the create a listing form, and allow users to see other information about their profile.

## May 19, 2023

Today I worked on:

- Setting up the review endpoints(post, get, delete, and put)

Logged in users can now create, edit, and delete reviews which have an author property matching the user's username.

Non logged-in users may still get all reviews from a single listing.

## May 18, 2023

Today I worked on:

- Setting up Authentication (pair programming)

- Setting up Authentication for POST PUT DELETE shop endpoints

Me and Sina worked on wrapping up the progress made on authentication from the previous day. Now we can Create accounts and authenticate users.

I finished all of the shop endpoints to how we have planned SO FAR. Users can now only create, update or delete a shop if they are logged in. The Shop endpoints take the user_id and compare it to the user ID held by the specific instance of a shop.

## May 17, 2023

Today I worked on:

- Setting up tailwind configuration

- Creating the get_all, update, delete, and put methods for the shop api

Following the Tailwind documentation we were able to integrate it within our react app. Now we can use tailwind in all of our react components.

I made a preliminary version of all of the shop methods. It is preliminary because I still need to integrate the authorization portion that my teammates are working on.

## May 16, 2023

Today I worked on:

- Setting up the project's base configuration files

- Learning how to manage merge requests with my teammates

- Creating an endpoint for creating shops

- Creating an endpoint for creating users
  (pair programming)

We followed the suggested steps to create a postgres database using our docker-compose file, set up shared folders such as queries and routers, and wrote the pool.py file for everyone to use in out fast api folder.

Following the configuration files setup, we went through the steps of validating, and accepting a merge request. Finally every team member made a pull request and we debugged problems. Now everyone's docker run the base project without any problems.

I wrote the api endpoint for creating a shop. It allows me to make a new shop. It has basic error handling which I will need to go back to and fix.

Sina, Christina and I Went through the steps to create an Endpoint in Fastapi. We created the create users endpoint which will allows us to create a user. We still need to set up Auth but it is a good start.
