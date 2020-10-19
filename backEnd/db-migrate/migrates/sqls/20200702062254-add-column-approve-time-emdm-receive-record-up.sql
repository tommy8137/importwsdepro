ALTER TABLE wiprocurement.emdm_receive_record ADD column if not exists approve_time timestamp;

update wiprocurement.emdm_receive_record rec_ori
set approve_time = rec.receive_time 
from wiprocurement.emdm_receive_record rec
where rec_ori.approve_time is null
and rec_ori.emdm_ppch_id = rec.emdm_ppch_id;

ALTER TABLE wiprocurement.emdm_receive_record alter column approve_time set not null;