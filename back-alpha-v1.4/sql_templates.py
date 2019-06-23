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
        WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)),
        c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname,c_basecode FROM i2b2metadata.{}
        WHERE c_hlevel > 0
        order by c_fullname""".format(table_name)

    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT DISTINCT  c_hlevel, c_name,
               (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
                WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)),
                c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname,c_basecode FROM i2b2metadata.{}
                WHERE c_hlevel > 0 AND patient_num in ( {} )
                order by c_fullname""".format(pattern, table_name)
    return sql_query


def tree_patient_count_first_hierachielvl(table_name, like, selection=None):
    sql_query = """SELECT DISTINCT  c_hlevel, c_name,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
        WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)),
        c_facttablecolumn, c_tablename,c_columnname,c_operator, c_fullname,c_basecode FROM i2b2metadata.{}
        WHERE c_fullname LIKE '{}%' 
        order by c_fullname;""".format(table_name, like)

    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT DISTINCT  c_hlevel, c_name,
                       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
                        WHERE concept_cd in (SELECT concept_cd FROM i2b2demodata.concept_dimension WHERE concept_path = c_fullname)
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
                        inner join patient_dimension using (patient_num)
                        WHERE patient_num in ( {} ) AND sex_cd = 'M' """.format(pattern)
    return sql_query


def gender_equal_female(selection=None):
    sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension WHERE sex_cd = 'F' """
    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT count(DISTINCT obs.patient_num) FROM observation_fact obs
                        inner join patient_dimension using (patient_num)
                        WHERE patient_num in ( {} ) AND sex_cd = 'F' """.format(pattern)
    return sql_query


def age_distribution(begin, end, gender, selection=None):
    sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension 
                   WHERE age_in_years_num >= {} and age_in_years_num <{} AND sex_cd = '{}' """.format(begin, end,
                                                                                                      gender)
    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT count(DISTINCT obs.patient_num) FROM observation_fact obs
                        inner join patient_dimension using (patient_num)
                        WHERE patient_num in ( {} ) AND age_in_years_num >= {} and age_in_years_num < {} AND sex_cd = '{}' """.format(
                pattern, begin, end, gender)

    return sql_query


def diagnoses_gender_count(selection=None):
    sql_query = """SELECT c_name,count(DISTINCT patient_num) as anzahl,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
       INNER JOIN i2b2demodata.patient_dimension using (patient_num)
        WHERE concept_cd = c_basecode AND sex_cd='M') as anzahl_M,(SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
       INNER JOIN i2b2demodata.patient_dimension using (patient_num)
        WHERE concept_cd = c_basecode AND sex_cd='F') as anzahl_F
        FROM i2b2demodata.observation_fact demo_obs
            inner join i2b2demodata.concept_dimension demo_cdim USING (concept_cd)
            right join i2b2metadata.icd10_icd9 meta_icd on demo_cdim.concept_path = meta_icd.c_dimcode
                            group by c_name,c_basecode
                            order by anzahl desc limit 10;"""
    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT c_name,count(DISTINCT patient_num) as anzahl,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
       INNER JOIN i2b2demodata.patient_dimension using (patient_num)
        WHERE concept_cd = c_basecode AND patient_num in ( {} ) AND sex_cd='M') as anzahl_M,(SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
       INNER JOIN i2b2demodata.patient_dimension using (patient_num)
        WHERE concept_cd = c_basecode AND patient_num in ( {} ) AND sex_cd='F') as anzahl_F
        FROM i2b2demodata.observation_fact demo_obs
            inner join i2b2demodata.concept_dimension demo_cdim USING (concept_cd)
            right join i2b2metadata.icd10_icd9 meta_icd on demo_cdim.concept_path = meta_icd.c_dimcode
             WHERE patient_num in ( {} )
                            group by c_name,c_basecode
                            order by anzahl desc limit 10;""".format(pattern, pattern, pattern)

    return sql_query


def medications_gender_count(selection=None):
    sql_query = """SELECT c_name,count(DISTINCT patient_num) as anzahl,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
       INNER JOIN i2b2demodata.patient_dimension using (patient_num)
        WHERE concept_cd = c_basecode AND sex_cd='M') as anzahl_M,(SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
       INNER JOIN i2b2demodata.patient_dimension using (patient_num)
        WHERE concept_cd = c_basecode AND sex_cd='F') as anzahl_F
        FROM i2b2demodata.observation_fact demo_obs
            inner join i2b2demodata.concept_dimension demo_cdim USING (concept_cd)
            right join i2b2metadata.i2b2 meta_icd on demo_cdim.concept_path = meta_icd.c_dimcode
        WHERE concept_path LIKE '\\i2b2\\Medications%'
                            group by c_name,c_basecode
                            order by anzahl desc limit 10;"""

    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT c_name,count(DISTINCT patient_num) as anzahl,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
       INNER JOIN i2b2demodata.patient_dimension using (patient_num)
        WHERE concept_cd = c_basecode AND  sex_cd='M' AND patient_num in ( {} )) as anzahl_M,(SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
       INNER JOIN i2b2demodata.patient_dimension using (patient_num)
        WHERE concept_cd = c_basecode AND sex_cd='F' AND patient_num in ( {} )) as anzahl_F
        FROM i2b2demodata.observation_fact demo_obs
            inner join i2b2demodata.concept_dimension demo_cdim USING (concept_cd)
            right join i2b2metadata.i2b2 meta_icd on demo_cdim.concept_path = meta_icd.c_dimcode
        WHERE concept_path LIKE '\\i2b2\\Medications%' AND patient_num in ( {} )
                            group by c_name,c_basecode
                            order by anzahl desc limit 10;""".format(pattern, pattern, pattern)

    return sql_query


def procedures_gender_count(selection=None):
    sql_query = """SELECT c_name,count(DISTINCT patient_num) as anzahl,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
       INNER JOIN i2b2demodata.patient_dimension using (patient_num)
        WHERE concept_cd = c_basecode AND sex_cd='M') as anzahl_M,(SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
       INNER JOIN i2b2demodata.patient_dimension using (patient_num)
        WHERE concept_cd = c_basecode AND sex_cd='F') as anzahl_F
        FROM i2b2demodata.observation_fact demo_obs
            inner join i2b2demodata.concept_dimension demo_cdim USING (concept_cd)
            right join i2b2metadata.i2b2 meta_icd on demo_cdim.concept_path = meta_icd.c_dimcode
        WHERE concept_path LIKE '\\i2b2\\Procedures%'
                            group by c_name,c_basecode
                            order by anzahl desc limit 10;"""

    if selection is not None:
        pattern = selection_patient_count(selection)
        if pattern != "":
            sql_query = """SELECT c_name,count(DISTINCT patient_num) as anzahl,
       (SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
       INNER JOIN i2b2demodata.patient_dimension using (patient_num)
        WHERE concept_cd = c_basecode AND  sex_cd='M' AND patient_num in ( {} )) as anzahl_M,(SELECT count(DISTINCT patient_num) FROM i2b2demodata.observation_fact
       INNER JOIN i2b2demodata.patient_dimension using (patient_num)
        WHERE concept_cd = c_basecode AND sex_cd='F' AND patient_num in ( {} )) as anzahl_F
        FROM i2b2demodata.observation_fact demo_obs
            inner join i2b2demodata.concept_dimension demo_cdim USING (concept_cd)
            right join i2b2metadata.i2b2 meta_icd on demo_cdim.concept_path = meta_icd.c_dimcode
        WHERE concept_path LIKE '\\i2b2\\Procedures%' AND patient_num in ( {} )
                            group by c_name,c_basecode
                            order by anzahl desc limit 10;""".format(pattern, pattern, pattern)

    return sql_query
