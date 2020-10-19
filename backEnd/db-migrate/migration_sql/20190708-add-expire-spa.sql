ALTER TABLE wiprocurement.eedm_spa_price
  ADD COLUMN IF NOT EXISTS exp_spa_partnumber varchar(30),
  ADD COLUMN IF NOT EXISTS exp_spa_price numeric,
  ADD COLUMN IF NOT EXISTS exp_manufacturer varchar(30),
  ADD COLUMN IF NOT EXISTS expire_time date;
