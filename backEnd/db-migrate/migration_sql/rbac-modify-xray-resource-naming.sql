DELETE FROM wiprocurement.rbac_resources WHERE rs_path='xray.spec';
UPDATE wiprocurement.rbac_resources SET rs_path='xray.ee' where rs_path='xray.spec.ee';
UPDATE wiprocurement.rbac_resources SET rs_path='xray.me' where rs_path='xray.spec.me';
