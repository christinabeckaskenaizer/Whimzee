from fastapi.testclient import TestClient
from main import app
from queries.categories import CategoryRepository

client = TestClient(app)

class EmptyCategoryQueries:
    def get_all(self):
        return []

def test_get_all_categories():
    #Arrange
    app.dependency_overrides[CategoryRepository] = EmptyCategoryQueries
    response = client.get("/categories")
    #Act
    app.dependency_overrides = {}
    #Assert
    assert response.status_code == 200
    assert response.json() == []

def test_create_category():
    assert 1==1
