from fastapi.testclient import TestClient
from main import app
from queries.users import UserRepository
from queries.accounts import AccountQueries

client = TestClient(app)


class EmptyUserRepo:

    def get_one(self, email):
        return True


class EmptyAccountsRepo:

    def get_ids_for_user(self, user_id):
        return {
            "id": user_id,
            "shop_id": 1,
            "cart_id": 1
        }


def test_user_exists():
    # ARRANGE
    app.dependency_overrides[UserRepository] = EmptyUserRepo
    response = client.get("/users/santi@example.com")
    # ACT
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 200
    # flake 8 throws errors when equal to True
    assert response.json() == 1


def test_get_user_credentials():
    # ARRANGE
    app.dependency_overrides[AccountQueries] = EmptyAccountsRepo
    response = client.get("/user/1")
    expected = {
        "id": 1,
        "shop_id": 1,
        "cart_id": 1
    }
    # ACT
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 200
    assert response.json() == expected
