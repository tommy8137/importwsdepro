/* Replace with your SQL commands */
CREATE OR REPLACE FUNCTION wiprocurement.fn_get_ee_type()
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
    #variable_conflict use_variable
    DECLARE
        curtime timestamp := now();
        data_count integer;
    BEGIN
INSERT INTO wiprocurement.ee_assignment(type1,type2)
select distinct et1.type1name, et2.type2name from wiprocurement.epur_itemtype ei
left join wiprocurement.epur_type1 et1 on ei.type1id = et1.type1id
left join wiprocurement.epur_type2 et2 on ei.type2id = et2.type2id
where et1.type1name is not null and et2.type2name is not null
ON CONFLICT ON CONSTRAINT ee_assignment_pkey DO NOTHING;
GET DIAGNOSTICS data_count = ROW_COUNT;
    RETURN data_count;
--  EXCEPTION
--    WHEN unique_violation
--    THEN NULL;
    END;
$function$
;