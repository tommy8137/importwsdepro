INSERT INTO formula.metal_type_part_category (metal_type_id, part_category_2_id, remark) values
((select id from formula.metal_type where type_name = 'Metal'), (select id from formula.part_category_2 where category_name = 'C_GPU_BKT'), ''),
((select id from formula.metal_type where type_name = 'Metal'), (select id from formula.part_category_2 where category_name = 'HDD_SSD_BKT'), '')on conflict do nothing;
