# sql_pattern for i2b2 ontology
def selection_tree_data(data_change):
    selections = data_change['selection']
    logical_operator = data_change['operator']
    sql_query = ""
    check_logical_operator = False
    for i in range(len(selections)):
        print(logical_operator)
        if check_logical_operator:
            sql_query += logical_operator[i]
            check_logical_operator = False
        check_logical_operator = True

        c_facttable = r"" + selections[i][0]
        c_tablename = r"" + selections[i][1]
        c_columnname = r"" + selections[i][2]
        c_operator = r"" + selections[i][3]
        c_dimcode = r"" + selections[i][4]
        if c_operator == 'LIKE':
            sql_query += """ {} in (SELECT {} FROM {} WHERE {} {} '{}%') """.format(c_facttable,
                                                                                    c_facttable, c_tablename,
                                                                                    c_columnname,
                                                                                    c_operator, c_dimcode)
        else:
            sql_query += """ {} in (SELECT {} FROM {} WHERE {} {} '{}') """.format(c_facttable,
                                                                                   c_facttable, c_tablename,
                                                                                   c_columnname,
                                                                                   c_operator, c_dimcode)

    return sql_query
