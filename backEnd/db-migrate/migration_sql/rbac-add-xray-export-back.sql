INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'Export', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.me')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Export' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'xray.me'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'Export', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.ee')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='Export' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'xray.ee'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.me'
    ) AND action='Export'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='ce:me'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.me') AND action='Export')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='ce:me'));
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.me'
    ) AND action='Export'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='sourcer:me'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.me') AND action='Export')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='sourcer:me'));
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.me'
    ) AND action='Export'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='ce:me_ee'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.me') AND action='Export')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='ce:me_ee'));
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.me'
    ) AND action='Export'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='sourcer:me_ee'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.me') AND action='Export')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='sourcer:me_ee'));
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.me'
    ) AND action='Export'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='rd:me_tm_fm'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.me') AND action='Export')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='rd:me_tm_fm'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.ee'
    ) AND action='Export'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='ce:ee'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.ee') AND action='Export')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='ce:ee'));
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.ee'
    ) AND action='Export'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='sourcer:ee'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.ee') AND action='Export')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='sourcer:ee'));
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.ee'
    ) AND action='Export'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='ce:me_ee'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.ee') AND action='Export')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='ce:me_ee'));
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_id) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.ee'
    ) AND action='Export'), (
      SELECT id FROM wiprocurement.rbac_roles WHERE role_name='sourcer:me_ee'
    ) 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='xray.ee') AND action='Export')
                             AND role_id=(SELECT id FROM wiprocurement.rbac_roles WHERE role_name='sourcer:me_ee'));
