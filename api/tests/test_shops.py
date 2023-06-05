from fastapi.testclient import TestClient
from main import app
from queries.shop import ShopRepository
from authenticator import authenticator

client = TestClient(app)


class EmptyShopRepo:

    def get_all(self):
        return []

    def get_one(self, id):
        return {
            "id": id,
            "user_id": 1,
            "name": "string",
            "profile_picture": "string",
            "email": "string",
            "description": "string"
        }

    def create(self, shop, user_id):
        base = {
            "id": 1,
            "user_id": user_id,
            "name": shop.name,
            "profile_picture": shop.profile_picture,
            "email": shop.email,
            "description": shop.description
        }
        return base


def test_get_all_shops():
    # ARRANGE
    app.dependency_overrides[ShopRepository] = EmptyShopRepo
    response = client.get("/shops")
    # ACT
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 200
    assert response.json() == []


def test_get_one_shop():
    # ARRANGE
    app.dependency_overrides[ShopRepository] = EmptyShopRepo
    response = client.get("/shops/1")
    expected = {
        "id": 1,
        "user_id": 1,
        "name": "string",
        "profile_picture": "string",
        "email": "string",
        "description": "string"
    }
    # ACT
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 200
    assert response.json() == expected


def test_create_shop():
    # ARRANGE
    app.dependency_overrides[ShopRepository] = EmptyShopRepo
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = lambda: {
        'id': '1',
    }
    json = {
        "name": "string",
        "profile_picture": "string",
        "email": "string",
        "description": "string"
    }
    expected = {
        "id": 1,
        "user_id": 1,
        "name": "string",
        "profile_picture": "string",
        "email": "string",
        "description": "string"
    }
    response = client.post("/shops", json=json)
    # ACT
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 200
    assert response.json() == expected
