import unittest
from graph_data import \
    GraphDataAgeDistribution, \
    GraphDataDiagnoseCount, \
    GraphDataPatientNumber, \
    GraphDataGenderDistribution, \
    GraphDataDiagnoseGenderCount


class GraphDataPatientNumberTestCase(unittest.TestCase):
    def setUp(self):
        self.my_patient_graph = GraphDataPatientNumber()

    def test_result(self):
        expected = {'lable': "Patient found", 'data': 134}
        actual = self.my_patient_graph.data
        self.assertEqual(expected, actual)

    def test_updated_result(self):
        c_dimcode = r'\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv'
        c_dimcode2 = r'\Diagnoses\(I00-I99) Dise~3w8h'
        data_change = {'selection': [['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode],
                                     ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode2]],
                       'operator': ['INTERSECT', 'UNION']}
        self.my_patient_graph.update(data_change)

        expected = {'lable': "Patient found", 'data': 43}
        actual = self.my_patient_graph.data
        self.assertEqual(expected, actual)


class GraphDataGenderDistributionTestCase(unittest.TestCase):
    def setUp(self):
        self.my_gender_distribution_graph = GraphDataGenderDistribution()

    def test_result(self):
        expected = {"lable": ['Male', 'Female'], "data": [82, 52]}
        actual = self.my_gender_distribution_graph.data
        self.assertEqual(expected, actual)

    def test_updated_result(self):
        c_dimcode = r'\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv'
        c_dimcode2 = r'\Diagnoses\(I00-I99) Dise~3w8h'
        data_change = {'selection': [['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode],
                                     ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode2]],
                       'operator': ['INTERSECT', 'UNION']}
        self.my_gender_distribution_graph.update(data_change)

        expected = {"lable": ['Male', 'Female'], "data": [25, 18]}
        actual = self.my_gender_distribution_graph.data
        self.assertEqual(expected, actual)


class GraphDataAgeDistributionTestCase(unittest.TestCase):
    def setUp(self):
        self.my_age_distribution_graph = GraphDataAgeDistribution()

    def test_result(self):
        expected = {'data': [
            {"name": "0-10", "F": 1, "M": 0},
            {"name": "10-20", "F": 11, "M": 20},
            {"name": "20-30", "F": 9, "M": 12},
            {"name": "30-40", "F": 13, "M": 22},
            {"name": "40-50", "F": 6, "M": 15},
            {"name": "50-60", "F": 2, "M": 6},
            {"name": "60-70", "F": 4, "M": 6},
            {"name": "70-80", "F": 3, "M": 1},
            {"name": "80-90", "F": 3, "M": 0}
        ]}
        actual = self.my_age_distribution_graph.data
        self.assertEqual(expected, actual)

    def test_updated_result(self):
        c_dimcode = r'\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv'
        c_dimcode2 = r'\Diagnoses\(I00-I99) Dise~3w8h'
        data_change = {'selection': [['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode],
                                     ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode2]],
                       'operator': ['INTERSECT', 'UNION']}
        self.my_age_distribution_graph.update(data_change)

        expected = {'data': [
            {"name": "0-10", "F": 0, "M": 0},
            {"name": "10-20", "F": 2, "M": 3},
            {"name": "20-30", "F": 1, "M": 4},
            {"name": "30-40", "F": 3, "M": 6},
            {"name": "40-50", "F": 4, "M": 7},
            {"name": "50-60", "F": 0, "M": 2},
            {"name": "60-70", "F": 3, "M": 2},
            {"name": "70-80", "F": 2, "M": 1},
            {"name": "80-90", "F": 3, "M": 0}
        ]}
        actual = self.my_age_distribution_graph.data
        self.assertEqual(expected, actual)


class GraphDataDiagnoseCountTestCaste(unittest.TestCase):
    def setUp(self):
        self.my_diagnose_graph = GraphDataDiagnoseCount()

    def test_result(self):
        expected = {"lable": [
            'Asthma, unspecified without mention of status asthmaticus',
            'Cough',
            'Routine general medical examination at a health care facility',
            'Extrinsic asthma without mention of status asthmaticus',
            'Acute upper respiratory infections of unspecified site',
            'Allergic rhinitis, cause unspecified',
            'Other dyspnea and respiratory abnormality',
            'Acute pharyngitis',
            'Routine infant or child health check',
            'Fever'
        ], 'data': [133, 87, 81, 73, 71, 59, 58, 56, 48, 46]}

        actual = self.my_diagnose_graph.data
        self.assertEqual(expected, actual)

    def test_updated_result(self):
        c_dimcode = r'\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv'
        c_dimcode2 = r'\Diagnoses\(I00-I99) Dise~3w8h'
        data_change = {'selection': [['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode],
                                     ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode2]],
                       'operator': ['INTERSECT', 'UNION']}
        self.my_diagnose_graph.update(data_change)

        expected = {"lable": [
            'Asthma, unspecified without mention of status asthmaticus',
            'Routine general medical examination at a health care facility',
            'Cough',
            'Acute upper respiratory infections of unspecified site',
            'Unspecified essential hypertension',
            'Unspecified chest pain',
            'Acute pharyngitis',
            'Acute bronchitis',
            'Allergic rhinitis, cause unspecified',
            'Shortness of breath'
        ], 'data': [43, 29, 27, 22, 22, 21, 21, 20, 20, 19]}
        actual = self.my_diagnose_graph.data
        self.assertEqual(expected, actual)


class GraphDataDiagnoseGenderCountTestCaste(unittest.TestCase):
    def setUp(self):
        self.my_diagnose_graph = GraphDataDiagnoseGenderCount()

    def test_result(self):
        expected = {"lable": [
            'Asthma, unspecified without mention of status asthmaticus',
            'Cough',
            'Routine general medical examination at a health care facility',
            'Extrinsic asthma without mention of status asthmaticus',
            'Acute upper respiratory infections of unspecified site',
            'Allergic rhinitis, cause unspecified',
            'Other dyspnea and respiratory abnormality',
            'Acute pharyngitis',
            'Routine infant or child health check',
            'Fever'
        ], 'data': [133, 87, 81, 73, 71, 59, 58, 56, 48, 46],
            'M': [82, 53, 51, 43, 43, 36, 38, 34, 30, 33],
            'F': [51, 34, 30, 30, 28, 23, 20, 22, 18, 13]}

        actual = self.my_diagnose_graph.data
        self.assertEqual(expected, actual)

    def test_updated_result(self):
        c_dimcode = r'\Diagnoses\(M00-M99) Dise~6mvn\(M00-M25) Arth~kgqv'
        c_dimcode2 = r'\Diagnoses\(I00-I99) Dise~3w8h'
        data_change = {'selection': [['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode],
                                     ['concept_cd', 'concept_dimension', 'concept_path', 'LIKE', c_dimcode2]],
                       'operator': ['INTERSECT', 'UNION']}
        self.my_diagnose_graph.update(data_change)

        expected = {"lable": [
            'Asthma, unspecified without mention of status asthmaticus',
            'Routine general medical examination at a health care facility',
            'Cough',
            'Acute upper respiratory infections of unspecified site',
            'Unspecified essential hypertension',
            'Unspecified chest pain',
            'Acute pharyngitis',
            'Acute bronchitis',
            'Allergic rhinitis, cause unspecified',
            'Shortness of breath'
        ], 'data': [43, 29, 27, 22, 22, 21, 21, 20, 20, 19],
            'M': [25, 20, 16, 13, 10, 10, 12, 11, 12, 12],
            'F': [18, 9, 11, 9, 12, 11, 9, 9, 8, 7]}
        actual = self.my_diagnose_graph.data
        self.assertEqual(expected, actual)


def test_suite():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(GraphDataAgeDistributionTestCase))
    suite.addTest(unittest.makeSuite(GraphDataDiagnoseCountTestCaste))
    suite.addTest(unittest.makeSuite(GraphDataGenderDistributionTestCase))
    suite.addTest(unittest.makeSuite(GraphDataPatientNumberTestCase))
    suite.addTest(unittest.makeSuite(GraphDataDiagnoseGenderCountTestCaste))


    return suite


if __name__ == '__main__':
    unittest.main()
