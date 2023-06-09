from fastapi.testclient import TestClient
from fastapi import APIRouter
from main import app
from queries.cart import CartRepository


router = APIRouter()


client = TestClient(app)


def test_function():
    assert 1 == 1


# class EmptyCartQueries:
#     def get_cart(self, user_id):
#         return []


class CreateCartQueries:
    def create(self, user_id):
        result = {"id": 1, "user_id": 1}
        return result


def test_cart_exists():
    # ARRANGE
    app.dependency_overrides[CartRepository] = CreateCartQueries
    # response = client.get("/cart/{cart_id}")
    json = {"user_id": 1}
    expected = {"id": 1, "user_id": 1}
    response = client.post("/cart", json=json)
    # ACT
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 200
    # flake 8 throws errors when equal to True
    assert response.json() == expected


# def test_create_cart():
#     # Arrange
#     app.dependency_overrides[CartRepository] = CreateCartQueries
#     # Act
#     json = {"user_id": 1}
#     expected = {"id": 8, "user_id": 1}
#     response = client.post("/cart", json=json)
#     app.dependency_overrides = {}
#     # Assert
#     assert response.status_code == 200
#     assert response.json() == expected
