
class TreeStructure:

    def __init__(self, list_element, children=None):
        self.h_lvl = list_element[0]
        self.name = list_element[1]
        self.value = list_element[2]
        self.search_element = list_element[3]
        self.children = []
        if children is not None:
            for child in children:
                self.add_child(child)

    def add_child(self, node):
        if isinstance(node, TreeStructure):
            self.children.append(node)
            return True
        return False

    def get_dict_form(self, children=None):
        if len(self.children) <= 0:
            dic = {"name": self.name,
                   "value": self.value}

        if len(self.children) > 0:
            dic = {"name": self.name,
                   "value": self.value,
                   "children": children}

        return dic

    def build_tree_dict(self):
        children = []
        if len(self.children) > 0:
            for child in self.children:
                children.append(child.build_tree_dict())
                dic = self.get_dict_form(children)

        else:
            dic = self.get_dict_form()
        return dic

    def __repr__(self):
        return self.name
