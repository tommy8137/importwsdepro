INSERT INTO wiprocurement.rbac_policy_role (role_name, policy_id)
  SELECT * FROM (SELECT 'pm:account', (
     SELECT pols.id FROM wiprocurement.rbac_policies AS pols 
     JOIN wiprocurement.rbac_resources AS resources on pols.rs_id = resources.id
     WHERE pols.action='List' AND rs_path='ee_bom_projects'
  )) AS tmp
  WHERE NOT EXISTS(
    SELECT * FROM wiprocurement.rbac_policy_role WHERE role_name = 'pm:account' 
    AND policy_id=(SELECT pols.id FROM wiprocurement.rbac_policies AS pols 
     JOIN wiprocurement.rbac_resources AS resources on pols.rs_id = resources.id
     WHERE pols.action='List' AND rs_path='ee_bom_projects')
  );
