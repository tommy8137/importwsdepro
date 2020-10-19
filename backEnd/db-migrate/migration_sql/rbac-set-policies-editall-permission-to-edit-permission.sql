UPDATE wiprocurement.rbac_policies
SET action = 'Edit'
WHERE wiprocurement.rbac_policies.rs_id in ( 
   SELECT id FROM wiprocurement.rbac_resources WHERE  wiprocurement.rbac_resources.rs_path in ('permission.all', 'permission.contact_window')
) AND action = 'EditAll';

