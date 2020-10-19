CREATE TABLE IF NOT EXISTS wiprocurement.exchange_rate (
  KURST                 varchar(4),
  FCURR                 text,
  TCURR                 text,
  GDATU                 varchar(8),
  KURSM                 decimal(13,3),
  UKURS                 decimal(13,3),
  FFACT                 decimal(13,3),
  TFACT                 decimal(13,3),
  OPMOD                 text,
  CRTDT                 date,
  CRTTM                 time,
  primary key (KURST, FCURR, TCURR, GDATU)
);