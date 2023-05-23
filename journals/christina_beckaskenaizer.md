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
