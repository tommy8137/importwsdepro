CREATE TABLE wiprocurement.supplytypemapping
(
    key character varying(5) ,
    supply_type character varying(10) ,
    odmoem character varying(10),
    PRIMARY KEY (key)
);

INSERT INTO wiprocurement.supplytypemapping (key, supply_type, odmoem) VALUES ('1', 'B', 'OEM');
INSERT INTO wiprocurement.supplytypemapping (key, supply_type, odmoem) VALUES ('3', 'C', 'OEM');
INSERT INTO wiprocurement.supplytypemapping (key, supply_type, odmoem) VALUES ('11', 'A', 'OEM');
INSERT INTO wiprocurement.supplytypemapping (key, supply_type, odmoem) VALUES ('13', 'AV', 'OEM');
INSERT INTO wiprocurement.supplytypemapping (key, supply_type, odmoem) VALUES ('14', 'W', 'ODM');
INSERT INTO wiprocurement.supplytypemapping (key, supply_type, odmoem) VALUES ('15', 'S', 'ODM');