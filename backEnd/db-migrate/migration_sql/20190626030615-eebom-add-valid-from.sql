CREATE INDEX if not exists eina_lifnr_idx ON wiprocurement.eina (lifnr);
CREATE INDEX if not exists eina_matnr_idx ON wiprocurement.eina (matnr);
ALTER TABLE wiprocurement.eedm_pn_price ADD COLUMN IF NOT EXISTS valid_from date;
ALTER TABLE wiprocurement.eebom_detail ADD COLUMN IF NOT EXISTS valid_from date;

