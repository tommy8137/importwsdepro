drop view formula.v_partnumber_category_1_category_2;

CREATE OR REPLACE VIEW formula.v_partnumber_category_1_category_2
AS SELECT i.item AS partnumber,
    i.update_time AS partnumber_update_time,
    t1c.type1name,
    t1c.update_time AS type1_update_time,
    t2c.type2name,
    t2c.update_time AS type2_update_time,
    t1c.category_name AS category_1_name,
    t1c.category_disable_time AS category_1_disable_time,
    t2c.category_name AS category_2_name,
    t2c.category_disable_time AS category_2_disable_time,
    t1c.category_id AS part_category_1_uuid,
    t2c.category_id AS part_category_2_uuid,
        CASE
            WHEN i.act_flag::text = 'Z'::text THEN true
            WHEN t1c.act_flag::text = 'Z'::text THEN true
            WHEN t1c.lvalid::text = '0'::text THEN true
            WHEN t2c.act_flag::text = 'Z'::text THEN true
            WHEN t2c.lvalid::text = '0'::text THEN true
            WHEN t1c.category_disable_time IS NOT NULL THEN true
            WHEN t2c.category_disable_time IS NOT NULL THEN true
            WHEN t1c.category_id IS NULL THEN true
            ELSE false
        END AS isdisabled
   FROM wiprocurement.epur_itemtype i
     LEFT JOIN ( 
       SELECT t1.type1id,
         	t1.type1name,
            t1.lvalid,
            t1.act_flag,
            t1.insdate,
            t1.update_time,
            t1.update_by,
            pg1.id AS category_id,
            pg1.category_name,
            pg1.disable_time AS category_disable_time
       FROM wiprocurement.epur_type1 t1
       LEFT JOIN formula.part_category_1 pg1 ON btrim(upper(pg1.category_name::text)) = wiprocurement.fn_cbg_name_transform_category_name_upper(t1.type1name::text)
     ) t1c ON t1c.type1id::text = i.type1id::text
     LEFT JOIN (
       SELECT t2.type2id,
            t2.type2name,
            t2.lvalid,
            t2.act_flag,
            t2.insdate,
            t2.update_time,
            t2.update_by,
            pg2.part_category_1_id,
            pg2.id AS category_id,
            pg2.category_name,
            pg2.disable_time AS category_disable_time
           FROM wiprocurement.epur_type2 t2
             LEFT JOIN formula.part_category_2 pg2 ON btrim(upper(pg2.category_name::text)) = wiprocurement.fn_cbg_name_transform_category_name_upper(t2.type2name::text)
     ) t2c ON t2c.type2id::text = i.type2id::text AND t2c.part_category_1_id = t1c.category_id;
 
-- Permissions
ALTER TABLE formula.v_partnumber_category_1_category_2 OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_partnumber_category_1_category_2 TO "swpc-user";
GRANT SELECT ON TABLE formula.v_partnumber_category_1_category_2 TO emdm;