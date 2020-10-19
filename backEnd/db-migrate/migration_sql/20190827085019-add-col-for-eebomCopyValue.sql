ALTER TABLE wiprocurement.eedm_pn_price ADD COLUMN IF NOT EXISTS currency_price numeric;
ALTER TABLE wiprocurement.eebom_detail ADD COLUMN IF NOT EXISTS last_price_currency_price numeric;
ALTER TABLE wiprocurement.eebom_detail ADD COLUMN IF NOT EXISTS last_price_currency varchar;

ALTER TABLE wiprocurement.eedm_spa_price ADD COLUMN IF NOT EXISTS original_currency varchar;
ALTER TABLE wiprocurement.eedm_spa_price ADD COLUMN IF NOT EXISTS original_spa_price numeric;
