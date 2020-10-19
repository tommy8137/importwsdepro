alter table wiprocurement.bom_item add column if not exists has_child bool default false;
alter table wiprocurement.bom_item_complete_version add column if not exists has_child bool default false;
-- set has child for old data
update wiprocurement.bom_item set has_child=true where id in (select distinct parent_level from wiprocurement.bom_item bi where parent_level is not null);
update wiprocurement.bom_item_complete_version set has_child=true where id in (select distinct parent_level from wiprocurement.bom_item_complete_version bi where parent_level is not null);
