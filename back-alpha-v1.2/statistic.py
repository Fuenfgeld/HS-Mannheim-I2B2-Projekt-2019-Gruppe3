from sql_templates import all_patient, gender_equal_female, gender_equal_male, age_distribution


def get_all_patient():
    result = int(all_patient())
    return result


def get_gender_distribution():
    data_male = int(gender_equal_male())
    data_female = int(gender_equal_female())
    data = [data_male, data_female]
    lables = ["Männlich", "Weiblich"]
    result = {"lable": lables, "data": data}

    return result


def get_age_distribution():
    age_data = []
    for i in range(0, 90, 10):
        age_data.append(age_distribution(i, i + 10))

    labels = ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-80", "90-100"]
    result = {"lable": labels, "data": age_data}

    return result


if __name__ == '__main__':
    print(get_age_distribution())
