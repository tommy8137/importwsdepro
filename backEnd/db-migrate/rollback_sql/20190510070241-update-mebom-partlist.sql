alter table wiprocurement.bom_partlist_value drop constraint bom_partlist_value_unique;
alter table wiprocurement.bom_partlist_value alter column  partlist_value type varchar;
alter table wiprocurement.bom_partlist_value alter column bom_item_id DROP NOT NULL;