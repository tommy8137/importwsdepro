-- FUNCTION: wiprocurement.fn_eproc_get_spendingtypes(character varying, character varying)

-- DROP FUNCTION wiprocurement.fn_eproc_get_spendingtypes(character varying, character varying);

CREATE OR REPLACE FUNCTION wiprocurement.fn_get_ee_type()
    RETURNS integer
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
    #variable_conflict use_variable
    DECLARE
        curtime timestamp := now();
        data_count integer;
    BEGIN
        INSERT INTO wiprocurement.ee_assignment(type1,type2)
          SELECT mara.zzcontyp1 AS type1, mara.zzcontyp2 AS type2
          FROM wiprocurement.mara AS mara
          WHERE mara.zzcontyp1 IS NOT NULL AND mara.zzcontyp2 IS NOT NULL
          AND mara.zzeeme = 'EE'
    ON CONFLICT ON CONSTRAINT ee_assignment_pkey 
    DO NOTHING;
    GET DIAGNOSTICS data_count = ROW_COUNT;
    RETURN data_count;
--  EXCEPTION
--    WHEN unique_violation
--    THEN NULL;
    END;
$BODY$;