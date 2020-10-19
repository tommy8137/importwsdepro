drop table if exists formula.metal_press_type;
CREATE TABLE if not exists formula.metal_press_type (
	id uuid not null default uuid_generate_v1(),
	type_name varchar(200) not null,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz  null,
	CONSTRAINT metal_press_type_pk PRIMARY KEY (id)
);

insert into formula.metal_press_type (type_name) values
('工程模'),
('連續模');

drop table if exists formula.metal_press_module_machine_type;
CREATE TABLE if not exists formula.metal_press_module_machine_type (
	id uuid not null default uuid_generate_v1(),
	module_id uuid not null,
	machine_id uuid not null,
	press_type_id uuid not null,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz  null,
	CONSTRAINT metal_press_module_machine_type_pk PRIMARY KEY (id),
	CONSTRAINT metal_press_module_machine_type_fk_module FOREIGN KEY (module_id) REFERENCES formula.module_metal(id),
	CONSTRAINT metal_press_module_machine_type_fk_machine FOREIGN KEY (machine_id) REFERENCES formula.machine_metal(id),
	CONSTRAINT metal_press_module_machine_type_fk_press_type FOREIGN KEY (press_type_id) REFERENCES formula.metal_press_type(id),
  CONSTRAINT metal_press_module_machine_type_un UNIQUE (module_id, machine_id, press_type_id)
);

drop table if exists formula.tmp_metal_press_module_machine_type;
CREATE TABLE if not exists formula.tmp_metal_press_module_machine_type(
	module_name varchar(200),
	machine_ton varchar(200),
	press_type_name varchar(200),
	price varchar(200)
);

insert into formula.tmp_metal_press_module_machine_type(module_name, machine_ton, press_type_name, price)values
-- Module 1
('Module 1', '0T', '工程模', '0'),
('Module 1', '25T', '工程模', '0.0081'),
('Module 1', '35T', '工程模', '0.0081'),
('Module 1', '45T', '工程模', '0.0120'),
('Module 1', '60T', '工程模', '0.0130'),
('Module 1', '80T', '工程模', '0.0050'),
('Module 1', '110T', '工程模', '0.0050'),
('Module 1', '160T', '工程模', '0.0080'),
('Module 1', '200T', '工程模', '0.0100'),
('Module 1', '250T', '工程模', '0.0120'),
('Module 1', '300T', '工程模', '0.0180'),
('Module 1', '400T', '工程模', '0.0180'),
('Module 1', '600T', '工程模', '0.0180'),
('Module 1', '800T', '工程模', '0.0180'),
-- Module 2
('Module 2', '0T', '工程模', '0'),
('Module 2', '25T', '工程模', '0.0045'),
('Module 2', '35T', '工程模', '0.0045'),
('Module 2', '45T', '工程模', '0.0045'),
('Module 2', '60T', '工程模', '0.0045'),
('Module 2', '80T', '工程模', '0.0045'),
('Module 2', '110T', '工程模', '0.0052'),
('Module 2', '160T', '工程模', '0.0082'),
('Module 2', '200T', '工程模', '0.0101'),
('Module 2', '250T', '工程模', '0.0117'),
-- Module 3
('Module 3', '0T', '工程模', '0'),
('Module 3', '25T', '工程模', '0.0045'),
('Module 3', '35T', '工程模', '0.0045'),
('Module 3', '45T', '工程模', '0.0045'),
('Module 3', '60T', '工程模', '0.0045'),
('Module 3', '80T', '工程模', '0.0045'),
('Module 3', '110T', '工程模', '0.0052'),
('Module 3', '160T', '工程模', '0.0082'),
('Module 3', '200T', '工程模', '0.0101'),
('Module 3', '250T', '工程模', '0.0117'),
-- Module 5
('Module 5', '0T', '工程模', '0'),
('Module 5', '25T', '工程模', '0.0045'),
('Module 5', '35T', '工程模', '0.0045'),
('Module 5', '45T', '工程模', '0.0045'),
('Module 5', '60T', '工程模', '0.0045'),
('Module 5', '80T', '工程模', '0.0045'),
('Module 5', '110T', '工程模', '0.0052'),
('Module 5', '160T', '工程模', '0.0082'),
('Module 5', '200T', '工程模', '0.0101'),
('Module 5', '250T', '工程模', '0.0117'),
-- Module 6
('Module 6', '0T', '工程模', '0'),
('Module 6', '25T', '工程模', '0.0045'),
('Module 6', '35T', '工程模', '0.0045'),
('Module 6', '45T', '工程模', '0.0045'),
('Module 6', '60T', '工程模', '0.0045'),
('Module 6', '80T', '工程模', '0.0045'),
('Module 6', '110T', '工程模', '0.0052'),
('Module 6', '160T', '工程模', '0.0082'),
('Module 6', '200T', '工程模', '0.0101'),
('Module 6', '250T', '工程模', '0.0117'),
-- Module 1 
('Module 1', '0T', '連續模', '0'),
('Module 1', '110T', '連續模', '0.0072'),
('Module 1', '160T', '連續模', '0.0079'),
('Module 1', '200T', '連續模', '0.0087'),
('Module 1', '250T', '連續模', '0.0246'),
('Module 1', '300T', '連續模', '0.0237'),
('Module 1', '400T', '連續模', '0.0304'),
-- Module 2 
('Module 2', '0T', '連續模', '0'),
('Module 2', '110T', '連續模', '0.0072'),
('Module 2', '160T', '連續模', '0.0079'),
('Module 2', '200T', '連續模', '0.0087'),
('Module 2', '300T', '連續模', '0.0237'),
('Module 2', '400T', '連續模', '0.0304'),
-- Module 3
('Module 3', '0T', '連續模', '0'),
('Module 3', '110T', '連續模', '0.0072'),
('Module 3', '160T', '連續模', '0.0079'),
('Module 3', '200T', '連續模', '0.0087'),
('Module 3', '300T', '連續模', '0.0237'),
('Module 3', '400T', '連續模', '0.0304'),
-- Module 5
('Module 5', '0T', '連續模', '0'),
('Module 5', '110T', '連續模', '0.0072'),
('Module 5', '160T', '連續模', '0.0079'),
('Module 5', '200T', '連續模', '0.0087'),
('Module 5', '300T', '連續模', '0.0237'),
('Module 5', '400T', '連續模', '0.0304'),
-- Module 6
('Module 6', '0T', '連續模', '0'),
('Module 6', '110T', '連續模', '0.0072'),
('Module 6', '160T', '連續模', '0.0079'),
('Module 6', '200T', '連續模', '0.0087'),
('Module 6', '300T', '連續模', '0.0237'),
('Module 6', '400T', '連續模', '0.0304');

insert into formula.metal_press_module_machine_type(module_id, machine_id, press_type_id)
select mo.id, ma.id, pt.id
from formula.tmp_metal_press_module_machine_type tmp
inner join formula.module_metal mo on mo.module_name = tmp.module_name
inner join formula.machine_metal ma on ma.ton = tmp.machine_ton
inner join formula.metal_press_type pt on pt.type_name = tmp.press_type_name;

insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select link.id, sd.id, tmp.price, 'number', 'metal_press_module_machine_type'
from formula.metal_press_module_machine_type link,
formula.schedule_date sd,
formula.tmp_metal_press_module_machine_type tmp
inner join formula.module_metal mo on mo.module_name = tmp.module_name
inner join formula.machine_metal ma on ma.ton = tmp.machine_ton
inner join formula.metal_press_type pt on pt.type_name = tmp.press_type_name
where link.machine_id  = ma.id
and link.module_id = mo.id
and link.press_type_id = pt.id
and sd.formula_type_id = (select id from formula.formula_type where name = 'housing_metal')
and sd.product_type_id is null
on conflict do nothing;
 
DROP VIEW IF EXISTS formula.v_metal_machine_ton;
CREATE VIEW formula.v_metal_machine_ton AS
  SELECT
    mm.id,
    mm.ton,
    (date '2020-06-03')::timestamp as disable_time,
    null as press_type,
    null as press_type_name,
    null as product_type_id
  FROM formula.machine_metal mm
  union all
  select
    ma.id,
    ma.ton,
    link.disable_time,
    pt.id as press_type,
    pt.type_name as press_type_name,
    mo.product_type_id
  from formula.metal_press_module_machine_type link
  inner join formula.module_metal mo on mo.id = link.module_id
  inner join formula.machine_metal ma on ma.id = link.machine_id
  inner join formula.metal_press_type pt on pt.id = link.press_type_id;

-- Permissions
ALTER TABLE formula.v_metal_machine_ton OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_machine_ton TO "swpc-user";
GRANT SELECT ON TABLE formula.v_metal_machine_ton TO emdm;

drop table if exists formula.tmp_metal_press_module_machine_type;