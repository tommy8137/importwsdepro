update wiprocurement.bom_item
set suggestion_cost_type = 'auto_lowest_cost'
where suggestion_cost_type is null;