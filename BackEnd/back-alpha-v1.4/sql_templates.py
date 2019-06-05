from sql_pattern import selection_tree_data


def tree_root(table_name):
    sql_query = """SELECT DISTINCT  c_hlevel, c_name,
                 (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
                  WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)),
                  c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname FROM i2b2metadata.{}
                  WHERE c_hlevel = 0
                  order by c_fullname;""".format(table_name)
    return sql_query


def tree_first_hierachielvl(table_name, navigation_tree):
    root = r""+str(navigation_tree.search_element[4])
    sql_query = """SELECT DISTINCT c_fullname, c_name FROM i2b2metadata.{}
                                 WHERE c_hlevel = 1 AND c_fullname LIKE '{}%'
                                 ORDER BY c_fullname ;""".format(table_name, root)
    return sql_query


# Patient Count Tree
def tree_patient_count(table_name, selection=None):
    sql_query = """SELECT DISTINCT c_hlevel, c_name,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)),
        c_fullname FROM i2b2metadata.{}
        order by c_fullname;""".format(table_name)

    if selection is not None:
        pattern = selection_tree_data(selection)
        if pattern != "":
            sql_query = """SELECT DISTINCT  c_hlevel, c_name,
                       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
                        WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)
                        AND {} ),
                        c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname FROM i2b2metadata.{} 
                        order by c_fullname;""".format(pattern, table_name)
    return sql_query


def tree_patient_count_first_hierachielvl(table_name, like, selection=None):
    sql_query = """SELECT DISTINCT  c_hlevel, c_name,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)),
        c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname FROM i2b2metadata.{}
        WHERE c_fullname LIKE '{}%' 
        order by c_fullname;""".format(table_name, like)

    if selection is not None:
        pattern = selection_tree_data(selection)
        if pattern != "":
            sql_query = """SELECT DISTINCT  c_hlevel, c_name,
                       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
                        WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)
                        AND {} ),
                        c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname FROM i2b2metadata.{}
                        WHERE c_fullname LIKE '{}%' 
                        order by c_fullname;""".format(pattern, table_name, like)

    return sql_query


# Statisiks Querys
def all_patient(selection=None):
    if selection is not None:
        sql_query = """SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
                    WHERE {}""".format(selection_tree_data(selection))
    else:
        sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension;"""
    return sql_query


def gender_equal_male(selection=None):
    if selection is not None:
        sql_query = """SELECT count(DISTINCT obs.patient_num) FROM observation_fact obs
                    inner join patient_dimension using (patient_num)
                    WHERE {} AND sex_cd = 'M' """.format(selection_tree_data(selection))
    else:
        sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension WHERE sex_cd = 'M';"""
    return sql_query


def gender_equal_female(selection=None):
    if selection is not None:
        sql_query = """SELECT count(DISTINCT obs.patient_num) FROM observation_fact obs
                    inner join patient_dimension using (patient_num)
                    WHERE {} AND sex_cd = 'F' """.format(selection_tree_data(selection))
    else:
        sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension WHERE sex_cd = 'F' """

    return sql_query


def age_distribution(begin, end, selection=None):
    if selection is not None:
        sql_query = """SELECT count(DISTINCT obs.patient_num) FROM observation_fact obs
                    inner join patient_dimension using (patient_num)
                    WHERE age_in_years_num >= {} and age_in_years_num < {} AND {} """.format(begin, end,
                                                                                             selection_tree_data(selection))
    else:
        sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension 
                       WHERE age_in_years_num >= {} and age_in_years_num < {} """.format(begin, end)
    return sql_query


def diagnoses_count(selection=None):
    pass