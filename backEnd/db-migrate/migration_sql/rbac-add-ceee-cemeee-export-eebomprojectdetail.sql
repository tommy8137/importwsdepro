INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'Export', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Export' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'ee_bom_projects.detail'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail'
    ) AND action='Export'), 'ce:ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail') AND action='Export')
                             AND role_name='ce:ee');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail'
    ) AND action='Export'), 'ce:me_ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail') AND action='Export')
                             AND role_name='ce:me_ee');

