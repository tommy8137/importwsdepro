alter table wiprocurement.bom_item add column if not exists need_tooling bool default false;
alter table wiprocurement.bom_item_complete_version add column if not exists need_tooling bool default false;