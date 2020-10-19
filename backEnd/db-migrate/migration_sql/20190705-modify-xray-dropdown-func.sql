CREATE OR REPLACE FUNCTION wiprocurement.fn_eproc_get_xray_dropdown()
RETURNS integer
LANGUAGE 'plpgsql'

AS $BODY$
    DECLARE
      data_count integer;
    BEGIN
    DELETE FROM wiprocurement.xray_dropdown;
    INSERT INTO wiprocurement.xray_dropdown(product_type, type1, type2, eeme)
      SELECT distinct finance.product_type_desc as product_type, mara.zzcontyp1 as type1, mara.zzcontyp2 as type2, mara.zzeeme as eeme
      FROM wiprocurement.marc as marc
      inner join wiprocurement.mara as mara
          on marc.matnr = mara.matnr
      inner join wiprocurement.v_businessorg_bo as finance
          on marc.PRCTR = finance.profit_center_key
      inner join wiprocurement.epur_type2 as type2
          on (type2.type2name = mara.zzcontyp2)
      where marc.PRCTR is not null and mara.zzcontyp1 is not null and mara.zzcontyp2 is not null and type2.lvalid != '0';

		GET DIAGNOSTICS data_count = ROW_COUNT;
		RETURN data_count;
    END;
$BODY$;

ALTER FUNCTION wiprocurement.fn_eproc_get_xray_dropdown()
    OWNER TO "swpc-user";
