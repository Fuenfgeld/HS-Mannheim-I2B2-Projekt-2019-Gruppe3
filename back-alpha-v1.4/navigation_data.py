from db_connector import DBConnector, get_ontology_names
from list_into_tree_converter import list_into_tree_node
from sql_templates import tree_root, tree_first_hierachielvl, tree_patient_count_first_hierachielvl, \
    tree_patient_all_over_0
from thread_with_return import ThreadWithReturnValue



class NavigationData:

    def __init__(self, table_name):
        ontology_names = get_ontology_names()
        if table_name in ontology_names:
            # :param table_name is a string of the table name in the database, like i2b2 or icd10_icd9
            self.table_name = table_name
            self.navigation_tree = self.build_navigation_tree()
        else:
            raise FileNotFoundError("Tablename is not in the db schema")

    def build_navigation_tree_thread(self, data_change=None):

        db_connection = DBConnector()
        root = db_connection.query(tree_root(self.table_name))
        navigation_tree = list_into_tree_node(root)
        first_hierarchy_levels = db_connection.query(tree_first_hierachielvl(self.table_name, navigation_tree))
        children = list()
        threads = list()
        for i in range(0, len(first_hierarchy_levels)):
            folder = str(first_hierarchy_levels[i][0])
            data_list = db_connection.query(tree_patient_count_first_hierachielvl(self.table_name, folder, data_change))
            t = ThreadWithReturnValue(target=list_into_tree_node, args=(data_list,))
            threads.append(t)
            t.start()
        for t in threads:
            children.append(t.join())

        for child in children:
            navigation_tree.add_child(child)
        return navigation_tree

    def build_navigation_tree(self, data_change=None):
        db_connection = DBConnector()
        data_list = list()
        root = db_connection.query(tree_root(self.table_name))
        data_list.extend(root)
        nav_tree_list = db_connection.query(tree_patient_all_over_0(self.table_name, data_change))
        data_list.extend(nav_tree_list)
        navigation_tree = list_into_tree_node(data_list)

        return navigation_tree

    def update(self, data_change):
        self.navigation_tree = self.build_navigation_tree(data_change)

    def into_dict(self):
        return self.navigation_tree.build_tree_dict()

    def save_as_json(self, path=None):
        self.navigation_tree.save(path)

