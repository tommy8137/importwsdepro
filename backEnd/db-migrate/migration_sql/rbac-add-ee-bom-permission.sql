INSERT INTO wiprocurement.rbac_roles (role_name) SELECT 'rd:ee' WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_roles WHERE role_name='rd:ee');
INSERT INTO wiprocurement.rbac_roles (role_name) SELECT 'ce:me_ee' WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_roles WHERE role_name='ce:me_ee');
INSERT INTO wiprocurement.rbac_actions (action, rs) SELECT 'Edit', 'ee_bom_projects'  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_actions WHERE action='Edit');
INSERT INTO wiprocurement.rbac_actions (action, rs) SELECT 'LeaderSubmit', 'ee_bom_projects'  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_actions WHERE action='LeaderSubmit');
INSERT INTO wiprocurement.rbac_actions (action, rs) SELECT 'PersonalSubmit', 'ee_bom_projects'  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_actions WHERE action='PersonalSubmit');

INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'version', 'ee_bom_projects.version' 
  WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='version' AND rs_path='ee_bom_projects.version');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'detail', 'ee_bom_projects.detail' 
  WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='detail' AND rs_path='ee_bom_projects.detail');

INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'View', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='View' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'ee_bom_projects'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'Edit', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Edit' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'ee_bom_projects'));  
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'List', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.version')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='List' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'ee_bom_projects.version'));  
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'List', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='List' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'ee_bom_projects.detail')); 
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'View', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='View' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'ee_bom_projects.detail')); 
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'Approve', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Approve' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'ee_bom_projects.detail'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'Edit', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Edit' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'ee_bom_projects.detail')); 
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'LeaderSubmit', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='LeaderSubmit' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'ee_bom_projects.detail')); 
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'PersonalSubmit', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='PersonalSubmit' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'ee_bom_projects.detail')); 

                                                                                            
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects') AND action='List'), 'ce:ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
    WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects') AND action='List') AND role_name='ce:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects') AND action='List'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
    WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects') AND action='List') AND role_name='ce:me_ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects') AND action='List'), 'rd:ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
    WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects') AND action='List') AND role_name='rd:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects') AND action='List'), 'sourcer:ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
    WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects') AND action='List') AND role_name='sourcer:ee');
    

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects') AND action='View'), 'ce:ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects') AND action='View') AND role_name='ce:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects') AND action='View'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects') AND action='View') AND role_name='ce:me_ee');
   
   
     
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects') AND action='Edit'), 'ce:ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects') AND action='Edit') AND role_name='ce:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects') AND action='Edit'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects') AND action='Edit') AND role_name='ce:me_ee');


INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.version') AND action='List'), 'ce:ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.version') AND action='List') AND role_name='ce:ee');
     
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.version') AND action='List'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.version') AND action='List') AND role_name='ce:me_ee');
     
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.version') AND action='List'), 'rd:ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.version') AND action='List') AND role_name='rd:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.version') AND action='List'), 'sourcer:ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.version') AND action='List') AND role_name='sourcer:ee');
     
     
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.detail') AND action='List'), 'ce:ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail') AND action='List') AND role_name='ce:ee');
     
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.detail') AND action='List'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail') AND action='List') AND role_name='ce:me_ee');
     
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.detail') AND action='List'), 'rd:ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail') AND action='List') AND role_name='rd:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.detail') AND action='List'), 'sourcer:ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail') AND action='List') AND role_name='sourcer:ee');


INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.detail') AND action='View'), 'ce:ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail') AND action='View') AND role_name='ce:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.detail') AND action='View'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail') AND action='View') AND role_name='ce:me_ee');



INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.detail') AND action='Edit'), 'ce:ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail') AND action='Edit') AND role_name='ce:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.detail') AND action='Edit'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail') AND action='Edit') AND role_name='ce:me_ee');



INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.detail') AND action='Approve'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail') AND action='Approve') AND role_name='ce:me_ee');
     


INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.detail') AND action='LeaderSubmit'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail') AND action='LeaderSubmit') AND role_name='ce:me_ee');
     
     

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='ee_bom_projects.detail') AND action='PersonalSubmit'), 'ce:ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='ee_bom_projects.detail') AND action='PersonalSubmit') AND role_name='ce:ee');
