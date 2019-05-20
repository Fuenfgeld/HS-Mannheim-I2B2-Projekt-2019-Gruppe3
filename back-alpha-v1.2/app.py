from navigation_data import NavigationData
from flask import Flask, jsonify, request
from crossdomain import crossdomain

app = Flask(__name__)


@app.route('/')
@crossdomain(origin='*')
def index():
    return jsonify({"Hello": "World"}), 200


@app.route("/api/navigation/data", methods=['GET', 'POST'])
@crossdomain(origin='*')
def datatrans():
    navigation_tree = NavigationData()
    if request.method == 'POST':
        print("hi")
    else:
        json_data = jsonify(navigation_tree.into_dict())
        return json_data


if __name__ == '__main__':
    app.run(debug=True)
