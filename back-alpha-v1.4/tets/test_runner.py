# tests/runner.py
import unittest

# import your tets modules
from tets import test_list_into_tree_converter, test_db_connector, test_navigation_data, test_tree_node


# add tests to the tets suite
tests = list()
tests.extend(test_db_connector.test_suite())
tests.extend(test_list_into_tree_converter.test_suite())
tests.extend(test_navigation_data.test_suite())
tests.extend(test_tree_node.test_suite())
# initialize the tets suite
suite = unittest.TestSuite(tests)

# initialize a runner, pass suite and run it
runner = unittest.TextTestRunner(verbosity=3)
runner.run(suite)
