import utils


def create_tables():
    create_users_table()
    create_tokens_table()
    create_logs_table()

    """
    select * from sqlite_master;
    """

    """
    DELETE FROM logs;
    VACUUM;
    """


def create_users_table():
    #         Utils.db_query_sqlite(
    #             query="""
    # CREATE TABLE IF NOT EXISTS users
    # (
    # id INTEGER PRIMARY KEY AUTOINCREMENT,
    # email TEXT UNIQUE,
    # password TEXT,
    # position TEXT DEFAULT 'user',
    # datetime_joined TEXT DEFAULT CURRENT_TIMESTAMP
    # )
    # """
    #         )

    print("users: ", utils.db_query_sqlite(query="SELECT * FROM users", many=True))
    # Utils.db_query_sqlite(
    #     query="""INSERT INTO users (email, password) VALUES (?, ?)""",
    #     args=("admin@gmail.com", "admin123"),
    # )
    # print("users: ", Utils.db_query_sqlite(query="SELECT * FROM users", many=True))


def create_tokens_table():
    #         Utils.db_query_sqlite(
    #             query="""
    # CREATE TABLE IF NOT EXISTS tokens
    # (
    # id INTEGER PRIMARY KEY AUTOINCREMENT,
    # user_id INTEGER,
    # token_access TEXT,
    # datetime_elapsed TEXT DEFAULT CURRENT_TIMESTAMP
    # )
    # """
    #         )

    print("tokens: ", utils.db_query_sqlite(query="SELECT * FROM tokens", many=True))


def create_logs_table():
    #         Utils.db_query_sqlite(
    #             query="""
    # CREATE TABLE IF NOT EXISTS logs
    # (
    # id INTEGER PRIMARY KEY AUTOINCREMENT,
    # user_id INTEGER,
    # ip TEXT,
    # path TEXT,
    # method TEXT,
    # data TEXT,
    # created TEXT DEFAULT CURRENT_TIMESTAMP
    # )
    # """
    #         )

    print("logs: ", utils.db_query_sqlite(query="SELECT * FROM logs", many=True))


def create_dumptrucks_speed_report_table():
    # Utils.db_query_sqlite(
    #     query="""
    # DROP TABLE dumptrucks_speed_report
    # """, many=False)
    utils.db_query_sqlite(
        query="""
CREATE TABLE IF NOT EXISTS dumptrucks_speed_report
(
id INTEGER PRIMARY KEY AUTOINCREMENT,
veh_id TEXT,
description TEXT,
taskdate TEXT,
shift INTEGER,
author TEXT,
updated TEXT DEFAULT CURRENT_TIMESTAMP
)
""",
        many=False,
    )

    print(
        "dumptrucks_speed_report: ",
        utils.db_query_sqlite(query="SELECT * FROM dumptrucks_speed_report", many=True),
    )


if __name__ == "__main__":
    pass
