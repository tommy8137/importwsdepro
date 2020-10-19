CREATE TABLE if not exists wiprocurement.perm_user_product_type_meee(
	emplid character varying(32) references wiprocurement.user(emplid) ON DELETE CASCADE ON UPDATE CASCADE,
	product_type_me character varying(64),
	product_type_ee character varying(64),
	UNIQUE(emplid, product_type_me, product_type_ee)
);