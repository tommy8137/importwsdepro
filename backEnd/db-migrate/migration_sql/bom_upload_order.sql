ALTER TABLE wiprocurement.bom_item_upload_temp ADD order_id integer DEFAULT 1;
ALTER TABLE wiprocurement.bom_item ADD order_id integer DEFAULT 1;
ALTER TABLE wiprocurement.bom_item_complete_version ADD order_id integer DEFAULT 1;

ALTER TABLE wiprocurement.bom_item_upload_temp ADD remark character varying(120) DEFAULT null;
ALTER TABLE wiprocurement.bom_item ADD remark character varying(120) DEFAULT null;
ALTER TABLE wiprocurement.bom_item_complete_version ADD remark character varying(120) DEFAULT null;

truncate table wiprocurement.col_dependence;
truncate table wiprocurement.col_definite CASCADE;

INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('ef908614-46e0-11e9-a2f5-0242ac110002', 'customer_pn', 'Customer P/N', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('ef948f16-46e0-11e9-a2f5-0242ac110002', 'system_cost', 'System Cost', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('ef98a2c2-46e0-11e9-a2f5-0242ac110002', 'source_cost', 'Sourcer Cost', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('ef9c273a-46e0-11e9-a2f5-0242ac110002', 'ref_part_num', 'Reference Part Number', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('5d2b983a-46e1-11e9-a2f5-0242ac110002', 'qty', 'QTY', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('d80ebaf0-46e1-11e9-a2f5-0242ac110002', 'part_size_l', 'L', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('d812845a-46e1-11e9-a2f5-0242ac110002', 'part_size_w', 'W', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('d816182c-46e1-11e9-a2f5-0242ac110002', 'part_size_h', 'H', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('d819e2c2-46e1-11e9-a2f5-0242ac110002', 'part_size_ef', 'Φ ', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('d81d8aa8-46e1-11e9-a2f5-0242ac110002', 'part_size_l2', 'L2', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('d822178a-46e1-11e9-a2f5-0242ac110002', 'part_size_w2', 'W2', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('d825c5a6-46e1-11e9-a2f5-0242ac110002', 'part_size_m', 'M', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('f883f08e-46e1-11e9-a2f5-0242ac110002', 'thickness', 'Thickness', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('f888893c-46e1-11e9-a2f5-0242ac110002', 'part_weight', 'Part Weight', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('1b2e6a6a-46e2-11e9-a2f5-0242ac110002', 'material_spec', 'Material Spec.', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('1b326ee4-46e2-11e9-a2f5-0242ac110002', 'material', 'Material', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('7c4464e2-46e4-11e9-a2f5-0242ac110002', 'parts_ctgy_1', 'Parts Category I', 'bom_item');
INSERT INTO wiprocurement.col_definite (id, col_key, col_name, used_by) VALUES ('50d2d13c-4ad5-11e9-a584-0242ac110002', 'parts_ctgy_2', 'Parts Category II', 'bom_item');

--Housing - Plastic 
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdd99c-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdd99c-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdd99c-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd816182c-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdd99c-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f888893c-46e1-11e9-a2f5-0242ac110002');

--Housing - Plastic_NB
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('933d28f0-7bb9-11e9-89dc-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('933d28f0-7bb9-11e9-89dc-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('933d28f0-7bb9-11e9-89dc-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd816182c-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('933d28f0-7bb9-11e9-89dc-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f888893c-46e1-11e9-a2f5-0242ac110002');

--Housing-Metal
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fd9860-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fd9860-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fd9860-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd816182c-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fd9860-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd81d8aa8-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fd9860-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd822178a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fd9860-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--Housing-Aluminum 
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fd9b1c-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fd9b1c-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fd9b1c-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd816182c-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fd9b1c-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd81d8aa8-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fd9b1c-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd822178a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fd9b1c-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--Housing-Double-injection
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fde018-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fde018-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fde018-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd816182c-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fde018-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f888893c-46e1-11e9-a2f5-0242ac110002');

--Housing-RHCM_Process 
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fde2f2-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fde2f2-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fde2f2-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd816182c-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fde2f2-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f888893c-46e1-11e9-a2f5-0242ac110002');

--Housing-IMR
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fde5d6-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fde5d6-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fde5d6-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd816182c-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fde5d6-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f888893c-46e1-11e9-a2f5-0242ac110002');

--Thermal -Fan
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdec7a-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdec7a-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdec7a-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd816182c-46e1-11e9-a2f5-0242ac110002');

--Thermal-Pad
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c056a-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c056a-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c056a-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--Thermal-Graphite Sheet
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c077c-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c077c-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c077c-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--Thermal-Heatsink
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdf22e-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdf22e-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdf22e-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd816182c-46e1-11e9-a2f5-0242ac110002');

--Thermal-Cu Foil 
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c0998-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c0998-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c0998-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--ME-others-Standoff 
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdc330-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdc330-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd825c5a6-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdc330-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd819e2c2-46e1-11e9-a2f5-0242ac110002');

--ME-others-Screw
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdc98e-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdc98e-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd825c5a6-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdc98e-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd819e2c2-46e1-11e9-a2f5-0242ac110002');

--ME-others-Nut
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdc68c-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdc68c-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd825c5a6-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdc68c-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd819e2c2-46e1-11e9-a2f5-0242ac110002');

--ME-others-Rubber
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c1e2e-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c1e2e-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c1e2e-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd816182c-46e1-11e9-a2f5-0242ac110002');

--ME-others-Mylar_of_Mylar_Sponge_Poron
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdbb10-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdbb10-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdbb10-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--ME-others-Sponge_of_Mylar_Sponge_Poron 
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdb840-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdb840-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdb840-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--ME-others-Adhesive_of_Mylar_Sponge_Poron 
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdb412-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdb412-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdb412-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--ME-others-Protection_Film_of_Mylar_Sponge_Poron
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdafda-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdafda-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdafda-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--ME-others-Acetate_Tape_of_Mylar_Sponge_Poron 
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c3314-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c3314-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c3314-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--ME-others-Non_Woven_of_Mylar_Sponge_Poron 
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c35d0-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c35d0-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('6c5c35d0-67e3-11e9-874c-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--EMC-Absorber 
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdac74-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdac74-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdac74-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--EMC-Gasket
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fda3f0-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fda3f0-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fda3f0-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd816182c-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fda3f0-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--EMC-Al_Foil 
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fda832-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fda832-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fda832-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--EMC-Al_ShieldingCan
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdf512-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdf512-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdf512-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd816182c-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdf512-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd81d8aa8-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdf512-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd822178a-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fdf512-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'f883f08e-46e1-11e9-a2f5-0242ac110002');

--EMC-ConductiveTape
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fd9f68-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd80ebaf0-46e1-11e9-a2f5-0242ac110002');
INSERT INTO wiprocurement.col_dependence (col_val, col_id, required_col_id) VALUES ('73fd9f68-5a91-11e9-8606-0242ac110002', '50d2d13c-4ad5-11e9-a584-0242ac110002', 'd812845a-46e1-11e9-a2f5-0242ac110002');