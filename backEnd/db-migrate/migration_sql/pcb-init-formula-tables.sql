CREATE TABLE wiprocurement.pcb_base_price(
    id serial primary key,
    typeii character varying(32),
    manufacturer character varying(256),
    spec01 character varying(64),
    spec02 character varying(64),
    spec03 character varying(64),
    base_price float,
    create_time timestamp(6) with time zone, 
    UNIQUE(typeii, manufacturer, spec01, spec02, spec03) 
);

CREATE TABLE wiprocurement.pcb_typeii_spec01(
    uuid uuid primary key NOT NULL DEFAULT uuid_generate_v1(),
    typeii character varying(32),
    spec01 character varying(64),
    create_time timestamp(6) with time zone, 
    UNIQUE(typeii, spec01) 
);

CREATE TABLE wiprocurement.pcb_formula_adder_rules(
    id serial primary key,
    pcb_typeii_spec01_uuid uuid references wiprocurement.pcb_typeii_spec01(uuid) ON DELETE CASCADE,
    reference character varying(64),
    spec character varying(64),
    reference_value character varying(64),
    create_time timestamp(6) with time zone 
);

CREATE TABLE wiprocurement.pcb_formula_usd_rules(
    id serial primary key,
    pcb_typeii_spec01_uuid uuid references wiprocurement.pcb_typeii_spec01(uuid) ON DELETE CASCADE,
    reference character varying(64),
    spec character varying(64),
    reference_value character varying(64),
    create_time timestamp(6) with time zone 
);

CREATE TABLE wiprocurement.pcb_manufacturer_adder(
    id serial primary key,
    pcb_typeii_spec01_uuid uuid references wiprocurement.pcb_typeii_spec01(uuid) ON DELETE CASCADE,
    manufacturer character varying(256),
    percentage float,
    create_time timestamp(6) with time zone 
);

CREATE TABLE wiprocurement.pcb_manufacturer_usd(
    id serial primary key,
    pcb_typeii_spec01_uuid uuid references wiprocurement.pcb_typeii_spec01(uuid) ON DELETE CASCADE,
    manufacturer character varying(256),
    price float,
    create_time timestamp(6) with time zone 
);

