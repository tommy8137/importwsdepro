delete from wiprocurement.bom_partlist_config
where format = (select id from wiprocurement.bom_partlist_format where format_key = 'thermal-heatsink');

delete  from wiprocurement.bom_partlist_format where format_key = 'thermal-heatsink';