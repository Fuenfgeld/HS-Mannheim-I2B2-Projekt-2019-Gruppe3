from navigation_data import NavigationData
from flask import Flask, jsonify, request
from DB_Connector import DBConnector
from flask_cors import CORS

# Verbindung zur Datenbank aufbauen
DBConnector()

# Navitgation Baum erstellen
navigation_tree = NavigationData()

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return jsonify({"Hello": "World"}), 200


@app.route("/api/navigation/data", methods=['GET'])
def datatrans():
        json_data = jsonify(navigation_tree.into_dict())
        return json_data


@app.route("/api/selection/data", methods=['POST'])
def datachange():
    data = request.get_json()
    selection = data['selection']
    operator = [data['operator']]
    # TODO aklt. hier alle APIs

    return jsonify({"State": "Success"})


if __name__ == '__main__':
    app.run(debug=True)
