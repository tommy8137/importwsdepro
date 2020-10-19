INSERT INTO formula.metal_paint_man_power (product_type_id, category_name)
select id, 'NCVM' from formula.product_type pt where pt.type_name in ('DT', 'AIO', 'Server', 'VoIP');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select a.id, b.id, '0', 'number', 'metal_paint_man_power'
from (select id from formula.metal_paint_man_power pmp where pmp.category_name = 'NCVM') a,
(select id from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id is null) b;

drop table if exists formula.metal_paint_process;
CREATE TABLE if not exists formula.metal_paint_process (
    id uuid not null DEFAULT uuid_generate_v1(),
    process_name varchar(200) not null,
    remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_paint_process_pk PRIMARY KEY (id),
	CONSTRAINT metal_paint_process_un UNIQUE (process_name)
);

INSERT INTO formula.metal_paint_process (process_name) VALUES ('一般噴塗'),('遮噴噴塗'), ('NCVM');

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select cp.id, '1.05', 'number', 'common_parameter', sd.id
from formula.common_parameter cp,
formula.schedule_date sd
where cp.part_type = 'housing_metal_painting'
and cp."label" = 'paint_printingable_amount_density'
and sd.formula_type_id  = (select id from formula.formula_type ft where ft."name" = 'housing_metal')
and sd.product_type_id  = cp.product_type_id on conflict do nothing;