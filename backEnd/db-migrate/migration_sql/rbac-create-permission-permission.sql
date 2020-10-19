INSERT INTO wiprocurement.rbac_roles (role_name) SELECT 'contactwindow' WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_roles WHERE role_name='contactwindow');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'all', 'permission.all' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='all' AND rs_path='permission.all');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'contact_window', 'permission.contact_window' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='contact_window' AND rs_path='permission.contact_window');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'permission', 'permission' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='permission' AND rs_path='permission');

INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'List', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.contact_window')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='List' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'permission.contact_window'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'List', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='List' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'permission.all'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all'
    ) AND action='List'), 'ce:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all') AND action='List')
                             AND role_name='ce:me');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all'
    ) AND action='List'), 'ce:ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all') AND action='List')
                             AND role_name='ce:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all'
    ) AND action='List'), 'ce:me_ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all') AND action='List')
                             AND role_name='ce:me_ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.contact_window'
    ) AND action='List'), 'ce:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.contact_window') AND action='List')
                             AND role_name='ce:me');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.contact_window'
    ) AND action='List'), 'ce:ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.contact_window') AND action='List')
                             AND role_name='ce:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.contact_window'
    ) AND action='List'), 'ce:me_ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.contact_window') AND action='List')
                             AND role_name='ce:me_ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all'
    ) AND action='List'), 'contactwindow' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all') AND action='List')
                             AND role_name='contactwindow');

