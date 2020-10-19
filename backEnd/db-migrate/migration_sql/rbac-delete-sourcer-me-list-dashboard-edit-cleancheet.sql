delete from wiprocurement.rbac_policy_role where id=(
select policy_role.id
    from wiprocurement.rbac_policy_role as policy_role
    join (select policies.id, policies.effect, actions.action, resources.rs_node, resources.rs_path 
                from wiprocurement.rbac_policies as policies
                join wiprocurement.rbac_actions as actions on policies.action = actions.action
                join wiprocurement.rbac_resources as resources on resources.id = policies.rs_id
                where resources.rs_path = 'cleansheet' and actions.action='Edit') as fp
                on fp.id = policy_role.policy_id
    join  wiprocurement.rbac_roles as roles on roles.id = policy_role.role_id
where role_name='sourcer:me');
delete from wiprocurement.rbac_policy_role where id=(
select policy_role.id
    from wiprocurement.rbac_policy_role as policy_role
    join (select policies.id, policies.effect, actions.action, resources.rs_node, resources.rs_path 
                from wiprocurement.rbac_policies as policies
                join wiprocurement.rbac_actions as actions on policies.action = actions.action
                join wiprocurement.rbac_resources as resources on resources.id = policies.rs_id
                where resources.rs_path = 'cleansheet' and actions.action='List') as fp
                on fp.id = policy_role.policy_id
    join  wiprocurement.rbac_roles as roles on roles.id = policy_role.role_id
where role_name='sourcer:me');

