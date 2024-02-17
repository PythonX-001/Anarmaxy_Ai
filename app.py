from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return  '<h1>hi bro</h1>'

if __name__ == '__main__':
    app.run(debug=True)
