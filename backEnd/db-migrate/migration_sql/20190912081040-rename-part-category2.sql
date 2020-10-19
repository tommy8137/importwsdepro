--update drop down item name
--Me Others
update wiprocurement.drop_down_item set item_name='Name_Plate' where path='MEOTHERS.NAMEPLATE' and field_name='parts_ctgy_2';

--Medical
update wiprocurement.drop_down_item set item_name='Bond_Detach_Adhesive' where path='MEOTHERS.BONDDETACHADHESIVE' and field_name='parts_ctgy_2';
update wiprocurement.drop_down_item set item_name='EMI_Spring' where path='EMC2.EMISPRING' and field_name='parts_ctgy_2';
