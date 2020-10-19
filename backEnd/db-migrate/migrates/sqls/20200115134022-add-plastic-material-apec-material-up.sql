CREATE TABLE formula.tmp_material_table (
   material_spec VARCHAR (200),
   material VARCHAR (200),
   price VARCHAR (200)
);

insert into formula.tmp_material_table (material_spec, material, price) values
('ABS_HB', 'Chimei PA-757', '2.40'),
('ABS_HB', 'Lotte SD-0150', '2.50'),
('ABS_HB', 'Lotte SD-0150(Black)', '2.02'),
('ABS_HB', 'Lotte SD-0150(White)', '2.17'),
('PC', 'FCFC IR2200', '3.27'),
('PC', 'Sabic HF1130', '5.12'),
('PC', 'Bayer  PC 2456', '3.32'),
('PC', 'Chimei PC-122', '2.71'),
('PC_with_50percent_PCR', 'ECOtech PC450e(Jack Black)', '3.64'),
('PC_ABS', 'Sabic C6200', '5.55'),
('PC_ABS', 'Chimei PC-540A', '3.93'),
('ABS_35percent_PCR', 'WAM GA35', '2.04'),
('ABS_35percent_PCR', 'WAM(緯潤)GA35 BK', '2.06'),
('ABS_65percent_PCR', 'WAM(緯潤) GA65 ', '1.96'),
('ABS_65percent_PCR', 'Kingfa(金發) GAR-011(L65)', '2.52'),
('ABS_65percent_PCR', 'ECOtech ABS406e(Jack Black)', '2.53'),
('PC_ABS_with_30percent_PCR', 'WAM NC30', '3.38'),
('PC_ABS_with_35percent_PCR', 'WAM - PC/ABS NC35', '3.54'),
('PC_ABS_with_35percent_PCR', 'Kingfa JH960-6900 ', '4.19'),
('PC_ABS_with_65percent_PCR', 'Kingfa JH960-6965', '4.64'),
('POM', 'POM-M90', '2.79'),
('TPU', 'Covestro DP9370AU', '10.74')
;

insert into formula.material_spec (material_spec_name)
select distinct material_spec from formula.tmp_material_table on conflict do nothing;

insert into formula.material (material_name, material_spec_id)
select tmp.material, ms.id from formula.tmp_material_table tmp
left join formula.material_spec ms on ms.material_spec_name = tmp.material_spec on conflict do nothing;

insert into formula.material (material_name, material_spec_id)
select 'Other_Fill_ME_Remark', mas.id
from formula.material_spec mas
where mas.id not in (
	select mas2.id
	from formula.material_spec mas2
	right join formula.material ma on ma.material_spec_id = mas2.id
	where ma.material_name = 'Other_Fill_ME_Remark'
) on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select ma.id, sd.id, tmp.price, 'number', 'material' from formula.tmp_material_table tmp
left join formula.material ma on ma.material_name = tmp.material,
formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'material')
on conflict do nothing;

insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select ma.id, sd.id, '0', 'number', 'material'
from formula.material ma,
formula.schedule_date sd 
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'material')
and ma.material_name = 'Other_Fill_ME_Remark' on conflict do nothing;

insert into formula.part_category_material (part_category_2_id, material_id)
select (select id from formula.part_category_2 pc where pc.category_name = 'Plastic'), ma.id  from formula.tmp_material_table tmp
left join formula.material_spec mas on mas.material_spec_name = tmp.material_spec 
left join formula.material ma on ma.material_spec_id = mas.id on conflict do nothing;

select wiprocurement.fn_eproc_update_material_and_materialspec_validate_exception_co('no_need_dependency_val');
select wiprocurement.fn_eproc_update_material_and_materialspec_validate_exception_co('no_need_partlist');

DROP TABLE IF EXISTS formula.tmp_material_table;