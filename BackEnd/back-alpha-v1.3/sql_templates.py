
def icd10_tree_root():
    sql_query = """SELECT DISTINCT  c_hlevel, c_name,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)),
        c_fullname,c_facttablecolumn,c_tablename,c_operator FROM i2b2metadata.icd10_icd9
        WHERE c_hlevel = 0
        order by c_fullname;"""
    return sql_query


def icd10_tree_frist_hierachielvl():
    sql_query = """SELECT DISTINCT c_fullname, c_name FROM i2b2metadata.icd10_icd9 
                                 WHERE c_hlevel = 1 AND c_fullname LIKE '{}'
                                 ORDER BY c_fullname ;""".format(r"\Diagnoses\%")
    return sql_query


# Patient Count Tree
def icd10_tree_patient_count(selection=None):
    if selection is not None:
        sql_query = """SELECT DISTINCT c_hlevel, c_name,
              (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
               WHERE {}),
               c_fullname FROM i2b2metadata.icd10_icd9
               order by c_fullname;""".format(selection_data(selection))
    else:
        sql_query = """SELECT DISTINCT c_hlevel, c_name,
           (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
            WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)),
            c_fullname FROM i2b2metadata.icd10_icd9
            order by c_fullname;"""
    return sql_query


def icd10_tree_patient_count_first_hierachielvl(like, selection=None):
    if selection is not None:
        sql_query = """SELECT DISTINCT  c_hlevel, c_name,
                   (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
                    WHERE {}),
                    c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname FROM i2b2metadata.icd10_icd9
                    WHERE c_fullname LIKE '{}%' 
                    order by c_fullname;""".format(selection_data(selection), like)
    else:
        sql_query = """SELECT DISTINCT  c_hlevel, c_name,
           (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
            WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)),
            c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname FROM i2b2metadata.icd10_icd9
            WHERE c_fullname LIKE '{}%' 
            order by c_fullname;""".format(like)
    return sql_query


# Statisiks Querys
def all_patient(selection=None):
    if selection is not None:
        sql_query = """SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
                    WHERE {}""".format(selection_data(selection))
    else:
        sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension;"""
    return sql_query


def gender_equal_male(selection=None):
    if selection is not None:
        sql_query = """SELECT count(DISTINCT obs.patient_num) FROM observation_fact obs
                    inner join patient_dimension using (patient_num)
                    WHERE {} AND sex_cd = 'M' """.format(selection_data(selection))
    else:
        sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension WHERE sex_cd = 'M';"""
    return sql_query


def gender_equal_female(selection=None):
    if selection is not None:
        sql_query = """SELECT count(DISTINCT obs.patient_num) FROM observation_fact obs
                    inner join patient_dimension using (patient_num)
                    WHERE {} AND sex_cd = 'F' """.format(selection_data(selection))
    else:
        sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension WHERE sex_cd = 'F' """

    return sql_query


def age_distribution(begin, end, selection=None):
    if selection is not None:
        sql_query = """SELECT count(DISTINCT obs.patient_num) FROM observation_fact obs
                    inner join patient_dimension using (patient_num)
                    WHERE age_in_years_num >= {} and age_in_years_num < {} AND {} """.format(begin, end, selection_data(selection))
    else:
        sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension 
                       WHERE age_in_years_num >= {} and age_in_years_num < {} """.format(begin, end)
    return sql_query


# sql_pattern for i2b2
def selection_data(selection):
    c_fachttablecolumn = r""+selection[0]
    c_tablename = r""+selection[1]
    c_columnname = r""+selection[2]
    c_operator = r""+selection[3]
    c_dimcode = r""+selection[4]
    if c_operator == 'LIKE':
        sql_query = """{} in (SELECT {} FROM {} WHERE {} {} '{}%') """.format(c_fachttablecolumn,c_fachttablecolumn, c_tablename, c_columnname,
                                                                      c_operator, c_dimcode)
    else:
        sql_query = """{} in (SELECT {} FROM {} WHERE {} {} '{}') """.format(c_fachttablecolumn,c_fachttablecolumn, c_tablename, c_columnname,
                                                                     c_operator, c_dimcode)
    return sql_query

