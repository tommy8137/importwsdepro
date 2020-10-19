INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'dashboard', 'dashboard' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='dashboard' AND rs_path='dashboard');

INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'List', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='List' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'dashboard'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard'
    ) AND action='List'), 'rd:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard') AND action='List')
                             AND role_name='rd:me');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard'
    ) AND action='List'), 'rd:ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard') AND action='List')
                             AND role_name='rd:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard'
    ) AND action='List'), 'rd:me_tm_fm' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard') AND action='List')
                             AND role_name='rd:me_tm_fm');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard'
    ) AND action='List'), 'pm:account' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard') AND action='List')
                             AND role_name='pm:account');

