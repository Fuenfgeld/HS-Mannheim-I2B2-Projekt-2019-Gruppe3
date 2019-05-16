import post_db


def get_all_patient():
    sql_query = 'SELECT count(patient_num) FROM i2b2demodata.patient_dimension;'
    count = int((post_db.select(sql_query)[0][0]))
    return count


if __name__ == '__main__':
    get_all_patient()
