CREATE TABLE IF NOT EXISTS wiprocurement.eedm_spa_price
(
  partnumber              character varying(30),
  spa_price               numeric,
  spa_partnumber          character varying(30),
  manufacturer            character varying(100),
  update_time             timestamp with time zone,
  CONSTRAINT eedm_spa_price_pkey PRIMARY KEY (partnumber)
);
