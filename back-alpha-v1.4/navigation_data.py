from db_connector import DBConnector
from list_into_tree_converter import list_into_tree_node
from sql_templates import tree_root, tree_first_hierachielvl, tree_patient_count_first_hierachielvl


class NavigationData:

    def __init__(self, table_name):
        # :param table_name is a string of the table name in the database, like i2b2 or icd10_icd9
        self.table_name = table_name
        self.navigation_tree = self.build_navigation_tree()

    def build_navigation_tree(self, data_change=None):
        db_connection = DBConnector()
        root = db_connection.query(tree_root(self.table_name))
        navigation_tree = list_into_tree_node(root)
        first_hierarchy_levels = db_connection.query(tree_first_hierachielvl(self.table_name, navigation_tree))
        children = []
        for i in range(0, len(first_hierarchy_levels)):
            folder = str(first_hierarchy_levels[i][0])
            data_list = db_connection.query(tree_patient_count_first_hierachielvl(self.table_name, folder, data_change))
            children.append(list_into_tree_node(data_list))

        for child in children:
            navigation_tree.add_child(child)
        return navigation_tree

    def update(self, data_change):
        self.navigation_tree = self.build_navigation_tree(data_change)

    def into_dict(self):
        return self.navigation_tree.build_tree_dict()

    def save_as_json(self, path=None):
        self.navigation_tree.save(path)


if __name__ == '__main__':
    test = NavigationData("icd10_icd9")
    # print(tets.navigation_tree.get_dict())
    db = DBConnector()
    c_dimcode = r'\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv\%'
    selection = ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode]
    # tets.change_tree(selection)
    # print("sec Tree")
    test.save_as_json("data/data_icd10_icd9")
