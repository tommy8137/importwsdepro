delete from wiprocurement.rbac_policy_role where id = (
select policy_role.id from wiprocurement.rbac_policy_role as policy_role
inner join (select policies.id, policies.effect, actions.action, resources.rs_node, resources.rs_path from
    wiprocurement.rbac_policies as policies
    join wiprocurement.rbac_actions as actions on policies.action = actions.action
    join wiprocurement.rbac_resources as resources on resources.id = policies.rs_id
where resources.rs_path = 'me_bom_projects' and actions.action='EditOwn') as fp
on fp.id = policy_role.policy_id
where role_name = 'ce:me');

delete from wiprocurement.rbac_policy_role where id = (
select policy_role.id from wiprocurement.rbac_policy_role as policy_role
inner join (select policies.id, policies.effect, actions.action, resources.rs_node, resources.rs_path from
    wiprocurement.rbac_policies as policies
    join wiprocurement.rbac_actions as actions on policies.action = actions.action
    join wiprocurement.rbac_resources as resources on resources.id = policies.rs_id
where resources.rs_path = 'me_bom_projects' and actions.action='EditOwn') as fp
on fp.id = policy_role.policy_id
where role_name = 'ce:me_ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects'
    ) AND action='EditAll'), 'ce:me'
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects') AND action='EditAll')
                             AND role_name='ce:me');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects'
    ) AND action='EditAll'), 'ce:me_ee'
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects') AND action='EditAll')
                             AND role_name='ce:me_ee');
