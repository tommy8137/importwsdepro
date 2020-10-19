insert into wiprocurement.rbac_resources (rs_node ,rs_path) values
('quotation_reference', 'me_bom_projects.quotation_reference') on conflict do nothing;

insert into wiprocurement.rbac_policies ("action", rs_id , effect , description, is_editable)
select 'Export', rs.id , true, 'Parts Quotation Reference Export', true
from wiprocurement.rbac_resources rs
where rs.rs_path = 'me_bom_projects.quotation_reference' on conflict do nothing;

insert into wiprocurement.rbac_policy_role (policy_id ,role_id)
select rp.id , rr.id 
from wiprocurement.rbac_policies rp,
wiprocurement.rbac_roles rr
where rp."action"  = 'Export'
and rp.rs_id = (select id from wiprocurement.rbac_resources where rs_path = 'me_bom_projects.quotation_reference')
and rr.role_name in ('CE:ME_EE', 'CE:ME', 'SOURCER:ME') on conflict do nothing;