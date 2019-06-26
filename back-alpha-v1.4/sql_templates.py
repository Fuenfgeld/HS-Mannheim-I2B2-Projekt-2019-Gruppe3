from sql_pattern import selection_patient_count


def tree_root(table_name):
    sql_query = """SELECT DISTINCT  c_hlevel, c_name,
                 (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
                  WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)),
                  c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname,c_basecode FROM i2b2metadata.{}
                  WHERE c_hlevel = 0
                  order by c_fullname;""".format(table_name)
    return sql_query


def tree_first_hierachielvl(table_name, navigation_tree):
    root = r"" + str(navigation_tree.search_element[4])
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
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT DISTINCT  c_hlevel, c_name,
                       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
                        WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)
                        AND patient_num in ( {} ) ),
                        c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname FROM i2b2metadata.{} 
                        order by c_fullname;""".format(pattern, table_name)
    return sql_query


def tree_patient_all_over_0(table_name, selection=None):
    sql_query = """SELECT DISTINCT  c_hlevel, c_name,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE  concept_cd = c_basecode),
        c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname,c_basecode FROM i2b2metadata.icd10_icd9
        WHERE c_hlevel > 0
        order by c_fullname;""".format(table_name)

    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT DISTINCT  c_hlevel, c_name,
            (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE  concept_cd = c_basecode and patient_num in ({})),
            c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname,c_basecode FROM i2b2metadata.icd10_icd9
             WHERE c_hlevel > 0
        order by c_fullname;""".format(pattern, table_name)
    return sql_query


def tree_patient_count_first_hierachielvl(table_name, like, selection=None):
    sql_query = """SELECT DISTINCT  c_hlevel, c_name,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE  concept_cd = c_basecode),
        c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname,c_basecode FROM i2b2metadata.{}
        WHERE c_fullname LIKE '{}%' 
        order by c_fullname;""".format(table_name, like)

    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT DISTINCT  c_hlevel, c_name,
                       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
                        WHERE  concept_cd = c_basecode
                        AND patient_num in ( {} ) ),
                        c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname,c_basecode FROM i2b2metadata.{}
                        WHERE c_fullname LIKE '{}%' 
                        order by c_fullname;""".format(pattern, table_name, like)

    return sql_query


############################################## Statisiks Querys ###################################################
def all_patient(selection=None):
    sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension;"""
    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
                        WHERE patient_num in ( {} )""".format(pattern)
    return sql_query


def gender_equal_male(selection=None):
    sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension WHERE sex_cd = 'M';"""
    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT count(DISTINCT obs.patient_num) FROM observation_fact obs
                        WHERE patient_num in ((SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd = 'M')
                        INTERSECT ({}))""".format(pattern)
    return sql_query


def gender_equal_female(selection=None):
    sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension WHERE sex_cd = 'F' """
    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT count(DISTINCT obs.patient_num) FROM observation_fact obs
                        WHERE patient_num in ((SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd = 'F')
                        INTERSECT ({})) """.format(pattern)
    return sql_query


def max_stay_of_days(selection=None):
    sql_query = """SELECT max(length_of_stay) from i2b2demodata.visit_dimension"""
    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT max(length_of_stay) from i2b2demodata.visit_dimension
            WHERE patient_num in ( {} )""".format(pattern)

    return sql_query


def stay_of_day(days, selection=None):
    sql_query = """SELECT count(DISTINCT patient_num) from i2b2demodata.observation_fact where
                    patient_num in (SELECT patient_num from i2b2demodata.visit_dimension 
                                    where length_of_stay = {});""".format(days)
    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
                  WHERE patient_num in ((SELECT patient_num from i2b2demodata.visit_dimension 
                                            where length_of_stay = {}) 
                                        INTERSECT ({}))""".format(days, pattern)

    return sql_query


def age_distribution(begin, end, gender, selection=None):
    sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension 
                   WHERE age_in_years_num between {} AND {} AND sex_cd = '{}' """.format(begin, end, gender)
    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT count(DISTINCT obs.patient_num) FROM observation_fact obs
                        WHERE patient_num in (( SELECT patient_num from i2b2demodata.patient_dimension WHERE
                        sex_cd = '{}' AND age_in_years_num between {} AND {}) INTERSECT ({}))""".format(
                gender, begin, end, pattern)

    return sql_query


def vital_status(state, gender, selection=None):
    sql_query = """SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE patient_num in (SELECT patient_num from observation_fact WHERE concept_cd in
                (SELECT concept_cd from i2b2demodata.concept_dimension WHERE concept_path like  '\\i2b2\\Demographics\\Vital Status\\{}%')
        INTERSECT (SELECT patient_num from i2b2demodata.patient_dimension where sex_cd='{}'))""".format(state, gender)
    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE patient_num in (SELECT patient_num from observation_fact WHERE concept_cd in
                (SELECT concept_cd from i2b2demodata.concept_dimension WHERE concept_path like  '\\i2b2\\Demographics\\Vital Status\\{}%')
        INTERSECT (SELECT patient_num from i2b2demodata.patient_dimension where sex_cd='{}')
        INTERSECT ({}))""".format(state, gender, pattern)

    return sql_query


def labory_by_flag_count(value):
    sql_query = """SELECT count( nval_num) from i2b2demodata.observation_fact where nval_num notnull and concept_cd
        in (SELECT concept_cd from i2b2demodata.concept_dimension
        where concept_path LIKE  '{}%')""".format(value)

    return sql_query

def labory_by_flag(value, sex, selection=None):
    sql_query = """SELECT nval_num from i2b2demodata.observation_fact where nval_num notnull and concept_cd
        in (SELECT concept_cd from i2b2demodata.concept_dimension
        where concept_path LIKE  '{}%')
        AND patient_num in (SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd='{}')""".format(value, sex)
    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT nval_num from i2b2demodata.observation_fact where nval_num notnull and concept_cd
        in (SELECT concept_cd from i2b2demodata.concept_dimension
        where concept_path LIKE  '{}%')
        AND patient_num in ((SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd='{}')
        INTERSECT ({}))""".format(value, sex, pattern)

    return sql_query


def diagnoses_gender_count(selection=None):
    sql_query = """SELECT c_name,count(distinct patient_num) as anzahl,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE concept_cd = c_basecode AND patient_num in (SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd='M')) as anzahl_M,(SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE concept_cd = c_basecode AND patient_num in (SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd='M')) as anzahl_F
        FROM i2b2metadata.icd10_icd9
            join i2b2demodata.observation_fact on observation_fact.concept_cd = c_basecode
                            group by c_name,c_basecode
                            order by anzahl desc limit 10;"""
    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT c_name,count(distinct patient_num) as anzahl,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
            WHERE concept_cd = c_basecode AND patient_num in ((SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd='M') INTERSECT ({})))as anzahl_M,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
            WHERE concept_cd = c_basecode AND patient_num in ((SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd='F') INTERSECT ({})))as anzahl_F
       FROM i2b2metadata.icd10_icd9 join i2b2demodata.observation_fact on observation_fact.concept_cd = c_basecode
            WHERE patient_num in ({})
                            group by c_name,c_basecode
                            order by anzahl desc limit 10;""".format(pattern, pattern, pattern)

    return sql_query


def medications_gender_count(selection=None):
    sql_query = """SELECT c_name,count(distinct patient_num) as anzahl,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE concept_cd = c_basecode AND patient_num in (SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd='M')) as anzahl_M,(SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE concept_cd = c_basecode AND patient_num in (SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd='F')) as anzahl_F
        FROM i2b2metadata.i2b2
            join i2b2demodata.observation_fact on observation_fact.concept_cd = c_basecode
        WHERE c_fullname LIKE '\\i2b2\\Medications%'
                            group by c_name,c_basecode
                            order by anzahl desc limit 10;"""

    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT c_name,count(distinct patient_num) as anzahl,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
            WHERE concept_cd = c_basecode AND patient_num in ((SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd='M') INTERSECT ({})))as anzahl_M,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
            WHERE concept_cd = c_basecode AND patient_num in ((SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd='F') INTERSECT ({})))as anzahl_F
       FROM i2b2metadata.icd10_icd9 join i2b2demodata.observation_fact on observation_fact.concept_cd = c_basecode
            WHERE c_fullname LIKE '\\i2b2\\Medications%' AND  patient_num in ({})
                            group by c_name,c_basecode
                            order by anzahl desc limit 10;""".format(pattern, pattern, pattern)

    return sql_query


def procedures_gender_count(selection=None):
    sql_query = """SELECT c_name,count(distinct patient_num) as anzahl,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE concept_cd = c_basecode AND patient_num in (SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd='M')) as anzahl_M,(SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE concept_cd = c_basecode AND patient_num in (SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd='F')) as anzahl_F
        FROM i2b2metadata.i2b2
            join i2b2demodata.observation_fact on observation_fact.concept_cd = c_basecode
        WHERE c_fullname LIKE '\\i2b2\\Procedures%'
                            group by c_name,c_basecode
                            order by anzahl desc limit 10;"""

    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT c_name,count(distinct patient_num) as anzahl,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
            WHERE concept_cd = c_basecode AND patient_num in ((SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd='M') INTERSECT ({})))as anzahl_M,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
            WHERE concept_cd = c_basecode AND patient_num in ((SELECT patient_num from i2b2demodata.patient_dimension WHERE sex_cd='F') INTERSECT ({})))as anzahl_F
       FROM i2b2metadata.icd10_icd9 join i2b2demodata.observation_fact on observation_fact.concept_cd = c_basecode
            WHERE c_fullname LIKE '\\i2b2\\Procedures%' AND  patient_num in ({})
                            group by c_name,c_basecode
                            order by anzahl desc limit 10;""".format(pattern, pattern, pattern)
    return sql_query
