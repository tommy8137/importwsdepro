alter table formula.rubber_machine_product_type 
drop constraint if exists rubber_machine_product_type_fk2;

update formula.rubber_machine_product_type 
set product_type_id = 0
where product_type_id = (select id from formula.product_type where type_name = 'AIO');