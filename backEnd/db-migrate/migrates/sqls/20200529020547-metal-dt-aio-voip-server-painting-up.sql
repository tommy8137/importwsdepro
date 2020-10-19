CREATE TABLE if not exists formula.metal_paint_color (
    id uuid not null DEFAULT uuid_generate_v1(),
    color_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_paint_color_pk PRIMARY KEY (id),
	CONSTRAINT metal_paint_color_un UNIQUE (color_name)
);

CREATE TABLE if not exists formula.metal_paint_type (
    id uuid not null DEFAULT uuid_generate_v1(),
    type_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_paint_type_pk PRIMARY KEY (id),
	CONSTRAINT metal_paint_type_un UNIQUE (type_name)
);

CREATE TABLE if not exists formula.metal_paint_machine (
    id uuid not null DEFAULT uuid_generate_v1(),
    machine_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_paint_machine_pk PRIMARY KEY (id),
	CONSTRAINT metal_paint_machine_un UNIQUE (machine_name)
);

CREATE TABLE if not exists formula.metal_paint_bottom_top (
    id uuid not null DEFAULT uuid_generate_v1(),
    bottom_top_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_paint_bottom_top_pk PRIMARY KEY (id),
	CONSTRAINT metal_paint_bottom_top_un UNIQUE (bottom_top_name)
);

CREATE TABLE if not exists formula.metal_paint_vendor (
    id uuid not null DEFAULT uuid_generate_v1(),
    vendor_name varchar(200) not null,
    remark varchar(400) null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_paint_vendor_pk PRIMARY KEY (id),
	CONSTRAINT metal_paint_vendor_un UNIQUE (vendor_name)
);
CREATE TABLE if not exists formula.metal_paint_type_color (
    id uuid not null DEFAULT uuid_generate_v1(),
    paint_color_id uuid not null,
    paint_type_id uuid not null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_paint_type_color_pk PRIMARY KEY (id),
	CONSTRAINT metal_paint_type_color_un UNIQUE (paint_color_id,paint_type_id),
	CONSTRAINT metal_paint_type_color_fk FOREIGN KEY (paint_color_id) REFERENCES formula.metal_paint_color(id),
	CONSTRAINT metal_paint_type_color_fk1 FOREIGN KEY (paint_type_id) REFERENCES formula.metal_paint_type(id)
);
CREATE TABLE if not exists formula.metal_paint_type_color_bottom_top (
    id uuid not null DEFAULT uuid_generate_v1(),
    paint_type_color_id uuid not null,
    paint_bottom_top_id uuid not null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_paint_type_color_bottom_top_pk PRIMARY KEY (id),
	CONSTRAINT metal_paint_type_color_bottom_top_un UNIQUE (paint_type_color_id,paint_bottom_top_id),
	CONSTRAINT metal_paint_type_color_bottom_top_fk FOREIGN KEY (paint_type_color_id) REFERENCES formula.metal_paint_type_color(id),
	CONSTRAINT metal_paint_type_color_bottom_top_fk1 FOREIGN KEY (paint_bottom_top_id) REFERENCES formula.metal_paint_bottom_top(id)
);


CREATE TABLE if not exists formula.metal_paint_vendor_type_color_bottom_top (
    id uuid not null DEFAULT uuid_generate_v1(),
    type_color_bottom_top_id uuid not null,
    paint_vendor_id uuid not null,
    create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_paint_vendor_type_color_bottom_top_pk PRIMARY KEY (id),
	CONSTRAINT metal_paint_vendor_type_color_bottom_top_un UNIQUE (type_color_bottom_top_id,paint_vendor_id),
	CONSTRAINT metal_paint_vendor_type_color_bottom_top_fk FOREIGN KEY (type_color_bottom_top_id) REFERENCES formula.metal_paint_type_color_bottom_top(id),
	CONSTRAINT metal_paint_vendor_type_color_bottom_top_fk1 FOREIGN KEY (paint_vendor_id) REFERENCES formula.metal_paint_vendor(id)
);

CREATE TABLE if not exists formula.metal_paint_formula_type (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	label varchar(200) NOT NULL,
	label_name varchar(200) NULL,
	field_type varchar(200) NULL,
	data_type varchar(200) NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_paint_formula_type_pk PRIMARY KEY (id),
	CONSTRAINT metal_paint_formula_type_un UNIQUE (label)
);

CREATE TABLE if not exists formula.metal_paint_formula (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	type_id uuid NOT NULL,
	paint_id uuid NOT NULL,
	create_time timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT metal_paint_formula_pk PRIMARY KEY (id),
	CONSTRAINT metal_paint_formula_un UNIQUE (type_id, paint_id),
	CONSTRAINT metal_paint_formula_fk_paint FOREIGN KEY (paint_id) REFERENCES formula.metal_paint_vendor_type_color_bottom_top(id),
	CONSTRAINT metal_paint_formula_fk_type FOREIGN KEY (type_id) REFERENCES formula.metal_paint_formula_type(id)
);

CREATE TABLE if not exists formula.metal_paint_man_power (
    id uuid not null DEFAULT uuid_generate_v1(),
    product_type_id int4 not null,
    category_name varchar(200) not null,
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_paint_man_power_pk PRIMARY KEY (id),
	CONSTRAINT metal_paint_man_power_un UNIQUE (product_type_id,category_name),
	CONSTRAINT metal_paint_type_product_type_fk FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id)
);

CREATE TABLE if not exists formula.metal_paint_info (
    id uuid not null DEFAULT uuid_generate_v1(),
    product_type_id int4 not null,
    usd_min uuid not null DEFAULT uuid_generate_v1(),
    man_hour uuid not null DEFAULT uuid_generate_v1(),
	create_time timestamptz NOT NULL DEFAULT now(),
	disable_time timestamptz NULL,
	CONSTRAINT metal_paint_info_pk PRIMARY KEY (id),
	CONSTRAINT metal_paint_info_un UNIQUE (product_type_id),
	CONSTRAINT metal_paint_info_fk FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id)
);


INSERT INTO formula.metal_paint_color
(color_name)
VALUES('一般或霧面(黑/灰/銀)'),('彩色或高光(金/紅/藍)'),('Soft Touch'),('N/A'),('粉烤砂紋漆'),('粉烤平光漆'),('粉烤消光漆');

INSERT INTO formula.metal_paint_type
(type_name)
VALUES('PU_painting'),('Rubber_painting'),('NCVM'),('UV_painting'),('Powder coating');

INSERT INTO formula.metal_paint_bottom_top
(bottom_top_name)
VALUES('底漆'),('面漆');

INSERT INTO formula.metal_paint_vendor
(vendor_name)
VALUES('Akzo'),('歐歷'),('東瑞'),('協承昌'),('新政豐'),('台贏'),('皇冠'),('PPG'),('Others');

INSERT INTO formula.metal_paint_machine
(machine_name)
VALUES('往復機'),('SPINDLE'),('ABB_ROBOT'),('蒸鍍'),('N/A');

-- metal_paint_machine parameter value

INSERT INTO formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select mpm.id, sch.id, '0.1484', 'number', 'metal_paint_machine'
from formula.metal_paint_machine as mpm
inner join formula.schedule_date as sch on sch.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal') and sch.product_type_id is null
where mpm.machine_name = '往復機' ON conflict do nothing;

INSERT INTO formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select mpm.id, sch.id, '0.2077', 'number', 'metal_paint_machine'
from formula.metal_paint_machine as mpm
inner join formula.schedule_date as sch on sch.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal') and sch.product_type_id is null
where mpm.machine_name = 'SPINDLE' ON conflict do nothing;

INSERT INTO formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select mpm.id, sch.id, '0.2077', 'number', 'metal_paint_machine'
from formula.metal_paint_machine as mpm
inner join formula.schedule_date as sch on sch.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal') and sch.product_type_id is null
where mpm.machine_name = 'ABB_ROBOT' ON conflict do nothing;

INSERT INTO formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select mpm.id, sch.id, '0.09', 'number', 'metal_paint_machine'
from formula.metal_paint_machine as mpm
inner join formula.schedule_date as sch on sch.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal')  and sch.product_type_id is null
where mpm.machine_name = '蒸鍍' ON conflict do nothing;

INSERT INTO formula.parameter_value(parameter_id, activate_date_id, value_type, source_table)
select mpm.id, sch.id, 'number', 'metal_paint_machine'
from formula.metal_paint_machine as mpm
inner join formula.schedule_date as sch on sch.formula_type_id = (SELECT id FROM formula.formula_type WHERE name= 'housing_metal') and sch.product_type_id is null
where mpm.machine_name = 'N/A' ON conflict do nothing;


-- init  metal_paint_type_color

INSERT INTO formula.metal_paint_type_color
(paint_color_id, paint_type_id)
VALUES((select id from formula.metal_paint_color where color_name = '一般或霧面(黑/灰/銀)'),(select id from formula.metal_paint_type where type_name = 'UV_painting' )),
((select id from formula.metal_paint_color where color_name = '彩色或高光(金/紅/藍)'),(select id from formula.metal_paint_type where type_name = 'UV_painting' )),
((select id from formula.metal_paint_color where color_name = 'Soft Touch'),(select id from formula.metal_paint_type where type_name = 'UV_painting')),
((select id from formula.metal_paint_color where color_name = 'N/A'),(select id from formula.metal_paint_type where type_name = 'UV_painting')),
((select id from formula.metal_paint_color where color_name = 'N/A'),(select id from formula.metal_paint_type where type_name = 'PU_painting')),
((select id from formula.metal_paint_color where color_name = 'N/A'),(select id from formula.metal_paint_type where type_name = 'Rubber_painting')),
((select id from formula.metal_paint_color where color_name = 'N/A'),(select id from formula.metal_paint_type where type_name = 'NCVM')),
((select id from formula.metal_paint_color where color_name = 'N/A'),(select id from formula.metal_paint_type where type_name = 'Powder coating')),
((select id from formula.metal_paint_color where color_name = '粉烤砂紋漆'),(select id from formula.metal_paint_type where type_name = 'Powder coating')),
((select id from formula.metal_paint_color where color_name = '粉烤平光漆'),(select id from formula.metal_paint_type where type_name = 'Powder coating')),
((select id from formula.metal_paint_color where color_name = '粉烤消光漆'),(select id from formula.metal_paint_type where type_name = 'Powder coating'));

-- init metal_paint_type_color_bottom_top
INSERT INTO formula.metal_paint_type_color_bottom_top
(paint_type_color_id, paint_bottom_top_id)
select mptc.id, mpbt.id 
from formula.metal_paint_type_color as mptc
inner join formula.metal_paint_bottom_top as mpbt on mpbt.bottom_top_name = '底漆'
where mptc.paint_type_id =(select id from formula.metal_paint_type where type_name = 'Rubber_painting') on conflict do nothing;

INSERT INTO formula.metal_paint_type_color_bottom_top
(paint_type_color_id, paint_bottom_top_id)
select mptc.id, mpbt.id 
from formula.metal_paint_type_color as mptc
inner join formula.metal_paint_bottom_top as mpbt on mpbt.bottom_top_name = '面漆'
where mptc.paint_type_id =(select id from formula.metal_paint_type where type_name = 'Rubber_painting') on conflict do nothing;

INSERT INTO formula.metal_paint_type_color_bottom_top
(paint_type_color_id, paint_bottom_top_id)
select mptc.id, mpbt.id 
from formula.metal_paint_type_color as mptc
inner join formula.metal_paint_bottom_top as mpbt on mpbt.bottom_top_name = '底漆'
where mptc.paint_type_id =(select id from formula.metal_paint_type where type_name = 'PU_painting') on conflict do nothing;

INSERT INTO formula.metal_paint_type_color_bottom_top
(paint_type_color_id, paint_bottom_top_id)
select mptc.id, mpbt.id 
from formula.metal_paint_type_color as mptc
inner join formula.metal_paint_bottom_top as mpbt on mpbt.bottom_top_name = '面漆'
where mptc.paint_type_id =(select id from formula.metal_paint_type where type_name = 'PU_painting') on conflict do nothing;

INSERT INTO formula.metal_paint_type_color_bottom_top
(paint_type_color_id, paint_bottom_top_id)
select mptc.id, mpbt.id 
from formula.metal_paint_type_color as mptc
inner join formula.metal_paint_bottom_top as mpbt on mpbt.bottom_top_name = '底漆'
where mptc.paint_type_id =(select id from formula.metal_paint_type where type_name = 'NCVM') on conflict do nothing;

INSERT INTO formula.metal_paint_type_color_bottom_top
(paint_type_color_id, paint_bottom_top_id)
select mptc.id, mpbt.id 
from formula.metal_paint_type_color as mptc
inner join formula.metal_paint_bottom_top as mpbt on mpbt.bottom_top_name = '面漆'
where mptc.paint_type_id =(select id from formula.metal_paint_type where type_name = 'NCVM') on conflict do nothing;

INSERT INTO formula.metal_paint_type_color_bottom_top
(paint_type_color_id, paint_bottom_top_id)
select mptc.id, mpbt.id 
from formula.metal_paint_type_color as mptc
inner join formula.metal_paint_bottom_top as mpbt on mpbt.bottom_top_name = '底漆'
where mptc.paint_type_id =(select id from formula.metal_paint_type where type_name = 'UV_painting') on conflict do nothing;

INSERT INTO formula.metal_paint_type_color_bottom_top
(paint_type_color_id, paint_bottom_top_id)
select mptc.id, mpbt.id 
from formula.metal_paint_type_color as mptc
inner join formula.metal_paint_bottom_top as mpbt on mpbt.bottom_top_name = '面漆'
where mptc.paint_type_id =(select id from formula.metal_paint_type where type_name = 'UV_painting') on conflict do nothing;

INSERT INTO formula.metal_paint_type_color_bottom_top
(paint_type_color_id, paint_bottom_top_id)
select mptc.id, mpbt.id 
from formula.metal_paint_type_color as mptc
inner join formula.metal_paint_bottom_top as mpbt on mpbt.bottom_top_name = '底漆'
where mptc.paint_type_id =(select id from formula.metal_paint_type where type_name = 'Powder coating') on conflict do nothing;

INSERT INTO formula.metal_paint_type_color_bottom_top
(paint_type_color_id, paint_bottom_top_id)
select mptc.id, mpbt.id 
from formula.metal_paint_type_color as mptc
inner join formula.metal_paint_bottom_top as mpbt on mpbt.bottom_top_name = '面漆'
where mptc.paint_type_id =(select id from formula.metal_paint_type where type_name = 'Powder coating') on conflict do nothing;

-- 噴漆總成 metal_paint_vendor_type_color_bottom_top

-- PU_painting 底漆
INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Akzo'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '歐歷'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '東瑞'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '協承昌'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '新政豐'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '台贏'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '皇冠'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'PPG'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Others'));

-- Rubber painting 底漆

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Akzo'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '歐歷'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '東瑞'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '協承昌'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '新政豐'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '台贏'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '皇冠'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'PPG'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Others'));

-- NCVM 底漆

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Akzo'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '歐歷'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '東瑞'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '協承昌'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '新政豐'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '台贏'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '皇冠'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'PPG'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '底漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Others'));

-- PU_painting 面漆
INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Akzo'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '歐歷'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '東瑞'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '協承昌'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '新政豐'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '台贏'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '皇冠'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'PPG'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='PU_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Others'));

-- Rubber_painting 面漆
INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Akzo'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '歐歷'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '東瑞'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '協承昌'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '新政豐'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '台贏'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '皇冠'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'PPG'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Rubber_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Others'));

-- NCVM 面漆
INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Akzo'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '歐歷'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '東瑞'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '協承昌'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '新政豐'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '台贏'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '皇冠'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'PPG'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='NCVM')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Others'));

-- UV_painting 面漆 
INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '一般或霧面(黑/灰/銀)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Akzo'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '一般或霧面(黑/灰/銀)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '歐歷'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '一般或霧面(黑/灰/銀)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '東瑞'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '一般或霧面(黑/灰/銀)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '協承昌'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '一般或霧面(黑/灰/銀)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '新政豐'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '一般或霧面(黑/灰/銀)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '台贏'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '一般或霧面(黑/灰/銀)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '皇冠'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '一般或霧面(黑/灰/銀)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'PPG'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '一般或霧面(黑/灰/銀)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Others'));

-- UV_painting 面漆  彩色或高光(金/紅/藍)
INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '彩色或高光(金/紅/藍)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Akzo'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '彩色或高光(金/紅/藍)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '歐歷'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '彩色或高光(金/紅/藍)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '東瑞'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '彩色或高光(金/紅/藍)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '協承昌'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '彩色或高光(金/紅/藍)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '新政豐'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '彩色或高光(金/紅/藍)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '台贏'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '彩色或高光(金/紅/藍)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '皇冠'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '彩色或高光(金/紅/藍)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'PPG'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '彩色或高光(金/紅/藍)')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Others'));

-- UV_painting 面漆  Soft Touch
INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'Soft Touch')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Akzo'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'Soft Touch')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '歐歷'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'Soft Touch')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '東瑞'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'Soft Touch')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '協承昌'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'Soft Touch')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '新政豐'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'Soft Touch')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '台贏'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'Soft Touch')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '皇冠'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'Soft Touch')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'PPG'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'Soft Touch')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Others'));

-- UV_painting 面漆  N/A
INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Akzo'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '歐歷'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '東瑞'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '協承昌'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '新政豐'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '台贏'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '皇冠'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'PPG'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='UV_painting')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Others'));

-- Powder coating 面漆  N/A
INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Akzo'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '歐歷'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '東瑞'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '協承昌'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '新政豐'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '台贏'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '皇冠'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'PPG'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = 'N/A')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Others'));

-- Powder coating 面漆  N/A
INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤砂紋漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Akzo'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤砂紋漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '歐歷'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤砂紋漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '東瑞'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤砂紋漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '協承昌'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤砂紋漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '新政豐'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤砂紋漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '台贏'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤砂紋漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '皇冠'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤砂紋漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'PPG'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤砂紋漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Others'));

-- Powder coating 面漆  N/A
INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤平光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Akzo'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤平光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '歐歷'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤平光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '東瑞'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤平光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '協承昌'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤平光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '新政豐'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤平光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '台贏'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤平光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '皇冠'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤平光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'PPG'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤平光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Others'));

-- Powder coating 面漆  N/A
INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤消光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Akzo'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤消光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '歐歷'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤消光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '東瑞'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤消光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '協承昌'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤消光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '新政豐'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤消光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '台贏'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤消光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = '皇冠'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤消光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'PPG'));

INSERT INTO formula.metal_paint_vendor_type_color_bottom_top
(type_color_bottom_top_id, paint_vendor_id)
VALUES((select id from formula.metal_paint_type_color_bottom_top where paint_bottom_top_id = (select id from formula.metal_paint_bottom_top where bottom_top_name = '面漆')
 and paint_type_color_id = (select id from formula.metal_paint_type_color where paint_color_id =(select id from formula.metal_paint_color where color_name = '粉烤消光漆')
 and paint_type_id = (select id from formula.metal_paint_type where type_name ='Powder coating')
 )
),(select id from formula.metal_paint_vendor where vendor_name = 'Others'));

-- 噴漆組成

insert into formula.metal_paint_formula_type (label, label_name, field_type, data_type) values
( 'main_unit_price',     '主劑單價(USD/Kg)',         'input', 'float'),
( 'main_amount',         '主劑比例',                 'input', 'float'),
( 'hardener_unit_price', '硬化劑/固化劑單價(USD/Kg)',  'input', 'float'),
( 'hardener_amount',     '硬化劑/固化劑比例',          'input', 'float'),
( 'solvent_unit_price',  '溶劑/稀釋劑單價(USD/Kg)',    'input', 'float'),
( 'solvent_amount',      '溶劑/稀釋劑比例',            'input', 'float') on conflict do nothing;

insert into formula.metal_paint_formula (type_id, paint_id)
select mpft.id, paint.id
from formula.metal_paint_formula_type mpft,
formula.metal_paint_vendor_type_color_bottom_top paint;

-- 噴漆膜厚

INSERT INTO formula.me_spec (spec_category, spec_name, spec_value)
  VALUES ('metal_paint_thickness', '0', '0'),
  ('metal_paint_thickness', '10', '10'),
  ('metal_paint_thickness', '11', '11'),
  ('metal_paint_thickness', '12', '12'),
  ('metal_paint_thickness', '13', '13'),
  ('metal_paint_thickness', '14', '14'),
  ('metal_paint_thickness', '15', '15'),
  ('metal_paint_thickness', '16', '16'),
  ('metal_paint_thickness', '17', '17'),
  ('metal_paint_thickness', '18', '18'),
  ('metal_paint_thickness', '19', '19'),
  ('metal_paint_thickness', '20', '20'),
  ('metal_paint_thickness', '21', '21'),
  ('metal_paint_thickness', '22', '22'),
  ('metal_paint_thickness', '23', '23'),
  ('metal_paint_thickness', '24', '24'),
  ('metal_paint_thickness', '25', '25'),
  ('metal_paint_thickness', '80', '80');

-- man power

INSERT INTO formula.metal_paint_man_power (product_type_id, category_name)
select id, 'Metal' from formula.product_type pt where pt.type_name in ('DT', 'AIO', 'Server', 'VoIP');

INSERT INTO formula.metal_paint_man_power (product_type_id, category_name)
select id, 'Aluminum' from formula.product_type pt where pt.type_name in ('DT', 'AIO', 'Server', 'VoIP');

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select a.id, b.id, '12', 'number', 'metal_paint_man_power'
from (select id from formula.metal_paint_man_power pmp where pmp.category_name = 'Metal') a,
(select id from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id is null) b;

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select a.id, b.id, '12', 'number', 'metal_paint_man_power'
from (select id from formula.metal_paint_man_power pmp where pmp.category_name = 'Aluminum') a,
(select id from formula.schedule_date sd where sd.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sd.product_type_id is null) b;

-- paint info
INSERT INTO formula.metal_paint_info (product_type_id)
select pt.id
from formula.product_type pt 
where pt.type_name in ('DT','AIO','Server','VoIP');

 -- usd_min

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select mpi.usd_min, sch.id, '0.06', 'number', 'metal_paint_info' 
from formula.metal_paint_info as mpi 
inner join formula.schedule_date as sch on sch.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sch.product_type_id is null
where mpi.product_type_id = (select id from formula.product_type where type_name = 'DT' );

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select mpi.usd_min, sch.id, '0.06', 'number', 'metal_paint_info' 
from formula.metal_paint_info as mpi 
inner join formula.schedule_date as sch on sch.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sch.product_type_id is null
where mpi.product_type_id = (select id from formula.product_type where type_name = 'AIO' );

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select mpi.usd_min, sch.id, '0.06', 'number', 'metal_paint_info' 
from formula.metal_paint_info as mpi 
inner join formula.schedule_date as sch on sch.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sch.product_type_id is null
where mpi.product_type_id = (select id from formula.product_type where type_name = 'Server' );

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select mpi.usd_min, sch.id, '0.06', 'number', 'metal_paint_info' 
from formula.metal_paint_info as mpi 
inner join formula.schedule_date as sch on sch.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sch.product_type_id is null
where mpi.product_type_id = (select id from formula.product_type where type_name = 'VoIP' );

--man_hour

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select mpi.man_hour, sch.id, '8', 'number', 'metal_paint_info' 
from formula.metal_paint_info as mpi 
inner join formula.schedule_date as sch on sch.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sch.product_type_id is null
where mpi.product_type_id = (select id from formula.product_type where type_name = 'DT' );

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select mpi.man_hour, sch.id, '8', 'number', 'metal_paint_info' 
from formula.metal_paint_info as mpi 
inner join formula.schedule_date as sch on sch.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sch.product_type_id is null
where mpi.product_type_id = (select id from formula.product_type where type_name = 'AIO' );

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select mpi.man_hour, sch.id, '8', 'number', 'metal_paint_info' 
from formula.metal_paint_info as mpi 
inner join formula.schedule_date as sch on sch.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sch.product_type_id is null
where mpi.product_type_id = (select id from formula.product_type where type_name = 'Server' );

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table)
select mpi.man_hour, sch.id, '8', 'number', 'metal_paint_info' 
from formula.metal_paint_info as mpi 
inner join formula.schedule_date as sch on sch.formula_type_id= (SELECT id FROM formula.formula_type WHERE name ='housing_metal') and sch.product_type_id is null
where mpi.product_type_id = (select id from formula.product_type where type_name = 'VoIP' );


DROP TABLE IF EXISTS  formula.tmp_metal_paint_price;
CREATE TABLE if not exists formula.tmp_metal_paint_price (
	paint_type varchar(200),
	bottom_top varchar(200),
	color varchar(200),
	vendor varchar(200),
	main_un varchar (100),
	main_am varchar (100),
	hardener_un varchar (100),
	hardener_am varchar (100),
	solvent_un varchar (100),
	solvent_am varchar (100),
	total_price varchar (100)
);
-- 底漆 面漆
-- N/A 一般或霧面(黑/灰/銀) 彩色或高光(金/紅/藍)  Soft Touch  粉烤砂紋漆 粉烤平光漆 粉烤消光漆
-- Akzo 歐歷 東瑞 協承昌 新政豐 台贏 皇冠 PPG Others
insert into formula.tmp_metal_paint_price (paint_type, bottom_top, color, vendor, main_am, main_un, hardener_am, hardener_un, solvent_am, solvent_un, total_price) values
--                                                                                   ('PU_painting', '底漆', 'N/A', '', '', '', '', '', '', '', ''),
('PU_painting', '底漆', 'N/A', 'Akzo', '100', '14.3077', '5', '20.00', '100', '4.6154', '9.7186'),
('PU_painting', '底漆', 'N/A', '歐歷', '5', '16.7692', '1', '18.4615', '3', '5.3846', '13.1624'),
('PU_painting', '底漆', 'N/A', '東瑞', '7', '10.7692', '1', '18.4616', '7', '3.8462', '8.0513'),
('PU_painting', '底漆', 'N/A', '協承昌', '5', '10.0000', '1', '13.8462', '6', '4.0000', '7.3205'),
('PU_painting', '底漆', 'N/A', '新政豐', '4', '10.9231', '1', '16.9231', '4', '3.3846', '8.2393'),
('PU_painting', '底漆', 'N/A', '台贏', '8', '11.8462', '1', '16.4369', '7', '3.8462', '8.6331'),
--('PU_painting', '底漆', 'N/A', '皇冠', '', '', '', '', '', '', ''),
--('PU_painting', '底漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
('PU_painting', '底漆', 'N/A', 'Others', '100', '25.0000', '0', '0', '0', '0', '25.0000'),
--                                                                                   ('Rubber_painting', '底漆', 'N/A', '', '', '', '', '', '', '', ''),
('Rubber_painting', '底漆', 'N/A', 'Akzo', '100', '34.4615', '30', '20.0000', '60', '4.6154', '22.7530'),
('Rubber_painting', '底漆', 'N/A', '歐歷', '10', '10.7692', '1', '18.4615', '15', '5.3846', '7.9586'),
('Rubber_painting', '底漆', 'N/A', '東瑞', '7', '11.5385', '1', '18.4615', '5', '3.8462', '9.1124'),
('Rubber_painting', '底漆', 'N/A', '協承昌', '5', '11.5385', '1', '13.8462', '6', '4.0000', '7.9615'),
('Rubber_painting', '底漆', 'N/A', '新政豐', '1', '9.8462', '0', '0', '1.3', '3.3846', '6.1940'),
('Rubber_painting', '底漆', 'N/A', '台贏', '8', '11.5385', '1', '16.4369', '4', '3.8462', '9.5484'),
('Rubber_painting', '底漆', 'N/A', '皇冠', '10', '9.6923', '1', '14.9231', '11', '4.1538', '7.1608'),
--('Rubber_painting', '底漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
('Rubber_painting', '底漆', 'N/A', 'Others', '100', '35.0000', '0', '0', '0', '0', '35.0000'),
--                                                                                   ('NCVM', '底漆', 'N/A', '', '', '', '', '', '', '', ''),
('NCVM', '底漆', 'N/A', 'Akzo', '100', '14.3077', '5', '20.0000', '100', '4.6154', '9.7186'),
('NCVM', '底漆', 'N/A', '歐歷', '5', '16.7692', '1', '18.4615', '3', '5.3846', '13.1624'),
--('NCVM', '底漆', 'N/A', '東瑞', '', '', '', '', '', '', ''),
--('NCVM', '底漆', 'N/A', '協承昌', '', '', '', '', '', '', ''),
--('NCVM', '底漆', 'N/A', '新政豐', '', '', '', '', '', '', ''),
--('NCVM', '底漆', 'N/A', '台贏', '', '', '', '', '', '', ''),
--('NCVM', '底漆', 'N/A', '皇冠', '', '', '', '', '', '', ''),
--('NCVM', '底漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
('NCVM', '底漆', 'N/A', 'Others', '100', '25.0000', '0', '0', '0', '0', '25.0000'),
--                                                                                   ('PU_painting', '面漆', 'N/A', '', '', '', '', '', '', '', ''),
('PU_painting', '面漆', 'N/A', 'Akzo', '100', '20.7692', '5', '20.00', '50', '4.6154', '15.5335'),
('PU_painting', '面漆', 'N/A', '歐歷', '5', '16.7692', '1', '18.4615', '3', '5.3846', '13.1624'),
('PU_painting', '面漆', 'N/A', '東瑞', '5', '11.3846', '1', '18.4615', '5', '3.8462', '8.6014'),
('PU_painting', '面漆', 'N/A', '協承昌', '5', '13.8462', '1', '13.8462', '6', '4.0000', '8.9231'),
('PU_painting', '面漆', 'N/A', '新政豐', '4', '10.9231', '1', '16.9231', '4', '3.3846', '8.2393'),
('PU_painting', '面漆', 'N/A', '台贏', '6', '13.0769', '1', '16.4369', '6', '3.8462', '9.0750'),
--('PU_painting', '面漆', 'N/A', '皇冠', '', '', '', '', '', '', ''),
--('PU_painting', '面漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
('PU_painting', '面漆', 'N/A', 'Others', '100', '30.0000', '0', '0', '0', '0', '30.0000'),
--                                                                                   ('Rubber_painting', '面漆', 'N/A', '', '', '', '', '', '', '', ''),
('Rubber_painting', '面漆', 'N/A', 'Akzo', '100', '34.4615', '30', '20.0000', '60', '4.6154', '22.7530'),
('Rubber_painting', '面漆', 'N/A', '歐歷', '6', '18.4615', '1', '21.5385', '2', '5.3846', '15.8974'),
('Rubber_painting', '面漆', 'N/A', '東瑞', '5', '18.4615', '1', '18.4615', '3', '3.8462', '13.5897'),
('Rubber_painting', '面漆', 'N/A', '協承昌', '6', '14.7692', '1', '15.3846', '6', '4.0000', '9.8462'),
('Rubber_painting', '面漆', 'N/A', '新政豐', '10', '16.1538', '1.5', '17.6923', '2', '3.3846', '14.4330'),
('Rubber_painting', '面漆', 'N/A', '台贏', '4', '24.4615', '1', '16.4369', '1.5', '3.8462', '18.4696'),
('Rubber_painting', '面漆', 'N/A', '皇冠', '5', '15.8462', '1', '20.6154', '1.5', '4.0000', '14.1128'),
--('Rubber_painting', '面漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
('Rubber_painting', '面漆', 'N/A', 'Others', '100', '35.0000', '0', '0', '0', '0', '35.0000'),
--                                                                                   ('NCVM', '面漆', 'N/A', '', '', '', '', '', '', '', ''),
('NCVM', '面漆', 'N/A', 'Akzo', '100', '20.7692', '5', '20.0000', '50', '4.6154', '15.5335'),
('NCVM', '面漆', 'N/A', '歐歷', '5', '16.7692', '1', '18.4615', '3', '5.3846', '13.1624'),
--('NCVM', '面漆', 'N/A', '東瑞', '', '', '', '', '', '', ''),
--('NCVM', '面漆', 'N/A', '協承昌', '', '', '', '', '', '', ''),
--('NCVM', '面漆', 'N/A', '新政豐', '', '', '', '', '', '', ''),
--('NCVM', '面漆', 'N/A', '台贏', '', '', '', '', '', '', ''),
--('NCVM', '面漆', 'N/A', '皇冠', '', '', '', '', '', '', ''),
--('NCVM', '面漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
('NCVM', '面漆', 'N/A', 'Others', '100', '30.0000', '0', '0', '0', '0', '30.0000'),
--                                                                                   ('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', '', '', '', '', '', '', '', ''),
('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', 'Akzo', '100', '13.0435', '0', '0', '30', '5.0725', '11.2040'),
('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', '歐歷', '100', '16.4014', '0', '0', '66', '4.5400', '11.6855'),
--('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', '東瑞', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', '協承昌', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', '新政豐', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', '台贏', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', '皇冠', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', 'PPG', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '一般或霧面(黑/灰/銀)', 'Others', '', '', '', '', '', '', ''),
--                                                                                   ('UV_painting', '面漆', '彩色或高光(金/紅/藍)', '', '', '', '', '', '', '', ''),
('UV_painting', '面漆', '彩色或高光(金/紅/藍)', 'Akzo', '100', '28.9855', '0', '0', '30', '5.0725', '23.4671'),
('UV_painting', '面漆', '彩色或高光(金/紅/藍)', '歐歷', '100', '20.2899', '0', '0', '66', '4.5400', '14.0279'),
--('UV_painting', '面漆', '彩色或高光(金/紅/藍)', '東瑞', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '彩色或高光(金/紅/藍)', '協承昌', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '彩色或高光(金/紅/藍)', '新政豐', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '彩色或高光(金/紅/藍)', '台贏', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '彩色或高光(金/紅/藍)', '皇冠', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '彩色或高光(金/紅/藍)', 'PPG', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', '彩色或高光(金/紅/藍)', 'Others', '', '', '', '', '', '', ''),
--                                                                                   ('UV_painting', '面漆', 'Soft Touch', '', '', '', '', '', '', '', ''),
('UV_painting', '面漆', 'Soft Touch', 'Akzo', '100', '21.7391', '0', '0', '30', '5.0725', '17.8930'),
('UV_painting', '面漆', 'Soft Touch', '歐歷', '100', '26.0870', '0', '0', '66', '4.5400', '17.5201'),
--('UV_painting', '面漆', 'Soft Touch', '東瑞', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'Soft Touch', '協承昌', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'Soft Touch', '新政豐', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'Soft Touch', '台贏', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'Soft Touch', '皇冠', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'Soft Touch', 'PPG', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'Soft Touch', 'Others', '', '', '', '', '', '', ''),
--                                                                                   ('UV_painting', '面漆', 'N/A', '', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', 'Akzo', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', '歐歷', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', '東瑞', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', '協承昌', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', '新政豐', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', '台贏', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', '皇冠', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
--('UV_painting', '面漆', 'N/A', 'Others', '', '', '', '', '', '', ''),
--                                                                                   ('Powder coating', '面漆', '粉烤砂紋漆', '', '', '', '', '', '', '', ''),
('Powder coating', '面漆', '粉烤砂紋漆', 'Akzo', '100', '5.1500', '0', '0', '0', '0', '5.1500'),
--('Powder coating', '面漆', '粉烤砂紋漆', '歐歷', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤砂紋漆', '東瑞', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤砂紋漆', '協承昌', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤砂紋漆', '新政豐', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤砂紋漆', '台贏', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤砂紋漆', '皇冠', '', '', '', '', '', '', ''),
('Powder coating', '面漆', '粉烤砂紋漆', 'PPG', '100', '5.1500', '0', '0', '0', '0', '5.1500'),
--('Powder coating', '面漆', '粉烤砂紋漆', 'Others', '', '', '', '', '', '', ''),
--                                                                                   ('Powder coating', '面漆', '粉烤平光漆', '', '', '', '', '', '', '', ''),
('Powder coating', '面漆', '粉烤平光漆', 'Akzo', '100', '5.3500', '0', '0', '0', '0', '5.3500'),
--('Powder coating', '面漆', '粉烤平光漆', '歐歷', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤平光漆', '東瑞', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤平光漆', '協承昌', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤平光漆', '新政豐', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤平光漆', '台贏', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤平光漆', '皇冠', '', '', '', '', '', '', ''),
('Powder coating', '面漆', '粉烤平光漆', 'PPG', '100', '5.3500', '0', '0', '0', '0', '5.3500'),
--('Powder coating', '面漆', '粉烤平光漆', 'Others', '', '', '', '', '', '', ''),
--                                                                                   ('Powder coating', '面漆', '粉烤消光漆', '', '', '', '', '', '', '', ''),
('Powder coating', '面漆', '粉烤消光漆', 'Akzo', '100', '8.3100', '0', '0', '0', '0', '8.3100'),
--('Powder coating', '面漆', '粉烤消光漆', '歐歷', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤消光漆', '東瑞', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤消光漆', '協承昌', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤消光漆', '新政豐', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤消光漆', '台贏', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', '粉烤消光漆', '皇冠', '', '', '', '', '', '', ''),
('Powder coating', '面漆', '粉烤消光漆', 'PPG', '100', '8.3100', '0', '0', '0', '0', '8.3100');
--('Powder coating', '面漆', '粉烤消光漆', 'Others', '', '', '', '', '', '', ''),
--                                                                                   ('Powder coating', '面漆', 'N/A', '', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', 'Akzo', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', '歐歷', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', '東瑞', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', '協承昌', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', '新政豐', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', '台贏', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', '皇冠', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', 'PPG', '', '', '', '', '', '', ''),
--('Powder coating', '面漆', 'N/A', 'Others', '', '', '', '', '', '', ''),

-- views

CREATE OR REPLACE VIEW formula.v_metal_painting_vendor_type_color_bottom_top
AS SELECT all_link.id,
    type.id AS paint_type_id,
    type.type_name AS paint_type_name,
    color.id AS paint_color_id,
    color.color_name AS paint_color_name,
    level.id AS paint_bottom_top_id,
    level.bottom_top_name AS paint_bottom_top_name,
    all_link.paint_vendor_id,
    vendor.vendor_name AS paint_vendor_name,
    all_link.disable_time AS link_disable_time
   FROM formula.metal_paint_vendor_type_color_bottom_top all_link
     LEFT JOIN formula.metal_paint_vendor vendor ON vendor.id = all_link.paint_vendor_id
     LEFT JOIN formula.metal_paint_type_color_bottom_top cb_link ON all_link.type_color_bottom_top_id = cb_link.id
     LEFT JOIN formula.metal_paint_bottom_top level ON cb_link.paint_bottom_top_id = level.id
     LEFT JOIN formula.metal_paint_type_color tc_link ON tc_link.id = cb_link.paint_type_color_id
     LEFT JOIN formula.metal_paint_color color ON color.id = tc_link.paint_color_id
     LEFT JOIN formula.metal_paint_type type ON type.id = tc_link.paint_type_id
  ORDER BY type.type_name, color.color_name, level.bottom_top_name, vendor.vendor_name;

-- Permissions

ALTER TABLE formula.v_metal_painting_vendor_type_color_bottom_top OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_painting_vendor_type_color_bottom_top TO "swpc-user";
GRANT SELECT ON TABLE formula.v_metal_painting_vendor_type_color_bottom_top TO emdm;

CREATE OR REPLACE VIEW formula.v_metal_painting_vendor_v2
AS SELECT DISTINCT link.paint_type_id,
    link.paint_type_name,
    link.paint_color_id,
    link.paint_color_name,
        CASE
            WHEN (( SELECT count(link_b.id) AS count
               FROM formula.v_metal_painting_vendor_type_color_bottom_top link_b
              WHERE link_b.paint_color_id = link.paint_color_id AND link_b.paint_type_id = link.paint_type_id AND link_b.paint_bottom_top_name::text = '底漆'::text AND link_b.link_disable_time IS NULL)) > 0 THEN true
            ELSE false
        END AS bottom,
        CASE
            WHEN (( SELECT count(link_t.id) AS count
               FROM formula.v_metal_painting_vendor_type_color_bottom_top link_t
              WHERE link_t.paint_color_id = link.paint_color_id AND link_t.paint_type_id = link.paint_type_id AND link_t.paint_bottom_top_name::text = '面漆'::text AND link_t.link_disable_time IS NULL)) > 0 THEN true
            ELSE false
        END AS top,
    link.paint_vendor_id,
    link.paint_vendor_name
   FROM formula.v_metal_painting_vendor_type_color_bottom_top link
     LEFT JOIN formula.parameter_value pv ON link.id = pv.parameter_id
     LEFT JOIN formula.schedule_date sd ON sd.id = pv.activate_date_id
  WHERE pv.value IS NOT NULL AND sd.id = (( SELECT max(sd2.id) AS id
           FROM formula.schedule_date sd2
          WHERE sd2.activate_date < now() AND sd2.product_type_id IS NULL AND sd2.formula_type_id = (( SELECT ft.id
                   FROM formula.formula_type ft
                  WHERE ft.name::text = 'housing_metal'::text))));

-- Permissions

ALTER TABLE formula.v_metal_painting_vendor_v2 OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_painting_vendor_v2 TO "swpc-user";
GRANT SELECT ON TABLE formula.v_metal_painting_vendor_v2 TO emdm;

CREATE OR REPLACE VIEW formula.v_metal_painting_color
AS SELECT ppc.id,
    ppc.color_name AS name,
    pptc.disable_time,
    pptc.paint_type_id
   FROM formula.metal_paint_color ppc,
    formula.metal_paint_type_color pptc
  WHERE pptc.paint_color_id = ppc.id;

-- Permissions

ALTER TABLE formula.v_metal_painting_color OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_painting_color TO "swpc-user";
GRANT SELECT ON TABLE formula.v_metal_painting_color TO emdm;

CREATE OR REPLACE VIEW formula.v_metal_painting_type
AS SELECT ppt.id,
    ppt.type_name AS name,
    ppt.disable_time
   FROM formula.metal_paint_type ppt;

-- Permissions

ALTER TABLE formula.v_metal_painting_type OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_painting_type TO "swpc-user";
GRANT SELECT ON TABLE formula.v_metal_painting_type TO emdm;

CREATE OR REPLACE VIEW formula.v_metal_painting_type_v2
AS SELECT tp.id,
    tp.type_name AS name,
        CASE
            WHEN (( SELECT count(link.id) AS count
               FROM formula.v_metal_painting_vendor_type_color_bottom_top link
              WHERE link.paint_type_id = tp.id AND link.paint_bottom_top_name::text = '底漆'::text AND link.link_disable_time IS NULL)) > 0 THEN true
            ELSE false
        END AS bottom,
        CASE
            WHEN (( SELECT count(link.id) AS count
               FROM formula.v_metal_painting_vendor_type_color_bottom_top link
              WHERE link.paint_type_id = tp.id AND link.paint_bottom_top_name::text = '面漆'::text AND link.link_disable_time IS NULL)) > 0 THEN true
            ELSE false
        END AS top,
    tp.disable_time
   FROM formula.metal_paint_type tp;

-- Permissions

ALTER TABLE formula.v_metal_painting_type_v2 OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_painting_type_v2 TO "swpc-user";
GRANT SELECT ON TABLE formula.v_metal_painting_type_v2 TO emdm;

CREATE OR REPLACE VIEW formula.v_metal_painting_machine
AS SELECT ppm.id,
    ppm.machine_name AS name,
    ppm.disable_time
   FROM formula.metal_paint_machine ppm;

-- Permissions

ALTER TABLE formula.v_metal_painting_machine OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_painting_machine TO "swpc-user";
GRANT SELECT ON TABLE formula.v_metal_painting_machine TO emdm;

CREATE OR REPLACE VIEW formula.v_metal_painting_thickness
AS SELECT ms.id,
    ms.spec_name AS name,
    ms.disable_time
   FROM formula.me_spec ms
  WHERE ms.spec_category::text = 'metal_paint_thickness'::text;

-- Permissions

ALTER TABLE formula.v_metal_painting_thickness OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_painting_thickness TO "swpc-user";
GRANT SELECT ON TABLE formula.v_metal_painting_thickness TO emdm;


insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select a.id, a.total_price, 'number', 'metal_paint_vendor_type_color_bottom_top', b.id
from (select link.id, tp.* 
	from formula.tmp_metal_paint_price tp
	left join formula.v_metal_painting_vendor_type_color_bottom_top link
	on tp.paint_type = link.paint_type_name 
	and tp.color = link.paint_color_name 
	and tp.bottom_top = link.paint_bottom_top_name 
	and tp.vendor = link.paint_vendor_name
) a,
(select id from formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type where "name" = 'housing_metal') and sd.product_type_id is null ) b;

insert into formula.parameter_value (parameter_id, value , value_type, source_table, activate_date_id)
select pf.id, (
	case 
		when pt."label" = 'main_unit_price' then a.main_un
		when pt."label" = 'main_amount' then a.main_am
		when pt."label" = 'hardener_unit_price' then a.hardener_un
		when pt."label" = 'hardener_amount' then a.hardener_am
		when pt."label" = 'solvent_unit_price' then a.solvent_un
		when pt."label" = 'solvent_amount' then a.solvent_am
	else '0'
	end
)
, 'number', 'metal_paint_formula', b.id
from (select id from formula.schedule_date sd where sd.formula_type_id = (select id from formula.formula_type where "name" = 'housing_metal') and sd.product_type_id is null ) b,
(
	select link.id, tp.* 
	from formula.tmp_metal_paint_price tp
	left join formula.v_metal_painting_vendor_type_color_bottom_top link
	on tp.paint_type = link.paint_type_name 
	and tp.color = link.paint_color_name 
	and tp.bottom_top = link.paint_bottom_top_name 
	and tp.vendor = link.paint_vendor_name
) a
left join formula.metal_paint_formula pf on pf.paint_id = a.id
left join formula.metal_paint_formula_type pt on pt.id = pf.type_id;



DROP TABLE IF EXISTS  formula.tmp_metal_paint_price;