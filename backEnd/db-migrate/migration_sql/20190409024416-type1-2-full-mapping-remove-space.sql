-- 將path內多餘空白移除
update wiprocurement.drop_down_item set path=replace(path, ' ', '')  where path like '% %' and layout_name='bom_item' AND field_name IN ('parts_ctgy_1', 'parts_ctgy_2', 'material_spec', 'material');
-- 將path內不合法斜線置換成底線
update wiprocurement.drop_down_item set path=replace(path, '/', '_') where path like '%/%' and layout_name='bom_item' AND field_name IN ('parts_ctgy_1', 'parts_ctgy_2', 'material_spec', 'material');