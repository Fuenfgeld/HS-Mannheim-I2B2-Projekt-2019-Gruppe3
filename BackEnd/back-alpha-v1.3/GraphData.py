from sql_templates import all_patient, gender_equal_female, gender_equal_male, age_distribution, \
    icd10_tree_patient_count
from DB_Connector import DBConnector


def get_all_patient(selection=None):
    db = DBConnector()
    data = db.query(all_patient(selection))
    result = data[0][0]
    return result


def get_gender_distribution(selection=None):
    db = DBConnector()
    data_male = db.query(gender_equal_male(selection))
    data_female = db.query(gender_equal_female(selection))
    data = [data_male[0][0], data_female[0][0]]
    lables = ["Männlich", "Weiblich"]
    result = {"lable": lables, "data": data}

    return result


def get_age_distribution(selection=None):
    db = DBConnector()
    age_data = []
    for i in range(0, 90, 10):
        sql_query = age_distribution(i, i + 10, selection)
        data = db.query(sql_query)[0][0]
        age_data.append(data)

    labels = ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-80", "90-100"]
    result = {"lable": labels, "data": age_data}

    return result


if __name__ == '__main__':
    db = DBConnector()
    c_dimcode = r'\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv\%'
    selection = ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode]
    data = get_age_distribution(selection)
    print(data)
