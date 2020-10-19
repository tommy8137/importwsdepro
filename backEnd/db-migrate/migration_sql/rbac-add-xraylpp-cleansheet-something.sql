INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) VALUES ('cal', 'cleansheet.cal');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) VALUES ('thermal-module', 'cleansheet.cal.thermal-module');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) VALUES ('housing-metal', 'cleansheet.cal.housing-metal');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) VALUES ('cable-ffc', 'cleansheet.cal.cable-ffc');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) VALUES ('cable-wire', 'cleansheet.cal.cable-wire');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) VALUES ('die-cut', 'cleansheet.cal.die-cut');

INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'Edit', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.cal.thermal-module')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Edit' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'cleansheet.cal.thermal-module'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.cal.thermal-module'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='ce:me'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.cal.thermal-module') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='ce:me'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.cal.thermal-module'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='ce:ee'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.cal.thermal-module') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='ce:ee'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.cal.thermal-module'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='ce:me_ee'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.cal.thermal-module') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='ce:me_ee'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.cal.thermal-module'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='rd:me_tm_fm'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.cal.thermal-module') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='rd:me_tm_fm'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.cal.thermal-module'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='sourcer:ee'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.cal.thermal-module') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='sourcer:ee'));

delete from wiprocurement.rbac_policies where id = (
    select policies.id
    from wiprocurement.rbac_policies as policies
    join wiprocurement.rbac_actions as actions on policies.action = actions.action
    join wiprocurement.rbac_resources as resources on resources.id = policies.rs_id
    where resources.rs_path = 'cleansheet' and actions.action='Edit'
);

