drop table if exists formula.cableffc_dt_connector;

drop table if exists formula.cableffc_dt_connector_category;
drop table if exists formula.cableffc_dt_connector_spec;
drop table if exists formula.cableffc_dt_connector_vendor;

CREATE TABLE if not exists formula.cableffc_dt_connector_category (
	id serial NOT NULL,
	category_name varchar(200),
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz  null,
	CONSTRAINT cableffc_dt_connector_category_pk PRIMARY KEY (id),
	CONSTRAINT cableffc_dt_connector_category_un UNIQUE (category_name)
);
insert into formula.cableffc_dt_connector_category(category_name)values('FFC');

CREATE TABLE if not exists formula.cableffc_dt_connector_spec (
	id serial NOT NULL,
	spec_name varchar(200),
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz  null,
	CONSTRAINT cableffc_dt_connector_spec_pk PRIMARY KEY (id),
	CONSTRAINT cableffc_dt_connector_spec_un UNIQUE (spec_name)
);
insert into formula.cableffc_dt_connector_spec(spec_name)values('壓接/刺破式')
on conflict do nothing;

CREATE TABLE if not exists formula.cableffc_dt_connector_vendor (
	id serial NOT NULL,
	vendor_name varchar(200),
	create_time timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT cableffc_dt_connector_vendor_pk PRIMARY KEY (id),
	CONSTRAINT cableffc_dt_connector_vendor_un UNIQUE (vendor_name)
);
insert into formula.cableffc_dt_connector_vendor(vendor_name)values('QY')
on conflict do nothing;

CREATE TABLE if not exists formula.cableffc_dt_connector (
	id uuid not null DEFAULT uuid_generate_v1(),
	category_id int4,
	spec_id int4,
	pitch varchar(100),
	row_num varchar(100),
	pin varchar(100),
	vendor_id int4 ,
	part_number varchar(200),
	product_type_id int4,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz  null,
	CONSTRAINT cableffc_dt_connector_pk PRIMARY KEY (id),
	CONSTRAINT cableffc_dt_connector_fk_category_id FOREIGN KEY (category_id) REFERENCES formula.cableffc_dt_connector_category(id),
	CONSTRAINT cableffc_dt_connector_fk_spec_id FOREIGN KEY (spec_id) REFERENCES formula.cableffc_dt_connector_spec(id),
	CONSTRAINT cableffc_dt_connector_fk_vendor_id FOREIGN KEY (vendor_id) REFERENCES formula.cableffc_dt_connector_vendor(id),
	CONSTRAINT cableffc_dt_connector_fk_product_type_id FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id),
	CONSTRAINT cableffc_dt_connector_un UNIQUE (category_id, spec_id, pitch, row_num, pin, vendor_id, product_type_id)
);
insert into formula.cableffc_dt_connector(category_id, spec_id, pitch, row_num, pin, vendor_id, part_number, product_type_id)values
((select id from formula.cableffc_dt_connector_category where category_name = 'FFC'), (select id from formula.cableffc_dt_connector_spec where spec_name = '壓接/刺破式'), '1', '1', '30', (select id from formula.cableffc_dt_connector_vendor where vendor_name = 'QY'), 'FFC-30XZHL-A-03', (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_connector_category where category_name = 'FFC'), (select id from formula.cableffc_dt_connector_spec where spec_name = '壓接/刺破式'), '1', '1', '30', (select id from formula.cableffc_dt_connector_vendor where vendor_name = 'QY'), 'FFC-30XZHL-A-03', (select id from formula.product_type where type_name = 'AIO'))
on conflict do nothing;

insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_co.id, sd.id, '0.0380', 'number', 'cableffc_dt_connector'
from formula.cableffc_dt_connector ffc_co,
formula.schedule_date sd
where ffc_co.spec_id = (select id from formula.cableffc_dt_connector_spec where spec_name = '壓接/刺破式')
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_co.product_type_id
on conflict do nothing;

