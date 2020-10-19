
-- THERMAL 修改
update wiprocurement.drop_down_item set path=replace(path,'THERMAL.','THERMAL2.') where path like 'THERMAL.%' and layout_name='bom_item' AND field_name IN ('parts_ctgy_1', 'parts_ctgy_2', 'material_spec', 'material');

-- EMC 修改
DELETE FROM wiprocurement.drop_down_item WHERE item_name='EMC' AND path='EMC' AND field_name='parts_ctgy_1' AND layout_name='bom_item';
DELETE FROM wiprocurement.drop_down_item WHERE path like 'EMC.%' AND layout_name='bom_item' AND field_name IN ('parts_ctgy_1', 'parts_ctgy_2', 'material_spec', 'material');

-- EMC +1
INSERT INTO wiprocurement.drop_down_item (path, item_name, field_name, layout_name) VALUES ('EMC2.EMISPRING', 'EMISpring', 'parts_ctgy_2', 'bom_item');

-- CABLE +1
INSERT INTO wiprocurement.drop_down_item (path, item_name, field_name, layout_name) VALUES ('CABLE2.POWERCORD', 'Power Cord', 'parts_ctgy_2', 'bom_item');

-- ME-OTHERES +4 
-- LV3
INSERT INTO wiprocurement.drop_down_item (path, item_name, field_name, layout_name) VALUES ('MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.T025', 'T0.25', 'material_spec', 'bom_item');
INSERT INTO wiprocurement.drop_down_item (path, item_name, field_name, layout_name) VALUES ('MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.T025', 'T0.25', 'material_spec', 'bom_item');
-- LV4
INSERT INTO wiprocurement.drop_down_item (path, item_name, field_name, layout_name) VALUES ('MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.T025.FZRCSJB', '非阻燃醋酸膠布', 'material', 'bom_item');
INSERT INTO wiprocurement.drop_down_item (path, item_name, field_name, layout_name) VALUES ('MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.T025.ZRCSJB', '阻燃醋酸膠布', 'material', 'bom_item');
INSERT INTO wiprocurement.drop_down_item (path, item_name, field_name, layout_name) VALUES ('MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.T025.FZRHSBZB', '非阻燃黑色不織布', 'material', 'bom_item');
INSERT INTO wiprocurement.drop_down_item (path, item_name, field_name, layout_name) VALUES ('MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.T025.ZRHSBZB', '阻燃黑色不織布', 'material', 'bom_item');

