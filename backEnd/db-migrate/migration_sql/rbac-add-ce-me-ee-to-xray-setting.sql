INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='xray.spec.me') AND action='View'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec.me') AND action='View') AND role_name='ce:me_ee');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='xray.spec') AND action='Export'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec') AND action='Export') AND role_name='ce:me_ee');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='xray.spec.ee') AND action='View'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec.ee') AND action='View') AND role_name='ce:me_ee');


INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='setting.ee') AND action='List'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='setting.ee') AND action='List') AND role_name='ce:me_ee');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='setting.ee') AND action='EditAll'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='setting.ee') AND action='EditAll') AND role_name='ce:me_ee');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='setting.ee') AND action='View'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='setting.ee') AND action='View') AND role_name='ce:me_ee');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='setting.me') AND action='List'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='setting.me') AND action='List') AND role_name='ce:me_ee');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='setting.me') AND action='EditAll'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='setting.me') AND action='EditAll') AND role_name='ce:me_ee');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='setting.me') AND action='View'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='setting.me') AND action='View') AND role_name='ce:me_ee');
