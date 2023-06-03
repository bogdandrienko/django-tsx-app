import datetime

from django.core.handlers.wsgi import WSGIRequest
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# from django_app import models as django_models, serializers as django_serializers
# from django_app import signals as django_signals
from django_app import utils as django_utils, queries as django_queries

"""

Любой запрос с frontend нужно: Логировать, Кэшировать, Обрабатывать на ошибку, Авторизовать

"""


def index(request: HttpRequest) -> HttpResponse:
    try:
        context = {}
        return render(request=request, template_name="index.html", context=context)
    except Exception as error:
        context = {}
        return render(request=request, template_name="django_app/404.html", context={})


@api_view(http_method_names=["GET"])
def vehtrips_status_f(request: WSGIRequest) -> Response:
    if request.method == "GET":
        try:
            rows_raw = django_utils.request_to_oracle(query=django_queries.query_vehtrips_status(), args={}, many=True)
            rows_instances = [
                {"vehid": i[0], "time": i[1], "x": i[2], "y": i[3], "weight": i[4], "fuel": i[5], "speed": i[6]}
                for i in rows_raw
            ]
            return Response(data={"response": {"data": rows_instances}}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(http_method_names=["GET"])
def drainage_status_f(request: WSGIRequest) -> Response:
    if request.method == "GET":
        try:
            timeDiff = request.GET["timeDiff"]
            row_raw = django_utils.request_to_oracle(
                query=django_queries.query_drainage_status(), args={"timeDiff": timeDiff}, many=False)
            row_instances = {"maxtime": row_raw[0], "mintime": row_raw[1], "maxfuel": row_raw[2],
                             "minfuel": row_raw[3], "diffuel": int(row_raw[4]), "difval": int(row_raw[5])}
            return Response(data={"response": {"data": row_instances}}, status=status.HTTP_200_OK)
        except Exception as error:
            print("error: ", error)
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(http_method_names=["GET"])
def analyse_predictive_f(request: WSGIRequest) -> Response:
    if request.method == "GET":
        try:
            row_raw = django_utils.request_to_oracle(
                query=django_queries.query_analyse_predictive(), args={}, many=True)
            trips = {"maxtime": row_raw[0], "mintime": row_raw[1], "maxfuel": row_raw[2],
                     "minfuel": row_raw[3], "diffuel": int(row_raw[4]), "difval": int(row_raw[5])}

            def kpd_match(fromTime, toTime):
                elapsed_time1 = (toTime - fromTime).total_seconds()
                if elapsed_time1 > 20 * 60:
                    return 80
                elif elapsed_time1 > 15 * 60:
                    return 90
                elif elapsed_time1 > 10 * 60:
                    return 100
                elif elapsed_time1 > 5 * 60:
                    return 110
                else:
                    return 120

            trips_raw = [
                {"vehid": i[1], "shovid": i[2], "unloadid": i[3], "worktype": i[4], "timeload": i[5],
                 "timeunload": i[6], "movetime": i[7], "weigth": i[8], "bucketcount": i[9], "avspeed": i[10],
                 "length": i[11], "unloadlength": i[12], "loadheight": i[13], "unloadheight": i[13],
                 "kpd": kpd_match(i[5], i[6])}
                for i in trips]
            # print(trips_raw)
            trips_raw = sorted(trips_raw, key=lambda x: x["timeload"], reverse=True)

            # todo сгруппировать по каждому самосвалу
            data1 = {}
            for trips in trips:
                tech_id = f"{trips[1]}"
                try:
                    data1[tech_id] = [*data1[tech_id], trips]
                except Exception as error:
                    data1[tech_id] = [trips]

            # todo сгруппировать по трём категориям
            data2 = {}
            for tech_id, trips in data1.items():
                data2[tech_id] = {}
                data2[tech_id]["last_trip"] = [trips[-1]]
                for trip in trips:
                    # todo CORE
                    if (datetime.datetime.now() - trip[5]).total_seconds() < 1 * 60 * 60:
                        try:
                            data2[tech_id]["last_hour"] = [*data2[tech_id]["last_hour"], trip]
                        except Exception as error:
                            data2[tech_id]["last_hour"] = [trip]
                    try:
                        data2[tech_id]["last_shift"] = [*data2[tech_id]["last_shift"], trip]
                    except Exception as error:
                        data2[tech_id]["last_shift"] = [trip]

            # todo оценить каждый рейс и записать в новые поля
            data3 = {}
            for tech_id, trips in data2.items():
                data3[tech_id] = {}
                data3[tech_id]["ratings"] = {}
                for type_par in ["last_trip", "last_hour", "last_shift"]:
                    try:
                        count = len(data2[tech_id][type_par])
                        if count > 0:
                            res = 0
                            elapsed_time = 0
                            for trip in data2[tech_id][type_par]:
                                elapsed_time = (trip[6] - trip[5]).total_seconds()
                                if elapsed_time > 20 * 60:
                                    res += 80
                                elif elapsed_time > 15 * 60:
                                    res += 90
                                elif elapsed_time > 10 * 60:
                                    res += 100
                                elif elapsed_time > 5 * 60:
                                    res += 110
                                else:
                                    res += 120
                            if type_par == "last_trip":
                                data3[tech_id]["ratings"][type_par] = {"rating": int(res / count),
                                                                       "count": int(elapsed_time / 60)}
                            else:
                                data3[tech_id]["ratings"][type_par] = {"rating": int(res / count),
                                                                       "count": count}
                        else:
                            data3[tech_id]["ratings"][type_par] = {"rating": 0, "count": 0}
                    except Exception as error:
                        data3[tech_id]["ratings"][type_par] = {"rating": 0, "count": 0}

            # todo конвертация словаря в массив
            data4 = []
            for key, value in data3.items():
                data4.append({"tech_id": key, **value})
            return Response(data={"response": {"data": data4, "trips": trips_raw}}, status=status.HTTP_200_OK)
        except Exception as error:
            print(error)
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(http_method_names=["GET"])
def reports_operuchet_f(request: WSGIRequest) -> Response:
    if request.method == "GET":
        try:
            paramDateFrom = datetime.datetime.strptime(request.GET["dateFrom"], "%Y-%m-%d")
            paramShiftFrom = request.GET["shiftFrom"]
            paramDateTo = datetime.datetime.strptime(request.GET["dateTo"], "%Y-%m-%d")
            paramShiftTo = request.GET["shiftTo"]
            paramSelectTechId = request.GET["selectTechId"]
            roundPoint = int(request.GET["roundPoint"])
            data = dict(paramDateFrom=paramDateFrom, paramShiftFrom=paramShiftFrom, paramDateTo=paramDateTo,
                        paramShiftTo=paramShiftTo, paramSelectTechId=paramSelectTechId)

            rows_raw = django_utils.request_to_oracle(
                query=django_queries.query_reports_operuchet(), args=data, many=True)
            row_instances = []
            for i in rows_raw:
                tr_mass = round(i[4] / 2.1, roundPoint)
                tr_gruz = i[5] * tr_mass
                sk_mass = round(i[6] / 2.8, roundPoint)
                sk_gruz = i[7] * sk_mass
                rih_mass = round(i[8] / 1.8, roundPoint)
                rih_gruz = i[9] * rih_mass
                prs_mass = round(i[10] / 1.4, roundPoint)
                prs_gruz = i[11] * prs_mass
                rud_mass = round(i[12] / 2.8, roundPoint)
                rud_gruz = i[13] * rud_mass
                summ_mass = round(tr_mass + sk_mass + rih_mass + prs_mass + rud_mass, roundPoint)
                summ_proiz_gruz = round(tr_gruz + sk_gruz + rih_gruz + prs_gruz + rud_gruz, roundPoint)
                if summ_mass > 0:
                    km = round(summ_proiz_gruz / summ_mass, roundPoint)
                else:
                    km = 0
                temp_row_instances = [
                    [i[3], "тр,км", "тр", round(i[4], roundPoint), round(i[5], roundPoint), 2.1, tr_mass,
                     summ_proiz_gruz, summ_mass, km],
                    [i[1], "ск,км", "ск", round(i[6], roundPoint), round(i[7], roundPoint), 2.8, sk_mass, "",
                     "", ""],
                    ["", "рых,км", "рых", round(i[8], roundPoint), round(i[9], roundPoint), 1.8, rih_mass, "",
                     "", ""],
                    ["", "ПРС,км", "прс", round(i[10], roundPoint), round(i[11], roundPoint), 1.4, prs_mass, "",
                     "", ""],
                    ["", "руда,км", "руд", round(i[12], roundPoint), round(i[13], roundPoint), 2.8, rud_mass,
                     "", "", ""],
                ]
                row_instances.extend(temp_row_instances)
            return Response(data={"response": {"data": row_instances}}, status=status.HTTP_200_OK)
        except Exception as error:
            print(error)
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
