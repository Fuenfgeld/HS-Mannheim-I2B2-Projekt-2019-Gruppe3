import psycopg2

active = False


# Anmeldnung an die Datanbank
def config():
    user = "i2b2"
    password = "demouser"
    host = "129.206.7.75"
    db = "i2b2"
    pg_config = "user='{}' password='{}' host='{}' dbname='{}'".format(user, password, host, db)
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
