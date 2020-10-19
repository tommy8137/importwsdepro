UPDATE wiprocurement.rbac_roles SET role_name=':contactwindow' WHERE role_name='contactwindow';
ALTER TABLE wiprocurement.rbac_roles ADD COLUMN is_editable BOOLEAN DEFAULT true;
