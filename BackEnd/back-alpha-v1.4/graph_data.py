from sql_templates import all_patient, gender_equal_female, gender_equal_male, age_distribution
from db_connector import DBConnector


class GraphDataPatientNumber:

    def __init__(self):
        self.data = self.get_all_patient()

    def update(self, data_change=None):
        self.data = self.get_all_patient(data_change)

    def get_all_patient(self, data_change=None):
        db = DBConnector()
        data = db.query(all_patient(data_change))
        result = data[0][0]
        return result

    def get_gender_distribution(self, data_change=None):
        db = DBConnector()
        data_male = db.query(gender_equal_male(data_change))
        data_female = db.query(gender_equal_female(data_change))
        data = [data_male[0][0], data_female[0][0]]
        lables = ["Männlich", "Weiblich"]
        result = {"lable": lables, "data": data}

        return result

    def get_age_distribution(self, data_change=None):
        db = DBConnector()
        age_data = []
        for i in range(0, 90, 10):
            sql_query = age_distribution(i, i + 10, data_change)
            data = db.query(sql_query)[0][0]
            age_data.append(data)

        labels = ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-80", "90-100"]
        result = {"lable": labels, "data": age_data}

        return result


if __name__ == '__main__':
    db = DBConnector()
    myGraph = GraphDataPatientNumber()
    c_dimcode = r'\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv\%'
    data_change = {'selection': [['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode],
                                 ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode]],
                   'operator': ['OR', 'AND']}
    print(myGraph.get_all_patient(data_change))
