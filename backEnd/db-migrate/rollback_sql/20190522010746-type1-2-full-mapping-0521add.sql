
delete from wiprocurement.drop_down_item where memo='0522-fiona2';
delete from wiprocurement.drop_down_item where memo='0522-fiona';
delete from wiprocurement.drop_down_item where memo='0521-add2';
delete from wiprocurement.drop_down_item where memo='0521-add1';

ALTER table wiprocurement.drop_down_item 
drop column create_time ,
drop column update_time ,
drop column memo ;