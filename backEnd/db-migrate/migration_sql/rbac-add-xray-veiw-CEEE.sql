INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.ee'
    ) AND action='View'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:EE'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.ee') AND action='View')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='CE:EE'));

