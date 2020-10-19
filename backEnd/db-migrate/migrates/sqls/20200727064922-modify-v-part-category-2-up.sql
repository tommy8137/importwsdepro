drop view if EXISTS formula.v_part_category_2;
CREATE OR REPLACE VIEW formula.v_part_category_2 AS 
SELECT pc.id as id, 
	   pc.part_category_1_id as part_category_1_id, 
	   pc.category_name as category_name, 
	   pc.disable_time as disable_time 
from formula.part_category_2 as pc;

CREATE OR REPLACE VIEW formula.v_part_category_2_product_type AS 
SELECT type2_product_type.part_category_2_id as part_category_2_id, 
	   type2_product_type.product_type_id as product_type_id, 
	   type2_product_type.disable_time as disable_time 
from formula.part_category_2_product_type as type2_product_type;