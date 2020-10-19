ALTER TABLE wiprocurement.eedm_pn_price DROP COLUMN currency_price;
ALTER TABLE wiprocurement.eebom_detail
  DROP COLUMN last_price_currency_price,
  DROP COLUMN last_price_currency;

ALTER TABLE wiprocurement.eedm_spa_price
  DROP COLUMN original_currency,
  DROP COLUMN original_spa_price;
