DELETE FROM formula.me_spec ms where spec_category in ('diecut_debrisCleaning', 'fpc_product_number', 'fpc_bend_times', 'fpc_print', 'fpc_stop_Line', 'fpc_accessory_material', 'fpc_shielding_qty', 'cablewire_accessory_material');

drop view if exists formula.v_diecut_debrisCleaning;
drop view if exists formula.v_diecut_release_paper;
drop view if exists formula.v_diecut_type;
drop view if exists formula.v_diecut_material_info;
drop view if exists formula.v_fpc_product_number;
drop view if exists formula.v_fpc_bend_times;
drop view if exists formula.v_fpc_print;
drop view if exists formula.v_fpc_bend_times;
drop view if exists formula.v_fpc_material;
drop view if exists formula.v_fpc_accessory_material;
drop view if exists formula.v_fpc_shielding_type;
drop view if exists formula.v_fpc_shielding_qty;
drop view if exists formula.v_cablewire_cable_type;
drop view if exists formula.v_cablewire_cable_type_gauge;
drop view if exists formula.v_cablewire_connector_item;
drop view if exists formula.v_cablewire_connector_item_type;
drop view if exists formula.v_cablewire_accessory_material;

--diecut 除屑清理/排廢料 =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('diecut_debrisCleaning', 'Y', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('diecut_debrisCleaning', 'N', '0');

CREATE OR REPLACE VIEW formula.v_diecut_debrisCleaning as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'diecut_debrisCleaning';

--2. 離型紙/膜種類 =>
CREATE OR REPLACE VIEW formula.v_diecut_release_paper as
select drp.id, drp.paper_name as name, drp.disable_time from formula.diecut_release_paper drp;
--3. 主要材料 類型 => 
--7. 次主要材料 類型 => 
--12. 輔料 類型 =>
CREATE OR REPLACE VIEW formula.v_diecut_type as
select dt.id, dt.type_name as name, dt.disable_time from formula.diecut_type dt;
--4. 次主要材料 Part Category II from db =>
--5. 次主要材料 Material Spec=>
--6. 次主要材料 Material => 
--8. 輔料 Part Category II from db =>
--9. 輔料 Material Spec =>
--10. 輔料 Material=>
CREATE OR REPLACE VIEW formula.v_diecut_material_info as
select pc.id as part_category_2_id, pc.category_name, dms.id as material_spec_id, dms.material_spec_name,dm.id as material_id, dm.material_name, dm.disable_time from formula.diecut_material_spec dms, formula.diecut_material dm, formula.part_category_2 pc
where dms.id = dm.diecut_material_spec_id and pc.id = dms.part_category_2_id;

--## Cable-FPC
--1. 單位併版之成品產出數 =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_product_number', '1', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_product_number', '2', '2');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_product_number', '3', '3');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_product_number', '4', '4');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_product_number', '5', '5');

CREATE OR REPLACE VIEW formula.v_fpc_product_number as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'fpc_product_number';

--2. 折彎(次) =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_bend_times', '0', '0');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_bend_times', '1', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_bend_times', '2', '2');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_bend_times', '3', '3');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_bend_times', '4', '4');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_bend_times', '5', '5');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_bend_times', '6', '6');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_bend_times', '7', '7');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_bend_times', '8', '8');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_bend_times', '9', '9');

CREATE OR REPLACE VIEW formula.v_fpc_bend_times as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'fpc_bend_times';

--3. 印刷(面) =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_print', '1', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_print', '2', '2');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_print', '3', '3');

CREATE OR REPLACE VIEW formula.v_fpc_print as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'fpc_print';
--4. 停⽌線(條) =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_stop_Line', '0', '0');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_stop_Line', '1', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_stop_Line', '2', '2');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_stop_Line', '3', '3');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_stop_Line', '4', '4');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_stop_Line', '5', '5');

CREATE OR REPLACE VIEW formula.v_fpc_bend_times as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'fpc_stop_Line';

--5. 主材料Type =>
CREATE OR REPLACE VIEW formula.v_fpc_material as
select cm.id, cm.material_name as name, cm.disable_time from formula.cablefpc_material cm;
--6. 輔料 =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_accessory_material', 'Shielding', '0');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_accessory_material', '補強板', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_accessory_material', '背膠', '2');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_accessory_material', 'Label', '3');

CREATE OR REPLACE VIEW formula.v_fpc_accessory_material as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'fpc_accessory_material';

--7. 輔料 Shielding type =>
CREATE OR REPLACE VIEW formula.v_fpc_shielding_type as
select cs.id, cs.shielding_name as name, cs.disable_time from formula.cablefpc_shielding cs;
--8. 輔料 Shielding qty =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_shielding_qty', '0', '0');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_shielding_qty', '1', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('fpc_shielding_qty', '2', '2');

CREATE OR REPLACE VIEW formula.v_fpc_shielding_qty as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'fpc_shielding_qty';


-- v_part_category_col_definition
drop view if exists formula.v_part_category_col_definition;
CREATE OR REPLACE VIEW formula.v_part_category_col_definition AS 
(SELECT DISTINCT pc.id AS part_category_2_id,
    b.item_name AS part_category_2,
    c.col_name AS display_name,
    c.col_key AS json_key
   FROM wiprocurement.col_dependence a
     JOIN wiprocurement.drop_down_item b ON a.col_val::text = b.id::character varying::text
     JOIN wiprocurement.col_definite c ON a.required_col_id = c.id
     LEFT JOIN formula.part_category_2 pc ON pc.category_name::text = b.item_name::text
  ORDER BY b.item_name)
UNION ALL
(select pc.id AS part_category_2_id, pc.category_name as part_category_2, 'material_spec' as display_name, '' as json_key from formula.part_category_2 pc where pc.id not in (
select bivec.parts_ctgy_2 from wiprocurement.bom_itme_validate_exception_config bivec
left join wiprocurement.bom_itme_validate_exception_type bivet on bivec.type = bivet.id
where bivet.exception_type_key = 'no_need_material_spec'));



--## Cable-Wire
--1. 線材 => v_cablewire_cable_type
CREATE OR REPLACE VIEW formula.v_cablewire_cable_type AS 
select cct.id, cct.cable_type as name, cct.disable_time from formula.cablewire_cable_type cct;
--2. 線材 鐵氟龍線 Guage =>
--3. 線材 同軸線 Guage =>
CREATE OR REPLACE VIEW formula.v_cablewire_cable_type_gauge as
select cctg.id, cct.cable_type, cctg.cable_id, ccg.gauge, cctg.gauge_id, cctg.disable_time from formula.cablewire_cable_type_gauge cctg, formula.cablewire_cable_gauge ccg, formula.cablewire_cable_type cct
where cctg.gauge_id = ccg.id and cct.id = cctg.cable_id;
--4. Connector Function Name =>
CREATE OR REPLACE VIEW formula.v_cablewire_connector_item as
select cci.id, cci.connector_item as name, cci.disable_time from formula.cablewire_connector_item cci;
--5. Connector Connector Type =>
--6. Connector Vendor PN =>
CREATE OR REPLACE VIEW formula.v_cablewire_connector_item_type as
select cct.id, cct.connector_item_id, cci.connector_item, cct.connector_type, cct.vendor_pn, cct.disable_time from formula.cablewire_connector_type cct, formula.cablewire_connector_item cci
where cci.id = cct.connector_item_id;

--7. 輔料 =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('cablewire_accessory_material', '地片', '0');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('cablewire_accessory_material', 'KAPTON', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('cablewire_accessory_material', '醋酸布拉帶', '2');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('cablewire_accessory_material', 'Teflon膠带', '3');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('cablewire_accessory_material', '導電布', '4');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('cablewire_accessory_material', '絞線', '5');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('cablewire_accessory_material', 'UV GLUE', '6');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('cablewire_accessory_material', 'Label', '7');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('cablewire_accessory_material', '熱縮套管', '8');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('cablewire_accessory_material', '畫線', '9');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('cablewire_accessory_material', '導電雙面膠', '10');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('cablewire_accessory_material', 'Mylar(CY28_PET) T=0.05', '11');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('cablewire_accessory_material', 'Mylar(PET_6027D) T=0.1', '12');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('cablewire_accessory_material', '雙面膠', '13');

CREATE OR REPLACE VIEW formula.v_cablewire_accessory_material as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'cablewire_accessory_material';


DELETE FROM formula.me_spec ms where spec_category in ('thermal_fan_type', 'thermal_fan_apperance_process1', 'thermal_fan_apperance_process2', 'thermal_pipe_apperance_process1', 'thermal_pipe_apperance_process2', 'thermal_fin_apperance_process1', 'thermal_fin_apperance_process2', 'thermal_plate_apperance_process1', 'thermal_plate_apperance_process2');
drop view if exists formula.v_thermal_fan_type;
drop view if exists formula.v_thermal_fan_size;
drop view if exists formula.v_thermal_fan_motor;
drop view if exists formula.v_thermal_fan_bearing;
drop view if exists formula.v_thermal_fan_material;
drop view if exists formula.v_thermal_fan_magnet;
drop view if exists formula.v_thermal_fan_apperance_process1;
drop view if exists formula.v_thermal_fan_apperance_process2;
drop view if exists formula.v_thermal_pipe;
drop view if exists formula.v_thermal_pipe_diameter;
drop view if exists formula.v_thermal_pipe_apperance_process1;
drop view if exists formula.v_thermal_pipe_apperance_process2;
drop view if exists formula.v_thermal_fin_apperance_process1;
drop view if exists formula.v_thermal_fin_apperance_process2;
drop view if exists formula.v_thermal_plate_apperance_process1;
drop view if exists formula.v_thermal_plate_apperance_process2;
drop view if exists formula.v_thermal_grease;
drop view if exists formula.v_thermal_pad;
--
--## Thermal-Module 
--### CMF
--1. Fan 風扇型式 =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('thermal_fan_type', 'Axial(軸流扇)', '0');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('thermal_fan_type', 'Blower(離心扇)', '1');

CREATE OR REPLACE VIEW formula.v_thermal_fan_type as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'thermal_fan_type' order by spec_value asc;

--2. Fan size =>
CREATE OR REPLACE VIEW formula.v_thermal_fan_size as
select tf.id, tf.fan_size as name, tf.disable_time from formula.thermal_fan tf;
--3. Fan 馬達架構 =>
CREATE OR REPLACE VIEW formula.v_thermal_fan_motor as
select tfm.id, tfm.motor_name as name, tfm.disable_time from formula.thermal_fan_motor tfm;
--4. Fan軸承和套筒 =>
CREATE OR REPLACE VIEW formula.v_thermal_fan_bearing as
select tfb.id, tfb.bearing_name as name, tfb.disable_time from formula.thermal_fan_bearing tfb;
--5. Fan 扇葉材料 =>
CREATE OR REPLACE VIEW formula.v_thermal_fan_material as
select tfm.id, tfm.material_name as name, tfm.disable_time from formula.thermal_fan_material tfm;
--6. Fan 磁石材料及尺寸 =>
CREATE OR REPLACE VIEW formula.v_thermal_fan_magnet as
select tfm.id, tfm.magnet_name as name, tfm.disable_time from formula.thermal_fan_magnet tfm;
--7. Fan 外觀表面處理#1 =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('thermal_fan_apperance_process1', '塗黑', '1');

CREATE OR REPLACE VIEW formula.v_thermal_fan_apperance_process1 as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'thermal_fan_apperance_process1' order by spec_value asc;
--8. Fan 外觀表面處理#2 =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('thermal_fan_apperance_process2', '塗黑', '1');

CREATE OR REPLACE VIEW formula.v_thermal_fan_apperance_process2 as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'thermal_fan_apperance_process2' order by spec_value asc;
--9. pipe Pipe型式 =>
CREATE OR REPLACE VIEW formula.v_thermal_pipe as
select tp.id, tp.pipe_name as name, tp.disable_time from formula.thermal_pipe tp;


--10. pipe 外徑 =>
CREATE OR REPLACE VIEW formula.v_thermal_pipe_diameter as
select tpd.id, substring(tp.pipe_name, 1, 1)||tpd.diameter_name||'_' as name, tpd.disable_time from formula.thermal_pipe_diameter tpd, formula.thermal_pipe tp
where tpd.pipe_id = tp.id;
--11.  pipe 外觀表面處理#1 =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('thermal_pipe_apperance_process1', '塗黑', '1');

CREATE OR REPLACE VIEW formula.v_thermal_pipe_apperance_process1 as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'thermal_pipe_apperance_process1' order by spec_value asc;

--12.  pipe 外觀表面處理#2 =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('thermal_pipe_apperance_process2', '塗黑', '1');

CREATE OR REPLACE VIEW formula.v_thermal_pipe_apperance_process2 as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'thermal_pipe_apperance_process2' order by spec_value asc;

--13.  fin 材料 => as metal

--14.  fin 材料厚度 => as metal
--15.  fin 外觀表面處理#1 =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('thermal_fin_apperance_process1', '塗黑', '1');

CREATE OR REPLACE VIEW formula.v_thermal_fin_apperance_process1 as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'thermal_fin_apperance_process1' order by spec_value asc;

--16.  fin 外觀表面處理#2 =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('thermal_fin_apperance_process2', '塗黑', '1');

CREATE OR REPLACE VIEW formula.v_thermal_fin_apperance_process2 as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'thermal_fin_apperance_process2' order by spec_value asc;
--17.  Thermal Plate and Clip Spring 材料 => as metal
--18.  Thermal Plate and Clip Spring 材料厚度 => as metal
--19.  Thermal Plate and Clip Spring 外觀表面處理#1 =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('thermal_plate_apperance_process1', '塗黑', '1');

CREATE OR REPLACE VIEW formula.v_thermal_plate_apperance_process1 as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'thermal_plate_apperance_process1' order by spec_value asc;

--20.  Thermal Plate and Clip Spring 外觀表面處理#2 =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('thermal_plate_apperance_process2', '塗黑', '1');

CREATE OR REPLACE VIEW formula.v_thermal_plate_apperance_process2 as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'thermal_plate_apperance_process2' order by spec_value asc;

--21.  Thermal Block 材料 => as metal
--22.  Thermal Block 材料厚度 => as metal
--23.  Clip for DT 材料 => as metal
--24.  Sponge 材料 => as diecut material Sponge_of_Mylar_Sponge_Poron
--25.  Sponge 厚度 =>
--26.  Mylar 材料 =>  as diecut material Mylar_of_Mylar_Sponge_Poron
--27.  Mylar 厚度 =>
--28.  Mylar 背膠材料 => as diecut material Adhesive_of_Mylar_Sponge_Poron
--29.  Mylar 背膠厚度(t) =>
--30.  Grease  材質 => 
CREATE OR REPLACE VIEW formula.v_thermal_grease as
select tg.id, tg.grease_name as name, tg.disable_time from formula.thermal_grease tg;
--31.  Thermal Pad 熱傳係數(K值) =>
--32.  Thermal Pad 硬度 =>
--33.  Thermal 厚度 =>
alter table formula.thermal_pad add column if not exists disable_time timestamptz null;
CREATE OR REPLACE VIEW formula.v_thermal_pad as
select tp.id, tp.heat_transfer, tp.hardness, tp.thickness, tp.disable_time from formula.thermal_pad tp;
