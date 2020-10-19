INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path, description, is_root) SELECT 'rfq', 'rfq', 'ePro Application', true WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='rfq' AND rs_path='rfq');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'request', 'rfq.request' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='request' AND rs_path='rfq.request');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'form', 'rfq.form' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='form' AND rs_path='rfq.form');

INSERT INTO wiprocurement.rbac_actions (action, rs) VALUES ('Feedback','rfq');
INSERT INTO wiprocurement.rbac_actions (action, rs) VALUES ('Create','rfq');
INSERT INTO wiprocurement.rbac_actions (action, rs) VALUES ('ListOwn','rfq');
INSERT INTO wiprocurement.rbac_actions (action, rs) VALUES ('Copy','rfq');
INSERT INTO wiprocurement.rbac_actions (action, rs) VALUES ('Cancel','rfq');
INSERT INTO wiprocurement.rbac_actions (action, rs) VALUES ('MarkDone','rfq');

INSERT INTO wiprocurement.rbac_policies (action, rs_id, description, is_editable) 
  SELECT 'Feedback', 
         (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request'),
         'Feedback Request',
         true
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Feedback' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'rfq.request'));

INSERT INTO wiprocurement.rbac_policies (action, rs_id, description, is_editable) 
  SELECT 'Create', 
         (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request'),
         'Create Request',
         true
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Create' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'rfq.request'));

INSERT INTO wiprocurement.rbac_policies (action, rs_id, description, is_editable) 
  SELECT 'ListOwn', 
         (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request'),
         'List Request By Assign',
         true
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='ListOwn' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'rfq.request'));

INSERT INTO wiprocurement.rbac_policies (action, rs_id, description, is_editable) 
  SELECT 'List', 
         (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request'),
         'List All Request',
         true
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='List' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'rfq.request'));

INSERT INTO wiprocurement.rbac_policies (action, rs_id, description, is_editable) 
  SELECT 'Copy', 
         (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.form'),
         'Copy Form',
         true
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Copy' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'rfq.form'));

INSERT INTO wiprocurement.rbac_policies (action, rs_id, description, is_editable) 
  SELECT 'Cancel', 
         (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.form'),
         'Cancel Form',
         true
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Cancel' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'rfq.form'));

INSERT INTO wiprocurement.rbac_policies (action, rs_id, description, is_editable) 
  SELECT 'MarkDone', 
         (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.form'),
         'Mark Form Done',
         true
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='MarkDone' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'rfq.form'));


INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request'
    ) AND action='Feedback'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request') AND action='Feedback')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request'
    ) AND action='Create'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='PM:ACCOUNT'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request') AND action='Create')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='PM:ACCOUNT'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request'
    ) AND action='ListOwn'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='RD:ME_TM_FM'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request') AND action='ListOwn')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='RD:ME_TM_FM'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request'
    ) AND action='List'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request') AND action='List')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request'
    ) AND action='List'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request') AND action='List')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:EE'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request'
    ) AND action='List'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.request') AND action='List')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.form'
    ) AND action='Copy'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='PM:ACCOUNT'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.form') AND action='Copy')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='PM:ACCOUNT'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.form'
    ) AND action='Cancel'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='PM:ACCOUNT'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.form') AND action='Cancel')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='PM:ACCOUNT'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.form'
    ) AND action='MarkDone'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='rfq.form') AND action='MarkDone')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:ME_EE'));

