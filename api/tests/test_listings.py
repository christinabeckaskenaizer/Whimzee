from fastapi.testclient import TestClient
from main import app
from queries.listings import ListingRepository

# from queries.listings import ListingRepository


client = TestClient(app)


class EmptyListingQueries:
    def get_all(self):
        return []


class CreateListingQueries:
    def create(self, listing):
        result = {
            "id": 1,
            "shop_id": 1,
            "name": "string",
            "quantity": 1,
            "quantity_sold": 0,
            "description": "string",
            "price": 1,
            "new": True,
            "picture": "string",
            "category": 1,
        }
        result.update(listing)
        return result


def test_get_all_listings():
    # arrange
    app.dependency_overrides[ListingRepository] = EmptyListingQueries

    response = client.get("/listings")
    # act
    app.dependency_overrides = {}
    # assert
    assert response.status_code == 200
    assert response.json() == []


def test_create_listing():
    # arrange
    app.dependency_overrides[ListingRepository] = CreateListingQueries
    # act
    json = {
        "shop_id": 1,
        "name": "string",
        "quantity": 1,
        "description": "string",
        "price": 1,
        "new": True,
        "picture": "string",
        "category": 1,
    }

    expected = {
        "id": 1,
        "shop_id": 1,
        "name": "string",
        "quantity": 1,
        "quantity_sold": 0,
        "description": "string",
        "price": 1,
        "new": True,
        "picture": "string",
        "category": 1,
    }

    response = client.post("/listings", json=json)
    app.dependency_overrides = {}
    # assert
    assert response.status_code == 200
    assert response.json() == expected
