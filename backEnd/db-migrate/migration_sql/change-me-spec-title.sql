CREATE SEQUENCE wiprocurement.me_spec_title_id_seq;

ALTER SEQUENCE wiprocurement.me_spec_title_id_seq
    OWNER TO "swpc-user";



ALTER TABLE wiprocurement.me_spec_title add column spec1 varchar(100) not null default nextval('wiprocurement.me_spec_title_id_seq');


ALTER TABLE wiprocurement.me_spec_title DROP CONSTRAINT me_spec_title_pkey CASCADE;

ALTER TABLE wiprocurement.me_spec_title ADD CONSTRAINT me_spec_title_pkey PRIMARY KEY (spec1, type1name, type2name)