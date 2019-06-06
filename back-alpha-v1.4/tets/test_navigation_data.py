import unittest
from navigation_data import NavigationData


class NavigationDataTestCase(unittest.TestCase):

    def setUp(self):
        self.table_name_one = "icd10_icd9"
        self.table_name_two = "i2b2"

    def test_init_icd(self):
        my_nav_data = NavigationData(self.table_name_one)
        self.assertIsInstance(my_nav_data, NavigationData)

    def test_init_i2b2(self):
        my_nav_data = NavigationData(self.table_name_two)
        self.assertIsInstance(my_nav_data, NavigationData)


class BuildTreeDictTestCase(unittest.TestCase):
    def setUp(self):
        self.my_nav_data = NavigationData("icd10_icd9")

    def test_equal(self):
        pass


def test_suite():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(NavigationDataTestCase))
    suite.addTest(unittest.makeSuite(BuildTreeDictTestCase))

    return suite


if __name__ == '__main__':
    unittest.main()
