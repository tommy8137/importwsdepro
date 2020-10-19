drop table wiprocurement.eedm_pn_price;
CREATE TABLE wiprocurement.eedm_pn_price (
	partnumber varchar NOT NULL,
	purchaseorg varchar NOT NULL,
	mpnno varchar NULL,
	description varchar NULL,
	vendor_code varchar NULL,
	manufacturer varchar NULL,
	vendor_pn varchar NULL,
	price numeric NULL,
	currency varchar NULL,
	exchange_rate numeric NULL,
	update_time timestamptz NULL,
	update_by varchar NULL,
	create_time timestamptz NULL DEFAULT now(),
	create_by varchar NULL,
	CONSTRAINT eedm_pn_price_pkey PRIMARY KEY (partnumber, purchaseorg)
);

GRANT SELECT ON TABLE wiprocurement.eedm_pn_price TO eedm;
GRANT SELECT ON TABLE wiprocurement.plant_list TO eedm;