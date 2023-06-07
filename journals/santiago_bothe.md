## June 7, 2023

Today I worked on:

- wrote a sql query to get all of the cart_listings for a specific cart

- Implemented my previous hook to get the cart_listings on load

- pair programmed with Preeti to make an "add to cart button"

Today I realized we were missing the last sql query for the cart functionality. It was a join between the listings and cart. Now we can query for a list of all the cart_listings that belong to a specific cart.

I finally got to put the cart hook to work! It has been on our App.js file this whole time but now it uses the sql query to grab all of the cart_listings so a user has them as soon as they login, reload, or hit back.

I showed Preeti one way to implement a create button. We created a component called "AddToCart" and used it on christina's listing detail component. We are aiming to finish the cart functionality by today.

## June 6, 2023

Today I worked on:

- fixing connectivity errors between our front and back ends

- attempted to integrate Web-sockets

- debugged various errors with my teammates

- Pair programmed with Sina to make our Test-job pass the pipeline.

Today I patched up some cors errors we were getting by adding a base url to our browser router component (which we were missing) and fixing a typo on an -e tag in the Galvanize cloud command we originally passed.

I was unable to make the progress I hoped on web-sockets and have decided to leave them out as there is no longer enough time to do that and everything else I want to finish.

Me and Sina worked on making the pipeline tests pass. We added a variable to the .yml file which contains the secret key, and base url. This was able to satisfy the compiler. Finally our tests ran and passed.

## June 5, 2023

Today I worked on:

- deployment to the backend

- deployment to the front end

- eliminating front end linting errors

today we got our database running on Galvanize cloud. We worked on it together by following the notion. I shared my screen and my teammates pair programmed with me.

We followed the same procedure with the front end but unfortunately we ran out of time. We were able to get everything to show up correctly but for some reason our fast api was not able to connect to our database until the very end of the day. It was a typo.

I cleared all of the front end linting errors that were making the pipeline failed. I was able to make them all pass!

## June 2, 2023

Today I worked on:

- deployment with my team

- created various unit tests

- cleaned up a few front-end errors

Today we went through the steps to deploy but ran into many issues along the way. Most notably we were not able to process our requests due to a cloud server error.

created unit tests for getting all shops, getting a single shop, creating a shop, getting a user, and getting a users credentials.

I went through some of my front-end code and cleaned up some of the parts that were not behaving as I hoped. FOr example an endless spinner when a user is not logged in. now they will be redirected after 5 seconds.

## June 1, 2023

Today I worked on:

- Creating an intermediary cart_listing table to keep track of all of our listings

- worked with my team to get deployment ready

- cleaned up a million linting errors

Today I created a create and delete method for cart_listings so that someone can add items to the cart and delete items from the cart.

today we wanted to start on deployment! so we began getting all of the files ready. We were able to successfully login and get an access token

during our attempt at deployment we found we had an absolute TON of linting errors. Me and Christina went through each file and cleaned them all up.

## May 31, 2023

Today I worked on:

- handled cors errors when logging in with an unregistered user

- created a spinner to show loading screens

- updated the colors and styles on my components

Today we noticed the login and register functions where throwing cors errors when logging in with unregistered accounts and when signing up with previously registered accounts

Today I noticed that while our information is loading we had the word "loading" show up. I thought it would be nice to quickly make a spinner for us to use if we wanted to.

I made my buttons have the same styles so everything would look better together. Later this was further updated by Sina.

## May 30, 2023

Today I worked on:

- crated a component to show all active listings on a shop

- helped debug and write part of the search functionality dealing with categories and user input.

- modified my tables to provide a place for links to edit and delete listings from a user's shop

Today I created the component that will show all active listings including their name, lifetime units sold and total money made. This was made to replace the shop order history.

Christina, Sina, and I worked on adding search functionality to our site. We pair programmed on Sina's branch.

I wrapped up the tables on the user account shop page.

## May 26, 2023

Today I worked on:

- General code clean up

- Showing a user's purchase history

- modified the orders endpoint to also return listingOut objects

Today I went through my code and deleted print statements, console logs, and unnecessary comments from some of the pages I have written. This was really helpful to clear up room for printing new errors.

I created a component that takes a user Id and gets all of their past orders. I then pass these orders down and create listings for each one.

I was having difficulty getting the listing information from the order history. So I added the listing data for each order made.

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
