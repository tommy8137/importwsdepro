SET search_path TO formula, public, wiprocurement;
drop table if exists graphite_second_process;
drop table if exists graphite_glue;
drop table if exists graphite_pet;
drop table if exists graphite_graphite_thickness;
drop table if exists graphite_graphite;

CREATE TABLE IF NOT EXISTS graphite_graphite (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	graphite_name varchar(200) not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT graphite_graphite_pk PRIMARY KEY (id),
	CONSTRAINT graphite_graphite_un UNIQUE (graphite_name)
);

CREATE TABLE IF NOT EXISTS graphite_graphite_thickness (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	graphite_id uuid not null,
	thickness numeric not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT graphite_graphite_thickness_pk PRIMARY KEY (id),
	CONSTRAINT graphite_graphite_thickness_fk FOREIGN KEY (graphite_id) REFERENCES graphite_graphite(id),
	CONSTRAINT graphite_graphite_thickness_un UNIQUE (graphite_id,thickness)
);

CREATE TABLE IF NOT EXISTS graphite_pet (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	thickness numeric not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT graphite_pet_pk PRIMARY KEY (id),
	CONSTRAINT graphite_pet_un UNIQUE (thickness)
);

CREATE TABLE IF NOT EXISTS graphite_glue (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	thickness numeric not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT graphite_glue_pk PRIMARY KEY (id),
	CONSTRAINT graphite_glue_un UNIQUE (thickness)
);

CREATE TABLE IF NOT EXISTS graphite_second_process (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	process_name varchar(200) not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT graphite_second_process_pk PRIMARY KEY (id),
	CONSTRAINT graphite_second_process_un UNIQUE (process_name)
);

delete from formula.parameter_value as pv where activate_date_id in (select id from formula.schedule_date as sd where sd.formula_type_id = (select id from formula.formula_type as ft where ft."name" = 'thermal_graphite'));
delete from formula.common_parameter as cp where cp.formula_type_id = (select id from formula.formula_type as ft where ft."name" = 'thermal_graphite');
delete from formula.schedule_date as sd where sd.formula_type_id = (select id from formula.formula_type as ft where ft."name" = 'thermal_graphite');

--formula_type
INSERT INTO formula.formula_type("name", remark, create_time) VALUES('thermal_graphite', null, now()) on conflict do nothing;

--schedule_date
INSERT INTO formula.schedule_date("name", formula_type_id, activate_date, create_time) VALUES('thermal_graphite_init', (select id from formula.formula_type where name='thermal_graphite'), '1970-01-01', now());


--graphite
INSERT INTO formula.graphite_graphite (graphite_name) VALUES('合成石墨(K=500)');
INSERT INTO formula.graphite_graphite (graphite_name) VALUES('人工石墨(K=700~1500)');

--graphite thickness
INSERT INTO formula.graphite_graphite_thickness (graphite_id, thickness) VALUES((select id from formula.graphite_graphite where graphite_name = '合成石墨(K=500)') , 0.045);
INSERT INTO formula.graphite_graphite_thickness (graphite_id, thickness) VALUES((select id from formula.graphite_graphite where graphite_name = '合成石墨(K=500)') , 0.065);
INSERT INTO formula.graphite_graphite_thickness (graphite_id, thickness) VALUES((select id from formula.graphite_graphite where graphite_name = '合成石墨(K=500)') , 0.11);
INSERT INTO formula.graphite_graphite_thickness (graphite_id, thickness) VALUES((select id from formula.graphite_graphite where graphite_name = '人工石墨(K=700~1500)') , 0.025);
INSERT INTO formula.graphite_graphite_thickness (graphite_id, thickness) VALUES((select id from formula.graphite_graphite where graphite_name = '人工石墨(K=700~1500)') , 0.04);
INSERT INTO formula.graphite_graphite_thickness (graphite_id, thickness) VALUES((select id from formula.graphite_graphite where graphite_name = '人工石墨(K=700~1500)') , 0.075);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_graphite_thickness WHERE graphite_id = (select id from formula.graphite_graphite where graphite_name = '合成石墨(K=500)') and thickness = 0.045), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 29, 'number', 'graphite_graphite_thickness', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_graphite_thickness WHERE graphite_id = (select id from formula.graphite_graphite where graphite_name = '合成石墨(K=500)') and thickness = 0.065), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 36.5, 'number', 'graphite_graphite_thickness', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_graphite_thickness WHERE graphite_id = (select id from formula.graphite_graphite where graphite_name = '合成石墨(K=500)') and thickness = 0.11), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 45.5, 'number', 'graphite_graphite_thickness', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_graphite_thickness WHERE graphite_id = (select id from formula.graphite_graphite where graphite_name = '人工石墨(K=700~1500)') and thickness = 0.025), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 30, 'number', 'graphite_graphite_thickness', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_graphite_thickness WHERE graphite_id = (select id from formula.graphite_graphite where graphite_name = '人工石墨(K=700~1500)') and thickness = 0.04), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 43.5, 'number', 'graphite_graphite_thickness', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_graphite_thickness WHERE graphite_id = (select id from formula.graphite_graphite where graphite_name = '人工石墨(K=700~1500)') and thickness = 0.075), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 63.5, 'number', 'graphite_graphite_thickness', now());

--graphite pet
INSERT INTO formula.graphite_pet (thickness) VALUES(0.01);
INSERT INTO formula.graphite_pet (thickness) VALUES(0.02);
INSERT INTO formula.graphite_pet (thickness) VALUES(0.03);
INSERT INTO formula.graphite_pet (thickness) VALUES(0.05);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_pet WHERE thickness = 0.01), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 7.35, 'number', 'graphite_pet', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_pet WHERE thickness = 0.02), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 7.35, 'number', 'graphite_pet', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_pet WHERE thickness = 0.03), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 6.5, 'number', 'graphite_pet', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_pet WHERE thickness = 0.05), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 4.5, 'number', 'graphite_pet', now());

--graphite glue
INSERT INTO formula.graphite_glue (thickness) VALUES(0.01);
INSERT INTO formula.graphite_glue (thickness) VALUES(0.02);
INSERT INTO formula.graphite_glue (thickness) VALUES(0.03);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_glue WHERE thickness = 0.01), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 5.2, 'number', 'graphite_glue', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_glue WHERE thickness = 0.02), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 4.5, 'number', 'graphite_glue', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_glue WHERE thickness = 0.03), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 3.1, 'number', 'graphite_glue', now());

--graphite second process
INSERT INTO formula.graphite_second_process (process_name) VALUES('單封邊');
INSERT INTO formula.graphite_second_process (process_name) VALUES('雙封邊');
INSERT INTO formula.graphite_second_process (process_name) VALUES('特殊裁切');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_second_process WHERE process_name = '單封邊'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 0.0378, 'number', 'graphite_second_process', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_second_process WHERE process_name = '雙封邊'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 0.0567, 'number', 'graphite_second_process', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.graphite_second_process WHERE process_name = '特殊裁切'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_graphite' )) ) AND (name = 'thermal_graphite_init')), 0.0189, 'number', 'graphite_second_process', now());

