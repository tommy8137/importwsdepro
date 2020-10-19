/* Replace with your SQL commands */
drop view if exists formula.v_cablewire_connector_item_type;
CREATE TABLE if not exists formula.cablewire_connector_type_v1 (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	connector_type varchar(200) NOT NULL,
	connector_item_id uuid not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT cablewire_connector_type_v1_v1_pk PRIMARY KEY (id),
	CONSTRAINT cablewire_connector_type_v1_un UNIQUE (connector_type,connector_item_id),
	CONSTRAINT cablewire_connector_type_v1_fk FOREIGN KEY (connector_item_id) REFERENCES formula.cablewire_connector_item(id)
);

drop table if exists formula.cablewire_connector_vendor;
CREATE TABLE if not exists formula.cablewire_connector_vendor (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	vendor_pn varchar(200) NOT NULL,
	connector_type_id uuid not null,
	price uuid not null,
	process_time uuid not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT cablewire_connector_vendor_pk PRIMARY KEY (id),
	CONSTRAINT cablewire_connector_vendor_un UNIQUE (connector_type_id,vendor_pn),
	CONSTRAINT cablewire_connector_vendor_fk FOREIGN KEY (connector_type_id) REFERENCES formula.cablewire_connector_type_v1(id)
);

insert into formula.cablewire_connector_type_v1(connector_type, connector_item_id)
select distinct cct.connector_type, cct.connector_item_id from formula.cablewire_connector_type cct;

insert into formula.cablewire_connector_vendor(id, connector_type_id, vendor_pn, price, process_time)
select cct.id as vendor_id, cctt.id as connector_type_id, cct.vendor_pn, cct.price, cct.process_time from formula.cablewire_connector_type cct, formula.cablewire_connector_type_v1 cctt
where cct.connector_type = cctt.connector_type;

drop view if exists formula.v_cablewire_connector_item_type;
CREATE OR REPLACE VIEW formula.v_cablewire_connector_item_type AS 
SELECT
    cci.id as connector_item_id,
    cci.connector_item,
    cct.id as connector_type_id,
    cct.connector_type,
    ccv.id as vendor_id,
    ccv.vendor_pn,
    ccv.disable_time
   FROM formula.cablewire_connector_type_v1 cct,
    formula.cablewire_connector_item cci, formula.cablewire_connector_vendor ccv
  WHERE cci.id = cct.connector_item_id and ccv.connector_type_id = cct.id;
