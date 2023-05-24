## May 22, 2023

Today I worked on:

- Endpoint replanning and project organization

- pair programming on fastApi

- Attempted Authentication on the front end

- set up initial account page components in react.

Today the team discussed restructuring a lot of the endpoints. They way we had the written did not cover all of the information we needed them too.

Me and Preeti went over the files within a fastApi project and how to structure a create request.

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

I finished all of the shop endpoints to how we have planned SO FAR. Users can now only create, update or delete a shop if they are logged in.

## May 17, 2023

Today I worked on:

- Setting up tailwind configuration

- Creating the get_all, update, delete, and put methods for the shop api

Following the Tailwind documentation we were able to integrate it within our react app. Now we can use tailwind in all of our react components.

I made a preliminary version of all of the shop methods. It is preliminary because I still need to integrate the authorization portion that my teammates are working on.

## May 16, 2023

Today I worked on:

- Setting up the projects base configuration files

- Learning how to manage merge requests with my teammates

- Creating an endpoint for creating shops

- Creating an endpoint for creating users
  (pair programming)

We followed the suggested steps to create a postgres database using our docker-compose file, set up shared folders such as queries and routers, and wrote the pool.py file for everyone to use in out fast api folder.

Following the configuration files setup, we went through the steps of validating, and accepting a merge request. Finally every team member made a pull request and we debugged problems. Now everyone's docker run the base project without any problems.

I wrote the api endpoint for creating a shop. It allows me to make a new shop. It has basic error handling which I will need to go back to and fix.

Sina, Christina and I Went through the steps to create an Endpoint in Fastapi. We created the create users endpoint which will allows us to create a user. We still need to set up Auth but it is a good start.
