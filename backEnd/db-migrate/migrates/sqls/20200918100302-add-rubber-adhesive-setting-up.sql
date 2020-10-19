-- temp_rubber_adhesive_setting
create table if not exists formula.temp_rubber_adhesive_setting(
 diecut_material_spec_name varchar,
 enable_select boolean default true
);
insert into formula.temp_rubber_adhesive_setting (diecut_material_spec_name) values
('T0.05Adhesive'),
('T0.07Adhesive'),
('T0.08Adhesive'),
('T0.1Adhesive'),
('T0.13Adhesive'),
('T0.15Adhesive'),
('T0.2Adhesive'),
('T0.25Adhesive'),
('T0.3Adhesive'),
('T0.4Adhesive'),
('T0.5Adhesive'),
('T0.64Adhesive'),
('T0.7Adhesive'),
('T0.8Adhesive');

create table if not exists formula.rubber_adhesive_setting_of_diecut_material(
	diecut_material_id uuid NOT null,
	enable_select boolean not null default true,
	create_time timestamptz default now(),
	disable_time timestamptz,
	PRIMARY KEY(diecut_material_id),
	constraint fk_rubber_adhesive_setting_diecut_material_id foreign key (diecut_material_id) references formula.diecut_material(id)
);
insert into formula.rubber_adhesive_setting_of_diecut_material select id from formula.diecut_material 
where diecut_material_spec_id in 
(select id from formula.diecut_material_spec where material_spec_name in 
(select diecut_material_spec_name from formula.temp_rubber_adhesive_setting)) and material_name != 'Other_Fill_ME_Remark';
drop table if exists formula.temp_rubber_adhesive_setting;

drop view if exists formula.v_rubber_adhesive_setting_of_diecut_material;
CREATE VIEW formula.v_rubber_adhesive_setting_of_diecut_material AS
  SELECT dms.id as thickness_id, 
  dms.material_spec_name as thickness_name, 
  rubber_adhesive_setting.diecut_material_id as material_id, 
  dm.material_name
  FROM formula.rubber_adhesive_setting_of_diecut_material rubber_adhesive_setting
  left join formula.diecut_material dm on dm.id = rubber_adhesive_setting.diecut_material_id
  left join formula.diecut_material_spec dms on dms.id = dm.diecut_material_spec_id 
  where rubber_adhesive_setting.disable_time is null and rubber_adhesive_setting.enable_select = true;
  
ALTER TABLE formula.v_rubber_adhesive_setting_of_diecut_material OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_rubber_adhesive_setting_of_diecut_material TO "swpc-user";