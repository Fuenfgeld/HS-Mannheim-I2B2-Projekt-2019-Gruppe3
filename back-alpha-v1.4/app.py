from navigation_data import NavigationData
from observer import Observer
from graph_data import GraphDataDiagnoseGenderCount, GraphDataGenderDistribution, GraphDataAgeDistribution, \
    GraphDataMedicationGenderCount, GraphDataProcedureGenderCount,GraphDataVitalStaturCount
from db_connector import DBConnector
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

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
medication_count = GraphDataMedicationGenderCount()
procedure_count = GraphDataProcedureGenderCount()
vital_status = GraphDataVitalStaturCount()
# register all components
myObserver.register(navigation)
myObserver.register(gender_distribution)
myObserver.register(diagnose_count)
myObserver.register(age_distribution)
myObserver.register(medication_count)
myObserver.register(procedure_count)
myObserver.register(vital_status)
# TODO GRapdata erstelle und GRapehn

app = Flask(__name__)
CORS(app)
selection_all = {"names": [], "selection": [], "operator": []}


@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/')
@cross_origin()
def index():
    return jsonify({"Hello": "World"}), 200


@app.route("/api/navigation/data", methods=['GET'])
@cross_origin()
def data_trans():
    json_data = jsonify(navigation.into_dict())
    return json_data


@app.route("/api/selection_name/data", methods=['GET'])
@cross_origin()
def get_selection_names():
    json_data = jsonify(selection_all)
    return json_data


@app.route("/api/selection/data", methods=['POST'])
@cross_origin()
def data_selection():
    data_change = request.get_json()
    print(data_change)
    selection_all["names"] = data_change["selection_name"]
    selection_all["selection"] = data_change["selection"]
    selection_all["operator"] = data_change["operator"]
    myObserver.dispatch(data_change)

    return jsonify({"State": "Success"}), 200


@app.route("/api/gender_distribution/data", methods=['GET'])
@cross_origin()
def get_data1_gender_dist():
    json_data = jsonify(gender_distribution.data)
    return json_data


@app.route("/api/diagnose_count/data", methods=['GET'])
@cross_origin()
def get_data_dia():
    json_data = jsonify(diagnose_count.data)
    return json_data


@app.route("/api/medication_count/data", methods=['GET'])
@cross_origin()
def get_data_med():
    json_data = jsonify(medication_count.data)
    return json_data


@app.route("/api/procedure_count/data", methods=['GET'])
@cross_origin()
def get_data_prod():
    json_data = jsonify(procedure_count.data)
    return json_data


@app.route("/api/age_distribution/data", methods=['GET'])
@cross_origin()
def get_data_age_dist():
    json_data = jsonify(age_distribution.data)
    return json_data


@app.route("/api/vital_status/data", methods=['GET'])
@cross_origin()
def get_data4():
    json_data = jsonify(vital_status.data)
    return json_data


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
