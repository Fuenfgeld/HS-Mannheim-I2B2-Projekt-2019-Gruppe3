from db_connector import DBConnector


def first_rows(limit=15):
    db = DBConnector()
    sql_query = """SELECT DISTINCT  c_hlevel, c_name,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)),
        c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname FROM i2b2metadata.icd10_icd9
        WHERE c_fullname LIKE '\\Diagnoses\\%'
        order by c_fullname LIMIT {}; """.format(str(limit))
    data = db.query(sql_query)
    return data
