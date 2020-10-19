ALTER TABLE wiprocurement.rbac_policy_role ADD COLUMN role_id INTEGER;
ALTER TABLE wiprocurement.rbac_policy_role 
      ADD CONSTRAINT role_id_rbac_role_id_fkey 
      FOREIGN KEY (role_id)
      REFERENCES wiprocurement.rbac_roles (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE;
 
UPDATE wiprocurement.rbac_policy_role
SET role_id = roles.id 
FROM ( 
   SELECT id, role_name FROM wiprocurement.rbac_roles
) AS roles
WHERE roles.role_name =  wiprocurement.rbac_policy_role.role_name;

