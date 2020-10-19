-- Table: wiprocurement.c_cleansheet_cost

-- DROP TABLE wiprocurement.c_cleansheet_cost;

CREATE TABLE wiprocurement.c_cleansheet_cost
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v1(),
    cleansheetid uuid,
    costname character varying COLLATE pg_catalog."default",
    costdata text COLLATE pg_catalog."default",
    costprice numeric,
    CONSTRAINT c_cleansheet_cost_pkey PRIMARY KEY (uuid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.c_cleansheet_cost
    OWNER to "swpc-user";

-- Table: wiprocurement.c_file_costbom

-- DROP TABLE wiprocurement.c_file_costbom;

CREATE TABLE wiprocurement.c_file_costbom
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v1(),
    versionid uuid,
    fileid uuid,
    partid uuid,
    CONSTRAINT c_file_costbom_pkey PRIMARY KEY (uuid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.c_file_costbom
    OWNER to "swpc-user";

-- Table: wiprocurement.c_file_tooling

-- DROP TABLE wiprocurement.c_file_tooling;

CREATE TABLE wiprocurement.c_file_tooling
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v1(),
    versionid uuid,
    fileid uuid,
    toolingtype character varying COLLATE pg_catalog."default",
    toolingid uuid,
    CONSTRAINT c_file_tooling_pkey PRIMARY KEY (uuid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.c_file_tooling
    OWNER to "swpc-user";

-- Table: wiprocurement.c_files

-- DROP TABLE wiprocurement.c_files;

CREATE TABLE wiprocurement.c_files
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v1(),
    versionid uuid,
    fileid uuid,
    filetype character varying COLLATE pg_catalog."default",
    fileversion character varying COLLATE pg_catalog."default",
    filedate timestamp with time zone,
    CONSTRAINT c_files_pkey PRIMARY KEY (uuid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.c_files
    OWNER to "swpc-user";

-- Table: wiprocurement.c_part_cleansheets

-- DROP TABLE wiprocurement.c_part_cleansheets;

CREATE TABLE wiprocurement.c_part_cleansheets
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v1(),
    partid uuid,
    type character varying COLLATE pg_catalog."default",
    vendor character varying COLLATE pg_catalog."default",
    parttype character varying COLLATE pg_catalog."default",
    sourcercost numeric,
    cleansheetid uuid,
    CONSTRAINT c_part_cleansheets_pkey PRIMARY KEY (uuid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.c_part_cleansheets
    OWNER to "swpc-user";

-- Table: wiprocurement.c_parts

-- DROP TABLE wiprocurement.c_parts;

CREATE TABLE wiprocurement.c_parts
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v1(),
    partid uuid,
    partlevel integer,
    partnumber character varying COLLATE pg_catalog."default",
    partname character varying COLLATE pg_catalog."default",
    currency character varying COLLATE pg_catalog."default",
    quantity numeric,
    customerpartnumber character varying COLLATE pg_catalog."default",
    owner character varying COLLATE pg_catalog."default",
    gbassycategory character varying COLLATE pg_catalog."default",
    functioncategory character varying COLLATE pg_catalog."default",
    partscategory1 character varying COLLATE pg_catalog."default",
    partscategory2 character varying COLLATE pg_catalog."default",
    material character varying COLLATE pg_catalog."default",
    materialspec character varying COLLATE pg_catalog."default",
    partssizew numeric,
    partssizel numeric,
    partssizeh numeric,
    parssized numeric,
    partssizem numeric,
    thickness numeric,
    partsweightefiq numeric,
    partsweightevt numeric,
    partsweightdvt1 numeric,
    partsweightdvt2 numeric,
    partsweightpilot numeric,
    referencepartproject character varying COLLATE pg_catalog."default",
    referencepartname character varying COLLATE pg_catalog."default",
    idme1process character varying COLLATE pg_catalog."default",
    idme1finish character varying COLLATE pg_catalog."default",
    idme1color character varying COLLATE pg_catalog."default",
    idme2process character varying COLLATE pg_catalog."default",
    idme2finish character varying COLLATE pg_catalog."default",
    idme2color character varying COLLATE pg_catalog."default",
    idme3process character varying COLLATE pg_catalog."default",
    idme3finish character varying COLLATE pg_catalog."default",
    idme3color character varying COLLATE pg_catalog."default",
    idme4process character varying COLLATE pg_catalog."default",
    idme4finish character varying COLLATE pg_catalog."default",
    idme4color character varying COLLATE pg_catalog."default",
    fixtureprocess character varying COLLATE pg_catalog."default",
    fixturefinish character varying COLLATE pg_catalog."default",
    fixturecolor1 character varying COLLATE pg_catalog."default",
    fixturecolor2 character varying COLLATE pg_catalog."default",
    newtooling boolean,
    remark character varying COLLATE pg_catalog."default",
    CONSTRAINT c_parts_pkey PRIMARY KEY (uuid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.c_parts
    OWNER to "swpc-user";

-- Table: wiprocurement.c_projects

-- DROP TABLE wiprocurement.c_projects;

CREATE TABLE wiprocurement.c_projects
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v1(),
    projectcode character varying COLLATE pg_catalog."default",
    projectname character varying COLLATE pg_catalog."default",
    product character varying COLLATE pg_catalog."default",
    bgkey character varying COLLATE pg_catalog."default",
    productspec character varying COLLATE pg_catalog."default",
    createby character varying COLLATE pg_catalog."default",
    createtime timestamp with time zone,
    versionid uuid,
    profitcenter character varying COLLATE pg_catalog."default",
    site character varying COLLATE pg_catalog."default",
    CONSTRAINT c_projects_pkey PRIMARY KEY (uuid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.c_projects
    OWNER to "swpc-user";

-- Table: wiprocurement.c_tooling_parts_metal

-- DROP TABLE wiprocurement.c_tooling_parts_metal;

CREATE TABLE wiprocurement.c_tooling_parts_metal
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v1(),
    toolingid uuid,
    partnumber character varying COLLATE pg_catalog."default",
    partname character varying COLLATE pg_catalog."default",
    icon text COLLATE pg_catalog."default",
    material character varying COLLATE pg_catalog."default",
    thickness numeric,
    partsizew numeric,
    partsizel numeric,
    partsizeh numeric,
    finishw numeric,
    finishl numeric,
    process text COLLATE pg_catalog."default",
    edgesizew numeric,
    edgesizel numeric,
    materialsizew numeric,
    materialsizel numeric,
    netweight numeric,
    grossweight numeric,
    processnumber numeric,
    cavitynumber numeric,
    progressivedie text COLLATE pg_catalog."default",
    stagedie text COLLATE pg_catalog."default",
    rivetingdie text COLLATE pg_catalog."default",
    dietype character varying COLLATE pg_catalog."default",
    diefeature character varying COLLATE pg_catalog."default",
    maledie character varying COLLATE pg_catalog."default",
    femaledie character varying COLLATE pg_catalog."default",
    toolingsizew numeric,
    toolingsizel numeric,
    toolingsizeh numeric,
    dieweight numeric,
    materialcost numeric,
    shrinkagerate numeric,
    cycletime numeric,
    yieldrate numeric,
    utilization numeric,
    outputdaily numeric,
    outputmonthly numeric,
    reqmonoutput character varying COLLATE pg_catalog."default",
    reqdieamount character varying COLLATE pg_catalog."default",
    reqmarchineamount character varying COLLATE pg_catalog."default",
    reqtotalamount character varying COLLATE pg_catalog."default",
    diesetplant character varying COLLATE pg_catalog."default",
    moldingmanufacturer character varying COLLATE pg_catalog."default",
    madein character varying COLLATE pg_catalog."default",
    chargeplant character varying COLLATE pg_catalog."default",
    bonded character varying COLLATE pg_catalog."default",
    tsdate character varying COLLATE pg_catalog."default",
    t1date character varying COLLATE pg_catalog."default",
    remark character varying COLLATE pg_catalog."default",
    CONSTRAINT c_tooling_parts_metal_pkey PRIMARY KEY (uuid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.c_tooling_parts_metal
    OWNER to "swpc-user";

-- Table: wiprocurement.c_versions

-- DROP TABLE wiprocurement.c_versions;

CREATE TABLE wiprocurement.c_versions
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v1(),
    stage character varying COLLATE pg_catalog."default",
    versionnumber character varying COLLATE pg_catalog."default",
    createtime timestamp with time zone,
    submitby character varying COLLATE pg_catalog."default",
    submittime timestamp with time zone,
    confirmby character varying COLLATE pg_catalog."default",
    confirmtime timestamp with time zone,
    confirmstatus boolean,
    CONSTRAINT c_versions_pkey PRIMARY KEY (uuid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.c_versions
    OWNER to "swpc-user";                                