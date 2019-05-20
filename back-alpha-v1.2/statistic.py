from sql_templates import all_patient


def get_all_patient():
    result = int(all_patient())
    return result


if __name__ == '__main__':
    get_all_patient()
