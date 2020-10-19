DROP TABLE IF EXISTS  wiprocurement.bom_project_parameter_value;
DROP TABLE IF EXISTS  wiprocurement.bom_project_parameter;

CREATE TABLE if not exists wiprocurement.bom_project_parameter (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	formula_type_id int4 NOT NULL,
	product_type_id int4 not null,
	part_type varchar(200) NULL,
	sub_type varchar(200) NULL,
	"label" varchar(200) NULL,
	unit varchar(200) NULL,
	label_name varchar(200) NULL,
	default_value_parameter_id uuid not null,
	remark varchar(400) NULL,
	system_remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT bom_project_parameter_pk PRIMARY KEY (id),
	CONSTRAINT bom_project_parameter_un UNIQUE (formula_type_id, product_type_id, part_type, label),
	CONSTRAINT bom_project_parameter_fk_formula_type FOREIGN KEY (formula_type_id) REFERENCES formula.formula_type(id),
	CONSTRAINT bom_project_parameter_fk_product_type FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id)
);

CREATE TABLE if not exists wiprocurement.bom_project_parameter_value (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	bom_id int4 NOT NULL,
	type_id uuid NOT NULL,
	value varchar(200) NOT NULL,
	value_type varchar(100) NOT NULL,
	CONSTRAINT bom_project_parameter_value_pk PRIMARY KEY (id),
	CONSTRAINT bom_project_parameter_value_un UNIQUE (bom_id, type_id),
	CONSTRAINT bom_project_parameter_value_fk_bom FOREIGN KEY (bom_id) REFERENCES wiprocurement.bom_projects(id),
	CONSTRAINT bom_project_parameter_value_fk_type FOREIGN KEY (type_id) REFERENCES wiprocurement.bom_project_parameter(id)
);
INSERT INTO formula.common_parameter (formula_type_id, part_type, sub_type, label, unit, label_name, system_remark, product_type_id) values
((SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic')), 'housing_plastic_molding', null, 'fcst_allowance', 'K', 'FCST寬放值', '成型費_FCST寬放值', (select id from formula.product_type where type_name = 'NB')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic')), 'housing_plastic_molding', null, 'fcst_allowance', 'K', 'FCST寬放值', '成型費_FCST寬放值', (select id from formula.product_type where type_name = 'DT')),
((SELECT id FROM formula.formula_type WHERE (name= 'housing_plastic')), 'housing_plastic_molding', null, 'fcst_allowance', 'K', 'FCST寬放值', '成型費_FCST寬放值', (select id from formula.product_type where type_name = 'AIO'))
on conflict do nothing ;

insert into formula.parameter_value (parameter_id, value, value_type, source_table, activate_date_id)
select cp.id, '0', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where sd.formula_type_id = (select id from formula.formula_type ft where ft."name" = 'housing_plastic')
and sd.product_type_id in (select id from formula.product_type where type_name in ('NB', 'DT', 'AIO'))
and cp.part_type = 'housing_plastic_molding'
and cp.label in ('fcst_allowance')
and cp.product_type_id in (select id from formula.product_type where type_name in ('NB', 'DT', 'AIO')) on conflict do nothing ;

insert into wiprocurement.bom_project_parameter (formula_type_id, product_type_id, part_type, "label", unit, label_name, remark, default_value_parameter_id)
select fo.id, pd.id, 'housing_plastic_molding', 'fcst_allowance', 'K', '成型費FCST寬放值', '專案參數_成型費_FCST寬放值', cp.id 
from formula.formula_type fo,
formula.product_type pd,
formula.common_parameter cp
where fo."name" in ('housing_plastic')
and pd.type_name in ('NB')
and cp.part_type = 'housing_plastic_molding'
and cp."label" = 'fcst_allowance'
and cp.product_type_id = (select id from formula.product_type where type_name in ('NB')) on conflict do nothing ;

insert into wiprocurement.bom_project_parameter (formula_type_id, product_type_id, part_type, "label", unit, label_name, remark, default_value_parameter_id)
select fo.id, pd.id, 'housing_plastic_molding', 'fcst_allowance', 'K', '成型費FCST寬放值', '專案參數_成型費_FCST寬放值', cp.id 
from formula.formula_type fo,
formula.product_type pd,
formula.common_parameter cp
where fo."name" in ('housing_plastic')
and pd.type_name in ('DT')
and cp.part_type = 'housing_plastic_molding'
and cp."label" = 'fcst_allowance'
and cp.product_type_id = (select id from formula.product_type where type_name in ('DT')) on conflict do nothing ;

insert into wiprocurement.bom_project_parameter (formula_type_id, product_type_id, part_type, "label", unit, label_name, remark, default_value_parameter_id)
select fo.id, pd.id, 'housing_plastic_molding', 'fcst_allowance', 'K', '成型費FCST寬放值', '專案參數_成型費_FCST寬放值', cp.id 
from formula.formula_type fo,
formula.product_type pd,
formula.common_parameter cp
where fo."name" in ('housing_plastic')
and pd.type_name in ('AIO')
and cp.part_type = 'housing_plastic_molding'
and cp."label" = 'fcst_allowance'
and cp.product_type_id = (select id from formula.product_type where type_name in ('AIO')) on conflict do nothing ;

insert into wiprocurement.bom_project_parameter_value (bom_id, type_id, value, value_type)
select project.id, para.id, pv.value, pv.value_type 
from wiprocurement.bom_projects project,
wiprocurement.bom_project_parameter para,
formula.parameter_value pv
where para.product_type_id = (select id from formula.product_type where type_name = project.product_type)
and pv.parameter_id = para.default_value_parameter_id
and pv.activate_date_id = (SELECT MAX(id) FROM formula.schedule_date WHERE formula_type_id = para.formula_type_id and product_type_id = para.product_type_id) on conflict do nothing ;