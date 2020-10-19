/* Replace with your SQL commands */
update formula.magnet_cut_loss_rate set cut_size_end = 0 where cut_size_end = 999999;
update formula.magnet_manpower set area_size_end = 0 where area_size_end = 999999;
update formula.turning_nylok_length set length_end = 3 where length_end = 2.9;
update formula.turning_nylok_length set length_end = 10 where length_end = 9.9;