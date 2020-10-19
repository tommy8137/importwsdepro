INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='CreateNextStatus'), 'ce:me' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='CreateNextStatus') AND role_name='ce:me');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='List'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='List') AND role_name='ce:me_ee');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='CreateNextStatus'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='CreateNextStatus') AND role_name='ce:me_ee');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='VersionComplete'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='VersionComplete') AND role_name='ce:me_ee');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='Export'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='Export') AND role_name='ce:me_ee');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='View'), 'ce:me_ee' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='View') AND role_name='ce:me_ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='Export'), 'pm:account' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='Export') AND role_name='pm:account');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='Export'), 'sourcer:me' 
     WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
     WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources 
     WHERE rs_path='me_bom_projects') AND action='Export') AND role_name='sourcer:me');
