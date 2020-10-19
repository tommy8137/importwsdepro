-- 修正eebom_spa_rules資料(字尾空白)
update wiprocurement.eebom_spa_rules set type1=trim(type1), type2=trim(type2), update_time=now();

-- 新增vendor過濾清單

-- Table: wiprocurement.vendor_filter

-- DROP TABLE wiprocurement.vendor_filter;

CREATE TABLE wiprocurement.vendor_filter
(
    vendor_code character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT vendor_filter_pkey PRIMARY KEY (vendor_code)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.vendor_filter
    OWNER to "swpc-user";

INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000016326'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000606379'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000626493'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000605722'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000200072'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000620627'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000612061'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000604596'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000625131'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000100655'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000625827'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000603173'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000607154'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000607593'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000600234'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000601536'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000622548'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000019216'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000617897'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000617433'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000621608'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000618821'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000616627'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000607583'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000604097'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000602358'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000603341'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000610059'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000617724'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000605685'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000626073'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000618473'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000604772'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000610505'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000018700'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000620480'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000601082'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000611055'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000200510'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000611837'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000625172'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000624987'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000620166'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000616542'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000016105'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000612220'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000616482'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000624435'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000625225'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000609077'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000600212'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000601314'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000606601'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000612371'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000612766'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000607715'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000620709'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000008806'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000600022'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000607332'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000607470'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000601225'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000611909'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000624725'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000621243'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000620147'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000603310'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000604519'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000606980'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000614215'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000016884'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000608756'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000624308'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000604250'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000620616'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000619554'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000619819'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000613774'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000601259'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000620073'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000608058'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000622389'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000600098'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000612988'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000607251'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000614730'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000624472'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000612851'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000623904'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000624728'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000618903'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000625486'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000623998'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000624986'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000624038'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000624084'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000625508'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000012552'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000624931'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000624730'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000624023'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000625492'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000617512'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000620316'));
INSERT INTO wiprocurement.vendor_filter (vendor_code) values (trim('0000621912'));    