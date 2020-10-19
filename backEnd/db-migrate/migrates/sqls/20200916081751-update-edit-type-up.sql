/* Replace with your SQL commands */


UPDATE wiprocurement.bom_project_edit_type
SET label = 'spa_cost'
WHERE action_type='bom_item_gerenal' and part_type='spa' and label = 'spa_cost_up';

UPDATE wiprocurement.bom_project_edit_type
SET part_type='spa_cost_material_remark'
WHERE action_type='bom_item_gerenal' and part_type='spa' and label = 'material_name';
