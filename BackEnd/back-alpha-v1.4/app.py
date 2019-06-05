from navigation_data import NavigationData
from observer import Observer
from db_connector import DBConnector
from flask import Flask, jsonify, request
from flask_cors import CORS

# connect to i2b2 Database
DBConnector()
# init observer
myObserver = Observer()
# build navigation tree
navigation = NavigationData("icd10_icd9")

# register all components
myObserver.register(navigation)
# TODO GRapdata erstelle und GRapehn

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return jsonify({"Hello": "World"}), 200


@app.route("/api/navigation/data", methods=['GET'])
def data_trans():
    json_data = jsonify(navigation.into_dict())
    return json_data


@app.route("/api/selection/data", methods=['POST'])
def data_selection():
    data_change = request.get_json()
    print(data_change)
    myObserver.dispatch(data_change)

    return jsonify({"State": "Success"})


@app.route("/api/graph1/data", methods=['GET'])
def get_data1():
    json_data = jsonify(navigation.into_dict())
    return json_data


@app.route("/api/graph2/data", methods=['GET'])
def get_data2():
    pass


@app.route("/api/graph3/data", methods=['GET'])
def get_data3():
    pass


if __name__ == '__main__':
    app.run(host='0.0.0.0')
