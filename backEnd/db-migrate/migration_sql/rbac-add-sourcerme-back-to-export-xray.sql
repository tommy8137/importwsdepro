INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec'
    ) AND action='Export'), 'sourcer:me'
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec') AND action='Export')
                             AND role_name='sourcer:me');

