import json
import csv
from navigation_data import *


def into_python_dict(path=r'..\test\test_data\flare'):
    with open(path + '.json', 'r') as f:
        dic = json.load(f)
    return dic


# Dic in Json konvertieren
def into_json_file(dic, path='data/'):
    path = "{}.json".format(path)
    with open(path, 'w') as outfile:
        json.dump(dic, outfile)


def into_python_list(path=r'..\test\test_data\flare'):
    list = []
    with open(path + '.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            name = row[0].split('\\')
            if row[1] == '':
                list.append((len(name), name.pop(), 0, row[0]))
            else:
                list.append((len(name),  name.pop(), row[1], row[0]))
    return list

