drop view IF EXISTS  formula.v_partnumber_category_1_category_2;
drop function IF EXISTS  wiprocurement.fn_CBG_name_transform_category_name_upper;
CREATE OR REPLACE FUNCTION wiprocurement.fn_CBG_name_transform_category_name_upper(item_name text)
 returns text 
 LANGUAGE plpgsql
 AS $$
   declare
    name_to_transform text;
   begin 
	 select trim(upper(item_name)) into name_to_transform;
	 select (
       case
         when name_to_transform = 'MYLAR/SPONGE/PORON' then 'MYLAR_OF_MYLAR_SPONGE_PORON'
         when name_to_transform = 'BOND & DETACH ADHESI' then 'BOND_DETACH_ADHESIVE'
         when name_to_transform = 'AL FOIL' then 'AL_CU_FOIL'
         when name_to_transform = 'METAL+PLASTIC' then 'METAL_AND_PLASTIC'
         when name_to_transform = 'ALUMINUM' then 'Aluminum鋁皮外觀件單件or組立'
       else name_to_transform
    end
    ) into name_to_transform;
     return trim(upper(REGEXP_REPLACE(name_to_transform, '/|\\|-|\+| |&', '_', 'g')));
   end; 
 $$;

-- select wiprocurement.fn_CBG_name_transform_category_name_upper('test/string-for\CBG to&ctgy+0');
-- select wiprocurement.fn_CBG_name_transform_category_name_upper('BOND & DETACH ADHESI');
-- select wiprocurement.fn_CBG_name_transform_category_name_upper('Aluminum');


-- v_partnumber_category_1_category_2
CREATE OR REPLACE VIEW formula.v_partnumber_category_1_category_2
AS SELECT 
i.item as partnumber,
t1.type1name,
t2.type2name,
pg1.category_name as category_1_name,
pg2.category_name as category_2_name,
pg1.id as part_category_1_uuid,
pg2.id as part_category_2_uuid,
case
  when i.update_time >= t1.update_time and i.update_time >= t2.update_time then i.update_time
  when t1.update_time >= t2.update_time and t1.update_time >= i.update_time then t1.update_time
  when t2.update_time >= t1.update_time and t2.update_time >= i.update_time then t1.update_time
  else i.update_time
end as update_time
FROM wiprocurement.epur_itemtype i
LEFT JOIN wiprocurement.epur_type1 t1 ON t1.type1id::text = i.type1id::text and t1.act_flag != 'Z' and t1.lvalid = '1'
LEFT JOIN wiprocurement.epur_type2 t2 ON t2.type2id::text = i.type2id::text and t2.act_flag != 'Z' and t1.lvalid = '1'
left join formula.part_category_1 pg1 on trim(upper(pg1.category_name)) = wiprocurement.fn_CBG_name_transform_category_name_upper(t1.type1name) and pg1.disable_time is null
left join formula.part_category_2 pg2 on trim(upper(pg2.category_name)) = wiprocurement.fn_CBG_name_transform_category_name_upper(t2.type2name) and pg2.disable_time is null and pg2.part_category_1_id = pg1.id 
-- 當 part_category_1 找不到時 不顯示 part_category_2
-- 例:
-- ctgy_1 : Connector
-- ctgy_2 : FPC
-- 系統中 part_category_1 沒有 Connector 雖然 part_category_2 有 FPC 仍不顯示 part_category_2
where i.act_flag != 'Z'
and pg1.id is not null;

-- Permissions
ALTER TABLE formula.v_partnumber_category_1_category_2 OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_partnumber_category_1_category_2 TO "swpc-user";
GRANT SELECT ON TABLE formula.v_partnumber_category_1_category_2 TO emdm;
