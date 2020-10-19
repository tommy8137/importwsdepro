update formula.parameter_value set value=100000 where parameter_id = (select id from formula.common_parameter where part_type='me_others_screw_molding' and label='thread_rolling_capacity');
update formula.parameter_value set value=0.03 where parameter_id = (select id from formula.common_parameter where part_type='me_others_screw_molding' and label='lathe_circularity_unit_price');

update formula.parameter_value set value = 0.00194118 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Blue')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='0' and diameter_end='2')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='-1' and length_end='-1')
);

update formula.parameter_value set value = 0.00194118 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Blue')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='0' and length_end='2.9')
);

update formula.parameter_value set value = 0.00154412 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Blue')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='3' and length_end='9.9')
);

update formula.parameter_value set value = 0.00194118 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Blue')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='10' and length_end='-1')
);

update formula.parameter_value set value = 0.00255882 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Blue')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='3' and diameter_end='-1')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='-1' and length_end='-1')
);

update formula.parameter_value set value = 0.00211765 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Yellow')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='0' and diameter_end='2')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='-1' and length_end='-1')
);

update formula.parameter_value set value = 0.00229412 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Yellow')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='0' and length_end='2.9')
);

update formula.parameter_value set value = 0.00194118 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Yellow')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='3' and length_end='9.9')
);

update formula.parameter_value set value = 0.00229412 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Yellow')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='10' and length_end='-1')
);

update formula.parameter_value set value = 0.00273529 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Yellow')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='3' and diameter_end='-1')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='-1' and length_end='-1')
);

update formula.parameter_value set value = 0.00194118 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Coffee')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='0' and diameter_end='2')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='-1' and length_end='-1')
);

update formula.parameter_value set value = 0.00194118 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Coffee')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='0' and length_end='2.9')
);

update formula.parameter_value set value = 0.00154412 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Coffee')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='3' and length_end='9.9')
);

update formula.parameter_value set value = 0.00194118 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Coffee')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='10' and length_end='-1')
);

update formula.parameter_value set value = 0.00255882 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='低碳鋼18A') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Coffee')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='3' and diameter_end='-1')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='-1' and length_end='-1')
);

update formula.parameter_value set value = 0.00264706 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Blue')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='0' and diameter_end='2')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='-1' and length_end='-1')
);

update formula.parameter_value set value = 0.00264706 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Blue')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='0' and length_end='2.9')
);

update formula.parameter_value set value = 0.00210294 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Blue')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='3' and length_end='9.9')
);

update formula.parameter_value set value = 0.00264706 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Blue')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='10' and length_end='-1')
);

update formula.parameter_value set value = 0.00323529 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Blue')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='3' and diameter_end='-1')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='-1' and length_end='-1')
);

update formula.parameter_value set value = 0.00264706 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Yellow')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='0' and diameter_end='2')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='-1' and length_end='-1')
);

update formula.parameter_value set value = 0.00317647 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Yellow')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='0' and length_end='2.9')
);

update formula.parameter_value set value = 0.00264706 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Yellow')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='3' and length_end='9.9')
);

update formula.parameter_value set value = 0.00317647 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Yellow')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='10' and length_end='-1')
);

update formula.parameter_value set value = 0.00323529 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Yellow')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='3' and diameter_end='-1')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='-1' and length_end='-1')
);

update formula.parameter_value set value = 0.00317647 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Coffee')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='0' and diameter_end='2')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='-1' and length_end='-1')
);

update formula.parameter_value set value = 0.00264706 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Coffee')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='0' and length_end='2.9')
);

update formula.parameter_value set value = 0.00264706 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Coffee')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='3' and length_end='9.9')
);

update formula.parameter_value set value = 0.00264706 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Coffee')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='2.1' and diameter_end='2.9')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='10' and length_end='-1')
);

update formula.parameter_value set value = 0.00379412 where parameter_id=(
	select id from formula.turning_nylok 
	where 
	material_id = (select id from formula.turning_material where material_name='SUS410') 
	and 
	color_id = (select id from formula.turning_nylok_color where color_name='Coffee')
	and 
	diameter_id = (select id from formula.turning_nylok_diameter where diameter_begin='3' and diameter_end='-1')
	and
	length_id = (select id from formula.turning_nylok_length where length_begin='-1' and length_end='-1')
);

INSERT INTO formula.thermal_category (id, category_type, metal_material_id, create_time) VALUES(uuid_generate_v1(), 'thermal_fin', (select id from formula.material_metal where name='CU1100'), now());
INSERT INTO formula.thermal_category (id, category_type, metal_material_id, create_time) VALUES(uuid_generate_v1(), 'thermal_fin', (select id from formula.material_metal where name='AL1050'), now());


 INSERT INTO formula.thermal_grease (id, grease_name, create_time) VALUES (uuid_generate_v1(), '道康寧5888', now());
  INSERT INTO formula.thermal_grease (id, grease_name, create_time) VALUES (uuid_generate_v1(), '7783D', now());
  
  INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.thermal_grease WHERE (grease_name = '道康寧5888')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_module' )) ) AND (name = 'thermal_module_init')), '550', 'number', 'thermal_grease', now());
  INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.thermal_grease WHERE (grease_name = '7783D')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_module' )) ) AND (name = 'thermal_module_init')), '580', 'number', 'thermal_grease', now());
  
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.thermal_grease WHERE (grease_name = '道康寧5888')), (SELECT max(id) FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_module' )) ) ), '550', 'number', 'thermal_grease', now()) on conflict do nothing;
  INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.thermal_grease WHERE (grease_name = '7783D')), (SELECT max(id) FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'thermal_module' )) ) ), '580', 'number', 'thermal_grease', now()) on conflict do nothing; 