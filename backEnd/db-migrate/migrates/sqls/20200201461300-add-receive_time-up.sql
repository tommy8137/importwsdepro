alter table wiprocurement.emdm_receive_record add column if not exists receive_time timestamp not null default current_timestamp;
