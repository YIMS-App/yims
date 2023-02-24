# import pytest

# from flask_server import create_app, db

# # for integration testing 
# @pytest.fixture
# def app():
#     app = create_app()

#     with app.app_context():
#         db.create_all()

#     yield app

#     with app.app_context():
#         db.drop_all()

# @pytest.fixture(app)
# def client(app):
#     return app.test_client()