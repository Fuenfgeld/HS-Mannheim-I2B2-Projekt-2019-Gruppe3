# sql_pattern for i2b2 ontology tables
def selection_tree_data(selection):
    sql_query = ""
    if len(selection) >= 5:
        c_facttable = r"" + selection[0]
        c_tablename = r"" + selection[1]
        c_columnname = r"" + selection[2]
        c_operator = r"" + selection[3]
        c_dimcode = r"" + selection[4]
        if c_operator == 'LIKE':
            sql_query += """{} in (SELECT {} FROM {} WHERE {} {} '{}%')""".format(c_facttable,
                                                                                    c_facttable, c_tablename,
                                                                                    c_columnname,
                                                                                    c_operator, c_dimcode)
        else:
            sql_query += """{} in (SELECT {} FROM {} WHERE {} {} '{}')""".format(c_facttable,
                                                                                   c_facttable, c_tablename,
                                                                                   c_columnname,
                                                                                   c_operator, c_dimcode)

    return sql_query


# sql_pattern for i2b2 ontology tables
def selection_patient_count(data_change):
    selections = data_change['selection']
    logical_operator = data_change['operator']
    sql_query = ""
    check_logical_operator = False
    for i in range(len(selections)):
        if check_logical_operator:
            sql_query += (logical_operator[i - 1])['value']+" "
            check_logical_operator = False
        check_logical_operator = True
        sql_query += """(SELECT DISTINCT patient_num FROM i2b2demodata.observation_fact WHERE {}) """.format(
            selection_tree_data(selections[i]))

    return sql_query
