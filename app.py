from flask import Flask, request, jsonify
import json
import requests
import os
from bs4 import BeautifulSoup

app = Flask(__name__)
@app.route('/')
def index():
    return  '<h1>hi bro</h1>'

if __name__ == '__main__':
    app.run(debug=True)