import unittest
from navigation_data import TreeStructure
from list_into_tree_converter import add_to_grandparent, add_to_parent, have_children, list_into_tree_node
from test.test_data.flare_test_data_parser import into_python_dict, into_python_list, into_json_file


class AddToGrandparentTestCase(unittest.TestCase):
    def setUp(self):
        datalist = into_python_list()
        self.child_two = TreeStructure(datalist[2])
        self.child_one = TreeStructure(datalist[1])
        self.root = TreeStructure(datalist[0])

    def test_stack_equal(self):
        test_stack = []
        test_stack.append(self.root)
        test_stack.append(self.child_one)
        test_stack.append(self.child_two)

        expected = {"name": "analytics", "value": 0, "children": [{"name": "cluster", "value": 0}]}
        add_to_grandparent(test_stack)
        actual = test_stack.pop().build_tree_dict()

        self.assertEqual(expected, actual)

    def empty_stack(self):
        self.assertTrue(True)


if __name__ == '__main__':
    unittest.main()
