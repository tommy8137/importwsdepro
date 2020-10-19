
DROP SCHEMA if exists formula CASCADE;

CREATE SCHEMA formula AUTHORIZATION "swpc-user";
drop table if exists formula.plastic_embed_nail;
drop table if exists formula.plastic_printing;
drop table if exists formula.operation;
drop table if exists formula.odm_oem;
drop table if exists formula.gb_assy_ctgy;
drop table if exists formula.func_ctgy;
drop table if exists formula.supply_type;
drop table if exists formula.plastic_grinding;
DROP TABLE if exists formula.metal_syringe;
DROP TABLE if exists formula.part_category_formula_type;
DROP TABLE if exists formula.plastic_emi_sputtering_link;
DROP TABLE if exists formula.plastic_emi_sputtering_base;
DROP TABLE if exists formula.plastic_emi_sputtering_size;
DROP TABLE if exists formula.plastic_emi_sputtering_site_group;
DROP TABLE if exists formula.plastic_emi_sputtering_group;
DROP TABLE if exists formula.plastic_paint_vendor_type_color;
DROP TABLE if exists formula.plastic_paint_vendor_type_color_bottom_top;
DROP TABLE if exists formula.plastic_paint_type_color_bottom_top;
DROP TABLE if exists formula.plastic_paint_bottom_top;
DROP TABLE if exists formula.plastic_paint_type_color;
DROP TABLE if exists formula.plastic_paint_color;
DROP TABLE if exists formula.plastic_paint_vendor;
DROP TABLE if exists formula.plastic_paint_type;
DROP TABLE if exists formula.plastic_paint_machine;
DROP TABLE if exists formula.plastic_material_loss_rate_product_type;
DROP TABLE if exists formula.plastic_material_loss_rate;
drop table if exists formula.plastic_paint_man_power;
DROP TABLE if exists formula.plastic_paint_info;
DROP TABLE if exists formula.plastic_paint_process;
DROP TABLE if exists formula.part_category_material;
DROP TABLE if exists formula.material;
DROP TABLE if exists formula.material_spec;
DROP TABLE if exists formula.metal_painting;
DROP TABLE if exists formula.metal_glue;
DROP TABLE if exists formula.module_machine_metal;
drop table if exists formula.machine_metal;
DROP TABLE if exists formula.module_metal;
DROP TABLE if exists formula.metal_anode_color;
DROP TABLE if exists formula.part_category_material_metal;
DROP TABLE if exists formula.material_thinkness;
DROP TABLE if exists formula.material_metal;
DROP TABLE if exists formula.product_type_category_module;
DROP TABLE if exists formula.part_category_2;
DROP TABLE if exists formula.part_category_1;
DROP TABLE if exists formula.module_machine;
DROP TABLE if exists formula.machine;
DROP TABLE if exists formula."module";
DROP TABLE IF EXISTS formula.product_type;
DROP TABLE IF EXISTS formula.parameter_value;
DROP TABLE IF EXISTS formula.common_parameter;
DROP TABLE IF EXISTS formula.schedule_date;
DROP TABLE IF EXISTS formula.formula_type;
DROP TABLE IF EXISTS formula.site;

CREATE TABLE IF NOT EXISTS formula.site (
	id serial NOT NULL,
	site_name varchar(200) NOT NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	CONSTRAINT site_pk PRIMARY KEY (id),
	CONSTRAINT site_un UNIQUE (site_name)
);

CREATE TABLE IF NOT EXISTS formula.formula_type (
	id serial NOT NULL,
	"name" varchar(200) NOT NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	CONSTRAINT formula_test_type_pk PRIMARY KEY (id),
	CONSTRAINT formula_test_type_un UNIQUE (name)
);

CREATE TABLE if not exists formula.schedule_date (
	id serial NOT NULL,
	"name" varchar(200) NULL,
	formula_type_id int4 NOT NULL,
	activate_date date NOT NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT schedule_date_pk PRIMARY KEY (id),
	CONSTRAINT schedule_date_un UNIQUE (formula_type_id, activate_date),
	CONSTRAINT schedule_date_fk FOREIGN KEY (formula_type_id) REFERENCES formula.formula_type(id)
);

CREATE TABLE if not exists formula.common_parameter (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	formula_type_id int4 NOT NULL,
	part_type varchar(200) NULL,
	sub_type varchar(200) NULL,
	"label" varchar(200) NULL,
	unit varchar(200) NULL,
	label_name varchar(200) NULL,
	remark varchar(400) NULL,
	system_remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT common_parameter_pk PRIMARY KEY (id),
	CONSTRAINT common_parameter_un UNIQUE (formula_type_id, part_type, label),
	CONSTRAINT common_parameter_fk FOREIGN KEY (formula_type_id) REFERENCES formula.formula_type(id)
);

CREATE TABLE if not exists formula.parameter_value (
	id serial NOT NULL,
	parameter_id uuid NOT NULL,
	activate_date_id int4 NOT NULL,
	value varchar(200) NOT NULL,
	value_type varchar(100) NOT NULL,
	source_table varchar(100) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT parameter_value_pk PRIMARY KEY (parameter_id, activate_date_id),
	CONSTRAINT parameter_value_fk FOREIGN KEY (activate_date_id) REFERENCES formula.schedule_date(id)
);

CREATE TABLE IF NOT EXISTS formula.product_type (
	id serial NOT NULL,
	type_name varchar(200) NOT NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz NULL,
	CONSTRAINT product_type_pk PRIMARY KEY (id),
	CONSTRAINT product_type_un UNIQUE (type_name)
);

CREATE TABLE IF NOT EXISTS formula."module" (
	id uuid NOT null default uuid_generate_v1(),
	module_name varchar(200) NOT NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz NULL,
	CONSTRAINT module_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS formula.machine (
	id uuid NOT null default uuid_generate_v1(),
	ton varchar(100) NOT NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT null default now(),
	disable_time timestamptz NULL,
	CONSTRAINT machine_pk PRIMARY KEY (id)
);

CREATE TABLE if not exists formula.module_machine (
	id uuid NOT null default uuid_generate_v1(),
	module_id uuid NOT NULL,
	machine_id uuid NOT NULL,
	disable_time timestamptz NULL,
	create_time timestamptz NOT NULL,
	CONSTRAINT module_machine_pk PRIMARY KEY (id),
	CONSTRAINT module_machine_un UNIQUE (module_id, machine_id),
	CONSTRAINT module_machine_fk_machine FOREIGN KEY (machine_id) REFERENCES formula.machine(id),
	CONSTRAINT module_machine_fk_module FOREIGN KEY (module_id) REFERENCES formula.module(id)
);


CREATE TABLE IF NOT EXISTS formula.part_category_1 (
	id uuid NOT null default uuid_generate_v1(),
	category_name varchar(200) NOT NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT part_category_1_pk PRIMARY KEY (id),
	CONSTRAINT part_category_1_un UNIQUE (category_name)
);

CREATE TABLE IF NOT EXISTS formula.part_category_2 (
	id uuid NOT null default uuid_generate_v1(),
	part_category_1_id uuid not null,
	category_name varchar(200) NOT NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT part_category_2_pk PRIMARY KEY (id),
	CONSTRAINT part_category_2_un UNIQUE (part_category_1_id, category_name),
	CONSTRAINT part_category_2_fk FOREIGN KEY (part_category_1_id) REFERENCES formula.part_category_1(id)
);

CREATE TABLE IF NOT EXISTS formula.product_type_category_module (
	module_id uuid NOT NULL,
	product_type_id int4 NOT NULL,
	part_category_2_id uuid NOT NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT product_type_category_module_pk PRIMARY KEY (module_id, product_type_id, part_category_2_id),
	CONSTRAINT product_type_category_module_fk FOREIGN KEY (module_id) REFERENCES formula.module(id),
	CONSTRAINT product_type_category_module_fk_1 FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id),
	CONSTRAINT product_type_category_module_fk_2 FOREIGN KEY (part_category_2_id) REFERENCES formula.part_category_2(id)
);

CREATE TABLE if not exists formula.material_metal (
	id uuid NOT null default uuid_generate_v1(),
	"name" varchar(200) NOT NULL,
	density numeric NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT material_metal_pk PRIMARY KEY (id),
	CONSTRAINT material_metal_un UNIQUE (name)
);

CREATE TABLE if not exists formula.material_thinkness (
	id uuid NOT null default uuid_generate_v1(),
	material_metal_id uuid NOT NULL,
	thickness numeric NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT material_thinkness_pk PRIMARY KEY (id),
	CONSTRAINT material_thinkness_un UNIQUE (material_metal_id, thickness),
	CONSTRAINT material_thinkness_fk FOREIGN KEY (material_metal_id) REFERENCES formula.material_metal(id)
);

CREATE TABLE if not exists formula.part_category_material_metal (
	pategory_category_2_id uuid NOT NULL,
	material_metal_id uuid NOT NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT part_category_material_metal_pk PRIMARY KEY (pategory_category_2_id, material_metal_id),
	CONSTRAINT part_category_material_metal_fk FOREIGN KEY (pategory_category_2_id) REFERENCES formula.part_category_2(id),
	CONSTRAINT part_category_material_metal_fk_1 FOREIGN KEY (material_metal_id) REFERENCES formula.material_metal(id)
);

CREATE TABLE if not exists formula.metal_anode_color (
	id uuid NOT null DEFAULT uuid_generate_v1(),
	"name" varchar(200) NOT NULL,
	anode_time uuid NULL,
	ratio uuid NULL,
	usd_mm2 uuid NULL,
	loss_rate uuid NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_anode_color_pk PRIMARY KEY (id),
	CONSTRAINT metal_anode_color_un UNIQUE (name)
);


CREATE TABLE if not exists formula.module_metal (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	module_name varchar(200) NOT NULL,
	product_type_id int4 NOT NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT module_metal_pk PRIMARY KEY (id),
	CONSTRAINT module_metal_un UNIQUE (module_name, product_type_id),
	CONSTRAINT module_metal_fk FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id)
);

CREATE TABLE if not exists formula.machine_metal (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	ton varchar(200) NOT NULL,
	bloster varchar(200) NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT machine_metal_pk PRIMARY KEY (id),
	CONSTRAINT machine_metal_un UNIQUE (ton)
);


CREATE TABLE if not exists formula.module_machine_metal (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	module_metal_id uuid NOT NULL,
	machine_metal_id uuid NOT NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT module_machine_metal_pk PRIMARY KEY (id),
	CONSTRAINT module_machine_metal_un UNIQUE (module_metal_id, machine_metal_id),
	CONSTRAINT module_machine_metal_fk FOREIGN KEY (machine_metal_id) REFERENCES formula.machine_metal(id),
	CONSTRAINT module_machine_metal_fk_1 FOREIGN KEY (module_metal_id) REFERENCES formula.module_metal(id)
);

CREATE TABLE if not exists formula.metal_glue (
	id uuid NOT null DEFAULT uuid_generate_v1(),
	glue_name varchar(200) NOT NULL,
	usd_g uuid NULL,
	density uuid NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_glue_pk PRIMARY KEY (id),
	CONSTRAINT metal_glue_un UNIQUE (glue_name)
);

CREATE TABLE if not exists formula.metal_painting (
	id uuid NOT null DEFAULT uuid_generate_v1(),
	painting_name varchar(200) NOT NULL,
	usd_kg uuid NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_painting_pk PRIMARY KEY (id),
	CONSTRAINT metal_painting_un UNIQUE (painting_name)
);

CREATE TABLE if not exists formula.material_spec (
	id uuid NOT null DEFAULT uuid_generate_v1(),
	material_spec_name varchar(200) NOT NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT material_spec_pk PRIMARY KEY (id),
	CONSTRAINT material_spec_un UNIQUE (material_spec_name)
);

CREATE TABLE if not exists formula.material (
	id uuid NOT null DEFAULT uuid_generate_v1(),
	material_name varchar(200) NOT NULL,
	material_spec_id uuid not null,
	remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT material_pk PRIMARY KEY (id),
	CONSTRAINT material_un UNIQUE (material_name, material_spec_id),
	CONSTRAINT material_fk FOREIGN KEY (material_spec_id) REFERENCES formula.material_spec(id)
);


CREATE TABLE if not exists formula.part_category_material (
	part_category_2_id uuid NOT NULL,
	material_id uuid not null,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT part_category_material_pk PRIMARY KEY (part_category_2_id,material_id),
	CONSTRAINT part_category_material_fk FOREIGN KEY (material_id) REFERENCES formula.material(id),
	CONSTRAINT part_category_material_fk1 FOREIGN KEY (part_category_2_id) REFERENCES formula.part_category_2(id)
);

CREATE TABLE if not exists formula.plastic_paint_process (
    id uuid not null DEFAULT uuid_generate_v1(),
    process_name varchar(200) not null,
    remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_paint_process_pk PRIMARY KEY (id),
	CONSTRAINT plastic_paint_process_un UNIQUE (process_name)
);

CREATE TABLE if not exists formula.plastic_paint_info (
    id uuid not null DEFAULT uuid_generate_v1(),
    product_type_id int4 not null,
    usd_min uuid not null DEFAULT uuid_generate_v1(),
    man_hour uuid not null DEFAULT uuid_generate_v1(),
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_paint_info_pk PRIMARY KEY (id),
	CONSTRAINT plastic_paint_info_un UNIQUE (product_type_id),
	CONSTRAINT plastic_paint_info_fk FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id)
);

CREATE TABLE if not exists formula.plastic_paint_man_power (
    id uuid not null DEFAULT uuid_generate_v1(),
    product_type_id int4 not null,
    category_name varchar(200) not null,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_paint_man_power_pk PRIMARY KEY (id),
	CONSTRAINT plastic_paint_man_power_un UNIQUE (product_type_id,category_name),
	CONSTRAINT plastic_paint_type_product_type_fk FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id)
);

CREATE TABLE if not exists formula.plastic_material_loss_rate (
    id uuid not null DEFAULT uuid_generate_v1(),
    loss_rate_name varchar(200) not null,
    remark varchar(400) null,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_material_loss_rate_pk PRIMARY KEY (id),
	CONSTRAINT plastic_material_loss_rate_un UNIQUE (loss_rate_name)
);

CREATE TABLE if not exists formula.plastic_material_loss_rate_product_type (
    id uuid not null DEFAULT uuid_generate_v1(),
    product_type_id int4 not null,
    plastic_material_loss_rate_id uuid not null,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_material_loss_rate_product_type_pk PRIMARY KEY (id),
	CONSTRAINT plastic_material_loss_rate_product_type_un UNIQUE (product_type_id,plastic_material_loss_rate_id),
	CONSTRAINT plastic_material_loss_rate_product_type_fk FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id),
	CONSTRAINT plastic_material_loss_rate_product_type_fk1 FOREIGN KEY (plastic_material_loss_rate_id) REFERENCES formula.plastic_material_loss_rate(id)
);

CREATE TABLE if not exists formula.plastic_paint_machine (
    id uuid not null DEFAULT uuid_generate_v1(),
    machine_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_paint_machine_pk PRIMARY KEY (id),
	CONSTRAINT plastic_paint_machine_un UNIQUE (machine_name)
);

CREATE TABLE if not exists formula.plastic_paint_bottom_top (
    id uuid not null DEFAULT uuid_generate_v1(),
    bottom_top_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_paint_bottom_top_pk PRIMARY KEY (id),
	CONSTRAINT plastic_paint_bottom_top_un UNIQUE (bottom_top_name)
);

CREATE TABLE if not exists formula.plastic_paint_color (
    id uuid not null DEFAULT uuid_generate_v1(),
    color_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_paint_color_pk PRIMARY KEY (id),
	CONSTRAINT plastic_paint_color_un UNIQUE (color_name)
);

CREATE TABLE if not exists formula.plastic_paint_type (
    id uuid not null DEFAULT uuid_generate_v1(),
    type_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_paint_type_pk PRIMARY KEY (id),
	CONSTRAINT plastic_paint_type_un UNIQUE (type_name)
);

CREATE TABLE if not exists formula.plastic_paint_vendor (
    id uuid not null DEFAULT uuid_generate_v1(),
    vendor_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_paint_vendor_pk PRIMARY KEY (id),
	CONSTRAINT plastic_paint_vendor_un UNIQUE (vendor_name)
);

CREATE TABLE if not exists formula.plastic_paint_type_color (
    id uuid not null DEFAULT uuid_generate_v1(),
    paint_color_id uuid not null,
    paint_type_id uuid not null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_paint_type_color_pk PRIMARY KEY (id),
	CONSTRAINT plastic_paint_type_color_un UNIQUE (paint_color_id,paint_type_id),
	CONSTRAINT plastic_paint_type_color_fk FOREIGN KEY (paint_color_id) REFERENCES formula.plastic_paint_color(id),
	CONSTRAINT plastic_paint_type_color_fk1 FOREIGN KEY (paint_type_id) REFERENCES formula.plastic_paint_type(id)
);

CREATE TABLE if not exists formula.plastic_paint_type_color_bottom_top (
    id uuid not null DEFAULT uuid_generate_v1(),
    paint_type_color_id uuid not null,
    paint_bottom_top_id uuid not null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_paint_type_color_bottom_top_pk PRIMARY KEY (id),
	CONSTRAINT plastic_paint_type_color_bottom_top_un UNIQUE (paint_type_color_id,paint_bottom_top_id),
	CONSTRAINT plastic_paint_type_color_bottom_top_fk FOREIGN KEY (paint_type_color_id) REFERENCES formula.plastic_paint_type_color(id),
	CONSTRAINT plastic_paint_type_color_bottom_top_fk1 FOREIGN KEY (paint_bottom_top_id) REFERENCES formula.plastic_paint_bottom_top(id)
);

CREATE TABLE if not exists formula.plastic_paint_vendor_type_color_bottom_top (
    id uuid not null DEFAULT uuid_generate_v1(),
    type_color_bottom_top_id uuid not null,
    paint_vendor_id uuid not null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_paint_vendor_type_color_bottom_top_pk PRIMARY KEY (id),
	CONSTRAINT plastic_paint_vendor_type_color_bottom_top_un UNIQUE (type_color_bottom_top_id,paint_vendor_id),
	CONSTRAINT plastic_paint_vendor_type_color_bottom_top_fk FOREIGN KEY (type_color_bottom_top_id) REFERENCES formula.plastic_paint_type_color_bottom_top(id),
	CONSTRAINT plastic_paint_vendor_type_color_bottom_top_fk1 FOREIGN KEY (paint_vendor_id) REFERENCES formula.plastic_paint_vendor(id)
);

CREATE TABLE if not exists formula.plastic_emi_sputtering_group (
	id uuid not null DEFAULT uuid_generate_v1(),
    group_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
    CONSTRAINT plastic_emi_group_pk PRIMARY KEY (id),
	CONSTRAINT plastic_emi_group_un UNIQUE (group_name)
);

CREATE TABLE if not exists formula.plastic_emi_sputtering_site_group (
    group_id uuid not null,
    site_id int4 not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	--CONSTRAINT plastic_emi_site_group_pk PRIMARY KEY (id),
	CONSTRAINT plastic_emi_site_group_un UNIQUE (site_id),
	CONSTRAINT plastic_emi_site_group_fk FOREIGN KEY (site_id) REFERENCES formula.site(id),
	CONSTRAINT plastic_emi_site_group_fk1 FOREIGN KEY (group_id) REFERENCES formula.plastic_emi_sputtering_group(id)
);

CREATE TABLE if not exists formula.plastic_emi_sputtering_size (
    id uuid not null DEFAULT uuid_generate_v1(),
    emi_size varchar(200) not null,
    "size" numeric not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_emi_sputtering_size_pk PRIMARY KEY (id),
	CONSTRAINT plastic_emi_sputtering_size_un UNIQUE (emi_size)
);

CREATE TABLE if not exists formula.plastic_emi_sputtering_base (
    id uuid not null DEFAULT uuid_generate_v1(),
    emi_base varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_emi_sputtering_base_pk PRIMARY KEY (id),
	CONSTRAINT plastic_emi_sputtering_base_un UNIQUE (emi_base)
);

CREATE TABLE if not exists formula.plastic_emi_sputtering_link (
    id uuid not null DEFAULT uuid_generate_v1(),
    group_id uuid not null,
    size_id uuid not null,
    base_id uuid not null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_emi_sputtering_link_pk PRIMARY KEY (id),
	CONSTRAINT plastic_emi_sputtering_link_un UNIQUE (group_id, size_id, base_id),
	CONSTRAINT plastic_emi_sputtering_link_fk FOREIGN KEY (group_id) REFERENCES formula.plastic_emi_sputtering_group(id),
	CONSTRAINT plastic_emi_sputtering_link_fk1 FOREIGN KEY (size_id) REFERENCES formula.plastic_emi_sputtering_size(id),
	CONSTRAINT plastic_emi_sputtering_link_fk2 FOREIGN KEY (base_id) REFERENCES formula.plastic_emi_sputtering_base(id)
);

CREATE TABLE if not exists formula.part_category_formula_type (
    part_category_2_id uuid not null,
    formula_type_id int4 not null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT part_category_formula_type_pk PRIMARY KEY (part_category_2_id, formula_type_id),
	CONSTRAINT part_category_formula_type_fk FOREIGN KEY (part_category_2_id) REFERENCES formula.part_category_2(id),
	CONSTRAINT part_category_formula_type_fk1 FOREIGN KEY (formula_type_id) REFERENCES formula.formula_type(id)
);

CREATE TABLE if not exists formula.metal_syringe (
    id uuid not null DEFAULT uuid_generate_v1(),
    syringe_name varchar(200) not null,
    syringe_diameter uuid not null DEFAULT uuid_generate_v1(),
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_syringe_pk PRIMARY KEY (id),
	CONSTRAINT metal_syringe_un UNIQUE (syringe_name)
);

CREATE TABLE if not exists formula.plastic_grinding (
    id uuid not null DEFAULT uuid_generate_v1(),
    grinding_name varchar(200) not null,
    total_cost uuid not null DEFAULT uuid_generate_v1(),
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_grinding_pk PRIMARY KEY (id),
	CONSTRAINT plastic_grinding_un UNIQUE (grinding_name)
);

CREATE TABLE if not exists formula.odm_oem (
    id uuid not null DEFAULT uuid_generate_v1(),
    odm_oem_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT odm_oem_pk PRIMARY KEY (id),
	CONSTRAINT odm_oem_un UNIQUE (odm_oem_name)
);

CREATE TABLE if not exists formula.gb_assy_ctgy (
    id uuid not null DEFAULT uuid_generate_v1(),
    gb_assy_ctgy_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT gb_assy_ctgy_pk PRIMARY KEY (id),
	CONSTRAINT gb_assy_ctgy_un UNIQUE (gb_assy_ctgy_name)
);

CREATE TABLE if not exists formula.func_ctgy (
    id uuid not null DEFAULT uuid_generate_v1(),
    func_ctgy_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT func_ctgy_pk PRIMARY KEY (id),
	CONSTRAINT func_ctgy_un UNIQUE (func_ctgy_name)
);

CREATE TABLE if not exists formula.supply_type (
    id uuid not null DEFAULT uuid_generate_v1(),
    supply_type_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT supply_type_pk PRIMARY KEY (id),
	CONSTRAINT supply_type_un UNIQUE (supply_type_name)
);

CREATE TABLE if not exists formula.operation (
    id uuid not null DEFAULT uuid_generate_v1(),
    operation_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT operation_pk PRIMARY KEY (id),
	CONSTRAINT operation_un UNIQUE (operation_name)
);

CREATE TABLE if not exists formula.plastic_embed_nail (
    id uuid not null DEFAULT uuid_generate_v1(),
    embed_nail_name varchar(200) not null,
    unit_price uuid not null DEFAULT uuid_generate_v1(),
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_embed_nail_pk PRIMARY KEY (id),
	CONSTRAINT plastic_embed_nail_un UNIQUE (embed_nail_name)
);

CREATE TABLE if not exists formula.plastic_printing (
    id uuid not null DEFAULT uuid_generate_v1(),
    printing_name varchar(200) not null,
    unit_price uuid not null DEFAULT uuid_generate_v1(),
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT plastic_printing_pk PRIMARY KEY (id),
	CONSTRAINT plastic_printing_un UNIQUE (printing_name)
);

INSERT INTO formula.formula_type("name", remark, create_time)VALUES('housing_plastic', null, now());

INSERT INTO formula.schedule_date("name", formula_type_id, activate_date, create_time)
VALUES('housing_plastic_init', (select id from formula.formula_type where name='housing_plastic'), '1970-01-01', now());

INSERT INTO formula.formula_type ("name", remark, create_time) VALUES('housing_metal', '', now());
INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, create_time) VALUES('housing_metal_init', (select id from formula.formula_type where  name = 'housing_metal'), '1970-01-01', now());

INSERT INTO formula.formula_type ("name", remark, create_time) VALUES('common', '', now());
INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, create_time) VALUES('common_init', (select id from formula.formula_type where  name = 'common'), '1970-01-01', now());

INSERT INTO formula.formula_type ("name", remark, create_time) VALUES('material', '', now());
INSERT INTO formula.schedule_date ("name", formula_type_id, activate_date, create_time) VALUES('material_init', (select id from formula.formula_type where  name = 'material'), '1970-01-01', now());

 INSERT INTO formula.part_category_1 (id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_1') AND (PATH = 'HOUSING')), 'Housing','now()');
 INSERT INTO formula.part_category_1 (id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_1') AND (PATH = 'EMC2')), 'EMC', 'now()');
 INSERT INTO formula.part_category_1 (id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_1') AND (PATH = 'CABLE2')), 'Cable', 'now()');
 INSERT INTO formula.part_category_1 (id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_1') AND (PATH = 'THERMAL2')), 'Thermal', 'now()');
 INSERT INTO formula.part_category_1 (id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_1') AND (PATH = 'PACKING')), 'Packing','now()');
 INSERT INTO formula.part_category_1 (id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_1') AND (PATH = 'RACK')), 'RACK', 'now()');
 INSERT INTO formula.part_category_1 (id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_1') AND (PATH = 'MEDICAL')), 'Medical','now()');
 INSERT INTO formula.part_category_1 (id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_1') AND (PATH = 'ELECTRO-MECHANICAL')),'Electro_Mechanical', 'now()');
 INSERT INTO formula.part_category_1 (id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_1') AND (PATH = 'MEOTHERS')), 'ME_others', 'now()');


  ---type2
 --Housing
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.METAL')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Metal', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.ALUMI')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Aluminum', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.PLAST')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Plastic', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.DIE_C')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Die_Casting', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.DOUBL')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Double_Injection', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.RHCM_')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'RHCM_Process', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.IMR')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'IMR', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.INSER')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Insert_Molding', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.C_GPU_BKT')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'C_GPU_BKT', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.HDD_SSD_BKT')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'HDD_SSD_BKT', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.NIL_PROCESS')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'NIL_process', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.CNC_PROCESS')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'CNC_Process', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.STAND')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Stand', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.SMALL_PARTS')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Small_Parts', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.GLASS')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Glass', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.CHEMICAL')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Chemical', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.KEYPAD')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Keypad', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.SLIDE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Slide', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.METAL_AND_PLASTIC')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Metal_and_Plastic', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.NCT')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'NCT', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.MIM')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'MIM', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.PLAST_NB')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Plastic_NB', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.PLAST_DT_AIO')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Plastic_DT_AIO', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.FORGING')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Forging', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.AL_EXTRUSION')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'AL_Extrusion', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.MODULE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Module', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.PAINTING')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Painting', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.OTHERS')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Others', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'HOUSING.HINGE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')), 'Hinge', 'now()');

 --EMC
  INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'EMC2.GASKE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='EMC')), 'Gasket', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'EMC2.AL_CU')), (SELECT id FROM formula.part_category_1 WHERE (category_name='EMC')), 'Al_Cu_Foil', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'EMC2.ABSOR')), (SELECT id FROM formula.part_category_1 WHERE (category_name='EMC')), 'Absorber', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'EMC2.MAGNE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='EMC')), 'Magnet', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'EMC2.EMISPRING')), (SELECT id FROM formula.part_category_1 WHERE (category_name='EMC')), 'EMI_Spring', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'EMC2.SHIEL')), (SELECT id FROM formula.part_category_1 WHERE (category_name='EMC')), 'Shielding_Can', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'EMC2.CONDU')), (SELECT id FROM formula.part_category_1 WHERE (category_name='EMC')), 'Conductive_Tape', 'now()');

 --cable
  INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.FPC')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'FPC', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.FFC')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'FFC', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.WIRE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'Wire_Harness', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.DONGLE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'Dongle', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.FIPER')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'Fiper', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.FIO')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'FIO', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.SATA')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'SATA', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.EXTERNALCABLE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'External_Cable', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.DC-IN')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'DC_in_cable', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.POWERCORD')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'Power_Cord', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.PANEL')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'Panel_Cable', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.RFCABLE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'RF_Cable', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.FLATCABLE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'Flat_Cable', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.OTHER')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'Others', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.SAS_MINISAS')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'SAS_Mini_SAS', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.LANCABLE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'Lan_cable', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'CABLE2.HANDSETCORD')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Cable')), 'Handset_cord', 'now()');

 --thermal
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'THERMAL2.FAN')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Thermal')), 'Fan', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'THERMAL2.MODUL')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Thermal')), 'Module', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'THERMAL2.HEATS')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Thermal')), 'Heatsink', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'THERMAL2.PAD')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Thermal')), 'Pad', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'THERMAL2.COOLER')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Thermal')), 'Cooler', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'THERMAL2.GRAPHITESHEET')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Thermal')), 'Graphite_Sheet', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'THERMAL2.CUFOIL')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Thermal')), 'Cu_Foil', 'now()');

 --PACKING
  INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.BAG')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'Bag', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.CARTON')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'Carton', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.BOX')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'BOX', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.LABEL')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'Label', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.MANUAL')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'Manual', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.EPE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'EPE', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.EPS')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'EPS', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.PALLET')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'Pallet', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.OTHERS')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'Others', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.CARTON-UNFOLDED')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'Carton_Unfolded', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.BOX-UNFOLDED')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'BOX_Unfolded', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.OTHERS-PAPER')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'Others_Paper', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.OTHERS-PLASTIC')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'Others_Plastic', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.OTHERS-NON-WOVEN')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'Others_Non_woven', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'PACKING.OTHERS-CLEANCLOTHES')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Packing')), 'Others_Clean_Clothes', 'now()');

 --Rack
  INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'RACK.RACK')), (SELECT id FROM formula.part_category_1 WHERE (category_name='RACK')), 'RACK', 'now()');

  --medical
   INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEDICAL.LENS')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Medical')), 'LENS', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEDICAL.MOUNT')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Medical')), 'Mount', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEDICAL.RADIOTUBE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Medical')), 'Radiotube', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEDICAL.TUBING')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Medical')), 'Tubing', 'now()');

 --electro
  INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'ELECTRO-MECHANICAL.MIC')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Electro_Mechanical')), 'Mic', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'ELECTRO-MECHANICAL.SPEAKER')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Electro_Mechanical')), 'Speaker', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'ELECTRO-MECHANICAL.VIBRATOR')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Electro_Mechanical')), 'Vibrator', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'ELECTRO-MECHANICAL.BUZZER')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Electro_Mechanical')), 'Buzzer', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'ELECTRO-MECHANICAL.HEADSET')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Electro_Mechanical')), 'Headset', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'ELECTRO-MECHANICAL.SOUNDBAR')), (SELECT id FROM formula.part_category_1 WHERE (category_name='Electro_Mechanical')), 'Soundbar', 'now()');

 --meothers
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.PROTE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Protection_Film_of_Mylar_Sponge_Poron', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.ADHES')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Adhesive_of_Mylar_Sponge_Poron', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.SPONG')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Sponge_of_Mylar_Sponge_Poron', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.STAND')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Standoff', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.NUT')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Nut', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.SCREW')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Screw', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.MYLAR')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Mylar_of_Mylar_Sponge_Poron', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.WATERPROOF_FILM')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Waterproof_film', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.RUBBER')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Rubber', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.MESH')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Mesh', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.METAL_DOME')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Metal_Dome', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.GLUE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Glue', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.SPRING')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Spring', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.LENS')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Lens', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.BUSBAR')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Busbar', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.HANDSET')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Handset', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Acetate_Tape_of_Mylar_Sponge_Poron', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Non_Woven_of_Mylar_Sponge_Poron', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.MISCELLANEOUS')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Miscellaneous', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.NAMEPLATE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Name_Plate', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.MYLAR_SPONGE_PORON')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Mylar/Sponge/Poron', 'now()');
 INSERT INTO formula.part_category_2 (id, part_category_1_id, category_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'parts_ctgy_2') AND (PATH = 'MEOTHERS.BONDDETACHADHESIVE')), (SELECT id FROM formula.part_category_1 WHERE (category_name='ME_others')), 'Bond_Detach_Adhesive', 'now()');

--machine_metal
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('0T', NULL, NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('25T', '680mm*300mm', NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('35T', '800mm*400mm', NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('45T', '850mm*440mm', NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('60T', '900mm*500mm', NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('80T', '1000mm*550mm', NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('110T', '1150mm*600mm', NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('160T', '1250mm*800mm', NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('200T', '1400mm*820mm', NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('250T', '1500mm*840mm', NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('300T', '3000mm*1200mm', NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('400T', '4000mm*1400mm', NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('600T', '4300mm*1500mm', NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('800T', '5200mm*1800mm', NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('1000T', NULL, NULL, '2019-10-03 17:00:00.611', NULL);
INSERT INTO formula.machine_metal (ton, bloster, remark, create_time, disable_time) VALUES('1200T', NULL, NULL, '2019-10-03 17:00:00.611', NULL);


-- init metal product_type
INSERT INTO formula.product_type (type_name, remark, create_time, disable_time) VALUES('NB', 'USD', now(), NULL);
INSERT INTO formula.product_type (type_name, remark, create_time, disable_time) VALUES('DT', 'USD', now(), NULL);
INSERT INTO formula.product_type (type_name, remark, create_time, disable_time) VALUES('OTHERS', 'USD', now(), NULL);

-- init module_metal
INSERT INTO formula.module_metal
(id, module_name, product_type_id, remark, create_time, disable_time)
VALUES(uuid_generate_v1(), 'Module 1', (select id from formula.product_type where type_name = 'NB'), '', now(), NULL);

INSERT INTO formula.module_metal
(id, module_name, product_type_id, remark, create_time, disable_time)
VALUES(uuid_generate_v1(), 'Module 2', (select id from formula.product_type where type_name = 'DT'), '', now(), NULL);

INSERT INTO formula.module_metal
(id, module_name, product_type_id, remark, create_time, disable_time)
VALUES(uuid_generate_v1(), 'Module 3', (select id from formula.product_type where type_name = 'OTHERS'), '', now(), NULL);

-- connect module and machine relation
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '0T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '0T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '0T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '25T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '25T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '25T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '35T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '35T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '35T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '45T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '45T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '45T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '60T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '60T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '60T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '80T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '80T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '80T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '110T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '110T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '110T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '160T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '160T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '160T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '200T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '200T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '200T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '250T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '250T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '250T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '300T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '300T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '300T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '400T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '400T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '400T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '600T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '600T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '600T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '800T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '800T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '800T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '1000T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '1000T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '1000T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 1'), (select id from formula.machine_metal where ton= '1200T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 2'), (select id from formula.machine_metal where ton= '1200T'), now(), NULL);
INSERT INTO formula.module_machine_metal
    (id, module_metal_id, machine_metal_id, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.module_metal where module_name = 'Module 3'), (select id from formula.machine_metal where ton= '1200T'), now(), NULL);






INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '0T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '0T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '0T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '25T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0081', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '25T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0120', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '25T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.07', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '35T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0081', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '35T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0120', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '35T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.07', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '45T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0081', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '45T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0120', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '45T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.07', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '60T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0124', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '60T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0120', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '60T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.07', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '80T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0124', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '80T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0160', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '80T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.10', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '110T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0124', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '110T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0160', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '110T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.10', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '160T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0124', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '160T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0240', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '160T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.15', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '200T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0159', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '200T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0240', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '200T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.15', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '250T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0159', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '250T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0240', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '250T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.15', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '300T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0180', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '300T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0400', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '300T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.25', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '400T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0180', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '400T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0400', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '400T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.25', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '600T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0180', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '600T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0500', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '600T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.31', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '800T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0180', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '800T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0500', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '800T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.31', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '1000T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), 'null', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '1000T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0210', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '1000T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.65', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 1' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '1200T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), 'null', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 2' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '1200T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.0260', 'number', 'module_machine_metal', now());

INSERT INTO formula.parameter_value
    (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES((select id from formula.module_machine_metal where module_metal_id = (select id from formula.module_metal where module_name = 'Module 3' ) and
    machine_metal_id = (select id from formula.machine_metal where ton = '1200T' )
    ), (SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_metal' )), '0.80', 'number', 'module_machine_metal', now());

INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'AL1050', 2.75, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'AL5052', 2.75, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'SUS301', 7.93, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'SUS304', 7.93, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'SUS403', 7.93, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'SUS430', 7.93, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'SECC', 7.85, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'SGCC', 7.85, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'SPCC', 7.85, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'SGLD', 7.85, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'SPTE', 7.85, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'Cu3604', 8.9, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), '低碳鋼1018', 7.85, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'SUS410', 7.93, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), '磷青銅', 8.9, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'PH-CU', 8.9, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'CU1100', 8.9, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'CU01', 8.9, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'C1840', 8.8, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'AL6061', 2.71, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'AL6063', 2.71, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'KU400', 7.85, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), '皮銅', 8.8, '', now(), null);
INSERT INTO formula.material_metal (id, "name", density, remark, create_time, disable_time) VALUES(uuid_generate_v1(), 'TMS02', null, '', now(), null);









INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL1050'), 0.15, '', now(), null);

    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL1050') and thickness = 0.15) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '3.60', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL1050'), 0.2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL1050') and thickness = 0.20) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '2.90', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL1050'), 0.3, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL1050') and thickness = 0.30) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.50', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL1050'), 0.4, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL1050') and thickness = 0.40) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.50', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL1050'), 0.5, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL1050') and thickness = 0.50) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.30', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL1050'), 0.6, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL1050') and thickness = 0.60) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.30', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL1050'), 0.8, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL1050') and thickness = 0.80) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.10', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL1050'), 1, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL1050') and thickness = 1.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.10', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL1050'), 1.2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL1050') and thickness = 1.20) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.00', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL1050'), 1.5, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL1050') and thickness = 1.50) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.00', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL1050'), 1.6, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL1050') and thickness = 1.60) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.00', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL1050'), 2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL1050') and thickness = 2.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.00', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL1050'), 3, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL1050') and thickness = 3.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.00', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL5052'), 0.3, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL5052') and thickness = 0.30) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.60', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL5052'), 0.4, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL5052') and thickness = 0.40) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.60', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL5052'), 0.5, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL5052') and thickness = 0.50) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.50', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL5052'), 0.6, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL5052') and thickness = 0.60) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.50', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL5052'), 0.8, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL5052') and thickness = 0.80) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.40', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL5052'), 1, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL5052') and thickness = 1.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.40', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL5052'), 1.2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL5052') and thickness = 1.20) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.30', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL5052'), 1.5, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL5052') and thickness = 1.50) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.30', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL5052'), 1.6, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL5052') and thickness = 1.60) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.20', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL5052'), 2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL5052') and thickness = 2.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.20', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL5052'), 3, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL5052') and thickness = 3.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.20', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'AL6063'), 1, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'AL6063') and thickness = 1.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.40', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SGCC'), 0.5, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SGCC') and thickness = 0.50) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.15', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SGCC'), 0.6, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SGCC') and thickness = 0.60) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.13', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SGCC'), 0.8, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SGCC') and thickness = 0.80) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.10', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SGCC'), 1, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SGCC') and thickness = 1.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.05', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SGCC'), 1.2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SGCC') and thickness = 1.20) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.05', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SGCC'), 1.6, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SGCC') and thickness = 1.60) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.37', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SGCC'), 2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SGCC') and thickness = 2.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.37', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SECC'), 0.5, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SECC') and thickness = 0.50) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.15', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SECC'), 0.6, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SECC') and thickness = 0.60) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.13', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SECC'), 0.8, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SECC') and thickness = 0.80) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.10', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SECC'), 1, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SECC') and thickness = 1.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.05', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SECC'), 1.2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SECC') and thickness = 1.20) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.05', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SECC'), 1.6, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SECC') and thickness = 1.60) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.35', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SECC'), 2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SECC') and thickness = 2.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.35', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SPCC'), 0.5, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SPCC') and thickness = 0.50) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.10', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SPCC'), 0.6, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SPCC') and thickness = 0.60) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.08', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SPCC'), 0.8, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SPCC') and thickness = 0.80) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.05', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SPCC'), 1, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SPCC') and thickness = 1.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.00', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SPCC'), 1.2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SPCC') and thickness = 1.20) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.00', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SPCC'), 1.6, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SPCC') and thickness = 1.60) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '0.95', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SPTE'), 0.15, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SPTE') and thickness = 0.15) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '2.30', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SPTE'), 0.2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SPTE') and thickness = 0.20) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.90', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SPTE'), 0.3, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SPTE') and thickness = 0.30) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.70', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SPTE'), 0.5, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SPTE') and thickness = 0.50) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.60', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'PH-CU'), 0.1, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'PH-CU') and thickness = 0.10) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '14.40', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'PH-CU'), 0.15, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'PH-CU') and thickness = 0.15) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '12.00', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'PH-CU'), 0.2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'PH-CU') and thickness = 0.20) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '10.80', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'PH-CU'), 0.3, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'PH-CU') and thickness = 0.30) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '8.40', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'CU01'), 0.3, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'CU01') and thickness = 0.30) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), 'null', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'C1840'), 0.3, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'C1840') and thickness = 0.30) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), 'null', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'CU1100'), 0.1, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'CU1100') and thickness = 0.10) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '8.60', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'CU1100'), 0.2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'CU1100') and thickness = 0.20) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '8.20', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'CU1100'), 0.3, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'CU1100') and thickness = 0.30) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '8.20', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'CU1100'), 0.5, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'CU1100') and thickness = 0.50) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '8.20', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'CU1100'), 0.6, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'CU1100') and thickness = 0.60) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '8.20', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'CU1100'), 0.8, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'CU1100') and thickness = 0.80) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '8.20', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'TMS02'), 0.3, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'TMS02') and thickness = 0.30) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), 'null', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'KU400'), 0.5, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'KU400') and thickness = 0.50) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.50', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'KU400'), 0.8, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'KU400') and thickness = 0.80) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.50', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'KU400'), 1, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'KU400') and thickness = 1.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.50', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'KU400'), 1.2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'KU400') and thickness = 1.20) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.50', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'KU400'), 1.5, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'KU400') and thickness = 1.50) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.50', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'KU400'), 2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'KU400') and thickness = 2.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.50', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SUS410'), null, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SUS410') and thickness is null) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '1.00', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SUS301'), 0.15, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SUS301') and thickness = 0.15) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '5.80', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SUS301'), 0.3, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SUS301') and thickness = 0.30) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.70', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SUS301'), 0.5, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SUS301') and thickness = 0.50) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.40', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SUS301'), 1, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SUS301') and thickness = 1.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.40', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SUS304'), 0.15, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SUS304') and thickness = 0.15) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '5.50', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SUS304'), 0.2, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SUS304') and thickness = 0.20) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '5.10', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SUS304'), 0.3, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SUS304') and thickness = 0.30) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.80', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SUS304'), 0.5, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SUS304') and thickness = 0.50) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.70', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = 'SUS304'), 1, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = 'SUS304') and thickness = 1.00) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '4.50', 'number', 'material_thinkness', now());
INSERT INTO formula.material_thinkness
    (id, material_metal_id, thickness, remark, create_time, disable_time)
    VALUES(uuid_generate_v1(), (select id from formula.material_metal where name = '低碳鋼1018'), null, '', now(), null);
    INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time)
    VALUES( (select id from formula.material_thinkness where material_metal_id = (select id from formula.material_metal where name = '低碳鋼1018') and thickness is null) ,
    (select id from formula.schedule_date where formula_type_id = (select id from formula.formula_type where name = 'material')), '0.50', 'number', 'material_thinkness', now());





INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='AL1050'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='AL5052'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='SUS301'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='SUS304'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='SUS403'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='SUS430'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='SECC'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='SGCC'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='SPCC'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='SGLD'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='SPTE'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='Cu3604'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='低碳鋼1018'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='SUS410'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='磷青銅'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='PH-CU'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='CU1100'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='CU01'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='AL6061'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='AL6063'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='KU400'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='皮銅'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='C1840'), now(), null);

INSERT INTO formula.part_category_material_metal
    (pategory_category_2_id, material_metal_id, create_time, disable_time)
    VALUES((select id from formula.part_category_2 where category_name = 'Metal'), (select id from formula.material_metal where name ='TMS02'), now(), null);

--init plastic material spec
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'FR_PC', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'FR_PC_Translucent', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'FR_PC_Diffusion_擴散', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'Non_FR_PC', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PA_50percent_GF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PA1010_55percent_GF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_with_25percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_with_30percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_非透明', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_10percent_GF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_10percent_GF_with_30percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_15percent_CF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_20percent_CF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_20percent_CF_with_30percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_20percent_GF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_25percent_GF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_25percent_Talc', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_25percent_Talc_with_30percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_25percent_Talc_with_35percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_30percent_GF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_35percent_GF_with_5percent_Talc', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_40percent_GF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_40percent_GF_with_30percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_45percent_GF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_50percent_GF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_50percent_GF_Recycle', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_50percent_GF_with_20percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_50percent_GF_with_30percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_with_30percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_with_35percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_高光澤高流動', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_12percent_Talc', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_15percent_Talc', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_15percent_Talc_UVS', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_15percent_Talc_with_15percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_15percent_Talc_with_30percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_23percent_Talc', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_25percent_Talc', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_25percent_Talc_with_30percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_25percent_Talc_with_35percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_3percent_Talc', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_5percent_Talc', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_5percent_Talc_UVS', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_5percent_Talc_with_35percent_PCR', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_8percent_Talc', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_ABS_PMMA', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC_GF_CF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PC紅外線透過型', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'POM', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PPA_55percent_GF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PPA_60percent_GF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PPS_45percent_GF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PPS_50percent_GF', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'PPS_50percent_GF_MD', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'TPEE', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'TPU', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), 'Wearable_PC_耐磨', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), '防火_TPEE', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), '防火高流動_PC', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), '耐候_PC', now());
 INSERT INTO formula.material_spec (id, material_spec_name, create_time) VALUES (uuid_generate_v1(), '擴散級_PC', now());
 -- init plastic material
INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_BPL1000', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'FR_PC')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_ML7681', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'FR_PC_Translucent')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_FXD9810', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'FR_PC_Diffusion_擴散')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_121R / 141R /123R-CC', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'Non_FR_PC')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Dupont_HTNFR55G50NHLWSF', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PA_50percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Dupont_HTN59G55LWSF', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PA1010_55percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_EXL1414', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_L-1225L', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_L-1225Y', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_L-1250Y', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_LN2520A', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_MN-4800', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_MN-3709EE', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_with_25percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_RCX7243', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_with_30percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'MEP_FPR3500', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_非透明')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'MEP_FPL3500', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_非透明')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_D151', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_10percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_GV-3510R', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_10percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY ER2102', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_10percent_GF_with_30percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'MEP_CP2015N2', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_15percent_CF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_DC0041PQ', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_20percent_CF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_DC0041PR', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_20percent_CF_with_30percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_D251', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_20percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_GV-3520R', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_20percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY GN2253F', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_25percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_BM5225Y', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_25percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_DN-5325B', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_25percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_DN-5325S', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_25percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_DN-5325SEF', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_25percent_Talc_with_30percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_RCM6224', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_25percent_Talc_with_35percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_GF9016', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_30percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY GN2303F', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_30percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_D351', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_30percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_GXV-3530UH', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_30percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_GF9012MF', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_35percent_GF_with_5percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_GF9018', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_40percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY GN2403FT', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_40percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_D451', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_40percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_D452', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_40percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_GN-3540RI', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_40percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY ER2403F', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_40percent_GF_with_30percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_GXV-3545WI', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_45percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_GF9020', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_50percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY GN2503F', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_50percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_D551', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_50percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_GXV-3550WI', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_50percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_M4004GR', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_50percent_GF_Recycle')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY ER2503F', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_50percent_GF_with_20percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_D551RC', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_50percent_GF_with_30percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_FR3002', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_FR3008', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_FR3040', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY GN5001RFD', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'MEP_MB1800', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_CX2244ME', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_CX7240', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_CY6120', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN-7000A', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN-7690A', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LOTTE_NH-1021', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LOTTE_NH-1015V', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_FR630GR', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_with_30percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY ER5001RFA', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_with_30percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_RCY6214', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_with_35percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN 7050', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_高光澤高流動')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN 7050Y', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_高光澤高流動')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY GN5121RF', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_12percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'MEP_TMB1412', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_12percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_FR3021', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY GN5151RFA', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_15percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'MEP_TMB1615', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_15percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_C7230P', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_15percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN-3715B', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN-3715BW', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_15percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN-3715BX', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_15percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN-3740B', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LOTTE_NH-1150HH', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_FR3021BBS910', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_15percent_Talc_UVS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN-3715BZ', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_15percent_Talc_UVS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN 3745BEC', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_15percent_Talc_with_15percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_FR3021GR', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_15percent_Talc_with_30percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY ER5151RFL', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_15percent_Talc_with_30percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_RCM6123', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_15percent_Talc_with_30percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN 3745BEF', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_15percent_Talc_with_30percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_FR3023', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_23percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_FR3025', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_25percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY GN5254FD', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_25percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY ER5254F', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_25percent_Talc_with_30percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_FR3025R35', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_25percent_Talc_with_35percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'MEP_MB1700', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_3percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_FR3020', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_5percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY GN5101RF', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_5percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_C7210A', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_5percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_C7410', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_5percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN-3713B', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_5percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN-3713BX', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_5percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN-7100F', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_5percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_TN-7200B', (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_5percent_Talc_UVS')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_RCM6134', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_5percent_Talc_with_35percent_PCR')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_CM6140', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_8percent_Talc')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_LUPOY SG-5009FA', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_ABS_PMMA')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'MEP_BCB992', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC_GF_CF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'MEP_7025A OAT223', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PC紅外線透過型')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'MEP_F20-03', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'POM')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Dupont_Delrin100', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'POM')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Dupont_HTNFE170016', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PPA_55percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Dupont_HTNFE170023', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PPA_60percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Toray_A305M45B', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PPS_45percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Toray_A595H', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PPS_50percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'LG_EGP2500', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PPS_50percent_GF')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Toray_A695H', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'PPS_50percent_GF_MD')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Dupont_Hytrel_3046', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'TPEE')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Dupont_Hytrel_3078', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'TPEE')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Dupont_Hytrel_4056', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'TPEE')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Dupont_Hytrel_RS30F7', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'TPEE')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Dupont_Hytrel_RS40F2', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'TPEE')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_UDS70AU', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'TPU')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_IT85AU', (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPU')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_8785A', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'TPU')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_1070AU', (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPU')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_5377A', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'TPU')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Covestro_1065AU', (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPU')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Huntsman_AVALON 85AE', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'TPU')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Huntsman_AVALON 80AE', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'TPU')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Huntsman_AVALON 75AE', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'TPU')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Huntsman_AVALON 65AB', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'TPU')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Sabic_LNP Lubriloy D20001', (SELECT id FROM formula.material_spec WHERE (material_spec_name= 'Wearable_PC_耐磨')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Dupont_HTR8813', (SELECT id FROM formula.material_spec WHERE (material_spec_name= '防火_TPEE')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Dupont_HTR8837', (SELECT id FROM formula.material_spec WHERE (material_spec_name= '防火_TPEE')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_MN-3600H', (SELECT id FROM formula.material_spec WHERE (material_spec_name='防火高流動_PC')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_L-1225Z100', (SELECT id FROM formula.material_spec WHERE (material_spec_name= '耐候_PC')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'MEP_EFD8000', (SELECT id FROM formula.material_spec WHERE (material_spec_name= '擴散級_PC')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'MEP_EFD3304U', (SELECT id FROM formula.material_spec WHERE (material_spec_name= '擴散級_PC')), now());
 INSERT INTO formula.material (id, material_name, material_spec_id, create_time) VALUES (uuid_generate_v1(), 'Teijin_ML-1103', (SELECT id FROM formula.material_spec WHERE (material_spec_name= '擴散級_PC')), now());

 --init part_category_material
INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_BPL1000')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_ML7681')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_FXD9810')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_121R / 141R /123R-CC')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Dupont_HTNFR55G50NHLWSF')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Dupont_HTN59G55LWSF')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_EXL1414')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_L-1225L')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_L-1225Y')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_L-1250Y')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_LN2520A')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_MN-4800')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_MN-3709EE')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_RCX7243')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'MEP_FPR3500')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'MEP_FPL3500')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_D151')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_GV-3510R')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY ER2102')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'MEP_CP2015N2')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_DC0041PQ')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_DC0041PR')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_D251')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_GV-3520R')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN2253F')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_BM5225Y')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_DN-5325B')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_DN-5325S')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_DN-5325SEF')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_RCM6224')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_GF9016')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN2303F')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_D351')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_GXV-3530UH')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_GF9012MF')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_GF9018')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN2403FT')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_D451')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_D452')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_GN-3540RI')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY ER2403F')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_GXV-3545WI')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_GF9020')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN2503F')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_D551')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_GXV-3550WI')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_M4004GR')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY ER2503F')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_D551RC')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3002')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3008')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3040')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN5001RFD')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'MEP_MB1800')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_CX2244ME')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_CX7240')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_CY6120')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-7000A')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-7690A')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LOTTE_NH-1021')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LOTTE_NH-1015V')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR630GR')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY ER5001RFA')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_RCY6214')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN 7050')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN 7050Y')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN5121RF')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'MEP_TMB1412')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3021')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN5151RFA')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'MEP_TMB1615')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_C7230P')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-3715B')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-3715BW')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-3715BX')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-3740B')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LOTTE_NH-1150HH')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3021BBS910')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-3715BZ')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN 3745BEC')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3021GR')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY ER5151RFL')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_RCM6123')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN 3745BEF')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3023')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3025')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN5254FD')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY ER5254F')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3025R35')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'MEP_MB1700')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3020')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN5101RF')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_C7210A')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_C7410')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-3713B')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-3713BX')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-7100F')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-7200B')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_RCM6134')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_CM6140')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY SG-5009FA')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'MEP_BCB992')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'MEP_7025A OAT223')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'MEP_F20-03')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Dupont_Delrin100')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Dupont_HTNFE170016')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Dupont_HTNFE170023')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Toray_A305M45B')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Toray_A595H')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'LG_EGP2500')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Toray_A695H')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Dupont_Hytrel_3046')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Dupont_Hytrel_3078')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Dupont_Hytrel_4056')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Dupont_Hytrel_RS30F7')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Dupont_Hytrel_RS40F2')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_UDS70AU')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_IT85AU')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_8785A')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_1070AU')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_5377A')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Covestro_1065AU')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Huntsman_AVALON 85AE')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Huntsman_AVALON 80AE')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Huntsman_AVALON 75AE')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Huntsman_AVALON 65AB')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Sabic_LNP Lubriloy D20001')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Dupont_HTR8813')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Dupont_HTR8837')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_MN-3600H')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_L-1225Z100')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'MEP_EFD8000')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'MEP_EFD3304U')), now());
 INSERT INTO formula.part_category_material (part_category_2_id, material_id, create_time) VALUES ((SELECT id FROM formula.part_category_2 WHERE (category_name='Plastic') AND (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name='Housing')))), (SELECT id FROM formula.material WHERE (material_name = 'Teijin_ML-1103')), now());
--init plastic material value
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_BPL1000') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='FR_PC')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 5.95, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_ML7681') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='FR_PC_Translucent')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 7.05, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_FXD9810') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='FR_PC_Diffusion_擴散')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 9.25, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_121R / 141R /123R-CC') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='Non_FR_PC')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.85, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Dupont_HTNFR55G50NHLWSF') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PA_50percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 10.05, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Dupont_HTN59G55LWSF') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PA1010_55percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 15, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_EXL1414') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 5.52, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_L-1225L') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.2, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_L-1225Y') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.2, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_L-1250Y') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.2, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_LN2520A') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_MN-4800') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 6.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_MN-3709EE') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_with_25percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.6, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_RCX7243') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_with_30percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 5.17, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'MEP_FPR3500') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_非透明')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 6.25, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'MEP_FPL3500') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_非透明')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 6.25, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_D151') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_10percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 7.9, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_GV-3510R') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_10percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 6, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY ER2102') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_10percent_GF_with_30percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.2, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'MEP_CP2015N2') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_15percent_CF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 15.85, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_DC0041PQ') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_20percent_CF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 11.32, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_DC0041PR') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_20percent_CF_with_30percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 11.62, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_D251') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_20percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 7.9, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_GV-3520R') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_20percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 6.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN2253F') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_25percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.85, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_BM5225Y') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_25percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.9, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_DN-5325B') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_25percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_DN-5325S') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_25percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.85, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_DN-5325SEF') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_25percent_Talc_with_30percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_RCM6224') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_25percent_Talc_with_35percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.38, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_GF9016') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_30percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN2303F') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_30percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.9, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_D351') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_30percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 7, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_GXV-3530UH') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_30percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 5.8, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_GF9012MF') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_35percent_GF_with_5percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 5.9, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_GF9018') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_40percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 5.7, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN2403FT') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_40percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 5.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_D451') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_40percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 8.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_D452') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_40percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 8.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_GN-3540RI') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_40percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 7.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY ER2403F') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_40percent_GF_with_30percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 6, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_GXV-3545WI') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_45percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 8, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_GF9020') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_50percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 7.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN2503F') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_50percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 6.75, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_D551') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_50percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 8.73, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_GXV-3550WI') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_50percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 8.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_M4004GR') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_50percent_GF_Recycle')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.05, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY ER2503F') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_50percent_GF_with_20percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 7.45, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_D551RC') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_50percent_GF_with_30percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 8.73, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3002') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3008') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.25, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3040') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.7, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN5001RFD') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'MEP_MB1800') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_CX2244ME') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 9.95, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_CX7240') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 5.9, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_CY6120') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.1, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-7000A') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.55, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-7690A') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.29, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LOTTE_NH-1021') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.7, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LOTTE_NH-1015V') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.8, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR630GR') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_with_30percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.7, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY ER5001RFA') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_with_30percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_RCY6214') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_with_35percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.13, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN 7050') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_高光澤高流動')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 5.8, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN 7050Y') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_高光澤高流動')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.8, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN5121RF') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_12percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.8, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'MEP_TMB1412') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_12percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3021') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.1, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN5151RFA') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.1, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'MEP_TMB1615') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_C7230P') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.9, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-3715B') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.3, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-3715BW') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.3, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-3715BX') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.55, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-3740B') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LOTTE_NH-1150HH') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.3, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3021BBS910') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc_UVS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-3715BZ') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc_UVS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.15, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN 3745BEC') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc_with_15percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.56, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3021GR') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc_with_30percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.6, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY ER5151RFL') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc_with_30percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.4, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_RCM6123') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc_with_30percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.1, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN 3745BEF') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_15percent_Talc_with_30percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.4, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3023') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_23percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.6, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3025') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_25percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.4, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN5254FD') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_25percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.4, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY ER5254F') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_25percent_Talc_with_30percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3025R35') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_25percent_Talc_with_35percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.2, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'MEP_MB1700') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_3percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_FR3020') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_5percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY GN5101RF') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_5percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.35, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_C7210A') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_5percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.9, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_C7410') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_5percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.55, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-3713B') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_5percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.45, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-3713BX') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_5percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.55, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-7100F') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_5percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 3.1, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_TN-7200B') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_5percent_Talc_UVS')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.15, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_RCM6134') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_5percent_Talc_with_35percent_PCR')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.09, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_CM6140') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_8percent_Talc')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.1, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_LUPOY SG-5009FA') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_ABS_PMMA')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'MEP_BCB992') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC_GF_CF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 8, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'MEP_7025A OAT223') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PC紅外線透過型')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 9.75, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'MEP_F20-03') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='POM')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 2.8, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Dupont_Delrin100') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='POM')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.85, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Dupont_HTNFE170016') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PPA_55percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 10.05, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Dupont_HTNFE170023') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PPA_60percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 12, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Toray_A305M45B') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PPS_45percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 9.8, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Toray_A595H')AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PPS_50percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 10.2, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'LG_EGP2500') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PPS_50percent_GF')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 7, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Toray_A695H')AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='PPS_50percent_GF_MD')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 9.85, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Dupont_Hytrel_3046') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPEE')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 9.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Dupont_Hytrel_3078') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPEE')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 9.2, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Dupont_Hytrel_4056') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPEE')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 7.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Dupont_Hytrel_RS30F7') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPEE')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 15.3, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Dupont_Hytrel_RS40F2') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPEE')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 15.3, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_UDS70AU') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPU')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 10.8, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_IT85AU') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPU')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 14.2, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_8785A') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPU')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 6.2, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_1070AU') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPU')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 12.3, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_5377A') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPU')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 14.8, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Covestro_1065AU') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPU')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 6.7, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Huntsman_AVALON 85AE') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPU')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 6, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Huntsman_AVALON 80AE') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPU')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 6.1, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Huntsman_AVALON 75AE') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPU')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 6.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Huntsman_AVALON 65AB') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='TPU')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 6.8, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Sabic_LNP Lubriloy D20001') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='Wearable_PC_耐磨')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 12.2, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Dupont_HTR8813') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='防火_TPEE')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 16, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Dupont_HTR8837') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='防火_TPEE')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 11.5, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_MN-3600H') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='防火高流動_PC')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.7, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_L-1225Z100') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='耐候_PC')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 4.4, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'MEP_EFD8000')AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='擴散級_PC')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 8, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'MEP_EFD3304U') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='擴散級_PC')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 6, 'number', 'material', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.material WHERE (material_name = 'Teijin_ML-1103') AND (material_spec_id = (SELECT id FROM formula.material_spec WHERE (material_spec_name='擴散級_PC')))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'material' )) )), 8, 'number', 'material', now());




-- INIT plastic loss rate
INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'NORMAL (咬花)', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'NORMAL (咬花)_高礦粉', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'NORMAL (咬花)_局部高光', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'NORMAL (咬花)_模內埋釘', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'IMR-Normal', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'IMR-partial high gloss molded', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'IMR-高彩', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'IMR NCVM', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'DOUBLE_INJECTION-Texture', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'DOUBLE_INJECTION-Painting', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'DOUBLE_INJECTION-Partial high gloss', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'RHCM-GFRP', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'RHCM-GFRP-Painting', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'RHCM-模內埋釘', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'HIGH_GLOSS', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'SPECIAL-TEXTURE (特殊咬花)', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'Texture-Partial high gloss', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'PAINTING (1C1B)', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'PAINTING (2C1B)', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'PAINTING (3C1B)', now(), NULL);

INSERT INTO formula.plastic_material_loss_rate
  (id, loss_rate_name, create_time, disable_time)
  VALUES(uuid_generate_v1(), 'NCVM', now(), NULL);




-- init loss rate name and product type mapping


INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_高礦粉'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_高礦粉'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_高礦粉'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_局部高光'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_局部高光'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_局部高光'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_模內埋釘'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_模內埋釘'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_模內埋釘'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-Normal'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-Normal'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-Normal'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-partial high gloss molded'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-partial high gloss molded'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-partial high gloss molded'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-高彩'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-高彩'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-高彩'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR NCVM'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR NCVM'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR NCVM'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Texture'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Texture'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Texture'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Painting'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Painting'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Painting'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Partial high gloss'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Partial high gloss'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Partial high gloss'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-GFRP'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-GFRP'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-GFRP'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-GFRP-Painting'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-GFRP-Painting'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-GFRP-Painting'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-模內埋釘'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-模內埋釘'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-模內埋釘'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'HIGH_GLOSS'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'HIGH_GLOSS'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'HIGH_GLOSS'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'SPECIAL-TEXTURE (特殊咬花)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'SPECIAL-TEXTURE (特殊咬花)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'SPECIAL-TEXTURE (特殊咬花)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'Texture-Partial high gloss'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'Texture-Partial high gloss'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'Texture-Partial high gloss'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (1C1B)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (1C1B)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (1C1B)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (2C1B)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (2C1B)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (2C1B)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (3C1B)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (3C1B)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (3C1B)'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NCVM'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NCVM'), now(), null);

INSERT INTO formula.plastic_material_loss_rate_product_type
(id, product_type_id, plastic_material_loss_rate_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'),(select id from formula.plastic_material_loss_rate where loss_rate_name = 'NCVM'), now(), null);




-- init plastic loss rate


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.03', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.03', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.03', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_高礦粉') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.08', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_高礦粉') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.08', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_高礦粉') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.08', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_局部高光') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_局部高光') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_局部高光') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_模內埋釘') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_模內埋釘') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NORMAL (咬花)_模內埋釘') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-Normal') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.08', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-Normal') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.08', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-Normal') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.08', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-partial high gloss molded') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-partial high gloss molded') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-partial high gloss molded') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-高彩') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-高彩') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR-高彩') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR NCVM') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.12', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR NCVM') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.12', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'IMR NCVM') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.12', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Texture') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Texture') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Texture') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Painting') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.12', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Painting') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.12', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Painting') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.12', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Partial high gloss') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Partial high gloss') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'DOUBLE_INJECTION-Partial high gloss') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-GFRP') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-GFRP') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-GFRP') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-GFRP-Painting') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-GFRP-Painting') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-GFRP-Painting') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-模內埋釘') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-模內埋釘') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'RHCM-模內埋釘') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'HIGH_GLOSS') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'HIGH_GLOSS') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'HIGH_GLOSS') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'SPECIAL-TEXTURE (特殊咬花)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.08', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'SPECIAL-TEXTURE (特殊咬花)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.08', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'SPECIAL-TEXTURE (特殊咬花)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.08', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'Texture-Partial high gloss') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'Texture-Partial high gloss') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'Texture-Partial high gloss') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (1C1B)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.03', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (1C1B)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.12', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (1C1B)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.12', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (2C1B)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.03', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (2C1B)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (2C1B)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (3C1B)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.03', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (3C1B)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'PAINTING (3C1B)') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.15', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='NB') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NCVM') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='DT') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NCVM') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_material_loss_rate_product_type where product_type_id = (select id from formula.product_type where type_name ='OTHERS') and plastic_material_loss_rate_id =
 (select id from formula.plastic_material_loss_rate where loss_rate_name = 'NCVM') ),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.10', 'number', 'plastic_material_loss_rate_product_type', now());


INSERT INTO formula.common_parameter(id, formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, create_time, disable_time) VALUES(uuid_generate_v1(),(select id from  formula.formula_type where name='common'), 'standup_assembly'
, null, 'standup_assembly_spend_time', null,'每件組裝工時需(sec)', null, '每件組裝工時需(sec)', now(), null);
INSERT INTO formula.common_parameter(id, formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, create_time, disable_time) VALUES(uuid_generate_v1(),(select id from  formula.formula_type where name='common'), 'standup_assembly'
, null, 'standup_assembly_cost', null,'每件組裝工時花費(USD/min)', null, '每件組裝工時花費(USD/min)', now(), null);
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'standup_assembly') AND (label='standup_assembly_spend_time')), (SELECT id FROM formula.schedule_date WHERE name='common_init'), '12', 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'standup_assembly') AND (label='standup_assembly_cost')), (SELECT id FROM formula.schedule_date  WHERE name='common_init'), '0.045', 'number', 'common_parameter', now());



INSERT INTO formula.plastic_paint_machine
(id, machine_name, remark, create_time, disable_time)
VALUES(uuid_generate_v1(), '往復機', '', now(), null);

INSERT INTO formula.plastic_paint_machine
(id, machine_name, remark, create_time, disable_time)
VALUES(uuid_generate_v1(), 'Spindle', '', now(), null);

INSERT INTO formula.plastic_paint_machine
(id, machine_name, remark, create_time, disable_time)
VALUES(uuid_generate_v1(), 'Robot', '', now(), null);

INSERT INTO formula.plastic_paint_machine
(id, machine_name, remark, create_time, disable_time)
VALUES(uuid_generate_v1(), '蒸鍍', '', now(), null);



INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES( (select id from formula.plastic_paint_machine where machine_name = '往復機'),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.1484', 'number', 'plastic_paint_machine', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES( (select id from formula.plastic_paint_machine where machine_name = 'Spindle'),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.2077', 'number', 'plastic_paint_machine', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES( (select id from formula.plastic_paint_machine where machine_name = 'Robot'),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.1484', 'number', 'plastic_paint_machine', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES( (select id from formula.plastic_paint_machine where machine_name = '蒸鍍'),
(SELECT id FROM formula.schedule_date WHERE formula_type_id= (SELECT id FROM formula.formula_type WHERE name= 'housing_plastic' )) , '0.09', 'number', 'plastic_paint_machine', now());


INSERT INTO formula.common_parameter(id, formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, create_time, disable_time) VALUES(uuid_generate_v1(),(select id from  formula.formula_type where name='housing_metal'), 'housing_metal_management_and_profit'
, null, 'management_and_profit', null,'管銷利潤', null, 'total管銷&利潤常數', now(), null);
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_stamping', NULL, 'stage_stamping_loss_rate', '%', '工程模費loss rate', '沖壓費工程模費 loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_stamping', NULL, 'progressive_stamping_loss_rate', '%', '連續模費loss rate', '沖壓費連續模費loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_stamping', NULL, 'riveting die_loss_rate', '%', '鉚和模費loss rate', '沖壓費鉚和模費loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'ultrasonic_cleaning_cost', NULL, '超音波清洗', '二次加工費_超音波清洗單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'anode_treatment_qty', '次', '預陽製程次數', '二次加工費_預陽製程次數', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'two_anodization_treatment_qty', '次', '二陽製程次數', '二次加工費_二陽製程次數', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'sand_blast_cost', NULL, '噴砂單價', '二次加工費_噴砂單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'sand_blast_loss_rate', '%', '噴砂loss rate', '二次加工費_噴砂loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'hair_cost', NULL, '髮絲單價', '二次加工費_髮絲單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'hair_loss_rate', '%', '髮絲loss rate', '二次加工費_髮絲loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'paint_area_const', NULL, '噴漆計算常數', '二次加工費_噴漆計算面積常數', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'paint_loss_rate', '%', '噴漆loss rate', '二次加工費_噴漆loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'paint_cost_const', NULL, '單位面積之人工費用Manpower', '二次加工費_單位面積之人工費用Manpower', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'spraying_const', NULL, '以成品展開面積再加上單邊寬放', '二次加工費_以成品展開面積再加上單邊寬放', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'thermal_bonding_heat_pressing_loss_rate', '%', 'Thermal Bonding 熱壓 loss rate', '二次加工費_Thermal Bonding 熱壓 loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'thermal_bonding_heat_pressing_machining_cost', NULL, 'Thermal Bonding 熱壓加工費', '二次加工費_Thermal Bonding 熱壓加工費', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'single_tapping_cost', NULL, '單點攻牙單價', '二次加工費_單點攻牙單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'single_tapping_loss_rate', '%', '單點攻牙loss rate', '二次加工費_單點攻牙loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'multi_tapping_cost', NULL, '多點攻牙單價', '二次加工費_多點攻牙單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'multi_tapping_loss_rate', '%', '多點攻牙loss rate', '二次加工費_多點攻牙loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'single_spot_welding_cost', NULL, '單點點焊單價', '二次加工費_單點點焊單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'single_spot_welding_loss_rate', '%', '單點點焊loss rate', '二次加工費_單點點焊loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'multi_spot_welding_cost', NULL, '多點點焊單價', '二次加工費_多點點焊單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'multi_spot_welding_loss_rate', '%', '多點點焊loss rate', '二次加工費_多點點焊loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'single_rivet_cost', NULL, '單點鉚釘單價', '二次加工費_單點鉚釘單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'single_rivet_loss_rate', '%', '單點鉚釘loss rate', '二次加工費_單點鉚釘loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'multi_rivet_cost', NULL, '多點鉚釘單價', '二次加工費_多點鉚釘單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'multi_rivet_loss_rate', '%', '多點鉚釘loss rate', '二次加工費_多點鉚釘loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'blind_rivet_cost', NULL, '拉鉚釘單價', '二次加工費_拉鉚釘單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'blind_rivet_loss_rate', '%', '拉鉚釘loss rate', '二次加工費_拉鉚釘loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'paint_black_cost', 'USD/Min', '手工塗黑單價', '二次加工費_手工塗黑單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'paint_black_loss_rate', '%', '手工塗黑loss rate', '二次加工費_手工塗黑loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'paint_black_cycle_ time_sec', 'sec', '手工塗黑秒數', '二次加工費_手工塗黑秒', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'paint_black_cycle_ time_area', 'mm2', '手工塗黑面積', '二次加工費_手工塗黑面積', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'screen_printing_cost', NULL, 'Printing網印單價', '二次加工費_Printing網印單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'screen_printing_loss_rate', '%', 'Printing網印 loss rate', '二次加工費_Printing網印 loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'pad_printing_cost', NULL, 'Printing移印單價', '二次加工費_Printing移印單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'pad_printing_loss_rate', '%', 'Printing移印 loss rate', '二次加工費_Printing移印 loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'silk_print_cost', NULL, 'Silk Print 單價', '二次加工費_Silk Print 單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'silk_print_loss_rate', '%', 'Silk Print loss rate', '二次加工費_Silk Print loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'cnc_4_axis_core_side_cost', 'USD/sec', 'CNC(公模面)固定用四軸單價', '二次加工費_CNC(公模面)固定用四軸單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'cnc_5_axis_core_side_cost', 'USD/sec', 'CNC(公模面)固定用五軸單價', '二次加工費_CNC(公模面)固定用五軸單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'cnc_core_side_loss_rate', '%', 'CNC(公模面) loss rate', '二次加工費_CNC(公模面) loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'cnc_core_side_cycle_time', NULL, 'CNC(公模面) 調整加工速率之比例(變快)', '二次加工費_CNC(公模面) 調整加工速率之比例(變快)', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'cnc_PL_cost', NULL, 'CNC(PL處)單價', '二次加工費_CNC(PL處)單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'cnc_PL_loss_rate', '%', 'CNC(PL處) loss rate', '二次加工費_CNC(PL處) loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'cnc_PL_cycle_time_numerator', NULL, 'CNC(PL處) 加工速率mm/sec', '二次加工費_CNC(PL處) 加工速率mm/sec', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'drill_cutting_cost', NULL, '鑽切(高光)單價', '二次加工費_鑽切(高光)單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'drill_cutting_loss_rate', '%', '鑽切(高光)  loss rate', '二次加工費_鑽切(高光)  loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'drill_cuttin_cycle_time_numerator', NULL, '鑽切(高光) 加工速率mm²/s', '二次加工費_鑽切(高光) 加工速率mm²/s', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'laser_engraving_core_side_cost', NULL, '鐳雕(公模面) 單價', '二次加工費_鐳雕(公模面) 單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'laser_engraving_core_side_loss_rate', '%', '鐳雕(公模面) loss rate', '二次加工費_鐳雕(公模面) loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'laser_engraving_icon_cost', NULL, '鐳雕(icon) 單價', '二次加工費_鐳雕(icon) 單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'laser_engraving_icon_loss_rate', '%', '鐳雕(icon) loss rate', '二次加工費_鐳雕(icon) loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'grinding_auto_speed', NULL, '打磨(自動加工速度)', '二次加工費_打磨(自動加工速度)', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'grinding_auto_cost', NULL, '打磨(自動加工單價)', '二次加工費_打磨(自動加工單價)', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'grinding_auto_loss_rate', '%', '打磨(自動加工 loss rate)', '二次加工費_打磨(自動加工 loss rate)', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'grinding_manual_speed', NULL, '打磨(手動加工速度)', '二次加工費_打磨(手動加工速度)', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'grinding_manual_cost', NULL, '打磨(手動加工單價)', '二次加工費_打磨(手動加工單價)', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'grinding_manual_loss_rate', '%', '打磨(手動加工loss rate)', '二次加工費_打磨(手動加工loss rate)', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'drilling_hole_const', NULL, '鑽孔基本消費額', '二次加工費_鑽孔基本消費額', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'drilling_hole_cost', NULL, '鑽孔單價', '二次加工費_鑽孔單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'drilling_hole_loss_rate', '%', '鑽孔loss rate', '二次加工費_鑽孔loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'anode_point_cutting_cost', NULL, '陽極掛點切除單價', '二次加工費_陽極掛點切除單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name= 'housing_metal' )), 'housing_metal_secondary_processing', NULL, 'anode_point_cutting_loss_rate', '%', '陽極掛點切除loss rate', '二次加工費_陽極掛點切除loss rate', now(), NULL, null);


--parameter_value
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_stamping') AND (label='stage_stamping_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_stamping') AND (label='progressive_stamping_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_stamping') AND (label='riveting die_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='ultrasonic_cleaning_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.3529', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='anode_treatment_qty')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.5', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='two_anodization_treatment_qty')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '1', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='sand_blast_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '5', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='sand_blast_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='hair_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '5', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='hair_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='paint_area_const')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '1.5', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='paint_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.15', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='paint_cost_const')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.00000084', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='spraying_const')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '35', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='thermal_bonding_heat_pressing_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='thermal_bonding_heat_pressing_machining_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.00303', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='single_tapping_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.0078', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='single_tapping_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='multi_tapping_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.0039', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='multi_tapping_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='single_spot_welding_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.0078', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='single_spot_welding_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='multi_spot_welding_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.0039', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='multi_spot_welding_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='single_rivet_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.0078', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='single_rivet_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='multi_rivet_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.0039', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='multi_rivet_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='blind_rivet_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.0078', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='blind_rivet_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='paint_black_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.09', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='paint_black_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='paint_black_cycle_ time_sec')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '40', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='paint_black_cycle_ time_area')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '2500', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='screen_printing_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.05', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='screen_printing_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='pad_printing_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.05', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='pad_printing_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='silk_print_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.05', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='silk_print_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='cnc_4_axis_core_side_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.0032', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='cnc_5_axis_core_side_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.0042', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='cnc_core_side_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='cnc_core_side_cycle_time')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '2.3333', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='cnc_PL_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.0042', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='cnc_PL_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='cnc_PL_cycle_time_numerator')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '6', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='drill_cutting_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.005', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='drill_cutting_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='drill_cuttin_cycle_time_numerator')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '5', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='laser_engraving_core_side_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '25', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='laser_engraving_core_side_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='laser_engraving_icon_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.017', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='laser_engraving_icon_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='grinding_auto_speed')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '1738', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='grinding_auto_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.0022', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='grinding_auto_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='grinding_manual_speed')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '150', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='grinding_manual_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.005', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='grinding_manual_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='drilling_hole_const')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.2', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='drilling_hole_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.000071', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='drilling_hole_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='anode_point_cutting_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.02', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_secondary_processing') AND (label='anode_point_cutting_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0', 'number', 'common_parameter', now());


--  INSERT INTO formula.common_parameter(id, formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, create_time, disable_time) VALUES(uuid_generate_v1(),(select id from  formula.formula_type where name='housing_metal'), 'housing_metal_management_and_profit'
-- , null, 'management_and_profit', null,'管銷利潤', null, 'total管銷&利潤常數', now(), null);
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_metal_management_and_profit') AND (label='management_and_profit')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.15', 'number', 'common_parameter', now());

 --metal_glue
 INSERT INTO formula.metal_glue (id, glue_name, usd_g, density, remark, create_time, disable_time) VALUES (uuid_generate_v1(), 'DEVCON DV14167', uuid_generate_v1(), uuid_generate_v1(), NULL, now(), null);


 -- parameter_value
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_g FROM formula.metal_glue WHERE (glue_name = 'DEVCON DV14167')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.3428', 'number', 'metal_glue', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT density FROM formula.metal_glue WHERE (glue_name = 'DEVCON DV14167')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '0.97', 'number', 'metal_glue', now());

-- init plastic_paint_vendor

INSERT INTO formula.plastic_paint_vendor
(id, vendor_name, create_time, disable_time)
VALUES(uuid_generate_v1(), 'Akzo', now(), null);

INSERT INTO formula.plastic_paint_vendor
(id, vendor_name, create_time, disable_time)
VALUES(uuid_generate_v1(), '東端', now(), null);

INSERT INTO formula.plastic_paint_vendor
(id, vendor_name, create_time, disable_time)
VALUES(uuid_generate_v1(), '協承昌', now(), null);

INSERT INTO formula.plastic_paint_vendor
(id, vendor_name, create_time, disable_time)
VALUES(uuid_generate_v1(), '新政豐', now(), null);

INSERT INTO formula.plastic_paint_vendor
(id, vendor_name, create_time, disable_time)
VALUES(uuid_generate_v1(), '台贏', now(), null);

INSERT INTO formula.plastic_paint_vendor
(id, vendor_name, create_time, disable_time)
VALUES(uuid_generate_v1(), '皇冠', now(), null);

INSERT INTO formula.plastic_paint_vendor
(id, vendor_name, create_time, disable_time)
VALUES(uuid_generate_v1(), '歐歷', now(), null);

INSERT INTO formula.plastic_paint_vendor
(id, vendor_name, create_time, disable_time)
VALUES(uuid_generate_v1(), 'Others', now(), null);

-- init 底漆面漆


INSERT INTO formula.plastic_paint_bottom_top
(id, bottom_top_name, create_time, disable_time)
VALUES(uuid_generate_v1(), '底漆', now(), null);

INSERT INTO formula.plastic_paint_bottom_top
(id, bottom_top_name, create_time, disable_time)
VALUES(uuid_generate_v1(), '面漆', now(), null);

INSERT INTO formula.plastic_paint_bottom_top
(id, bottom_top_name, create_time, disable_time)
VALUES(uuid_generate_v1(), 'N/A', now(), null);

-- INIT paint type

INSERT INTO formula.plastic_paint_type
(id, type_name, create_time, disable_time)
VALUES(uuid_generate_v1(), 'PU_painting', now(), NULL);

INSERT INTO formula.plastic_paint_type
(id, type_name, create_time, disable_time)
VALUES(uuid_generate_v1(), 'Rubber_painting', now(), NULL);

INSERT INTO formula.plastic_paint_type
(id, type_name, create_time, disable_time)
VALUES(uuid_generate_v1(), 'NCVM', now(), NULL);

INSERT INTO formula.plastic_paint_type
(id, type_name, create_time, disable_time)
VALUES(uuid_generate_v1(), 'UV_painting', now(), NULL);


-- init plastic paint color

INSERT INTO formula.plastic_paint_color
(id, color_name, create_time, disable_time)
VALUES(uuid_generate_v1(), '一般或霧面(黑/灰/銀)', now(), null);

INSERT INTO formula.plastic_paint_color
(id, color_name, create_time, disable_time)
VALUES(uuid_generate_v1(), '彩色或高光(金/紅/藍)', now(), null);

INSERT INTO formula.plastic_paint_color
(id, color_name, create_time, disable_time)
VALUES(uuid_generate_v1(), 'Soft Touch', now(), null);

INSERT INTO formula.plastic_paint_color
(id, color_name, create_time, disable_time)
VALUES(uuid_generate_v1(), 'N/A', now(), null);

-- init plastic_paint_type_color

INSERT INTO formula.plastic_paint_type_color
(id, paint_color_id, paint_type_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_color where color_name = '一般或霧面(黑/灰/銀)'),(select id from formula.plastic_paint_type where type_name = 'UV_painting' ), now(), null);

INSERT INTO formula.plastic_paint_type_color
(id, paint_color_id, paint_type_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_color where color_name = '彩色或高光(金/紅/藍)'),(select id from formula.plastic_paint_type where type_name = 'UV_painting' ), now(), null);

INSERT INTO formula.plastic_paint_type_color
(id, paint_color_id, paint_type_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_color where color_name = 'Soft Touch'),(select id from formula.plastic_paint_type where type_name = 'UV_painting' ), now(), null);

INSERT INTO formula.plastic_paint_type_color
(id, paint_color_id, paint_type_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_color where color_name = 'N/A'),(select id from formula.plastic_paint_type where type_name = 'UV_painting' ), now(), null);
------
INSERT INTO formula.plastic_paint_type_color
(id, paint_color_id, paint_type_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_color where color_name = 'N/A'),(select id from formula.plastic_paint_type where type_name = 'PU_painting' ), now(), null);

INSERT INTO formula.plastic_paint_type_color
(id, paint_color_id, paint_type_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_color where color_name = 'N/A'),(select id from formula.plastic_paint_type where type_name = 'Rubber_painting' ), now(), null);

INSERT INTO formula.plastic_paint_type_color
(id, paint_color_id, paint_type_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_color where color_name = 'N/A'),(select id from formula.plastic_paint_type where type_name = 'NCVM' ), now(), null);

-- init plastic_paint_vendor_type_color


INSERT INTO formula.plastic_paint_type_color_bottom_top
(id, paint_type_color_id, paint_bottom_top_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_type_color where paint_type_id =(select id from formula.plastic_paint_type where type_name = 'PU_painting')), (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆' ), now(), null);



INSERT INTO formula.plastic_paint_type_color_bottom_top
(id, paint_type_color_id, paint_bottom_top_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_type_color where paint_type_id =(select id from formula.plastic_paint_type where type_name = 'Rubber_painting')), (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆' ), now(), null);


INSERT INTO formula.plastic_paint_type_color_bottom_top
(id, paint_type_color_id, paint_bottom_top_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_type_color where paint_type_id =(select id from formula.plastic_paint_type where type_name = 'NCVM')), (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆' ), now(), null);

INSERT INTO formula.plastic_paint_type_color_bottom_top
(id, paint_type_color_id, paint_bottom_top_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_type_color where paint_type_id =(select id from formula.plastic_paint_type where type_name = 'PU_painting')), (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆' ), now(), null);


INSERT INTO formula.plastic_paint_type_color_bottom_top
(id, paint_type_color_id, paint_bottom_top_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_type_color where paint_type_id =(select id from formula.plastic_paint_type where type_name = 'Rubber_painting')), (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆' ), now(), null);


INSERT INTO formula.plastic_paint_type_color_bottom_top
(id, paint_type_color_id, paint_bottom_top_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_type_color where paint_type_id =(select id from formula.plastic_paint_type where type_name = 'NCVM')), (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆' ), now(), null);



--
INSERT INTO formula.plastic_paint_type_color_bottom_top (id, paint_type_color_id, paint_bottom_top_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_type_color where paint_color_id = (select id from formula.plastic_paint_color where color_name = '一般或霧面(黑/灰/銀)') and paint_type_id = (select id from formula.plastic_paint_type where type_name = 'UV_painting')), (select id  from formula.plastic_paint_bottom_top where bottom_top_name ='面漆') , now(), null);
INSERT INTO formula.plastic_paint_type_color_bottom_top (id, paint_type_color_id, paint_bottom_top_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_type_color where paint_color_id = (select id from formula.plastic_paint_color where color_name = '彩色或高光(金/紅/藍)') and paint_type_id = (select id from formula.plastic_paint_type where type_name = 'UV_painting')), (select id  from formula.plastic_paint_bottom_top where bottom_top_name ='面漆') , now(), null);
INSERT INTO formula.plastic_paint_type_color_bottom_top (id, paint_type_color_id, paint_bottom_top_id, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_type_color where paint_color_id = (select id from formula.plastic_paint_color where color_name = 'Soft Touch') and paint_type_id = (select id from formula.plastic_paint_type where type_name = 'UV_painting')), (select id  from formula.plastic_paint_bottom_top where bottom_top_name ='面漆') , now(), null);
INSERT INTO formula.plastic_paint_type_color_bottom_top (paint_bottom_top_id, paint_type_color_id, create_time, disable_time) VALUES ( (SELECT id FROM formula.plastic_paint_bottom_top WHERE (bottom_top_name = '面漆')), (SELECT id FROM formula.plastic_paint_type_color WHERE (paint_color_id = (SELECT id FROM formula.plastic_paint_color WHERE (color_name='N/A'))) AND (paint_type_id = (SELECT id FROM formula.plastic_paint_type WHERE (type_name='UV_painting')))), now(), null);


--INSERT INTO formula.plastic_paint_type_color_bottom_top (id, paint_type_color_id, paint_bottom_top_id, create_time, disable_time)
--VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_type_color where paint_color_id = (select id from formula.plastic_paint_color where color_name = '一般或霧面(黑/灰/銀)') and paint_type_id = (select id from formula.plastic_paint_type where type_name = 'UV_painting')), (select id  from formula.plastic_paint_bottom_top where bottom_top_name ='面漆') , now(), null);
--INSERT INTO formula.plastic_paint_type_color_bottom_top (id, paint_type_color_id, paint_bottom_top_id, create_time, disable_time)
--VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_type_color where paint_color_id = (select id from formula.plastic_paint_color where color_name = '彩色或高光(金/紅/藍)') and paint_type_id = (select id from formula.plastic_paint_type where type_name = 'UV_painting')), (select id  from formula.plastic_paint_bottom_top where bottom_top_name ='面漆') , now(), null);
--INSERT INTO formula.plastic_paint_type_color_bottom_top (id, paint_type_color_id, paint_bottom_top_id, create_time, disable_time)
--VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_type_color where paint_color_id = (select id from formula.plastic_paint_color where color_name = 'Soft Touch') and paint_type_id = (select id from formula.plastic_paint_type where type_name = 'UV_painting')), (select id  from formula.plastic_paint_bottom_top where bottom_top_name ='面漆') , now(), null);
--INSERT INTO formula.plastic_paint_type_color_bottom_top (id, paint_type_color_id, paint_bottom_top_id, create_time, disable_time)
--VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_type_color where paint_color_id = (select id from formula.plastic_paint_color where color_name = 'Soft Touch') and paint_type_id = (select id from formula.plastic_paint_type where type_name = 'UV_painting')), (select id  from formula.plastic_paint_bottom_top where bottom_top_name ='面漆'), now(), null);
--INSERT INTO formula.plastic_paint_type_color_bottom_top (id, paint_type_color_id, paint_bottom_top_id, create_time, disable_time)
--VALUES(uuid_generate_v1(), (select id from formula.plastic_paint_type_color where paint_color_id = (select id from formula.plastic_paint_color where color_name = '彩色或高光(金/紅/藍)') and paint_type_id = (select id from formula.plastic_paint_type where type_name = 'UV_painting')), (select id  from formula.plastic_paint_bottom_top where bottom_top_name ='面漆') , now(), null);
--INSERT INTO formula.plastic_paint_type_color_bottom_top (paint_bottom_top_id, paint_type_color_id, create_time, disable_time) VALUES ( (SELECT id FROM formula.plastic_paint_bottom_top WHERE (bottom_top_name = '面漆')), (SELECT id FROM formula.plastic_paint_type_color WHERE (paint_color_id = (SELECT id FROM formula.plastic_paint_color WHERE (color_name='N/A'))) AND (paint_type_id = (SELECT id FROM formula.plastic_paint_type WHERE (type_name='UV_painting')))), now(), null);
--INSERT INTO formula.plastic_paint_type_color_bottom_top (paint_bottom_top_id, paint_type_color_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_paint_bottom_top WHERE (bottom_top_name = '面漆')), (SELECT id FROM formula.plastic_paint_type_color WHERE (paint_color_id = (SELECT id FROM formula.plastic_paint_color WHERE (color_name='一般或霧面(黑/灰/銀)'))) AND (paint_type_id = (SELECT id FROM formula.plastic_paint_type WHERE (type_name='UV_painting')))), now(), null);
--INSERT INTO formula.plastic_paint_type_color_bottom_top (paint_bottom_top_id, paint_type_color_id, create_time, disable_time) VALUES ( (SELECT id FROM formula.plastic_paint_bottom_top WHERE (bottom_top_name = '面漆')), (SELECT id FROM formula.plastic_paint_type_color WHERE (paint_color_id = (SELECT id FROM formula.plastic_paint_color WHERE (color_name='N/A'))) AND (paint_type_id = (SELECT id FROM formula.plastic_paint_type WHERE (type_name='UV_painting')))), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = 'Akzo'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = 'Akzo'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = 'Akzo'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '東端'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '東端'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '東端'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '協承昌'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '協承昌'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '協承昌'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '新政豐'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '新政豐'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '新政豐'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '台贏'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '台贏'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '台贏'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '皇冠'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '皇冠'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '皇冠'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '歐歷'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '歐歷'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '歐歷'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = 'Others'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = 'Others'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = 'Others'), now(), null);

--面漆

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = 'Akzo'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = 'Akzo'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = 'Akzo'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '東端'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '東端'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '東端'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '協承昌'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '協承昌'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '協承昌'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '新政豐'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '新政豐'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '新政豐'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '台贏'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '台贏'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '台贏'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '皇冠'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '皇冠'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '皇冠'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '歐歷'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '歐歷'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = '歐歷'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='PU_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = 'Others'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='Rubber_painting')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = 'Others'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='NCVM')
 )
) ,(select id from formula.plastic_paint_vendor where vendor_name = 'Others'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = '一般或霧面(黑/灰/銀)')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='UV_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '歐歷'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = '一般或霧面(黑/灰/銀)')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='UV_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = 'Akzo'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = '彩色或高光(金/紅/藍)')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='UV_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '歐歷'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = '彩色或高光(金/紅/藍)')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='UV_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = 'Akzo'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'Soft Touch')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='UV_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '歐歷'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'Soft Touch')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='UV_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = 'Akzo'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='UV_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = '歐歷'), now(), null);

INSERT INTO formula.plastic_paint_vendor_type_color_bottom_top
(id, type_color_bottom_top_id, paint_vendor_id, create_time, disable_time)
VALUES(uuid_generate_v1(),
(select id from formula.plastic_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.plastic_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.plastic_paint_type_color where paint_color_id =(select id from formula.plastic_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.plastic_paint_type where type_name ='UV_painting')
 )
) ,
(select id from formula.plastic_paint_vendor where vendor_name = 'Akzo'), now(), null);



--- INIT VALUE

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = 'Akzo'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '9.72', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '東端'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '8.05', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '協承昌'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '7.32', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '新政豐'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '8.24', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '台贏'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '8.63', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());




INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '皇冠'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '0', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '歐歷'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '13.16', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = 'Others'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '25', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

-------------------------------------------------------------RUBBER PAINTING


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = 'Akzo'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '22.75', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '東端'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '9.11', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '協承昌'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '7.96', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '新政豐'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '6.19', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '台贏'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '9.55', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());




INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '皇冠'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '7.16', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '歐歷'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '7.96', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = 'Others'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '35', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());
--------------------------NCVM----



INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = 'Akzo'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '9.72', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '東端'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '8.05', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '協承昌'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '7.32', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '新政豐'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '8.24', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '台贏'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '8.63', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());




INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '皇冠'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '0', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = '歐歷'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '13.16', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '底漆' and vendor_name = 'Others'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '25', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

---面漆--------------------------



INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = 'Akzo'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '15.53', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '東端'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '8.6', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '協承昌'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '8.92', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '新政豐'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '8.24', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '台贏'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '9.08', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());




INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '皇冠'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '0', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '歐歷'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '13.16', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'PU_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = 'Others'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '30', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

-------------------------------------------------------------RUBBER PAINTING


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = 'Akzo'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '22.75', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '東端'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '13.85', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '協承昌'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '9.85', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '新政豐'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '14.04', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '台贏'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '18.47', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());




INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '皇冠'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '15.98', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '歐歷'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '15.9', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'Rubber_painting' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = 'Others'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '35', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());
--------------------------NCVM----



INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = 'Akzo'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '15.53', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '東端'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '8.6', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '協承昌'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '8.92', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '新政豐'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '8.24', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '台贏'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '9.08', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());




INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '皇冠'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '0', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = '歐歷'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '13.16', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'NCVM' and color_name = 'N/A' and bottom_top_name = '面漆' and vendor_name = 'Others'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '30', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());



----- uv painting



INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'UV_painting' and color_name = '一般或霧面(黑/灰/銀)' and bottom_top_name = '面漆' and vendor_name = 'Akzo'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '11.2', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());



INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'UV_painting' and color_name = '一般或霧面(黑/灰/銀)' and bottom_top_name = '面漆' and vendor_name = '歐歷'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '11.69', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());

--- 採高

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'UV_painting' and color_name = '彩色或高光(金/紅/藍)' and bottom_top_name = '面漆' and vendor_name = 'Akzo'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '23.47', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());



INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'UV_painting' and color_name = '彩色或高光(金/紅/藍)' and bottom_top_name = '面漆' and vendor_name = '歐歷'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '14.03', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());


--- SOFT

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'UV_painting' and color_name = 'Soft Touch' and bottom_top_name = '面漆' and vendor_name = 'Akzo'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '17.89', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());



INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((
select ppvtcbt.id from
(select a.*, ppv.id as vendor_id, ppv.vendor_name from (
select ppt.type_name, ppc.color_name, ppbt.bottom_top_name, pptcbt.id as type_color_bt_id from formula.plastic_paint_type as ppt, formula.plastic_paint_bottom_top as ppbt, formula.plastic_paint_color as ppc,
formula.plastic_paint_type_color as pptc, formula.plastic_paint_type_color_bottom_top as pptcbt
where ppt.id = pptc.paint_type_id and ppc.id = pptc.paint_color_id and pptcbt.paint_type_color_id = pptc.id and pptcbt.paint_bottom_top_id = ppbt.id
and ppt.disable_time is null and ppc.disable_time is null and pptc.disable_time is null) as a, formula.plastic_paint_vendor as ppv
order by a.type_name, a.color_name)as c
left join formula.plastic_paint_vendor_type_color_bottom_top as ppvtcbt on ppvtcbt.paint_vendor_id = c.vendor_id and ppvtcbt.type_color_bottom_top_id = c.type_color_bt_id
left join formula.parameter_value pv on pv.parameter_id = ppvtcbt.id
where type_name = 'UV_painting' and color_name = 'Soft Touch' and bottom_top_name = '面漆' and vendor_name = '歐歷'
)
, (select id from formula.schedule_date where name = 'housing_plastic_init'), '17.52', 'number', 'plastic_paint_vendor_type_color_bottom_top', now());






INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '50T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '80T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '100T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '130T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '150T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '160T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '180T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '190T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '210T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '240T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '250T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '290T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '300T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '350T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '450T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '500T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '550T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '600T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '650T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '800T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '850T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '1000T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '1100T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '1200T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '1300T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '1400T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '1600T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '1680T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '1800T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '2000T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '2200T', NULL, now(), null);
 INSERT INTO formula.machine (id, ton, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '2500T', NULL, now(), null);


 -----metal_anode_color
INSERT INTO formula.metal_anode_color (id, name, anode_time, ratio, usd_mm2, loss_rate, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '鋁本色', uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_anode_color (id, name, anode_time, ratio, usd_mm2, loss_rate, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '紅色', uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_anode_color (id, name, anode_time, ratio, usd_mm2, loss_rate, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '黑色', uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_anode_color (id, name, anode_time, ratio, usd_mm2, loss_rate, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '銀色', uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_anode_color (id, name, anode_time, ratio, usd_mm2, loss_rate, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '灰色', uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_anode_color (id, name, anode_time, ratio, usd_mm2, loss_rate, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '香檳金', uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_anode_color (id, name, anode_time, ratio, usd_mm2, loss_rate, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '紫色', uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_anode_color (id, name, anode_time, ratio, usd_mm2, loss_rate, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '綠色', uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_anode_color (id, name, anode_time, ratio, usd_mm2, loss_rate, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '粉色', uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), uuid_generate_v1(), NULL, now(), null);


 --paramater_value
  INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT anode_time FROM formula.metal_anode_color WHERE (name = '鋁本色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '30', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT ratio FROM formula.metal_anode_color WHERE (name = '鋁本色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '1.00', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_mm2 FROM formula.metal_anode_color WHERE (name = '鋁本色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '15.00', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT loss_rate FROM formula.metal_anode_color WHERE (name = '鋁本色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), 0.15, 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT anode_time FROM formula.metal_anode_color WHERE (name = '紅色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '45', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT ratio FROM formula.metal_anode_color WHERE (name = '紅色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '1.50', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_mm2 FROM formula.metal_anode_color WHERE (name = '紅色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '18.00', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT loss_rate FROM formula.metal_anode_color WHERE (name = '紅色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), 0.25, 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT anode_time FROM formula.metal_anode_color WHERE (name = '黑色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '50', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT ratio FROM formula.metal_anode_color WHERE (name = '黑色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '1.67', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_mm2 FROM formula.metal_anode_color WHERE (name = '黑色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '21.00', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT loss_rate FROM formula.metal_anode_color WHERE (name = '黑色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), 0.25, 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT anode_time FROM formula.metal_anode_color WHERE (name = '銀色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '30', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT ratio FROM formula.metal_anode_color WHERE (name = '銀色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '1.00', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_mm2 FROM formula.metal_anode_color WHERE (name = '銀色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '15.00', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT loss_rate FROM formula.metal_anode_color WHERE (name = '銀色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), 0.15, 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT anode_time FROM formula.metal_anode_color WHERE (name = '灰色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '30', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT ratio FROM formula.metal_anode_color WHERE (name = '灰色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '1.00', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_mm2 FROM formula.metal_anode_color WHERE (name = '灰色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '18.00', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT loss_rate FROM formula.metal_anode_color WHERE (name = '灰色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), 0.2, 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT anode_time FROM formula.metal_anode_color WHERE (name = '香檳金')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '45', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT ratio FROM formula.metal_anode_color WHERE (name = '香檳金')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '1.00', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_mm2 FROM formula.metal_anode_color WHERE (name = '香檳金')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '18.00', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT loss_rate FROM formula.metal_anode_color WHERE (name = '香檳金')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), 0.25, 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT anode_time FROM formula.metal_anode_color WHERE (name = '紫色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '45', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT ratio FROM formula.metal_anode_color WHERE (name = '紫色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '1.50', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_mm2 FROM formula.metal_anode_color WHERE (name = '紫色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '18.00', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT loss_rate FROM formula.metal_anode_color WHERE (name = '紫色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), 0.25, 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT anode_time FROM formula.metal_anode_color WHERE (name = '綠色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '45', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT ratio FROM formula.metal_anode_color WHERE (name = '綠色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '1.50', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_mm2 FROM formula.metal_anode_color WHERE (name = '綠色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '18.00', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT loss_rate FROM formula.metal_anode_color WHERE (name = '綠色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), 0.3, 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT anode_time FROM formula.metal_anode_color WHERE (name = '粉色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '45', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT ratio FROM formula.metal_anode_color WHERE (name = '粉色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '1.50', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_mm2 FROM formula.metal_anode_color WHERE (name = '粉色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '18.00', 'number', 'metal_anode_color', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT loss_rate FROM formula.metal_anode_color WHERE (name = '粉色')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), 0.3, 'number', 'metal_anode_color', now());

  --metal_painting
 INSERT INTO formula.metal_painting (id, painting_name, usd_kg, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '粉體漆：(一般素色)', uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_painting (id, painting_name, usd_kg, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '粉體漆：(特殊顏色)', uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_painting (id, painting_name, usd_kg, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '液體漆：(一般顏色)', uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_painting (id, painting_name, usd_kg, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '液體漆：(Pike Silver 1 coat PU)', uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_painting (id, painting_name, usd_kg, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '液體漆：(Shadow Black  1 coat PU with transparency and Black primer)', uuid_generate_v1(),
NULL, now(), null);
 INSERT INTO formula.metal_painting (id, painting_name, usd_kg, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '液體漆：(Shadow Black 1 coat PU)', uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_painting (id, painting_name, usd_kg, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '液體漆：(Mineral Silver 1 coat PU)', uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_painting (id, painting_name, usd_kg, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '液體漆：(Turbo Silver-Ano 1 coat PU)', uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_painting (id, painting_name, usd_kg, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '液體漆：(Q-Coat Dragonfly Blue)', uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_painting (id, painting_name, usd_kg, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '液體漆：(Q-Coat Cardinal Red)', uuid_generate_v1(), NULL, now(), null);
 INSERT INTO formula.metal_painting (id, painting_name, usd_kg, remark, create_time, disable_time) VALUES (uuid_generate_v1(), '液體漆：(UV soft touch)', uuid_generate_v1(), NULL, now(), null);

 --parameter_value
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_kg FROM formula.metal_painting WHERE (painting_name = '粉體漆：(一般素色)')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '5.7554', 'number', 'metal_painting', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_kg FROM formula.metal_painting WHERE (painting_name = '粉體漆：(特殊顏色)')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '15.8273', 'number', 'metal_painting', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_kg FROM formula.metal_painting WHERE (painting_name = '液體漆：(一般顏色)')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '11.5108', 'number', 'metal_painting', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_kg FROM formula.metal_painting WHERE (painting_name = '液體漆：(Pike Silver 1 coat PU)')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '14.3', 'number', 'metal_painting', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_kg FROM formula.metal_painting WHERE (painting_name = '液體漆：(Shadow Black  1 coat PU with transparency and Black primer)')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '25.84', 'number', 'metal_painting', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_kg FROM formula.metal_painting WHERE (painting_name = '液體漆：(Shadow Black 1 coat PU)')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '13.48', 'number', 'metal_painting', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_kg FROM formula.metal_painting WHERE (painting_name = '液體漆：(Mineral Silver 1 coat PU)')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '11.51', 'number', 'metal_painting', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_kg FROM formula.metal_painting WHERE (painting_name = '液體漆：(Turbo Silver-Ano 1 coat PU)')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '17.38', 'number', 'metal_painting', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_kg FROM formula.metal_painting WHERE (painting_name = '液體漆：(Q-Coat Dragonfly Blue)')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '17.5', 'number', 'metal_painting', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_kg FROM formula.metal_painting WHERE (painting_name = '液體漆：(Q-Coat Cardinal Red)')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '28.4400', 'number', 'metal_painting', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT usd_kg FROM formula.metal_painting WHERE (painting_name = '液體漆：(UV soft touch)')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) )), '21.5827', 'number', 'metal_painting', now());

--common paramter
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_management_and_profit', NULL, 'management_and_profit', NULL, '管銷利潤', 'total管銷&利潤常數', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_failure_rate', NULL, '塗裝噴漆費 噴塗不良率', '塗裝噴漆費_噴塗不良率', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_single_bottom_failure_rate', NULL, '單件底漆 噴塗不良率', '塗裝噴漆費_單件底漆噴塗不良率', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_printingable_amount_ratio', NULL, '固含量比例', '塗裝噴漆費_printingable_amount_固含量比例', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_printingable_amount_density', NULL, '密度', '塗裝噴漆費_printingable_amount_密度', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_top_area_L', NULL, '面積寬放(L)', '塗裝噴漆費_頂面噴塗面積_L', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_top_area_W', NULL, '面積寬放(W)', '塗裝噴漆費_頂面噴塗面積_W', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_side_LH_area_L', NULL, '面積寬放(L)', '塗裝噴漆費_側面(L*H)噴塗面積_L', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_side_LH_area_W', NULL, '面積寬放(W)', '塗裝噴漆費_側面(L*H)噴塗面積_W', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_side_WH_area_L', NULL, '面積寬放(L)', '塗裝噴漆費_側面(W*H)噴塗面積 _L', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_side_WH_area_W', NULL, '面積寬放(W)', '塗裝噴漆費_側面(W*H)噴塗面積 _W', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_single_finishing_failure_rate', NULL, '單件面漆 噴塗不良率', '塗裝噴漆費_單件面漆_噴塗不良率', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_paint', NULL, 'paint_single_finishing_loss_rate', '%', '噴漆塗料損耗', '塗裝噴漆費_單件面漆_噴漆塗料損耗', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'cnc_processing_area_cost', NULL, '局部加工 CNC Area 單價', '二次加工費_局部加工_CNC Area單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'cnc_processing_area_loss_rate', '%', '局部加工 CNC Area loss rate', '二次加工費_局部加工_CNC Area loss_rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'cnc_processing_manual_cost', NULL, '局部加工 CNC人工單價', '二次加工費_局部加工_CNC人工單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'cnc_processing_manual_loss_rate', '%', '局部加工 CNC人工 loss rate', '二次加工費_局部加工_CNC人工 loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'cnc_remove_area_cost', NULL, '除料頭 CNC單價', '二次加工費_除料頭_CNC單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'cnc_remove_area_loss_rate', '%', '除料頭 CNCloss rate', '二次加工費_除料頭_CNCloss_rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'cnc_remove_manual_cost', NULL, '除料頭 CNC人工單價', '二次加工費_除料頭_CNC人工單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'cnc_remove_manual_loss_rate', NULL, '除料頭 CNC人工loss rate', '二次加工費_除料頭_CNC人工 loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'hot_melt_cost', NULL, '熱熔 單價', '二次加工費_熱熔_單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'hot_melt_loss_rate', '%', '熱熔 loss rate', '二次加工費_熱熔_loss_rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'bonding_cost', NULL, 'Bonding 單價', '二次加工費_Bonding_單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'bonding_loss_rate', NULL, 'Bonding loss rate', '二次加工費_Bonding_loss_rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'polish_strss_line_cost', NULL, 'Polish應力痕 單價', '二次加工費_Polish應力痕_單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'polish_strss_line_loss_rate', NULL, 'Polish應力痕 loss rate', '二次加工費_Polish應力痕', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'chip_removal_cost', NULL, '除屑單價', '二次加工費_除屑單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'chip_removal_loss_rate', NULL, '除屑loss rate', '二次加工費_除屑loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'edging_cost', NULL, '滾邊 or 去毛 單價', '二次加工費_滾邊_去毛單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'edging_loss_rate', NULL, '滾邊 or 去毛  loss rate', '二次加工費_滾邊_去毛_loss_rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'laser_engraving_icon_cost', NULL, '鐳雕(icon) 單價', '二次加工費_鐳雕(icon)單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'laser_engraving_icon_loss_rate', '%', '鐳雕(icon) loss rate', '二次加工費_鐳雕(icon) loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'NCVM_cost', NULL, 'NCVM製程 單價', '二次加工費_NCVM製程單價', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'NCVM_loss_rate', NULL, 'NCVM製程 loss rate', '二次加工費_NCVM製程loss rate', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'NCVM_paint_top_area_L', NULL, 'NCVM面積寬放(L)', '二次加工費_NCVM面積寬放(L)', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'NCVM_paint_top_area_W', NULL, 'NCVM面積寬放(W)', '二次加工費_NCVM面積寬放(W)', now(), NULL, null);
 INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'printing_loss_rate', NULL, 'Printing_loss_rate', '二次加工費_Printing_loss_rate', now(), NULL, null);
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'embed_nail_loss_rate', NULL, '埋丁loss_rate', '二次加工費_埋丁loss_rate', now(), NULL, null);
INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type
WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'grinding_loss_rate', NULL, '打磨loss_rate', '二次加工費_打磨loss rate', now(), NULL, null);
----parameter_value
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_management_and_profit') AND (label='management_and_profit')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.15', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_failure_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.2', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_single_bottom_failure_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.2', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_printingable_amount_ratio')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.25', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_printingable_amount_density')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '1.05', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_top_area_L')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '25', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_top_area_W')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '25', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_side_LH_area_L')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '25', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_side_LH_area_W')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '25', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_side_WH_area_L')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '25', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_side_WH_area_W')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '25', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_single_finishing_failure_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.2', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_paint') AND (label='paint_single_finishing_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), 0.05, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='cnc_processing_area_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.065', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='cnc_processing_area_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), 0, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='cnc_processing_manual_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.065', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='cnc_processing_manual_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), 0, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='cnc_remove_area_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.1', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='cnc_remove_area_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), 0, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='cnc_remove_manual_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.1', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='cnc_remove_manual_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='hot_melt_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.03', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='hot_melt_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.035', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='bonding_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.3', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='bonding_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='polish_strss_line_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.1', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='polish_strss_line_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='chip_removal_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.1', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='chip_removal_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='edging_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.1', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='edging_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='laser_engraving_icon_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.045', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='laser_engraving_icon_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), 0, 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='NCVM_cost')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.0004', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='NCVM_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='NCVM_paint_top_area_L')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '6', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='NCVM_paint_top_area_W')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '6', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='printing_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='embed_nail_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0', 'number', 'common_parameter', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='grinding_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0', 'number', 'common_parameter', now());


 --emi site
 INSERT INTO formula.site (site_name, create_time, remark) VALUES ('WKS', now(), NULL);
 INSERT INTO formula.site (site_name, create_time, remark) VALUES ('WZS', now(), NULL);
 INSERT INTO formula.site (site_name, create_time, remark) VALUES ('WCQ', now(), NULL);
 INSERT INTO formula.site (site_name, create_time, remark) VALUES ('WCD', now(), NULL);

  -- plastic_emi_group
 INSERT INTO formula.plastic_emi_sputtering_group(id, group_name, remark, create_time, disable_time)VALUES(uuid_generate_v1(), '1', NULL, now(), null);
 INSERT INTO formula.plastic_emi_sputtering_group(id, group_name, remark, create_time, disable_time)VALUES(uuid_generate_v1(), '2', NULL, now(), null);


 --site group
INSERT INTO formula.plastic_emi_sputtering_site_group (group_id, site_id, remark, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name = '1')), (SELECT id FROM formula.site WHERE (site_name = 'WKS')), NULL, now(), null);
 INSERT INTO formula.plastic_emi_sputtering_site_group (group_id, site_id, remark, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name = '1')), (SELECT id FROM formula.site WHERE (site_name = 'WZS')), NULL, now(), null);
 INSERT INTO formula.plastic_emi_sputtering_site_group (group_id, site_id, remark, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name = '2')), (SELECT id FROM formula.site WHERE (site_name = 'WCQ')), NULL, now(), null);
 INSERT INTO formula.plastic_emi_sputtering_site_group (group_id, site_id, remark, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name = '2')), (SELECT id FROM formula.site WHERE (site_name = 'WCD')), NULL, now(), null);

--emi size
 INSERT INTO formula.plastic_emi_sputtering_size (id, emi_size, "size", remark, disable_time) VALUES (uuid_generate_v1(), 'N/A', 0, NULL, null);
 INSERT INTO formula.plastic_emi_sputtering_size (id, emi_size, "size", remark, disable_time) VALUES (uuid_generate_v1(), '10"', 10, NULL, null);
 INSERT INTO formula.plastic_emi_sputtering_size (id, emi_size, "size", remark, disable_time) VALUES (uuid_generate_v1(), '11"', 11, NULL, null);
 INSERT INTO formula.plastic_emi_sputtering_size (id, emi_size, "size", remark, disable_time) VALUES (uuid_generate_v1(), '12"', 12, NULL, null);
 INSERT INTO formula.plastic_emi_sputtering_size (id, emi_size, "size", remark, disable_time) VALUES (uuid_generate_v1(), '13"', 13, NULL, null);
 INSERT INTO formula.plastic_emi_sputtering_size (id, emi_size, "size", remark, disable_time) VALUES (uuid_generate_v1(), '14"', 14, NULL, null);
 INSERT INTO formula.plastic_emi_sputtering_size (id, emi_size, "size", remark, disable_time) VALUES (uuid_generate_v1(), '15"', 15, NULL, null);
 INSERT INTO formula.plastic_emi_sputtering_size (id, emi_size, "size", remark, disable_time) VALUES (uuid_generate_v1(), '16"', 16, NULL, null);
 INSERT INTO formula.plastic_emi_sputtering_size (id, emi_size, "size", remark, disable_time) VALUES (uuid_generate_v1(), '17"', 17, NULL, null);

--emi base
INSERT INTO formula.plastic_emi_sputtering_base (id, emi_base, remark, disable_time, create_time) VALUES (uuid_generate_v1(), 'PC+ABS', NULL, null, now());
 INSERT INTO formula.plastic_emi_sputtering_base (id, emi_base, remark, disable_time, create_time) VALUES (uuid_generate_v1(), 'PC+GF≦25%', NULL, null, now());
 INSERT INTO formula.plastic_emi_sputtering_base (id, emi_base, remark, disable_time, create_time) VALUES (uuid_generate_v1(), 'PC+GF>25%', NULL, null, now());

--plastic_emi_sputtering_link
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = 'N/A')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);
 INSERT INTO formula.plastic_emi_sputtering_link (group_id, size_id, base_id, create_time, disable_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' )), (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"')), (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')), now(), null);

 --paramater value
  INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.2700', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.2700', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3500', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3500', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.4200', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.4400', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.4400', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.5800', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3000', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3000', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3800', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3800', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.4200', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.4400', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.4400', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.5800', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3000', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3000', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3800', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3800', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.4700', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.5300', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.5300', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '1' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.6300', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3500', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3500', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3900', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3900', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.4300', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.4600', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.4600', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+ABS')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.5800', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3500', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3500', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3900', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3900', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.4300', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.4600', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.4600', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF≦25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.5800', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '10"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3500', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '11"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3500', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '12"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3900', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '13"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.3900', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '14"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.4700', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '15"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.5300', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '16"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.5300', 'number', 'plastic_emi_sputtering_link', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.plastic_emi_sputtering_link WHERE (group_id = (SELECT id FROM formula.plastic_emi_sputtering_group WHERE (group_name= '2' ) AND (size_id = (SELECT id FROM formula.plastic_emi_sputtering_size WHERE (emi_size = '17"') AND (base_id = (SELECT id FROM formula.plastic_emi_sputtering_base WHERE (emi_base = 'PC+GF>25%')))))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic' )) )), '0.6300', 'number', 'plastic_emi_sputtering_link', now());


 --module
INSERT INTO formula.module (id, module_name, create_time, remark, disable_time) VALUES (uuid_generate_v1(), 'module_1', now(), NULL, null);
 INSERT INTO formula.module (id, module_name, create_time, remark, disable_time) VALUES (uuid_generate_v1(), 'module_2', now(), NULL, null);
 INSERT INTO formula.module (id, module_name, create_time, remark, disable_time) VALUES (uuid_generate_v1(), 'module_3', now(), NULL, null);
 INSERT INTO formula.module (id, module_name, create_time, remark, disable_time) VALUES (uuid_generate_v1(), 'module_4', now(), NULL, null);
 INSERT INTO formula.module (id, module_name, create_time, remark, disable_time) VALUES (uuid_generate_v1(), 'module_5', now(), NULL, null);
 INSERT INTO formula.module (id, module_name, create_time, remark, disable_time) VALUES (uuid_generate_v1(), 'module_6', now(), NULL, null);
 INSERT INTO formula.module (id, module_name, create_time, remark, disable_time) VALUES (uuid_generate_v1(), 'module_7', now(), NULL, null);

--module_ctgy2
INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.product_type
WHERE (type_name= 'NB')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'Plastic' )), null);
 INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.product_type
WHERE (type_name= 'DT')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'Plastic' )), null);
--  INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.product_type
-- WHERE (type_name= 'DT/EBG')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'Plastic' )), null);
 INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.product_type
WHERE (type_name= 'NB')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'RHCM_Process')), null);
 INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.product_type
WHERE (type_name= 'DT')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'RHCM_Process')), null);
 INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.product_type
WHERE (type_name= 'NB')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'IMR')), null);
 INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.product_type
WHERE (type_name= 'NB')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'Double_Injection')), null);

 INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.product_type
WHERE (type_name= 'DT')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'Double_Injection')), null);

INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.product_type
WHERE (type_name= 'NB')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'Painting')), null);
 INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.product_type
WHERE (type_name= 'DT')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'Painting')), null);
INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.product_type
WHERE (type_name= 'OTHERS')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'Painting')), null);

INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.product_type
WHERE (type_name= 'NB')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'Insert_Molding')), null);
 INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.product_type
WHERE (type_name= 'DT')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'Insert_Molding')), null);
INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.product_type
WHERE (type_name= 'OTHERS')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'Insert_Molding')), null);

INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.product_type
WHERE (type_name= 'OTHERS')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'Plastic' )), null);
 INSERT INTO formula.product_type_category_module (module_id, product_type_id, part_category_2_id, disable_time) VALUES ((SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.product_type
WHERE (type_name= 'OTHERS')), (SELECT id FROM formula.part_category_2 WHERE (part_category_1_id = (SELECT id FROM formula.part_category_1 WHERE (category_name = 'Housing'))) AND (category_name= 'Double_Injection')), null);



--

 ---module machine
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '50T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '80T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '100T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '130T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '150T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '160T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '180T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '190T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '210T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '240T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '250T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '290T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '300T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '350T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '450T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '500T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '550T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '600T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '650T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '800T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '850T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '1000T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '1100T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '1200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '1300T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '1400T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '1600T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '1680T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '1800T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '2000T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '2200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_1')), (SELECT id FROM formula.machine WHERE (ton= '2500T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '50T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '80T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '100T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '130T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '150T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '160T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '180T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '190T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '210T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '240T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '250T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '290T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '300T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '350T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '450T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '500T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '550T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '600T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '650T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '800T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '850T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '1000T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '1100T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '1200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '1300T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '1400T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '1600T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '1680T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '1800T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '2000T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '2200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_2')), (SELECT id FROM formula.machine WHERE (ton= '2500T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '50T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '80T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '100T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '130T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '150T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '160T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '180T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '190T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '210T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '240T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '250T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '290T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '300T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '350T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '450T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '500T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '550T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '600T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '650T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '800T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '850T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '1000T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '1100T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '1200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '1300T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '1400T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '1600T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '1680T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '1800T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '2000T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '2200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_3')), (SELECT id FROM formula.machine WHERE (ton= '2500T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '50T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '80T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '100T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '130T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '150T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '160T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '180T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '190T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '210T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '240T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '250T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '290T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '300T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '350T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '450T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '500T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '550T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '600T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '650T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '800T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '850T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '1000T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '1100T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '1200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '1300T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '1400T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '1600T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '1680T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '1800T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '2000T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '2200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_4')), (SELECT id FROM formula.machine WHERE (ton= '2500T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '50T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '80T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '100T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '130T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '150T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '160T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '180T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '190T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '210T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '240T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '250T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '290T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '300T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '350T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '450T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '500T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '550T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '600T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '650T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '800T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '850T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '1000T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '1100T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '1200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '1300T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '1400T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '1600T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '1680T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '1800T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '2000T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '2200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_5')), (SELECT id FROM formula.machine WHERE (ton= '2500T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '50T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '80T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '100T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '130T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '150T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '160T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '180T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '190T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '210T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '240T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '250T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '290T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '300T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '350T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '450T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '500T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '550T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '600T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '650T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '800T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '850T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '1000T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '1100T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '1200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '1300T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '1400T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '1600T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '1680T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '1800T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '2000T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '2200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_6')), (SELECT id FROM formula.machine WHERE (ton= '2500T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '50T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '80T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '100T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '130T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '150T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '160T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '180T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '190T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '210T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '240T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '250T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '290T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '300T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '350T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '450T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '500T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '550T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '600T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '650T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '800T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '850T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '1000T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '1100T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '1200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '1300T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '1400T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '1600T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '1680T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '1800T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '2000T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '2200T')), now(), null);
 INSERT INTO formula.module_machine (id, module_id, machine_id, create_time, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.module WHERE (module_name= 'module_7')), (SELECT id FROM formula.machine WHERE (ton= '2500T')), now(), null);
 --parameter value
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '50T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1059', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '80T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1059', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '100T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1059', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '130T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1271', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '150T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1271', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '160T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1271', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '180T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1482', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '190T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1482', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '210T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1482', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '240T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1694', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '250T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1694', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '290T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1906', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '300T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1906', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '350T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2118', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '450T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2541', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '500T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2753', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '550T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2965', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '600T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3172', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '650T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3388', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '800T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3800', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '850T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.4120', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1000T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.4440', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1100T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.4750', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1200T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.5470', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1300T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.5700', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1400T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.6340', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1600T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.6870', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1680T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.6870', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1800T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.7360', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2000T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.8660', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2200T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.9170', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_1') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2500T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.9790', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '50T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.0790', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '80T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.0790', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '100T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.0950', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '130T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1110', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '150T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1270', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '160T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1270', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '180T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1270', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '190T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1270', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '210T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1270', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '240T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1580', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '250T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1580', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '290T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1588', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '300T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1588', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '350T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1900', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '450T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2530', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '500T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2850', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '550T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2850', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '600T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2850', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '650T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3170', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '800T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3800', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '850T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.4120', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1000T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.4440', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1100T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.4750', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1200T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.5470', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1300T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.5700', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1400T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.6340', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1600T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.6870', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1680T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.6870', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1800T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.7360', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2000T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.8660', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2200T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.9170', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_2') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2500T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.9790', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '50T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.0754', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '80T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.0754', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '100T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.0908', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '130T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1062', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '150T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1215', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '160T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1215', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '180T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1215', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '190T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1215', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '210T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1215', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '240T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1508', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '250T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1508', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '290T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1508', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '300T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1508', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '350T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1815', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '450T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2431', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '500T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2723', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '550T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2723', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '600T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2723', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '650T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3031', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '800T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3631', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '850T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3938', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1000T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.4246', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1100T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.4538', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1200T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.5231', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1300T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.5446', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1400T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.6062', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1600T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.6569', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1680T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.6569', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1800T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.7031', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2000T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.8277', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2200T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.8769', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_3') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2500T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.9354', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '50T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1694', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '80T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2118', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '100T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2118', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '130T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2541', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '150T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2541', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '160T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2541', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '180T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2965', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '190T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2965', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '210T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2965', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '240T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3388', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '250T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3388', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '290T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3812', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '300T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3812', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '350T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.4235', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '450T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.5082', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '500T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.5506', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '550T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.5812', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '600T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.5812', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '650T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.6776', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '800T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.8329', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_4') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '850T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.8894', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '250T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3431', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '290T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3431', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '300T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3431', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '350T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.3738', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '450T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.5815', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '500T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.6108', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '550T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.6108', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '600T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.6108', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '650T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.6415', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '800T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.7015', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '850T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.7323', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1000T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.8769', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1100T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.9062', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1200T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.9754', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1300T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.9969', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1400T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.0585', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1600T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.1092', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1680T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.1092', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1800T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.1554', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2000T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.2800', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2200T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.3292', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_5') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2500T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.3877', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '80T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.1765', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '100T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.1765', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '130T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2118', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '150T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2118', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '160T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2118', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '180T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2471', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '190T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2471', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '210T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2471', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '240T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2824', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '250T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2824', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '290T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.3176', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '300T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.3176', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '350T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.3529', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '450T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.4235', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '500T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.4588', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '550T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.4941', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '600T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.4941', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '650T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.5647', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '800T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.6635', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_6') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '850T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.7059', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '50T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2118', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '80T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.2118', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '100T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2118', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '130T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2542', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '150T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2542', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '160T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2542', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '180T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2964', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '190T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2964', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '210T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.2964', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '240T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.3388', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '250T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.3388', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '290T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.3812', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '300T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.3812', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '350T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.4236', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '450T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.5082', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '500T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.5506', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '550T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.5930', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '600T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.6344', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '650T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.6776', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '800T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.7600', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '850T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )))), '0.8240', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1000T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.8880', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1100T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '0.9500', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1200T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.094', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1300T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.1400', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1400T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.2680', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1600T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.3740', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1680T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.3740', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '1800T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.4720', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2000T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.7320', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2200T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.8340', 'number', 'module_machine', now());
 INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.module_machine WHERE (module_id = (SELECT id FROM formula.module WHERE (module_name= 'module_7') AND (machine_id = (SELECT id FROM formula.machine WHERE (ton= '2500T')))))), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic'  )) )), '1.9580', 'number', 'module_machine', now());



---value

INSERT INTO formula.metal_syringe (id, syringe_name, syringe_diameter, create_time, disable_time) VALUES(uuid_generate_v1(), '0.2', uuid_generate_v1(), now(), null);
INSERT INTO formula.metal_syringe (id, syringe_name, syringe_diameter, create_time, disable_time) VALUES(uuid_generate_v1(), '0.4', uuid_generate_v1(), now(), null);
INSERT INTO formula.metal_syringe (id, syringe_name, syringe_diameter, create_time, disable_time) VALUES(uuid_generate_v1(), '0.6', uuid_generate_v1(), now(), null);
INSERT INTO formula.metal_syringe (id, syringe_name, syringe_diameter, create_time, disable_time) VALUES(uuid_generate_v1(), '0.8', uuid_generate_v1(), now(), null);
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) values
((select syringe_diameter from formula.metal_syringe where syringe_name = '0.2'), (select id from formula.schedule_date sd where sd."name" = 'housing_metal_init'), '0.2', 'number', 'metal_syringe'),
((select syringe_diameter from formula.metal_syringe where syringe_name = '0.4'), (select id from formula.schedule_date sd where sd."name" = 'housing_metal_init'), '0.4', 'number', 'metal_syringe'),
((select syringe_diameter from formula.metal_syringe where syringe_name = '0.6'), (select id from formula.schedule_date sd where sd."name" = 'housing_metal_init'), '0.6', 'number', 'metal_syringe'),
((select syringe_diameter from formula.metal_syringe where syringe_name = '0.8'), (select id from formula.schedule_date sd where sd."name" = 'housing_metal_init'), '0.8', 'number', 'metal_syringe');


INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id, create_time) values
((select pc2.id from formula.part_category_2 pc2 where pc2.category_name = 'Plastic'), (select id from formula.formula_type where name = 'housing_plastic'), now()),
((select pc2.id from formula.part_category_2 pc2 where pc2.category_name = 'Plastic_NB'), (select id from formula.formula_type where name = 'housing_plastic'), now()),
((select pc2.id from formula.part_category_2 pc2 where pc2.category_name = 'Double_Injection'), (select id from formula.formula_type where name = 'housing_plastic'), now()),
((select pc2.id from formula.part_category_2 pc2 where pc2.category_name = 'IMR'), (select id from formula.formula_type where name = 'housing_plastic'), now()),
((select pc2.id from formula.part_category_2 pc2 where pc2.category_name = 'RHCM_Process'), (select id from formula.formula_type where name = 'housing_plastic'), now()),
((select pc2.id from formula.part_category_2 pc2 where pc2.category_name = 'Painting'), (select id from formula.formula_type where name = 'housing_plastic'), now());

INSERT INTO formula.part_category_formula_type (part_category_2_id, formula_type_id, create_time) values
((select pc2.id from formula.part_category_2 pc2 where pc2.category_name = 'Metal'), (select id from formula.formula_type where name = 'housing_metal'), now()),
((select pc2.id from formula.part_category_2 pc2 where pc2.category_name = 'Aluminum'), (select id from formula.formula_type where name = 'housing_metal'), now()),
((select pc2.id from formula.part_category_2 pc2 where pc2.category_name = 'Shielding_Can'), (select id from formula.formula_type where name = 'housing_metal'), now());

INSERT INTO formula.plastic_paint_process (id,process_name,remark,create_time,disable_time) VALUES
('dac2bc74-e975-11e9-91db-0242ac110002','一般噴塗',NULL,now(),null)
,('dac65c4e-e975-11e9-91db-0242ac110002','RHCM',NULL,now(),null)
,('dac9c8fc-e975-11e9-91db-0242ac110002','碳纖板',NULL,now(),null)
,('dacdffee-e975-11e9-91db-0242ac110002','NCVM',NULL,now(),null);

-- INIT plastic_paint_info
INSERT INTO formula.plastic_paint_info
(id, product_type_id, usd_min, man_hour, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'), uuid_generate_v1(), uuid_generate_v1(), now(), null);
INSERT INTO formula.plastic_paint_info
(id, product_type_id, usd_min, man_hour, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'), uuid_generate_v1(), uuid_generate_v1(), now(), null);
INSERT INTO formula.plastic_paint_info
(id, product_type_id, usd_min, man_hour, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'), uuid_generate_v1(), uuid_generate_v1(), now(), null);

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select usd_min from formula.plastic_paint_info where product_type_id = (select id from formula.product_type where type_name = 'NB' )), (select id from formula.schedule_date where name = 'housing_plastic_init'), '0.055', 'number', 'plastic_paint_info', now());
INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select usd_min from formula.plastic_paint_info where product_type_id = (select id from formula.product_type where type_name = 'DT' )), (select id from formula.schedule_date where name = 'housing_plastic_init'), '0.07', 'number', 'plastic_paint_info', now());
INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select usd_min from formula.plastic_paint_info where product_type_id = (select id from formula.product_type where type_name = 'OTHERS' )), (select id from formula.schedule_date where name = 'housing_plastic_init'), '0.043', 'number', 'plastic_paint_info', now());
INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select man_hour from formula.plastic_paint_info where product_type_id = (select id from formula.product_type where type_name = 'NB' )), (select id from formula.schedule_date where name = 'housing_plastic_init'), '20', 'number', 'plastic_paint_info', now());
INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select man_hour from formula.plastic_paint_info where product_type_id = (select id from formula.product_type where type_name = 'DT' )), (select id from formula.schedule_date where name = 'housing_plastic_init'), '8', 'number', 'plastic_paint_info', now());
INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select man_hour from formula.plastic_paint_info where product_type_id = (select id from formula.product_type where type_name = 'OTHERS' )), (select id from formula.schedule_date where name = 'housing_plastic_init'), '10', 'number', 'plastic_paint_info', now());


-- init plastic_grinding
INSERT INTO formula.plastic_grinding
(id, grinding_name,  total_cost, create_time, disable_time)
VALUES(uuid_generate_v1(), '人工+自動', uuid_generate_v1(), now(), null);

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select total_cost from formula.plastic_grinding where grinding_name ='人工+自動') ,
(select id from formula.schedule_date where name = 'housing_plastic_init') , '0.1932', 'number', 'plastic_grinding', now());


ALTER TABLE wiprocurement.drop_down_item ADD column IF NOT EXISTS disable_time timestamptz NULL;

--assy
 INSERT INTO formula.gb_assy_ctgy (id, gb_assy_ctgy_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'gb_assy_ctgy') AND (PATH = 'LCDCOV')), 'LCD Cover', 'now()');
 INSERT INTO formula.gb_assy_ctgy (id, gb_assy_ctgy_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'gb_assy_ctgy') AND (PATH = 'LCDBZL')), 'LCD Bezel', 'now()');
 INSERT INTO formula.gb_assy_ctgy (id, gb_assy_ctgy_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'gb_assy_ctgy') AND (PATH = 'UC')), 'U-Case', 'now()');
 INSERT INTO formula.gb_assy_ctgy (id, gb_assy_ctgy_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'gb_assy_ctgy') AND (PATH = 'LC')), 'L-Case', 'now()');
 INSERT INTO formula.gb_assy_ctgy (id, gb_assy_ctgy_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'gb_assy_ctgy') AND (PATH = 'PCB')), 'PCB', 'now()');
 INSERT INTO formula.gb_assy_ctgy (id, gb_assy_ctgy_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'gb_assy_ctgy') AND (PATH = 'KBSPRT')), 'KB Support', 'now()');
 INSERT INTO formula.gb_assy_ctgy (id, gb_assy_ctgy_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'gb_assy_ctgy') AND (PATH = 'LCDDCLV')), 'LCD DC-Level', 'now()');
 INSERT INTO formula.gb_assy_ctgy (id, gb_assy_ctgy_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'gb_assy_ctgy') AND (PATH = 'SYSDCLV')), 'System DC-Level', 'now()');
 INSERT INTO formula.gb_assy_ctgy (id, gb_assy_ctgy_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'gb_assy_ctgy') AND (PATH = 'OTHERPART')), 'OTHER PART', 'now()');
 INSERT INTO formula.gb_assy_ctgy (id, gb_assy_ctgy_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'gb_assy_ctgy') AND (PATH = 'OTHER60ASSY')), 'OTHER 60 ASSY', 'now()');

 --suuply type
 INSERT INTO formula.supply_type (id, supply_type_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'supply_type') AND (PATH = 'CONSIGN')), 'CoSign', 'now()');
 INSERT INTO formula.supply_type (id, supply_type_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'supply_type') AND (PATH = 'AV')), 'AV', 'now()');
 INSERT INTO formula.supply_type (id, supply_type_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'supply_type') AND (PATH = 'AVAP')), 'AVAP', 'now()');

 --odm oem
  INSERT INTO formula.odm_oem (id, odm_oem_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'odm_oem') AND (PATH = 'ODMTYPE')), 'ODM', 'now()');
 INSERT INTO formula.odm_oem (id, odm_oem_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'odm_oem') AND (PATH = 'OEMTYPE')), 'OEM', 'now()');
 INSERT INTO formula.odm_oem (id, odm_oem_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'odm_oem') AND (PATH = 'TBDTYPE')), 'TBD', 'now()');

 --init-add-delete
 INSERT INTO formula.operation (id, operation_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'initaddmodidel') AND (PATH = 'MODIFY')), 'Modify', 'now()');
 INSERT INTO formula.operation (id, operation_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'initaddmodidel') AND (PATH = 'DELETE')), 'Delete', 'now()');
 INSERT INTO formula.operation (id, operation_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'initaddmodidel') AND (PATH = 'ADD')), 'Add', 'now()');
 INSERT INTO formula.operation (id, operation_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'initaddmodidel') AND (PATH = 'INITIAL')), 'Initial', 'now()');

INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'), 'Plastic', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'), 'Plastic', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'), 'Plastic', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'), 'Painting', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'), 'Painting', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'), 'Painting', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'), 'Double_Injection', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'), 'Double_Injection', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'), 'Double_Injection', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'), 'Insert_Molding', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'), 'Insert_Molding', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'), 'Insert_Molding', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'), 'RHCM', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'), 'RHCM', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'), 'RHCM', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'), 'IMR', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'), 'IMR', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'), 'IMR', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'NB'), 'NCVM', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'DT'), 'NCVM', now(), null);
INSERT INTO formula.plastic_paint_man_power
(id, product_type_id, category_name, create_time, disable_time)
VALUES(uuid_generate_v1(), (select id from formula.product_type where type_name = 'OTHERS'), 'NCVM', now(), null);


INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'Plastic'and product_type_id = (select id from formula.product_type where type_name = 'NB')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '12', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'Painting'and product_type_id = (select id from formula.product_type where type_name = 'NB')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '12', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'Double_Injection'and product_type_id = (select id from formula.product_type where type_name = 'NB')),(select id from formula.schedule_date
where name = 'housing_plastic_init'), '12', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'Insert_Molding'and product_type_id = (select id from formula.product_type where type_name = 'NB')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '17', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'RHCM'and product_type_id = (select id from formula.product_type where type_name = 'NB')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '9', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'IMR'and product_type_id = (select id from formula.product_type where type_name = 'NB')),(select id from formula.schedule_date where name =
'housing_plastic_init'), '0', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'NCVM'and product_type_id = (select id from formula.product_type where type_name = 'NB')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '3', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'Plastic'and product_type_id = (select id from formula.product_type where type_name = 'DT')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '12', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'Painting'and product_type_id = (select id from formula.product_type where type_name = 'DT')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '12', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'Double_Injection'and product_type_id = (select id from formula.product_type where type_name = 'DT')),(select id from formula.schedule_date
where name = 'housing_plastic_init'), '12', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'Insert_Molding'and product_type_id = (select id from formula.product_type where type_name = 'DT')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '15', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'RHCM'and product_type_id = (select id from formula.product_type where type_name = 'DT')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '12', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'IMR'and product_type_id = (select id from formula.product_type where type_name = 'DT')),(select id from formula.schedule_date where name =
'housing_plastic_init'), '0', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'NCVM'and product_type_id = (select id from formula.product_type where type_name = 'DT')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '0', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'Plastic'and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '12', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'Painting'and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '12', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'Double_Injection'and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '10', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'Insert_Molding'and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '15', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'RHCM'and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '12', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'IMR'and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '0', 'number', 'plastic_paint_man_power', now());

INSERT INTO formula.parameter_value
(parameter_id, activate_date_id, value, value_type, source_table, create_time)
VALUES((select id from formula.plastic_paint_man_power where category_name = 'NCVM'and product_type_id = (select id from formula.product_type where type_name = 'OTHERS')),(select id from formula.schedule_date where name = 'housing_plastic_init'), '0', 'number', 'plastic_paint_man_power', now());


INSERT INTO formula.plastic_printing (id, printing_name, unit_price, create_time, disable_time) values
(uuid_generate_v1(), '網印', uuid_generate_v1(), now(), null),
(uuid_generate_v1(), '移印', uuid_generate_v1(), now(), null),
(uuid_generate_v1(), '套印', uuid_generate_v1(), now(), null);

INSERT INTO formula.plastic_embed_nail (id, embed_nail_name, unit_price, create_time, disable_time) values
(uuid_generate_v1(), '人工', uuid_generate_v1(), now(), null),
(uuid_generate_v1(), '自動', uuid_generate_v1(), now(), null);

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES
((SELECT unit_price FROM formula.plastic_printing WHERE printing_name='網印'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.04', 'number', 'plastic_printing', now()),
((SELECT unit_price FROM formula.plastic_printing WHERE printing_name='移印'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.045', 'number', 'plastic_printing', now()),
((SELECT unit_price FROM formula.plastic_printing WHERE printing_name='套印'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '1.26', 'number', 'plastic_printing', now()),
((SELECT unit_price FROM formula.plastic_embed_nail WHERE embed_nail_name='人工'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.004', 'number', 'plastic_embed_nail', now()),
((SELECT unit_price FROM formula.plastic_embed_nail WHERE embed_nail_name='自動'), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0.004', 'number', 'plastic_embed_nail', now());


-- init func_ctgy
INSERT INTO formula.func_ctgy (id, func_ctgy_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'func_ctgy') AND (PATH = 'ME')), 'ME', 'now()');
 INSERT INTO formula.func_ctgy (id, func_ctgy_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'func_ctgy') AND (PATH = 'ID')), 'ID', 'now()');
 INSERT INTO formula.func_ctgy (id, func_ctgy_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'func_ctgy') AND (PATH = 'RF')), 'RF', 'now()');
 INSERT INTO formula.func_ctgy (id, func_ctgy_name, create_time) VALUES ((SELECT id FROM wiprocurement.drop_down_item WHERE (field_name = 'func_ctgy') AND (PATH = 'THERMAL')), 'Thermal', 'now()');

 
INSERT INTO formula.common_parameter(id, formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, create_time)
VALUES(uuid_generate_v1(), (select id from  formula.formula_type where name='housing_metal'), 'material_loss_rate', null, 'material_AL_loss_rate', '%', 'AL Material loss rate',
'', '材料費_AL_material_loss_rate', now());
INSERT INTO formula.common_parameter(id, formula_type_id, part_type, sub_type, "label", unit, label_name, remark, system_remark, create_time)
VALUES(uuid_generate_v1(), (select id from  formula.formula_type where name='housing_metal'), 'material_loss_rate', null, 'material_Metal_loss_rate', '%', 'Metal Material loss rate',
'', '材料費_Metal_material_loss_rate', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) 
VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'material_loss_rate') AND (label='material_AL_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) and name='housing_metal_init' )), '0.15', 'number', 'common_parameter', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) 
VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'material_loss_rate') AND (label='material_Metal_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'housing_metal' )) and name='housing_metal_init' )), '0.05', 'number', 'common_parameter', now());

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )), 'housing_plastic_material', NULL, 'fcst_allowance', NULL, 'FCST寬放值', 'FCST寬放值', now(), NULL, null);
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_material') AND (label='fcst_allowance')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) )), '0', 'number', 'common_parameter', now());

INSERT INTO formula.common_parameter (id, formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, create_time, remark, disable_time) VALUES (uuid_generate_v1(), (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )), 'housing_plastic_secondary_processing', NULL, 'emi_sputtering_loss_rate', NULL, 'EMI Sputtering Loss Rate', 'EMI Sputtering Loss Rate', now(), NULL, null);
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.common_parameter WHERE (part_type = 'housing_plastic_secondary_processing') AND (label='emi_sputtering_loss_rate')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name='housing_plastic' )) and name='housing_plastic_init' )), '0.015', 'number', 'common_parameter', now());

CREATE OR REPLACE VIEW formula.v_part_category_1 AS 
SELECT pc.id as id, 
	   pc.category_name as category_name, 
	   pc.disable_time as disable_time 
from formula.part_category_1 as pc;

CREATE OR REPLACE VIEW formula.v_part_category_2 AS 
SELECT pc.id as id, 
	   pc.part_category_1_id as part_category_1_id, 
	   pc.category_name as category_name, 
	   pc.disable_time as disable_time 
from formula.part_category_2 as pc;

CREATE OR REPLACE VIEW formula.v_part_category_material AS 
SELECT pc.part_category_2_id as part_category_2_id, 
       pc.material_id as material_id, 
       pc.disable_time as disable_time 
from formula.part_category_material as pc;

CREATE OR REPLACE VIEW formula.v_material AS 
SELECT m.id as id, 
       m.material_spec_id as material_spec_id, 
       m.material_name as material_name, 
       m.disable_time as disable_time 
from formula.material as m;

CREATE OR REPLACE VIEW formula.v_material_spec AS 
SELECT ms.id as id, 
       ms.material_spec_name as material_spec_name, 
       ms.disable_time as disable_time 
from formula.material_spec as ms;

CREATE OR REPLACE VIEW formula.v_part_category_material_metal AS 
SELECT pcmm.pategory_category_2_id as part_category_2_id, 
       pcmm.material_metal_id as material_metal_id, 
       pcmm.disable_time as disable_time 
from formula.part_category_material_metal as pcmm;

CREATE OR REPLACE VIEW formula.v_material_metal AS 
SELECT mm.id as id, 
       mm."name" as "name", 
       mm.density as density, 
       mm.disable_time as disable_time 
from formula.material_metal as mm;

CREATE OR REPLACE VIEW formula.v_material_thinkness AS 
SELECT mt.id as id, 
       mt.material_metal_id as material_metal_id, 
       mt.thickness as thickness, 
       mt.disable_time as disable_time 
from formula.material_thinkness as mt;

CREATE OR REPLACE VIEW formula.v_product_type AS 
SELECT pt.id as id, 
       pt.type_name as type_name, 
       pt.disable_time as disable_time 
from formula.product_type as pt;

CREATE OR REPLACE VIEW formula.v_part_category_col_definition AS
select distinct pc.id as part_category_2_id, 
       b.item_name as part_category_2, 
       c.col_name as display_name, 
       c.col_key as json_key 
from wiprocurement.col_dependence a
inner join wiprocurement.drop_down_item b on a.col_val = b.id::varchar
inner join wiprocurement.col_definite c on a.required_col_id = c.id
left join formula.part_category_2 as pc on pc.category_name = b.item_name
order by b.item_name;

CREATE OR REPLACE VIEW formula.v_part_category_formula_mapping as
select pc1.id as part_category_1_id, pc2.id as part_category_2_id, ddi.item_name as part_category_1, ddi2.item_name as part_category_2, bpf.format_key as part_list_format 
from wiprocurement.bom_partlist_config as bpc
left join wiprocurement.drop_down_item ddi on bpc.parts_ctgy_1 = ddi.id
left join wiprocurement.drop_down_item ddi2 on bpc.parts_ctgy_2 = ddi2.id
left join wiprocurement.bom_partlist_format bpf on bpc.format = bpf.id
left join formula.part_category_1 pc1 on pc1.category_name = ddi.item_name
left join formula.part_category_2 pc2 on pc2.category_name = ddi2.item_name;

--REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA formula FROM emdm;
--revoke usage on schema formula from emdm;
DROP ROLE IF EXISTS emdm;
CREATE ROLE emdm NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT LOGIN PASSWORD 'wiprocurement';

GRANT  USAGE   ON SCHEMA formula  TO emdm;
GRANT SELECT ON TABLE formula.v_part_category_1 TO emdm;
GRANT SELECT ON TABLE formula.v_part_category_2 TO emdm;
GRANT SELECT ON TABLE formula.v_part_category_material TO emdm;
GRANT SELECT ON TABLE formula.v_material TO emdm;
GRANT SELECT ON TABLE formula.v_material_spec TO emdm;
GRANT SELECT ON TABLE formula.v_part_category_material_metal TO emdm;
GRANT SELECT ON TABLE formula.v_material_metal TO emdm;
GRANT SELECT ON TABLE formula.v_material_thinkness TO emdm;
GRANT SELECT ON TABLE formula.v_product_type TO emdm;
GRANT SELECT ON TABLE formula.v_part_category_col_definition TO emdm;
GRANT SELECT ON TABLE formula.v_part_category_formula_mapping TO emdm;