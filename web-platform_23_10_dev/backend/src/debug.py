import datetime
from . import utils


def get_tech_message_delay():
    """Проверка интервалов сообщений на всей технике"""

    # самосвалы
    def dumptrucks(t_from, t_to, too_low, too_high):
        for i in utils.get_all_dumptrucks():
            __rows_raw: list[tuple] = utils.request_to_oracle(
                query="""
select ev.TIME from EVENTSTATEARCHIVE ev 
where ev.TIME BETWEEN :param_from AND :param_to and ev.VEHID = :param_veh_id
order by time asc
""",
                args={
                    "param_from": datetime.datetime.strptime(t_from, "%d/%m/%Y %H:%M:%S"),
                    "param_to": datetime.datetime.strptime(t_to, "%d/%m/%Y %H:%M:%S"),
                    "param_veh_id": str(i),
                },
                many=True,
            )
            if __rows_raw is None or len(__rows_raw) < 1:
                continue
            prev: datetime.datetime | None = None
            list_val = []
            for idx, row in enumerate(__rows_raw, 1):
                curr: datetime.datetime = row[0]
                if prev:
                    diff = (curr - prev).total_seconds()
                    list_val.append(diff)
                prev = curr
            list_val = list(filter(lambda x: 30 > x > 0, list_val))
            if len(list_val) < 1:
                continue
            val = round(sum(list_val) / len(list_val), 1)
            if val < too_low:
                print(f"{i}: {val} | {len(list_val)} - РЕЖЕ")
            elif val > too_high:
                print(f"{i}: {val} | {len(list_val)} - ЧАЩЕ")
            else:
                print(f"{i}: {val} | {len(list_val)}")

    # auxes
    def auxes(t_from, t_to, too_low, too_high):
        for i in utils.get_all_auxes():
            __rows_raw: list[tuple] = utils.request_to_oracle(
                query="""
select ev.TIME from AUXEVENTARCHIVE ev 
where ev.TIME BETWEEN :param_from AND :param_to and ev.AUXID = :param_veh_id
order by time asc
""",
                args={
                    "param_from": datetime.datetime.strptime(t_from, "%d/%m/%Y %H:%M:%S"),
                    "param_to": datetime.datetime.strptime(t_to, "%d/%m/%Y %H:%M:%S"),
                    "param_veh_id": str(i),
                },
                many=True,
            )
            if __rows_raw is None or len(__rows_raw) < 1:
                continue
            prev: datetime.datetime | None = None
            list_val = []
            for idx, row in enumerate(__rows_raw, 1):
                curr: datetime.datetime = row[0]
                if prev:
                    diff = (curr - prev).total_seconds()
                    list_val.append(diff)
                prev = curr
            list_val = list(filter(lambda x: 30 > x > 0, list_val))
            if len(list_val) < 1:
                continue
            val = round(sum(list_val) / len(list_val), 1)
            if val < too_low:
                print(f"{i}: {val} | {len(list_val)} - РЕЖЕ")
            elif val > too_high:
                print(f"{i}: {val} | {len(list_val)} - ЧАЩЕ")
            else:
                print(f"{i}: {val} | {len(list_val)}")

    # shov
    def shov(t_from, t_to, too_low, too_high):
        for i in utils.get_all_shovels():
            __rows_raw: list[tuple] = utils.request_to_oracle(
                query="""
select ev.TIME from SHOVEVENTSTATEARCHIVE ev 
where ev.TIME BETWEEN :param_from AND :param_to and ev.SHOVID = :param_veh_id
order by time asc
""",
                args={
                    "param_from": datetime.datetime.strptime(t_from, "%d/%m/%Y %H:%M:%S"),
                    "param_to": datetime.datetime.strptime(t_to, "%d/%m/%Y %H:%M:%S"),
                    "param_veh_id": str(i),
                },
                many=True,
            )
            if __rows_raw is None or len(__rows_raw) < 1:
                continue
            prev: datetime.datetime | None = None
            list_val = []
            for idx, row in enumerate(__rows_raw, 1):
                curr: datetime.datetime = row[0]
                if prev:
                    diff = (curr - prev).total_seconds()
                    list_val.append(diff)
                prev = curr
            list_val = list(filter(lambda x: 30 > x > 0, list_val))
            if len(list_val) < 1:
                continue
            val = round(sum(list_val) / len(list_val), 1)
            if val < too_low:
                print(f"{i}: {val} | {len(list_val)} - РЕЖЕ")
            elif val > too_high:
                print(f"{i}: {val} | {len(list_val)} - ЧАЩЕ")
            else:
                print(f"{i}: {val} | {len(list_val)}")

    t_from1 = "20/09/2023 20:00:00"
    t_to1 = "21/09/2023 08:00:00"

    dumptrucks(t_from1, t_to1, 4.0, 10.0)
    auxes(t_from1, t_to1, 8.0, 15.0)
    shov(t_from1, t_to1, 5.0, 20.0)


def taskdate_example():
    pass


if __name__ == "__main__":
    # get_tech_message_delay()

    pass
