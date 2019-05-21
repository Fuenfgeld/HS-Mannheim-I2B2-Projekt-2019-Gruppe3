from list_into_tree_converter import *
from sql_templates import icd10_tree_diagnose_count_first_hierachielvl, icd10_tree_frist_hierachielvl, icd10_tree_root


class NavigationData:

    def __init__(self):
        self.navigation_tree = self.build_navigation_tree()


    def set_new_data(self, *selektion):
        self.navigation_tree = self.build_navigation_tree()

    def into_dict(self):
        return self.navigation_tree.build_tree_dict()

    def build_navigation_tree(self):
        first_hierarchy_level = icd10_tree_frist_hierachielvl()
        children = []
        for i in range(0, len(first_hierarchy_level)):
            folder = str(first_hierarchy_level[i][0])
            data_list = icd10_tree_diagnose_count_first_hierachielvl(folder)
            children.append(list_into_tree_node(data_list))

        navigation_tree = list_into_tree_node(icd10_tree_root())
        for child in children:
            navigation_tree.add_child(child)
        return navigation_tree


if __name__ == '__main__':
    data = icd10_tree_diagnose_count_first_hierachielvl(r"\Diagnoses\(A00-B99) Cert~ugmm\%")
    test = NavigationData()
    # print(test.navigation_tree.get_dict())
    dic = test.into_dict()
    print(test.navigation_tree)
