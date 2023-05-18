from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
#Router imports
from routers import users
from routers import shop, cart

app = FastAPI()

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
app.include_router(cart.router)



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
