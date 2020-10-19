update formula.product_type set disable_time = now() where type_name = 'VOIP Phone';
update formula.product_type set disable_time = now() where type_name = 'Conference_Phone';
insert into formula.product_type (type_name) values ('VoIP');

UPDATE wiprocurement.bom_projects SET product_type='VoIP' WHERE product_type = 'VOIP Phone';

update wiprocurement.perm_product_type_me set product_type_me = 'VoIP' WHERE product_type_me = 'VOIP Phone';
delete from wiprocurement.perm_product_type_me WHERE product_type_me = 'Conference_Phone';

-- bom_partlist_value_complete
delete
from wiprocurement.bom_partlist_value_complete 
where bom_item_id in (
  select id from wiprocurement.bom_item_complete_version where version_id in (
    select id from wiprocurement.bom_stage_version where bom_id in (
      select id from wiprocurement.bom_projects where product_type = 'Conference_Phone'
    )
  )
);

-- bom_partlist_value
delete 
from wiprocurement.bom_partlist_value
where bom_item_id in (
  select id from wiprocurement.bom_item where version_id in (
    select id from wiprocurement.bom_stage_version where bom_id in (
      select id from wiprocurement.bom_projects where product_type = 'Conference_Phone'
    )
  )
);

-- bom_item_complete_version
delete 
from wiprocurement.bom_item_complete_version where version_id in (
  select id from wiprocurement.bom_stage_version where bom_id in (
    select id from wiprocurement.bom_projects where product_type = 'Conference_Phone'
  )
);

-- bom_item
delete 
from wiprocurement.bom_item where version_id in (
  select id from wiprocurement.bom_stage_version where bom_id in (
    select id from wiprocurement.bom_projects where product_type = 'Conference_Phone'
  )
);

-- bom_stage_version
delete 
from wiprocurement.bom_stage_version where bom_id in (
  select id from wiprocurement.bom_projects where product_type = 'Conference_Phone'
);

-- bom_projects
delete
from wiprocurement.bom_projects where product_type = 'Conference_Phone';