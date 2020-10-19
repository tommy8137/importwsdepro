-- 01 [add product type] ------------------------------------------------------------
/*
  ##   #####  #####     #####  #####   ####  #####  #    #  ####  ##### 
 #  #  #    # #    #    #    # #    # #    # #    # #    # #    #   #   
#    # #    # #    #    #    # #    # #    # #    # #    # #        #   
###### #    # #    #    #####  #####  #    # #    # #    # #        #   
#    # #    # #    #    #      #   #  #    # #    # #    # #    #   #   
#    # #####  #####     #      #    #  ####  #####   ####   ####    #   
                                                                        
                          
##### #   # #####  ###### 
  #    # #  #    # #      
  #     #   #    # #####  
  #     #   #####  #      
  #     #   #      #      
  #     #   #      ###### 
*/
INSERT INTO formula.product_type (type_name)values
('VAD'),
('VAD ACC'),
('Smart Device')
on conflict do nothing;

delete from wiprocurement.bom_partlist_config_product_type dt
using (
	select max(id) as id, config_id, product_type_id, count(config_id) as repeat_count
	from wiprocurement.bom_partlist_config_product_type
	group by config_id, product_type_id
) duplicate
where duplicate.repeat_count > 1
and dt.id = duplicate.id;

alter TABLE wiprocurement.bom_partlist_config_product_type DROP constraint if exists un_bom_partlist_config_product_type;
alter TABLE wiprocurement.bom_partlist_config_product_type ADD constraint un_bom_partlist_config_product_type UNIQUE (config_id, product_type_id);

insert into wiprocurement.bom_partlist_config_product_type(config_id, product_type_id)
select cf.config_id, pt.id
from (
	select config_id
	from wiprocurement.bom_partlist_config_product_type
	where product_type_id = (select id from formula.product_type where type_name = 'NB')
) cf,
formula.product_type pt
where pt.type_name in ('VAD','VAD ACC','Smart Device')
on conflict do nothing;

INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, product_type_id) values
('housing_metal_vad_init', 				(select id from formula.formula_type ft where ft.name = 'housing_metal'), 	'1970-01-01', (select id from formula.product_type pt where pt.type_name = 'VAD')),
('housing_metal_vad_acc_init', 			(select id from formula.formula_type ft where ft.name = 'housing_metal'), 	'1970-01-01', (select id from formula.product_type pt where pt.type_name = 'VAD ACC')),
('housing_metal_smart_device_init', 	(select id from formula.formula_type ft where ft.name = 'housing_metal'), 	'1970-01-01', (select id from formula.product_type pt where pt.type_name = 'Smart Device')),
('housing_plastic_vad_init', 			(select id from formula.formula_type ft where ft.name = 'housing_plastic'), '1970-01-01', (select id from formula.product_type pt where pt.type_name = 'VAD')),
('housing_plastic_vad_acc_init', 		(select id from formula.formula_type ft where ft.name = 'housing_plastic'), '1970-01-01', (select id from formula.product_type pt where pt.type_name = 'VAD ACC')),
('housing_plastic_smart_device_init', 	(select id from formula.formula_type ft where ft.name = 'housing_plastic'), '1970-01-01', (select id from formula.product_type pt where pt.type_name = 'Smart Device'))
on conflict do nothing;

-- 02 [add assy category] ------------------------------------------------------------
/*
  ##   #####  #####       ##    ####   ####  #   # 
 #  #  #    # #    #     #  #  #      #       # #  
#    # #    # #    #    #    #  ####   ####    #   
###### #    # #    #    ######      #      #   #   
#    # #    # #    #    #    # #    # #    #   #   
#    # #####  #####     #    #  ####   ####    #   
                                                   
                                                      
 ####    ##   ##### ######  ####   ####  #####  #   # 
#    #  #  #    #   #      #    # #    # #    #  # #  
#      #    #   #   #####  #      #    # #    #   #   
#      ######   #   #      #  ### #    # #####    #   
#    # #    #   #   #      #    # #    # #   #    #   
 ####  #    #   #   ######  ####   ####  #    #   #
*/
CREATE TABLE formula.tmp_gb_assy_ctgy (
	product_type_name VARCHAR (200),
   	gb_assy_ctgy_name VARCHAR (200)
);
insert into formula.tmp_gb_assy_ctgy(product_type_name, gb_assy_ctgy_name)values
('VAD', 'MAIN HOUSING' ),
('VAD', 'BACK HOUSING' ),
('VAD', 'FRAME' ),
('VAD', 'END CAP' ),
('VAD', 'KEY PAD' ),
('VAD', 'RUBBER SEALING' ),
('VAD', 'OTHER 60 ASSY' ),
('VAD', 'OTHER PART' ),
('VAD', 'PCB' ),
('VAD ACC', 'TOP HOUSING'),
('VAD ACC', 'BOTTOM HOUSING'),
('VAD ACC', 'FRAME'),
('VAD ACC', 'RUBBER SEALING'),
('VAD ACC', 'OTHER 60 ASSY'),
('VAD ACC', 'OTHER PART'),
('VAD ACC', 'PCB'),
('Smart Device', 'MAIN HOUSING'),
('Smart Device', 'MAIN COVER'),
('Smart Device', 'FRAME'),
('Smart Device', 'OTHER 60 ASSY'),
('Smart Device', 'OTHER PART'),
('Smart Device', 'PCB')
on conflict do nothing;

insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)
select tmp.gb_assy_ctgy_name , pt.id
from formula.tmp_gb_assy_ctgy tmp
join formula.product_type pt on pt.type_name = tmp.product_type_name
on conflict do nothing;

DROP TABLE IF EXISTS formula.tmp_gb_assy_ctgy;

insert into formula.func_ctgy(func_ctgy_name)values
('Antenna'),
('Acoustic'),
('Optical')
on conflict do nothing;

-- 03 [copy common parameter] ------------------------------------------------------------
/*
 ####   ####  #####  #   #     ####   ####  #    # #    #  ####  #    # 
#    # #    # #    #  # #     #    # #    # ##  ## ##  ## #    # ##   # 
#      #    # #    #   #      #      #    # # ## # # ## # #    # # #  # 
#      #    # #####    #      #      #    # #    # #    # #    # #  # # 
#    # #    # #        #      #    # #    # #    # #    # #    # #   ## 
 ####   ####  #        #       ####   ####  #    # #    #  ####  #    # 
                                                                        
                                                              
#####    ##   #####    ##   #    # ###### ##### ###### #####  
#    #  #  #  #    #  #  #  ##  ## #        #   #      #    # 
#    # #    # #    # #    # # ## # #####    #   #####  #    # 
#####  ###### #####  ###### #    # #        #   #      #####  
#      #    # #   #  #    # #    # #        #   #      #   #  
#      #    # #    # #    # #    # ######   #   ###### #    # 
*/
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, product_type_id)
select formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, (select id from formula.product_type pt where pt.type_name = 'VAD') 
	from formula.common_parameter cp where cp.formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_metal')
       and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB') and cp.disable_time is null on conflict do nothing;
       
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, product_type_id)
select formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, (select id from formula.product_type pt where pt.type_name = 'VAD ACC') 
	from formula.common_parameter cp where cp.formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_metal')
       and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB') and cp.disable_time is null on conflict do nothing;
       
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, product_type_id)
select formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, (select id from formula.product_type pt where pt.type_name = 'Smart Device') 
	from formula.common_parameter cp where cp.formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_metal')
       and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB') and cp.disable_time is null on conflict do nothing;
      
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, product_type_id)
select formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, (select id from formula.product_type pt where pt.type_name = 'VAD') 
	from formula.common_parameter cp where cp.formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_plastic')
       and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB') and cp.disable_time is null on conflict do nothing;
      
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, product_type_id)
select formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, (select id from formula.product_type pt where pt.type_name = 'VAD ACC') 
	from formula.common_parameter cp where cp.formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_plastic')
       and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB') and cp.disable_time is null on conflict do nothing;
      
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, product_type_id)
select formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, (select id from formula.product_type pt where pt.type_name = 'Smart Device') 
	from formula.common_parameter cp where cp.formula_type_id = (select id from formula.formula_type ft where ft.name = 'housing_plastic')
       and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB') and cp.disable_time is null on conflict do nothing;


-- housing metal
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, sd_dt.id, pv.value, pv.value_type, pv.source_table 
from formula.common_parameter cp
left join formula.common_parameter cp_dt on cp.formula_type_id = cp_dt.formula_type_id and cp.part_type = cp_dt.part_type and cp."label" = cp_dt."label"
right join formula.parameter_value pv 
	on pv.parameter_id = cp.id 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
		and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	)),
formula.schedule_date sd_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (
	select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device')
)
and sd_dt.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd_dt.product_type_id = cp_dt.product_type_id
on conflict do nothing;


-- housing plastic
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, sd_dt.id, pv.value, pv.value_type, pv.source_table 
from formula.common_parameter cp
left join formula.common_parameter cp_dt on cp.formula_type_id = cp_dt.formula_type_id and cp.part_type = cp_dt.part_type and cp."label" = cp_dt."label"
right join formula.parameter_value pv 
	on pv.parameter_id = cp.id 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
		and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	)),
formula.schedule_date sd_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (
	select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device')
)
and sd_dt.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_plastic')
and sd_dt.product_type_id = cp_dt.product_type_id
on conflict do nothing;

-- 04 [copy metal database data] ------------------------------------------------------------
/*
 ####   ####  #####  #   #    #    # ###### #####   ##   #      
#    # #    # #    #  # #     ##  ## #        #    #  #  #      
#      #    # #    #   #      # ## # #####    #   #    # #      
#      #    # #####    #      #    # #        #   ###### #      
#    # #    # #        #      #    # #        #   #    # #      
 ####   ####  #        #      #    # ######   #   #    # ###### 
                                                                
                                                       
#####    ##   #####   ##   #####    ##    ####  ###### 
#    #  #  #    #    #  #  #    #  #  #  #      #      
#    # #    #   #   #    # #####  #    #  ####  #####  
#    # ######   #   ###### #    # ######      # #      
#    # #    #   #   #    # #    # #    # #    # #      
#####  #    #   #   #    # #####  #    #  ####  ###### 
                                                       
                           
#####    ##   #####   ##   
#    #  #  #    #    #  #  
#    # #    #   #   #    # 
#    # ######   #   ###### 
#    # #    #   #   #    # 
#####  #    #   #   #    # 
*/
-- metal_syringe
INSERT INTO formula.metal_syringe (syringe_name, product_type_id)
select syringe_name, pt.id 
from formula.metal_syringe cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')
 and cp.disable_time is null
and pt.type_name in ('VAD','VAD ACC','Smart Device') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.syringe_diameter, sd_dt.id, pv.value, pv.value_type, pv.source_table
from formula.metal_syringe cp
left join formula.metal_syringe cp_dt on cp.syringe_name = cp_dt.syringe_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.syringe_diameter 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
		and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	)),
formula.schedule_date sd_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (
	select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device')
)
and sd_dt.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd_dt.product_type_id = cp_dt.product_type_id
on conflict do nothing;

-- metal_glue
INSERT INTO formula.metal_glue (glue_name, usd_g, density, product_type_id)
select glue_name, uuid_generate_v1(), uuid_generate_v1(), pt.id 
from formula.metal_glue cp,
formula.product_type pt
where pt.type_name in ('VAD','VAD ACC','Smart Device') and cp.disable_time is null
and cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')
 on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.usd_g, sd_dt.id, pv.value, pv.value_type, pv.source_table
from formula.metal_glue cp
left join formula.metal_glue cp_dt on cp.glue_name = cp_dt.glue_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.usd_g 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	)),
formula.schedule_date sd_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (
	select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device')
)
and sd_dt.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd_dt.product_type_id = cp_dt.product_type_id on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.density, sd_dt.id, pv.value, pv.value_type, pv.source_table
from formula.metal_glue cp
left join formula.metal_glue cp_dt on cp.glue_name = cp_dt.glue_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.density 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	)),
formula.schedule_date sd_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (
	select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device')
)
and sd_dt.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd_dt.product_type_id = cp_dt.product_type_id on conflict do nothing;

--metal_anode_color
INSERT INTO formula.metal_anode_color (name, anode_time, ratio, usd_mm2, loss_rate, product_type_id)
select name, uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), pt.id 
from formula.metal_anode_color cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')
 and cp.disable_time is null
and pt.type_name in ('VAD','VAD ACC','Smart Device') on conflict do nothing;

-- anode_time
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.anode_time, sd_dt.id, pv.value, pv.value_type, pv.source_table
from formula.metal_anode_color cp
left join formula.metal_anode_color cp_dt on cp.name = cp_dt.name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.anode_time 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	)),
formula.schedule_date sd_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (
	select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device')
)
and sd_dt.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd_dt.product_type_id = cp_dt.product_type_id on conflict do nothing;

--ratio
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.ratio, sd_dt.id, pv.value, pv.value_type, pv.source_table
from formula.metal_anode_color cp
left join formula.metal_anode_color cp_dt on cp.name = cp_dt.name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.ratio 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	)),
formula.schedule_date sd_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (
	select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device')
)
and sd_dt.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd_dt.product_type_id = cp_dt.product_type_id on conflict do nothing;

--usd_mm2
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.usd_mm2, sd_dt.id, pv.value, pv.value_type, pv.source_table
from formula.metal_anode_color cp
left join formula.metal_anode_color cp_dt on cp.name = cp_dt.name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.usd_mm2 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	)),
formula.schedule_date sd_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (
	select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device')
)
and sd_dt.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd_dt.product_type_id = cp_dt.product_type_id on conflict do nothing;

--loss_rate
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.loss_rate, sd_dt.id, pv.value, pv.value_type, pv.source_table
from formula.metal_anode_color cp
left join formula.metal_anode_color cp_dt on cp.name = cp_dt.name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.loss_rate 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_metal'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	)),
formula.schedule_date sd_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (
	select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device')
)
and sd_dt.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd_dt.product_type_id = cp_dt.product_type_id on conflict do nothing;

-- 05 [copy plastic database data] ------------------------------------------------------------
/*
 ####   ####  #####  #   #    #####  #        ##    ####  ##### #  ####  
#    # #    # #    #  # #     #    # #       #  #  #        #   # #    # 
#      #    # #    #   #      #    # #      #    #  ####    #   # #      
#      #    # #####    #      #####  #      ######      #   #   # #      
#    # #    # #        #      #      #      #    # #    #   #   # #    # 
 ####   ####  #        #      #      ###### #    #  ####    #   #  ####  
                                                                         
                                                       
#####    ##   #####   ##   #####    ##    ####  ###### 
#    #  #  #    #    #  #  #    #  #  #  #      #      
#    # #    #   #   #    # #####  #    #  ####  #####  
#    # ######   #   ###### #    # ######      # #      
#    # #    #   #   #    # #    # #    # #    # #      
#####  #    #   #   #    # #####  #    #  ####  ###### 
                                                       
                           
#####    ##   #####   ##   
#    #  #  #    #    #  #  
#    # #    #   #   #    # 
#    # ######   #   ###### 
#    # #    #   #   #    # 
#####  #    #   #   #    # 
*/
-- plastic_embed_nail
INSERT INTO formula.plastic_embed_nail (embed_nail_name, product_type_id)
select embed_nail_name, pt.id
from formula.plastic_embed_nail cp,
formula.product_type pt 
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')
and pt.type_name in ('VAD','VAD ACC','Smart Device') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.unit_price, sd_dt.id, pv.value, pv.value_type, pv.source_table
from formula.plastic_embed_nail cp
left join formula.plastic_embed_nail cp_dt on cp.embed_nail_name = cp_dt.embed_nail_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.unit_price 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	)),
formula.schedule_date sd_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (
	select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device')
)
and sd_dt.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_plastic')
and sd_dt.product_type_id = cp_dt.product_type_id
on conflict do nothing;

-- plastic_printing
INSERT INTO formula.plastic_printing (printing_name, product_type_id)
select printing_name, pt.id 
from formula.plastic_printing cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')
and pt.type_name in ('VAD','VAD ACC','Smart Device') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.unit_price, sd_dt.id, pv.value, pv.value_type, pv.source_table
from formula.plastic_printing cp
left join formula.plastic_printing cp_dt on cp.printing_name = cp_dt.printing_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.unit_price 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	)),
formula.schedule_date sd_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (
	select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device')
)
and sd_dt.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_plastic')
and sd_dt.product_type_id = cp_dt.product_type_id
on conflict do nothing;

-- plastic_grinding
INSERT INTO formula.plastic_grinding (grinding_name, product_type_id)
select grinding_name, pt.id
from formula.plastic_grinding cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')
and pt.type_name in ('VAD','VAD ACC','Smart Device') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.total_cost, sd_dt.id, pv.value, pv.value_type, pv.source_table
from formula.plastic_grinding cp
left join formula.plastic_grinding cp_dt on cp.grinding_name = cp_dt.grinding_name
right join formula.parameter_value pv 
	on pv.parameter_id = cp.total_cost 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	)),
formula.schedule_date sd_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (
	select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device')
)
and sd_dt.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_plastic')
and sd_dt.product_type_id = cp_dt.product_type_id
on conflict do nothing;

-- plastic_emi_sputtering_group
INSERT INTO formula.plastic_emi_sputtering_group (group_name, product_type_id)
select group_name, pt.id
from formula.plastic_emi_sputtering_group cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')
and pt.type_name in ('VAD','VAD ACC','Smart Device') on conflict do nothing;

-- plastic_emi_sputtering_site_group
insert into formula.plastic_emi_sputtering_site_group (group_id, site_id, product_type_id)
select (select id from formula.plastic_emi_sputtering_group where group_name = a.group_name and product_type_id = b.id) , a.site_id, b.id
from (
  select gp.group_name, cp.site_id, pt.type_name 
  from formula.plastic_emi_sputtering_site_group cp
  left join formula.plastic_emi_sputtering_group gp on gp.id = cp.group_id
  left join formula.product_type pt on pt.id = cp.product_type_id
  where type_name = 'NB'
) a,
(
	select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device')
) b
on conflict do nothing;

-- plastic_emi_sputtering_size
INSERT INTO formula.plastic_emi_sputtering_size (emi_size, "size", product_type_id)
select emi_size, "size", pt.id 
from formula.plastic_emi_sputtering_size cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')
and pt.type_name in ('VAD','VAD ACC','Smart Device') on conflict do nothing;

-- plastic_emi_sputtering_base
INSERT INTO formula.plastic_emi_sputtering_base (emi_base, product_type_id)
select emi_base, pt.id 
from formula.plastic_emi_sputtering_base cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')
and pt.type_name in ('VAD','VAD ACC','Smart Device') on conflict do nothing;

insert into formula.plastic_emi_sputtering_link (group_id, size_id, base_id, product_type_id )
select gp.id, si.id, ba.id, pt.id 
from formula.plastic_emi_sputtering_group gp,
formula.plastic_emi_sputtering_size si,
formula.plastic_emi_sputtering_base ba,
formula.product_type pt
where gp.product_type_id = pt.id
and si.product_type_id = pt.id
and ba.product_type_id = pt.id
and pt.type_name in ('VAD','VAD ACC','Smart Device') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, sd_dt.id, pv.value, pv.value_type, pv.source_table
from (
	select a.id, b.group_name, c.emi_size, d.emi_base, a.product_type_id from formula.plastic_emi_sputtering_link a
	left join formula.plastic_emi_sputtering_group b on b.id = a.group_id
	left join formula.plastic_emi_sputtering_size c on c.id = a.size_id
	left join formula.plastic_emi_sputtering_base d on d.id = a.base_id) cp
left join (
	select a1.id, b1.group_name, c1.emi_size, d1.emi_base, a1.product_type_id from formula.plastic_emi_sputtering_link a1
	left join formula.plastic_emi_sputtering_group b1 on b1.id = a1.group_id
	left join formula.plastic_emi_sputtering_size c1 on c1.id = a1.size_id
	left join formula.plastic_emi_sputtering_base d1 on d1.id = a1.base_id) cp_dt on cp.group_name = cp_dt.group_name and cp.emi_size = cp_dt.emi_size and cp.emi_base = cp_dt.emi_base
right join formula.parameter_value pv 
	on pv.parameter_id = cp.id 
	and pv.activate_date_id = (
		select max(id) 
		from formula.schedule_date sd 
		where sd.formula_type_id = (
			select id 
			from formula.formula_type ft 
			where ft."name" = 'housing_plastic'
		)
	and sd.product_type_id = (
		select id from formula.product_type pt where pt.type_name = 'NB'
	)),
formula.schedule_date sd_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (
	select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device')
)
and sd_dt.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_plastic')
and sd_dt.product_type_id = cp_dt.product_type_id
on conflict do nothing;


-- plastic_paint_info
INSERT INTO formula.plastic_paint_info (product_type_id)
select pt.id
from formula.plastic_paint_info cp,
formula.product_type pt 
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')
and pt.type_name in ('VAD','VAD ACC','Smart Device') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.usd_min, pv.activate_date_id , pv.value, pv.value_type, pv.source_table
from formula.plastic_paint_info cp
right join formula.parameter_value pv on pv.parameter_id = cp.usd_min,
formula.plastic_paint_info cp_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device'))
on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.man_hour, pv.activate_date_id , pv.value, pv.value_type, pv.source_table
from formula.plastic_paint_info cp
right join formula.parameter_value pv on pv.parameter_id = cp.man_hour,
formula.plastic_paint_info cp_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp_dt.product_type_id in (select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device'))
on conflict do nothing;

-- plastic_paint_man_power
INSERT INTO formula.plastic_paint_man_power (product_type_id, category_name)
select pt.id, cp.category_name
from formula.plastic_paint_man_power cp,
formula.product_type pt 
where cp.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB')
and pt.type_name in ('VAD','VAD ACC','Smart Device') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, pv.activate_date_id , pv.value, pv.value_type, pv.source_table
from formula.plastic_paint_man_power cp
right join formula.parameter_value pv on pv.parameter_id = cp.id,
formula.plastic_paint_man_power cp_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp.category_name = cp_dt.category_name
and cp_dt.product_type_id in (select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device'))
on conflict do nothing;

-- material_loss_rate
insert into formula.plastic_material_loss_rate_product_type (product_type_id, plastic_material_loss_rate_id)
select pt.id, cp.plastic_material_loss_rate_id
from formula.plastic_material_loss_rate_product_type cp,
formula.product_type pt
where cp.product_type_id = (select id from formula.product_type where type_name = 'NB')
and pt.type_name in ('VAD','VAD ACC','Smart Device') on conflict do nothing;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, pv.activate_date_id , pv.value, pv.value_type, pv.source_table
from formula.plastic_material_loss_rate_product_type cp
right join formula.parameter_value pv on pv.parameter_id = cp.id,
formula.plastic_material_loss_rate_product_type cp_dt
where cp.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
)
and cp.plastic_material_loss_rate_id = cp_dt.plastic_material_loss_rate_id
and cp_dt.product_type_id in (select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device'))
on conflict do nothing;

-- 06 [add metal module] ------------------------------------------------------------
/*
  ##   #####  #####     #    # ###### #####   ##   #      
 #  #  #    # #    #    ##  ## #        #    #  #  #      
#    # #    # #    #    # ## # #####    #   #    # #      
###### #    # #    #    #    # #        #   ###### #      
#    # #    # #    #    #    # #        #   #    # #      
#    # #####  #####     #    # ######   #   #    # ###### 
                                                          
                                          
#    #  ####  #####  #    # #      ###### 
##  ## #    # #    # #    # #      #      
# ## # #    # #    # #    # #      #####  
#    # #    # #    # #    # #      #      
#    # #    # #    # #    # #      #      
#    #  ####  #####   ####  ###### ###### 
*/
insert into formula.module_metal (module_name, product_type_id, metal_type_id)
select 'Module 7', pt.id, mt.id
from formula.product_type pt,
formula.metal_type mt
where pt.type_name ='VAD'
and mt.type_name = 'Metal'
on conflict do nothing;

insert into formula.module_metal (module_name, product_type_id, metal_type_id)
select 'Module 8', pt.id, mt.id
from formula.product_type pt,
formula.metal_type mt
where pt.type_name ='VAD ACC'
and mt.type_name = 'Metal'
on conflict do nothing;

insert into formula.module_metal (module_name, product_type_id, metal_type_id)
select 'Module 9', pt.id, mt.id
from formula.product_type pt,
formula.metal_type mt
where pt.type_name ='Smart Device'
and mt.type_name = 'Metal'
on conflict do nothing;

insert into formula.metal_press_module_machine_type (module_id, machine_id, press_type_id)
select mo.id, cp.machine_id, cp.press_type_id
from formula.metal_press_module_machine_type cp,
formula.module_metal mo
where cp.module_id = (select id from formula.module_metal where product_type_id = (select id from formula.product_type where type_name = 'NB') and disable_time is null)
and mo.product_type_id in (select id from formula.product_type pt where pt.type_name in ('VAD','VAD ACC','Smart Device'))
on conflict do nothing;

insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select cp_dt.id, cp.activate_date_id, cp.value, cp.value_type, cp.source_table
from (
	select pv.*, mp.machine_id, mp.press_type_id
	from formula.parameter_value pv
	left join formula.metal_press_module_machine_type mp on mp.id = pv.parameter_id
	left join formula.module_metal mo on mo.id = mp.module_id
	where mo.product_type_id = (select id from formula.product_type where type_name = 'NB')
	and mo.disable_time is null
) cp,
(
	select mp.id, mp.machine_id, mp.press_type_id
	from formula.metal_press_module_machine_type mp
	left join formula.module_metal mo on mo.id = mp.module_id
	where mo.product_type_id in (select id from formula.product_type where type_name in ('VAD','VAD ACC','Smart Device'))
	and mo.disable_time is null
) cp_dt
where cp.machine_id = cp_dt.machine_id
and cp.press_type_id = cp_dt.press_type_id
on conflict do nothing;

-- 07 [set plastic module] ------------------------------------------------------------
/*                                                                  
 ####  ###### #####    #####  #        ##    ####  ##### #  ####  
#      #        #      #    # #       #  #  #        #   # #    # 
 ####  #####    #      #    # #      #    #  ####    #   # #      
     # #        #      #####  #      ######      #   #   # #      
#    # #        #      #      #      #    # #    #   #   # #    # 
 ####  ######   #      #      ###### #    #  ####    #   #  ####  
                                                                  
                                          
#    #  ####  #####  #    # #      ###### 
##  ## #    # #    # #    # #      #      
# ## # #    # #    # #    # #      #####  
#    # #    # #    # #    # #      #      
#    # #    # #    # #    # #      #      
#    #  ####  #####   ####  ###### ###### 
*/
insert into formula.product_type_category_module (module_id, part_category_2_id , product_type_id )
select link.module_id , link.part_category_2_id, pt.id
from formula.product_type_category_module link,
formula.product_type pt
where link.product_type_id = (select id from formula.product_type where type_name = 'NB')
and pt.type_name in ('VAD','VAD ACC','Smart Device')
ON CONFLICT ON CONSTRAINT product_type_category_module_pk do update set disable_time = null;