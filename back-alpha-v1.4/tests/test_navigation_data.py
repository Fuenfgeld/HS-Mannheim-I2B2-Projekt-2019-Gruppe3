import unittest
from navigation_data import NavigationData


class NavigationDataTestCase(unittest.TestCase):

    def setUp(self):
        self.table_name_one = "icd10_icd9"
        self.table_name_two = "i2b2"
        self.table_name_tree = "wrong_name"

    def test_init_icd(self):
        my_nav_data = NavigationData(self.table_name_one)
        self.assertIsInstance(my_nav_data, NavigationData)

    def test_init_i2b2(self):
        my_nav_data = NavigationData(self.table_name_two)
        self.assertIsInstance(my_nav_data, NavigationData)

    def test_wrong_table_name(self):
        self.assertRaises(FileNotFoundError, NavigationData, self.table_name_tree)


class BuildNavigationTreeTestCase(unittest.TestCase):
    def setUp(self):
        self.my_nav_data = NavigationData("icd10_icd9")

    def test_equal(self):
        pass


class UpdateTestCase(unittest.TestCase):
    def setUp(self):
        self.my_nav_data = NavigationData("icd10_icd9")

    def test_update(self):
        c_dimcode = r'\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv'
        c_dimcode2 = r'\Diagnoses\(I00-I99) Dise~3w8h'
        data_change = {'selection': [['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode],
                                     ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode2]],
                       'operator': ['INTERSECT', 'UNION']}
        tree_data = self.my_nav_data.into_dict()
        self.my_nav_data.update(data_change)
        tree_data_updated = self.my_nav_data.into_dict()

        self.assertNotEqual(tree_data, tree_data_updated)


def test_suite():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(NavigationDataTestCase))
    suite.addTest(unittest.makeSuite(BuildNavigationTreeTestCase))
    suite.addTest(unittest.makeSuite(UpdateTestCase))

    return suite


if __name__ == '__main__':
    unittest.main()
