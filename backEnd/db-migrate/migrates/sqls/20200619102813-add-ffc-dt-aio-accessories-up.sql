drop table if exists formula.cableffc_dt_accessories;

drop table if exists formula.cableffc_dt_accessories_vendor;
drop table if exists formula.cableffc_dt_accessories_category;

CREATE TABLE if not exists formula.cableffc_dt_accessories_category (
  id serial NOT NULL,
  category_name varchar(200),
  create_time timestamptz NOT NULL DEFAULT now(),
  disable_time timestamptz  null,
  CONSTRAINT cableffc_dt_accessories_category_pk PRIMARY KEY (id),
	CONSTRAINT cableffc_dt_accessories_category_un UNIQUE (category_name)
);
insert into formula.cableffc_dt_accessories_category (category_name) values
('標籤'),
('雙面膠'),
('醋酸布'),
('鋁箔麥拉複合'),
('導電布'),
('雙導鋁箔'),
('單導鋁箔'),
('麥拉'),
('離型紙'),
('吸波材')
on conflict do nothing;

CREATE TABLE if not exists formula.cableffc_dt_accessories_vendor (
 id serial NOT NULL,
 vendor_name varchar(200),
 create_time timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT cableffc_dt_accessories_vendor_pk PRIMARY KEY (id),
	CONSTRAINT cableffc_dt_accessories_vendor_un UNIQUE (vendor_name)
);
insert into formula.cableffc_dt_accessories_vendor (vendor_name) values
('諾斯達'),
('滕藝'),
('德竹'),
('源協'),
('思昱興'),
('勝寰'),
('樺晟'),
('榮藝')
on conflict do nothing;

CREATE TABLE if not exists formula.cableffc_dt_accessories (
 id uuid not null DEFAULT uuid_generate_v1(),
 category_id int4,
 spec varchar(200),
 material_l varchar(100),
 material_w varchar(100),
 thickness varchar(100),
 vendor_id int4,
 part_number varchar(200),
 product_type_id int4,
 create_time timestamptz NOT NULL DEFAULT now(),
 disable_time timestamptz  null,
 CONSTRAINT cableffc_dt_accessories_pk PRIMARY KEY (id),
 CONSTRAINT cableffc_dt_accessories_fk_category_id FOREIGN KEY (category_id) REFERENCES formula.cableffc_dt_accessories_category(id),
 CONSTRAINT cableffc_dt_accessories_fk_vendor_id FOREIGN KEY (vendor_id) REFERENCES formula.cableffc_dt_accessories_vendor(id),
 CONSTRAINT cableffc_dt_accessories_fk_product_type_id FOREIGN KEY (product_type_id) REFERENCES formula.product_type(id),
 CONSTRAINT cableffc_dt_accessories_un UNIQUE (spec, product_type_id)
);
insert into formula.cableffc_dt_accessories(category_id, spec, material_l, material_w, thickness, vendor_id, part_number, product_type_id)values
((select id from formula.cableffc_dt_accessories_category where category_name = '標籤'), '標籤', '1000', '1000', null, null, null, (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), '雙面膠0.15T', '1000', '1000', '0.15', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '諾斯達'), 'DS 15', (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), '雙面膠0.1T', '1000', '1000', '0.1',   (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '滕藝'), 'DS 10B', (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), '雙面膠0.05T', '1000', '1000', '0.05', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '諾斯達'), 'DS 5', (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), '雙面膠0.8T', '1000', '1000', '0.8',   (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), '奧米1008', (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), '3M467', '1000', '1000', '0.05',       (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '源協'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), '3M9888T', '1000', '1000', '0.15',     (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '思昱興'), null, (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), 'G9000', '1000', '1000', '0.15',       (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '源協'), null, (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), 'Nitto 5000NS', '1000', '1000', '0.16',(select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null, (select id from formula.product_type where type_name = 'DT')),
-- 
((select id from formula.cableffc_dt_accessories_category where category_name = '醋酸布'), '醋酸布0.08T', '1000', '1000', '0.08', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '醋酸布'), '醋酸布0.12T', '1000', '1000', '0.12', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '醋酸布'), '醋酸布0.25T', '1000', '1000', '0.25', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '勝寰'), null , (select id from formula.product_type where type_name = 'DT')),
-- 
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.15T', '1000', '1000', '0.15', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.12T', '1000', '1000', '0.12', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.19T', '1000', '1000', '0.19', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.24T', '1000', '1000', '0.24', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.3T', '1000', '1000', '0.3',     (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.42T', '1000', '1000', '0.42',   (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.1T', '1000', '1000', '0.1',     (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.075T', '1000', '1000', '0.075', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'DT')),
--
((select id from formula.cableffc_dt_accessories_category where category_name = '導電布'), '導電布膠帶0.12T', '1000', '1000', '0.12', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '勝寰'), null , (select id from formula.product_type where type_name = 'DT')),
--
((select id from formula.cableffc_dt_accessories_category where category_name = '雙導鋁箔'), '雙導鋁箔0.06T', '1000', '1000', '0.06', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '源協'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙導鋁箔'), '雙導鋁箔0.1T', '1000', '1000', '0.1',   (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '榮藝'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙導鋁箔'), '雙導鋁箔0.15T', '1000', '1000', '0.15', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '榮藝'), null , (select id from formula.product_type where type_name = 'DT')),
--
((select id from formula.cableffc_dt_accessories_category where category_name = '單導鋁箔'), '單導鋁箔0.06T', '1000', '1000', '0.06', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '單導鋁箔'), '單導鋁箔0.08T', '1000', '1000', '0.08', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '單導鋁箔'), '單導鋁箔0.09T', '1000', '1000', '0.09', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '單導鋁箔'), '單導鋁箔0.3T', '1000', '1000', '0.3',   (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'DT')),
--
((select id from formula.cableffc_dt_accessories_category where category_name = '麥拉'), '麥拉0.1T', '1000', '1000', '0.1',       (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '勝寰'),  null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '麥拉'), '麥拉0.05T', '1000', '1000', '0.05',     (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '源協'), 'CY28' , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '麥拉'), '麥拉含膠0.05T', '1000', '1000', '0.05', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'),  null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '麥拉'), '麥拉含膠0.1T', '1000', '1000', '0.1',   (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'),  null , (select id from formula.product_type where type_name = 'DT')),
--
((select id from formula.cableffc_dt_accessories_category where category_name = '離型紙'), '離型紙', '1000', '1000', null, (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'DT')),
((select id from formula.cableffc_dt_accessories_category where category_name = '吸波材'), '黑色吸波材0.205T', '1000', '1000', '0.205', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'DT')),
-- AIO
((select id from formula.cableffc_dt_accessories_category where category_name = '標籤'), '標籤', '1000', '1000', null, null, null, (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), '雙面膠0.15T', '1000', '1000', '0.15', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '諾斯達'), 'DS 15', (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), '雙面膠0.1T', '1000', '1000', '0.1',   (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '滕藝'), 'DS 10B', (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), '雙面膠0.05T', '1000', '1000', '0.05', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '諾斯達'), 'DS 5', (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), '雙面膠0.8T', '1000', '1000', '0.8',   (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), '奧米1008', (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), '3M467', '1000', '1000', '0.05',       (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '源協'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), '3M9888T', '1000', '1000', '0.15',     (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '思昱興'), null, (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), 'G9000', '1000', '1000', '0.15',       (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '源協'), null, (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙面膠'), 'Nitto 5000NS', '1000', '1000', '0.16',(select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null, (select id from formula.product_type where type_name = 'AIO')),
--
((select id from formula.cableffc_dt_accessories_category where category_name = '醋酸布'), '醋酸布0.08T', '1000', '1000', '0.08', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '醋酸布'), '醋酸布0.12T', '1000', '1000', '0.12', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '醋酸布'), '醋酸布0.25T', '1000', '1000', '0.25', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '勝寰'), null , (select id from formula.product_type where type_name = 'AIO')),
--
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.15T', '1000', '1000', '0.15', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.12T', '1000', '1000', '0.12', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.19T', '1000', '1000', '0.19', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.24T', '1000', '1000', '0.24', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.3T', '1000', '1000', '0.3',     (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.42T', '1000', '1000', '0.42',   (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.1T', '1000', '1000', '0.1',     (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '鋁箔麥拉複合'), '鋁箔麥拉複合0.075T', '1000', '1000', '0.075', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'AIO')),
--
((select id from formula.cableffc_dt_accessories_category where category_name = '導電布'), '導電布膠帶0.12T', '1000', '1000', '0.12', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '勝寰'), null , (select id from formula.product_type where type_name = 'AIO')),
--
((select id from formula.cableffc_dt_accessories_category where category_name = '雙導鋁箔'), '雙導鋁箔0.06T', '1000', '1000', '0.06', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '源協'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙導鋁箔'), '雙導鋁箔0.1T', '1000', '1000', '0.1',   (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '榮藝'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '雙導鋁箔'), '雙導鋁箔0.15T', '1000', '1000', '0.15', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '榮藝'), null , (select id from formula.product_type where type_name = 'AIO')),
--
((select id from formula.cableffc_dt_accessories_category where category_name = '單導鋁箔'), '單導鋁箔0.06T', '1000', '1000', '0.06', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '單導鋁箔'), '單導鋁箔0.08T', '1000', '1000', '0.08', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '單導鋁箔'), '單導鋁箔0.09T', '1000', '1000', '0.09', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '單導鋁箔'), '單導鋁箔0.3T', '1000', '1000', '0.3',   (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'AIO')),
--
((select id from formula.cableffc_dt_accessories_category where category_name = '麥拉'), '麥拉0.1T', '1000', '1000', '0.1',       (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '勝寰'),  null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '麥拉'), '麥拉0.05T', '1000', '1000', '0.05',     (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '源協'), 'CY28' , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '麥拉'), '麥拉含膠0.05T', '1000', '1000', '0.05', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'),  null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '麥拉'), '麥拉含膠0.1T', '1000', '1000', '0.1',   (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'),  null , (select id from formula.product_type where type_name = 'AIO')),
--
((select id from formula.cableffc_dt_accessories_category where category_name = '離型紙'), '離型紙', '1000', '1000', null, (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '德竹'), null , (select id from formula.product_type where type_name = 'AIO')),
((select id from formula.cableffc_dt_accessories_category where category_name = '吸波材'), '黑色吸波材0.205T', '1000', '1000', '0.205', (select id from formula.cableffc_dt_accessories_vendor where vendor_name = '樺晟'), null , (select id from formula.product_type where type_name = 'AIO'))
on conflict do nothing;
-- 標籤 - 3.0000
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '3.0000', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '標籤'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 雙面膠0.15T - 1.5974
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '1.5974', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '雙面膠0.15T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 雙面膠0.1T - 1.6481
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '1.6481', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '雙面膠0.1T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 雙面膠0.05T - 0.8874
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '0.8874', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '雙面膠0.05T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 雙面膠0.8T - 5.5781
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '5.5781', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '雙面膠0.8T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 3M467 - 4.0467
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '4.0467', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '3M467'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 3M9888T - 4.2596
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '4.2596', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '3M9888T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- G9000 - 4.4194
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '4.4194', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = 'G9000'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- Nitto 5000NS - 4.5639
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '4.5639', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = 'Nitto 5000NS'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 醋酸布0.08T - 4.3103
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '4.3103', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '醋酸布0.08T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 醋酸布0.12T - 2.7890
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '2.7890', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '醋酸布0.12T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 醋酸布0.25T - 2.5355
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '2.5355', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '醋酸布0.25T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 鋁箔麥拉複合0.15T - 2.5355
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '2.5355', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '鋁箔麥拉複合0.15T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 鋁箔麥拉複合0.12T - 2.9158
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '2.9158', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '鋁箔麥拉複合0.12T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 鋁箔麥拉複合0.19T - 4.3219
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '4.3219', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '鋁箔麥拉複合0.19T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 鋁箔麥拉複合0.24T - 3.8878
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '3.8878', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '鋁箔麥拉複合0.24T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 鋁箔麥拉複合0.3T - 5.1555
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '5.1555', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '鋁箔麥拉複合0.3T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 鋁箔麥拉複合0.42T - 6.8881
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '6.8881', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '鋁箔麥拉複合0.42T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 鋁箔麥拉複合0.1T - 2.6623
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '2.6623', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '鋁箔麥拉複合0.1T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 鋁箔麥拉複合0.075T - 2.5355
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '2.5355', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '鋁箔麥拉複合0.075T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 導電布膠帶0.12T - 2.5355
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '2.5355', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '導電布膠帶0.12T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 雙導鋁箔0.06T - 2.7954
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '2.7954', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '雙導鋁箔0.06T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 雙導鋁箔0.1T - 2.2819
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '2.2819', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '雙導鋁箔0.1T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 雙導鋁箔0.15T - 2.5355
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '2.5355', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '雙導鋁箔0.15T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 單導鋁箔0.06T - 1.7748
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '1.7748', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '單導鋁箔0.06T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 單導鋁箔0.08T - 1.9016
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '1.9016', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '單導鋁箔0.08T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 單導鋁箔0.09T - 2.0918
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '2.0918', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '單導鋁箔0.09T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 單導鋁箔0.3T - 8.1770
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '8.1770', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '單導鋁箔0.3T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 麥拉0.1T - 0.8557
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '0.8557', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '麥拉0.1T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 麥拉0.05T - 0.4412
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '0.4412', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '麥拉0.05T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 麥拉含膠0.05T - 2.2249
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '2.2249', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '麥拉含膠0.05T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 麥拉含膠0.1T - 2.9475
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '2.9475', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '麥拉含膠0.1T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 離型紙 - 0.4437
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '0.4437', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '離型紙'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;

-- 黑色吸波材0.205T - 3.2961
insert into formula.parameter_value(parameter_id, activate_date_id, value, value_type, source_table)
select ffc_as.id, sd.id, '3.2961', 'number', 'cableffc_dt_accessories'
from formula.cableffc_dt_accessories ffc_as,
formula.schedule_date sd
where ffc_as.spec = '黑色吸波材0.205T'
and sd.formula_type_id = (select id from formula.formula_type where name = 'cable_ffc')
and sd.product_type_id = ffc_as.product_type_id
on conflict do nothing;
