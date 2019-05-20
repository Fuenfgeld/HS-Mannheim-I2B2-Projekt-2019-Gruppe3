import post_db
import json

# Dic in Json konvertieren
def into_json(dic, path='data/'):
    path = "{}.json".format(path)
    with open(path, 'w') as outfile:
        json.dump(dic, outfile)

    print("Zu Jason Konventiert")


def tree_dict(data_list):
    data = {"name": data_list[0][2], "value": data_list[0][3], "children": []}
    queue = []

    for i in range(0, len(data_list) - 1):
        new_child = {"name": data_list[i + 1][2], "value": data_list[i + 1][3]}
        if data_list[i][0] < data_list[i + 1][0]:
            queue.append(data)
            data = new_child
        elif data_list[i][0] == data_list[i + 1][0]:
            if data_list[i][1] != data_list[i + 1][1]:
                parent = queue.pop()
                if parent.get("children") is None:
                    parent.update({"children": []})
                parent["children"].append(data)
                queue.append(parent)
                data = new_child
            else:
                new_child["value"] += data["value"]
                data = new_child
        elif data_list[i][0] > data_list[i + 1][0]:
            diff = data_list[i][0] - data_list[i + 1][0]
            parent = queue.pop()
            if parent.get("children") is None:
                parent.update({"children": []})
            parent["children"].append(data)
            queue.append(parent)
            for j in range(0, diff):
                parent = queue.pop()
                parent2 = queue.pop()
                if parent2.get("children") is None:
                    parent2.update({"children": []})
                parent2["children"].append(parent)
                queue.append(parent2)
            data = new_child

    for g in range(1, len(queue)):
        data1 = queue.pop()
        data2 = queue.pop()
        if data2.get("children") is None:
            data2.update({"children": []})
        data2["children"].append(data1)
        queue.append(data2)
    print("Python Dic erstellt")
    return queue.pop()


def main():
    # Selection of the first h_level for Icd10
    sql_query_hlvl1 = """SELECT DISTINCT c_fullname, c_name FROM i2b2metadata.icd10_icd9 
                             WHERE c_hlevel = 1 AND c_fullname LIKE '{}'
                             ORDER BY c_fullname ;""".format(r"\Diagnoses\%")

    hlvl_list = post_db.select(sql_query_hlvl1)
    for i in range(0, len(hlvl_list)):
        # TODO Query for patient count
        # Query over I2b2 icd9/10 Code with diagnoses amount
        sql_query = """SELECT c_hlevel, c_fullname,c_name, count(patient_num) FROM i2b2demodata.observation_fact demo_obs 
                      inner join i2b2demodata.concept_dimension demo_cdim USING (concept_cd) 
                      right join i2b2metadata.icd10_icd9 meta_icd on demo_cdim.concept_path=meta_icd.c_dimcode 
                      WHERE c_fullname LIKE '{}%' 
                      GROUP BY c_hlevel,c_fullname,c_name 
                      ORDER BY c_fullname""".format(hlvl_list[i][0])

        data_list = post_db.select(sql_query)
        print("Daten aus Datenbank geholt")
        into_json(tree_dict(data_list), "data/data_" + str(hlvl_list[i][1]))

    post_db.disconnect()


if __name__ == '__main__':
    main()
