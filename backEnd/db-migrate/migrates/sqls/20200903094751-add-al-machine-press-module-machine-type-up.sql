update formula.module_metal set disable_time = null where module_name = 'Module 4' and product_type_id = (select id from formula.product_type where type_name = 'NB') and metal_type_id = (select id from formula.metal_type where type_name = 'Aluminum');


create table if not exists formula.al_press_module_machine_type_temp(
	module_name varchar,
	product_type_name varchar,
	metal_type_name varchar,
	press_type_name varchar,
	ton_name varchar,
	price varchar
);
insert into formula.al_press_module_machine_type_temp values
('Module 4', 'NB', 'Aluminum', '工程模', '80T', '0.03'),
('Module 4', 'NB', 'Aluminum', '工程模', '110T', '0.03'),
('Module 4', 'NB', 'Aluminum', '工程模', '160T', '0.04'),
('Module 4', 'NB', 'Aluminum', '工程模', '200T', '0.052'),
('Module 4', 'NB', 'Aluminum', '工程模', '250T', '0.052');

insert into formula.metal_press_module_machine_type (module_id, machine_id, press_type_id) 
select mm.id as module_id, metal_machine.id as machine_id, press.id as press_id from formula.al_press_module_machine_type_temp as altemp
left join formula.module_metal mm on altemp.module_name = mm.module_name 
and mm.product_type_id = (select id from formula.product_type where type_name = altemp.product_type_name) 
and mm.metal_type_id = (select id from formula.metal_type where type_name = altemp.metal_type_name)
left join formula.machine_metal metal_machine on metal_machine.ton = altemp.ton_name
left join formula.metal_press_type press on press.type_name = altemp.press_type_name;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) select mpmmt.id, sd.id, altemp.price, 'number', 'metal_press_module_machine_type' from formula.al_press_module_machine_type_temp altemp
left join formula.metal_press_module_machine_type mpmmt on mpmmt.module_id = (select id from formula.module_metal mm where altemp.module_name = mm.module_name 
and mm.product_type_id = (select id from formula.product_type where type_name = altemp.product_type_name) 
and mm.metal_type_id = (select id from formula.metal_type where type_name = altemp.metal_type_name)) 
and mpmmt.machine_id = (select id from formula.machine_metal metal_machine where metal_machine.ton = altemp.ton_name)
and mpmmt.press_type_id = (select id from formula.metal_press_type press where press.type_name = altemp.press_type_name)
inner join formula.schedule_date sd on sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal')) 
and sd.product_type_id = (select id from formula.product_type where type_name = altemp.product_type_name);
drop table if exists formula.al_press_module_machine_type_temp;