from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os
#Router imports
from routers import(
    users,
    shop,
    accounts,
    categories,
    listings,
    review,
    orders
)

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#routers from our routers folder
app.include_router(users.router)
app.include_router(shop.router)
app.include_router(categories.router)
app.include_router(listings.router)
app.include_router(orders.router)
app.include_router(review.router)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }
