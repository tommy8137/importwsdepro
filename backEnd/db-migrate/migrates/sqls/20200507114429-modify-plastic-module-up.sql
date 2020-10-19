insert into formula.product_type_category_module (module_id, part_category_2_id , product_type_id )
select md.id, pg2.id, pt.id
from formula."module" md,
formula.part_category_2 pg2,
formula.product_type pt
where md.module_name = 'module_2'
and pg2.category_name in ('Plastic', 'Painting', 'Double_Injection', 'Insert_Molding')
and pt.type_name in ('Server', 'VoIP') ON CONFLICT ON CONSTRAINT product_type_category_module_pk do update set disable_time = null;

insert into formula.product_type_category_module (module_id, part_category_2_id , product_type_id )
select md.id, pg2.id, pt.id
from formula."module" md,
formula.part_category_2 pg2,
formula.product_type pt
where md.module_name = 'module_5'
and pg2.category_name in ('RHCM_Process')
and pt.type_name in ('Server', 'VoIP') ON CONFLICT ON CONSTRAINT product_type_category_module_pk do update set disable_time = null;