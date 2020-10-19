
UPDATE formula.cablewire_connector_vendor
SET vendor_pn='NA'
FROM formula.cablewire_connector_type_v1 type
WHERE vendor_pn='' and connector_type_id = type.id and type.connector_type != 'Other_Fill_ME_Remark';
