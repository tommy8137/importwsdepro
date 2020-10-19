UPDATE wiprocurement.rbac_resources SET description='BOM Management/ME', is_root=true WHERE rs_path='me_bom_projects';
UPDATE wiprocurement.rbac_resources SET description='BOM Management/EE', is_root=true WHERE rs_path='ee_bom_projects';
UPDATE wiprocurement.rbac_resources SET description='X-Ray/ME', is_root=true WHERE rs_path='xray.me';
UPDATE wiprocurement.rbac_resources SET description='X-Ray/EE', is_root=true WHERE rs_path='xray.ee';
UPDATE wiprocurement.rbac_resources SET description='Clean Sheet (計算機)', is_root=true WHERE rs_path='cleansheet';
UPDATE wiprocurement.rbac_resources SET description='Dashboard', is_root=true WHERE rs_path='dashboard';
UPDATE wiprocurement.rbac_resources SET description='Permission', is_root=true WHERE rs_path='permission';
UPDATE wiprocurement.rbac_resources SET description='Setting/ME', is_root=true WHERE rs_path='setting.me';
UPDATE wiprocurement.rbac_resources SET description='Setting/EE', is_root=true WHERE rs_path='setting.ee';
