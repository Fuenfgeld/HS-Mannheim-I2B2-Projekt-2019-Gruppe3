import unittest
from sql_pattern import selection_patient_count, selection_tree_data


class SelectionPatientCountTestCase(unittest.TestCase):

    def test_result(self):
        c_dimcode = r'\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv'
        c_dimcode2 = r'\Diagnoses\(I00-I99) Dise~3w8h'
        data_change = {'selection': [['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode],
                                     ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode2]],
                       'operator': ['INTERSECT', 'UNION']}
        actual = selection_patient_count(data_change)
        expected = """(SELECT DISTINCT patient_num FROM i2b2demodata.observation_fact WHERE concept_cd in (SELECT concept_cd FROM concept_dimension WHERE concept_path LIKE '\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv%')) INTERSECT (SELECT DISTINCT patient_num FROM i2b2demodata.observation_fact WHERE concept_cd in (SELECT concept_cd FROM concept_dimension WHERE concept_path LIKE '\Diagnoses\(I00-I99) Dise~3w8h%')) """
        self.assertEqual(expected, actual)


class SelectionTreeDataTestCase(unittest.TestCase):

    def test_result(self):
        c_dimcode = r'\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv'
        selection = ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode]
        actual = selection_tree_data(selection)
        expected = """concept_cd in (SELECT concept_cd FROM concept_dimension WHERE concept_path LIKE '\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv%')"""
        self.assertEqual(expected, actual)

    def test_len(self):
        selection = ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE']
        actual = selection_tree_data(selection)
        expected = ""
        self.assertEqual(expected, actual)


def test_suite():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(SelectionPatientCountTestCase))
    suite.addTest(unittest.makeSuite(SelectionTreeDataTestCase))

    return suite
