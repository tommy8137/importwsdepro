insert into wiprocurement.decimal_config(category, parameter_name, value, remark)values
-- EE
('EEBom', 'viewAllByModulePrice', 6, null)
on conflict do nothing;