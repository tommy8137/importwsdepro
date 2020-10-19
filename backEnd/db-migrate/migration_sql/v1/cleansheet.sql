
CREATE TABLE wiprocurement.c_projects (
  uuid                  uuid NOT NULL DEFAULT uuid_generate_v1(),
  projectcode           varchar,
  projectname           varchar,
  product               varchar,
  bgkey                 varchar,
  productspec           varchar,
  createby              varchar,
  createtime            timestamp with time zone,
  versionid             uuid,
  profitcenter          varchar,
  site                  varchar,
  CONSTRAINT c_projects_pkey PRIMARY KEY (uuid)
);

CREATE TABLE wiprocurement.c_versions (
  uuid                  uuid NOT NULL DEFAULT uuid_generate_v1(),
  stage                 varchar,
  versionnumber         varchar,
  createtime            timestamp with time zone,
  submitby              varchar,
  submittime            timestamp with time zone,
  confirmby             varchar,
  confirmtime           timestamp with time zone,
  confirmstatus         boolean,
  CONSTRAINT c_versions_pkey PRIMARY KEY (uuid)
);

CREATE TABLE wiprocurement.c_files (
  uuid                  uuid NOT NULL DEFAULT uuid_generate_v1(),
  versionid             uuid,
  fileid                uuid,
  filetype              varchar,
  fileversion           varchar,
  filedate              timestamp with time zone,
  CONSTRAINT c_files_pkey PRIMARY KEY (uuid)
);

CREATE TABLE wiprocurement.c_file_tooling (
  uuid                  uuid NOT NULL DEFAULT uuid_generate_v1(),
  versionid             uuid,
  fileid                uuid,
  toolingtype           varchar,
  toolingid             uuid,
  CONSTRAINT c_file_tooling_pkey PRIMARY KEY (uuid)
);
CREATE TABLE wiprocurement.c_tooling_parts_metal (
  uuid                  uuid NOT NULL DEFAULT uuid_generate_v1(),
  toolingid             uuid,
  partnumber            varchar,
  partname              varchar,
  icon                  text,
  material              varchar,
  thickness             numeric,
  partsizew             numeric,
  partsizel             numeric,
  partsizeh             numeric,
  finishw               numeric,
  finishl               numeric,
  process               text,
  edgesizew             numeric,
  edgesizel             numeric,
  materialsizew         numeric,
  materialsizel         numeric,
  netweight             numeric,
  grossweight           numeric,
  processnumber         numeric,
  cavitynumber          numeric,
  progressivedie        text,
  stagedie              text,
  rivetingdie           text,
  dietype               varchar,
  diefeature            varchar,
  maledie               varchar,
  femaledie             varchar,
  toolingsizew          numeric,
  toolingsizel          numeric,
  toolingsizeh          numeric,
  dieweight             numeric,
  materialcost          numeric,
  shrinkagerate         numeric,
  cycletime             numeric,
  yieldrate             numeric,
  utilization           numeric,
  outputdaily           numeric,
  outputmonthly         numeric,
  reqmonoutput          varchar,
  reqdieamount          varchar,
  reqmarchineamount     varchar,
  reqtotalamount        varchar,
  diesetplant           varchar,
  moldingmanufacturer   varchar,
  madein                varchar,
  chargeplant           varchar,
  bonded                varchar,
  tsdate                varchar,
  t1date                varchar,
  remark                varchar,
  CONSTRAINT c_tooling_parts_metal_pkey PRIMARY KEY (uuid)
);

CREATE TABLE wiprocurement.c_file_costbom (
  uuid                  uuid NOT NULL DEFAULT uuid_generate_v1(),
  versionid             uuid,
  fileid                uuid,
  partid                uuid,
  CONSTRAINT c_file_costbom_pkey PRIMARY KEY (uuid)
);

CREATE TABLE wiprocurement.c_parts (
  uuid                  uuid NOT NULL DEFAULT uuid_generate_v1(),
  partid                uuid,
  partlevel             integer,
  partnumber            varchar,
  partname              varchar,
  currency              varchar,
  quantity              numeric,
  customerpartnumber    varchar,
  owner                 varchar,
  gbassycategory        varchar,
  functioncategory      varchar,
  partscategory1        varchar,
  partscategory2        varchar,
  material              varchar,
  materialspec          varchar,
  partssizew            numeric,
  partssizel            numeric,
  partssizeh            numeric,
  parssized             numeric,
  partssizem            numeric,
  thickness             numeric,
  partsweightefiq       numeric,
  partsweightevt        numeric,
  partsweightdvt1       numeric,
  partsweightdvt2       numeric,
  partsweightpilot      numeric,
  referencepartproject  varchar,
  referencepartname     varchar,
  idme1process          varchar,
  idme1finish           varchar,
  idme1color            varchar,
  idme2process          varchar,
  idme2finish           varchar,
  idme2color            varchar,
  idme3process          varchar,
  idme3finish           varchar,
  idme3color            varchar,
  idme4process          varchar,
  idme4finish           varchar,
  idme4color            varchar,
  fixtureprocess        varchar,
  fixturefinish         varchar,
  fixturecolor1         varchar,
  fixturecolor2         varchar,
  newtooling            boolean,
  remark                varchar,
  CONSTRAINT c_parts_pkey PRIMARY KEY (uuid)
);

CREATE TABLE wiprocurement.c_part_cleansheets (
  uuid                  uuid NOT NULL DEFAULT uuid_generate_v1(),
  partid                uuid,
  type                  varchar,
  vendor                varchar,
  parttype              varchar,
  sourcercost           numeric,
  cleansheetid          uuid,
  CONSTRAINT c_part_cleansheets_pkey PRIMARY KEY (uuid)
);

CREATE TABLE wiprocurement.c_cleansheet_cost (
  uuid                  uuid NOT NULL DEFAULT uuid_generate_v1(),
  cleansheetid          uuid,
  costname              varchar,
  costdata              text,
  costprice             numeric,
  CONSTRAINT c_cleansheet_cost_pkey PRIMARY KEY (uuid)
);
