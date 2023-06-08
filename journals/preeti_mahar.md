## June 1, 2023

- Working on the deployment together with my team - Christina, Santi and Sina. One person shared the screen and we followed the steps as explained by Miss. Rosheen for CI/CD.

- We encountered blockers during deployment, the app stopped running which were resolved by our staff.(by changing the ports to 8000:8000 instead of 8000:80 in the docker-compose.yaml file for the ports under the fast-api).

- Working on getting the back-end ready for cart by resolving the code to get end-points working. Dropping the extra column for listing_id and quantity as it was not required after clarifying from our instructor James . Now the cart displays the cart_id which is created according to the user_id. Removing the 003_alter_cart.py file after making the changes in the cart table and putting the cart_listings table separately in the 002_my_table.py.

- Pushing the changes into the branch 'origin/10-add-a-listing-to-the-cart' and resolving the merge confllicts.

## May 31, 2023

- Working on the front-end for CreateCart as CartView.js.

- Writing the getCart() function and calling consecutive useEffect and useState methods to describe the working model.

## May 30, 2023

- Altering the table cart by 003_alter_cart.py according to the project requirements and creating another table cart_listings in there.

- Writing the queries to get_all_cart stuff and in the routers to get_user_cart for the end-points display.

- Re-buiding the Docker containers and checking the end-points for success.

## May 26, 2023

- Working on the front-end UI/UX for CreateCart as CartView.js in the src/account-components folder.

## May 24, 2023

- Closing create a cart issue and its respective branch with the help of Sina . Deleting the '16-create-a-cart-branch' after merging it into the main.

- Added listings variable to my Cart with the help of Santi.

- Re-Running docker containers and creating database so as to update and test endpoints.

- Git add and commit all endpoints and journals to 10-add-a-listing-to-the-cart.

- Git merge main.

## May 22, 2023

- Added Endpoint -> Cart Update, Cart Delete.

- Re-Running docker containers and creating database.

- Git add and commit all endpoints and journals to 16-create-a-cart branch.

- Git merge main

## May 18, 2023

- Added Endpoint -> Create Cart, Get Cart.

- Running docker containers.

## May 17, 2023

- Connected Database to Beekeeper.

- Running docker containers.

## May 16, 2023

- Setting up the projects base configuration files.

- Learning how to manage merge requests with my teammates.
