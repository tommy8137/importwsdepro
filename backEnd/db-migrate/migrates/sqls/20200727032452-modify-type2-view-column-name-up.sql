drop view if EXISTS formula.v_part_category_2;
CREATE OR REPLACE VIEW formula.v_part_category_2
AS SELECT 
    type2.part_category_1_id,
    type2.category_name,
    type2_product_type.part_category_2_id as id,
    type2.disable_time,
    type2_product_type.product_type_id,
    type2_product_type.disable_time as product_type_disable_time
   FROM formula.part_category_2_product_type as type2_product_type
   left join formula.part_category_2 type2 on type2.id = type2_product_type.part_category_2_id;