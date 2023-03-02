from flask import Flask, request, jsonify
import sqlite3
from contextlib import closing

from consts import *

def jsonify_rows(rows):
    """
    jsonifies the outputs from sqlite table
    """
    return [] if not rows else [dict(result) for result in rows]

def query_db(query, params=None, database_url=DATABASE_URL):
    """
    queries database with params
    """
    results = []
    with sqlite3.connect(database_url, isolation_level=None,
                        uri=True) as connection:
        with closing(connection.cursor()) as cursor:
            cursor.row_factory = sqlite3.Row
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            results = cursor.fetchall()
    return results