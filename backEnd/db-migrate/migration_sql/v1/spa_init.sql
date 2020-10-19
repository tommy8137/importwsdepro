CREATE TABLE IF NOT EXISTS wiprocurement.specgroup (
  g_id                   serial NOT NULL PRIMARY KEY ,
  g_name                 text NOT NULL ,
  g_owner                text NOT NULL ,
  type1                  text NOT NULL ,
  type2                  text NOT NULL
);

CREATE TABLE IF NOT EXISTS wiprocurement.specgroup_sourcer (
  id                   serial NOT NULL PRIMARY KEY ,
  g_id                 integer NOT NULL ,
  scode                text NOT NULL
);

CREATE TABLE IF NOT EXISTS wiprocurement.specgroup_spec (
  id                   serial NOT NULL PRIMARY KEY ,
  g_id                 integer NOT NULL ,
  spec                 integer NOT NULL ,
  item                 text NOT NULL
);