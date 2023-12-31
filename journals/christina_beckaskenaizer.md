## June 8, 2023

    - Did a lot with the wish list. Users can now add an item to their wish list by clicking the heart button
    - If an item is in the user's wish list, the heart on the card will remain filled in.
    - Spent a lot of the day cleaning up code

## June 7, 2023

    - Added a "remove from wish list" button that refreshes the state of the wish list to reflect the changes (This took a lot of time, I had a bug unfortunately that I did not see for a long time)
    - Added some styling to the card. Made a transition effect on the heart button.

## June 6, 2023

    - Started working on wish list backend. Set up my wish list queries as well as my wish list routers. Showed my work to my teammates. Will create merge request tomorrow.

## June 5, 2023

    - Spent most of the day deploying our backend, all to find out we had a lil typo!

## June 2, 2023

- Spent a lot of time trying to deploy
- Updated state of listings after one has been created

## June 1, 2023

Today I worked on:

- Updating state upon delete
- Deploying our project (couldn't get it done btw)
- Cleaned up over 100 lines of linting errors

Okay so bad news. I THOUGHT I fixed the state of the listings upon delete yesterday. But as I was excitedly demoing my progress to my teammates, we found a bug where the listings updated, but once I left the page and came back, the deleted listing appeared again. I spent all morning trying to figure out the issue and eventually got it. It was today that we realized we should have used Redux!
Spent the afternoon attempting to deploy our app. Unfortunately, we didn't get very far but we intend to finish tomorrow!
We had what I estimate to be 500 linting errors that we combed through and fixed!

## May 31, 20232

Today I worked on:

- Spent the whole day working on deleting a listing on the frontend.

Getting the functionality of deleting an item on the frontend took me about 45 minutes, BUT updating the state of the listings upon deleting a listing took me the whole day!! I was hitting the point of just using window.location.reload LOL! But I was able to push past my frustration and finally get the state to update!

## May 30, 2023

Today I worked on:

- Working on another search function with Sina. Had some trouble. D:
- Finished stylizing my create a listing form as well as passing in the proper shop_id for the listing creation. Had some trouble with props, but Santi helped me sort it out.
- Planned out components I need to make that should get me through the rest of the week.

## May 26, 2023

Today (and over the weekend) I worked on:

- Search by category functionality with Sina! (Got it working woo)
- Create a listing form

Creating a listing was great for me. It took me a while, but I got it to work!! I always had trouble with POST requests, but to be able to take my time and understand what was going on was an awesome moment for me. Also, I used Headless UI to create a pop up modal form. Understanding post requests as well as working with a new library was very rewarding.

## May 25, 2023

Today I worked on:

- Added the name of the store to the detail page. (Before it was just an ID.)
- Made the store name clickable, it will now redirect the user to the appropriate store page.
- added all listings to the landing page. These will be seen only when the user scrolls.
- intended to work on making the cards clickable but I will wait for tomroow when my partner merges a vital part that I need.

## May 24, 2023

Today I worked on:

- I created the details page for an individual listing.
- Used tailwind classes to stylize the page
- Fetched both store data and listing data.

I mostly worked on stylizing the listing detail page. My "Aha" moment of the day is a little silly and LONG overdue, but I finally got used to using console logs to find out where my problems lie. I solved SO many issues today, and it was as simple as console logging!!! This project is clearing up a lot of confusion that I had previously.

## May 23, 2023

Today I worked on:

- Worked solely on the front end today. I was able to successfully pull data from our API and display all listings on the front end.
- Using tailwind, I created listing cards. Most of the day was taken up by styling these cards. Upon resizing the screen, the cards would become misshapen and the pictures would not resize with the cards. I was also able to fix that issue, even though it took me until about 9:30 pm.
- I made a resuable card component, for all future uses of the card.

## May 22, 2023

Today I worked on:

- Update a Listing endpoint
- Discussed with Santi the next steps that I will take for the frontend

That's pretty much all I completed! I spent about 5 hours working on this single endpoint and I was going a little crazy. Every time I fixed one error, another would get in my way! Maybe I should have asked for help, but I'm feeling heavily invested in the listings endpoints so I wanted to see if I could get a successful result without any help. Lo and behold, I got it and I learned a lot! Once again, db.fetchone() was my issue!

## May 19, 2023

Below is what I worked on on Friday plus the weekend!

What I completed:

- Delete a Listing endpoint
- Get all Listings endpoint
- Get one Listing endpoint

These were all done with ease for the most part! I think this is where I really started to feel familiar with fastAPI. Instead of relying on Curtis' videos, I attempted to work on these solo to see how far I could get. I am especially loving working with the database. The documentation for postgres is intuitive and fun to work with.

## May 18, 2023

Today I worked on:

- Wrapping up the last of the authentication with Sina and Santi (I was mostly in the backseat for this, observing how it works. Santi was very helpful)
- Finshing the create a listing endpoint. I have to admit this took me a lot longer than I thought it would, and I felt like I was holding my team back from moving forward, but I learned a lot during it.

I figured out how to return a default value in my response models. Last night, when I thought about it, I thought it would be easy, but it was a lot more difficult than I thought.

<!-- tup = db.fetchone()
                    id=tup[0]
                    quantity_sold=tup[1]

                    old_data = listing.dict()

                    return ListingOut(id=id, quantity_sold=quantity_sold, **old_data) -->

The couple lines above really threw me in for a loop. I was forgetting to return certain elements (lol oops), and also had to learn about the tuple that was being pulled from the database. In the videos, Curtis was mentioning the tuple that was being returned that contained the ID in the response body. So I knew that I had to put my quantity_sold in the tuple so it would be automatically populated with a default of 0 in my response body along with the ID. I felt very proud when I got the results I wanted. I hope this makes sense.

## May 17, 2023

Today I worked on:

- Starting pair-programming the authentication with Sina

- Creating the POST and GET ALL methods for our categories API endpoints.

- A smidgen of the listings endpoints. (I have details I want to work out with my group tomorrow AKA how the quantity_sold column will work.)

Sina and I began work on the account authentication. We didn't finish it, but we think we're close to finishing. We will see tomorrow!

I started working on my individual portion of the project. It's been interesting using FastAPI. I'm slowly but surely getting familiar with how to use it.

## May 16, 2023

Today I worked on:

- Watching and assisting Santi in file config. He shared his screen, and we all gave input on how to configure our files and what not.

- Discussed how we want to handle our merge requests.

- End of day: trio-programmed our user endpoints. Got a good understanding of how FastAPI works wiith Sina and Santi.

Today was tons of following instructions on Learn. We feel we are making good progress on our project so far. Our planning phase was highly detailed so we feel like we are more than ready to get coding! I think I will begin my portion of coding tomorrow. Today was mostly pair programming.
