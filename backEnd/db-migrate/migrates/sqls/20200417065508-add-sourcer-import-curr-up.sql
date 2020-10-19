ALTER TABLE wiprocurement.bom_item ADD column if not exists sourcer_import_curr varchar(10);
ALTER TABLE wiprocurement.bom_item ADD column if not exists ori_sourcer_shipping numeric;
ALTER TABLE wiprocurement.bom_item ADD column if not exists ori_sourcer_pl numeric;
ALTER TABLE wiprocurement.bom_item ADD column if not exists ori_sourcer_assembly numeric;
ALTER TABLE wiprocurement.bom_item ADD column if not exists ori_sourcer_cost_up numeric;

ALTER TABLE wiprocurement.bom_item_complete_version ADD column if not exists sourcer_import_curr varchar(10);
ALTER TABLE wiprocurement.bom_item_complete_version ADD column if not exists ori_sourcer_shipping numeric;
ALTER TABLE wiprocurement.bom_item_complete_version ADD column if not exists ori_sourcer_pl numeric;
ALTER TABLE wiprocurement.bom_item_complete_version ADD column if not exists ori_sourcer_assembly numeric;
ALTER TABLE wiprocurement.bom_item_complete_version ADD column if not exists ori_sourcer_cost_up numeric;

ALTER TABLE wiprocurement.bom_sourcer_cost_temp ADD column if not exists sourcer_import_curr varchar(10);

update wiprocurement.bom_item set sourcer_import_curr = 'USD'
where source_cost is not null
and sourcer_import_curr is null;

update wiprocurement.bom_item_complete_version set sourcer_import_curr = 'USD'
where source_cost is not null
and sourcer_import_curr is null;