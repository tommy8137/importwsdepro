drop table if exists wiprocurement.col_disable;

create table if not exists wiprocurement.col_disable(
	id serial,
	col_val uuid,
	col_id uuid,
	disable_col_id uuid,
	create_time timestamptz default now(),
	disable_time timestamptz default null,
	CONSTRAINT col_disable_pk PRIMARY KEY (id),
	CONSTRAINT col_disable_disable_col_id_fkey FOREIGN KEY (disable_col_id) REFERENCES wiprocurement.col_definite(id),
	CONSTRAINT col_disable_col_id_fkey FOREIGN KEY (col_id) REFERENCES wiprocurement.col_definite(id),
	CONSTRAINT col_disable_un UNIQUE (col_val, col_id, disable_col_id)
);

insert into wiprocurement.col_disable(col_val, col_id, disable_col_id)
select spec.id, col.id, dis.id
from formula.diecut_material_spec spec,
wiprocurement.col_definite col,
wiprocurement.col_definite dis
where spec.material_spec_name in ('Non_UL_Eco_Form', 'UL_Eco_Form')
and col.col_key = 'material_spec'
and dis.col_key in ('part_size_h')
on conflict do nothing;
