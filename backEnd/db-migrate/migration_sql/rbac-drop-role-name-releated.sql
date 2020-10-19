ALTER TABLE wiprocurement.rbac_policy_role DROP role_name;
ALTER TABLE wiprocurement.rbac_user_role DROP role_name;
ALTER TABLE wiprocurement.rbac_roles DROP CONSTRAINT rbac_roles_pkey;
ALTER TABLE wiprocurement.rbac_roles  ADD PRIMARY KEY (id);
ALTER TABLE wiprocurement.rbac_roles ADD CONSTRAINT uinque_role_name UNIQUE(role_name);

