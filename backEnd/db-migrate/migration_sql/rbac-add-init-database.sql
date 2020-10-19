INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path, description, is_root) SELECT 'database', 'database', 'Database', true WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='database' AND rs_path='database');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'me', 'database.me' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='me' AND rs_path='database.me');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'ee', 'database.ee' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='ee' AND rs_path='database.ee');

INSERT INTO wiprocurement.rbac_policies (action, rs_id, description, is_editable) 
  SELECT 'Edit', 
         (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='database.me'),
         'Edit ME Database',
         true
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Edit' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'database.me'));

INSERT INTO wiprocurement.rbac_policies (action, rs_id, description, is_editable) 
  SELECT 'Edit', 
         (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='database.ee'),
         'Edit EE Database',
         true
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Edit' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'database.ee'));


INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='database.me'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='database.me') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='database.me'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='database.me') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='database.ee'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='database.ee') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:EE'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='database.ee'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='database.ee') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'));

