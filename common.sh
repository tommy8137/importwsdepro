#!bin/bash

app_folder="/usr/local/eprocurement"
app_group="eprocurement"
admin_user="eprocurement-admin"
app_user="eprocurement-user"

admin_user_password="Wistron@2020"
app_user_password="Wistron@2020"

echo "==================="
echo "app_folder: ${app_folder}"
echo "app_group:  ${app_group}"
echo "admin_user: ${admin_user} for install or deploy"
echo "app_user: ${app_user} for check log and restart service"
echo "==================="

echo "=== add admin user ==="
if ! id -u ${admin_user} > /dev/null 2>&1; then
  echo "user ${admin_user} not exist"
  adduser ${admin_user}
  echo ${admin_user}:${admin_user_password} | chpasswd
  usermod -aG wheel ${admin_user}
else
  echo "already exist"
fi

echo "=== add app user ==="
if ! id -u ${app_user} > /dev/null 2>&1; then
  echo "user ${app_user} not exist"
  adduser ${app_user}
  echo ${app_user}:${app_user_password} | chpasswd
else
  echo "exist"
fi

echo "=== change system log permission ==="
cat > /etc/logrotate.d/syslog <<EOL
/var/log/secure
/var/log/spooler
{
    missingok
    sharedscripts
    postrotate
        /bin/kill -HUP `cat /var/run/syslogd.pid 2> /dev/null` 2> /dev/null || true
    endscript
}

/var/log/cron
/var/log/maillog
/var/log/messages {
    sharedscripts
    create 0644
    postrotate
        /bin/kill -HUP `cat /var/run/syslogd.pid 2> /dev/null` 2> /dev/null || true
        /bin/kill -HUP `cat /var/run/rsyslogd.pid 2> /dev/null` 2> /dev/null || true
    endscript
}
EOL

cat /etc/logrotate.d/syslog
logrotate --force /etc/logrotate.d/syslog

# echo "login root"
# sudo -i

echo "=== yum update ==="
yum update -y

echo "=== install zip unzip ==="
yum install -y zip unzip

echo "=== install vim ==="
yum install -y vim

echo "=== install telnet ==="
yum install -y telnet

echo "=== install netstat ==="
yum install -y net-tools

echo "=== setting crontab ==="
yum install -y ntp

echo "=== set timezone ==="
timedatectl set-timezone Asia/Taipei

echo "=== edit crontab ==="
if [ `grep -rlw "/usr/sbin/ntpdate time.stdtime.gov.tw" /var/spool/cron/root` ] ;
then
  echo "=== has been crontab (dont need to append ) ==="
else
  echo "=== append crontab ==="
  echo -e "0 1 * * * /usr/sbin/ntpdate time.stdtime.gov.tw" >> /var/spool/cron/root
fi

echo "=== check crontab list ==="
crontab -l

echo "=== setting stdtime in rc.local ==="
if [ `grep -rlw "time.stdtime.gov.tw" /etc/rc.local` ] ;
then
  echo "=== has been setting time.stdtime.gov.tw (dont need to setting ) ==="
else
  echo "=== setting stdtime in rc.local ==="
  echo -e "" >> /etc/rc.local
  echo -e "############# setting stdtime #############" >> /etc/rc.local
  echo -e "############# setting stdtime #############" >> /etc/rc.local
  echo -e "/usr/sbin/ntpdate time.stdtime.gov.tw" >> /etc/rc.local
fi

systemctl start ntpd
systemctl enable ntpd

echo "=== installing docker ==="
docker -v
if [ $? -ne 0 ]; then
  echo "=== first install docker ==="
  yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2

  yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
  
  yum install -y docker-ce-19.03.2

echo "=== docker container log rotate setting ==="
daemon_file="/etc/docker/daemon.json"
if [ ! -f ${daemon_file} ]; then
  echo "${daemon_file} not exist, creating.."
  mkdir -p /etc/docker/ || true
  touch /etc/docker/daemon.json
  cat > /etc/docker/daemon.json <<EOL
{
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "50m",
        "max-file": "10"
    }
}
EOL
  cat /etc/docker/daemon.json
else
  echo "${daemon_file} already exist, will not create."
fi

  systemctl start docker
  groupadd docker || true
  usermod -aG docker $USER
  systemctl enable docker
  chkconfig docker on
else
  echo "=== has been docker ==="
fi

docker -v
if [ $? -ne 0 ]; then
  echo "@@@ ERROR: docker intall failure. @@@"
  exit
fi

echo "=== installing docker-compose ==="
curl -L https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod 755 /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

mount /tmp -o remount,exec

service docker restart

echo "=== add group ==="
groupadd ${app_group} || true
usermod -aG ${app_group} $USER
# usermod -aG ${app_group} docker

echo "=== grant admin user permission ==="
usermod -aG docker ${admin_user}
usermod -aG ${app_group} ${admin_user}

echo "=== grant app user permission ==="
usermod -aG docker ${app_user}
usermod -aG ${app_group} ${app_user}

echo "=== add app workspace for deploy ==="
if [ ! -d ${app_folder} ]; then
  # Control will enter here if $DIRECTORY exists.
  echo "${app_folder} not exist, creating.."
  mkdir ${app_folder}
  chmod -R 775 ${app_folder}
  chown -R ${admin_user}:${app_group} ${app_folder}
  echo "folder created"
else
  echo "exist"
fi

echo "=== please logout and login ==="
echo "=== and input 'docker-compose --version' ==="
echo "=== vaild docker-compose version ==="

# docker-compose --version
# if [ $? -ne 0 ]; then
#   echo "ERROR: docker-compose intall failure."
#   exit
# fi

