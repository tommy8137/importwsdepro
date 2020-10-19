INSERT INTO wiprocurement.rbac_roles (role_name) SELECT 'sourcer:ee' WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_roles WHERE role_name='sourcer:ee');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'ee', 'xray.spec.ee' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='ee' AND rs_path='xray.spec.ee');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'me', 'xray.spec.me' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='me' AND rs_path='xray.spec.me');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'spec', 'xray.spec' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='spec' AND rs_path='xray.spec');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'xray', 'xray' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='xray' AND rs_path='xray');

INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'View', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec.ee')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='View' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'xray.spec.ee'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'View', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec.me')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='View' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'xray.spec.me'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'Export', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Export' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'xray.spec'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec'
    ) AND action='Export'), 'ce:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec') AND action='Export')
                             AND role_name='ce:me');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec'
    ) AND action='Export'), 'sourcer:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec') AND action='Export')
                             AND role_name='sourcer:me');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec'
    ) AND action='Export'), 'ce:ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec') AND action='Export')
                             AND role_name='ce:ee');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec.me'
    ) AND action='View'), 'ce:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec.me') AND action='View')
                             AND role_name='ce:me');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec.me'
    ) AND action='View'), 'sourcer:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec.me') AND action='View')
                             AND role_name='sourcer:me');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec.ee'
    ) AND action='View'), 'sourcer:ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec.ee') AND action='View')
                             AND role_name='sourcer:ee');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec.ee'
    ) AND action='View'), 'ce:ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec.ee') AND action='View')
                             AND role_name='ce:ee');
