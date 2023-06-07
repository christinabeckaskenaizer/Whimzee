# Whimzee

## Project Summary:
Our project is a user-friendly shop website that facilitates the buying and selling of new and pre-owned items. The platform offers a range of features to enhance the user experience, including user registration, login, and logout functionalities. Once logged in, users have the ability to create their own shop and manage their listings.
\
\
The key features of the website include:
* User Registration and Authentication: Users can sign up with their personal details and create an account. They can subsequently log in to access the full range of functionalities offered by the website. Logging out allows users to securely end their session.
* Shop Creation: Each registered user has the option to open their own shop. This feature enables users to showcase their products and manage their inventory in a personalized space.
* Listing Creation: Once a user has created a shop, they can create listings for the items they want to sell. Users can provide comprehensive details about the products, including images, descriptions, and pricing.
* Reviews and Ratings: Users have the ability to leave reviews for items they have purchased or interacted with. This feature enables an open and transparent feedback system, allowing users to make informed decisions when browsing listings.
* Landing Page: The landing page serves as a central hub for all the listings available on the website. Users can explore a wide range of items across different categories, allowing for easy browsing and discovery.
* Navigation Bar: The navigation bar offers convenient search functionalities. Users can search for specific items by selecting a category or using the search by name function. This feature streamlines the process of finding desired products within the website's extensive inventory.
<br>
Overall, our shop website provides a user-friendly interface for buying and selling items. The combination of user management, shop creation, listing creation, reviews, and efficient search functionalities ensures a seamless experience for users as they explore and interact with the platform.
<br>

**Team**

* Christina Beckaskenaizer \
Backend: Categories, Listings \
Frontend: Listings, Wishlist \
Unit test: \
Backend Auth

* Sina Klughardt \
Backend Endpoints: Users/Accounts, Orders \
Frontend: Navbar(Searchbar, Navigation, Logos), Reviews, Landing Page \
Unit Test: test_category(get and create) \
Backend Auth
* Santiago Bothe \
Backend: Shops, Reviews, Cart listings \
Frontend: Shops, Account Page \
Unit Test: \
Frontend Auth
* Preeti Mahar \
Backend: Cart \
Frontend: \
Unit Test:

## How to run this project
Live link: https://whimz.gitlab.io/module3-project-gamma/ \
Here are step by step instructions to run this project:
1. clone this Repository to the local machine \
Run the following commands in the project directory:
2. docker volume create postgres-data
2. docker-compose build
3. docker-compose up
(If on mac, safely ignore the warning about an environment variable)
4. Check if all containers are running
5. In your browser go to http://localhost:3000/

## Project Diagram

Diagram of the backend and how every table interacts with each other

![Alt text](excalidraw.png)

## API Documentation

### User/Account
**Endpoint: Create Account** \
Method: POST \
Request URL: http://localhost:8000/api/accounts \
Description: Create a new account/user \
What is necessary: request body with fields: "username", "email" and "password"
<p>
<details>
<summary>Request body</summary>
![Alt text](screenshots/create_user_request.png)
</details>
</p>
<p>
<details>
<summary>Response</summary>
![Alt text](screenshots/create_user_response.png)
</details>
</p>
<br>

**Endpoint: Get Ids For User** \
Method: GET \
Request URL: http://localhost:8000/user/{user_id} \
Description: Get user_id, shop_id and cart_id for a user \
What is necessary: user_id in Request Url, no request body
<p>
<details>
<summary>Response</summary>
![Alt text](screenshots/get_user_ids_response.png)
</details>
</p>
<br>

**Endpoint: Delete a user** \
Method: DELETE \
Request URL: http://localhost:8000/users/{user_id} \
Description: Delete a user and return true if user got deleted \
What is necessary: user_id in Request Url, no request body
<p>
<details>
<summary>Response</summary>
![Alt text](screenshots/delete_user_response.png)
</details>
</p>
<br>

**Endpoint: Get a user** \
Method: GET \
Request URL: http://localhost:8000/users/{email} \
Description: See if a user exist necessary for frontend, true if user exists \
What is necessary: Email in Request Url, no request body
<p>
<details>
<summary>Response</summary>
![Alt text](screenshots/get_user_by_email_response.png)
</details>
</p>
<br>

### Shop

### Listing

### Cart

### Order
**Endpoint: Get all user orders** \
Method: GET \
Request URL: http://localhost:8000/orders \
Description: Get all orders of the currently logged in user \
What is necessary: No Request body, just the Url
<p>
<details>
<summary>Response</summary>
![Alt text](screenshots/get_all_orders_response.png)
</details>
</p>
<br>

**Endpoint: Create an order** \
Method: POST \
Request URL: http://localhost:8000/orders \
Description: Create a new order \
What is necessary: request body with fields: "shop_id", "buyer_first_name", "buyer_last_name", "quantity", "listing", "address", "price"
<p>
<details>
<summary>Request body</summary>
![Alt text](screenshots/create_order_request.png)
</details>
</p>
<p>
<details>
<summary>Response</summary>
![Alt text](screenshots/create_order_response.png)
</details>
</p>
<br>

**Endpoint: Get all shop orders** \
Method: GET \
Request URL: http://localhost:8000/{shop_id}/orders \
Description: Get all orders of a shop \
What is necessary: No Request body necessary, just the Url with shop_id
<p>
<details>
<summary>Response</summary>
![Alt text](screenshots/get_shop_orders_response.png)
</details>
</p>
<br>

**Endpoint: Get one order** \
Method: GET \
Request URL: http://localhost:8000/orders/{order_id} \
Description: Get one orders by order_id \
What is necessary: No Request body necessary, just the Url with order_id
<p>
<details>
<summary>Response</summary>
![Alt text](screenshots/get_one_order_response.png)
</details>
</p>
<br>

**Endpoint: Update Order** \
Method: PUT \
Request URL: http://localhost:8000/orders/{order_id} \
Description: Update status of order to true when order got processed \
What is necessary: request body with field: "status"
<p>
<details>
<summary>Request body</summary>
![Alt text](screenshots/update_order_request.png)
</details>
</p>
<p>
<details>
<summary>Response</summary>
![Alt text](screenshots/update_order_response.png)
</details>
</p>
<br>

### Reviews

### Categories
**Endpoint: Get all categories** \
Method: GET \
Request URL: http://localhost:8000/categories \
Description: Get all existing categories \
What is necessary: No request body, just Request Url
<p>
<details>
<summary>Response</summary>
![Alt text](screenshots/get_categories_response.png)
</details>
</p>
<br>

**Endpoint: Create category** \
Method: POST \
Request URL: http://localhost:8000/categories \
Description: Create a new category \
What is necessary: Request Body with a "name" field and Request Url
<p>
<details>
<summary>Request body</summary>
![Alt text](screenshots/create_category_request.png)
</details>
</p>
<p>
<details>
<summary>Response</summary>
![Alt text](screenshots/create_category_response.png)
</details>
</p>
