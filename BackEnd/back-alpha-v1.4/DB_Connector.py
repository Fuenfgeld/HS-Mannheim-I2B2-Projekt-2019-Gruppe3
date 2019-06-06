from databaseconfigfile import i2b2_demo_config
import psycopg2


class DBConnector(object):
    _instance = None
    # ToDo SearchPath in config datei laden
    _db_config = i2b2_demo_config()

    def __new__(cls):
        if cls._instance is None:
            cls._instance = object.__new__(cls)
            db_config = cls._db_config
            try:
                print('connecting to PostgreSQL database...')
                connection = DBConnector._instance.connection = psycopg2.connect(**db_config)
                cursor = DBConnector._instance.cursor = connection.cursor()
                cursor.execute('SELECT VERSION()')
                db_version = cursor.fetchone()
                cursor.execute('set search_path to public,i2b2demodata,i2b2metadata')

            except Exception as error:
                print('Error: connection not established {}'.format(error))
                DBConnector._instance = None

            else:
                print('connection established\n{}'.format(db_version[0]))

        return cls._instance

    def __init__(self):
        self.connection = self._instance.connection
        self.cursor = self._instance.cursor

    def query(self, sql_query):
        try:
            sql_query = (str(sql_query)).replace('\\', '\\\\')
            self.cursor.execute(sql_query)
            result = self.cursor.fetchall()
        except Exception as error:
            print('error execting query "{}", error: {}'.format(sql_query, error))
            return None
        else:
            return result

    def __del__(self):
        self.connection.close()
        self.cursor.close()
