from post_db import select


def icd10_tree_diagnose_count():
    sql_query = """SELECT c_hlevel, c_name, count(patient_num),c_fullname FROM i2b2demodata.observation_fact demo_obs 
                      inner join i2b2demodata.concept_dimension demo_cdim USING (concept_cd) 
                      right join i2b2metadata.icd10_icd9 meta_icd on demo_cdim.concept_path=meta_icd.c_dimcode 
                      GROUP BY c_hlevel,c_fullname,c_name 
                      ORDER BY c_fullname;"""
    results = select(sql_query)
    return results


def icd10_tree_root():
    sql_query = """SELECT  c_hlevel, c_name, count(patient_num), c_fullname FROM i2b2demodata.observation_fact demo_ob 
            inner join i2b2demodata.concept_dimension demo_cdim USING (concept_cd) 
            right join i2b2metadata.icd10_icd9 meta_icd on demo_cdim.concept_path=meta_icd.c_dimcode 
            WHERE c_hlevel = 0 
            group by c_name, c_hlevel,c_fullname;"""
    results = select(sql_query)
    return results


def icd10_tree_frist_hierachielvl():
    sql_query = """SELECT DISTINCT c_fullname, c_name FROM i2b2metadata.icd10_icd9 
                                 WHERE c_hlevel = 1 AND c_fullname LIKE '{}'
                                 ORDER BY c_fullname ;""".format(r"\Diagnoses\%")
    results = select(sql_query)
    return results


def icd10_tree_diagnose_count_first_hierachielvl(like):
    sql_query = """SELECT c_hlevel, c_name, count(patient_num),c_fullname FROM i2b2demodata.observation_fact demo_obs 
                      inner join i2b2demodata.concept_dimension demo_cdim USING (concept_cd) 
                      right join i2b2metadata.icd10_icd9 meta_icd on demo_cdim.concept_path=meta_icd.c_dimcode 
                      WHERE c_fullname LIKE '{}%' 
                      GROUP BY c_hlevel,c_fullname,c_name 
                      ORDER BY c_fullname;""".format(like)
    results = select(sql_query)
    return results

def all_patient():
    sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension;"""
    results = select(sql_query)
    return results[0][0]

def gender_equal_male():
    sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension WHERE sex_cd = 'M';"""
    results = select(sql_query)
    return results[0][0]

def gender_equal_female():
    sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension WHERE sex_cd = 'F';"""
    results = select(sql_query)
    return results[0][0]

def age_distribution(beginn,end):
    sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension WHERE age_in_years_num >= {} and age_in_years_num < {} ;""".format(beginn, end)
    results = select(sql_query)
    return results[0][0]

# sql_pattern for i2b2
def selection_data(selection):
    c_tablename = selection[0]
    c_columnname = selection[1]
    c_columndatatype = selection[2]
    c_operator = selection[3]
    c_dimcode = selection[4]
    sql_query = """SELECT * from {c_tabelname}
    WHERE {c_columname}  {c_operator} {c_dimcode};""".format(c_tablename, c_columnname, c_columndatatype, c_operator,
                                                             c_dimcode)
    results = select(sql_query)
    return results
