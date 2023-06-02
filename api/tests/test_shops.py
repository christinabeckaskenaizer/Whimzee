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

    def create(shop, user_id):
        result = {
            "id": 1
        }
        result.update(shop)
        result.update(user_id)
        return result

# class EmptyAccount:

#     def try_get_current_account_data():
#         return {
#             "access_token": "string",
#             "token_type": "Bearer",
#             "account": {
#                 "id": 1,
#                 "username": "string",
#                 "email": "string"
#             }
#         }

def EmptyAccount():
    return {
        'id': '12',
        'username': 'string22',
        'email': 'string222'
    }


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
    app.dependency_overrides[
        ShopRepository, authenticator.try_get_current_account_data
    ] = EmptyShopRepo, EmptyAccount
    json = {
        "name": "string",
        "profile_picture": "string",
        "email": "string",
        "description": "string"
    }
    response = client.post("/shops", json=json)
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
