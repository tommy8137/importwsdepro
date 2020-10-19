INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'cleansheet', 'cleansheet' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='cleansheet' AND rs_path='cleansheet');

INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'Edit', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Edit' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'cleansheet'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet'
    ) AND action='Edit'), 'ce:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet') AND action='Edit')
                             AND role_name='ce:me');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet'
    ) AND action='Edit'), 'ce:ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet') AND action='Edit')
                             AND role_name='ce:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet'
    ) AND action='Edit'), 'ce:me_ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet') AND action='Edit')
                             AND role_name='ce:me_ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet'
    ) AND action='Edit'), 'sourcer:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet') AND action='Edit')
                             AND role_name='sourcer:me');

