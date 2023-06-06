from fastapi.testclient import TestClient
from main import app

# from queries.listings import ListingRepository


client = TestClient(app)


def test_all_listings():
    assert 1 == 1
