
ALTER TABLE wiprocurement.me_spec_title rename column insby to ins1by;
ALTER TABLE wiprocurement.me_spec_title rename column insdate to ins1date;


ALTER TABLE wiprocurement.me_spec_title
	add column product_type varchar(100),
	add column ins2by varchar(20), add column ins2date timestamp with time zone,
	add column ins3by varchar(20), add column ins3date timestamp with time zone,
	add column ins4by varchar(20), add column ins4date timestamp with time zone,
	add column ins5by varchar(20), add column ins5date timestamp with time zone,
	add column ins6by varchar(20), add column ins6date timestamp with time zone,
	add column ins7by varchar(20), add column ins7date timestamp with time zone,
	add column ins8by varchar(20), add column ins8date timestamp with time zone,
	add column ins9by varchar(20), add column ins9date timestamp with time zone,
	add column ins10by varchar(20), add column ins10date timestamp with time zone,
	add column ins11by varchar(20), add column ins11date timestamp with time zone,
	add column ins12by varchar(20), add column ins12date timestamp with time zone,
	add column ins13by varchar(20), add column ins13date timestamp with time zone,
	add column ins14by varchar(20), add column ins14date timestamp with time zone,
	add column ins15by varchar(20), add column ins15date timestamp with time zone,
	add column ins16by varchar(20), add column ins16date timestamp with time zone,
	add column ins17by varchar(20), add column ins17date timestamp with time zone,
	add column ins18by varchar(20), add column ins18date timestamp with time zone,
	add column ins19by varchar(20), add column ins19date timestamp with time zone,
	add column ins20by varchar(20), add column ins20date timestamp with time zone,
	add column ins21by varchar(20), add column ins21date timestamp with time zone,
	add column ins22by varchar(20), add column ins22date timestamp with time zone,
	add column ins23by varchar(20), add column ins23date timestamp with time zone,
	add column ins24by varchar(20), add column ins24date timestamp with time zone,
	add column ins25by varchar(20), add column ins25date timestamp with time zone,
	add column ins26by varchar(20), add column ins26date timestamp with time zone,
	add column ins27by varchar(20), add column ins27date timestamp with time zone,
	add column ins28by varchar(20), add column ins28date timestamp with time zone,
	add column ins29by varchar(20), add column ins29date timestamp with time zone,
	add column ins30by varchar(20), add column ins30date timestamp with time zone;