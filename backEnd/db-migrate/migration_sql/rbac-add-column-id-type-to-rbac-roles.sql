ALTER TABLE wiprocurement.rbac_roles ADD COLUMN id SERIAL;
ALTER TABLE wiprocurement.rbac_roles ADD COLUMN typ INTEGER DEFAULT 0;
ALTER TABLE wiprocurement.rbac_roles ADD CONSTRAINT uinque_id UNIQUE(id);
