GRANT SELECT on all tables in schema formula to emdm;
ALTER DEFAULT PRIVILEGES IN SCHEMA formula GRANT SELECT ON TABLES TO emdm;

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
select ppc.id as color_id, ppc.color_name as name, ppc.disable_time, pptc.paint_type_id from formula.plastic_paint_color ppc, formula.plastic_paint_type_color pptc where pptc.paint_color_id = ppc.id;

--plastic paint vendor
CREATE OR REPLACE VIEW formula.v_plastic_painting_vendor as
select ppv.id, ppv.vendor_name as name, ppv.disable_time from formula.plastic_paint_vendor ppv;


