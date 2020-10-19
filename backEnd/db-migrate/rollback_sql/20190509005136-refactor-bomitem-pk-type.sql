-- ALTER TABLE wiprocurement.bom_item DROP COLUMN extra;
-- alter table wiprocurement.bom_item alter column parent_level type varchar(8) ;
-- ALTER TABLE wiprocurement.bom_partlist_value DROP CONSTRAINT bom_partlist_value_bom_item_id_fkey;
-- alter table wiprocurement.bom_partlist_value alter column bom_item_id type integer using cast(bom_item_id as integer);
-- alter table wiprocurement.bom_item alter column id type integer using cast(id as integer);
-- ALTER TABLE wiprocurement.bom_partlist_value ADD CONSTRAINT bom_partlist_value_bom_item_id_fkey FOREIGN KEY (bom_item_id) REFERENCES wiprocurement.bom_item (id);


