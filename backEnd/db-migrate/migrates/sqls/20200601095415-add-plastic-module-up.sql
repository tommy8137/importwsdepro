drop table if exists formula.tmp_plastic_module;
CREATE TABLE if not exists formula.tmp_plastic_module (
	module_name varchar(200),
	ton varchar(200),
	value varchar (200)
);

insert into formula.tmp_plastic_module(module_name, ton, value) values
-- module_9
('module_9', '50T', '0.0588'),
('module_9', '80T', '0.0588'),
('module_9', '100T', '0.0691'),
('module_9', '130T', '0.0847'),
('module_9', '150T', '0.0946'),
('module_9', '160T', '0.0946'),
('module_9', '180T', '0.1049'),
('module_9', '190T', '0.1049'),
('module_9', '200T', '0.1049'),
('module_9', '210T', '0.1049'),
('module_9', '240T', '0.1230'),
('module_9', '250T', '0.1230'),
('module_9', '290T', '0.1230'),
('module_9', '300T', '0.1230'),
('module_9', '350T', '0.1353'),
('module_9', '400T', '0.1353'),
('module_9', '450T', '0.1627'),
('module_9', '500T', '0.1782'),
('module_9', '550T', '0.2025'),
('module_9', '600T', '0.2025'),
('module_9', '650T', '0.2277'),
('module_9', '800T', '0.2528'),
('module_9', '850T', '0.2528'),
('module_9', '1000T', '0.3164'),
('module_9', '1100T', '0.3164'),
('module_9', '1200T', '0.3327'),
('module_9', '1300T', '0.3327'),
('module_9', '1400T', '0.3646'),
('module_9', '1600T', '0.4621'),
('module_9', '1680T', '0.4621'),
('module_9', '1800T', '0.5006'),
('module_9', '2000T', '0.5843'),
('module_9', '2200T', '0.5843'),
('module_9', '2500T', '0.6368'),
-- module_11
('module_11', '50T', '0.0588'),
('module_11', '80T', '0.0588'),
('module_11', '100T', '0.0691'),
('module_11', '130T', '0.0847'),
('module_11', '150T', '0.0946'),
('module_11', '160T', '0.0946'),
('module_11', '180T', '0.1049'),
('module_11', '190T', '0.1049'),
('module_11', '200T', '0.1049'),
('module_11', '210T', '0.1049'),
('module_11', '240T', '0.1230'),
('module_11', '250T', '0.1230'),
('module_11', '290T', '0.1230'),
('module_11', '300T', '0.1230'),
('module_11', '350T', '0.1353'),
('module_11', '400T', '0.1353'),
('module_11', '450T', '0.1627'),
('module_11', '500T', '0.1782'),
('module_11', '550T', '0.2025'),
('module_11', '600T', '0.2025'),
('module_11', '650T', '0.2277'),
('module_11', '800T', '0.2528'),
('module_11', '850T', '0.2528'),
('module_11', '1000T', '0.3164'),
('module_11', '1100T', '0.3164'),
('module_11', '1200T', '0.3327'),
('module_11', '1300T', '0.3327'),
('module_11', '1400T', '0.3646'),
('module_11', '1600T', '0.4621'),
('module_11', '1680T', '0.4621'),
('module_11', '1800T', '0.5006'),
('module_11', '2000T', '0.5843'),
('module_11', '2200T', '0.5843'),
('module_11', '2500T', '0.6368'),
-- module_13
('module_13', '50T', '0.0588'),
('module_13', '80T', '0.0588'),
('module_13', '100T', '0.0691'),
('module_13', '130T', '0.0847'),
('module_13', '150T', '0.0946'),
('module_13', '160T', '0.0946'),
('module_13', '180T', '0.1049'),
('module_13', '190T', '0.1049'),
('module_13', '200T', '0.1049'),
('module_13', '210T', '0.1049'),
('module_13', '240T', '0.1230'),
('module_13', '250T', '0.1230'),
('module_13', '290T', '0.1230'),
('module_13', '300T', '0.1230'),
('module_13', '350T', '0.1353'),
('module_13', '400T', '0.1353'),
('module_13', '450T', '0.1627'),
('module_13', '500T', '0.1782'),
('module_13', '550T', '0.2025'),
('module_13', '600T', '0.2025'),
('module_13', '650T', '0.2277'),
('module_13', '800T', '0.2528'),
('module_13', '850T', '0.2528'),
('module_13', '1000T', '0.3164'),
('module_13', '1100T', '0.3164'),
('module_13', '1200T', '0.3327'),
('module_13', '1300T', '0.3327'),
('module_13', '1400T', '0.3646'),
('module_13', '1600T', '0.4621'),
('module_13', '1680T', '0.4621'),
('module_13', '1800T', '0.5006'),
('module_13', '2000T', '0.5843'),
('module_13', '2200T', '0.5843'),
('module_13', '2500T', '0.6368'),
-- module_15
('module_15', '50T', '0.0588'),
('module_15', '80T', '0.0588'),
('module_15', '100T', '0.0691'),
('module_15', '130T', '0.0847'),
('module_15', '150T', '0.0946'),
('module_15', '160T', '0.0946'),
('module_15', '180T', '0.1049'),
('module_15', '190T', '0.1049'),
('module_15', '200T', '0.1049'),
('module_15', '210T', '0.1049'),
('module_15', '240T', '0.1230'),
('module_15', '250T', '0.1230'),
('module_15', '290T', '0.1230'),
('module_15', '300T', '0.1230'),
('module_15', '350T', '0.1353'),
('module_15', '400T', '0.1353'),
('module_15', '450T', '0.1627'),
('module_15', '500T', '0.1782'),
('module_15', '550T', '0.2025'),
('module_15', '600T', '0.2025'),
('module_15', '650T', '0.2277'),
('module_15', '800T', '0.2528'),
('module_15', '850T', '0.2528'),
('module_15', '1000T', '0.3164'),
('module_15', '1100T', '0.3164'),
('module_15', '1200T', '0.3327'),
('module_15', '1300T', '0.3327'),
('module_15', '1400T', '0.3646'),
('module_15', '1600T', '0.4621'),
('module_15', '1680T', '0.4621'),
('module_15', '1800T', '0.5006'),
('module_15', '2000T', '0.5843'),
('module_15', '2200T', '0.5843'),
('module_15', '2500T', '0.6368'),
-- module_10
('module_10', '50T', '0.1156'),
('module_10', '80T', '0.1156'),
('module_10', '100T', '0.1284'),
('module_10', '130T', '0.1284'),
('module_10', '150T', '0.1487'),
('module_10', '160T', '0.1487'),
('module_10', '180T', '0.1487'),
('module_10', '190T', '0.1487'),
('module_10', '200T', '0.1487'),
('module_10', '210T', '0.1487'),
('module_10', '240T', '0.1650'),
('module_10', '250T', '0.1650'),
('module_10', '290T', '0.1650'),
('module_10', '300T', '0.1650'),
('module_10', '350T', '0.2140'),
('module_10', '400T', '0.2140'),
('module_10', '450T', '0.2582'),
('module_10', '500T', '0.2582'),
('module_10', '550T', '0.2818'),
('module_10', '600T', '0.2818'),
('module_10', '650T', '0.3212'),
('module_10', '800T', '0.3629'),
('module_10', '850T', '0.3629'),
('module_10', '1000T', '0.4265'),
-- module_12
('module_12', '50T', '0.1156'),
('module_12', '80T', '0.1156'),
('module_12', '100T', '0.1284'),
('module_12', '130T', '0.1284'),
('module_12', '150T', '0.1487'),
('module_12', '160T', '0.1487'),
('module_12', '180T', '0.1487'),
('module_12', '190T', '0.1487'),
('module_12', '200T', '0.1487'),
('module_12', '210T', '0.1487'),
('module_12', '240T', '0.1650'),
('module_12', '250T', '0.1650'),
('module_12', '290T', '0.1650'),
('module_12', '300T', '0.1650'),
('module_12', '350T', '0.2140'),
('module_12', '400T', '0.2140'),
('module_12', '450T', '0.2582'),
('module_12', '500T', '0.2582'),
('module_12', '550T', '0.2818'),
('module_12', '600T', '0.2818'),
('module_12', '650T', '0.3212'),
('module_12', '800T', '0.3629'),
('module_12', '850T', '0.3629'),
('module_12', '1000T', '0.4265'),
-- module_14
('module_14', '50T', '0.1156'),
('module_14', '80T', '0.1156'),
('module_14', '100T', '0.1284'),
('module_14', '130T', '0.1284'),
('module_14', '150T', '0.1487'),
('module_14', '160T', '0.1487'),
('module_14', '180T', '0.1487'),
('module_14', '190T', '0.1487'),
('module_14', '200T', '0.1487'),
('module_14', '210T', '0.1487'),
('module_14', '240T', '0.1650'),
('module_14', '250T', '0.1650'),
('module_14', '290T', '0.1650'),
('module_14', '300T', '0.1650'),
('module_14', '350T', '0.2140'),
('module_14', '400T', '0.2140'),
('module_14', '450T', '0.2582'),
('module_14', '500T', '0.2582'),
('module_14', '550T', '0.2818'),
('module_14', '600T', '0.2818'),
('module_14', '650T', '0.3212'),
('module_14', '800T', '0.3629'),
('module_14', '850T', '0.3629'),
('module_14', '1000T', '0.4265'),
-- module_16
('module_16', '50T', '0.1156'),
('module_16', '80T', '0.1156'),
('module_16', '100T', '0.1284'),
('module_16', '130T', '0.1284'),
('module_16', '150T', '0.1487'),
('module_16', '160T', '0.1487'),
('module_16', '180T', '0.1487'),
('module_16', '190T', '0.1487'),
('module_16', '200T', '0.1487'),
('module_16', '210T', '0.1487'),
('module_16', '240T', '0.1650'),
('module_16', '250T', '0.1650'),
('module_16', '290T', '0.1650'),
('module_16', '300T', '0.1650'),
('module_16', '350T', '0.2140'),
('module_16', '400T', '0.2140'),
('module_16', '450T', '0.2582'),
('module_16', '500T', '0.2582'),
('module_16', '550T', '0.2818'),
('module_16', '600T', '0.2818'),
('module_16', '650T', '0.3212'),
('module_16', '800T', '0.3629'),
('module_16', '850T', '0.3629'),
('module_16', '1000T', '0.4265'),
-- module_17
('module_17', '50T', '0.1407'),
('module_17', '80T', '0.1407'),
('module_17', '100T', '0.1624'),
('module_17', '130T', '0.1624'),
('module_17', '150T', '0.1888'),
('module_17', '160T', '0.1888'),
('module_17', '180T', '0.1888'),
('module_17', '190T', '0.1888'),
('module_17', '200T', '0.1888'),
('module_17', '210T', '0.1888'),
('module_17', '240T', '0.2115'),
('module_17', '250T', '0.2115'),
('module_17', '290T', '0.2115'),
('module_17', '300T', '0.2115'),
('module_17', '350T', '0.2614'),
('module_17', '400T', '0.2614'),
('module_17', '450T', '0.2847'),
('module_17', '500T', '0.2847'),
('module_17', '550T', '0.3472'),
('module_17', '600T', '0.3472'),
('module_17', '650T', '0.3756'),
('module_17', '800T', '0.4199'),
('module_17', '850T', '0.4199'),
('module_17', '1000T', '0.4668'),
-- module_18
('module_18', '50T', '0.1407'),
('module_18', '80T', '0.1407'),
('module_18', '100T', '0.1624'),
('module_18', '130T', '0.1624'),
('module_18', '150T', '0.1888'),
('module_18', '160T', '0.1888'),
('module_18', '180T', '0.1888'),
('module_18', '190T', '0.1888'),
('module_18', '200T', '0.1888'),
('module_18', '210T', '0.1888'),
('module_18', '240T', '0.2115'),
('module_18', '250T', '0.2115'),
('module_18', '290T', '0.2115'),
('module_18', '300T', '0.2115'),
('module_18', '350T', '0.2614'),
('module_18', '400T', '0.2614'),
('module_18', '450T', '0.2847'),
('module_18', '500T', '0.2847'),
('module_18', '550T', '0.3472'),
('module_18', '600T', '0.3472'),
('module_18', '650T', '0.3756'),
('module_18', '800T', '0.4199'),
('module_18', '850T', '0.4199'),
('module_18', '1000T', '0.4668'),
-- module_19
('module_19', '50T', '0.1407'),
('module_19', '80T', '0.1407'),
('module_19', '100T', '0.1624'),
('module_19', '130T', '0.1624'),
('module_19', '150T', '0.1888'),
('module_19', '160T', '0.1888'),
('module_19', '180T', '0.1888'),
('module_19', '190T', '0.1888'),
('module_19', '200T', '0.1888'),
('module_19', '210T', '0.1888'),
('module_19', '240T', '0.2115'),
('module_19', '250T', '0.2115'),
('module_19', '290T', '0.2115'),
('module_19', '300T', '0.2115'),
('module_19', '350T', '0.2614'),
('module_19', '400T', '0.2614'),
('module_19', '450T', '0.2847'),
('module_19', '500T', '0.2847'),
('module_19', '550T', '0.3472'),
('module_19', '600T', '0.3472'),
('module_19', '650T', '0.3756'),
('module_19', '800T', '0.4199'),
('module_19', '850T', '0.4199'),
('module_19', '1000T', '0.4668'),
-- module_20
('module_20', '50T', '0.1407'),
('module_20', '80T', '0.1407'),
('module_20', '100T', '0.1624'),
('module_20', '130T', '0.1624'),
('module_20', '150T', '0.1888'),
('module_20', '160T', '0.1888'),
('module_20', '180T', '0.1888'),
('module_20', '190T', '0.1888'),
('module_20', '200T', '0.1888'),
('module_20', '210T', '0.1888'),
('module_20', '240T', '0.2115'),
('module_20', '250T', '0.2115'),
('module_20', '290T', '0.2115'),
('module_20', '300T', '0.2115'),
('module_20', '350T', '0.2614'),
('module_20', '400T', '0.2614'),
('module_20', '450T', '0.2847'),
('module_20', '500T', '0.2847'),
('module_20', '550T', '0.3472'),
('module_20', '600T', '0.3472'),
('module_20', '650T', '0.3756'),
('module_20', '800T', '0.4199'),
('module_20', '850T', '0.4199'),
('module_20', '1000T', '0.4668'),
-- module_21
('module_21', '50T', '0.1407'),
('module_21', '80T', '0.1407'),
('module_21', '100T', '0.1624'),
('module_21', '130T', '0.1624'),
('module_21', '150T', '0.1888'),
('module_21', '160T', '0.1888'),
('module_21', '180T', '0.1888'),
('module_21', '190T', '0.1888'),
('module_21', '200T', '0.1888'),
('module_21', '210T', '0.1888'),
('module_21', '240T', '0.2115'),
('module_21', '250T', '0.2115'),
('module_21', '290T', '0.2115'),
('module_21', '300T', '0.2115'),
('module_21', '350T', '0.2614'),
('module_21', '400T', '0.2614'),
('module_21', '450T', '0.2847'),
('module_21', '500T', '0.2847'),
('module_21', '550T', '0.3472'),
('module_21', '600T', '0.3472'),
('module_21', '650T', '0.3756'),
('module_21', '800T', '0.4199'),
('module_21', '850T', '0.4199'),
('module_21', '1000T', '0.4668'),
-- module_22
('module_22', '50T', '0.1407'),
('module_22', '80T', '0.1407'),
('module_22', '100T', '0.1624'),
('module_22', '130T', '0.1624'),
('module_22', '150T', '0.1888'),
('module_22', '160T', '0.1888'),
('module_22', '180T', '0.1888'),
('module_22', '190T', '0.1888'),
('module_22', '200T', '0.1888'),
('module_22', '210T', '0.1888'),
('module_22', '240T', '0.2115'),
('module_22', '250T', '0.2115'),
('module_22', '290T', '0.2115'),
('module_22', '300T', '0.2115'),
('module_22', '350T', '0.2614'),
('module_22', '400T', '0.2614'),
('module_22', '450T', '0.2847'),
('module_22', '500T', '0.2847'),
('module_22', '550T', '0.3472'),
('module_22', '600T', '0.3472'),
('module_22', '650T', '0.3756'),
('module_22', '800T', '0.4199'),
('module_22', '850T', '0.4199'),
('module_22', '1000T', '0.4668');

insert into formula."module" (module_name)
select add_order.module_name
from (
  select distinct module_name, SPLIT_PART(module_name, '_', 2)::int as order_num
  from formula.tmp_plastic_module
) add_order
order by add_order.order_num asc
on conflict do nothing;

insert into formula.module_machine (module_id, machine_id, create_time)
select mo.id, ma.id, now()
from formula.tmp_plastic_module tmp
left join formula."module" mo on mo.module_name = tmp.module_name
left join formula.machine ma on ma.ton = tmp.ton
on conflict do nothing;

insert into formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select link.id, sd.id, tmp.value, 'number', 'module_machine'
from formula.module_machine link,
formula.schedule_date sd,
formula.tmp_plastic_module tmp
left join formula."module" mo on mo.module_name = tmp.module_name
left join formula.machine ma on ma.ton = tmp.ton
where link.machine_id  = ma.id
and link.module_id = mo.id 
and sd.formula_type_id = (select id from formula.formula_type where name = 'housing_plastic')
and sd.product_type_id is null
on conflict do nothing;

drop table if exists formula.tmp_plastic_module_product_type;
CREATE TABLE if not exists formula.tmp_plastic_module_product_type (
	product_type varchar(200),
	category2 varchar(200),
	module_name varchar (200)
);
insert into formula.tmp_plastic_module_product_type(product_type, module_name, category2)values
-- NB
('NB', 'module_1', 'Plastic'),
('NB', 'module_1', 'Painting'),
('NB', 'module_7', 'Double_Injection'),
('NB', 'module_1', 'Insert_Molding'),
('NB', 'module_4', 'RHCM_Process'),
('NB', 'module_6', 'IMR'),
-- DT
('DT', 'module_2', 'Plastic'),
('DT', 'module_2', 'Painting'),
('DT', 'module_17', 'Double_Injection'),
('DT', 'module_2', 'Insert_Molding'),
('DT', 'module_5', 'RHCM_Process'),
-- AIO
('AIO', 'module_3', 'Plastic'),
('AIO', 'module_3', 'Painting'),
('AIO', 'module_18', 'Double_Injection'),
('AIO', 'module_3', 'Insert_Molding'),
('AIO', 'module_8', 'RHCM_Process'),
-- VoIP
('VoIP', 'module_9', 'Plastic'),
('VoIP', 'module_9', 'Painting'),
('VoIP', 'module_19', 'Double_Injection'),
('VoIP', 'module_9', 'Insert_Molding'),
('VoIP', 'module_10', 'RHCM_Process'),
-- Server
('Server', 'module_11', 'Plastic'),
('Server', 'module_11', 'Painting'),
('Server', 'module_20', 'Double_Injection'),
('Server', 'module_11', 'Insert_Molding'),
('Server', 'module_12', 'RHCM_Process');

truncate formula.product_type_category_module;
insert into formula.product_type_category_module(module_id, part_category_2_id, product_type_id)
select mo.id, ctgy.id, product.id
from formula.tmp_plastic_module_product_type tmp
left join formula.product_type product on product.type_name = tmp.product_type
left join formula.part_category_2 ctgy on ctgy.category_name = tmp.category2 
left join formula."module" mo on mo.module_name = tmp.module_name
on conflict do nothing;

drop table if exists formula.tmp_plastic_module_product_type;
drop table if exists formula.tmp_plastic_module;