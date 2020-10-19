ALTER TABLE wiprocurement.rbac_policies
  DROP CONSTRAINT rbac_policies_action_fkey;
ALTER TABLE wiprocurement.rbac_policies
  ADD CONSTRAINT rbac_policies_action_fkey
  FOREIGN KEY (action)
  REFERENCES wiprocurement.rbac_actions (action)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
ALTER TABLE wiprocurement.rbac_policy_role
  DROP CONSTRAINT rbac_policy_role_role_name_fkey;
ALTER TABLE wiprocurement.rbac_policy_role
  ADD CONSTRAINT rbac_policy_role_role_name_fkey
  FOREIGN KEY (role_name)
  REFERENCES wiprocurement.rbac_roles (role_name)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
ALTER TABLE wiprocurement.rbac_user_role
  DROP CONSTRAINT rbac_user_role_role_name_fkey;
ALTER TABLE wiprocurement.rbac_user_role
  ADD CONSTRAINT rbac_user_role_role_name_fkey
  FOREIGN KEY (role_name)
  REFERENCES wiprocurement.rbac_roles (role_name)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

UPDATE wiprocurement.rbac_actions SET action='EditOwn' WHERE action='Edit';
INSERT INTO wiprocurement.rbac_actions (action, rs) 
  SELECT * FROM (SELECT 'EditAll', 'me_bom_projects') AS tmp
  WHERE NOT EXISTS (
    SELECT * FROM wiprocurement.rbac_actions WHERE action='EditAll'  
  );
INSERT INTO wiprocurement.rbac_policies(action, rs_id) 
  SELECT * FROM (SELECT 'EditAll', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects')) AS tme
  WHERE NOT EXISTS(
    SELECT * FROM wiprocurement.rbac_policies WHERE action = 'EditAll' 
    AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects')
  );
UPDATE wiprocurement.rbac_policy_role 
  SET policy_id=(SELECT policies.id FROM wiprocurement.rbac_policies AS policies 
  JOIN wiprocurement.rbac_resources AS resources ON policies.rs_id = resources.id
  WHERE policies.action='EditAll') 
  WHERE role_name='rd:me_tm_fm' 
  AND policy_id=(SELECT pols.id FROM wiprocurement.rbac_policies AS pols 
                  JOIN wiprocurement.rbac_resources AS resources on pols.rs_id = resources.id
                  WHERE pols.action='EditOwn');
