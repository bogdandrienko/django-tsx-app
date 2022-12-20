sudo apt update -y
sudo apt install -y postgresql postgresql-contrib
sudo systemctl status postgresql  # check active

sudo passwd postgres  # input new password
sudo -i -u postgres


createuser flask_user
psql
\password # input new password

ALTER USER flask_user WITH ENCRYPTED password '12345qwertY!';

CREATE DATABASE flask_database OWNER flask_user;



\q
exit

sudo systemctl stop postgresql && sudo systemctl restart postgresql && sudo systemctl status postgresql


sudo -i -u postgres
psql

\connect flask_database


GRANT ALL PRIVILEGES ON DATABASE flask_database to flask_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public to flask_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public to flask_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public to flask_user;


CREATE TABLE zarplata ( id serial PRIMARY KEY, username VARCHAR ( 50 ) NOT NULL, salary INT NOT NULL );

# ! CREATE TABLE !

select * from zarplata;

INSERT INTO zarplata (username, salary) VALUES ('Bogdan', '60000'), ('Alice', '80000');

# INSERT 0 2

select * from zarplata;

select username from zarplata where salary > 70000;

\q
exit

sudo apt install -y curl

curl -fsSL https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/pgadmin.gpg

sudo sh -c 'echo "deb https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list'
sudo apt update && sudo apt upgrade
sudo apt install -y pgadmin4-desktop

sudo adduser ubuntu vboxsf # ubuntu = linux account

# https://www.how2shout.com/linux/install-postgresql-pgadmin-4-on-ubuntu-22-04-lts-jammy-linux/

!










# TODO WINDOWS #########################################################################################################

update system
install DWS and SSD Mini Tweaker
insert guest-additions and install
install all need programs

# todo extra
cd ..\
rmdir /Q /S react
mkdir react
move frontend/build react

chdir frontend
set /p app_name= "Please enter the 'frontend' folder name:  "
IF "%app_name%"=="" (set app_name="frontend")
django-admin startapp %app_name%
call cmd
# todo extra

# TODO WINDOWS #########################################################################################################



# TODO LINUX ###########################################################################################################

# TODO debian
su
apt install sudo
nano /etc/sudoers
su debian
sudo nano /etc/apt/sources.list
# <file> /etc/apt/sources.list
deb http://deb.debian.org/debian bullseye main
deb-src http://deb.debian.org/debian bullseye main
deb http://http.us.debian.org/debian/ testing non-free contrib main
# </file> /etc/apt/sources.list
# TODO debian

# enter as root user
sudo -i
# enter as root user

# TODO virtualbox
# full install ubuntu on VM (+extensions): Normal installation (user + user-PC) + download updates + install third-party software
# !insert guest additions iso => Files >> CD Drive (VBOX_GAs_6.1.32) >> autorun.sh (Right-click) >> Run as a Program
# !change resolution to 1400 x 900
sudo -i 
sudo adduser user vboxsf
# !change background, theme and side-panel to bottom
!vbox insert guest-additions
sudo apt install -y build-essential virtualbox-guest-additions-iso dkms virtualbox-dkms linux-headers-$(uname -r) linux-headers-`uname -r`
sudo mkdir -p /mnt/cdrom
sudo mount /dev/cdrom /mnt/cdrom
cd /mnt/cdrom
sudo sh ./VBoxLinuxAdditions.run --nox11
sudo adduser user vboxsf
sudo reboot
# TODO virtualbox

# TODO openssh
sudo apt update -y
sudo apt install -y openssh-server
sudo systemctl start ssh
sudo systemctl restart ssh
# TODO openssh


# clear terminal
clear

# remove file
sudo rm temp.txt

# change file / create file
sudo nano new.json

# update os
sudo -i 
sudo apt-get update -y
sudo apt-get upgrade -y

# additional modules
sudo apt-get install -y build-essential libpq-dev unixodbc-dev zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev libbz2-dev

# python modules
sudo apt-get install -y python3-dev python3-pip python3-venv

# main modules
sudo apt-get install -y nginx gunicorn git curl wget htop net-tools docker-compose virtualbox virtualbox-ext-pack virtualbox-guest-additions-iso virtualbox-guest-utils

# clear cache
sudo apt-get autoremove -y

# TODO LINUX ###########################################################################################################



# TODO GIT #############################################################################################################

# todo install
sudo apt-get update -y
sudo apt-get install -y git
# todo install

sudo snap install gh
git init
git clone https://... project
git add urls.py
git add -A
git commit -a -m"description"
git push
git pull

# TODO GIT #############################################################################################################



# TODO PIP #############################################################################################################

# todo linux
cd ~
mkdir web
cd web
python3 -m pip3 install --upgrade pip
pip3 install --upgrade pip
python3 -m venv env
source env/bin/activate
python3 -m pip3 install --upgrade pip
# linux

# todo windows 10
python.exe -m pip install --upgrade pip
pip install env
mkdir web
chdir web
python -m venv env
call .\env\Scripts\activate.bat
python.exe -m pip install --upgrade pip
pip install Django
# todo windows 10

# TODO PIP #############################################################################################################



# TODO POSTGRESQL ######################################################################################################

# todo install
sudo apt update -y
sudo apt install -y postgresql postgresql-contrib
# todo install

sudo passwd postgres
sudo -i -u postgres
sudo su - postgres
createuser django_user
createdb django_database -O django_user
psql django_database
CREATE USER django_user WITH PASSWORD '12345Qwerty!';
alter user django_user with password '12345Qwerty!';

CREATE DATABASE django_database OWNER django_user;
GRANT ALL PRIVILEGES ON DATABASE django_database TO django_user;

sudo nano /etc/postgresql/14/main/postgresql.conf
# <file> /etc/postgresql/14/main/postgresql.conf
# listen_addresses = '*'
# <file> /etc/postgresql/14/main/postgresql.conf

sudo nano /etc/postgresql/14/main/pg_hba.conf
# <file> /etc/postgresql/14/main/pg_hba.conf
# host    all             all             192.168.0.165/32         scram-sha-256
# host    all             all             all         scram-sha-256
# host    all             all             all         trust (!danger)
# <file> /etc/postgresql/14/main/pg_hba.conf

sudo systemctl status postgresql
sudo systemctl stop postgresql
sudo systemctl status postgresql
sudo systemctl restart postgresql

#! mysql !  systemctl start mysql.service

sudo -i -u postgres
psql
\connect django_database

CREATE TABLE zarplata ( id serial PRIMARY KEY, username VARCHAR ( 50 ) UNIQUE NOT NULL, salary INT );
select * from zarplata;

insert into zarplata (username, salary) VALUES ('Bogdan', '60000'), ('Alice', '80000');
select * from zarplata;

delete from zarplata where username = 'Bogdan';
select * from zarplata;

# TODO POSTGRESQL ######################################################################################################



# TODO DJANGO ##########################################################################################################

# todo install
sudo apt-get update -y
sudo apt-get install -y python3-dev python3-pip python3-venv
# todo install

# python3 -m pip3 install --upgrade pip
cd ~
mkdir web && cd web
python3 -m venv env

source env/bin/activate
# python3 -m pip3 install --upgrade pip

pip install wheel
pip install Django djangorestframework django-cors-headers django-environ django-grappelli djangorestframework-simplejwt gunicorn celery redis psycopg2-binary pyodbc lxml Pillow requests aiohttp beautifulsoup4 openpyxl
pip install -r requirements.txt
pip freeze > requirements.txt


django-admin startproject django_settings .
django-admin startapp django_app

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser --username admin --email bogdandrienko@gmail.com

python manage.py collectstatic --noinput
python manage.py createcachetable
python manage.py check --database default

python manage.py runserver 0.0.0.0:8000
gunicorn --bind 0.0.0.0:8000 django_settings.wsgi

# TODO DJANGO ##########################################################################################################



# TODO REACT ###########################################################################################################

# todo install
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
nvm ls-remote
nvm install 18.10.0
nvm use 18.10.0
node --version

npx create-react-app frontend --template redux-typescript
# todo install

npx -y create-react-app frontend --template redux-typescript
npx -y create-react-app frontend --template pwa-typescript

npm install prettier
npm install axios
npm install react-redux
npm install react-router-dom
npm install react-bootstrap
npm install react-router-bootstrap
npm install react-player

# todo extra
npm i
npm install
npm init
npm start
npm run build
# todo extra

# TODO REACT ###########################################################################################################



# TODO GUNICORN ########################################################################################################

# todo install
sudo apt-get update -y
sudo apt-get install -y gunicorn
# todo install

sudo nano /etc/systemd/system/gunicorn.socket
<file>
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock

[Install]
WantedBy=sockets.target
</file>


sudo nano /etc/systemd/system/gunicorn.service
<file>
[Unit]
Description=Gunicorn for the Django example project
Requires=gunicorn.socket
After=network.target

[Service]
Type=notify

User=bogdan
Group=www-data

RuntimeDirectory=gunicorn
WorkingDirectory=/home/bogdan/web
ExecStart=/home/bogdan/web/env/bin/gunicorn --workers 5 --bind unix:/run/gunicorn.sock backend.wsgi:application
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=mixed
TimeoutStopSec=5
PrivateTmp=true

[Install]
WantedBy=multi-user.target
</file>
sudo systemctl daemon-reload
sudo systemctl start gunicorn
sudo systemctl enable --now gunicorn.service
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
sudo systemctl status gunicorn.service
#sudo systemctl disable gunicorn
#sudo systemctl stop gunicorn

# TODO GUNICORN ########################################################################################################



# TODO NGINX ###########################################################################################################

# todo install
sudo apt-get update -y
sudo apt-get install -y nginx
# todo install

sudo usermod -aG user www-data

sudo nano /etc/nginx/sites-available/web-km-kz-http.conf
<file>
server {
listen 80;
listen [::]:80;

server_name web.km.kz www.web.km.kz;

root /home/bogdan/web;

location /.well-known/acme-challenge/ {}

location /favicon.ico {
    alias /home/bogdan/web/static/logo.png;

    access_log off; log_not_found off;

    expires max;
}

location /robots.txt {
    alias /home/bogdan/web/static/robots.txt;

    access_log off; log_not_found off;

    expires max;
}

location /static/ {
    alias /home/bogdan/web/static/;

    expires max;
}

location /media/ {
    alias /home/bogdan/web/static/media/;

    expires max;
}

location / {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    proxy_buffering off;
    proxy_pass http://unix:/run/gunicorn.sock;
}
}
</file>

sudo ln -s /etc/nginx/sites-available/web-km-kz-http.conf /etc/nginx/sites-enabled/web-km-kz-http.conf
sudo service nginx start
sudo systemctl status nginx.service
sudo ufw allow 'Nginx Full'
sudo systemctl reload nginx.service

sudo mv /etc/nginx/sites-available/web-km-kz-http.conf /etc/nginx/sites-available/web.km.kz-https.conf
sudo nano /etc/nginx/sites-available/web-km-kz-http.conf
<file>
server {
listen 80;
listen [::]:80;

server_name web.km.kz www.web.km.kz;

root /home/bogdan/web;

location /.well-known/acme-challenge/ {}

location / {
    return 301 https://$server_name$request_uri;
}
}
</file>

sudo certbot certonly --webroot -w /home/bogdan/web -d web.km.kz -m bogdandrienko@gmail.com --agree-tos
sudo openssl dhparam -out /etc/nginx/dhparam.pem 2048

sudo nano /etc/nginx/sites-available/web-km-kz-https.conf
<file>
server {
listen 443 ssl http2;
listen [::]:443 ssl http2;

ssl_certificate /etc/letsencrypt/live/web.km.kz/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/web.km.kz/privkey.pem;

ssl_session_timeout 1d;
ssl_session_cache shared:MozSSL:10m;

ssl_dhparam /etc/nginx/dhparam.pem;

ssl_protocols TLSv1.2;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;

ssl_stapling on;
ssl_stapling_verify on;

ssl_trusted_certificate /etc/letsencrypt/live/web.km.kz/chain.pem;

resolver 1.1.1.1;

client_max_body_size 30M;

server_name web.km.kz www.web.km.kz;

root /home/bogdan/web;

location /.well-known/acme-challenge/ {}

location /favicon.ico {
    alias /home/bogdan/web/static/logo.png;

    access_log off; log_not_found off;

    expires max;
}

location /robots.txt {
    alias /home/bogdan/web/static/robots.txt;

    access_log off; log_not_found off;

    expires max;
}

location /static/ {
    alias /home/bogdan/web/static/;

    expires max;
}

location /media/ {
    alias /home/bogdan/web/static/media/;

    expires max;
}

location / {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    proxy_buffering off;
    proxy_pass http://unix:/run/gunicorn.sock;
}
}
</file>

sudo ln -s /etc/nginx/sites-available/web-km-kz-https.conf /etc/nginx/sites-enabled/web-km-kz-https.conf
sudo service nginx start
sudo systemctl status nginx.service
sudo ufw allow 'Nginx Full'
sudo systemctl reload nginx.service

# TODO NGINX ###########################################################################################################



# TODO CERTBOT #########################################################################################################

sudo snap install --classic certbot
sudo systemctl list-timers | grep 'certbot\|ACTIVATES'
sudo nano /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
<file>
#!/bin/bash
/usr/bin/systemctl reload nginx.service
sudo chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
sudo certbot renew --dry-run
</file>

# TODO CERTBOT #########################################################################################################



# TODO CELERY ##########################################################################################################

# todo install
sudo apt-get update -y
sudo apt-get install -y redis
# todo install

# shell
redis-server
redis-cli
ping # PONG
exit
# shell

source env/bin/activate
pip install celery redis django
pip freeze > requirements.txt

# django_setting/celery.py
import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_settings.settings")
app = Celery("django_settings")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
# django_setting/celery.py

# django_setting/__init__.py
from .celery import app as celery_app

__all__ = ("celery_app",)
# django_setting/__init__.py

# django_setting/settings.py
CELERY_APP_TIMEZONE = 'Asia/Almaty'
CELERY_APP_TASK_TRACK_STARTED = True
CELERY_APP_TASK_TIME_LIMIT = 1800

CELERY_BROKER_URL = "redis://localhost:6379"
CELERY_RESULT_BACKEND = "redis://localhost:6379"
# CELERY_BROKER_URL = "amqp://myuser:mypassword@localhost:5672/myvhost"
# CELERY_RESULT_BACKEND = "redis://localhost:6379"
# django_setting/settings.py

# sh (env)
python -m celery -A django_settings worker -l info
# sh (env)

# django_app/celery.py
# parsing(get data from another web-sites), analyze, reports, image refactor, send mass mail
@shared_task
def add(x, y):
    return x + y

@shared_task
def count_users():
    time.sleep(3.0)
    return User.objects.count()

@shared_task
def send_mass_email(recipients: list, message: dict, skip_error=True):
    results = []
    for recipient in recipients:
        success = False
        error = ""
        try:
            # send_mail(recipient, message)
            pass
        except Exception as error:
            print(error)
            error = error
            if skip_error is False:
                break
        else:
            success = True
        finally:
            results.append((success, error))
    # return results  # [(True, ""), (False, "timeout error")]
    return [(True, ""), (False, "timeout error")]
# django_app/celery.py

# django_app/view.py
from django_app import celery as current_celery
from celery.result import AsyncResult
from django_settings.celery import app as celery_app

task_id = current_celery.send_mass_email.apply_async([1, 2, 3], {}, skip_error=True, countdown=20)  #
old_task_id = "33779111-0f42-4a96-bdec-d5643e57a018"

result = AsyncResult(old_task_id, app=celery_app)
# print()

if result.state != "PENDING":
result = f"status: {result.state} | result: {result.get()}"
else:
result = f"status: {result.state} | result: {None}"
print(result)
# django_app/view.py

# TODO CELERY ##########################################################################################################



# TODO DOCKER ##########################################################################################################

sudo apt-get update -y
sudo apt install -y docker-compose python3-pip python3-venv python3-dev
mkdir web && cd web
python3 -m venv env
source env/bin/activate
pip install --upgrade pip
pip install wheel
pip install Django gunicorn psycopg2 Pillow
django-admin startproject django_settings .
django-admin startapp core
cd core
mkdir management && cd management
nano __init__.py       #ctr s ctrl x
mkdir commands && cd commands
nano __init__.py  #ctr s ctrl x

nano wait_for_db.py
# wait_for_db.py
import time
from django.db import connections
from django.db.utils import OperationalError
from django.core.management import BaseCommand


class Command(BaseCommand):
    """Django command to pause execution until db is available"""

    def handle(self, *args, **options):
        self.stdout.write('Waiting for database...')
        db_conn = None
        while not db_conn:
            try:
                db_conn = connections['default']
            except OperationalError:
                self.stdout.write('Database unavailable, waititng 1 second...')
                time.sleep(1)

        self.stdout.write(self.style.SUCCESS('Database available!'))
# wait_for_db.py

nano django_settings/settings.py
# settings.py
import os

DEBUG = os.environ.get("DEBUG", True)
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'core',
]

DATABASES = {
    "default": {
        "ENGINE": os.environ.get("SQL_ENGINE", "django.db.backends.sqlite3"),
        "NAME": os.environ.get("SQL_DATABASE", os.path.join(BASE_DIR, "db.sqlite3")),
        "USER": os.environ.get("SQL_USER", "user"),
        "PASSWORD": os.environ.get("SQL_PASSWORD", "password"),
        "HOST": os.environ.get("SQL_HOST", "localhost"),
        "PORT": os.environ.get("SQL_PORT", "5432"),
    }
}

STATIC_ROOT = Path(BASE_DIR/"static")
# settings.py

nano .env
# .env
# django
DEBUG=1


SQL_ENGINE=django.db.backends.postgresql
SQL_DATABASE=django_db
SQL_USER=django_usr
SQL_PASSWORD=Qwerty12345!
SQL_HOST=db
SQL_PORT=5432

# postgres
POSTGRES_DB=django_db
POSTGRES_USER=django_usr
POSTGRES_PASSWORD=Qwerty12345!
# .env

python3 manage.py runserver 0.0.0.0:8000
cd ..

nano docker-compose.yml
# docker-compose.yml
version: '3.7'

services:

  db:
    container_name: db
    image: postgres:latest
    restart: on-failure
    networks:
      - main
    env_file:
      - ./web/.env
    volumes:
      - postgres_data:/var/lib/postgresql/data
  web:
    container_name: web
    restart: on-failure
    depends_on:
      - db
    networks:
      - main
    build:
      context: .
      dockerfile: ./Dockerfile
    env_file:
      - ./web/.env
    image: web
    volumes:
      - .:/web
    ports:
      - 8000:8000
    command: >
      sh -c "python manage.py wait_for_db && python manage.py collectstatic --noinput &&
             python manage.py makemigrations --noinput && python3 manage.py migrate --noinput &&
             python manage.py runserver 0.0.0.0:8000"
             # gunicorn django_settings.wsgi -bind 0.0.0.0:8000
volumes:
  postgres_data:
networks:
   main:
     driver: bridge
# docker-compose.yml

nano Dockerfile
# Dockerfile
FROM python:latest

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update && apt-get install -y build-essential && apt-get install -y libpq-dev && apt-get install -y gettext \
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false && rm -rf /var/lib/apt/lists/*

RUN mkdir /web_build
COPY ./web /web_build

COPY ./web/requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

WORKDIR /web_build
# Dockerfile

nano start.sh
# start.sh
#!/bin/bash

# sudo apt-get install docker-compose -y && sudo apt autoremove -y
# docker-compose run web sh -c "django-admin startproject django_settings app"
# sudo docker-compose build
sudo docker-compose up --build
# sudo docker-compose up -d --build
# sudo docker compose down
# start.sh

source start.sh

# TODO DOCKER ##########################################################################################################









# Итераторы
mylist = [1, 2, 3]
for i in mylist :
   print(i)


mylist = [x*x for x in range(3)]
for i in mylist :
  print(i)

# Это удобно, потому что можно считывать из них значения сколько потребуется —
# однако все значения хранятся в памяти, а это не всегда желательно, если у вас много значений.

# Генераторы
mygenerator = (x*x for x in range(3))
for i in mygenerator :
  print(i)
# Генераторы это тоже итерируемые объекты, но прочитать их можно лишь один раз. Это связано с тем,
# что они не хранят значения в памяти, а генерируют их на лету

# Yield это ключевое слово, которое используется примерно как return — отличие в том,
# что функция вернёт генератор

def createGenerator() :
    mylist = range(3)
    for i in mylist :
        yield i*i
mygenerator = createGenerator() # создаём генератор
print(mygenerator) # mygenerator является объектом!
for i in mygenerator:
  print(i)


# корутины

import asyncio

async def count_to_three():
    print("Веду отсчёт. 1")
    await asyncio.sleep(0)
    print("Веду отсчёт. 2")
    await asyncio.sleep(0)
    print("Веду отсчёт. 3")
    await asyncio.sleep(0)

coroutine_counter = count_to_three()
print(coroutine_counter)  # <coroutine object count_to_three at 0x7f5a58486a98>
coroutine_counter.send(None)  # Выведет "Веду отсчёт. 1"
coroutine_counter.send(None)  # Выведет "Веду отсчёт. 2"
coroutine_counter.send(None)  # Выведет "Веду отсчёт. 3"
coroutine_counter.send(None)  # Выбросит ошибку StopIteration

############################################
# виртуальное окружение и наследование глобальных пакетов
virtualenv --system-site-packages mycoolproject
############################################

#########################################
# запуск скрипта
python -m pdb my_script.py
#########################################

############################################
# генераторы
from contextlib import contextmanager

@contextmanager
def open_file(name):
    f = open(name, 'w')
    yield f
    f.close()
###############################################

############################################
# else в циклах
for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            print( n, 'equals', x, '*', n/x)
            break
    else:
        # Цикл не нашел целочисленного делителя для n
        print(n, 'is a prime number')
########################################

####################################
# отладчик python
import pdb

def make_bread():
    pdb.set_trace()
    return "У меня нет времени"

print(make_bread())
######################################

###########################################
# тернарные операторы
is_nice = True
state = "nice" if is_nice else "not nice"
############################################

#######################################################
# распаковка
def profile():
    name = "Danny"
    age = 30
    return name, age

profile_name, profile_age = profile()
print(profile_name)
# Вывод: Danny

print(profile_age)
# Вывод: 30
#####################################################


###########################################################
# магические переменные *args и **kwargs
def test_var_args(f_arg, *argv):
    print("Первый позиционный аргумент:", f_arg)
    for arg in argv:
        print("Другой аргумент из *argv:", arg)

test_var_args('yasoob', 'python', 'eggs', 'test')


def greet_me(**kwargs):
    for key, value in kwargs.items():
        print("{0} = {1}".format(key, value))

>>> greet_me(name="yasoob")
name = yasoob
###########################################################

######################################################
# enumerate
my_list = ['apple', 'banana', 'grapes', 'pear']
for c, value in enumerate(my_list, 1):
    print(c, value)

# Вывод:
# 1 apple
# 2 banana
# 3 grapes
# 4 pear


my_list = ['apple', 'banana', 'grapes', 'pear']
counter_list = list(enumerate(my_list, 1))
print(counter_list)
# Вывод: [(1, 'apple'), (2, 'banana'), (3, 'grapes'), (4, 'pear')]
####################################################

###################################################
# map
items = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, items))


def multiply(x):
    return (x*x)
def add(x):
    return (x+x)

funcs = [multiply, add]
for i in range(5):
    value = list(map(lambda x: x(i), funcs))
    print(value)

# Вывод:
# [0, 0]
# [1, 2]
# [4, 4]
# [9, 6]
# [16, 8]
####################################################

####################################################
# filter
number_list = range(-5, 5)
less_than_zero = list(filter(lambda x: x < 0, number_list))
print(less_than_zero)

# Вывод: [-5, -4, -3, -2, -1]
######################################################

######################################################
#
product = 1
list = [1, 2, 3, 4]
for num in list:
    product = product * num

# product = 24


from functools import reduce
product = reduce((lambda x, y: x * y), [1, 2, 3, 4])

# Вывод: 24
##################################################

##################################################
# generator
def generator_function():
    for i in range(10):
        yield i

for item in generator_function():
    print(item)

# Вывод: 0
# 1
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9
##################################################

###################################################
# корутины
def grep(pattern):
    print("Searching for", pattern)
    while True:
        line = (yield)
        if pattern in line:
            print(line)
search = grep('coroutine')
next(search)
# Вывод: Searching for coroutine
search.send("I love you")
search.send("Don't you love me?")
search.send("I love coroutines instead!")
# Вывод: I love coroutines instead!
####################################################

