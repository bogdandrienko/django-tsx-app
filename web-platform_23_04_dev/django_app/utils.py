import cx_Oracle
import datetime
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import HttpRequest
from django.shortcuts import redirect
from django.urls import reverse


def paginate(request, objects, num_page):
    paginator = Paginator(objects, num_page)
    pages = request.GET.get("page")
    try:
        local_page = paginator.page(pages)
    except PageNotAnInteger:
        local_page = paginator.page(1)
    except EmptyPage:
        local_page = paginator.page(paginator.num_pages)

    return local_page


def login_required_decorator(func):
    def wrapper(*args, **kwargs):
        request = args[0]
        if not request.user.is_authenticated:
            return redirect(reverse("django_app:login", args=()))

        response = func(*args, **kwargs)
        return response

    return wrapper


def logging_txt_decorator(func):
    def wrapper(*args, **kwargs):
        request: HttpRequest = args[-1]
        if request.user.username:
            username = request.user.username
        else:
            username = "Аноним"
        with open("static/log.txt", 'a', encoding="utf-8") as file:
            file.write(f"{username} | {request.path} | {request.method} | {datetime.datetime.now()}\n")

        response = func(*args, **kwargs)
        return response

    return wrapper


def caching(cache, name, timeout=10, query=lambda: None):
    data = cache.get(name)
    if not data:
        data = query()
        cache.set(name, data, timeout=timeout)
    return data


def request_to_oracle(query: str, args: dict, many: bool) -> list[tuple] | tuple:
    # todo LINUX:
    # cx_Oracle.init_oracle_client()
    """
sudo su
mkdir -p /opt/oracle
cd /opt/oracle
wget https://download.oracle.com/otn_software/linux/instantclient/214000/instantclient-basic-linux.x64-21.4.0.0.0dbru.zip
unzip instantclient_21_4
apt install libaio1
echo /opt/oracle/instantclient_21_4 > /etc/ld.so.conf.d/oracle-instantclient.conf
ldconfig
pip install cx_Oracle
exit
    """

    try:
        cx_Oracle.init_oracle_client(lib_dir=r"static_external/instantclient_21_9_lite")
    except Exception as error:
        pass

    with cx_Oracle.connect('DISPATCHER/disp@172.30.23.16/PITENEW') as __connection:
        with __connection.cursor() as __cursor:
            if len(args) > 0:
                __cursor.execute(query, args)
            else:
                __cursor.execute(query, args)
            if many:
                data = __cursor.fetchall()
            else:
                data = __cursor.fetchone()

            return data
