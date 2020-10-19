
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES
 (uuid_generate_v1(), '200T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES
 (uuid_generate_v1(), '400T', NULL, now(), null);

 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES
 (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES
 (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES
 (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES
 (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES
 (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES
 (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES
 (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '200T')), now(), null);
 

 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES
 (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '400T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES
 (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '400T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES
 (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '400T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES
 (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '400T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES
 (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '400T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES
 (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '400T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES
 (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '400T')), now(), null);
 
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
select cp_source.id_dt, pv.activate_date_id, pv.value, pv.value_type, pv.source_table, now()
from (select * 
	from (select mm.id as id_cp, mo.module_name
		from formula.module_machine mm
		left join formula."module" mo on mo.id = mm.module_id
		left join formula.machine ma on ma.id = mm.machine_id
		where ton = '190T'
	) cp
	left join (select mm.id as id_dt, mo.module_name
		from formula.module_machine mm
		left join formula."module" mo on mo.id = mm.module_id
		left join formula.machine ma on ma.id = mm.machine_id
		where ton = '200T'
	) dt on dt.module_name = cp.module_name
) cp_source
left join formula.parameter_value pv on cp_source.id_cp = pv.parameter_id
where pv.activate_date_id is not null;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
select cp_source.id_dt, pv.activate_date_id, pv.value, pv.value_type, pv.source_table, now()
from (select * 
	from (select mm.id as id_cp, mo.module_name
		from formula.module_machine mm
		left join formula."module" mo on mo.id = mm.module_id
		left join formula.machine ma on ma.id = mm.machine_id
		where ton = '350T'
	) cp
	left join (select mm.id as id_dt, mo.module_name
		from formula.module_machine mm
		left join formula."module" mo on mo.id = mm.module_id
		left join formula.machine ma on ma.id = mm.machine_id
		where ton = '400T'
	) dt on dt.module_name = cp.module_name
) cp_source
left join formula.parameter_value pv on cp_source.id_cp = pv.parameter_id;