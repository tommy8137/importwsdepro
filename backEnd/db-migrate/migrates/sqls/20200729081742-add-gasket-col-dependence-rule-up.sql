delete from wiprocurement.col_dependence dt
using (
	select max(id) as id, col_val, col_id, required_col_id, count(col_val) as repeat_count
	from wiprocurement.col_dependence
	group by col_val, col_id, required_col_id
) duplicate
where duplicate.repeat_count > 1
and dt.id = duplicate.id;

alter TABLE wiprocurement.col_dependence DROP constraint if exists un_col_dependence;
ALTER TABLE wiprocurement.col_dependence ADD CONSTRAINT un_col_dependence UNIQUE (col_val, col_id, required_col_id);

insert into wiprocurement.col_dependence (col_val, col_id, required_col_id)
select spec.id, col.id, req.id
from formula.diecut_material_spec spec,
wiprocurement.col_definite col,
wiprocurement.col_definite req
where spec.material_spec_name in ('Non_UL_Eco_Form', 'UL_Eco_Form')
and col.col_key = 'material_spec'
and req.col_key in ('part_size_w', 'part_size_l', 'thickness')
on conflict do nothing;

