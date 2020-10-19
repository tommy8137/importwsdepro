INSERT INTO wiprocurement.rbac_actions (action, rs) VALUES ('ForceApprove','me_bom_projects');
INSERT INTO wiprocurement.rbac_policies (action, rs_id, description, is_editable) 
  SELECT 'ForceApprove', 
         (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects'),
         'Approve 0.5',
         true
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='ForceApprove' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects'
    ) AND action='ForceApprove'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects') AND action='ForceApprove')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'));
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects'
    ) AND action='ForceApprove'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects') AND action='ForceApprove')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME'));

