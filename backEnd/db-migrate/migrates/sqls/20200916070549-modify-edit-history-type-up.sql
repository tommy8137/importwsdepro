/* Replace with your SQL commands */

UPDATE wiprocurement.bom_project_edit_type
SET part_type='housing_metal'
WHERE action_type='project_parameters' and part_type='housing-metal';

UPDATE wiprocurement.bom_project_edit_type
SET part_type='housing_plastic'
WHERE action_type='project_parameters' and part_type='housing-plastic';
