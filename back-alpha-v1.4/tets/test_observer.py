import unittest
from observer import Observer
from graph_data import GraphDataPatientNumber


class ObserverTestCase(unittest.TestCase):

    def setUp(self):
        self.my_observer = Observer()

    def test_register(self):
        test_graph = GraphDataPatientNumber()
        self.my_observer.register(test_graph)
        actual = self.my_observer.subscribers.pop()
        self.assertEqual(test_graph, actual)

    def test_unregister(self):
        test_graph = GraphDataPatientNumber()
        self.assertTrue(self.my_observer.register(test_graph))


def test_suite():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(Observer))

    return suite
