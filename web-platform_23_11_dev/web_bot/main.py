import telebot
from telebot import types
import json
import datetime
import requests
import threading
import time
import oracledb

# @csrf_exempt
def proxy_web(request):
    if request.method != "POST":
        return JsonResponse(data={"message": "Method not allowed"}, status=400)
    try:
        bot_token = "6619466319:AAFQ5XcFnDIR1PWCVrT4GONq6LiD_ceYkZk"
        user_list = [x.strip() for x in str(request.POST["user_list"]).split(",")]
        text = str(request.POST["text"])

        for user in user_list:
            try:
                response = requests.post(url=f"https://api.telegram.org/bot{bot_token}/sendMessage",
                                         data={"chat_id": user, "text": text})  # , verify=False
                if response.status_code != 200:
                    raise Exception(response.status_code)
            except Exception as error:
                print(f"Error: {error}")
                response = requests.post(url=f"https://api.telegram.org/bot{bot_token}/sendMessage",
                data={"chat_id": user, "text": text})
                print(response.status_code)
        return JsonResponse(data={"message": "OK"}, status=200)
    except Exception as error:
        print(f"Error: {error}")
        return JsonResponse(data={"message": str(error)}, status=400)

bot_token = "6619466319:AAFQ5XcFnDIR1PWCVrT4GONq6LiD_ceYkZk"
proxy = "https://poleznoe.pythonanywhere.com/api/proxy/"  # "http://127.0.0.1:8000/api/proxy/"
user_list = "1289279426"  # "1289279426,1289279427"
start_loop_delay = 1
loop_delay = 60 * 2 + 50
minute_list = [0, 1, 2]
hours_list = [x for x in range(0, 24)]  # [8, 20]
bot = telebot.TeleBot(bot_token)


@bot.message_handler(commands=["start"])
def f_start(message):
    commands = """
<strong>Я буду присылать статистику оперативной производительности за прошлый час!</strong>

<b>Ниже список команд:</b>

<i>Базовые:</i>
/start - начальное меню
/chat_id - получить свой id, для регистрации в боте
"""
    print(message.chat.id, message)
    bot.send_message(message.chat.id, commands, parse_mode="html", reply_markup=types.InlineKeyboardMarkup())


@bot.message_handler(commands=["chat_id"])
def f_chat_id(message):
    bot.send_message(message.chat.id, f"Ваш id: {message.chat.id}", parse_mode="html", reply_markup=types.InlineKeyboardMarkup())


class Data:
    @staticmethod
    def request_to_oracle(query: str, args: dict = None, many: bool = True) -> tuple | list[tuple] | None:
        try:
            oracledb.init_oracle_client(lib_dir=r"C:\ADDITIONAL\web_platform\instantclient_21_9_lite")
        except Exception as err:
            print(err)
            pass
        try:
            with oracledb.connect("DISPATCHER/disp@172.30.23.16/PITENEW") as connection:
                with connection.cursor() as cursor:
                    if args is None:
                        args = {}
                    cursor.execute(query, args)
                    if many:
                        return cursor.fetchall()
                    return cursor.fetchone()
        except Exception as err:
            raise err

    @staticmethod
    def get_speed(param_date: datetime.datetime, param_shift: int) -> (float, float, float):  # Ср.ск.общ.    Ср.ск.груж.     Ср.ск.порожн.
        _query = """
WITH b
     AS (SELECT GETPREDEFINEDTIMEFROM('за указанную смену', :param_shift, :param_date) SDATEFROM,
                GETPREDEFINEDTIMETO('за указанную смену', :param_shift, :param_date)   SDATETO
         FROM   DUAL)
SELECT ROUND(SUM(AVGSPEEDALL * TRIPS) / SUM(TRIPS), 2)   AVG_SPEED_ALL,
       ROUND(SUM(AVSPEED * TRIPS) / SUM(TRIPS), 2)       AVG_SPEED_LOAD,
       ROUND(SUM(AVSPEED_EMPTY * TRIPS) / SUM(TRIPS), 2) AVG_SPEED_UNLOAD
       --ROUND(SUM(AVGLENGTHALL * TRIPS) / SUM(TRIPS), 2)  AVG_LENGTH_ALL,
       --ROUND(SUM(LENGTH * TRIPS) / SUM(TRIPS), 2)        AVG_LENGTH_LOAD,
       --ROUND(SUM(UNLOADLENGTH * TRIPS) / SUM(TRIPS), 2)  AVG_LENGTH_UNLOAD
FROM   (SELECT q.VEHID,
               SUM(q.TRIP)                                             trips,
               ROUND(AVG(q.AVSPEED), 2)                                AVSPEED,
               ROUND(AVG(q.AVSPEED_EMPTY), 2)                          AVSPEED_EMPTY,
               ROUND(( AVG(q.AVSPEED) + AVG(q.AVSPEED_EMPTY) ) / 2, 2) AVGSPEEDALL,
               ROUND(AVG(q.LENGTH), 2)                                 LENGTH,
               ROUND(AVG(q.UNLOADLENGTH), 2)                           UNLOADLENGTH,
               ROUND(( AVG(q.LENGTH) + AVG(q.UNLOADLENGTH) ) / 2, 2)   AVGLENGTHALL
        FROM   (SELECT s.VEHID,
                       s.VEHCODE,
                       ROUND(AVG(s.LENGTH), 2)                                                 LENGTH,
                       ROUND(AVG(s.UNLOADLENGTH), 2)                                           UNLOADLENGTH,
                       s.TIMELOAD,
                       s.TIMEUNLOAD,
                       s.TIMELOAD_NEXT,
                       s.AVSPEED,
                       s.TASKDATE,
                       TRIP,
                       SUM(st.MOVELENGTH / 1000) / SUM(( st.MOVELENGTH / 1000 ) / st.AVGSPEED) AVSPEED_EMPTY
                FROM   (SELECT VEHID,
                               VEHCODE,
                               LENGTH,
                               UNLOADLENGTH,
                               TIMELOAD,
                               TIMEUNLOAD,
                               NVL(LEAD(TIMELOAD)
                                     over (
                                       PARTITION BY VEHCODE
                                       ORDER BY TIMELOAD), B.SDATETO) TIMELOAD_NEXT,
                               AVSPEED,
                               GETCURSHIFTDATE(0, TIMELOAD)           taskdate,
                               1                                      trip
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
                       left join SIMPLETRANSITIONS st
                              ON st.VEHCODE = s.VEHCODE
                                 AND st.AVGSPEED > 5
                                 AND ( st.TIMEGO BETWEEN s.TIMEUNLOAD AND s.TIMELOAD_NEXT )
                                 AND st.MOVELENGTH > 0
                GROUP  BY s.VEHID,
                          s.VEHCODE,
                          s.TIMELOAD,
                          s.TIMEUNLOAD,
                          s.TIMELOAD_NEXT,
                          s.AVSPEED,
                          s.TASKDATE,
                          s.TRIP)q
        GROUP  BY q.VEHID
        ORDER  BY LENGTH(VEHID),
                  VEHID) 
"""

        _speed_all, _speed_load, _speed_unload = Data.request_to_oracle(
            args={"param_date": param_date, "param_shift": param_shift},
            many=True,
            query=_query,
        )[0]
        return _speed_all, _speed_load, _speed_unload


def get_message(date: datetime.datetime, shift: int) -> str:
    _speed_all, _speed_load, _speed_unload = Data.get_speed(param_date=date, param_shift=shift)

    _ = f"""
ИТОГО ЗА СМЕНУ:

ОБЪЁМЫ:
Общ.объём - 18000 [ск:6000, рыхл:8000, руд:4000]
203 - 12000 [ск:6000, рыхл:8000, руд:4000]
204 - 12000 [ск:6000, рыхл:8000, руд:4000]
206 - 12000 [ск:6000, рыхл:8000, руд:4000]

СКОРОСТЬ:
Ср.скорость - {_speed_all} [груж:{_speed_load}, порожн:{_speed_unload}]
внутрен отвал - 20.6 [груж:16.6, порожн:20.2]
внутрен отвал - 20.6 [груж:16.6, порожн:20.2]
внутрен отвал - 20.6 [груж:16.6, порожн:20.2]

ЗАГРУЗКА:
Ср.загрузка - 92.6 т [исправ:93.2, неисправ:70.2]

РЕЙСЫ
Общ.рейсы - 40 [ск:12, рыхл:8, руд:7]

РАССТОЯНИЯ:
Ср.расстояние - 2.6 [груж:16.6, порожн:20.2]
внутрен отвал - 20.6 [груж:16.6, порожн:20.2]
внутрен отвал - 20.6 [груж:16.6, порожн:20.2]
внутрен отвал - 20.6 [груж:16.6, порожн:20.2]
"""

    return f"""
ИТОГО ЗА СМЕНУ({date.strftime('%d.%m.%Y')}|{shift}):

СКОРОСТЬ:
Ср.скорость - {_speed_all} [груж:{_speed_load}, порожн:{_speed_unload}]
"""


def loop_start():
    print("\ninfinity loop started...\n")
    time.sleep(start_loop_delay)

    try:
        while True:
            date_time = datetime.datetime.now()

            cur_date = date_time
            cur_shift = 1 if cur_date.hour < 8 or cur_date.hour >= 20 else 2

            prev_date = cur_date if cur_shift == 2 else cur_date - datetime.timedelta(days=1)
            prev_shift = 1 if cur_shift == 2 else 2

            print(f"try to send message {date_time}")
            if date_time.hour in hours_list and date_time.minute in minute_list:
                pass
            else:
                print("pass")
                time.sleep(loop_delay)
                continue

            message = get_message(date=prev_date, shift=prev_shift)
            # message = "...данные данные..."
            text = f"""Данные от {date_time.strftime("%d.%m.%Y %H:%M")}\n\n{message}"""
            try:
                response = requests.post(url=proxy, data={"user_list": user_list, "text": text})
                print(response.status_code)
                if response.status_code != 200:
                    raise Exception(response.status_code)
            except Exception as error:
                print(f"Error: {error}")
                response = requests.post(url=proxy, data={"user_list": user_list, "text": text})
                print(response.status_code)
            time.sleep(loop_delay)
    except Exception as error:
        print(f"Error: {error}")
        print("infinity loop stopped...")


if __name__ == "__main__":
    # infinity loop
    threading.Thread(target=loop_start).start()

    # bot
    print("bot started...")
    bot.infinity_polling()
    print("bot stopped...")
