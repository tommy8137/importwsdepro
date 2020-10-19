UPDATE wiprocurement.rbac_resources SET rs_path='cleansheet.me.cal.thermal-module' where rs_path='cleansheet.cal.thermal-module';
UPDATE wiprocurement.rbac_resources SET rs_path='cleansheet.me.cal.housing-metal' where rs_path='cleansheet.cal.housing-metal';
UPDATE wiprocurement.rbac_resources SET rs_path='cleansheet.me.cal.cable-ffc' where rs_path='cleansheet.cal.cable-ffc';
UPDATE wiprocurement.rbac_resources SET rs_path='cleansheet.me.cal.cable-wire' where rs_path='cleansheet.cal.cable-wire';
UPDATE wiprocurement.rbac_resources SET rs_path='cleansheet.me.cal.die-cut' where rs_path='cleansheet.cal.die-cut';
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) VALUES ('me', 'cleansheet.me');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) VALUES ('ee', 'cleansheet.ee');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) VALUES ('cal', 'cleansheet.me.cal');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) VALUES ('cal', 'cleansheet.ee.cal');
DELETE FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.cal';
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) VALUES ('pcb', 'cleansheet.ee.cal.pcb');

INSERT INTO wiprocurement.rbac_policies (action, rs_id, description, is_editable) 
  SELECT 'Edit', 
         (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.ee.cal.pcb'),
         'PCB',
         true
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Edit' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'cleansheet.ee.cal.pcb'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.ee.cal.pcb'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.ee.cal.pcb') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.ee.cal.pcb'
    ) AND action='Edit'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='cleansheet.ee.cal.pcb') AND action='Edit')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:EE'));

UPDATE wiprocurement.rbac_policies SET description='Thermal Module' where description='Clean Sheet';

