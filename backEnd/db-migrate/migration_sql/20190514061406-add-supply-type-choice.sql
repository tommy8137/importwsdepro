DELETE FROM wiprocurement.bom_item where supply_type = 'b821322a-46e3-11e9-a2f5-0242ac110002';
DELETE FROM wiprocurement.drop_down_item WHERE id='b821322a-46e3-11e9-a2f5-0242ac110002';
ALTER TABLE wiprocurement.drop_down_item ADD CONSTRAINT path_unique UNIQUE(path);
