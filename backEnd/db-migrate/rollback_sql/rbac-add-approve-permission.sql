INSERT INTO wiprocurement.rbac_policy_role
(policy_id, role_id)
VALUES(
(select a.id from wiprocurement.rbac_policies a inner join wiprocurement.rbac_resources b on a.rs_id = b.id where a.action='Approve' and b.rs_node='me_bom_projects'), 
(select id from wiprocurement.rbac_roles where role_name='CE:ME_EE')
);

INSERT INTO wiprocurement.rbac_policy_role
(policy_id, role_id)
VALUES(
(select a.id from wiprocurement.rbac_policies a inner join wiprocurement.rbac_resources b on a.rs_id = b.id where a.action='Approve' and b.rs_node='me_bom_projects'), 
(select id from wiprocurement.rbac_roles where role_name='CE:ME')
);

INSERT INTO wiprocurement.rbac_resources(rs_node, rs_path, description, is_root)
VALUES('edit_without_revert', 'me_bom_projects.edit_without_revert', '編輯後不退回N.5', false);

INSERT INTO wiprocurement.rbac_policies("action", rs_id, effect, description, is_editable)
VALUES
(
	(select action from wiprocurement.rbac_actions where rs='me_bom_projects' and action='EditAll'), 
	(select id from wiprocurement.rbac_resources where rs_node='edit_without_revert'), 
	true, 
	'編輯後不退回N.5', 
	true
);

INSERT INTO wiprocurement.rbac_policy_role(policy_id, role_id)
VALUES(
    (select a.id from wiprocurement.rbac_policies a inner join wiprocurement.rbac_resources b on a.rs_id = b.id where a.action='EditAll' and b.rs_node='edit_without_revert'),
    (select id from wiprocurement.rbac_roles where role_name='CE:ME_EE')
);

INSERT INTO wiprocurement.rbac_policy_role(policy_id, role_id)
VALUES(
    (select a.id from wiprocurement.rbac_policies a inner join wiprocurement.rbac_resources b on a.rs_id = b.id where a.action='EditAll' and b.rs_node='edit_without_revert'),
    (select id from wiprocurement.rbac_roles where role_name='CE:ME')
);

