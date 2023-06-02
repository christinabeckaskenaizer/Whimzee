from fastapi.testclient import TestClient
from main import app
from queries.categories import CategoryRepository

client = TestClient(app)

class EmptyCategoryQueries:
    def get_all(self):
        return []
class CreateCategoryQueries:
    def create(self, name):
        result = {
            "id": 8,
            "name": "string"
        }
        return result

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
    app.dependency_overrides[CategoryRepository] = CreateCategoryQueries
