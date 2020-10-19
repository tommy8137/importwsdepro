/* Replace with your SQL commands */
DELETE FROM wiprocurement.col_dependence colDep 
WHERE colDep.col_id IN (
  SELECT id 
  FROM wiprocurement.col_definite 
  WHERE col_key = 'parts_ctgy_2'
)
AND colDep.col_val IN (
  SELECT id::varchar 
  FROM formula.part_category_2 
  WHERE category_name IN ('Mesh', 'Lens', 'Gasket', 'Nut', 'Screw','Standoff','Insert_Molding')
);

insert into wiprocurement.col_dependence (col_val, col_id, required_col_id) values (
	(SELECT id::varchar FROM formula.part_category_2 WHERE category_name = 'Gasket'),
	(SELECT id FROM wiprocurement.col_definite WHERE col_key = 'parts_ctgy_2'),
	(SELECT id FROM wiprocurement.col_definite WHERE col_name = 'L')
),
(
	(SELECT id::varchar FROM formula.part_category_2 WHERE category_name = 'Gasket'),
	(SELECT id FROM wiprocurement.col_definite WHERE col_key = 'parts_ctgy_2'),
	(SELECT id FROM wiprocurement.col_definite WHERE col_name = 'W')
),
(
	(SELECT id::varchar FROM formula.part_category_2 WHERE category_name = 'Gasket'),
	(SELECT id FROM wiprocurement.col_definite WHERE col_key = 'parts_ctgy_2'),
	(SELECT id FROM wiprocurement.col_definite WHERE col_name = 'H')
),
(
	(SELECT id::varchar FROM formula.part_category_2 WHERE category_name = 'Gasket'),
	(SELECT id FROM wiprocurement.col_definite WHERE col_key = 'parts_ctgy_2'),
	(SELECT id FROM wiprocurement.col_definite WHERE col_name = 'Thickness')
);