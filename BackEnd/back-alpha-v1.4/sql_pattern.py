# sql_pattern for i2b2 ontology
def selection_tree_data(data_change):
    selections = data_change['selection']
    logical_operator = data_change['operator']
    sql_query = ""
    for selection in selections:
        c_facttable = r"" + selection[0]
        c_tablename = r"" + selection[1]
        c_columnname = r"" + selection[2]
        c_operator = r"" + selection[3]
        c_dimcode = r"" + selection[4]
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
        if len(logical_operator) != 0:
            sql_query += logical_operator.pop(0)
    return sql_query
