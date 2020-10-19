-- 將舊有foreign到的bom item清空值
UPDATE wiprocurement.bom_projects SET product_type=NULL WHERE product_type in (select key from wiprocurement.bom_create_basedata where type='PRODUCTTYPE');
-- 刪除舊的資料
DELETE FROM wiprocurement.bom_create_basedata WHERE type='PRODUCTTYPE';

-- 寫入資料
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('PRODUCTTYPE', 'NB', 'NB');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('PRODUCTTYPE', 'DT', 'DT');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('PRODUCTTYPE', 'AIO', 'AIO');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('PRODUCTTYPE', 'TC', 'TC');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('PRODUCTTYPE', 'PD', 'PD');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('PRODUCTTYPE', 'Monitor', 'Monitor');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('PRODUCTTYPE', 'LCM', 'LCM');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('PRODUCTTYPE', 'Server', 'Server');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('PRODUCTTYPE', 'VOIP_Phone', 'VOIP Phone');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('PRODUCTTYPE', 'Conf_Phone', 'Conference_Phone');
INSERT INTO wiprocurement.bom_create_basedata(type, key, value) VALUES ('PRODUCTTYPE', 'IPC ', 'IPC');
