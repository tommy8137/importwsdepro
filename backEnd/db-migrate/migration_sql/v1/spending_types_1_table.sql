CREATE TABLE IF NOT EXISTS  wiprocurement.spending_types
(
    plant character varying COLLATE pg_catalog."default" NOT NULL,
    scode character varying COLLATE pg_catalog."default" NOT NULL,
    type1 character varying COLLATE pg_catalog."default" NOT NULL,
    type2 character varying COLLATE pg_catalog."default" NOT NULL,
    create_date timestamp with time zone DEFAULT now(),
    CONSTRAINT spending_types_pkey PRIMARY KEY (plant, scode, type1, type2)
);