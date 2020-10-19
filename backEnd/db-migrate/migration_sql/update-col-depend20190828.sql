
--modify bom item remark column
ALTER TABLE wiprocurement.bom_item ALTER COLUMN remark TYPE character varying (1500) COLLATE pg_catalog."default";

-- Insert drop down item
INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Forging', 'HOUSING.FORGING', 'parts_ctgy_2', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('AL_Extrusion', 'HOUSING.AL_EXTRUSION', 'parts_ctgy_2', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Module', 'HOUSING.MODULE', 'parts_ctgy_2', 'bom_item');

--new new drop down item
-- from upload excel

--Mylar/Sponge/Poron
INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Mylar/Sponge/Poron', 'MEOTHERS.MYLAR_SPONGE_PORON', 'parts_ctgy_2', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('阻燃黑色不織布', 'MEOTHERS.MESH.WOVEN', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T0.25Non_Woven', 'MEOTHERS.MESH.WOVEN.T025Non_Woven', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T0.35Non_Woven', 'MEOTHERS.MESH.WOVEN.T035Non_Woven', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('非阻燃黑色不織布', 'MEOTHERS.MESH.NON_WOVEN', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T0.25Non_Woven', 'MEOTHERS.MESH.NON_WOVEN.T025Non_Woven', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('UL導電布灰', 'EMC2.CONDU.ULGRAYCLOTH', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Non_UL導電布灰', 'EMC2.CONDU.NON_ULGRAYCLOTH', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Cu3604', 'MEOTHERS.LENS.CU3604', 'material_spec', 'bom_item');

-- form new request
INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('快削鋼', 'MEOTHERS.SCREW.KXG', 'material_spec', 'bom_item');

--T0.3
INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T0.3Lens', 'MEOTHERS.LENS.T03LENS', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('雙面硬化 0.3 PMMA', 'MEOTHERS.LENS.T03LENS.PET03', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Other_Fill_ME_Remark', 'MEOTHERS.LENS.T03LENS.OTHER_FILL_ME_REMARK', 'material', 'bom_item');

--T0.4
INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T0.4Lens', 'MEOTHERS.LENS.T04LENS', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('雙面硬化 0.4 PMMA', 'MEOTHERS.LENS.T04LENS.PET04', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Other_Fill_ME_Remark', 'MEOTHERS.LENS.T04LENS.OTHER_FILL_ME_REMARK', 'material', 'bom_item');

--T0.5
INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T0.5Lens', 'MEOTHERS.LENS.T05LENS', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('雙面硬化 0.5 PMMA', 'MEOTHERS.LENS.T05LENS.PET05', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Other_Fill_ME_Remark', 'MEOTHERS.LENS.T05LENS.OTHER_FILL_ME_REMARK', 'material', 'bom_item');

--T0.8
INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T0.8Lens', 'MEOTHERS.LENS.T08LENS', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('雙面硬化 0.8 PMMA', 'MEOTHERS.LENS.T08LENS.PET08', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Other_Fill_ME_Remark', 'MEOTHERS.LENS.T08LENS.OTHER_FILL_ME_REMARK', 'material', 'bom_item');

--T0.1
INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T1.0Lens', 'MEOTHERS.LENS.T10LENS', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('雙面硬化 1.0 PMMA', 'MEOTHERS.LENS.T10LENS.PET10', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Other_Fill_ME_Remark', 'MEOTHERS.LENS.T10LENS.OTHER_FILL_ME_REMARK', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Other_Fill_ME_Remark', 'MEOTHERS.LENS.OTHER_FILL_ME_REMARK', 'material_spec', 'bom_item');

--T0.05
INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T0.05_AlCu', 'THERMAL2.CUFOIL.T005_AlCu', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('AL_Mylar_不含背膠', 'THERMAL2.CUFOIL.T005_AlCu.A_M_N', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Cu_Mylar_不含背膠', 'THERMAL2.CUFOIL.T005_AlCu.C_M_N', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('軟鋁S_不含背膠', 'THERMAL2.CUFOIL.T005_AlCu.SS', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('軟銅_不含背膠', 'THERMAL2.CUFOIL.T005_AlCu.SD', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Other_Fill_ME_Remark', 'THERMAL2.CUFOIL.T005_AlCu.OTHER_FILL_ME_REMARK', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T0.06_AlCu', 'THERMAL2.CUFOIL.T006_AlCu', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('雙導鋁(含導電膠)', 'THERMAL2.CUFOIL.T006_AlCu.DS', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Other_Fill_ME_Remark', 'THERMAL2.CUFOIL.T006_AlCu.OTHER_FILL_ME_REMARK', 'material', 'bom_item');

--T0.075
INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T0.075_AlCu', 'THERMAL2.CUFOIL.T0075_AlCu', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('AL_Mylar_不含背膠', 'THERMAL2.CUFOIL.T0075_AlCu.A_M_N', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Other_Fill_ME_Remark', 'THERMAL2.CUFOIL.T0075_AlCu.OTHER_FILL_ME_REMARK', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T0.1_AlCu', 'THERMAL2.CUFOIL.T01_AlCu', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('AL_Mylar_不含背膠', 'THERMAL2.CUFOIL.T01_AlCu.A_M_N', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Cu_Mylar_不含背膠', 'THERMAL2.CUFOIL.T01_AlCu.C_M_N', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('雙導鋁(含導電膠)', 'THERMAL2.CUFOIL.T01_AlCu.DS', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('軟鋁S_不含背膠', 'THERMAL2.CUFOIL.T01_AlCu.SS', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('軟銅_不含背膠', 'THERMAL2.CUFOIL.T01_AlCu.SD', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Other_Fill_ME_Remark', 'THERMAL2.CUFOIL.T01_AlCu.OTHER_FILL_ME_REMARK', 'material', 'bom_item');

--T0.15
INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T0.15_AlCu', 'THERMAL2.CUFOIL.T015_AlCu', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('AL_Mylar_不含背膠', 'THERMAL2.CUFOIL.T015_AlCu.A_M_N', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Cu_Mylar_不含背膠', 'THERMAL2.CUFOIL.T015_AlCu.C_M_N', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('雙導鋁(含導電膠)', 'THERMAL2.CUFOIL.T015_AlCu.DS', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('軟銅_不含背膠', 'THERMAL2.CUFOIL.T015_AlCu.SD', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Other_Fill_ME_Remark', 'THERMAL2.CUFOIL.T015_AlCu.OTHER_FILL_ME_REMARK', 'material', 'bom_item');

--T0.20
INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T0.20_AlCu', 'THERMAL2.CUFOIL.T020_AlCu', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('雙導鋁(含導電膠)', 'THERMAL2.CUFOIL.T020_AlCu.DS', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Other_Fill_ME_Remark', 'THERMAL2.CUFOIL.T020_AlCu.OTHER_FILL_ME_REMARK', 'material', 'bom_item');

--T0.25
INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('T0.25_AlCu', 'THERMAL2.CUFOIL.T025_AlCu', 'material_spec', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('雙導鋁(含導電膠)', 'THERMAL2.CUFOIL.T025_AlCu.DS', 'material', 'bom_item');

INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Other_Fill_ME_Remark', 'THERMAL2.CUFOIL.T025_AlCu.OTHER_FILL_ME_REMARK', 'material', 'bom_item');

--Other_Fill_ME_Remark
INSERT INTO wiprocurement.drop_down_item (item_name, path, field_name, layout_name)
VALUES('Other_Fill_ME_Remark', 'THERMAL2.CUFOIL.OTHER_FILL_ME_REMARK', 'material_spec', 'bom_item');

-- MEOTHERS.BONDDETACHADHESIVE
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id) values(
        (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.BONDDETACHADHESIVE'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.BONDDETACHADHESIVE'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_l'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.BONDDETACHADHESIVE'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_w'));

--MEOTHERS.LENS
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id) values(
        (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.LENS'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.LENS'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_l'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.LENS'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_w'));

-- --MEOTHERS.MESH
-- insert into wiprocurement.col_dependence(col_val, col_id, required_col_id) values(
--         (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.MESH'), 
-- 	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
-- 	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness'));

-- insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
-- values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.MESH'), 
-- 	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
-- 	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_l'));

-- insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
-- values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.MESH'), 
-- 	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
-- 	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_w'));

--HOUSING.GLASS 
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id) values(
        (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.GLASS'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.GLASS'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_l'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.GLASS'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_w'));

--HOUSING.DIE_C
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.DIE_C'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_l'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.DIE_C'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_w'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.DIE_C'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_h'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.DIE_C'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.DIE_C'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_weight'));

-- HOUSING.CNC_PROCESS
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.CNC_PROCESS'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_l'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.CNC_PROCESS'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_w'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.CNC_PROCESS'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_h'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.CNC_PROCESS'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_weight'));

-- Housing Double_Injection add thickness
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.DOUBL'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness'));

-- HOUSING.IMR add thickness
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.IMR'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness'));

-- Housing C_GPU_BKT
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.C_GPU_BKT'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_l'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.C_GPU_BKT'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_w'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.C_GPU_BKT'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_h'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.C_GPU_BKT'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_l2'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.C_GPU_BKT'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_w2'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.C_GPU_BKT'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness'));

-- HOUSING.HDD_SSD_BKT
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.HDD_SSD_BKT'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_l'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.HDD_SSD_BKT'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_w'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.HDD_SSD_BKT'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_h'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.HDD_SSD_BKT'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_l2'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.HDD_SSD_BKT'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_w2'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.HDD_SSD_BKT'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness'));

-- EMC2.MAGNE
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.MAGNE'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_l'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.MAGNE'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_w'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.MAGNE'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_h'));


-- THERMAL2.COOLER
-- insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
-- values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.COOLER'), 
-- 	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
-- 	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_l'));

-- insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
-- values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.COOLER'), 
-- 	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
-- 	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_w'));

-- insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
-- values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.COOLER'), 
-- 	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
-- 	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_h'));

--create table
-- Table: wiprocurement.bom_partlist_format
-- DROP TABLE wiprocurement.bom_partlist_format;
CREATE TABLE wiprocurement.bom_partlist_format
(
    id uuid NOT NULL DEFAULT uuid_generate_v1(),
    format_key character varying(20) COLLATE pg_catalog."default" NOT NULL,
    format_value character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT bom_partlist_format_pkey PRIMARY KEY (id, format_key),
    CONSTRAINT bom_partlist_format_uq UNIQUE (id)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_partlist_format
    OWNER to "swpc-user";

-- insert init data
INSERT INTO wiprocurement.bom_partlist_format(format_key, format_value) VALUES ('cable-wire', 'cable-wire');
INSERT INTO wiprocurement.bom_partlist_format(format_key, format_value) VALUES ('cable-ffc', 'cable-ffc');
INSERT INTO wiprocurement.bom_partlist_format(format_key, format_value) VALUES ('cable-fpc', 'cable-fpc');
INSERT INTO wiprocurement.bom_partlist_format(format_key, format_value) VALUES ('housing-metal', 'housing-metal');
INSERT INTO wiprocurement.bom_partlist_format(format_key, format_value) VALUES ('housing-plastic', 'housing-plastic');
INSERT INTO wiprocurement.bom_partlist_format(format_key, format_value) VALUES ('thermal-module', 'thermal-module');
INSERT INTO wiprocurement.bom_partlist_format(format_key, format_value) VALUES ('thermal-pad', 'thermal-pad');
INSERT INTO wiprocurement.bom_partlist_format(format_key, format_value) VALUES ('thermal-heatsink', 'thermal-heatsink');
INSERT INTO wiprocurement.bom_partlist_format(format_key, format_value) VALUES ('die-cut', 'die-cut');
INSERT INTO wiprocurement.bom_partlist_format(format_key, format_value) VALUES ('meothers-standoff', 'meothers-standoff');
INSERT INTO wiprocurement.bom_partlist_format(format_key, format_value) VALUES ('meothers-rubber', 'meothers-rubber');

-- bom_partlist_config
-- SEQUENCE: wiprocurement.bom_partlist_config_id_seq
-- DROP SEQUENCE wiprocurement.bom_partlist_config_id_seq;
CREATE SEQUENCE wiprocurement.bom_partlist_config_id_seq;
ALTER SEQUENCE wiprocurement.bom_partlist_config_id_seq
    OWNER TO "swpc-user";

-- Table: wiprocurement.bom_partlist_config
-- DROP TABLE wiprocurement.bom_partlist_config;
CREATE TABLE wiprocurement.bom_partlist_config
(
    id integer NOT NULL DEFAULT nextval('wiprocurement.bom_partlist_config_id_seq'::regclass),
    parts_ctgy_1 uuid NOT NULL,
    parts_ctgy_2 uuid NOT NULL,
    format uuid,
    CONSTRAINT bom_partlist_config_pkey PRIMARY KEY (parts_ctgy_1, parts_ctgy_2),
    CONSTRAINT bom_partlist_config_uq UNIQUE (id)
,
    CONSTRAINT bom_partlist_config_fkey FOREIGN KEY (format)
        REFERENCES wiprocurement.bom_partlist_format (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_partlist_config
    OWNER to "swpc-user";

--housing-plastic
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.PLAST' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='housing-plastic'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.PLAST_NB' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='housing-plastic'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.DOUBL' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='housing-plastic'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.IMR' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='housing-plastic'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.RHCM_' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='housing-plastic'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.PAINTING' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='housing-plastic'));

--housing-metal
--housing
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.METAL' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='housing-metal'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.ALUMI' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='housing-metal'));
--EMC
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='EMC2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.SHIEL' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='housing-metal'));

--thermal-module
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='THERMAL2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.MODUL' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='thermal-module'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='THERMAL2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.FAN' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='thermal-module'));
--thermal-pad
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='THERMAL2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.PAD' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='thermal-pad'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='THERMAL2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.GRAPHITESHEET' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='thermal-pad'));
--thermal-heatsink
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='THERMAL2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.HEATS' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='thermal-heatsink'));
--die-cut
--thermal
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='THERMAL2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.CUFOIL' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='die-cut'));
--meothers
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.MYLAR' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='die-cut'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.SPONG' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='die-cut'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.ADHES' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='die-cut'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.PROTE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='die-cut'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='die-cut'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='die-cut'));

INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.LENS' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='die-cut'));
--emc
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='EMC2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.ABSOR' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='die-cut'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='EMC2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.GASKE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='die-cut'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='EMC2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.AL_CU' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='die-cut'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='EMC2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.CONDU' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='die-cut'));

--meothers-standoff
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.STAND' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='meothers-standoff'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.SCREW' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='meothers-standoff'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.NUT' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='meothers-standoff'));

--meothers-rubber
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.RUBBER' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='meothers-rubber'));

--cable-wire
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.WIRE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='cable-wire'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.DC-IN' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='cable-wire'));
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.PANEL' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='cable-wire'));

--cable-ffc
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.FFC' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='cable-ffc'));

--cable-fpc
INSERT INTO wiprocurement.bom_partlist_config(parts_ctgy_1, parts_ctgy_2, format) 
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.FPC' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_partlist_format where format_key='cable-fpc'));

-- bom_itme_validate_exception_type
-- Table: wiprocurement.bom_itme_validate_exception_type
-- DROP TABLE wiprocurement.bom_itme_validate_exception_type;

CREATE TABLE wiprocurement.bom_itme_validate_exception_type
(
    id uuid NOT NULL DEFAULT uuid_generate_v1(),
    exception_type_key character varying(40) COLLATE pg_catalog."default" NOT NULL,
    exception_type_value character varying(40) COLLATE pg_catalog."default",
    CONSTRAINT bom_itme_validate_exception_type_pkey PRIMARY KEY (id, exception_type_key),
    CONSTRAINT bom_itme_validate_exception_type_uq UNIQUE (id)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_itme_validate_exception_type
    OWNER to "swpc-user";

-- bom_itme_validate_exception_type
INSERT INTO wiprocurement.bom_itme_validate_exception_type(exception_type_key, exception_type_value) VALUES ('no_need_material_spec', 'no_need_material_spec');
INSERT INTO wiprocurement.bom_itme_validate_exception_type(exception_type_key, exception_type_value) VALUES ('no_need_dependency_val', 'no_need_dependency_val');

-- bom_itme_validate_exception_config
CREATE SEQUENCE wiprocurement.bom_itme_validate_exception_config_id_seq;
ALTER SEQUENCE wiprocurement.bom_itme_validate_exception_config_id_seq
    OWNER TO "swpc-user";

-- Table: wiprocurement.bom_itme_validate_exception_config
-- DROP TABLE wiprocurement.bom_itme_validate_exception_config;

CREATE TABLE wiprocurement.bom_itme_validate_exception_config
(
    id integer NOT NULL DEFAULT nextval('wiprocurement.bom_itme_validate_exception_config_id_seq'::regclass),
    parts_ctgy_1 uuid NOT NULL,
    parts_ctgy_2 uuid NOT NULL,
    material_spec uuid,
    type uuid NOT NULL,
    CONSTRAINT bom_itme_validate_exception_config_uq UNIQUE (id)
,
    CONSTRAINT bom_itme_validate_exception_config_fkey FOREIGN KEY (type)
        REFERENCES wiprocurement.bom_itme_validate_exception_type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_itme_validate_exception_config
    OWNER to "swpc-user";

-- bom_itme_validate_exception_config
-- cable
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.FFC' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.FPC' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.WIRE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.DC-IN' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.POWERCORD' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.PANEL' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.DONGLE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.EXTERNALCABLE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.RFCABLE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.FIPER' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.FIO' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.SATA' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.FLATCABLE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.OTHER' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.LANCABLE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='CABLE2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='CABLE2.HANDSETCORD' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

--Housing
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.DIE_C' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.INSER' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.NIL_PROCESS' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.FORGING' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.AL_EXTRUSION' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.OTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.STAND' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.SMALL_PARTS' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.GLASS' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.CHEMICAL' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.MODULE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.KEYPAD' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.SLIDE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.METAL_AND_PLASTIC' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.NCT' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.MIM' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

-- Packing
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.BAG' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.CARTON' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.CARTON-UNFOLDED' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.BOX' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.BOX-UNFOLDED' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.LABEL' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.MANUAL' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.EPE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.EPS' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.PALLET' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.OTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.OTHERS-PAPER' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.OTHERS-PLASTIC' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.OTHERS-NON-WOVEN' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='PACKING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='PACKING.OTHERS-CLEANCLOTHES' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

-- Electro_Mechanical
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='ELECTRO-MECHANICAL' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='ELECTRO-MECHANICAL.MIC' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='ELECTRO-MECHANICAL' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='ELECTRO-MECHANICAL.SPEAKER' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='ELECTRO-MECHANICAL' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='ELECTRO-MECHANICAL.VIBRATOR' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='ELECTRO-MECHANICAL' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='ELECTRO-MECHANICAL.BUZZER' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='ELECTRO-MECHANICAL' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='ELECTRO-MECHANICAL.HEADSET' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='ELECTRO-MECHANICAL' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='ELECTRO-MECHANICAL.SOUNDBAR' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

--Thermal
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='THERMAL2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.FAN' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='THERMAL2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.MODUL' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='THERMAL2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.PAD' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='THERMAL2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.GRAPHITESHEET' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='THERMAL2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.COOLER' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='THERMAL2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.HEATS' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

--RACK
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='RACK' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='RACK.RACK' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

--Medical
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEDICAL' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEDICAL.LENS' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEDICAL' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEDICAL.MOUNT' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEDICAL' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEDICAL.RADIOTUBE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEDICAL' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEDICAL.TUBING' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

-- Meothers
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.BONDDETACHADHESIVE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.WATERPROOF_FILM' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.MESH' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.METAL_DOME' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));


INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.GLUE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));


INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.SPRING' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.BUSBAR' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.HANDSET' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.NAMEPLATE' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.MISCELLANEOUS' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

--EMC
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='EMC2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.EMISPRING' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_material_spec'));

--no_need_dependency_val
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, material_spec,type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='HOUSING' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.PLAST_NB' and layout_name='bom_item'),
		(select id from wiprocurement.drop_down_item where field_name='material_spec' and path='HOUSING.PLAST_NB.OTHER_FILL_ME_REMARK' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));

-- Meother
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, material_spec,type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.MYLAR' and layout_name='bom_item'),
		(select id from wiprocurement.drop_down_item where field_name='material_spec' and path='MEOTHERS.MYLAR.OTHER_FILL_ME_REMARK' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, material_spec,type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.SPONG' and layout_name='bom_item'),
		(select id from wiprocurement.drop_down_item where field_name='material_spec' and path='MEOTHERS.MYLAR.OTHER_FILL_ME_REMARK' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, material_spec,type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.ADHES' and layout_name='bom_item'),
		(select id from wiprocurement.drop_down_item where field_name='material_spec' and path='MEOTHERS.ADHES.OTHER_FILL_ME_REMARK' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, material_spec,type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.PROTE' and layout_name='bom_item'),
		(select id from wiprocurement.drop_down_item where field_name='material_spec' and path='MEOTHERS.PROTE.OTHER_FILL_ME_REMARK' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, material_spec,type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON' and layout_name='bom_item'),
		(select id from wiprocurement.drop_down_item where field_name='material_spec' and path='MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.OTHER_FILL_ME_REMARK' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, material_spec,type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON' and layout_name='bom_item'),
		(select id from wiprocurement.drop_down_item where field_name='material_spec' and path='MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.OTHER_FILL_ME_REMARK' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));

-- new request
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, material_spec,type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.LENS' and layout_name='bom_item'),
		(select id from wiprocurement.drop_down_item where field_name='material_spec' and path='MEOTHERS.LENS.OTHER_FILL_ME_REMARK' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, material_spec,type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='MEOTHERS' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.MESH' and layout_name='bom_item'),
		(select id from wiprocurement.drop_down_item where field_name='material_spec' and path='MEOTHERS.MESH.OTHER_FILL_ME_REMARK' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));

--EMC
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, material_spec,type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='EMC2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.ABSOR' and layout_name='bom_item'),
		(select id from wiprocurement.drop_down_item where field_name='material_spec' and path='EMC2.ABSOR.OTHER_FILL_ME_REMARK' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, material_spec,type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='EMC2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.GASKE' and layout_name='bom_item'),
		(select id from wiprocurement.drop_down_item where field_name='material_spec' and path='EMC2.GASKE.Other_Fill_ME_Remark' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));

INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, material_spec,type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='EMC2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.AL_CU' and layout_name='bom_item'),
		(select id from wiprocurement.drop_down_item where field_name='material_spec' and path='EMC2.AL_CU.OTHER_FILL_ME_REMARK' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));

-- new request
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, material_spec,type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='EMC2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.CONDU' and layout_name='bom_item'),
		(select id from wiprocurement.drop_down_item where field_name='material_spec' and path='EMC2.CONDU.OTHER_FILL_ME_REMARK' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));

-- new request
--Thermal
INSERT INTO wiprocurement.bom_itme_validate_exception_config(parts_ctgy_1, parts_ctgy_2, material_spec,type)
VALUES ((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_1' and path='EMC2' and layout_name='bom_item'), 
		(select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.CUFOIL' and layout_name='bom_item'),
		(select id from wiprocurement.drop_down_item where field_name='material_spec' and path='THERMAL2.CUFOIL.OTHER_FILL_ME_REMARK' and layout_name='bom_item'), 
		(select id from wiprocurement.bom_itme_validate_exception_type where exception_type_key='no_need_dependency_val'));

-- bom_itme_part_ctgy_mapping_config
CREATE SEQUENCE wiprocurement.bom_itme_part_ctgy_mapping_config_id_seq;
ALTER SEQUENCE wiprocurement.bom_itme_part_ctgy_mapping_config_id_seq
    OWNER TO "swpc-user";

-- Table: wiprocurement.bom_itme_validate_exception_config
-- DROP TABLE wiprocurement.bom_itme_validate_exception_config;

CREATE TABLE wiprocurement.bom_itme_part_ctgy_mapping_config
(
    id integer NOT NULL DEFAULT nextval('wiprocurement.bom_itme_part_ctgy_mapping_config_id_seq'::regclass),
    source_mapping_name character varying(100) NOT NULL,
    part_ctgy uuid NOT NULL,
    source character varying(10) NOT NULL,
    CONSTRAINT bom_itme_part_ctgy_mapping_config_uq UNIQUE (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.bom_itme_part_ctgy_mapping_config
    OWNER to "swpc-user";

-- insert init data
INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('ME-Others', (select id from wiprocurement.drop_down_item where path = 'MEOTHERS' and field_name='parts_ctgy_1'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('Electro-Mechanical', (select id from wiprocurement.drop_down_item where path = 'ELECTRO-MECHANICAL' and field_name='parts_ctgy_1'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('Wire/Harness', (select id from wiprocurement.drop_down_item where path = 'CABLE2.WIRE' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('Shielding can', (select id from wiprocurement.drop_down_item where path = 'EMC2.SHIEL' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('AL Foil', (select id from wiprocurement.drop_down_item where path = 'EMC2.AL_CU' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('CNC Process', (select id from wiprocurement.drop_down_item where path = 'HOUSING.CNC_PROCESS' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('Small Parts', (select id from wiprocurement.drop_down_item where path = 'HOUSING.SMALL_PARTS' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('Metal dome', (select id from wiprocurement.drop_down_item where path = 'MEOTHERS.METAL_DOME' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('Metal+Plastic', (select id from wiprocurement.drop_down_item where path = 'HOUSING.METAL_AND_PLASTIC' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('Double Injection', (select id from wiprocurement.drop_down_item where path = 'HOUSING.DOUBL' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('Insert-Molding', (select id from wiprocurement.drop_down_item where path = 'HOUSING.INSER' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('Name Plate', (select id from wiprocurement.drop_down_item where path = 'MEOTHERS.NAMEPLATE' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('RHCM Process', (select id from wiprocurement.drop_down_item where path = 'HOUSING.RHCM_' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('EMI Spring', (select id from wiprocurement.drop_down_item where path = 'EMC2.EMISPRING' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('Conductive Tape', (select id from wiprocurement.drop_down_item where path = 'EMC2.CONDU' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('Die Casting', (select id from wiprocurement.drop_down_item where path = 'HOUSING.DIE_C' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('C/GPU BKT', (select id from wiprocurement.drop_down_item where path = 'HOUSING.C_GPU_BKT' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('HDD/SSD BKT', (select id from wiprocurement.drop_down_item where path = 'HOUSING.HDD_SSD_BKT' and field_name='parts_ctgy_2'), 'CBG');

INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
	VALUES ('Waterproof film', (select id from wiprocurement.drop_down_item where path = 'MEOTHERS.WATERPROOF_FILM' and field_name='parts_ctgy_2'), 'CBG');

-- INSERT INTO wiprocurement.bom_itme_part_ctgy_mapping_config(source_mapping_name, part_ctgy, source)
-- 	VALUES ('Mylar/Sponge/Poron', (select id from wiprocurement.drop_down_item where path = 'MEOTHERS.WATERPROOF_FILM' and field_name='parts_ctgy_2'), 'CBG');


--update drop down item name
--Cable
update wiprocurement.drop_down_item set item_name='Wire_Harness' where path='CABLE2.WIRE' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='DC_in_cable' where path='CABLE2.DC-IN' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='Power_Cord' where path='CABLE2.POWERCORD' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='External_Cable' where path='CABLE2.EXTERNALCABLE' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='Panel_Cable' where path='CABLE2.PANEL' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='RF_Cable' where path='CABLE2.RFCABLE' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='Flat_Cable' where path='CABLE2.FLATCABLE' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='Others' where path='CABLE2.OTHER' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='SAS_Mini_SAS' where path='CABLE2.SAS_MINISAS' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='Lan_cable' where path='CABLE2.LANCABLE' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='Handset_cord' where path='CABLE2.HANDSETCORD' and field_name='parts_ctgy_2';

--Housing
update wiprocurement.drop_down_item set item_name='Hinge' where path='HOUSING.HINGE' and field_name='parts_ctgy_2';


--Packing
update wiprocurement.drop_down_item set item_name='Carton_Unfolded' where path='PACKING.CARTON-UNFOLDED' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='BOX_Unfolded' where path='PACKING.BOX-UNFOLDED' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='Others_Paper' where path='PACKING.OTHERS-PAPER' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='Others_Plastic' where path='PACKING.OTHERS-PLASTIC' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='Others_Non_woven' where path='PACKING.OTHERS-NON-WOVEN'and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='Others_Clean_Clothes' where path='PACKING.OTHERS-CLEANCLOTHES' and field_name='parts_ctgy_2';

--Thermal
update wiprocurement.drop_down_item set item_name='Graphite_Sheet' where path='THERMAL2.GRAPHITESHEET'and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='Cu_Foil' where path='THERMAL2.CUFOIL' and field_name='parts_ctgy_2';

--MeOther
update  wiprocurement.drop_down_item set item_name='ME_others' where path='MEOTHERS'and field_name='parts_ctgy_1';
update wiprocurement.drop_down_item set item_name='Bond_&_Detach_Adhesive' where path='MEOTHERS.BONDDETACHADHESIVE'and field_name='parts_ctgy_2';

--EMC
update wiprocurement.drop_down_item set item_name='Shielding_Can' where path='EMC2.SHIEL'and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='Conductive_Tape' where path='EMC2.CONDU' and field_name='parts_ctgy_2';