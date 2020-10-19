INSERT INTO wiprocurement.rbac_policies (action, rs_id, description, is_editable) 
  SELECT 'Edit', 
         (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all'),
         'All Edit',
         true
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Edit' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'permission.all'));

INSERT INTO wiprocurement.rbac_policies (action, rs_id, description, is_editable) 
  SELECT 'Edit', 
         (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.contact_window'),
         'Contact Window Edit',
         true
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Edit' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'permission.contact_window'));


INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:EE'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CONTACT_WINDOW:CONTACT_WINDOW'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.all') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CONTACT_WINDOW:CONTACT_WINDOW'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.contact_window'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.contact_window') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.contact_window'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.contact_window') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:EE'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.contact_window'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='permission.contact_window') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'));

