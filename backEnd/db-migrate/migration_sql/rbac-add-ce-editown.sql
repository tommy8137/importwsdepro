INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects'
    ) AND action='EditOwn'), 'ce:me'
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects') AND action='EditOwn')
                             AND role_name='ce:me');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects'
    ) AND action='EditOwn'), 'ce:me_ee'
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects') AND action='EditOwn')
                             AND role_name='ce:me_ee');

