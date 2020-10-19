/* Replace with your SQL commands */
CREATE TABLE if not exists formula.thermal_pad_heat (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	heat_transfer numeric NOT NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT thermal_pad_heat_pk PRIMARY KEY (id),
	CONSTRAINT thermal_pad_heat_un UNIQUE (heat_transfer)
);

CREATE TABLE if not exists formula.thermal_pad_hardness (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	hardness numeric NOT NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT thermal_pad_hardness_pk PRIMARY KEY (id),
	CONSTRAINT thermal_pad_hardness_un UNIQUE (hardness)
);

CREATE TABLE if not exists formula.thermal_pad_thickness (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	thickness numeric NOT NULL,
	remark varchar(400) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT thermal_pad_thickness_pk PRIMARY KEY (id),
	CONSTRAINT thermal_pad_thickness_un UNIQUE (thickness)
);

alter table formula.thermal_pad add column if not exists heat_transfer_id uuid;
alter table formula.thermal_pad add column if not exists hardness_id uuid;
alter table formula.thermal_pad add column if not exists thickness_id uuid;

select * from formula.thermal_pad;

INSERT INTO formula.thermal_pad_heat (id, heat_transfer) VALUES('af8a6b12-2208-11ea-ba36-0242ac110003',3) on conflict do nothing;
INSERT INTO formula.thermal_pad_heat (id, heat_transfer) VALUES('b31c07d6-2208-11ea-ba36-0242ac110003',6) on conflict do nothing;
INSERT INTO formula.thermal_pad_heat (id, heat_transfer) VALUES('b69ad4d2-2208-11ea-ba36-0242ac110003',1.3) on conflict do nothing;

update formula.thermal_pad set heat_transfer_id = (select id from formula.thermal_pad_heat tph where tph.heat_transfer = 3) where heat_transfer = 3;
update formula.thermal_pad set heat_transfer_id = (select id from formula.thermal_pad_heat tph where tph.heat_transfer = 6) where heat_transfer = 6;
update formula.thermal_pad set heat_transfer_id = (select id from formula.thermal_pad_heat tph where tph.heat_transfer = 1.3) where heat_transfer = 1.3;


INSERT INTO formula.thermal_pad_hardness (id, hardness) VALUES('a0e02436-2207-11ea-ba36-0242ac110003',24) on conflict do nothing;
INSERT INTO formula.thermal_pad_hardness (id, hardness) VALUES('a56e1eae-2207-11ea-ba36-0242ac110003',45) on conflict do nothing;
INSERT INTO formula.thermal_pad_hardness (id, hardness) VALUES('a8f3d4ec-2207-11ea-ba36-0242ac110003',42) on conflict do nothing;

update formula.thermal_pad set hardness_id = (select id from formula.thermal_pad_hardness tph where tph.hardness = 24) where hardness = 24;
update formula.thermal_pad set hardness_id = (select id from formula.thermal_pad_hardness tph where tph.hardness = 45) where hardness = 45;
update formula.thermal_pad set hardness_id = (select id from formula.thermal_pad_hardness tph where tph.hardness = 42) where hardness = 42;

INSERT INTO formula.thermal_pad_thickness (id, thickness) VALUES('6d4e10a4-2209-11ea-ba36-0242ac110003', 3) on conflict do nothing;
INSERT INTO formula.thermal_pad_thickness (id, thickness) VALUES('7671cac2-2209-11ea-ba36-0242ac110003', 2.25) on conflict do nothing;
INSERT INTO formula.thermal_pad_thickness (id, thickness) VALUES('7b0c76a4-2209-11ea-ba36-0242ac110003', 1.5) on conflict do nothing;
INSERT INTO formula.thermal_pad_thickness (id, thickness) VALUES('7e279e72-2209-11ea-ba36-0242ac110003', 2.5) on conflict do nothing;
INSERT INTO formula.thermal_pad_thickness (id, thickness) VALUES('8145db50-2209-11ea-ba36-0242ac110003', 1) on conflict do nothing;
INSERT INTO formula.thermal_pad_thickness (id, thickness) VALUES('843c664e-2209-11ea-ba36-0242ac110003', 0.8) on conflict do nothing;
INSERT INTO formula.thermal_pad_thickness (id, thickness) VALUES('87144382-2209-11ea-ba36-0242ac110003', 0.5) on conflict do nothing;
INSERT INTO formula.thermal_pad_thickness (id, thickness) VALUES('8a5acd22-2209-11ea-ba36-0242ac110003', 0.3) on conflict do nothing;

update formula.thermal_pad set thickness_id = (select id from formula.thermal_pad_thickness tpt where tpt.thickness = 3) where thickness = 3;
update formula.thermal_pad set thickness_id = (select id from formula.thermal_pad_thickness tpt where tpt.thickness = 2.25) where thickness = 2.25;
update formula.thermal_pad set thickness_id = (select id from formula.thermal_pad_thickness tpt where tpt.thickness = 1.5) where thickness = 1.5;
update formula.thermal_pad set thickness_id = (select id from formula.thermal_pad_thickness tpt where tpt.thickness = 2.5) where thickness = 2.5;
update formula.thermal_pad set thickness_id = (select id from formula.thermal_pad_thickness tpt where tpt.thickness = 1) where thickness = 1;
update formula.thermal_pad set thickness_id = (select id from formula.thermal_pad_thickness tpt where tpt.thickness = 0.8) where thickness = 0.8;
update formula.thermal_pad set thickness_id = (select id from formula.thermal_pad_thickness tpt where tpt.thickness = 0.3) where thickness = 0.3;
update formula.thermal_pad set thickness_id = (select id from formula.thermal_pad_thickness tpt where tpt.thickness = 0.5) where thickness = 0.5;

ALTER TABLE formula.thermal_pad DROP CONSTRAINT thermal_pad_un;
ALTER TABLE formula.thermal_pad ADD CONSTRAINT thermal_pad_un UNIQUE (heat_transfer_id,hardness_id,thickness_id);

drop view if exists formula.v_thermal_pad;
CREATE OR REPLACE VIEW formula.v_thermal_pad
AS 
select 
    tp.id as id,
	tph.id as heat_transfer_id, 
	tph.heat_transfer,
	tphs.id as hardness_id,
	tphs.hardness,
	tpt.id as thickness_id,
	tpt.thickness,
	tp.disable_time
from formula.thermal_pad tp, formula.thermal_pad_hardness tphs, formula.thermal_pad_heat tph, formula.thermal_pad_thickness tpt
where tp.thickness_id = tpt.id and tp.heat_transfer_id = tph.id and tp.hardness_id = tphs.id;

alter table formula.thermal_pad drop column if exists heat_transfer;
alter table formula.thermal_pad drop column if exists hardness;
alter table formula.thermal_pad drop column if exists thickness;