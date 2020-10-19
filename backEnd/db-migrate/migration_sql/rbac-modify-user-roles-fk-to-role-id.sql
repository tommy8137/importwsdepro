ALTER TABLE wiprocurement.rbac_user_role ADD COLUMN role_id INTEGER;
ALTER TABLE wiprocurement.rbac_user_role
      ADD CONSTRAINT user_role_role_id_roles_id_fkey 
      FOREIGN KEY (role_id)
      REFERENCES wiprocurement.rbac_roles (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE;
 
UPDATE wiprocurement.rbac_user_role
SET role_id = roles.id 
FROM ( 
   SELECT id, role_name FROM wiprocurement.rbac_roles
) AS roles
WHERE roles.role_name =  wiprocurement.rbac_user_role.role_name;

