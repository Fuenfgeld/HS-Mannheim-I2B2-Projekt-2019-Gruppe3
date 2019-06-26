import unittest
from list_into_tree_converter import *
from .data_query_for_tests import first_rows


class AddToGrandparentTestCase(unittest.TestCase):
    def setUp(self):
        datalist = first_rows()
        self.child_two = TreeNode(datalist[2])
        self.child_one = TreeNode(datalist[1])
        self.root = TreeNode(datalist[0])

    def test_stack_equal(self):
        test_stack = list()
        test_stack.append(self.root)
        test_stack.append(self.child_one)
        test_stack.append(self.child_two)

        expected = {'name': 'Certain infectious and parasitic diseases (a00-b99)',
                    'value': 0,
                    'selection': ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE',
                                  '\\Diagnoses\\(A00-B99) Cert~ugmm\\'],
                    'children': [{'name': 'Intestinal infectious diseases (a00-a09)',
                                  'value': 0,
                                  'selection': ['concept_cd',
                                                'concept_dimension',
                                                'concept_path',
                                                'LIKE',
                                                '\\Diagnoses\\(A00-B99) Cert~ugmm\\(A00-A09) '
                                                'Inte~3luo\\'],
                                  }]}
        add_to_grandparent(test_stack)
        actual = test_stack.pop().build_tree_dict()

        self.assertEqual(expected, actual)

    def type_stack_element(self):
        test_stack = list()
        test_stack.append(self.root)
        self.assertIsInstance(test_stack.pop(), TreeNode)


class AddToParentTestCase(unittest.TestCase):
    def setUp(self):
        datalist = first_rows()
        self.child_two = TreeNode(datalist[2])
        self.child_one = TreeNode(datalist[1])
        self.root = TreeNode(datalist[0])

    def test_stack_equal(self):
        test_stack = list()
        test_stack.append(self.root)
        test_stack.append(self.child_one)

        expected = {'name': 'Certain infectious and parasitic diseases (a00-b99)',
                    'value': 0,
                    'selection': ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE',
                                  '\\Diagnoses\\(A00-B99) Cert~ugmm\\'],
                    'children': [{'name': 'Intestinal infectious diseases (a00-a09)',
                                  'value': 0,
                                  'selection': ['concept_cd',
                                                'concept_dimension',
                                                'concept_path',
                                                'LIKE',
                                                '\\Diagnoses\\(A00-B99) Cert~ugmm\\(A00-A09) '
                                                'Inte~3luo\\'],
                                  }]}
        add_to_parent(test_stack, self.child_two)
        actual = test_stack.pop().build_tree_dict()

        self.assertEqual(expected, actual)


class HaveChildrenTestCase(unittest.TestCase):
    def setUp(self):
        datalist = first_rows()
        self.child_two = TreeNode(datalist[2])
        self.child_one = TreeNode(datalist[1])
        self.root = TreeNode(datalist[0])

    def test_stack_equal(self):
        test_stack = list()
        test_stack.append(self.root)
        test_stack.append(self.child_one)

        expected = {'name': 'Intestinal infectious diseases (a00-a09)',
                    'value': 0,
                    'selection': ['concept_cd',
                                  'concept_dimension',
                                  'concept_path',
                                  'LIKE',
                                  '\\Diagnoses\\(A00-B99) Cert~ugmm\\(A00-A09) '
                                  'Inte~3luo\\'],
                    }
        have_children(test_stack, self.child_two)
        actual = test_stack.pop().build_tree_dict()

        self.assertEqual(expected, actual)


class LookForPositionTestCase(unittest.TestCase):
    def setUp(self):
        datalist = first_rows()
        self.child_two = TreeNode(datalist[2])
        self.child_one = TreeNode(datalist[1])
        self.root = TreeNode(datalist[0])

        self.test_stack = list()
        self.test_stack.append(self.root)

    def test_stack_equal(self):
        expected = {'name': 'Certain infectious and parasitic diseases (a00-b99)',
                    'value': 0,
                    'selection': ['concept_cd',
                                  'concept_dimension',
                                  'concept_path',
                                  'LIKE',
                                  '\\Diagnoses\\(A00-B99) Cert~ugmm\\']
                    }
        look_for_position(self.test_stack, self.child_one, self.child_two)
        actual = self.test_stack.pop().build_tree_dict()

        self.assertEqual(expected, actual)


class ListIntoTreeNodeTestCase(unittest.TestCase):
    def setUp(self):
        self.datalist = first_rows(3)

    def test_stack_equal(self):
        expected = {'name': 'Diagnoses',
                    'value': 0,
                    'selection': ['concept_cd',
                                  'concept_dimension',
                                  'concept_path',
                                  'LIKE',
                                  '\\Diagnoses\\'],
                    'children': [{'name': 'Certain infectious and parasitic diseases (a00-b99)',
                                  'value': 0,
                                  'selection': ['concept_cd',
                                                'concept_dimension',
                                                'concept_path',
                                                'LIKE',
                                                '\\Diagnoses\\(A00-B99) Cert~ugmm\\'],
                                  'children': [{'name': 'Intestinal infectious diseases (a00-a09)',
                                                'value': 0,
                                                'selection': ['concept_cd',
                                                              'concept_dimension',
                                                              'concept_path',
                                                              'LIKE',
                                                              '\\Diagnoses\\(A00-B99) Cert~ugmm\\(A00-A09) Inte~3luo\\']
                                                }]
                                  }],
                    }

        actual = (list_into_tree_node(self.datalist)).build_tree_dict()

        self.assertEqual(expected, actual)


def test_suite():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(AddToGrandparentTestCase))
    suite.addTest(unittest.makeSuite(AddToParentTestCase))
    suite.addTest(unittest.makeSuite(HaveChildrenTestCase))
    suite.addTest(unittest.makeSuite(LookForPositionTestCase))
    suite.addTest(unittest.makeSuite(ListIntoTreeNodeTestCase))

    return suite


if __name__ == '__main__':
    unittest.main()
