from sql_templates import all_patient, gender_equal_female, gender_equal_male, age_distribution, \
    diagnoses_gender_count, medications_gender_count, procedures_gender_count, vital_status
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


class GraphDataAgeDistribution:

    def __init__(self):
        self.data = self.get_age_distribution()

    def update(self, data_change):
        self.data = self.get_age_distribution(data_change)

    def get_age_distribution(self, data_change=None):
        db = DBConnector()
        m_data = list()
        f_data = list()
        lables = list()
        for i in range(0, 90, 10):
            sql_query = age_distribution(i, i + 10, 'F', data_change)
            f_data.append(db.query(sql_query)[0][0])
            sql_query = age_distribution(i, i + 10, 'M', data_change)
            m_data.append(db.query(sql_query)[0][0])
            lables.append(str(i) + "-" + str(i + 10))

        result = {"label": lables, "M": m_data, "F": f_data}

        return result


class GraphDataVitalStaturCount:

    def __init__(self):
        self.data = self.get_vital_status()

    def update(self, data_change):
        self.data = self.get_vital_status(data_change)

    def get_vital_status(self, data_change=None):
        db = DBConnector()
        lables = ["Deceased", "Living", "Deferred"]
        if data_change is not None:
            lables.append("not recorded")
        else:
            data_male = db.query(gender_equal_male())
            data_female = db.query(gender_equal_female())
            data_all_patient = [data_male[0][0], data_female[0][0]]
        data_all_m = 0
        data_all_f = 0
        data_f = list()
        data_m = list()
        for element in lables:
            sql_query = vital_status(element, 'F', data_change)
            female = db.query(sql_query)[0][0]
            data_all_f += female
            data_f.append(female)
            sql_query = vital_status(element, 'M', data_change)
            male = db.query(sql_query)[0][0]
            data_all_m += male
            data_m.append(male)
        if data_change is None:
            unknown_m = data_all_patient[0]-data_all_m
            unknown_f = data_all_patient[1]-data_all_f
            lables.append("not recorded")
            data_m.append(unknown_m)
            data_f.append(unknown_f)
        result = {"lable": lables, "M": data_m, "F": data_f}
        return result


class GraphDataDiagnoseGenderCount:

    def __init__(self):
        self.data = self.get_gender_diagnose()

    def update(self, data_change):
        self.data = self.get_gender_diagnose(data_change)

    def get_gender_diagnose(self, data_change=None):
        db = DBConnector()
        data = db.query(diagnoses_gender_count(data_change))
        lables = []
        data_count = []
        data_m = []
        data_f = []
        for element in data:
            lables.append(element[0])
            data_count.append(element[1])
            data_m.append(element[2])
            data_f.append(element[3])
        result = {"lable": lables, "data": data_count, "M": data_m, "F": data_f}

        return result


class GraphDataMedicationGenderCount:

    def __init__(self):
        self.data = self.get_gender_medications()

    def update(self, data_change):
        self.data = self.get_gender_medications(data_change)

    def get_gender_medications(self, data_change=None):
        db = DBConnector()
        data = db.query(medications_gender_count(data_change))
        lables = []
        data_count = []
        data_m = []
        data_f = []
        for element in data:
            lables.append(element[0])
            data_count.append(element[1])
            data_m.append(element[2])
            data_f.append(element[3])
        result = {"lable": lables, "data": data_count, "M": data_m, "F": data_f}

        return result


class GraphDataProcedureGenderCount:

    def __init__(self):
        self.data = self.get_gender_medications()

    def update(self, data_change):
        self.data = self.get_gender_medications(data_change)

    def get_gender_medications(self, data_change=None):
        db = DBConnector()
        data = db.query(procedures_gender_count(data_change))
        lables = []
        data_count = []
        data_m = []
        data_f = []
        for element in data:
            lables.append(element[0])
            data_count.append(element[1])
            data_m.append(element[2])
            data_f.append(element[3])
        result = {"lable": lables, "data": data_count, "M": data_m, "F": data_f}

        return result


if __name__ == '__main__':
    db = DBConnector()
    myGraph = GraphDataAgeDistribution()
    myGraph2 = GraphDataDiagnoseGenderCount()
    c_dimcode = r'\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv'
    c_dimcode2 = r'\Diagnoses\(I00-I99) Dise~3w8h'
    data_change = {'selection': [['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode],
                                 ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode2]],
                   'operator': ['INTERSECT', 'UNION']}
    # myGraph.update(data_change)
    myGraph2.update(data_change)
    print(myGraph.data)
    print(myGraph2.data)
