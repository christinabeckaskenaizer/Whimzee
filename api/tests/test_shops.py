from fastapi.testclient import TestClient
from main import app
from queries.shop import ShopRepository

client = TestClient(app)


class EmptyShopRepo:

    def get_all(self):
        return []


def test_get_all_shops():
    # ARRANGE
    app.dependency_overrides[ShopRepository] = EmptyShopRepo
    response = client.get("/shops")
    # ACT
    app.dependency_overrides = {}
    # ASSERT
    assert response.status_code == 200
    assert response.json() == []
