INSERT INTO formula.product_type (type_name, remark) VALUES ('Conference_Phone', '');
INSERT INTO formula.product_type (type_name, remark) VALUES ('IPC', '');
INSERT INTO formula.product_type (type_name, remark) VALUES ('LCM', '');
INSERT INTO formula.product_type (type_name, remark) VALUES ('Monitor', '');
INSERT INTO formula.product_type (type_name, remark) VALUES ('PD', '');
INSERT INTO formula.product_type (type_name, remark) VALUES ('Server', '');
INSERT INTO formula.product_type (type_name, remark) VALUES ('TC', '');
INSERT INTO formula.product_type (type_name, remark) VALUES ('VOIP Phone', '');

-- 舊資料處理
UPDATE wiprocurement.bom_projects SET product_type='Conference_Phone' WHERE product_type = 'Conf_Phone';
UPDATE wiprocurement.bom_projects SET product_type='VOIP Phone' WHERE product_type = 'VOIP_Phone';
