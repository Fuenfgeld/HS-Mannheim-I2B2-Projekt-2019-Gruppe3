import unittest
from db_connector import DBConnector, get_ontology_names


class InitTestCase(unittest.TestCase):

    def setUp(self):
        self.db_connection = DBConnector()

    def test_singleton(self):
        second_connection = DBConnector()
        self.assertEqual(self.db_connection, second_connection)

    def test_connection(self):
        self.assertTrue(self.db_connection.connection)


class SqlQueryTestCase(unittest.TestCase):

    def setUp(self):
        self.db_connection = DBConnector()

    def test_query(self):
        sql_query = """SELECT COUNT(patient_num) FROM i2b2demodata.patient_dimension;"""
        data = (self.db_connection.query(sql_query))
        actual = data[0][0]
        self.assertEqual(actual, 134)

    def test_backslash(self):
        test_string = r"\Diagnoses\%"
        sql_query = """SELECT DISTINCT c_fullname, c_name FROM i2b2metadata.icd10_icd9 
                                 WHERE c_hlevel = 0 AND c_fullname LIKE '{}'
                                 ORDER BY c_fullname ;""".format(test_string)
        expected = [('\\Diagnoses\\', 'Diagnoses')]
        actual = self.db_connection.query(sql_query)

        self.assertEqual(expected, actual)


class GetOntologyNamesTestCase(unittest.TestCase):

    def test_getNames(self):
        expected = ['i2b2', 'birn', 'schemes', 'table_access', 'custom_meta', 'ont_process_status', 'icd10_icd9']
        actual = get_ontology_names()

        self.assertEqual(actual, expected)


def test_suite():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(InitTestCase))
    suite.addTest(unittest.makeSuite(SqlQueryTestCase))
    suite.addTest(unittest.makeSuite(GetOntologyNamesTestCase))

    return suite


if __name__ == '__main__':
    unittest.main()
