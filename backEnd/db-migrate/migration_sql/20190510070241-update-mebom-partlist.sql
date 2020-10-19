alter table wiprocurement.bom_partlist_value alter column partlist_value type json USING partlist_value::json;
alter table wiprocurement.bom_partlist_value alter column partlist_value set default '{}';
alter table wiprocurement.bom_partlist_value alter column create_time set default 'NOW()';
alter table wiprocurement.bom_partlist_value alter column update_time set default 'NOW()';
delete from  wiprocurement.bom_partlist_value where bom_item_id is null;
alter table wiprocurement.bom_partlist_value alter column bom_item_id set not null;
alter table wiprocurement.bom_partlist_value ADD CONSTRAINT bom_partlist_value_unique UNIQUE (bom_item_id);