CREATE TABLE IF NOT EXISTS wiprocurement.logs_kafka_import (
  uuid                   uuid NOT NULL DEFAULT uuid_generate_v1(),
  logtype                varchar,
  logname                varchar,
  fetch_count            bigint,
  update_time            TIMESTAMP WITH TIME ZONE DEFAULT now(),
  dura_sec               numeric,
  start_date             varchar,
  topic                  varchar,
  partition              numeric,
  "offset"               numeric,
  status                 varchar,
  rsv1                   varchar,
  rsv2                   varchar,
  rsv3                   varchar,
  create_time            TIMESTAMP WITH TIME ZONE DEFAULT now(),
  primary key(uuid)
);

CREATE INDEX IDX_logs_kafka_import_typename ON wiprocurement.logs_kafka_import(logtype, logname, status);
