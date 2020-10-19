ALTER TABLE wiprocurement.rbac_user_role ADD CONSTRAINT unique_emplid_role_id UNIQUE (emplid, role_id);
ALTER TABLE wiprocurement.rbac_policy_role ADD CONSTRAINT unique_policy_id_role_id UNIQUE (policy_id, role_id);
