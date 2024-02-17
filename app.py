from flask import Flask, request, jsonify

app = Flask(__name__)
@app.route('/')
def index():
    return  '<h1>hi bro</h1>'

if __name__ == '__main__':
    app.run(debug=True)
