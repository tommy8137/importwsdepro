--delete from formula.parameter_value where parameter_id in (select id from formula.rubber_material rm);

SET search_path TO formula, public, wiprocurement;
drop table if exists rubber_machine_product_type;
drop table if exists rubber_machine;
drop table if exists rubber_adhesive;
drop table if exists rubber_stamping;
drop table if exists rubber_printing;
drop table if exists rubber_material;
drop table if exists rubber_material_spec;

CREATE TABLE IF NOT EXISTS rubber_material_spec (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	spec_name varchar(200) not null,
	part_category_2_id uuid not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT rubber_material_spec_pk PRIMARY KEY (id),
	CONSTRAINT rubber_material_spec_fk FOREIGN KEY (part_category_2_id) REFERENCES part_category_2(id),
	CONSTRAINT rubber_material_spec_un UNIQUE (spec_name)
);

CREATE TABLE IF NOT EXISTS rubber_material (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	spec_id uuid not null,
	material_name varchar(200) not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT rubber_material_pk PRIMARY KEY (id),
	CONSTRAINT rubber_material_fk FOREIGN KEY (spec_id) REFERENCES rubber_material_spec(id),
	CONSTRAINT rubber_material_un UNIQUE (spec_id,material_name)
);

CREATE TABLE IF NOT EXISTS rubber_printing (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	printing_name varchar(200) not null,
	unit_price uuid NOT NULL DEFAULT uuid_generate_v1(),
	usage_amount uuid NOT NULL DEFAULT uuid_generate_v1(),
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT rubber_printing_pk PRIMARY KEY (id),
	CONSTRAINT rubber_printing_un UNIQUE (printing_name)
);

CREATE TABLE IF NOT EXISTS rubber_adhesive (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	adhesive_name varchar(200) not null,
	unit_price uuid NOT NULL DEFAULT uuid_generate_v1(),
	process_time uuid NOT NULL DEFAULT uuid_generate_v1(),
	usage_amount uuid NOT NULL DEFAULT uuid_generate_v1(),
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT rubber_adhesive_pk PRIMARY KEY (id),
	CONSTRAINT rubber_adhesive_un UNIQUE (adhesive_name)
);

CREATE TABLE IF NOT EXISTS rubber_stamping(
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	stamping_name varchar(200) not null,
	unit_price uuid NOT NULL DEFAULT uuid_generate_v1(),
	process_time uuid NOT NULL DEFAULT uuid_generate_v1(),
	usage_amount uuid NOT NULL DEFAULT uuid_generate_v1(),
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT rubber_stamping_pk PRIMARY KEY (id),
	CONSTRAINT rubber_stamping_un UNIQUE (stamping_name)
);

CREATE TABLE IF NOT EXISTS rubber_machine (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	ton varchar(200) not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT rubber_machine_pk PRIMARY KEY (id),
	CONSTRAINT rubber_machine_un UNIQUE (ton)
);

CREATE TABLE IF NOT EXISTS rubber_machine_product_type (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	machine_id uuid not null,
	product_type_id int4 not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT rubber_machine_product_type_pk PRIMARY KEY (id),
	CONSTRAINT rubber_machine_product_type_fk FOREIGN KEY (machine_id) REFERENCES rubber_machine(id),
	CONSTRAINT rubber_machine_product_type_fk2 FOREIGN KEY (product_type_id) REFERENCES product_type(id),
	CONSTRAINT rubber_machine_product_type_un UNIQUE (machine_id,product_type_id)
);

delete from formula.parameter_value as pv where activate_date_id in (select id from formula.schedule_date as sd where sd.formula_type_id = (select id from formula.formula_type as ft where ft."name" = 'me_others_rubber'));
delete from formula.common_parameter as cp where cp.formula_type_id = (select id from formula.formula_type as ft where ft."name" = 'me_others_rubber');
delete from formula.schedule_date as sd where sd.formula_type_id = (select id from formula.formula_type as ft where ft."name" = 'me_others_rubber');

--formula_type
INSERT INTO formula.formula_type("name", remark, create_time) VALUES('me_others_rubber', null, now()) on conflict do nothing;

--schedule_date
INSERT INTO formula.schedule_date("name", formula_type_id, activate_date, create_time) VALUES('me_others_rubber_init', (select id from formula.formula_type where name='me_others_rubber'), '1970-01-01', now());


--rubber material spec
INSERT INTO formula.rubber_material_spec (spec_name, part_category_2_id) VALUES('TPU', (select id from formula.part_category_2 where category_name = 'Rubber'));
INSERT INTO formula.rubber_material_spec (spec_name, part_category_2_id) VALUES('Silicon', (select id from formula.part_category_2 where category_name = 'Rubber'));

--rubber material
INSERT INTO formula.rubber_material (spec_id, material_name) VALUES((select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Covestro_UDS70AU');
INSERT INTO formula.rubber_material (spec_id, material_name) VALUES((select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Covestro_IT85AU');
INSERT INTO formula.rubber_material (spec_id, material_name) VALUES((select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Covestro_8785A');
INSERT INTO formula.rubber_material (spec_id, material_name) VALUES((select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Covestro_1070AU');
INSERT INTO formula.rubber_material (spec_id, material_name) VALUES((select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Covestro_5377A');
INSERT INTO formula.rubber_material (spec_id, material_name) VALUES((select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Covestro_1065AU');
INSERT INTO formula.rubber_material (spec_id, material_name) VALUES((select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Huntsman_AVALON 85AE');
INSERT INTO formula.rubber_material (spec_id, material_name) VALUES((select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Huntsman_AVALON 80AE');
INSERT INTO formula.rubber_material (spec_id, material_name) VALUES((select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Huntsman_AVALON 75AE');
INSERT INTO formula.rubber_material (spec_id, material_name) VALUES((select id from formula.rubber_material_spec where spec_name = 'TPU'), 'Huntsman_AVALON 65AB ');
INSERT INTO formula.rubber_material (spec_id, material_name) VALUES((select id from formula.rubber_material_spec where spec_name = 'Silicon'), 'Silicon_矽膠');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 10.8, 'number', 'rubber_material' from formula.rubber_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where spec_id = (select id from formula.rubber_material_spec where spec_name = 'TPU') and material_name = 'Covestro_UDS70AU' order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 14.2, 'number', 'rubber_material' from formula.rubber_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where spec_id = (select id from formula.rubber_material_spec where spec_name = 'TPU') and material_name = 'Covestro_IT85AU' order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 6.2, 'number', 'rubber_material' from formula.rubber_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where spec_id = (select id from formula.rubber_material_spec where spec_name = 'TPU') and material_name = 'Covestro_8785A' order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 12.3, 'number', 'rubber_material' from formula.rubber_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where spec_id = (select id from formula.rubber_material_spec where spec_name = 'TPU') and material_name = 'Covestro_1070AU' order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 14.8, 'number', 'rubber_material' from formula.rubber_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where spec_id = (select id from formula.rubber_material_spec where spec_name = 'TPU') and material_name = 'Covestro_5377A' order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 6.7, 'number', 'rubber_material' from formula.rubber_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where spec_id = (select id from formula.rubber_material_spec where spec_name = 'TPU') and material_name = 'Covestro_1065AU' order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 6, 'number', 'rubber_material' from formula.rubber_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where spec_id = (select id from formula.rubber_material_spec where spec_name = 'TPU') and material_name = 'Huntsman_AVALON 85AE' order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 6.1, 'number', 'rubber_material' from formula.rubber_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where spec_id = (select id from formula.rubber_material_spec where spec_name = 'TPU') and material_name = 'Huntsman_AVALON 80AE' order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 6.5, 'number', 'rubber_material' from formula.rubber_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where spec_id = (select id from formula.rubber_material_spec where spec_name = 'TPU') and material_name = 'Huntsman_AVALON 75AE' order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 6.8, 'number', 'rubber_material' from formula.rubber_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where spec_id = (select id from formula.rubber_material_spec where spec_name = 'TPU') and material_name = 'Huntsman_AVALON 65AB ' order by tm.id;
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select tm.id, schedule.id, 6.8657, 'number', 'rubber_material' from formula.rubber_material tm, (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )) as schedule where spec_id = (select id from formula.rubber_material_spec where spec_name = 'Silicon') and material_name = 'Silicon_矽膠' order by tm.id;

--rubber machine
INSERT INTO formula.rubber_machine (ton) VALUES('290T');
INSERT INTO formula.rubber_machine (ton) VALUES('250T');
INSERT INTO formula.rubber_machine (ton) VALUES('240T');
INSERT INTO formula.rubber_machine (ton) VALUES('210T');
INSERT INTO formula.rubber_machine (ton) VALUES('190T');
INSERT INTO formula.rubber_machine (ton) VALUES('180T');
INSERT INTO formula.rubber_machine (ton) VALUES('160T');
INSERT INTO formula.rubber_machine (ton) VALUES('150T');


--rubber machine product type
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '290T'), (select id from formula.product_type where type_name = 'NB'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '290T'), (select id from formula.product_type where type_name = 'DT'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '290T'), (select id from formula.product_type where type_name = 'OTHERS'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '250T'), (select id from formula.product_type where type_name = 'NB'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '250T'), (select id from formula.product_type where type_name = 'DT'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '250T'), (select id from formula.product_type where type_name = 'OTHERS'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '240T'), (select id from formula.product_type where type_name = 'NB'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '240T'), (select id from formula.product_type where type_name = 'DT'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '240T'), (select id from formula.product_type where type_name = 'OTHERS'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '210T'), (select id from formula.product_type where type_name = 'NB'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '210T'), (select id from formula.product_type where type_name = 'DT'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '210T'), (select id from formula.product_type where type_name = 'OTHERS'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '190T'), (select id from formula.product_type where type_name = 'NB'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '190T'), (select id from formula.product_type where type_name = 'DT'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '190T'), (select id from formula.product_type where type_name = 'OTHERS'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '180T'), (select id from formula.product_type where type_name = 'NB'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '180T'), (select id from formula.product_type where type_name = 'DT'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '180T'), (select id from formula.product_type where type_name = 'OTHERS'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '160T'), (select id from formula.product_type where type_name = 'NB'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '160T'), (select id from formula.product_type where type_name = 'DT'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '160T'), (select id from formula.product_type where type_name = 'OTHERS'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '150T'), (select id from formula.product_type where type_name = 'NB'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '150T'), (select id from formula.product_type where type_name = 'DT'));
INSERT INTO formula.rubber_machine_product_type (machine_id, product_type_id) VALUES((select id from formula.rubber_machine where ton = '150T'), (select id from formula.product_type where type_name = 'OTHERS'));


INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '290T') and product_type_id = (select id from formula.product_type where type_name = 'NB')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1906, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '290T') and product_type_id = (select id from formula.product_type where type_name = 'DT')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1588, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '290T') and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1508, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '250T') and product_type_id = (select id from formula.product_type where type_name = 'NB')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1694, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '250T') and product_type_id = (select id from formula.product_type where type_name = 'DT')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.158, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '250T') and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1508, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '240T') and product_type_id = (select id from formula.product_type where type_name = 'NB')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1694, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '240T') and product_type_id = (select id from formula.product_type where type_name = 'DT')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1694, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '240T') and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1508, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '210T') and product_type_id = (select id from formula.product_type where type_name = 'NB')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1482, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '210T') and product_type_id = (select id from formula.product_type where type_name = 'DT')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1482, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '210T') and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1215, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '190T') and product_type_id = (select id from formula.product_type where type_name = 'NB')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1482, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '190T') and product_type_id = (select id from formula.product_type where type_name = 'DT')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.127, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '190T') and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1215, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '180T') and product_type_id = (select id from formula.product_type where type_name = 'NB')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1482, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '180T') and product_type_id = (select id from formula.product_type where type_name = 'DT')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.127, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '180T') and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1215, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '160T') and product_type_id = (select id from formula.product_type where type_name = 'NB')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1271, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '160T') and product_type_id = (select id from formula.product_type where type_name = 'DT')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.127, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '160T') and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1215, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '150T') and product_type_id = (select id from formula.product_type where type_name = 'NB')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.1271, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '150T') and product_type_id = (select id from formula.product_type where type_name = 'DT')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.127, 'number', 'rubber_machine_product_type', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.rubber_machine_product_type WHERE machine_id = (select id from formula.rubber_machine where ton = '150T') and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.127, 'number', 'rubber_machine_product_type', now());

--rubber printing
INSERT INTO formula.rubber_printing (printing_name) VALUES('N/A');
INSERT INTO formula.rubber_printing (printing_name) VALUES('網印');
INSERT INTO formula.rubber_printing (printing_name) VALUES('移印');
INSERT INTO formula.rubber_printing (printing_name) VALUES('套印');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT unit_price FROM formula.rubber_printing WHERE printing_name = 'N/A'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0, 'number', 'rubber_printing', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT unit_price FROM formula.rubber_printing WHERE printing_name = '網印'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.04, 'number', 'rubber_printing', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT unit_price FROM formula.rubber_printing WHERE printing_name = '移印'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.045, 'number', 'rubber_printing', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT unit_price FROM formula.rubber_printing WHERE printing_name = '套印'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 1.26, 'number', 'rubber_printing', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usage_amount FROM formula.rubber_printing WHERE printing_name = 'N/A'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0, 'number', 'rubber_printing', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usage_amount FROM formula.rubber_printing WHERE printing_name = '網印'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 1, 'number', 'rubber_printing', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usage_amount FROM formula.rubber_printing WHERE printing_name = '移印'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 1, 'number', 'rubber_printing', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usage_amount FROM formula.rubber_printing WHERE printing_name = '套印'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 1, 'number', 'rubber_printing', now());


--rubber stamping
INSERT INTO formula.rubber_stamping (stamping_name) VALUES('N/A');
INSERT INTO formula.rubber_stamping (stamping_name) VALUES('大版下料');
INSERT INTO formula.rubber_stamping (stamping_name) VALUES('小版下料');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT unit_price FROM formula.rubber_stamping WHERE stamping_name = 'N/A'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0, 'number', 'rubber_stamping', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT unit_price FROM formula.rubber_stamping WHERE stamping_name = '大版下料'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.01, 'number', 'rubber_stamping', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT unit_price FROM formula.rubber_stamping WHERE stamping_name = '小版下料'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.01, 'number', 'rubber_stamping', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT process_time FROM formula.rubber_stamping WHERE stamping_name = 'N/A'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0, 'number', 'rubber_stamping', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT process_time FROM formula.rubber_stamping WHERE stamping_name = '大版下料'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 10, 'number', 'rubber_stamping', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT process_time FROM formula.rubber_stamping WHERE stamping_name = '小版下料'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 10, 'number', 'rubber_stamping', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usage_amount FROM formula.rubber_stamping WHERE stamping_name = 'N/A'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0, 'number', 'rubber_stamping', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usage_amount FROM formula.rubber_stamping WHERE stamping_name = '大版下料'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 1, 'number', 'rubber_stamping', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usage_amount FROM formula.rubber_stamping WHERE stamping_name = '小版下料'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 1, 'number', 'rubber_stamping', now());

--rubber adhesive
INSERT INTO formula.rubber_adhesive (adhesive_name) VALUES('N/A');
INSERT INTO formula.rubber_adhesive (adhesive_name) VALUES('整版貼');
INSERT INTO formula.rubber_adhesive (adhesive_name) VALUES('單片貼');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT unit_price FROM formula.rubber_adhesive WHERE adhesive_name = 'N/A'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0, 'number', 'rubber_adhesive', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT unit_price FROM formula.rubber_adhesive WHERE adhesive_name = '整版貼'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.066, 'number', 'rubber_adhesive', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT unit_price FROM formula.rubber_adhesive WHERE adhesive_name = '單片貼'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.066, 'number', 'rubber_adhesive', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT process_time FROM formula.rubber_adhesive WHERE adhesive_name = 'N/A'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0, 'number', 'rubber_adhesive', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT process_time FROM formula.rubber_adhesive WHERE adhesive_name = '整版貼'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 60, 'number', 'rubber_adhesive', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT process_time FROM formula.rubber_adhesive WHERE adhesive_name = '單片貼'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 15, 'number', 'rubber_adhesive', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usage_amount FROM formula.rubber_adhesive WHERE adhesive_name = 'N/A'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0, 'number', 'rubber_adhesive', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usage_amount FROM formula.rubber_adhesive WHERE adhesive_name = '整版貼'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 1, 'number', 'rubber_adhesive', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usage_amount FROM formula.rubber_adhesive WHERE adhesive_name = '單片貼'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 1, 'number', 'rubber_adhesive', now());

--rubber parameter
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_material', '', 'material_density', 'g/cm3', '密度', '材料費_密度');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_material', '', 'material_adhesive_unit_price', 'USD', '背膠材料單價', '材料費_背膠材料單價');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_forming', '', 'forming_wider', '%', '成型放寬', '成型費_成型放寬');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_forming', '', 'forming_loss_rate', '%', '成品沖型 Loss Rate', '成型費_Loss_Rate');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_forming', '', 'forming_machine_price', 'USD', 'Silicon 機台費', '成型費_Silicon機台費');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_second_process', '', 'stamping_loss_rate', '%', '成品沖型 Loss Rate', '二次加工_成品沖型 Loss Rate');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_second_process', '', 'adhesive_loss_rate', '%', '貼背膠_3M Loss Rate', '二次加工_貼背膠_3M Loss Rate');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_second_process', '', 'printing_loss_rate', '%', '外觀印刷 Loss Rate', '二次加工_外觀印刷 Loss Rate');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_second_process', '', 'glue_syscle_time', 'sec', '刷膠製程 Cycle Time', '二次加工_刷膠製程 Cycle Time');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_second_process', '', 'glue_unit_price', 'USD/min', '刷膠製程 單價', '二次加工_刷膠製程 單價');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_second_process', '', 'glue_usage_amount', '次', '刷膠製程 usage amount', '二次加工_刷膠製程 usage amount');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_second_process', '', 'glue_loss_rate', '%', '刷膠製程 Loss Rate', '二次加工_刷膠製程 Loss Rate');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_second_process', '', 'burring_cycle_time', 'sec', '去毛邊/排廢 Cycle Time', '二次加工_去毛邊/排廢 Cycle Time');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_second_process', '', 'burring_unit_price', 'USD/min', '去毛邊/排廢 單價', '二次加工_去毛邊/排廢 單價');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_second_process', '', 'burring_usage_amount', '次', '去毛邊/排廢 usage amount', '二次加工_去毛邊/排廢 usage amount');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_second_process', '', 'burring_loss_rate', '%', '去毛邊/排廢 Loss Rate', '二次加工');
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark) VALUES ((SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )), 'me_others_rubber_management_and_profit', '', 'management_and_profit', '%', '管銷&利潤常數', 'total管銷&利潤常數');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_material') AND (label='material_density')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.92, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_material') AND (label='material_adhesive_unit_price')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 15, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_forming') AND (label='forming_wider')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_forming') AND (label='forming_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.01, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_forming') AND (label='forming_machine_price')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.2667, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_second_process') AND (label='stamping_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.01, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_second_process') AND (label='adhesive_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.03, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_second_process') AND (label='printing_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.015, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_second_process') AND (label='glue_syscle_time')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 30, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_second_process') AND (label='glue_unit_price')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.66, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_second_process') AND (label='glue_usage_amount')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 1, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_second_process') AND (label='glue_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.01, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_second_process') AND (label='burring_cycle_time')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 30, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_second_process') AND (label='burring_unit_price')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.66, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_second_process') AND (label='burring_usage_amount')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 1, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_second_process') AND (label='burring_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.01, 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'me_others_rubber_management_and_profit') AND (label='management_and_profit')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'me_others_rubber' )) ) AND (name = 'me_others_rubber_init')), 0.15, 'number', 'common_parameter', now());
