-- disable
-- select * from formula.common_parameter cp
update formula.common_parameter cp
set disable_time = now()
where cp."label" in (
	'drill_cutting_cost',
	'drill_cutting_loss_rate',
	'drill_cuttin_cycle_time_numerator',
	'stage_stamping_convex_hull_loss_rate',
	'spraying_const'
)
and cp.formula_type_id = (select id from formula.formula_type where "name" = 'housing_metal')
and product_type_id in (select id from formula.product_type where type_name in ('DT', 'AIO', 'VoIP'));

-- rename
drop table if exists formula.tmp_common_parameter;
CREATE TABLE if not exists formula.tmp_common_parameter (
	"label" varchar(200),
	new_name varchar(200)
);
insert into formula.tmp_common_parameter ("label", new_name) values 
('cnc_4_axis_core_side_cost', 'CNC固定用四軸單價'),
('cnc_core_side_cost', 'CNC單價'),
('cnc_core_side_loss_rate', 'CNC loss rate'),
('laser_engraving_core_side_cost', '鐳雕單價'),
('laser_engraving_core_side_loss_rate', '鐳雕 loss rate'),
('washing_cost', '清洗單價'),
('washing_loss_rate', '清洗loss rate'),
('single_spot_welding_cost', '點焊單價'),
('single_spot_welding_loss_rate', '點焊loss rate'),
('single_tapping_cost', '攻牙單價'),
('single_tapping_loss_rate', '攻牙loss rate'),
('single_rivet_cost', '鉚釘單價'),
('single_rivet_loss_rate', '鉚釘loss rate')
;

update formula.common_parameter cp
-- select tmp.new_name, cp.label_name, cp.product_type_id
	set label_name = tmp.new_name
from formula.tmp_common_parameter tmp
where cp."label" = tmp."label"
and cp.formula_type_id = (select id from formula.formula_type where "name" = 'housing_metal')
and cp.product_type_id in (select id from formula.product_type where type_name in ('DT', 'AIO', 'VoIP'));

-- modify unit
drop table if exists formula.tmp_common_parameter;
CREATE TABLE if not exists formula.tmp_common_parameter (
	"label" varchar(200),
	unit varchar(200)
);
insert into formula.tmp_common_parameter ("label", unit) values
('washing_cost', 'USD/pcs'),
('sand_blast_cost', 'USD/M²'),
('hair_cost', 'USD/M²'),
('thermal_bonding_heat_pressing_machining_cost', 'USD/sec'),
('single_tapping_cost', 'USD/pcs'),
('single_spot_welding_cost', 'USD/pcs'),
('single_rivet_cost', 'USD/pcs'),
('blind_rivet_cost', 'USD/pcs'),
('screen_printing_cost', 'USD/pcs'),
('pad_printing_cost', 'USD/pcs'),
('silk_print_cost', 'USD/pcs'),
('cnc_core_side_cost', 'USD/sec'),
('laser_engraving_core_side_cost', 'USD/M²'),
('grinding_manual_cost', 'USD/sec'),
('grinding_auto_cost', 'USD/sec'),
('laser_welding_cost', 'USD/dot')
;

update formula.common_parameter cp
set unit = tmp.unit
from formula.tmp_common_parameter tmp
where cp."label" = tmp."label"
and cp.formula_type_id = (select id from formula.formula_type where "name" = 'housing_metal')
and cp.product_type_id in (select id from formula.product_type where type_name in ('DT', 'AIO', 'VoIP'))
;

drop table if exists formula.tmp_common_parameter;

