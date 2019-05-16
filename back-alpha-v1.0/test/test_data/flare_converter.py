import json
import csv
from icicle_data import *


def into_dict(path=r'..\test\test_data\flare'):
    with open(path + '.json', 'r') as f:
        dic = json.load(f)
    return dic


def into_list(path=r'..\test\test_data\flare'):
    list=[]
    with open(path+'.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            name = row[0].split('\\')
            if row[1]=='':
                list.append((len(name), row[0], name.pop(), 0))
            else:
                list.append((len(name), row[0], name.pop(), row[1]))
    return list

