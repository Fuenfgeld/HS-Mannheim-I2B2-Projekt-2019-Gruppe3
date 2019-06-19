from navigation_data import NavigationData
from observer import Observer
from graph_data import GraphDataDiagnoseGenderCount, GraphDataGenderDistribution, GraphDataAgeDistribution
from db_connector import DBConnector
from flask import Flask, jsonify, request
from flask_cors import CORS

# connect to i2b2 Database
DBConnector()
# init observer
myObserver = Observer()
# build navigation tree
navigation = NavigationData("icd10_icd9")
# build the graphs
diagnose_count = GraphDataDiagnoseGenderCount()
gender_distribution = GraphDataGenderDistribution()
age_distribution = GraphDataAgeDistribution()
# register all components
myObserver.register(navigation)
myObserver.register(gender_distribution)
myObserver.register(diagnose_count)
myObserver.register(age_distribution)
# TODO GRapdata erstelle und GRapehn

app = Flask(__name__)
CORS(app)
selection_all = {"names": [], "selection": [], "operator": []}


@app.route('/')
def index():
    return jsonify({"Hello": "World"}), 200


@app.route("/api/navigation/data", methods=['GET'])
def data_trans():
    json_data = jsonify(navigation.into_dict())
    return json_data


@app.route("/api/selection_name/data", methods=['GET'])
def get_selection_names():
    json_data = jsonify(selection_all)
    return json_data


@app.route("/api/selection/data", methods=['POST'])
def data_selection():
    data_change = request.get_json()
    print(data_change)
    selection_all["names"] = data_change["selection_name"]
    selection_all["selection"] = data_change["selection"]
    selection_all["operator"] = data_change["operator"]
    myObserver.dispatch(data_change)

    return jsonify({"State": "Success"}), 200


@app.route("/api/gender_distribution/data", methods=['GET'])
def get_data1():
    json_data = jsonify(gender_distribution.data)
    return json_data


@app.route("/api/diagnose_count/data", methods=['GET'])
def get_data2():
    json_data = jsonify(diagnose_count.data)
    return json_data


@app.route("/api/age_distribution/data", methods=['GET'])
def get_data3():
    json_data = jsonify(age_distribution.data)
    return json_data


@app.route("/api/graph3/data", methods=['GET'])
def get_data4():
    pass


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
