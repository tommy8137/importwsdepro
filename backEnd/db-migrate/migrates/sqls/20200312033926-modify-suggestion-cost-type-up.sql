-- system_cost => clean_sheet_cost
update wiprocurement.bom_item 
set suggestion_cost_type = 'clean_sheet_cost'
where suggestion_cost_type = 'system_cost';

update wiprocurement.bom_item_complete_version
set suggestion_cost_type = 'clean_sheet_cost'
where suggestion_cost_type = 'system_cost';

-- sourcer_cost => inquiry_cost
update wiprocurement.bom_item 
set suggestion_cost_type = 'inquiry_cost'
where suggestion_cost_type = 'sourcer_cost';

update wiprocurement.bom_item_complete_version
set suggestion_cost_type = 'inquiry_cost'
where suggestion_cost_type = 'sourcer_cost';

-- current_price => last_price
update wiprocurement.bom_item 
set suggestion_cost_type = 'last_price'
where suggestion_cost_type = 'current_price';

update wiprocurement.bom_item_complete_version
set suggestion_cost_type = 'last_price'
where suggestion_cost_type = 'current_price';

-- sub_total_cost => ce_cost_assembly
update wiprocurement.bom_item 
set suggestion_cost_type = 'ce_cost_assembly'
where suggestion_cost_type = 'sub_total_cost';

update wiprocurement.bom_item_complete_version
set suggestion_cost_type = 'ce_cost_assembly'
where suggestion_cost_type = 'sub_total_cost';