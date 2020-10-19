DELETE FROM wiprocurement.rbac_user_role;
INSERT INTO wiprocurement.rbac_user_role (emplid,role_name) 
    SELECT emplid, 'ce:ee' FROM wiprocurement.user AS ur 
    WHERE ur.is_superuser='true'
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='ce:ee');
INSERT INTO wiprocurement.rbac_user_role (emplid,role_name) 
    SELECT emplid, 'ce:me' FROM wiprocurement.user AS ur 
    WHERE ur.is_superuser='true'
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='ce:me');
INSERT INTO wiprocurement.rbac_user_role (emplid,role_name) 
    SELECT emplid, 'ce:me_ee' FROM wiprocurement.user AS ur
    WHERE ur.is_superuser='true'
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='ce:me_ee');
INSERT INTO wiprocurement.rbac_user_role (emplid,role_name) 
    SELECT emplid, 'pm:account' FROM wiprocurement.user AS ur
    WHERE ur.is_superuser='true'
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='pm:account');
INSERT INTO wiprocurement.rbac_user_role (emplid,role_name) 
    SELECT emplid, 'rd:me' FROM wiprocurement.user AS ur
    WHERE ur.is_superuser='true'
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='rd:me'); 
INSERT INTO wiprocurement.rbac_user_role (emplid, role_name) 
    SELECT emplid, 'rd:ee' FROM wiprocurement.user AS ur
    WHERE ur.is_superuser='true'
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='rd:ee');
INSERT INTO wiprocurement.rbac_user_role (emplid,role_name) 
    SELECT emplid, 'rd:me_tm_fm' FROM wiprocurement.user AS ur
    WHERE ur.is_superuser='true'
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='rd:me_tm_fm');  
INSERT INTO wiprocurement.rbac_user_role (emplid,role_name) 
    SELECT emplid, 'sourcer:me' FROM wiprocurement.user AS ur
    WHERE ur.is_superuser='true'
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='sourcer:me');
INSERT INTO wiprocurement.rbac_user_role (emplid, role_name) 
    SELECT emplid, 'sourcer:ee' FROM wiprocurement.user AS ur 
    WHERE ur.is_superuser='true'
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='sourcer:ee');

INSERT INTO wiprocurement.rbac_user_role (emplid,role_name) 
    SELECT emplid, 'ce:ee' FROM wiprocurement.user AS ur 
    WHERE ur.is_ce='true' AND ur.is_ee='true' AND ur.is_me='false'
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='ce:ee');
INSERT INTO wiprocurement.rbac_user_role (emplid,role_name) 
    SELECT emplid, 'ce:me' FROM wiprocurement.user AS ur 
    WHERE ur.is_ce='true' AND ur.is_me='true' AND ur.is_ee='false' 
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='ce:me');
INSERT INTO wiprocurement.rbac_user_role (emplid,role_name) 
    SELECT emplid, 'ce:me_ee' FROM wiprocurement.user AS ur 
    WHERE ur.is_ce='true' AND ur.is_me='true' AND ur.is_ee='true' 
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='ce:me_ee');
INSERT INTO wiprocurement.rbac_user_role (emplid,role_name) 
    SELECT emplid, 'pm:account' FROM wiprocurement.user AS ur 
    WHERE ur.is_pm='true' AND ur.is_account='true' 
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='pm:account');
INSERT INTO wiprocurement.rbac_user_role (emplid,role_name) 
    SELECT emplid, 'rd:me' FROM wiprocurement.user AS ur 
    WHERE ur.is_rd='true' AND ur.is_me='true' 
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='rd:me'); 
INSERT INTO wiprocurement.rbac_user_role (emplid, role_name) 
    SELECT emplid, 'rd:ee' FROM wiprocurement.user AS ur 
    WHERE ur.is_rd='true' AND ur.is_ee='true' 
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='rd:ee');
INSERT INTO wiprocurement.rbac_user_role (emplid,role_name) 
    SELECT emplid, 'rd:me_tm_fm' FROM wiprocurement.user AS ur
    WHERE ur.is_rd='true' AND ur.is_me_tm_fm='true' 
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='rd:me_tm_fm');  
INSERT INTO wiprocurement.rbac_user_role (emplid,role_name) 
    SELECT emplid, 'sourcer:me' FROM wiprocurement.user AS ur 
    WHERE ur.is_sourcer='true' AND ur.is_me='true' 
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='sourcer:me');
INSERT INTO wiprocurement.rbac_user_role (emplid, role_name) 
    SELECT emplid, 'sourcer:ee' FROM wiprocurement.user AS ur 
    WHERE ur.is_sourcer='true' AND ur.is_ee='true' 
    AND NOT EXISTS(SELECT * FROM wiprocurement.rbac_user_role WHERE emplid = ur.emplid AND role_name='sourcer:ee');
