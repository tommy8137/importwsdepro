-- Cable Wire
-- INSERT to cablewire_connector_item
INSERT INTO formula.cablewire_connector_item (connector_item, remark, create_time, disable_time)
select 'Other_Fill_ME_Remark', NULL, now(), null;

-- INSERT to cablewire_connector_type_v1
INSERT INTO formula.cablewire_connector_type_v1 (
connector_type, connector_item_id, remark, create_time, disable_time)
select 'Other_Fill_ME_Remark', item.id, NULL, now(), null
from formula.cablewire_connector_item item
where item.disable_time is null;

-- INSERT to cablewire_connector_vendor
INSERT INTO formula.cablewire_connector_vendor (
vendor_pn, connector_type_id, price, process_time, remark, create_time, disable_time)
select '', id,  uuid_generate_v1(), uuid_generate_v1(), NULL, now(), null
from formula.cablewire_connector_type_v1 type
where connector_type = 'Other_Fill_ME_Remark';

-- INSERT to vendor price value
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
select vendor.price, sd.id, NULL, 'number', 'cablewire_connector_type', now()
from formula.schedule_date sd, formula.cablewire_connector_vendor vendor, formula.cablewire_connector_type_v1 type
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'cable_wire')
and vendor.connector_type_id = type.id
and connector_type = 'Other_Fill_ME_Remark' and vendor.vendor_pn = '';

-- INSERT to vendor loss rate value
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
select vendor.process_time, sd.id, NULL, 'number', 'cablewire_connector_type', now()
from formula.schedule_date sd, formula.cablewire_connector_vendor vendor, formula.cablewire_connector_type_v1 type
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'cable_wire')
and vendor.connector_type_id = type.id
and connector_type = 'Other_Fill_ME_Remark' and vendor.vendor_pn = '';


-- Cable FFC
-- INSERT to cableffc_connector_type
INSERT INTO formula.cableffc_connector_type (type_name, remark, create_time, disable_time)
select 'Other_Fill_ME_Remark', NULL, now(), null;

ALTER TABLE formula.cableffc_connector_vendor DROP CONSTRAINT cableffc_connector_vendor_un;

-- INSERT to cableffc_connector_vendor
INSERT INTO formula.cableffc_connector_vendor
(vendor_name, vendor_pn, connector_type_id, unit_price, process_time, remark, create_time, disable_time)
select 'Other_Fill_ME_Remark', '', type.id, uuid_generate_v1(), uuid_generate_v1(), NULL, now(), null
from formula.cableffc_connector_type type
where type.disable_time is null;

-- INSERT to vendor price value
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
select vendor.unit_price, sd.id, NULL, 'number', 'cableffc_connector_vendor', now()
from formula.schedule_date sd, formula.cableffc_connector_vendor vendor
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'cable_ffc')
and vendor_name = 'Other_Fill_ME_Remark' and vendor_pn = '';

-- INSERT to vendor process_time value
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
select vendor.process_time, sd.id, NULL, 'number', 'cableffc_connector_vendor', now()
from formula.schedule_date sd, formula.cableffc_connector_vendor vendor
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'cable_ffc')
and vendor_name = 'Other_Fill_ME_Remark' and vendor_pn = '';
