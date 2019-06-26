import unittest
from tree_node import TreeNode
from .data_query_for_tests import first_rows


class AddChildTestCase(unittest.TestCase):

    def setUp(self):
        datalist = first_rows()
        self.child_two = TreeNode(datalist[2])
        self.child_one = TreeNode(datalist[1])
        self.root = TreeNode(datalist[0])

    def test_datatype(self):
        self.assertTrue(self.root.add_child(self.child_one))
        self.assertFalse((self.root.add_child(3)))
        self.assertFalse((self.root.add_child("False Datatype")))


class TreeNodeTestCase(unittest.TestCase):

    def setUp(self):
        datalist = first_rows()
        self.child_two = TreeNode(datalist[2])
        self.child_one = TreeNode(datalist[1])
        self.root = TreeNode(datalist[0])

    def test_init_children(self):
        datalist = first_rows()
        children = [self.child_one, self.child_two]
        root = TreeNode(datalist[0], children)

        expected = {'name': 'Diagnoses',
                    'value': 0,
                    'selection': ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', '\\Diagnoses\\'],
                    'children': [
                        {'name': 'Certain infectious and parasitic diseases (a00-b99)',
                         'value': 0,
                         'selection': ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE',
                                       '\\Diagnoses\\(A00-B99) Cert~ugmm\\'],
                         },
                        {'name': 'Intestinal infectious diseases (a00-a09)',
                         'value': 0,
                         'selection': ['concept_cd',
                                       'concept_dimension',
                                       'concept_path',
                                       'LIKE',
                                       '\\Diagnoses\\(A00-B99) Cert~ugmm\\(A00-A09) '
                                       'Inte~3luo\\'],
                         }]}
        actual = root.build_tree_dict()

        self.assertEqual(expected, actual)


class BuildTreeDictTestCase(unittest.TestCase):
    def setUp(self):
        datalist = first_rows()
        self.child_two = TreeNode(datalist[2])
        self.child_one = TreeNode(datalist[1])
        self.root = TreeNode(datalist[0])

    def test_dict_children(self):
        self.child_one.add_child(self.child_two)
        self.root.add_child(self.child_one)

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
        actual = self.root.build_tree_dict()

        self.assertEqual(expected, actual)

    def test_dict_without_children(self):
        expected = {'name': 'Certain infectious and parasitic diseases (a00-b99)',
                    'value': 0,
                    'selection': ['concept_cd',
                                  'concept_dimension',
                                  'concept_path',
                                  'LIKE',
                                  '\\Diagnoses\\(A00-B99) Cert~ugmm\\']
                    }
        actual = self.child_one.build_tree_dict()

        self.assertEqual(expected, actual)


def test_suite():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(AddChildTestCase))
    suite.addTest(unittest.makeSuite(TreeNodeTestCase))
    suite.addTest(unittest.makeSuite(BuildTreeDictTestCase))

    return suite


if __name__ == '__main__':
    unittest.main()
