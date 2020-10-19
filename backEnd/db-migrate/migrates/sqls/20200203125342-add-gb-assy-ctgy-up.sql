ALTER TABLE formula.gb_assy_ctgy add column if not exists product_type_id int4 not null default 1;
ALTER TABLE formula.gb_assy_ctgy drop CONSTRAINT if exists gb_assy_ctgy_fk_pid;
ALTER TABLE formula.gb_assy_ctgy ADD CONSTRAINT gb_assy_ctgy_fk_pid FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id);
ALTER TABLE formula.gb_assy_ctgy drop CONSTRAINT if exists gb_assy_ctgy_un;
ALTER TABLE formula.gb_assy_ctgy ADD CONSTRAINT gb_assy_ctgy_un UNIQUE (gb_assy_ctgy_name, product_type_id);

CREATE TABLE formula.tmp_gb_assy_ctgy_dt (
   gb_assy_ctgy_name VARCHAR (200)
);
CREATE TABLE formula.tmp_gb_assy_ctgy_aio (
   gb_assy_ctgy_name VARCHAR (200)
);
CREATE TABLE formula.tmp_gb_assy_ctgy_tc (
   gb_assy_ctgy_name VARCHAR (200)
);
CREATE TABLE formula.tmp_gb_assy_ctgy_conference_phone (
   gb_assy_ctgy_name VARCHAR (200)
);

insert into formula.tmp_gb_assy_ctgy_dt (gb_assy_ctgy_name) values
('ASSY CHASSIS'),
('ASSY TOP-COVER'),
('ASSY R SIDE'),
('ASSY L SIDE'),
('ASSY FRONT BEZEL'),
('System DC-Level'),
('ASSY BOTTOM COVER'),
('ASSY REAR COVER'),
('ASSY ODD BEZEL'),
('ASSY HANDLE COVER'),
('ASSY HDD BRACKET'),
('ASSY RUBBER FRONT FOOT STAND'), 
('ASSY REAR  FOOT STAND'),
('ASSY FRONT IO MODULE'),
('ASSY REAR IO BRKT'),
('ASSY REAR HOLDER'),
('ASSY SUB CHASSIS'),
('ASSY ODD BRKT'),
('ASSY IO SHIELDING'),
('OTHER 60 ASSY'),
('OTHER PART');

insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)
select a.gb_assy_ctgy_name, (select id from formula.product_type pt where pt.type_name = 'DT') from formula.tmp_gb_assy_ctgy_dt a;

insert into formula.tmp_gb_assy_ctgy_aio (gb_assy_ctgy_name) values
('ASSY FRONT BEZEL'),
('ASSY REAR COVER'),
('ASSY MIDDLE FRAME'),
('ASSY MB SHIELDING'),
('ASSY PANEL BASE'),
('ASSY STAND'),
('ASSY ODD BRACKET'),
('ASSY HDD BRACKET'),
('LCD DC-Level'),
('System DC-Level'),
('ASSY MAIN BRKT'),
('ASSY FRONT DECO'),
('ASSY SIDE IO'),
('ASSY VESA BRKT'),
('ASSY ODD BEZEL'),
('ASSY WIFI HOLDER'),
('ASSY WEBCAM HOLDER'),
('ASSY VGA BRACKET'),
('ASSY_WEBCAM_SHUTTER'),
('ASS SPEAKER COVER'),
('ASSY SIDE IO BRKT'),
('ASSY REAR IO BRKT'), 
('ASSY DIMM DOOR'),
('ASSY HINGE COVER'),
('ASSY REAR IO COVER'),
('ASSY Front Cover SIDE'),
('OTHER 60 ASSY'),
('OTHER PART');

insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)
select a.gb_assy_ctgy_name, (select id from formula.product_type pt where pt.type_name = 'AIO') from formula.tmp_gb_assy_ctgy_aio a;

insert into formula.tmp_gb_assy_ctgy_tc (gb_assy_ctgy_name) values
('ASSY CHASSIS'),
('ASSY TOP-COVER'),
('ASSY FRONT BEZEL'),
('ASSY BASE'),
('System DC-Level'),
('ASSY MIDDLE FRAME'),
('ASSY BOTTOM COVER'),
('ASSY REAR I/O COVER'),
('ASSY VESA'),
('ASSY STAND'),
('ASSY BKT BOTTOM'),
('ASSY BKT TOP'),
('ASSY CVR L SIDE'),
('ASSY IO SHIELDING'),
('OTHER 60 ASSY'),
('OTHER PART');

insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)
select a.gb_assy_ctgy_name, (select id from formula.product_type pt where pt.type_name = 'TC') from formula.tmp_gb_assy_ctgy_tc a;

insert into formula.tmp_gb_assy_ctgy_conference_phone (gb_assy_ctgy_name) values
('ASSY SKIRT COVER'),
('ASSY SPEAKER GRILL'),
('ASSY SHIELDING'),
('ASSY IO WALL'),
('ASSY BASE COVER'),
('ASSY BOTTOM COVER'),
('ASSY BUTTON'),
('OTHER 60 ASSY'),
('OTHER PART');

insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)
select a.gb_assy_ctgy_name, (select id from formula.product_type pt where pt.type_name = 'Conference_Phone') from formula.tmp_gb_assy_ctgy_conference_phone a;


DROP TABLE IF EXISTS formula.tmp_gb_assy_ctgy_dt;
DROP TABLE IF EXISTS formula.tmp_gb_assy_ctgy_aio;
DROP TABLE IF EXISTS formula.tmp_gb_assy_ctgy_tc;
DROP TABLE IF EXISTS formula.tmp_gb_assy_ctgy_conference_phone;

