import psycopg2
from databaseconfigfile import i2b2_demo_config
active = False


# Anmeldnung an die Datanbank
def config():
    pg_config = i2b2_demo_config()
    return pg_config


def connect():
    con = None
    try:
        if active:
            return con
        con = psycopg2.connect(config())
        return con
    except:
        print("Error")


def select(sql_query):
    sql_query = (str(sql_query)).replace('\\', '\\\\')
    con = connect()
    cur = con.cursor()
    cur.execute(sql_query)
    data = cur.fetchall()
    cur.close()

    return data


def disconnect():
    if active:
        connect().close()
    else:
        print("Keine Datenbank angebunden")
