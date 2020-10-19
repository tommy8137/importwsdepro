drop table if exists wiprocurement.decimal_config;
CREATE TABLE if not exists wiprocurement.decimal_config (
	id serial,
	category varchar(50),
	parameter_name varchar(50),
	value int4,
	remark varchar(400),
	CONSTRAINT decimal_config_pk PRIMARY KEY (id),
	CONSTRAINT decimal_config_un UNIQUE (category, parameter_name)
);

insert into wiprocurement.decimal_config(category, parameter_name, value, remark)values
-- ME
('MEBom', 'default', 5, null),
('MEBom', 'lastPrice', 5, null),
('MEBom', 'cleanSheetCost', 5, null),
('MEBom', 'SPACost', 5, null),
('MEBom', 'sourcerShipping', 5, null),
('MEBom', 'sourcerPL', 5, null),
('MEBom', 'sourcerAssembly', 5, null),
('MEBom', 'sourcerCostUP', 5, null),
('MEBom', 'sourcerCostSKU', 5, null),
('MEBom', 'inquiryCostUP', 5, null),
('MEBom', 'ceShipping', 5, null),
('MEBom', 'cePL', 5, null),
('MEBom', 'ceAssembly', 5, null),
('MEBom', 'ceCostUP', 5, null),
('MEBom', 'ceCostSKU', 5, null),
('MEBom', 'totalCostSKU', 5, null),
('MEBom', 'ceProjectParameters', 5, null),
('MEBom', 'exchangeRate', 5, null),
('MEBom', 'SKU', 5, null),
-- Database
('Database', 'default', 4, null),
('Database', 'price', 8, 'last current next 讀取限制'),
('Database', 'emiSputtering', 8, 'Plastic Emi Sputtering 清單 讀取限制'),
('Database', 'turningScrewDiameter', 8, 'turning 牙徑清單 OD內徑 寫入限制'),
-- Part List
('PartList', 'default', 4, null),
('PartList', 'turningScrewToothDiameter', 4, 'turning 牙徑清單 牙徑 讀取限制'),
('PartList', 'thermalPipeThickness', 4, 'thermal Pipe 厚度'),
-- EE
('EEBom', 'default', 5, null),
-- Dash Board
('DashBoard', 'default', 5, null)
on conflict do nothing;

