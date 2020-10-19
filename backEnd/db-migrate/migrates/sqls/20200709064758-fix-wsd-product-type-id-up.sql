INSERT INTO formula.product_type (id,type_name)values
(13, 'VAD_new'),
(14, 'VAD ACC_new'),
(15, 'Smart Device_new')
on conflict do nothing;

drop table if exists formula.tmp_product_type;
CREATE TABLE if not exists formula.tmp_product_type (
	id int4,
	type_name varchar(200),
	new_id int4
);

insert into formula.tmp_product_type(id, type_name, new_id)values
((select id from formula.product_type where type_name = 'VAD'), 'VAD', 13),
((select id from formula.product_type where type_name = 'VAD ACC'), 'VAD ACC', 14),
((select id from formula.product_type where type_name = 'Smart Device'), 'Smart Device', 15)
on conflict do nothing;

-- bom_partlist_config_product_type
update wiprocurement.bom_partlist_config_product_type dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- schedule_date
update formula.schedule_date dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.gb_assy_ctgy
update formula.gb_assy_ctgy dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.common_parameter
update formula.common_parameter dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.metal_syringe
update formula.metal_syringe dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.metal_glue
update formula.metal_glue dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.metal_anode_color
update formula.metal_anode_color dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.plastic_embed_nail
update formula.plastic_embed_nail dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.plastic_printing
update formula.plastic_printing dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.plastic_grinding
update formula.plastic_grinding dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.plastic_emi_sputtering_group
update formula.plastic_emi_sputtering_group dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.plastic_emi_sputtering_site_group
update formula.plastic_emi_sputtering_site_group dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.plastic_emi_sputtering_size
update formula.plastic_emi_sputtering_size dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.plastic_emi_sputtering_base
update formula.plastic_emi_sputtering_base dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.plastic_emi_sputtering_link
update formula.plastic_emi_sputtering_link dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.plastic_paint_info
update formula.plastic_paint_info dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.plastic_paint_man_power
update formula.plastic_paint_man_power dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.plastic_material_loss_rate_product_type
update formula.plastic_material_loss_rate_product_type dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.module_metal
update formula.module_metal dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

-- formula.product_type_category_module
update formula.product_type_category_module dt
set product_type_id = tmp.new_id
from formula.tmp_product_type tmp
where dt.product_type_id = tmp.id;

delete from formula.product_type
where type_name = 'VAD'
and id != 13;

delete from formula.product_type
where type_name = 'VAD ACC'
and id != 14;

delete from formula.product_type
where type_name = 'Smart Device'
and id != 15;

update formula.product_type pt
set type_name = tmp.type_name
from formula.tmp_product_type tmp
where pt.id = tmp.new_id;

drop table if exists formula.tmp_product_type;