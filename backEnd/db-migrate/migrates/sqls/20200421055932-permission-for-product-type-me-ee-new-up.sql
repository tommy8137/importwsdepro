DROP TABLE IF EXISTS  wiprocurement.perm_user_product_type_meee;

CREATE TABLE if not exists wiprocurement.perm_product_type_me(
	emplid character varying(32) references wiprocurement.user(emplid)ON DELETE CASCADE ON UPDATE CASCADE,
	product_type_me character varying(64),
	UNIQUE(emplid, product_type_me)
);

CREATE TABLE if not exists wiprocurement.perm_product_type_ee(
	emplid character varying(32) references wiprocurement.user(emplid) ON DELETE CASCADE ON UPDATE CASCADE,
	product_type_ee character varying(64),
	UNIQUE(emplid, product_type_ee)
);


insert into wiprocurement.perm_product_type_me (select o.emplid, p.type_name as product_type_me 
from wiprocurement.user as o cross join formula.product_type as p where p.type_name is not null and o.emplid not in
(select emplid from wiprocurement.perm_product_type_me)group by o.emplid, p.type_name order by o.emplid, p.type_name);


insert into wiprocurement.perm_product_type_ee (select o.emplid, p.product_type as product_type_ee 
from wiprocurement.user as o cross join (select distinct producttype as product_type from wiprocurement.all_pmprjtbl_for_dashboard
where producttype is not null union select distinct product_type_desc as product_type from wiprocurement.v_businessorg_bo
where product_type_desc is not null order by product_type) as p
where p.product_type is not null and o.emplid not in (select emplid from wiprocurement.perm_product_type_ee)
group by o.emplid, p.product_type order by o.emplid, p.product_type);

