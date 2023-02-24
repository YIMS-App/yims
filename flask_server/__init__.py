from flask import Flask
from .extensions import db
from .testapp import api

def create_app(database_uri="./testtable.sqlite"):
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = database_uri

    db.init_app(app)

    app.register_blueprint(api)

    return app