#!/bin/sh

FILENAME="migrations"
STAGE="dev"
PATHDIR=""
USE=""
CONFIG="./config.json"
VERSION=""
COMMON_DIR="migrates_common"
create(){
    echo "*** [INFO] create migration ***"
    db-migrate create \
      --config $CONFIG \
      --migrations-dir $PATHDIR \
      $FILENAME \
      --sql-file
}
migrate_common(){
echo "*** [INFO] migrate_common_to_$STAGE ***"
    db-migrate up \
      --verbose \
      --config $CONFIG \
      --migrations-dir $COMMON_DIR \
      -e $STAGE
}
check_site_folder(){
  case $PATHDIR in

  wt)
    PATHDIR="migrates_wt"
    ;;

  wsd)
    PATHDIR="migrates_wsd"
    ;;
  common)
    PATHDIR="migrates_common"
    ;;
  migrates)
    PATHDIR="migrates"
    ;;
  "")
    PATHDIR="migrates"
    ;;
  migrates_wsd)
    ;;

  migrates_wt)
    ;;
  migrates_common)
    ;;
  *)
    echo "[Error] The migrate pathdir only wt or wsd or common."
    exit 1
    ;;
esac
}
create_site_folder(){
  echo $PATHDIR
  if [ ! -d $PATHDIR ] 
  then
    mkdir $PATHDIR
  fi
}
check_common_folder(){
  if [ ! -d $COMMON_DIR ] 
  then
    mkdir $COMMON_DIR
  fi
}

migrate(){
    echo "*** [INFO] migrate_$PATHDIR_to_$STAGE ***"
    db-migrate up \
      --verbose \
      --config $CONFIG \
      --migrations-dir $PATHDIR \
      -e $STAGE
}
reset(){
    echo "*** [INFO] reset_migrate_to_$STAGE ***"
    db-migrate reset \
      --verbose \
      --config $CONFIG \
      --migrations-dir $PATHDIR \
      -e $STAGE
}
down(){
    echo "*** [INFO] down_migrate_to_$STAGE ***"
    db-migrate down \
      --verbose \
      --config $CONFIG \
      --migrations-dir $PATHDIR \
      -e $STAGE
      $VERSION

}
while [ $# -gt 1 ]
do
    key="$1"
    case "$key" in
        -s|--stage)
            STAGE=$2
            shift 2
            ;;
        -n|--name)
            FILENAME=$2
            shift 2
            ;;
        -p|--path)
            PATHDIR=$2
            shift 2
            ;;
        -u|--use)
            USE=$2
            shift 2
            ;;
        -v|--version)
            VERSION=$2
            shift 2
            ;;
    esac
done
echo "name" $NAME
echo "stage" $STAGE
echo "path" $PATHDIR
echo "use" $USE
echo "version" $VERSION
echo "config" $CONFIG

case $USE in
     create)
       check_site_folder
       create_site_folder
       create
       ;;
     migrate)
       check_site_folder
       check_common_folder
       create_site_folder
       migrate_common
       migrate
       ;;
     reset)
       reset
       ;;
     down)
       down
       ;;
     *)
       echo "no a valid usage"
       exit 1
       ;;
esac
