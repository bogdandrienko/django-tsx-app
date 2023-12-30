class Claim:
    @staticmethod
    def table() -> str:
        return """
CREATE TABLE IF NOT EXISTS Claim (
    id INTEGER PRIMARY KEY UNIQUE NOT NULL,
    author TEXT default '',
    description TEXT default '',
    tech TEXT default '',
    is_active INTEGER default 0,
    updated TEXT default '',
    created TEXT default ''
)
;"""

    @staticmethod
    def insert() -> str:
        return """
INSERT INTO Claim (author, description, tech, is_active, updated, created)
VALUES (:author, :description, :tech, :is_active, :updated, :created)
;"""

    @staticmethod
    def select_all() -> str:
        return """
SELECT id, author, description, tech, is_active, updated, created
from Claim 
order by is_active DESC, created ASC, updated ASC
;"""

    @staticmethod
    def select_one() -> str:
        return """
SELECT id, author, description, tech, is_active, updated, created
from Claim
WHERE id = :id
;"""

    @staticmethod
    def select_active() -> str:
        return """
SELECT count(*) 
from Claim 
where is_active = '1'
;"""

    @staticmethod
    def update() -> str:
        return """
UPDATE Claim
SET is_active = NOT is_active, updated = :updated
WHERE id = :id
;"""


class Idea:
    @staticmethod
    def table() -> str:
        return """
CREATE TABLE IF NOT EXISTS idea (
    id INTEGER PRIMARY KEY UNIQUE NOT NULL,
    author TEXT default '',
    subdivision TEXT default '',
    position TEXT default '',
    phone TEXT default '',
    email TEXT default '',
    title TEXT default '',
    description TEXT default '',
    place TEXT default '',
    effect TEXT default '',
    need TEXT default '',
    is_feedback INTEGER default 0,
    link TEXT default '',
    created TEXT default ''
)
;"""

    @staticmethod
    def insert() -> str:
        return """
INSERT INTO idea (author, subdivision, position, phone, email, title, description, place, effect, need, is_feedback, link, created)
VALUES (:author, :subdivision, :position, :phone, :email, :title, :description, :place, :effect, :need, :is_feedback, :link, :created)
;"""

    @staticmethod
    def select_all() -> str:
        return """
SELECT id, author, subdivision, position, phone, email, title, description, place, effect, need, is_feedback, link, created
from idea 
order by created ASC
;"""


class CenterSticking:
    @staticmethod
    def table() -> str:
        return """
CREATE TABLE IF NOT EXISTS trips (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    subsystem TEXT UNIQUE NOT NULL,
    message TEXT NOT NULL,
    date_time_subsystem DATETIME NOT NULL,
    date_time_server DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
)
;"""

    @staticmethod
    def insert_or_replace() -> str:
        return """
INSERT OR REPLACE INTO trips 
(subsystem, message, date_time_subsystem, date_time_server)
VALUES 
(:subsystem, :message, :date_time_subsystem, :date_time_server)
;"""

    @staticmethod
    def select_all() -> str:
        return """
SELECT id, subsystem, message, date_time_subsystem, date_time_server
from trips 
order by id
;"""


class Center:
    @staticmethod
    def table_event_last() -> str:
        return """
CREATE TABLE IF NOT EXISTS event_last (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    subsystem TEXT UNIQUE NOT NULL,
    message TEXT NOT NULL,
    date_time_subsystem DATETIME NOT NULL,
    date_time_server DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
)
;"""

    @staticmethod
    def table_event_history() -> str:
        return """
CREATE TABLE IF NOT EXISTS event_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    subsystem TEXT NOT NULL,
    message TEXT NOT NULL,
    date_time_subsystem DATETIME NOT NULL,
    date_time_server DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
)
;"""

    @staticmethod
    def insert_or_replace_event_last() -> str:
        return """
INSERT OR REPLACE INTO event_last 
(subsystem, message, date_time_subsystem, date_time_server)
VALUES 
(:subsystem, :message, :date_time_subsystem, :date_time_server)
;"""

    @staticmethod
    def insert_event_history() -> str:
        return """
INSERT INTO event_history
(subsystem, message, date_time_subsystem, date_time_server)
VALUES
(:subsystem, :message, :date_time_subsystem, :date_time_server)
;"""

    @staticmethod
    def select_all_event_last() -> str:
        return """
SELECT id, subsystem, message, date_time_subsystem, date_time_server
from event_last 
order by id
;"""


class Stoppages:
    @staticmethod
    def get_empty_peregon_report_dumptrucks_new() -> str:
        return """
    SELECT VEHID,
           TIME,
           X
    FROM   EVENTSTATEARCHIVE 
    WHERE TIME BETWEEN GETPREDEFINEDTIMEFROM('за указанную смену', :param_shift, :param_date) AND 
                        GETPREDEFINEDTIMETO('за указанную смену', :param_shift, :param_date)
    AND (X > 80000 and X < 90000) AND (Y > 80000 AND Y < 90000)
    ORDER BY TIME ASC 
    """

    @staticmethod
    def get_stoppages_report_veh_operators() -> str:
        return """
SELECT stk.VEHID,
       TRIM(d.FAMNAME)
       || ' '
       || TRIM(d.FIRSTNAME)
       || ' '
       || TRIM(d.SECNAME) FIO_VEHID
FROM   SHIFTTASKS stk
       inner join DRIVERS d
               ON stk.TABELNUM = d.TABELNUM
WHERE  stk.TASKDATE = :param_date
       AND stk.SHIFT = :param_shift
ORDER  BY VEHID 
"""

    @staticmethod
    def get_stoppages_report_veh_dvs_new() -> str:
        return """
    SELECT 
        VEHID,
        TIME,
        SPEED,
        MOTOHOURS
    FROM   EVENTSTATEARCHIVE t1
    WHERE  TIME BETWEEN GETPREDEFINEDTIMEFROM('за указанную смену', :param_shift, :param_date) 
                    AND GETPREDEFINEDTIMETO('за указанную смену', :param_shift, :param_date) 
                    --and vehid = 141
    ORDER  BY TIME DESC
        """


class Speed:
    @staticmethod
    def get_target_report_avg_speed_custom() -> str:
        return """
    WITH b
         AS (SELECT GETPREDEFINEDTIMEFROM('за указанную смену', :param_shift, :param_date) SDATEFROM,
                    GETPREDEFINEDTIMETO('за указанную смену', :param_shift, :param_date)   SDATETO
             FROM   DUAL)
    SELECT q.SHOVID,
           q.WORKTYPE,
           q.VEHID,
           TRIM(d.FAMNAME)
           || ' '
           || TRIM(d.FIRSTNAME)
           || ' '
           || TRIM(d.SECNAME)                                                                                            fio,
           ROUND(q.AVG_WEIGHT, 2)                                                                                        weight,
           ROUND(q.AVG_LENGTH_LOAD, 2)                                                                                   length_move_load,
           q.TIMELOAD                                                                                                    TIME_LOAD,
           q.TIMEGOAFTERLOAD                                                                                             TIME_MOVE_LOAD,
           q.TIMEUNLOAD                                                                                                  TIME_UNLOAD,
           q.TIME_INSERTING                                                                                              TIME_MOVE_UNLOAD,
           q.TIMELOAD_NEXT                                                                                               TIME_LOAD_NEXT,
           ROUND(( q.TIMEGOAFTERLOAD - q.TIMELOAD ) * 24 * 60, 2)                                                        DURATION_LOADING,
           ROUND(( q.TIMEUNLOAD - q.TIMEGOAFTERLOAD ) * 24 * 60, 2)                                                      DURATION_MOVE_LOAD,
           ROUND(( q.TIME_INSERTING - q.TIMEUNLOAD ) * 24 * 60, 2)                                                       DURATION_UNLOADING,
           ROUND(( q.TIMELOAD_NEXT - q.TIME_INSERTING ) * 24 * 60, 2)                                                    DURATION_MOVE_UNLOAD,
           ROUND(( q.TIMELOAD_NEXT - q.TIMELOAD ) * 24 * 60, 2)                                                          DURATION_TRIP,
           ROUND(q.AVG_SPEED, 2)                                                                                         SPEED_LOAD_ASD,
           ROUND(( ROUND(q.AVG_LENGTH_LOAD, 2) / ROUND(( q.TIMEUNLOAD - q.TIMEGOAFTERLOAD ) * 24, 2) ), 2)               SPEED_LOAD_CUSTOM,
           ROUND(q.AVG_SPEED - ( ROUND(q.AVG_LENGTH_LOAD, 2) / ROUND(( q.TIMEUNLOAD - q.TIMEGOAFTERLOAD ) * 24, 2) ), 2) SPEED_DIFF
    FROM   (SELECT s.VEHID,
                   s.VEHCODE,
                   s.SHOVID,
                   s.TASKDATE,
                   s.SHIFT,
                   NVL(s.AVSPEED, 0)                                                               AVG_SPEED,
                   NVL(SUM(st.MOVELENGTH / 1000) / SUM(( st.MOVELENGTH / 1000 ) / st.AVGSPEED), 0) AVG_SPEED_EMPTY,
                   NVL(s.WEIGHT, 0)                                                                AVG_WEIGHT,
                   NVL(s.LENGTH, 0)                                                                AVG_LENGTH_LOAD,
                   NVL(s.UNLOADLENGTH, 0)                                                          AVG_LENGTH_UNLOAD,
                   NVL(s.UNLOADHEIGHT, 0) - NVL(s.LOADHEIGHT, 0)                                   AVG_HEIGHT,
                   NVL(s.WORKTYPE, 0)                                                              WORKTYPE,
                   NVL(( s.TIMEUNLOAD - s.TIMELOAD ) * 24 * 60, 0)                                 WORKTIME,
                   s.TIMELOAD,
                   s.TIMEGOAFTERLOAD,
                   s.TIMEUNLOAD,
                   s.TIME_INSERTING,
                   s.TIMELOAD_NEXT
            FROM   (SELECT VEHID,
                           VEHCODE,
                           SHOVID,
                           TIMELOAD,
                           vt.TIMEGOAFTERLOAD,
                           TIMEUNLOAD,
                           vt.TIME_INSERTING,
                           NVL(LEAD(TIMELOAD)
                                 over (
                                   PARTITION BY VEHCODE
                                   ORDER BY TIMELOAD), B.SDATETO) TIMELOAD_NEXT,
                           AVSPEED,
                           WEIGHT,
                           LENGTH,
                           UNLOADLENGTH,
                           LOADHEIGHT,
                           UNLOADHEIGHT,
                           WORKTYPE,
                           GETCURSHIFTDATE(0, TIMELOAD)           taskdate,
                           GETCURSHIFTNUM(0, TIMELOAD)            shift
                    FROM   VEHTRIPS vt
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
                   left join SIMPLETRANSITIONS st
                          ON st.VEHCODE = s.VEHCODE
                             AND st.AVGSPEED > 5
                             AND st.AVGSPEED < 70
                             AND ( st.TIMEGO BETWEEN s.TIMEUNLOAD AND s.TIMELOAD_NEXT )
                             AND st.MOVELENGTH > 0
            GROUP  BY s.VEHID,
                      s.VEHCODE,
                      s.SHOVID,
                      s.TASKDATE,
                      s.SHIFT,
                      s.AVSPEED,
                      s.WEIGHT,
                      s.LENGTH,
                      s.UNLOADLENGTH,
                      s.LOADHEIGHT,
                      s.UNLOADHEIGHT,
                      s.WORKTYPE,
                      s.TIMELOAD,
                      s.TIMEGOAFTERLOAD,
                      s.TIMEUNLOAD,
                      s.TIME_INSERTING,
                      s.TIMEUNLOAD,
                      s.TIMELOAD_NEXT)q
           left join SHIFTTASKS stk
                  ON stk.TASKDATE = q.TASKDATE
                     AND stk.SHIFT = q.SHIFT
                     AND stk.VEHID = q.VEHID
           left join DRIVERS d
                  ON stk.TABELNUM = d.TABELNUM
    ORDER  BY TIME_LOAD 
    """


class Pto:
    @staticmethod
    def get_pto_monitoring_sticking() -> str:
        return """
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
