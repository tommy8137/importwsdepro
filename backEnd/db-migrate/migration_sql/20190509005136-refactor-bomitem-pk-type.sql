ALTER TABLE wiprocurement.bom_partlist_value DROP CONSTRAINT bom_partlist_value_bom_item_id_fkey;
alter table wiprocurement.bom_item alter column id type varchar(64) using cast(id as varchar) ;
ALTER TABLE wiprocurement.bom_item ALTER COLUMN id SET DEFAULT uuid_generate_v1()::varchar;
alter table wiprocurement.bom_item alter column parent_level type varchar(64) ;
alter table wiprocurement.bom_partlist_value alter column bom_item_id type varchar(64) using cast(bom_item_id as varchar);
ALTER TABLE wiprocurement.bom_partlist_value ADD CONSTRAINT bom_partlist_value_bom_item_id_fkey FOREIGN KEY (bom_item_id) REFERENCES wiprocurement.bom_item (id);
ALTER TABLE wiprocurement.bom_item ADD COLUMN extra json;
