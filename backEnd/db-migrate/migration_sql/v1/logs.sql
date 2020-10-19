CREATE TABLE IF NOT EXISTS wiprocurement.logs (
  uuid                   uuid NOT NULL DEFAULT uuid_generate_v1(),
  logtype                varchar,
  logname                varchar,
  fetch_count            bigint,
  update_time            TIMESTAMP WITH TIME ZONE DEFAULT now(),
  dura_sec               numeric,
  rsv1                   varchar,
  rsv2                   varchar,
  rsv3                   varchar,
  status                 varchar,
  create_time            TIMESTAMP WITH TIME ZONE DEFAULT now(),
  primary key(uuid)
);

CREATE INDEX IDX_logs_typename ON wiprocurement.logs(logtype, logname);
CREATE INDEX IDX_logs_time ON wiprocurement.logs(update_time);

CREATE TABLE IF NOT EXISTS wiprocurement.logs_kafka (
  uuid                   varchar,
  logtype                varchar,
  logname                varchar,
  fetch_count            bigint,
  update_time            TIMESTAMP WITH TIME ZONE DEFAULT now(),
  dura_sec               numeric,
  rsv1                   varchar,
  rsv2                   varchar,
  rsv3                   varchar,
  status                 varchar,
  create_time            TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IDX_logs_kafka_typename ON wiprocurement.logs_kafka(logtype, logname);
