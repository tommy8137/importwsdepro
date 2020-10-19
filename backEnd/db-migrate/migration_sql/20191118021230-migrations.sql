GRANT SELECT on all tables in schema formula to emdm;
ALTER DEFAULT PRIVILEGES IN SCHEMA formula GRANT SELECT ON TABLES TO emdm;

drop view if exists formula.v_metal_material_drill_power_button_cutting;
drop view if exists formula.v_metal_material_drill_tp_cutting;
drop view if exists formula.v_metal_material_drill_fingerprint_hole_cutting;
drop view if exists formula.v_metal_material_drill_power_hole_cutting;
drop view if exists formula.v_metal_material_drill_allside_cutting;
drop view if exists formula.v_tooling_plastic_tax;
drop view if exists formula.v_metal_anode;
drop view if exists formula.v_metal_sand_process;
drop view if exists formula.v_metal_glue_cycle_time;
drop view if exists formula.v_double_injection_material_spec;
drop view if exists formula.v_double_injection_material;
drop view if exists formula.v_metal_andoe_color;
drop view if exists formula.v_metal_painting;
drop view if exists formula.v_metal_glue;
drop view if exists formula.v_metal_glue_syringe_diameter;
drop view if exists formula.v_plastic_cnc_process_area;
drop view if exists formula.v_plastic_cnc_feeder_type;
drop view if exists formula.v_plastic_machine;
drop view if exists formula.v_plastic_painting_type;
drop view if exists formula.v_plastic_painting_color;
drop view if exists formula.v_plastic_painting_vendor;
drop view if exists formula.v_plastic_painting_thickness;
drop view if exists formula.v_plastic_painting_machine;
drop view if exists formula.v_plastic_embed_nail;
drop view if exists formula.v_plastic_printing;
drop view if exists formula.v_plastic_printing_count;
drop view if exists formula.v_plastic_grinding;
drop view if exists formula.v_plastic_emi_sputtering_size;
drop view if exists formula.v_plastic_emi_sputtering_base;
drop view if exists formula.v_ffc_connector_function_name;
drop view if exists formula.v_ffc_connector_type_and_vendor_pn;
drop view if exists formula.v_ffc_accessories;

drop table if exists formula.me_spec;

CREATE TABLE IF NOT EXISTS formula.me_spec (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	spec_category varchar(200) not null,
    spec_name varchar(200) not null,
    spec_value varchar(200) null,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz null,
	CONSTRAINT me_spec_pk PRIMARY KEY (id),
	CONSTRAINT me_spec_un UNIQUE (spec_category,spec_name)
);

--Material Spec for double_injection  -> getHousingPlasticDoubleInjection
CREATE OR REPLACE VIEW formula.v_double_injection_material_spec as
select ms.id, ms.material_spec_name as name, ms.disable_time from formula.material_spec ms where ms.material_spec_name in ('PC', 'TPEE', 'TPU');

--Material for double_injection -> getHousingPlasticDoubleInjection
CREATE OR REPLACE VIEW formula.v_double_injection_material as
select m.id as material_id, m.material_spec_id, ms.material_spec_name, m.material_name as material_name, m.disable_time from formula.material m, formula.material_spec ms where 
m.material_spec_id = ms.id and
m.material_spec_id in (select ms.id from formula.material_spec ms where ms.material_spec_name in ('PC', 'TPEE', 'TPU'));

-- 保稅/非保稅
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_tooling_tax', '保稅', '');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_tooling_tax', '非保稅', '');

CREATE OR REPLACE VIEW formula.v_tooling_plastic_tax as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'plastic_tooling_tax';

--陽極顏色 -> getFirstAnodeColor, getSecondAnodeColor 
CREATE OR REPLACE VIEW formula.v_metal_andoe_color as
select mac.id, mac."name", mac.disable_time from formula.metal_anode_color mac;
--陽極製程 -> YAML
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('metal_anode_process', '二陽', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('metal_anode_process', '預陽', '0.5');

CREATE OR REPLACE VIEW formula.v_metal_anode as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'metal_anode_process';

--噴砂面數 -> YAML
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('metal_sand_process', '單面', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('metal_sand_process', '雙面', '2');

CREATE OR REPLACE VIEW formula.v_metal_sand_process as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'metal_sand_process';

--噴漆顏色 -> getMetalPaint
CREATE OR REPLACE VIEW formula.v_metal_painting as
select mp.id, mp.painting_name as name, mp.disable_time from formula.metal_painting mp;

--熱壓膠水型號 -> getGlue
CREATE OR REPLACE VIEW formula.v_metal_glue as
select mg.id, mg.glue_name as name, mg.disable_time from formula.metal_glue mg;
--針筒內徑 -> getGlueSyringeDiameter
CREATE OR REPLACE VIEW formula.v_metal_glue_syringe_diameter as
select ms.id, ms.syringe_name as name, ms.disable_time from formula.metal_syringe ms;
--鑽切 電源鈕 -> getMetalDrill
CREATE OR REPLACE VIEW formula.v_metal_material_drill_power_button_cutting as
select mmdf.id, concat(mmdt."name", mmdft."name") as name, mmdf.disable_time from formula.metal_material_drill_type mmdt, formula.metal_material_drill_feature mmdf
left join formula.metal_material_drill_feature_type mmdft on mmdft.id = mmdf.material_drill_feature_id
where mmdf.material_drill_id = mmdt.id
and mmdt.drill_type = 'power_button_cutting';

--鑽切 TP -> getMetalDrill
CREATE OR REPLACE VIEW formula.v_metal_material_drill_tp_cutting as
select mmdf.id, concat(mmdt."name", mmdft."name") as name, mmdf.disable_time from formula.metal_material_drill_type mmdt, formula.metal_material_drill_feature mmdf
left join formula.metal_material_drill_feature_type mmdft on mmdft.id = mmdf.material_drill_feature_id
where mmdf.material_drill_id = mmdt.id
and mmdt.drill_type = 'tp_cutting';

--鑽切 電源孔 -> getMetalDrill
CREATE OR REPLACE VIEW formula.v_metal_material_drill_power_hole_cutting as
select mmdf.id, concat(mmdt."name", mmdft."name") as name, mmdf.disable_time from formula.metal_material_drill_type mmdt, formula.metal_material_drill_feature mmdf
left join formula.metal_material_drill_feature_type mmdft on mmdft.id = mmdf.material_drill_feature_id
where mmdf.material_drill_id = mmdt.id
and mmdt.drill_type = 'power_hole_cutting';

--鑽切 指紋孔 -> getMetalDrill
CREATE OR REPLACE VIEW formula.v_metal_material_drill_fingerprint_hole_cutting as
select mmdf.id, concat(mmdt."name", mmdft."name") as name, mmdf.disable_time from formula.metal_material_drill_type mmdt, formula.metal_material_drill_feature mmdf
left join formula.metal_material_drill_feature_type mmdft on mmdft.id = mmdf.material_drill_feature_id
where mmdf.material_drill_id = mmdt.id
and mmdt.drill_type = 'fingerprint_hole_cutting';

--鑽切 四周 -> getMetalDrill
CREATE OR REPLACE VIEW formula.v_metal_material_drill_allside_cutting as
select mmdf.id, concat(mmdt."name", mmdft."name") as name, mmdf.disable_time from formula.metal_material_drill_type mmdt, formula.metal_material_drill_feature mmdf
left join formula.metal_material_drill_feature_type mmdft on mmdft.id = mmdf.material_drill_feature_id
where mmdf.material_drill_id = mmdt.id
and mmdt.drill_type = 'allside_cutting';

--cycle time
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('metal_glue_cycle_time', '90sec', '90');

CREATE OR REPLACE VIEW formula.v_metal_glue_cycle_time as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'metal_glue_cycle_time';


--plastic 噴漆類型type =>
CREATE OR REPLACE VIEW formula.v_plastic_painting_type as
select ppt.id, ppt.type_name as name, ppt.disable_time from formula.plastic_paint_type ppt;

--plastic color色系
CREATE OR REPLACE VIEW formula.v_plastic_painting_color as
select ppc.id as id, ppc.color_name as name, ppc.disable_time, pptc.paint_type_id from formula.plastic_paint_color ppc, formula.plastic_paint_type_color pptc where pptc.paint_color_id = ppc.id;

--plastic paint vendor
CREATE OR REPLACE VIEW formula.v_plastic_painting_vendor as
select ppv.id, ppv.vendor_name as name, ppv.disable_time from formula.plastic_paint_vendor ppv;

--plastic paint thickness
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_paint_thickness', '0', '0');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_paint_thickness', '0.015', '0.015');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_paint_thickness', '0.02', '0.02');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_paint_thickness', '0.025', '0.025');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_paint_thickness', '0.03', '0.03');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_paint_thickness', '0.035', '0.035');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_paint_thickness', '0.04', '0.04');

CREATE OR REPLACE VIEW formula.v_plastic_painting_thickness as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'plastic_paint_thickness';

--plastic paint machine
CREATE OR REPLACE VIEW formula.v_plastic_painting_machine as
select ppm.id, ppm.machine_name as name, ppm.disable_time from formula.plastic_paint_machine ppm;

--plastic 埋钉製程(人工/自動)
create or replace view formula.v_plastic_embed_nail as
select pen.id, pen.embed_nail_name as name, pen.disable_time from formula.plastic_embed_nail pen;
 
--plastic printing製程(類型) =>
create or replace view formula.v_plastic_printing as
select pp.id, pp.printing_name as name, pp.disable_time from formula.plastic_printing pp;

--plastic printing製程(數量) =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_printing_count', '0', '0');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_printing_count', '1', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_printing_count', '2', '2');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_printing_count', '3', '3');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_printing_count', '4', '4');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_printing_count', '5', '5');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_printing_count', '6', '6');

CREATE OR REPLACE VIEW formula.v_plastic_printing_count as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'plastic_printing_count';

--plastic 成品製程(局部加工) =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_cnc_process_area', 'N/A', '0');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_cnc_process_area', 'CNC Area', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_cnc_process_area', '人工', '2');

CREATE OR REPLACE VIEW formula.v_plastic_cnc_process_area as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'plastic_cnc_process_area';

--plastic 除料頭 =>
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_cnc_feeder_type', 'N/A', '0');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_cnc_feeder_type', 'CNC', '1');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('plastic_cnc_feeder_type', '人工', '2');

CREATE OR REPLACE VIEW formula.v_plastic_cnc_feeder_type as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'plastic_cnc_feeder_type';

--plastic 成品打磨(PL線) 產品類別 =>
CREATE OR REPLACE VIEW formula.v_plastic_grinding as
select pg.id, pg.grinding_name as name, pg.disable_time from formula.plastic_grinding pg;

--plastic EMI sputtering (吋別) =>
CREATE OR REPLACE VIEW formula.v_plastic_emi_sputtering_size as
select pess.id, pess.emi_size as name, pess.disable_time from formula.plastic_emi_sputtering_size pess;
--plastic EMI sputtering (本體材質) =>
CREATE OR REPLACE VIEW formula.v_plastic_emi_sputtering_base as
select pesb.id, pesb.emi_base as name, pesb.disable_time from formula.plastic_emi_sputtering_base pesb;

--plastic 機台噸數
CREATE OR REPLACE VIEW formula.v_plastic_machine as
select mm.id, mm.ton as name, mm.disable_time from formula.machine mm;


--ffc connector function anme
CREATE OR REPLACE VIEW formula.v_ffc_connector_function_name as
select cct.id, cct.type_name as name, cct.disable_time from formula.cableffc_connector_type cct;

--ffc connector type and vendor pn
CREATE OR REPLACE VIEW formula.v_ffc_connector_type_and_vendor_pn as
select ccv.id, ccv.connector_type_id, ccv.vendor_name as connector_type, ccv.vendor_pn as vendor_pn, ccv.disable_time from formula.cableffc_connector_vendor ccv;

--ffc 輔料
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('ffc_accessories', 'Al Foil', '');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('ffc_accessories', '補強板', '');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('ffc_accessories', 'Label 料號標籤', '');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('ffc_accessories', 'Label 白底黑字', '');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('ffc_accessories', '導電布', '');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('ffc_accessories', '醋酸布', '');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('ffc_accessories', 'KAPTON', '');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('ffc_accessories', '雙面膠', '');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('ffc_accessories', '導電雙面膠', '');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('ffc_accessories', 'Mylar(CY28_PET) T=0.05', '');
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('ffc_accessories', 'Mylar(PET_6027D) T=0.1', '');

CREATE OR REPLACE VIEW formula.v_ffc_accessories as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'ffc_accessories';
