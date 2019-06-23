class TreeNode:

    def __init__(self, list_element, children=None):
        self.h_lvl = list_element[0]
        self.name = list_element[1]
        self.value = list_element[2]
        self.search_element = [list_element[3], list_element[4], list_element[5], list_element[6], list_element[7]]
        self.code_name = list_element[8]
        self.children = []
        if children is not None:
            for child in children:
                self.add_child(child)

    def add_child(self, node):
        if isinstance(node, TreeNode):
            self.children.append(node)
            return True
        return False

    def get_dict_form(self, children=None):
        if self.code_name is not None:
            name = str(self.code_name) + "|" + str(self.name)
        else:
            name = str(self.name)
        if len(self.children) <= 0:
            dic = {"name": name,
                   "value": self.value,
                   "selection": self.search_element}

        if len(self.children) > 0:
            dic = {"name": name,
                   "value": self.value,
                   "selection": self.search_element,
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

    def save(self, path):
        import json
        if path is not None:
            with open(path + '.json', 'w') as outfile:
                json.dump(self.build_tree_dict(), outfile)
        else:
            with open('data/data.json', 'w') as outfile:
                json.dump(self.build_tree_dict(), outfile)

    def split_string(self, string):
        if type(string) == str:
            if len(string) > 10:
                word_list = string.split()
                string_list = list()
                new_string = str()
                for word in word_list:
                    new_string += str(word) + " "
                    if len(new_string) > 10:
                        new_string += "\n"
                        string_list.append(new_string)
                        new_string = ""
                if self.code_name is not None:
                    final_string = str(self.code_name) + "\n"
                else:
                    final_string = ""
                for stings in string_list:
                    final_string += str(stings)

                final_string += new_string
                return final_string
        return string
