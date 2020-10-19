INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects'
    ) AND action='View'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='SOURCER:ME_EE'
    )
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects') AND action='View')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='SOURCER:ME_EE'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects'
    ) AND action='List'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='SOURCER:ME_EE'
    )
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects') AND action='List')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='SOURCER:ME_EE'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects'
    ) AND action='View'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='PM:ACCOUNT'
    )
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects') AND action='View')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='PM:ACCOUNT'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects'
    ) AND action='Export'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='PM:ACCOUNT'
    )
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects') AND action='Export')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='PM:ACCOUNT'));

