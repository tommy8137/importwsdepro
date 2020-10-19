CREATE TABLE wiprocurement.perm_type1_meee(
    id serial primary key,
    type1 character varying(64) NOT NULL,
    category integer,
    used_on integer DEFAULT 1
);
CREATE TABLE wiprocurement.perm_user_type1_meee(
    emplid character varying(32) references wiprocurement.user(emplid) ON DELETE CASCADE ON UPDATE CASCADE,
    type1_id integer references wiprocurement.perm_type1_meee(id)  ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE(emplid, type1_id)
);
CREATE TABLE wiprocurement.perm_scode_type1(
    type1 character varying(64),
    sourcer_code character varying(64),
    PRIMARY KEY (type1, sourcer_code)
);

