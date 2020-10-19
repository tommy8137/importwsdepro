
delete from wiprocurement.rbac_policy_role where id = (
select policy_role.id from wiprocurement.rbac_policy_role as policy_role
inner join (select policies.id, policies.effect, actions.action, resources.rs_node, resources.rs_path from
    wiprocurement.rbac_policies as policies
    join wiprocurement.rbac_actions as actions on policies.action = actions.action
    join wiprocurement.rbac_resources as resources on resources.id = policies.rs_id
where resources.rs_path = 'dashboard' and actions.action='List') as fp
on fp.id = policy_role.policy_id
where role_name = 'rd:me');

delete from wiprocurement.rbac_policy_role where id = (
select policy_role.id from wiprocurement.rbac_policy_role as policy_role
inner join (select policies.id, policies.effect, actions.action, resources.rs_node, resources.rs_path from
    wiprocurement.rbac_policies as policies
    join wiprocurement.rbac_actions as actions on policies.action = actions.action
    join wiprocurement.rbac_resources as resources on resources.id = policies.rs_id
where resources.rs_path = 'dashboard' and actions.action='List') as fp
on fp.id = policy_role.policy_id
where role_name = 'rd:ee');

delete from wiprocurement.rbac_policy_role where id = (
select policy_role.id from wiprocurement.rbac_policy_role as policy_role
inner join (select policies.id, policies.effect, actions.action, resources.rs_node, resources.rs_path from
    wiprocurement.rbac_policies as policies
    join wiprocurement.rbac_actions as actions on policies.action = actions.action
    join wiprocurement.rbac_resources as resources on resources.id = policies.rs_id
where resources.rs_path = 'dashboard' and actions.action='List') as fp
on fp.id = policy_role.policy_id
where role_name = 'rd:me_tm_fm');

delete from wiprocurement.rbac_policy_role where id = (
select policy_role.id from wiprocurement.rbac_policy_role as policy_role
inner join (select policies.id, policies.effect, actions.action, resources.rs_node, resources.rs_path from
    wiprocurement.rbac_policies as policies
    join wiprocurement.rbac_actions as actions on policies.action = actions.action
    join wiprocurement.rbac_resources as resources on resources.id = policies.rs_id
where resources.rs_path = 'dashboard' and actions.action='List') as fp
on fp.id = policy_role.policy_id
where role_name = 'pm:account');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard'
    ) AND action='List'), 'ce:me'
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard') AND action='List')
                             AND role_name='ce:me');
                             
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard'
    ) AND action='List'), 'ce:ee'
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard') AND action='List')
                             AND role_name='ce:ee');
                           
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard'
    ) AND action='List'), 'ce:me_ee'
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard') AND action='List')
                             AND role_name='ce:me_ee');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard'
    ) AND action='List'), 'sourcer:me'
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard') AND action='List')
                             AND role_name='sourcer:me');

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard'
    ) AND action='List'), 'sourcer:ee'
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='dashboard') AND action='List')
                             AND role_name='sourcer:ee');



