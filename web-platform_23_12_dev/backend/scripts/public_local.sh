########################################################################################################################
SYSTEM
########################################################################################################################
# !ssh
sudo apt-get update -y
sudo apt-get install -y openssh-server
ip a
# connect to ssh

# !superuser
sudo -i
sudo adduser web
usermod -a -G sudo web
su web

# !install
sudo apt-get update -y
sudo apt-get install -y nginx gunicorn uvicorn wget
sudo apt-get install -y build-essential libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get install -y python3.11 python3.11-venv python3.11-dev

sudo usermod -aG web www-data
sudo ufw allow 'Nginx Full'

########################################################################################################################
FASTAPI
########################################################################################################################
cd ~
mkdir web
cd web
# sudo mv home/web/web root/web

python3.11 -m venv env
source env/bin/activate
python -V
pip install wheel
pip install fastapi[all] gunicorn uvicorn

sudo nano main.py
<file>
from fastapi import FastAPI
app = FastAPI()
@app.get("/")
async def home(request: Request):
    form_data = await request.json()
    print(form_data)
    return {"message": "Hello World"}
</file>

uvicorn main:app --host=0.0.0.0 --port=8003
gunicorn main:app --workers 5 --worker-class 'uvicorn.workers.UvicornWorker'

########################################################################################################################
GUNICORN
########################################################################################################################
# sudo rm /etc/systemd/system/gunicorn.socket
sudo nano /etc/systemd/system/gunicorn.socket
<file>
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock

[Install]
WantedBy=sockets.target
</file>

# sudo rm /etc/systemd/system/gunicorn.service
sudo nano /etc/systemd/system/gunicorn.service
<file>
[Unit]
Description=Gunicorn for the FastApi project
Requires=gunicorn.socket
After=network.target

[Service]
Type=notify

User=web
Group=www-data

RuntimeDirectory=gunicorn
WorkingDirectory=/home/web/web
ExecStart=/home/web/web/env/bin/gunicorn --workers 5 --worker-class 'uvicorn.workers.UvicornWorker' --bind unix:/run/gunicorn.sock main:app
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

########################################################################################################################
NGINX
########################################################################################################################
# sudo rm /etc/nginx/sites-available/web-http.conf
# sudo rm /etc/nginx/sites-enabled/web-http.conf
sudo nano /etc/nginx/sites-available/web-http.conf
<file>
server {
listen 81;
listen [::]:81;

server_name 188.247.181.206 192.168.1.178;

root /home/web/web;

location /static/ {
    alias /home/web/web/static/;

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

sudo ln -s /etc/nginx/sites-available/web-http.conf /etc/nginx/sites-enabled/web-http.conf
sudo service nginx start
sudo systemctl reload nginx.service
sudo systemctl restart nginx
sudo systemctl status nginx.service
# http://188.247.181.206:80/
# http://192.168.1.178:80/

########################################################################################################################
SSL
########################################################################################################################
sudo apt update -y
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain -d www.your_domain
https://your_domain
sudo certbot renew --dry-run
