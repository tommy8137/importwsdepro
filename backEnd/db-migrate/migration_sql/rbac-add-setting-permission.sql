INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'ee', 'setting.ee' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='ee' AND rs_path='setting.ee');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'me', 'setting.me' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='me' AND rs_path='setting.me');

INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'List', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.ee')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='List' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'setting.ee'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'View', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.ee')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='View' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'setting.ee'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'EditAll', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.ee')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='EditAll' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'setting.ee'));

INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'List', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.me')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='List' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'setting.me'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'View', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.me')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='View' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'setting.me'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'EditAll', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.me')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='EditAll' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'setting.me'));
                                                                                             
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.me'
    ) AND action='List'), 'ce:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.me') AND action='List')
                             AND role_name='ce:me');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.me'
    ) AND action='List'), 'ce:ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.me') AND action='List')
                             AND role_name='ce:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.me'
    ) AND action='View'), 'ce:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.me') AND action='View')
                             AND role_name='ce:me');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.me'
    ) AND action='View'), 'ce:ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.me') AND action='View')
                             AND role_name='ce:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.me'
    ) AND action='EditAll'), 'ce:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.me') AND action='EditAll')
                             AND role_name='ce:me');
                             

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.ee'
    ) AND action='List'), 'ce:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.ee') AND action='List')
                             AND role_name='ce:me');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.ee'
    ) AND action='List'), 'ce:ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.ee') AND action='List')
                             AND role_name='ce:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.ee'
    ) AND action='View'), 'ce:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.ee') AND action='View')
                             AND role_name='ce:me');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.ee'
    ) AND action='View'), 'ce:ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.ee') AND action='View')
                             AND role_name='ce:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.ee'
    ) AND action='EditAll'), 'ce:ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='setting.ee') AND action='EditAll')
                             AND role_name='ce:ee');



