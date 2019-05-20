import unittest
from statistic import get_all_patient


class GetAllPatientTestCase(unittest.TestCase):

    def test_equal(self):
        self.assertEqual(get_all_patient(), 134)

    def test_count_lower_0(self):
        self.assertFalse(get_all_patient() < 0)

    def test_type(self):
        self.assertIsInstance(get_all_patient(), int)


if __name__ == '__main__':
    unittest.main()
