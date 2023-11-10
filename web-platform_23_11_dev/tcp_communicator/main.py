import contextlib
import json
import sys
import datetime
import random
import threading
import time
import sqlite3
from PyQt6 import uic
from PyQt6.QtWidgets import QWidget
from PyQt6.QtGui import QAction
from PyQt6.QtWidgets import QApplication, QSystemTrayIcon, QMenu, QStyle
import asyncio
import aiohttp
import aiofiles
import aiosqlite


class Ui(QWidget):
    headers: dict = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (HTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"}
    url: str = "http://127.0.0.1:8000/api/communicator"
    startup_delay: int = 60
    save_delay: int = 5
    send_delay: int = 7
    count_batch_records: int = 20
    src_database: str = "src/database.db"
    src_logs: str = f'src/logs/{datetime.datetime.now().strftime("%Y_%m_%d_%H")}.txt'
    date_time_str: str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    oracle_db_connection_string = "DISPATCHER/disp@172.30.23.16/PITENEW"

    def __init__(self):
        super().__init__()
        self.ui = uic.loadUi("src/main.ui", self)
        self.is_play = True

        tray_menu = QMenu()

        show_action = QAction("Show", self)
        show_action.triggered.connect(self.show)
        tray_menu.addAction(show_action)

        hide_action = QAction("Hide", self)
        hide_action.triggered.connect(self.hide)
        tray_menu.addAction(hide_action)

        quit_action = QAction("Exit", self)
        quit_action.triggered.connect(self.stop_event)
        tray_menu.addAction(quit_action)

        self.tray_icon = QSystemTrayIcon(self)
        self.tray_icon.setIcon(self.style().standardIcon(QStyle.StandardPixmap.SP_DialogYesButton))
        self.tray_icon.activated.connect(self.restore_window)
        self.tray_icon.setContextMenu(tray_menu)
        self.tray_icon.show()

        self.hide()

        new_thread = threading.Thread(target=self.start_app)
        new_thread.start()

    def closeEvent(self, event):
        event.ignore()
        # self.tray_icon.showMessage("Уведомление", "Описание уведомления", QSystemTrayIcon.MessageIcon.NoIcon, 2000)
        self.hide()

    def stop_event(self):
        self.is_play = False
        time.sleep(7)
        QApplication.quit()

    def restore_window(self, _):
        if self.isHidden():
            self.tray_icon.show()
            self.showNormal()
        else:
            self.tray_icon.show()
            self.hide()

    async def write_log(self, message: str, date_time: str) -> None:
        try:
            async with aiofiles.open(self.src_logs, mode="a") as file:
                await file.write(f"{date_time} {message} \n")
        except Exception as error:
            print(f"ERROR: {error}")

    def start_app(self):
        time.sleep(self.startup_delay)

        thread_worker_saver = threading.Thread(target=self.start_worker_saver)
        thread_worker_saver.start()

        thread_worker_sender = threading.Thread(target=self.start_worker_sender)
        thread_worker_sender.start()

    # TODO WORKER SAVER ##############################################################################################################################
    def start_worker_saver(self):
        # безопасное создание базы данных и таблицы
        with contextlib.closing(sqlite3.connect(self.src_database)) as connection:  # sqlite3.connect(":memory:"))
            with connection as cursor:
                query = """
CREATE TABLE IF NOT EXISTS message (
id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
message TEXT NOT NULL,
datetime TEXT NOT NULL
);
"""
                cursor.execute(query)
                cursor.commit()

        # бесконечный цикл сохранения данных от источника в базу данных(очередь)
        while self.is_play:
            time.sleep(self.save_delay)
            asyncio.run(self.worker_saver())

    async def worker_saver(self):
        date_time = self.date_time_str
        try:
            # двукратная попытка взять данные от источника
            try:
                data = await self.get_data_from_source()
            except Exception as _:
                await asyncio.sleep(1)
                data = await self.get_data_from_source()

            result = json.dumps(data)

            # двукратная сохранить данные в базу данных
            try:
                await self.save_data_to_database(result=result, date_time=date_time)
            except Exception as _:
                await asyncio.sleep(1)
                await self.save_data_to_database(result=result, date_time=date_time)

            # обновление интерфейса
            self.ui.label_time_saver.setText(date_time)
            self.ui.label_message_saver.setText(f"result: {result}")
        except Exception as error:
            message = f"error: {error}"

            # обновление интерфейса
            print(date_time, message)
            self.ui.label_time_saver.setText(date_time)
            self.ui.label_message_saver.setText(message)

            # запись ошибок в файл
            await self.write_log(message=message, date_time=date_time)

    @staticmethod
    async def get_data_from_source() -> dict:
        # взятие данных от источника данных
        _id = random.randint(1, 1000000)
        await asyncio.sleep(1)
        return {"id": _id, "value": _id * 2}

    async def save_data_to_database(self, result: str, date_time: str):
        async with aiosqlite.connect(self.src_database) as connection:
            query = """
INSERT INTO message 
(message, datetime)
VALUES
(?, ?);
"""
            await connection.execute(query, (result, date_time))
            await connection.commit()

    # TODO WORKER SAVER ##############################################################################################################################

    #

    # TODO WORKER SENDER #############################################################################################################################
    def start_worker_sender(self):
        # бесконечный цикл отправки данных из базы данных(очередь) на веб-сервер
        while self.is_play:
            time.sleep(self.send_delay)
            asyncio.run(self.worker_sender())

    async def worker_sender(self):
        date_time = self.date_time_str
        try:
            # двукратная попытка взять данные из базы данных(очередь)
            try:
                data: list[dict] = await self.get_data_from_database()
            except Exception as _:
                await asyncio.sleep(1)
                data: list[dict] = await self.get_data_from_database()

            # отмена отправки, если очередь пуста
            if len(data) == 0:
                return

            # двукратная попытка взять данные из базы данных(очередь)
            try:
                result = await self.send_data_to_server(data={"data": data})
            except Exception as _:
                await asyncio.sleep(1)
                result = await self.send_data_to_server(data={"data": data})

            # двукратная попытка удалить успешно отправленные данные(очередь)
            try:
                await self.delete_data_from_database(data[0]["id"], data[-1]["id"])
            except Exception as _:
                await asyncio.sleep(1)
                await self.delete_data_from_database(data[0]["id"], data[-1]["id"])

            # обновление интерфейса
            self.ui.label_time_sender.setText(date_time)
            self.ui.label_message_sender.setText(f"result: {result}")
        except Exception as error:
            message = f"error: {error}"

            # обновление интерфейса
            print(date_time, message)
            self.ui.label_time_sender.setText(date_time)
            self.ui.label_message_sender.setText(message)

            # запись ошибок в файл
            await self.write_log(message=message, date_time=date_time)

    async def get_data_from_database(self) -> list[dict]:
        # взятие из базы данных первых объектов и отправка на сервер
        async with aiosqlite.connect(self.src_database) as connection:
            query = """
SELECT id, message, datetime
FROM message 
ORDER BY id ASC 
LIMIT ?;
"""
            async with connection.execute(query, (self.count_batch_records,)) as cursor:
                rows = await cursor.fetchall()
                return [{"id": row[0], "message": row[1], "datetime": row[2]} for row in rows]

    async def send_data_to_server(self, data: dict) -> str:
        # отправка данных(bytes) на веб-сервер
        async with aiohttp.ClientSession() as session:
            async with session.post(url=self.url, headers=self.headers, data=json.dumps(data)) as response:
                data = await response.read()
                response_str = data.decode("utf-8")
                if response.status != 200:
                    raise Exception(response_str)
                return response_str

    async def delete_data_from_database(self, id_from: int, id_to: int):
        # удаление успешно отправленных записей из базы данных(очередь)
        async with aiosqlite.connect(self.src_database) as connection:
            query = """
DELETE FROM message
WHERE id BETWEEN ? AND ?
"""
            await connection.execute(query, (id_from, id_to))
            await connection.commit()

    # TODO WORKER SENDER #############################################################################################################################

    #

    # TODO SOURCES ###################################################################################################################################

    def request_to_oracle(self, query: str, args: dict = None, many: bool = True) -> tuple | list[tuple] | None:
        _ = """
sudo su
mkdir -p /opt/oracle
cd /opt/oracle
wget https://download.oracle.com/otn_software/linux/instantclient/214000/instantclient-basic-linux.x64-21.4.0.0.0dbru.zip
unzip instantclient_21_4
apt install libaio1
echo /opt/oracle/instantclient_21_4 > /etc/old.so.conf.d/oracle-instantclient.conf
ldconfig
pip install cx_Oracle
exit
"""
        try:
            oracledb.init_oracle_client(
                lib_dir=r"C:\ADDITIONAL\web_platform\instantclient_21_9_lite"
            )
        except Exception as err:
            print(err)
            pass
        try:
            with oracledb.connect(constants.oracle_db_connection_string) as connection:
                with connection.cursor() as cursor:
                    if args is None:
                        args = {}
                    cursor.execute(query, args)
                    if many:
                        return cursor.fetchall()
                    return cursor.fetchone()
        except Exception as err:
            raise err

    class CommunicatorAsd:
        def communicator_vehtrips(self):
            """Рейсы из базы данных. Для формирования части логики Цифрового Двойника."""

            query = """
WITH prms 
     AS (SELECT GETPREDEFINEDTIMEFROM('за указанную смену', GETCURSHIFTNUM(0, SYSDATE), GETCURSHIFTDATE(0, SYSDATE)) SDATEFROM,
                GETPREDEFINEDTIMETO('за указанную смену', GETCURSHIFTNUM(0, SYSDATE), GETCURSHIFTDATE(0, SYSDATE))   SDATETO
         FROM   DUAL) 
SELECT q.VEHID, 
       TRIM(d.FAMNAME) 
       || ' ' 
       || TRIM(d.FIRSTNAME) 
       || ' ' 
       || TRIM(d.SECNAME)                                     fio, 
       q.SHOVID, 
       ROUND(NVL(q.AVSPEED, -1), 2)                           avgloadspeed, 
       ROUND(NVL(q.AVSPEED_EMPTY, -1), 2)                     avgemptyspeed, 
       ROUND(NVL(( q.AVSPEED + q.AVSPEED_EMPTY ) / 2, -1), 2) avspeed, 
       ROUND(q.WEIGHT, 2)                                     WEIGHT, 
       ROUND(q.LENGTH, 2)                                     LENGTH_FULL, 
       ROUND(q.UNLOADLENGTH, 2)                               UNLOADLENGTH_EMPT, 
       ROUND(q.LENGTH + q.UNLOADLENGTH, 2)                    LENGTH_ALL 
FROM   (SELECT s.VEHID, 
               s.VEHCODE, 
               s.SHOVID, 
               s.WORKTYPE, 
               s.WEIGHT, 
               s.LENGTH, 
               s.UNLOADLENGTH, 
               s.TIMELOAD, 
               s.TIMELOAD_NEXT, 
               s.AVSPEED, 
               s.TASKDATE, 
               s.SHIFT, 
               TRIP, 
               SUM(st.MOVELENGTH / 1000) / SUM(( st.MOVELENGTH / 1000 ) / st.AVGSPEED) AVSPEED_EMPTY
        FROM   (SELECT VEHID, 
                       VEHCODE, 
                       SHOVID, 
                       WORKTYPE, 
                       WEIGHT, 
                       LENGTH, 
                       UNLOADLENGTH, 
                       TIMELOAD, 
                       TIMEUNLOAD, 
                       NVL(LEAD(TIMELOAD) 
                             over ( 
                               PARTITION BY VEHCODE 
                               ORDER BY TIMELOAD), PRMS.SDATETO) TIMELOAD_NEXT, 
                       AVSPEED, 
                       GETCURSHIFTDATE(0, TIMELOAD)              taskdate, 
                       GETCURSHIFTNUM(0, TIMELOAD)               shift, 
                       1                                         trip 
                FROM   VEHTRIPS 
                       inner join prms 
                               ON TIMELOAD BETWEEN PRMS.SDATEFROM AND PRMS.SDATETO 
                                  AND TIMEUNLOAD BETWEEN PRMS.SDATEFROM AND PRMS.SDATETO 
                WHERE  SHOVID NOT LIKE '%Неопр.%' AND AVSPEED > 5 AND AVSPEED < 70
                       AND ( TRIM(UPPER(WORKTYPE)) NOT LIKE ( '%ВКП СКАЛА%' ) 
                             AND TRIM(UPPER(WORKTYPE)) NOT LIKE ( '%ВКП ЩЕБЕНЬ%' ) 
                             AND TRIM(UPPER(WORKTYPE)) NOT LIKE ( '%ВКП%' ) 
                             AND TRIM(UPPER(WORKTYPE)) NOT LIKE ( '%ПСП%' ) 
                             AND TRIM(UPPER (UNLOADID)) NOT LIKE ( '%АВТОДОРОГА%' ) 
                             AND TRIM(UPPER (UNLOADID)) NOT LIKE ( '%ВНЕ ОТВАЛА%' ) 
                             AND TRIM(UPPER (UNLOADID)) NOT LIKE ( '%ДОРОГА ОБЩЕГО ПОЛЬЗОВАНИЯ%' )
                             AND TRIM(UPPER (WORKTYPE)) NOT LIKE ( '%ВСП%' ) 
                             AND TRIM(UPPER (WORKTYPE)) NOT LIKE ( '%СНЕГ%' ) ) 
                ORDER  BY VEHID, 
                          TIMELOAD) s 
               left join SIMPLETRANSITIONS st 
                      ON st.VEHCODE = s.VEHCODE 
                         AND st.AVGSPEED > 5 AND st.AVGSPEED < 70
                         AND ( st.TIMEGO BETWEEN s.TIMEUNLOAD AND s.TIMELOAD_NEXT ) 
                         AND st.MOVELENGTH > 0 
        GROUP  BY s.VEHID, 
                  s.VEHCODE, 
                  s.WORKTYPE, 
                  s.WEIGHT, 
                  s.LENGTH, 
                  s.UNLOADLENGTH, 
                  s.SHOVID, 
                  s.TIMELOAD, 
                  s.TIMELOAD_NEXT, 
                  s.AVSPEED, 
                  s.TASKDATE, 
                  s.SHIFT, 
                  s.TRIP)q 
       left join SHIFTTASKS stk 
              ON stk.TASKDATE = q.TASKDATE 
                 AND stk.SHIFT = q.SHIFT 
                 AND stk.VEHID = q.VEHID 
       left join DRIVERS d 
              ON stk.TABELNUM = d.TABELNUM 
ORDER  BY TIMELOAD 
"""

            trips_raw: list[tuple] = utils.request_to_oracle(
                query=query,
                args={},
                many=True,
            )

            pass




        def communicator_events(self):
            """Сообщения от техники из базы данных. Для формирования части логики Цифрового Двойника."""
            pass

        def communicator_geolocation(self):
            """Данные от последнего местонахождения техники. Для проекта 'позиционирования персонала'."""
            pass

    def communicator_carier(self):
        """Данные от Автоматизированной Станции детекции движения бортов карьера. Для оповещений."""
        pass

    def communicator_asm(self):
        """Данные от Автоматизированной Станции экологического Мониторинга (АСМ). Для оповещений.
        + Нужно вмешиваться в показания системы, для предотвращения отправки критических эмиссий.
        """

        pass

    def communicator_operator_status(self):
        """Данные от систем мониторинга усталости персонала и кругового обзора. Для оповещений."""
        pass

    def communicator_asue(self):
        """Данные от Автоматизированной Станции энерго Мониторинга (АСЭМ). Для оповещений."""
        pass

    def communicator_fire_safety(self):
        """Данные от антипожарных систем. Для оповещений."""
        pass

    # TODO SOURCES ###################################################################################################################################


if __name__ == "__main__":
    app = QApplication(sys.argv)
    ui = Ui()
    sys.exit(app.exec())
