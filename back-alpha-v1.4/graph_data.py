from sql_templates import all_patient, gender_equal_female, gender_equal_male, age_distribution, \
    diagnoses_gender_count, medications_gender_count, procedures_gender_count, vital_status, stay_of_day, \
    max_stay_of_days, labory_by_flag, labory_by_flag_count

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
            unknown_m = data_all_patient[0] - data_all_m
            unknown_f = data_all_patient[1] - data_all_f
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


class GraphDataStayOfDays:

    def __init__(self):
        self.data = self.get_stay_of_days()

    def update(self, data_change):
        self.data = self.get_stay_of_days(data_change)

    def get_stay_of_days(self, data_change=None):
        db = DBConnector()
        lables = []
        data_count = []
        max_days = db.query(max_stay_of_days(data_change))[0][0]
        for i in range(1, max_days + 1):
            sql_query = stay_of_day(i, data_change)
            data_count.append(db.query(sql_query)[0][0])
            lables.append(str(i))

        result = {"label": lables, "data": data_count}

        return result

        return result


class GraphDataLaboratoryTest:

    def __init__(self):
        self.data = self.get_lab_values()

    def update(self, data_change):
        self.data = self.get_lab_values(data_change)

    def get_lab_values(self, data_change=None):
        db = DBConnector()
        labory_tests = [r'\i2b2\Labtests\LAB\(LLB16) Chemistry\(LLB17) Lipid Tests\CHOL\LOINC:2093-3',
                        r'\i2b2\Labtests\LAB\(LLB53) Hematology\(LLB57) Complete Blood Count\HGB\LOINC:718-7',
                        r'\i2b2\Labtests\LAB\(LLB16) Chemistry\(LLB20) Cardiac Tests\CPK\LOINC:2157-6',
                        r'\i2b2\Labtests\LAB\(LLB16) Chemistry\(LLB20) Cardiac Tests\HSCRP\LOINC:30522-7']
        lables = ["cholesterol", "hemoglobin", "creatine", "C_REACTIVE_PROTEIN"]
        result = dict()
        for test in labory_tests:
            data_m = list()
            data_f = list()
            sql_query = labory_by_flag(test, 'M', data_change)
            male = db.query(sql_query)
            for value in male:
                data_m.append(float(value[0]))
            sql_query = labory_by_flag(test, 'F', data_change)
            female = db.query(sql_query)
            for value in female:
                data_f.append(float(value[0]))
            data_all = db.query(labory_by_flag_count(test))[0][0]
            result.update({lables.pop(0): [{'M': data_m, 'F': data_f, "V": data_all}]})

        return result

        return result

