-- rubber machine
create table if not exists formula.temp_rubber_machine_setting(
 machine_ton_name varchar,
 machine_param_name varchar,
 param_value varchar
);
insert into formula.temp_rubber_machine_setting (machine_ton_name, machine_param_name, param_value) values 
('200T', 'l', '400'),
('200T', 'w', '400'),
('200T', 'cost', '0.0968'),
('250T', 'l', '450'),
('250T', 'w', '450'),
('250T', 'cost', '0.115'),
('300T', 'l', '550'),
('300T', 'w', '550'),
('300T', 'cost', '0.13');

create table if not exists formula.rubber_machine_ton(
	id uuid NOT null default uuid_generate_v1(),
	ton varchar not null,
	create_time timestamptz default now(),
	disable_time timestamptz,
	PRIMARY KEY(id),
	CONSTRAINT rubber_machine_ton_un UNIQUE (ton)
);
create table if not exists formula.rubber_machine_param(
	id uuid NOT null default uuid_generate_v1(),
	param_name varchar not null,
	create_time timestamptz default now(),
	disable_time timestamptz,
	PRIMARY KEY(id),
	CONSTRAINT rubber_machine_param_un UNIQUE (param_name)
);
create table if not exists formula.rubber_machine_rate_related(
	id uuid NOT null default uuid_generate_v1(),
	machine_ton_id uuid NOT null,
	machine_param_id uuid NOT null,
	create_time timestamptz default now(),
	disable_time timestamptz,
	PRIMARY KEY(id),
	CONSTRAINT rubber_machine_rate_related_un UNIQUE (machine_ton_id, machine_param_id),
	constraint fk_rubber_machine_ton_id foreign key(machine_ton_id) references formula.rubber_machine_ton(id),
	constraint fk_rubber_machine_param_id foreign key(machine_param_id) references formula.rubber_machine_param(id)
);
insert into formula.rubber_machine_ton (ton) select distinct machine_ton_name from formula.temp_rubber_machine_setting;
insert into formula.rubber_machine_param (param_name) select distinct machine_param_name from formula.temp_rubber_machine_setting;
insert into formula.rubber_machine_rate_related (machine_ton_id, machine_param_id) 
select rmt.id as machine_ton_id, rmp.id as machint_param_id from formula.temp_rubber_machine_setting trms
left join formula.rubber_machine_ton rmt on rmt.ton = trms.machine_ton_name
left join formula.rubber_machine_param rmp on rmp.param_name = trms.machine_param_name;

insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table) 
select rmrr.id, sd.id as activate_date_id, trms.param_value, 'number' as value_type, 'rubber_machine_rate_related' as source_table
from formula.temp_rubber_machine_setting trms
left join formula.rubber_machine_ton rmt on rmt.ton = trms.machine_ton_name
left join formula.rubber_machine_param rmp on rmp.param_name = trms.machine_param_name
left join formula.rubber_machine_rate_related rmrr on rmrr.machine_param_id = rmp.id and rmrr.machine_ton_id = rmt.id
inner join formula.schedule_date sd  on sd.formula_type_id = (select id from formula.formula_type ft where name = 'me_others_rubber') 
and sd.product_type_id = (select id from formula.product_type pt where pt.type_name = 'NB') on conflict do nothing;
drop table if exists formula.temp_rubber_machine_setting;