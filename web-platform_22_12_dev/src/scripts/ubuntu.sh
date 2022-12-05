# full install ubuntu on VM (+extensions): Normal installation (user + user-PC) + download updates + install third-party software
# !insert guest additions iso => Files >> CD Drive (VBOX_GAs_6.1.32) >> autorun.sh (Right-click) >> Run as a Program
# !change resolution to 1400 x 900
sudo adduser user vboxsf
# !change background, theme and side-panel to buttom

sudo apt-get update -y
sudo apt-get upgrade -y

sudo apt-get install -y build-essential libpq-dev unixodbc-dev zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev libbz2-dev

sudo apt-get install -y python3-dev python3-pip python3-venv

sudo apt-get install -y nginx gunicorn git curl wget htop net-tools docker-compose virtualbox virtualbox-ext-pack virtualbox-guest-additions-iso virtualbox-guest-utils virtualbox-guest-x11

sudo apt-get install -y postgresql postgresql-contrib

sudo apt-get install -y openssh-server
sudo systemctl start ssh
sudo systemctl restart ssh

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
nvm ls-remote
nvm install 18.10.0
nvm use 18.10.0

sudo reboot

