DROP TABLE wiprocurement.supplytypemapping;

CREATE TABLE wiprocurement.supplytypemapping
(
    key character varying(5) COLLATE pg_catalog."default" NOT NULL,
    zzeeme varchar(8),
    supply_type character varying(10) COLLATE pg_catalog."default",
    odmoem character varying(10) COLLATE pg_catalog."default",
    description varchar(40),
    CONSTRAINT supplytypemapping_pkey PRIMARY KEY (key,zzeeme,odmoem)
);

INSERT INTO wiprocurement.supplytypemapping (key, zzeeme, supply_type, odmoem, description) VALUES ('1', 'EE/ME', 'B', 'OEM', 'Buy&Sell');
INSERT INTO wiprocurement.supplytypemapping (key, zzeeme, supply_type, odmoem, description) VALUES ('3', 'EE/ME','C', 'OEM', 'Controlled by Customer');
INSERT INTO wiprocurement.supplytypemapping (key, zzeeme, supply_type, odmoem, description) VALUES ('11', 'EE/ME','A', 'OEM', 'AVAP');
INSERT INTO wiprocurement.supplytypemapping (key, zzeeme, supply_type, odmoem, description) VALUES ('13', 'ME', 'AV', 'OEM', 'AV');
INSERT INTO wiprocurement.supplytypemapping (key, zzeeme, supply_type, odmoem, description) VALUES ('13', 'EE', 'AV', 'ODM', 'AV');
INSERT INTO wiprocurement.supplytypemapping (key, zzeeme, supply_type, odmoem, description) VALUES ('14', 'EE/ME','W', 'ODM', 'Controlled by Wistron');
INSERT INTO wiprocurement.supplytypemapping (key, zzeeme, supply_type, odmoem, description) VALUES ('15', 'EE/ME','S', 'ODM', 'Controlled by Supplier');
