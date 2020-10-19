/* Replace with your SQL commands */

UPDATE wiprocurement.bom_project_edit_type
SET part_type='spa', label = 'spa_cost_material_remark'
WHERE action_type='bom_item_gerenal' and part_type='spa_cost_material_remark' and label = 'material_name';
