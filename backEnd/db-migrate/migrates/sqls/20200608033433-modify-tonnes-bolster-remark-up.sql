drop table if exists formula.metal_press_machine_remark;
CREATE TABLE if not exists formula.metal_press_machine_remark (
	id serial not null,
	press_type_id uuid not null,
	machine_id uuid NOT NULL,
    bolster varchar(200) default null,
    remark varchar(400) default null,
	CONSTRAINT metal_press_machine_remark_pk PRIMARY KEY (id),
	CONSTRAINT metal_press_machine_remark_fk_machine FOREIGN KEY (machine_id) REFERENCES formula.machine_metal(id),
	CONSTRAINT metal_press_machine_remark_fk_press_type FOREIGN KEY (press_type_id) REFERENCES formula.metal_press_type(id),
    CONSTRAINT metal_press_machine_remark_un UNIQUE (machine_id, press_type_id)
);

insert into formula.metal_press_machine_remark(press_type_id, machine_id, bolster)
select press.id, ma.id, ma.bloster
from formula.metal_press_type press,
formula.machine_metal ma
on conflict do nothing;