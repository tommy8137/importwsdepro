ALTER TABLE wiprocurement.rbac_policies ADD COLUMN description CHARACTER varying(256);
ALTER TABLE wiprocurement.rbac_policies ADD COLUMN is_editable BOOLEAN DEFAULT false;
ALTER TABLE wiprocurement.rbac_resources ADD COLUMN description CHARACTER varying(256);
ALTER TABLE wiprocurement.rbac_resources ADD COLUMN is_root BOOLEAN DEFAULT false;

