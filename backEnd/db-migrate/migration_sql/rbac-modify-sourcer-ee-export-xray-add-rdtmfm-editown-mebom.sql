delete from wiprocurement.rbac_policy_role where id = (
select policy_role.id from wiprocurement.rbac_policy_role as policy_role
inner join (select policies.id, policies.effect, actions.action, resources.rs_node, resources.rs_path from
    wiprocurement.rbac_policies as policies
    join wiprocurement.rbac_actions as actions on policies.action = actions.action
    join wiprocurement.rbac_resources as resources on resources.id = policies.rs_id
where resources.rs_path = 'xray.spec' and actions.action='Export') as fp
on fp.id = policy_role.policy_id
where role_name = 'sourcer:me');


INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec'
    ) AND action='Export'), 'sourcer:ee'
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec') AND action='Export')
                             AND role_name='sourcer:ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects'
    ) AND action='EditOwn'), 'rd:me_tm_fm'
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects') AND action='EditOwn')
                             AND role_name='rd:me_tm_fm');
