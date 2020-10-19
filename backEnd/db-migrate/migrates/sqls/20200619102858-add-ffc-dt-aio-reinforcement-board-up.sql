drop table if exists formula.cableffc_dt_reinforcement_board;

drop table if exists formula.cableffc_dt_reinforcement_board_vendor;

CREATE TABLE if not exists formula.cableffc_dt_reinforcement_board_vendor (
	id serial NOT NULL,
	vendor_name varchar(200),
	create_time timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT cableffc_dt_reinforcement_board_vendor_pk PRIMARY KEY (id),
	CONSTRAINT cableffc_dt_reinforcement_board_vendor_un UNIQUE (vendor_name)
);
insert into formula.cableffc_dt_reinforcement_board_vendor (vendor_name) values
('樺晟')
on conflict do nothing;

CREATE TABLE if not exists formula.cableffc_dt_reinforcement_board (
	id uuid not null DEFAULT uuid_generate_v1(),
	spec varchar(200),
	material_l varchar(100),
	material_w varchar(100),
	thickness varchar(100),
	vendor_id int4,
	part_number varchar(200),
	product_type_id int4,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz  null,
	CONSTRAINT cableffc_dt_reinforcement_board_pk PRIMARY KEY (id),
	CONSTRAINT cableffc_dt_reinforcement_board_fk_vendor_id FOREIGN KEY (vendor_id) REFERENCES formula.cableffc_dt_reinforcement_board_vendor(id),
	CONSTRAINT cableffc_dt_reinforcement_board_fk_product_type_id FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id),
	CONSTRAINT cableffc_dt_reinforcement_board_un UNIQUE (spec, product_type_id)
);
insert into formula.cableffc_dt_reinforcement_board(spec, material_l, material_w, thickness, vendor_id, part_number, product_type_id)values
('補強板HF', '1000', '1000', '0.205', (select id from formula.cableffc_dt_reinforcement_board_vendor where vendor_name = '樺晟'), null, (select id from formula.product_type where type_name = 'DT')),
('補強板HF', '1000', '1000', '0.205', (select id from formula.cableffc_dt_reinforcement_board_vendor where vendor_name = '樺晟'), null, (select id from formula.product_type where type_name = 'AIO'))
on conflict do nothing;

-- 補強板HF - 8.1136
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_rb.id, sd.id, '8.1136', 'number', 'cableffc_dt_reinforcement_board'
from formula.cableffc_dt_reinforcement_board ffc_rb,
formula.schedule_date sd
where ffc_rb.spec = '補強板HF'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_rb.product_type_id
on conflict do nothing;
