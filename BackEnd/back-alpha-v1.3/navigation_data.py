from list_into_tree_converter import *
from DB_Connector import DBConnector
from sql_templates import icd10_tree_patient_count_first_hierachielvl, icd10_tree_frist_hierachielvl, icd10_tree_root


class NavigationData:

    def __init__(self):
        self.navigation_tree = self.build_navigation_tree()

    def change_tree(self, selection):
        self.navigation_tree = self.build_navigation_tree(selection)

    def into_dict(self):
        return self.navigation_tree.build_tree_dict()

    def build_navigation_tree(self, selection=None):
        db = DBConnector()
        first_hierarchy_level = db.query(icd10_tree_frist_hierachielvl())
        children = []
        for i in range(0, len(first_hierarchy_level)):
            folder = str(first_hierarchy_level[i][0])
            data_list = db.query(icd10_tree_patient_count_first_hierachielvl(folder, selection))
            children.append(list_into_tree_node(data_list))

        root = db.query(icd10_tree_root())
        navigation_tree = list_into_tree_node(root)
        for child in children:
            navigation_tree.add_child(child)
        return navigation_tree

    def save_as_json(self):
        self.navigation_tree.save()


if __name__ == '__main__':
    test = NavigationData()
    print("first tree")
    # print(test.navigation_tree.get_dict())
    db = DBConnector()
    c_dimcode = r'\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv\%'
    selection = ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode]
    test.change_tree(selection)
    print("sec Tree")
    test.save_as_json()
