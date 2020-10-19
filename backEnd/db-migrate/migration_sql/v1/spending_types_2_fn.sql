-- FUNCTION: wiprocurement.fn_eproc_get_spendingtypes(character varying, character varying)

-- DROP FUNCTION wiprocurement.fn_eproc_get_spendingtypes(character varying, character varying);

CREATE OR REPLACE FUNCTION wiprocurement.fn_eproc_get_spendingtypes(
	date_from character varying,
	date_to character varying)
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
		INSERT INTO wiprocurement.spending_types(plant,scode,type1,type2,create_date)
			SELECT COALESCE(t024w.werks, 'N/A') AS plant, COALESCE(eine.ekgrp, 'N/A') AS scode, COALESCE(mara.zzcontyp1, 'N/A'), COALESCE(mara.zzcontyp2, 'N/A'), curtime
			FROM (
				SELECT * FROM wiprocurement.eina WHERE zcrtdat >= to_date(date_from, 'YYYY-MM-DD') and zcrtdat <= to_date(date_to, 'YYYY-MM-DD')
			) as eina
			LEFT JOIN wiprocurement.mara AS mara ON mara.matnr = eina.bmatn
			LEFT JOIN wiprocurement.eine AS eine ON eine.infnr = eina.infnr
			LEFT JOIN wiprocurement.t024w AS t024w ON t024w.ekorg = eine.ekorg
			WHERE zzcontyp1 IS NOT NULL OR zzcontyp2 IS NOT NULL
			GROUP BY zzcontyp1, zzcontyp2, eine.ekgrp, t024w.werks
		ON CONFLICT ON CONSTRAINT spending_types_pkey 
		DO NOTHING;
		GET DIAGNOSTICS data_count = ROW_COUNT;
		RETURN data_count;
-- 	EXCEPTION
-- 		WHEN unique_violation
-- 		THEN NULL;
    END;
$BODY$;