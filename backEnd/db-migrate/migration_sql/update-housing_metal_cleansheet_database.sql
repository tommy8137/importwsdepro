update wiprocurement.col_definite set col_name=trim(col_name);

CREATE TABLE IF NOT EXISTS formula.metal_type (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	type_name varchar(200) not NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT metal_type_pk PRIMARY KEY (id),
	CONSTRAINT metal_type_un UNIQUE (type_name)
);

CREATE TABLE IF NOT EXISTS formula.metal_type_part_category (
	metal_type_id uuid NOT NULL,
	part_category_2_id uuid NOT NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT metal_type_part_category_pk PRIMARY KEY (metal_type_id,part_category_2_id),
	CONSTRAINT metal_type_part_category_fk FOREIGN KEY (part_category_2_id) REFERENCES  formula.part_category_2(id),
	CONSTRAINT metal_type_part_category_fk1 FOREIGN KEY (metal_type_id) REFERENCES  formula.metal_type(id)
);

ALTER TABLE formula.module_metal ADD column if not exists metal_type_id uuid NULL;

INSERT INTO formula.metal_type (type_name, remark) VALUES('Metal', '');
INSERT INTO formula.metal_type (type_name, remark) VALUES('Aluminum', '');

INSERT INTO formula.metal_type_part_category (metal_type_id, part_category_2_id, remark) VALUES((select id from formula.metal_type where type_name = 'Metal'), (select id from formula.part_category_2 where category_name = 'Metal'), '');
INSERT INTO formula.metal_type_part_category (metal_type_id, part_category_2_id, remark) VALUES((select id from formula.metal_type where type_name = 'Metal'), (select id from formula.part_category_2 where category_name = 'Shielding_Can'), '');
INSERT INTO formula.metal_type_part_category (metal_type_id, part_category_2_id, remark) VALUES((select id from formula.metal_type where type_name = 'Aluminum'), (select id from formula.part_category_2 where category_name = 'Aluminum'), '');

UPDATE formula.module_metal set metal_type_id=(select id from formula.metal_type where type_name = 'Metal') WHERE module_name='Module 1';
UPDATE formula.module_metal set metal_type_id=(select id from formula.metal_type where type_name = 'Metal') WHERE module_name='Module 2';
UPDATE formula.module_metal set metal_type_id=(select id from formula.metal_type where type_name = 'Metal') WHERE module_name='Module 3';

ALTER TABLE formula.module_metal ALTER COLUMN metal_type_id SET NOT NULL;

INSERT INTO formula.module_metal (module_name, product_type_id, remark, metal_type_id) VALUES('Module 4', (select id from formula.product_type where type_name = 'NB'), '', (select id from formula.metal_type where type_name = 'Aluminum'));

INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('450T', '', NULL, now(), NULL);

INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '80T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '110T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '160T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '200T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '250T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '450T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '0T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '25T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '35T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '45T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '60T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '300T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '400T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '600T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '800T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '1000T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 4'), (select id from formula.machine_metal where ton= '1200T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '450T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '450T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '450T'), now(), NULL);

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '450T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '450T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '450T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());


INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '0T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '25T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '35T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '45T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '60T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '300T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '400T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '600T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '800T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '1000T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '1200T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '80T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.03', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '110T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.03', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '160T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.04', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '200T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.052', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '250T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.052', 'number', 'module_machine_metal', now());
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '450T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.12', 'number', 'module_machine_metal', now());

--create previous
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '0T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '25T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '35T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '45T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '60T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '300T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '400T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '600T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '800T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '1000T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '1200T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0', 'number', 'module_machine_metal', now()) on conflict do nothing;

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '80T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0.03', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '110T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0.03', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '160T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0.04', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '200T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0.052', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '250T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0.052', 'number', 'module_machine_metal', now()) on conflict do nothing;
INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 4' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '450T' )
    ), (SELECT max(id) FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' ) and activate_date < now()), '0.12', 'number', 'module_machine_metal', now()) on conflict do nothing;


