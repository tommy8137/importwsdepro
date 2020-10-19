-- FUNCTION: wiprocurement.fn_eproc_get_pn_price_ary(character varying[])

-- DROP FUNCTION wiprocurement.fn_eproc_get_pn_price_ary(character varying[]);

CREATE OR REPLACE FUNCTION wiprocurement.fn_eproc_get_pn_price_ary(
	character varying[])
    RETURNS integer
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
    DECLARE
  		data_count integer;
    BEGIN
        INSERT INTO wiprocurement.c_files (filetype, filedate) 
 		(SELECT partnumber,now() FROM wiprocurement.eedm_pn_request WHERE partnumber = ANY($1));
		-- 將資料標記處理時間
		UPDATE wiprocurement.eedm_pn_request SET process_time=NOW() WHERE partnumber = ANY($1);
		INSERT INTO wiprocurement.eedm_pn_price (partnumber,mpnno,plant,purchaseorg,price,currency, update_time, exchange_rate, vendor_code, manufacturer, vendor_pn, update_by, create_by) 
		(
			WITH exlist as (
				SELECT * FROM (SELECT row_number() over (PARTITION  BY fcurr ORDER BY gdatu desc) as rn, *
				FROM wiprocurement.exchange_rate where kurst='M' and tcurr='USD') ex WHERE ex.rn=1
			)
			SELECT "Wistron_PN", "matnr", "Plant", "Purchasing_Org.", "Price", "Currency", NOW() as "update_time", 
				case when x1."Currency"='USD' then 1 ELSE exlist.ukurs END,
				"Vendor_Code", "Manufacturer", "Vendor_PN", 'fn_eproc_get_pn_price', 'fn_eproc_get_pn_price'
			FROM (
				SELECT wiprocurement.eina.BMATN as "Wistron_PN",
					wiprocurement.a018_konp.ekorg as "Purchasing_Org.",	
					wiprocurement.a018_konp.konwa as "Currency",
					cast(wiprocurement.a018_konp.KBETR::NUMERIC/wiprocurement.a018_konp.KPEIN*wiprocurement.a018_konp.KUMZA/wiprocurement.a018_konp.KUMNE as Float) as "Price",
					wiprocurement.a018_konp.datab as "Valid_From",
					wiprocurement.ekpo.zzrecwerks as "Plant",
					wiprocurement.a018_konp.matnr as "matnr",
					wiprocurement.a018_konp.knumh as "knumh",
					wiprocurement.eina.lifnr as "Vendor_Code",
					wiprocurement.eina.mfrnr as "Manufacturer",    
					wiprocurement.eina.mfrpn as "Vendor_PN",	
					row_number() over (partition by wiprocurement.eina.BMATN,wiprocurement.a018_konp.ekorg order by wiprocurement.a018_konp.datab desc) as rn
				FROM  wiprocurement.eina
				LEFT JOIN wiprocurement.eine ON wiprocurement.eina.INFNR=wiprocurement.eine.INFNR
				LEFT JOIN wiprocurement.a018_konp ON wiprocurement.eina.MATNR=wiprocurement.a018_konp.MATNR and wiprocurement.eina.lifnr=wiprocurement.a018_konp.lifnr
				LEFT JOIN wiprocurement.ekpo ON wiprocurement.ekpo.ebeln=wiprocurement.eine.EBELN and wiprocurement.ekpo.ebelp=wiprocurement.eine.EBELP
				WHERE
					wiprocurement.eine.ekorg=wiprocurement.a018_konp.ekorg and
					wiprocurement.a018_konp.datbi in ('2099-12-31') and
					wiprocurement.a018_konp.datab<=Current_date and
					wiprocurement.eine.EBELN is NOT NULL and
					wiprocurement.ekpo.zzrecwerks is NOT NULL and
					wiprocurement.eina.BMATN = ANY($1)
			) x1 left join exlist ON x1."Currency"=exlist.fcurr WHERE x1.rn=1
		) 
		ON CONFLICT (partnumber,plant,purchaseorg) 
		DO UPDATE SET 
			mpnno=excluded.mpnno,
			price=excluded.price,
			currency=excluded.currency,
			update_time=excluded.update_time,
			exchange_rate=excluded.exchange_rate,
			vendor_code=excluded.vendor_code,
			manufacturer=excluded.manufacturer,
			vendor_pn=excluded.vendor_pn,
			update_by=excluded.update_by
		;
		
		GET DIAGNOSTICS data_count = ROW_COUNT;
		RETURN data_count;
    END;

$BODY$;

ALTER FUNCTION wiprocurement.fn_eproc_get_pn_price_ary(character varying[])
    OWNER TO "swpc-user";


-- FUNCTION: wiprocurement.fn_eproc_get_pn_price_text(text)

-- DROP FUNCTION wiprocurement.fn_eproc_get_pn_price_text(text);

CREATE OR REPLACE FUNCTION wiprocurement.fn_eproc_get_pn_price_text(
	text)
    RETURNS integer
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
    DECLARE
  		data_count integer;
    BEGIN
        INSERT INTO wiprocurement.c_files (filetype, filedate) 
		(SELECT partnumber,now() FROM wiprocurement.eedm_pn_request WHERE partnumber = ANY(string_to_array($1,',')));
		-- 將資料標記處理時間
		UPDATE wiprocurement.eedm_pn_request SET process_time=NOW() WHERE partnumber = ANY(string_to_array($1,','));
		INSERT INTO wiprocurement.eedm_pn_price (partnumber,mpnno,plant,purchaseorg,price,currency, update_time, exchange_rate, vendor_code, manufacturer, vendor_pn, update_by, create_by) 
		(
			WITH exlist as (
				SELECT * FROM (SELECT row_number() over (PARTITION  BY fcurr ORDER BY gdatu desc) as rn, *
				FROM wiprocurement.exchange_rate where kurst='M' and tcurr='USD') ex WHERE ex.rn=1
			)
			SELECT "Wistron_PN", "matnr", "Plant", "Purchasing_Org.", "Price", "Currency", NOW() as "update_time", 
				case when x1."Currency"='USD' then 1 ELSE exlist.ukurs END,
				"Vendor_Code", "Manufacturer", "Vendor_PN", 'fn_eproc_get_pn_price', 'fn_eproc_get_pn_price'
			FROM (
				SELECT wiprocurement.eina.BMATN as "Wistron_PN",
					wiprocurement.a018_konp.ekorg as "Purchasing_Org.",	
					wiprocurement.a018_konp.konwa as "Currency",
					cast(wiprocurement.a018_konp.KBETR::NUMERIC/wiprocurement.a018_konp.KPEIN*wiprocurement.a018_konp.KUMZA/wiprocurement.a018_konp.KUMNE as Float) as "Price",
					wiprocurement.a018_konp.datab as "Valid_From",
					wiprocurement.ekpo.zzrecwerks as "Plant",
					wiprocurement.a018_konp.matnr as "matnr",
					wiprocurement.a018_konp.knumh as "knumh",
					wiprocurement.eina.lifnr as "Vendor_Code",
					wiprocurement.eina.mfrnr as "Manufacturer",    
					wiprocurement.eina.mfrpn as "Vendor_PN",	
					row_number() over (partition by wiprocurement.eina.BMATN,wiprocurement.a018_konp.ekorg order by wiprocurement.a018_konp.datab desc) as rn
				FROM  wiprocurement.eina
				LEFT JOIN wiprocurement.eine ON wiprocurement.eina.INFNR=wiprocurement.eine.INFNR
				LEFT JOIN wiprocurement.a018_konp ON wiprocurement.eina.MATNR=wiprocurement.a018_konp.MATNR and wiprocurement.eina.lifnr=wiprocurement.a018_konp.lifnr
				LEFT JOIN wiprocurement.ekpo ON wiprocurement.ekpo.ebeln=wiprocurement.eine.EBELN and wiprocurement.ekpo.ebelp=wiprocurement.eine.EBELP
				WHERE
					wiprocurement.eine.ekorg=wiprocurement.a018_konp.ekorg and
					wiprocurement.a018_konp.datbi in ('2099-12-31') and
					wiprocurement.a018_konp.datab<=Current_date and
					wiprocurement.eine.EBELN is NOT NULL and
					wiprocurement.ekpo.zzrecwerks is NOT NULL and
					wiprocurement.eina.BMATN = ANY(string_to_array($1,','))
			) x1 left join exlist ON x1."Currency"=exlist.fcurr WHERE x1.rn=1
		) 
		ON CONFLICT (partnumber,plant,purchaseorg) 
		DO UPDATE SET 
			mpnno=excluded.mpnno,
			price=excluded.price,
			currency=excluded.currency,
			update_time=excluded.update_time,
			exchange_rate=excluded.exchange_rate,
			vendor_code=excluded.vendor_code,
			manufacturer=excluded.manufacturer,
			vendor_pn=excluded.vendor_pn,
			update_by=excluded.update_by
		;
		
		GET DIAGNOSTICS data_count = ROW_COUNT;
		RETURN data_count;
    END;

$BODY$;

ALTER FUNCTION wiprocurement.fn_eproc_get_pn_price_text(text)
    OWNER TO "swpc-user";
