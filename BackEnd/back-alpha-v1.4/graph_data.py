from sql_templates import all_patient, gender_equal_female, gender_equal_male, age_distribution, diagnoses_count
from db_connector import DBConnector


class GraphDataPatientNumber:

    def __init__(self):
        self.data = self.get_all_patient()

    def update(self, data_change):
        self.data = self.get_all_patient(data_change)

    def get_all_patient(self, data_change=None):
        db = DBConnector()
        data = db.query(all_patient(data_change))
        lables = "Patient found"
        patient_count_data = data[0][0]
        result = {'lable': lables, 'data': patient_count_data}
        return result


class GraphDataGenderDistribution:

    def __init__(self):
        self.data = self.get_gender_distribution()

    def update(self, data_change):
        self.data = self.get_gender_distribution(data_change)

    def get_gender_distribution(self, data_change=None):
        db = DBConnector()
        data_male = db.query(gender_equal_male(data_change))
        data_female = db.query(gender_equal_female(data_change))
        data = [data_male[0][0], data_female[0][0]]
        lables = ["Male", "Female"]
        result = {"lable": lables, "data": data}

        return result


class GraphDataGenderDistribution:

    def __init__(self):
        self.data = self.get_age_distribution()

    def update(self, data_change):
        self.data = self.get_age_distribution(data_change)

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


class GraphDataDiagnoseCount:

    def __init__(self):
        self.data = self.get_all_diagnose()

    def update(self, data_change):
        self.data = self.get_all_diagnose(data_change)

    def get_all_diagnose(self, data_change=None):
        db = DBConnector()
        data = db.query(diagnoses_count(data_change))
        lables = []
        data_count = []
        for element in data:
            lables.append(element[0])
            data_count.append(element[1])
        result = {"lable": lables, "data": data_count}

        return result


if __name__ == '__main__':
    db = DBConnector()
    myGraph = GraphDataPatientNumber()
    myGraph2 = GraphDataDiagnoseCount()
    c_dimcode = r'\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv\%'
    c_dimcode2 = r'\Diagnoses\(I00-I99) Dise~3w8h\%'
    data_change = {'selection': [['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode],
                                 ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode2]],
                   'operator': ['AND', 'OR']}
    myGraph2.update(data_change)
    print(myGraph2.data)
