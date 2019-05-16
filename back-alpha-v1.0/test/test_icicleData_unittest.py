import unittest
from icicle_data import *
from test.test_data.flare_converter import into_dict, into_list


class TestIntoJson(unittest.TestCase):

    def test_equal(self):
        path = r'../test/test_data/test_flare'
        dic = into_dict()
        into_json(dic, path)
        self.assertEqual(into_dict(path), dic)


class TestNavigationData(unittest.TestCase):

    def test_equal(self):
        liste = into_list()
        dic = into_dict()
        self.assertEqual(tree_dict(liste), dic)


if __name__ == '__main__':
    unittest.main()
