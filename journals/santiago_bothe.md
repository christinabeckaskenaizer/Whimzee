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

## May 17, 2023

Today I worked on:

- Setting up tailwind configuration

- Creating the get_all, update, delete, and put methods for the shop api

Following the Tailwind documentation we were able to integrate it within our react app. Now we can use tailwind in all of our react components.

I made a preliminary version of all of the shop methods. It is preliminary because I still need to integrate the authorization portion that my teammates are working on.
