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

-- ffc_material
CREATE OR REPLACE VIEW formula.v_dt_ffc_material as
select
  link.id,
  cat.category_name,
  link.spec,
  link.product_type_id,
  link.disable_time
from formula.cableffc_dt_material link
join formula.cableffc_dt_material_category cat on cat.id = link.category_id
join formula.cableffc_dt_material_vendor ven on ven.id = link.vendor_id;

-- ffc_connector
drop view if exists formula.v_dt_ffc_connector;
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
  pv.value,
  link.product_type_id,
  link.disable_time
from formula.cableffc_dt_connector link
join formula.cableffc_dt_connector_category cat on cat.id = link.category_id 
join formula.cableffc_dt_connector_spec spe on spe.id = link.spec_id
join formula.cableffc_dt_connector_vendor ven on ven.id = link.vendor_id
left join formula.parameter_value pv on pv.parameter_id = link.id
where pv.activate_date_id = (select MAX(id) from formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type where "name" = 'cable_ffc') and sd.product_type_id = link.product_type_id and sd.activate_date < now())
order by cat.category_name, spe.spec_name, link.pitch, link.row_num, link.pin, pv.value;