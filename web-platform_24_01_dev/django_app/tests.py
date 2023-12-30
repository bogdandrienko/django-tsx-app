import contextlib
import datetime
import sqlite3

import requests
from django.test import TestCase


# Create your tests here.
def correct():
    with contextlib.closing(sqlite3.connect(f"../database/idea.db")) as connection:
        cursor = connection.cursor()
        _query = """
        select id, created from idea
        """
        cursor.execute(_query)
        connection.commit()
        rows = cursor.fetchall()
        print(rows)

        for row in rows:
            id = int(row[0])
            created = datetime.datetime.strptime(str(row[1]), "%Y-%m-%d %H:%M:%S.%f").strftime("%d.%m.%Y %H:%M:%S")
            _query = """
update idea 
SET  created = :created
WHERE id = :id
"""
            cursor.execute(
                _query,
                {
                    "created": created,
                    "id": id,
                },
            )
            connection.commit()


# correct()


def test_sql():
    _query = r"""
WITH b
     AS (SELECT GETPREDEFINEDTIMEFROM('за указанную смену', GETCURSHIFTNUM(0, SYSDATE), GETCURSHIFTDATE(0, SYSDATE)) SDATEFROM,
                GETPREDEFINEDTIMETO('за указанную смену', GETCURSHIFTNUM(0, SYSDATE), GETCURSHIFTDATE(0, SYSDATE))   SDATETO
         FROM   DUAL)
SELECT s.TASKDATE,
       s.SHIFT,
       s.TIMELOAD,
       --s.TIMEUNLOAD,
       --s.TIMELOAD_NEXT,
       s.VEHID,
       s.SHOVID,
       s.WORKTYPE,
       s.WEIGHT,
       ROUND((SELECT AVG(WEIGHT)
              FROM   EVENTSTATEARCHIVE
              WHERE  VEHID = s.VEHID
                     --AND SPEED > :param_min_speed
                     --AND WEIGHT between :param_min_weight and :param_max_weight                                                                
                     AND TIME BETWEEN s.TIMEUNLOAD AND s.TIMELOAD_NEXT), 0) AVWEIGHT_EMPTY
FROM   (SELECT VEHID,
               SHOVID,
               TIMELOAD,
               TIMEUNLOAD,
               NVL(LEAD(TIMELOAD)
                     over (
                       PARTITION BY VEHID
                       ORDER BY TIMELOAD), B.SDATETO) TIMELOAD_NEXT,
               WEIGHT,
               WORKTYPE,
               GETCURSHIFTDATE(0, TIMELOAD)           taskdate,
               GETCURSHIFTNUM(0, TIMELOAD)            shift
        FROM   VEHTRIPS
               inner join b
                       ON TIMELOAD BETWEEN B.SDATEFROM AND B.SDATETO
                          AND TIMEUNLOAD BETWEEN B.SDATEFROM AND B.SDATETO
        WHERE  SHOVID NOT LIKE '%Неопр.%'
               AND ( TRIM(UPPER(WORKTYPE)) NOT LIKE ( '%ВКП СКАЛА%' )
                     AND TRIM(UPPER(WORKTYPE)) NOT LIKE ( '%ВКП ЩЕБЕНЬ%' )
                     AND TRIM(UPPER(WORKTYPE)) NOT LIKE ( '%ВКП%' )
                     AND TRIM(UPPER(WORKTYPE)) NOT LIKE ( '%ПСП%' )
                     AND TRIM(UPPER (UNLOADID)) NOT LIKE ( '%АВТОДОРОГА%' )
                     AND TRIM(UPPER (UNLOADID)) NOT LIKE ( '%ВНЕ ОТВАЛА%' )
                     AND TRIM(UPPER (UNLOADID)) NOT LIKE ( '%ДОРОГА ОБЩЕГО ПОЛЬЗОВАНИЯ%' )
                     AND TRIM(UPPER (WORKTYPE)) NOT LIKE ( '%ВСП%' )
                     AND TRIM(UPPER (WORKTYPE)) NOT LIKE ( '%СНЕГ%' ) )
        ORDER  BY LENGTH(VEHID),
                  VEHID,
                  TIMELOAD) s
ORDER  BY TIMELOAD,
          VEHID 
"""
    _query = r"""
SELECT *
FROM   EVENTMAP
WHERE MOID = '101'
"""

    response = requests.post("http://127.0.0.1:8000/api/proxy/sql/", data={"query": _query.strip().encode(encoding="utf-8")})
    print("response: ", response.json())


test_sql()
