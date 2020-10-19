drop table if exists formula.cableffc_dt_material;

drop table if exists formula.cableffc_dt_material_category;
drop table if exists formula.cableffc_dt_material_vendor;

CREATE TABLE if not exists formula.cableffc_dt_material_category (
	id serial NOT NULL,
	category_name varchar(200),
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz  null,
	CONSTRAINT cableffc_dt_material_category_pk PRIMARY KEY (id),
	CONSTRAINT cableffc_dt_material_category_un UNIQUE (category_name)
);
insert into formula.cableffc_dt_material_category(category_name)values('皮膜'),('銅線')
on conflict do nothing;

CREATE TABLE if not exists formula.cableffc_dt_material_vendor (
	id serial NOT NULL,
	vendor_name varchar(200),
	create_time timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT cableffc_dt_material_vendor_pk PRIMARY KEY (id),
	CONSTRAINT cableffc_dt_material_vendor_un UNIQUE (vendor_name)
);
insert into formula.cableffc_dt_material_vendor(vendor_name)values('樺晟')
on conflict do nothing;

CREATE TABLE if not exists formula.cableffc_dt_material (
	id uuid not null DEFAULT uuid_generate_v1(),
	category_id int4,
	spec varchar(200),
	material_l varchar(100),
	material_w varchar(100),
	thickness varchar(100),
	vendor_id int4,
	part_number varchar(200),
	product_type_id int4,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz  null,
	CONSTRAINT cableffc_dt_material_pk PRIMARY KEY (id),
	CONSTRAINT cableffc_dt_material_fk_category_id FOREIGN KEY (category_id) REFERENCES formula.cableffc_dt_material_category(id),
	CONSTRAINT cableffc_dt_material_fk_vendor_id FOREIGN KEY (vendor_id) REFERENCES formula.cableffc_dt_material_vendor(id),
	CONSTRAINT cableffc_dt_material_fk_product_type_id FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id),
	CONSTRAINT cableffc_dt_material_un UNIQUE (spec, product_type_id)
);
insert into formula.cableffc_dt_material(category_id, spec, material_l, material_w, thickness, vendor_id, part_number, product_type_id)values
((select id from formula.cableffc_dt_material_category where category_name = '皮膜'), '皮膜RoHS 2.0', '1000', '120', '0.06', (select id from formula.cableffc_dt_material_vendor where vendor_name = '樺晟'), null, (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_material_category where category_name = '皮膜'), '皮膜RoHS 2.0+HF', '1000', '120', '0.06', (select id from formula.cableffc_dt_material_vendor where vendor_name = '樺晟'), null, (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_material_category where category_name = '銅線'), '銅線0.05*0.5T', '1000', '0.5', '0.05', (select id from formula.cableffc_dt_material_vendor where vendor_name = '樺晟'), null, (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_material_category where category_name = '銅線'), '銅線0.035*0.3T', '1000', '0.3', '0.035', (select id from formula.cableffc_dt_material_vendor where vendor_name = '樺晟'), null, (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_material_category where category_name = '皮膜'), '皮膜RoHS 2.0', '1000', '120', '0.06', (select id from formula.cableffc_dt_material_vendor where vendor_name = '樺晟'), null, (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_material_category where category_name = '皮膜'), '皮膜RoHS 2.0+HF', '1000', '120', '0.06', (select id from formula.cableffc_dt_material_vendor where vendor_name = '樺晟'), null, (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_material_category where category_name = '銅線'), '銅線0.05*0.5T', '1000', '0.5', '0.05', (select id from formula.cableffc_dt_material_vendor where vendor_name = '樺晟'), null, (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_material_category where category_name = '銅線'), '銅線0.035*0.3T', '1000', '0.3', '0.035', (select id from formula.cableffc_dt_material_vendor where vendor_name = '樺晟'), null, (select id from formula.product_type where type_name = 'AIO'))
on conflict do nothing;

insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_ma.id, sd.id, '0.1049', 'number', 'cableffc_dt_material'
from formula.cableffc_dt_material ffc_ma,
formula.schedule_date sd
where ffc_ma.spec = '皮膜RoHS 2.0'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_ma.product_type_id
on conflict do nothing;

insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_ma.id, sd.id, '0.1661', 'number', 'cableffc_dt_material'
from formula.cableffc_dt_material ffc_ma,
formula.schedule_date sd
where ffc_ma.spec = '皮膜RoHS 2.0+HF'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_ma.product_type_id
on conflict do nothing;

insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_ma.id, sd.id, '0.0047', 'number', 'cableffc_dt_material'
from formula.cableffc_dt_material ffc_ma,
formula.schedule_date sd
where ffc_ma.spec = '銅線0.05*0.5T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_ma.product_type_id
on conflict do nothing;

insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_ma.id, sd.id, '0.0023', 'number', 'cableffc_dt_material'
from formula.cableffc_dt_material ffc_ma,
formula.schedule_date sd
where ffc_ma.spec = '銅線0.035*0.3T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_ma.product_type_id
on conflict do nothing;

