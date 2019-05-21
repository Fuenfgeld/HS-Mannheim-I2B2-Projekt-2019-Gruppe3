import unittest
from tree_structure import TreeStructure
from test.test_data.flare_test_data_parser import into_python_list


class TreeStructureTestCase(unittest.TestCase):

    def setUp(self):
        datalist = into_python_list()
        self.child_two = TreeStructure(datalist[2])
        self.child_one = TreeStructure(datalist[1], [self.child_two])
        self.root = TreeStructure(datalist[0], [self.child_one])

    def test_add_child(self):
        self.assertFalse(self.root.add_child("Wrong_Datatype"))

        self.assertFalse(self.root.add_child(3))

        self.assertTrue(self.root.add_child(TreeStructure((0, "test_path", "test_name", 10))))

        self.assertEqual(self.root.children.pop().name, TreeStructure((0, "test_path", "test_name", 10)).name)

    def test_build_tree_dict(self):
        test_dict = {"name": "flare", "value": 0, "children": [
                        {"name": "analytics", "value": 0, "children": [
                         {"name": "cluster", "value": 0
                          }
                         ]
                         }
                        ]
                     }
        self.assertEqual(test_dict, self.root.build_tree_dict())

    def test_get_dict(self):
        root_dict = {"name": "flare", "value": 0, "children": None}
        leaf_dict = {"name": "cluster", "value": 0}

        self.assertEqual(root_dict, self.root.get_dict_form())

        self.assertEqual(leaf_dict, self.child_two.get_dict_form())


if __name__ == '__main__':
    unittest.main()
