INSERT INTO wiprocurement.rbac_roles (role_name) SELECT 'sourcer:me_ee' WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_roles WHERE role_name='sourcer:me_ee');

