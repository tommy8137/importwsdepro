drop table if exists formula.common_parameter_expose;
CREATE TABLE if not exists formula.common_parameter_expose (
	parameter_id uuid not null,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz  null,
	CONSTRAINT common_parameter_expose_pk PRIMARY KEY (parameter_id),
	CONSTRAINT common_parameter_expose_fk FOREIGN KEY (parameter_id) REFERENCES formula.common_parameter(id)
);

create or replace function formula.fn_common_paramter_expose_add(pa_formula_type varchar(200), pa_part_type varchar(200), pa_label varchar(200), pa_product_type_id numeric)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin 
	insert into formula.common_parameter_expose (parameter_id)
	select param.id
	  from formula.common_parameter param
	  left join formula.formula_type futype on futype.id = param.formula_type_id
	  where futype."name" = pa_formula_type
	  and param.part_type = pa_part_type
	  and param."label" = pa_label
	  and param.product_type_id = pa_product_type_id on conflict do nothing;
end;
$function$
;
-- select formula.fn_common_paramter_expose_add('housing_plastic', 'housing_plastic_paint', 'paint_top_area_L', 1);

create or replace function formula.fn_common_paramter_add(pa_formula_type varchar(200), pa_part_type varchar(200), pa_label varchar(200), pa_label_name varchar(200), pa_unit varchar(200), pa_system_remark varchar(200), pa_product_type_name varchar(200), pa_value varchar(200), pa_expose bool)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin 
	insert into formula.common_parameter (formula_type_id, part_type, "label", label_name, unit, system_remark, product_type_id) values (
		(select id from formula.formula_type where "name"= pa_formula_type),
		pa_part_type,
	    pa_label,
	    pa_label_name,
	    pa_unit,
	    pa_system_remark,
        (select id from formula.product_type where type_name = pa_product_type_name)
	) on conflict do nothing;

	insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
	select cp.id, sd.id, pa_value, 'number', 'common_parameter'
	from formula.common_parameter cp
	right join formula.schedule_date sd on sd.product_type_id = cp.product_type_id and sd.formula_type_id = (select id from formula.formula_type where "name" = pa_formula_type)
	where cp."label" = pa_label
	and cp.part_type = pa_part_type
	and cp.product_type_id = (select id from formula.product_type where type_name = pa_product_type_name)
	on conflict do nothing;

    if pa_expose = true then
		PERFORM formula.fn_common_paramter_expose_add(pa_formula_type, pa_part_type, pa_label, (select id from formula.product_type where type_name = pa_product_type_name));
    end if;
end;
$function$
;

select formula.fn_common_paramter_add('housing_metal', 'housing_metal_material', 'material_metal_l_side_constant', '長度邊料尺寸', 'mm', '材料費_Metal_material 邊料尺寸 L', 'DT', '5', true);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_material', 'material_metal_w_side_constant', '寬度邊料尺寸', 'mm', '材料費_Metal_material 邊料尺寸 W', 'DT', '5', true);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'cnc_cycle_time_numerator', 'CNC 加工速率', 'mm²/s', '二次加工費_CNC_加工速率', 'DT', '25.7', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'cnc_trasnsfer_time', 'CNC 取放時間', 'sec', '二次加工費_CNC_取放時間', 'DT', '20', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'grinding_cycle_time_numerator', '打磨 加工速率', 'mm²/s', '二次加工費_打磨_加工速率', 'DT', '685.5', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'grinding_trasnsfer_time', '打磨 取放時間', 'sec', '二次加工費_打磨_取放時間', 'DT', '20', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_painting', 'hanging_hight', '吊掛線高度', 'mm', '塗裝噴漆_吊掛線高度', 'DT', '1500', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_painting', 'hanging_gap', '吊掛間距', 'mm', '塗裝噴漆_吊掛間距', 'DT', '100', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_painting', 'hanging_row', '掛具排數', 'row', '塗裝噴漆_掛具排數', 'DT', '1', false);

select formula.fn_common_paramter_add('housing_metal', 'housing_metal_material', 'material_metal_l_side_constant', '長度邊料尺寸', 'mm', '材料費_Metal_material 邊料尺寸 L', 'AIO', '5', true);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_material', 'material_metal_w_side_constant', '寬度邊料尺寸', 'mm', '材料費_Metal_material 邊料尺寸 W', 'AIO', '5', true);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'cnc_cycle_time_numerator', 'CNC 加工速率', 'mm²/s', '二次加工費_CNC_加工速率', 'AIO', '25.7', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'cnc_trasnsfer_time', 'CNC 取放時間', 'sec', '二次加工費_CNC_取放時間', 'AIO', '20', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'grinding_cycle_time_numerator', '打磨 加工速率', 'mm²/s', '二次加工費_打磨_加工速率', 'AIO', '685.5', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'grinding_trasnsfer_time', '打磨 取放時間', 'sec', '二次加工費_打磨_取放時間', 'AIO', '20', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_painting', 'hanging_hight', '吊掛線高度', 'mm', '塗裝噴漆_吊掛線高度', 'AIO', '1500', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_painting', 'hanging_gap', '吊掛間距', 'mm', '塗裝噴漆_吊掛間距', 'AIO', '100', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_painting', 'hanging_row', '掛具排數', 'row', '塗裝噴漆_掛具排數', 'AIO', '1', false);

select formula.fn_common_paramter_add('housing_metal', 'housing_metal_material', 'material_metal_l_side_constant', '長度邊料尺寸', 'mm', '材料費_Metal_material 邊料尺寸 L', 'Server', '5', true);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_material', 'material_metal_w_side_constant', '寬度邊料尺寸', 'mm', '材料費_Metal_material 邊料尺寸 W', 'Server', '5', true);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'cnc_cycle_time_numerator', 'CNC 加工速率', 'mm²/s', '二次加工費_CNC_加工速率', 'Server', '25.7', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'cnc_trasnsfer_time', 'CNC 取放時間', 'sec', '二次加工費_CNC_取放時間', 'Server', '20', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'grinding_cycle_time_numerator', '打磨 加工速率', 'mm²/s', '二次加工費_打磨_加工速率', 'Server', '685.5', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'grinding_trasnsfer_time', '打磨 取放時間', 'sec', '二次加工費_打磨_取放時間', 'Server', '20', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_painting', 'hanging_hight', '吊掛線高度', 'mm', '塗裝噴漆_吊掛線高度', 'Server', '1500', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_painting', 'hanging_gap', '吊掛間距', 'mm', '塗裝噴漆_吊掛間距', 'Server', '100', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_painting', 'hanging_row', '掛具排數', 'row', '塗裝噴漆_掛具排數', 'Server', '1', false);

select formula.fn_common_paramter_add('housing_metal', 'housing_metal_material', 'material_metal_l_side_constant', '長度邊料尺寸', 'mm', '材料費_Metal_material 邊料尺寸 L', 'VoIP', '5', true);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_material', 'material_metal_w_side_constant', '寬度邊料尺寸', 'mm', '材料費_Metal_material 邊料尺寸 W', 'VoIP', '5', true);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'cnc_cycle_time_numerator', 'CNC 加工速率', 'mm²/s', '二次加工費_CNC_加工速率', 'VoIP', '25.7', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'cnc_trasnsfer_time', 'CNC 取放時間', 'sec', '二次加工費_CNC_取放時間', 'VoIP', '20', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'grinding_cycle_time_numerator', '打磨 加工速率', 'mm²/s', '二次加工費_打磨_加工速率', 'VoIP', '685.5', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_secondary_processing', 'grinding_trasnsfer_time', '打磨 取放時間', 'sec', '二次加工費_打磨_取放時間', 'VoIP', '20', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_painting', 'hanging_hight', '吊掛線高度', 'mm', '塗裝噴漆_吊掛線高度', 'VoIP', '1500', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_painting', 'hanging_gap', '吊掛間距', 'mm', '塗裝噴漆_吊掛間距', 'VoIP', '100', false);
select formula.fn_common_paramter_add('housing_metal', 'housing_metal_painting', 'hanging_row', '掛具排數', 'row', '塗裝噴漆_掛具排數', 'VoIP', '1', false);

DROP VIEW IF EXISTS formula.v_common_parameters_expose;
CREATE VIEW formula.v_common_parameters_expose AS
  select 
    futype."name" as formula_type,
    param.part_type,
    param."label",
    param.product_type_id,
    param.unit,
    pv_aval.value
    from formula.common_parameter_expose expose
    left join formula.common_parameter param on expose.parameter_id = param.id
    left join formula.formula_type futype on param.formula_type_id = futype.id
    left join (
      select pv.parameter_id , pv.value
        from formula.parameter_value pv
        where pv.activate_date_id in (
          select max(id)
            from formula.schedule_date sd
            where activate_date < now()
  			group by sd.formula_type_id, sd.product_type_id
        )
    ) pv_aval on pv_aval.parameter_id = expose.parameter_id
    where expose.disable_time is null;

-- Permissions
ALTER TABLE formula.v_common_parameters_expose OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_common_parameters_expose TO "swpc-user";
GRANT SELECT ON TABLE formula.v_common_parameters_expose TO emdm;
