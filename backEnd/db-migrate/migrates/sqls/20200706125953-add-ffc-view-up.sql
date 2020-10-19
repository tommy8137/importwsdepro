insert into formula.me_spec (spec_category, spec_name)values
-- FFCAccessoryMaterialType 
('ffc_accessory_material_type', '主料'),
('ffc_accessory_material_type', '次料'),
-- FFCAccessoryAssemblyType 
('ffc_accessory_assembly_type', '平貼'),
('ffc_accessory_assembly_type', '環包'),
('ffc_accessory_assembly_type', '纏繞'),
-- FFCReinforcingPlateQty1 
('ffc_reinforcing_plate_qty1', '1'),
('ffc_reinforcing_plate_qty1', '2'),
-- FFCReinforcingPlateQty2
('ffc_reinforcing_plate_qty2', '1'),
-- FFCStopLine 
('ffc_stop_line', '0'),
('ffc_stop_line', '1'),
('ffc_stop_line', '2'),
('ffc_stop_line', '3'),
('ffc_stop_line', '4'),
('ffc_stop_line', '5'),
('ffc_stop_line', '6'),
-- FFCPrintArea 
('ffc_print_area', '0'),
('ffc_print_area', '1'),
('ffc_print_area', '2'),
-- FFCFlushCount  
('ffc_flush_count', '0'),
('ffc_flush_count', '1'),
('ffc_flush_count', '2'),
-- FFCBendTImes   
('ffc_bend_times', '0'),
('ffc_bend_times', '1'),
('ffc_bend_times', '2'),
('ffc_bend_times', '3'),
('ffc_bend_times', '4'),
('ffc_bend_times', '5'),
('ffc_bend_times', '6'),
('ffc_bend_times', '7'),
('ffc_bend_times', '8'),
('ffc_bend_times', '9'),
('ffc_bend_times', '10'),
-- FFCSprayCode 
('ffc_spray_code', '0'),
('ffc_spray_code', '1'),
('ffc_spray_code', '2'),
('ffc_spray_code', '3'),
('ffc_spray_code', '4'),
('ffc_spray_code', '5'),
('ffc_spray_code', '6'),
('ffc_spray_code', '7'),
('ffc_spray_code', '8'),
('ffc_spray_code', '9'),
('ffc_spray_code', '10')
on conflict do nothing;

-- ffc_accessory_material_type
CREATE OR REPLACE VIEW formula.v_dt_ffc_accessory_material_type as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'ffc_accessory_material_type';
-- Permissions
ALTER TABLE formula.v_dt_ffc_accessory_material_type OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_dt_ffc_accessory_material_type TO "swpc-user";
GRANT SELECT ON TABLE formula.v_dt_ffc_accessory_material_type TO emdm;

-- ffc_accessory_assembly_type
CREATE OR REPLACE VIEW formula.v_dt_ffc_accessory_assembly_type as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'ffc_accessory_assembly_type';
-- Permissions
ALTER TABLE formula.v_dt_ffc_accessory_assembly_type OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_dt_ffc_accessory_assembly_type TO "swpc-user";
GRANT SELECT ON TABLE formula.v_dt_ffc_accessory_assembly_type TO emdm;

-- ffc_reinforcing_plate_qty1
CREATE OR REPLACE VIEW formula.v_dt_ffc_reinforcing_plate_qty1 as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'ffc_reinforcing_plate_qty1';
-- Permissions
ALTER TABLE formula.v_dt_ffc_reinforcing_plate_qty1 OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_dt_ffc_reinforcing_plate_qty1 TO "swpc-user";
GRANT SELECT ON TABLE formula.v_dt_ffc_reinforcing_plate_qty1 TO emdm;

-- ffc_reinforcing_plate_qty2
CREATE OR REPLACE VIEW formula.v_dt_ffc_reinforcing_plate_qty2 as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'ffc_reinforcing_plate_qty2';
-- Permissions
ALTER TABLE formula.v_dt_ffc_reinforcing_plate_qty2 OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_dt_ffc_reinforcing_plate_qty2 TO "swpc-user";
GRANT SELECT ON TABLE formula.v_dt_ffc_reinforcing_plate_qty2 TO emdm;

-- ffc_stop_line
CREATE OR REPLACE VIEW formula.v_dt_ffc_stop_line as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'ffc_stop_line';
-- Permissions
ALTER TABLE formula.v_dt_ffc_stop_line OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_dt_ffc_stop_line TO "swpc-user";
GRANT SELECT ON TABLE formula.v_dt_ffc_stop_line TO emdm;

-- ffc_print_area
CREATE OR REPLACE VIEW formula.v_dt_ffc_print_area as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'ffc_print_area';
-- Permissions
ALTER TABLE formula.v_dt_ffc_print_area OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_dt_ffc_print_area TO "swpc-user";
GRANT SELECT ON TABLE formula.v_dt_ffc_print_area TO emdm;

-- ffc_flush_count
CREATE OR REPLACE VIEW formula.v_dt_ffc_flush_count as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'ffc_flush_count';
-- Permissions
ALTER TABLE formula.v_dt_ffc_flush_count OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_dt_ffc_flush_count TO "swpc-user";
GRANT SELECT ON TABLE formula.v_dt_ffc_flush_count TO emdm;

-- ffc_bend_times
CREATE OR REPLACE VIEW formula.v_dt_ffc_bend_times as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'ffc_bend_times';
-- Permissions
ALTER TABLE formula.v_dt_ffc_bend_times OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_dt_ffc_bend_times TO "swpc-user";
GRANT SELECT ON TABLE formula.v_dt_ffc_bend_times TO emdm;

-- ffc_spray_code
CREATE OR REPLACE VIEW formula.v_dt_ffc_spray_code as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'ffc_spray_code';
-- Permissions
ALTER TABLE formula.v_dt_ffc_spray_code OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_dt_ffc_spray_code TO "swpc-user";
GRANT SELECT ON TABLE formula.v_dt_ffc_spray_code TO emdm;

-- ffc_accessory
CREATE OR REPLACE VIEW formula.v_dt_ffc_accessory as
select
	link.id,
	link.category_id,
	cat.category_name,
	link.spec as spec_name,
    link.disable_time,
    link.product_type_id
from formula.cableffc_dt_accessories link
join formula.cableffc_dt_accessories_category cat on cat.id = link.category_id;

-- ffc_accessory_type
drop view if exists formula.v_dt_ffc_accessory_type;
CREATE OR REPLACE VIEW formula.v_dt_ffc_accessory_type as
select
	cat.id,
	cat.category_name,
	cda.product_type_id,
	(
		case
			when cat.category_name = 'Others' then null
			when (
				select COUNT(id)
				from formula.cableffc_dt_accessories
				where category_id = cat.id
				and product_type_id = cda.product_type_id
				and disable_time is not null
			) = (
				select COUNT(id)
				from formula.cableffc_dt_accessories
				where category_id = cat.id
				and product_type_id = cda.product_type_id
			)
			then now()
			else null
		end
	) as disable_time
from formula.cableffc_dt_accessories_category cat
left join (
	select distinct category_id, product_type_id
	from formula.cableffc_dt_accessories
	union all
	select a.id, b.product_type_id
	from formula.cableffc_dt_accessories_category a,
	(select distinct product_type_id from formula.cableffc_dt_accessories) b
	where a.category_name = 'Others'
) cda on cat.id = cda.category_id;

-- ffc_material
CREATE OR REPLACE VIEW formula.v_dt_ffc_material as
select
  link.id,
  cat.category_name,
  link.spec,
  link.product_type_id
from formula.cableffc_dt_material link
join formula.cableffc_dt_material_category cat on cat.id = link.category_id
join formula.cableffc_dt_material_vendor ven on ven.id = link.vendor_id;

-- ffc_connector
CREATE OR REPLACE VIEW formula.v_dt_ffc_connector as
select
  link.id,
  cat.category_name,
  spe.spec_name,
  link.pitch,
  link.row_num as "row",
  link.pin,
  ven.vendor_name,
  link.part_number,
  link.product_type_id
from formula.cableffc_dt_connector link
join formula.cableffc_dt_connector_category cat on cat.id = link.category_id 
join formula.cableffc_dt_connector_spec spe on spe.id = link.spec_id
join formula.cableffc_dt_connector_vendor ven on ven.id = link.vendor_id;
