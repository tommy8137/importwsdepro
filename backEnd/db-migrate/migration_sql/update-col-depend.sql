update wiprocurement.col_dependence set required_col_id= (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness') where col_val='73fda3f0-5a91-11e9-8606-0242ac110002' and required_col_id=(select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_weight');
update wiprocurement.col_dependence set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.PLAST') where col_val='933d28f0-7bb9-11e9-89dc-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.PAD')	where col_val='6c5c056a-67e3-11e9-874c-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.GRAPHITESHEET') where col_val='6c5c077c-67e3-11e9-874c-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.CUFOIL') where col_val='6c5c0998-67e3-11e9-874c-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.METAL') where col_val='73fd9860-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.ALUMI') where col_val='73fd9b1c-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.CONDU') where col_val='73fd9f68-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.GASKE') where col_val='73fda3f0-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.AL_CU') where col_val='73fda832-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.ABSOR') where col_val='73fdac74-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.RUBBER') where col_val='6c5c1e2e-67e3-11e9-874c-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON') where col_val='6c5c1e2e-67e3-11e9-874c-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON') where col_val='6c5c35d0-67e3-11e9-874c-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.PROTE') where col_val='73fdafda-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.ADHES') where col_val='73fdb412-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.SPONG') where col_val='73fdb840-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.MYLAR') where col_val='73fdbb10-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.STAND') where col_val='73fdc330-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.NUT') where col_val='73fdc68c-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='MEOTHERS.SCREW') where col_val='73fdc98e-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.DOUBL') where col_val='73fde018-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.RHCM_') where col_val='73fde2f2-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.IMR') where col_val='73fde5d6-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.FAN') where col_val='73fdec7a-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='THERMAL2.HEATS') where col_val='73fdf22e-5a91-11e9-8606-0242ac110002';
update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='EMC2.SHIEL') where col_val='73fdf512-5a91-11e9-8606-0242ac110002';
-- update wiprocurement.col_dependence	set col_val = (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.PLAST_NB') where col_val='933d28f0-7bb9-11e9-89dc-0242ac110002';

-- HOUSING.PLAST
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id) values(
        (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.PLAST'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness'));

--HOUSING.Double_Injection 
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id) values(
        (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.DOUBL'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness'));

--HOUSING.RHCM_Process 
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id) values(
        (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.RHCM_'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness'));

--HOUSING.IMR 
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id) values(
        (select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.IMR'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness'));

-- HOUSING.PAINTING
insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.PAINTING'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_l'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.PAINTING'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_w'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.PAINTING'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_size_h'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.PAINTING'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='thickness'));

insert into wiprocurement.col_dependence(col_val, col_id, required_col_id)
values((select id from wiprocurement.drop_down_item where field_name='parts_ctgy_2' and path='HOUSING.PAINTING'), 
	   (select id from  wiprocurement.col_definite where col_key='parts_ctgy_2' and used_by='bom_item'),
	   (select id from wiprocurement.col_definite where used_by='bom_item' and col_key='part_weight'));