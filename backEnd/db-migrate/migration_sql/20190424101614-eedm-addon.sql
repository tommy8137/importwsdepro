----  FUNCTION 
-- FUNCTION: wiprocurement.fn_eproc_get_pn_price()

-- DROP FUNCTION wiprocurement.fn_eproc_get_pn_price();

CREATE OR REPLACE FUNCTION wiprocurement.fn_eproc_get_pn_price(
	)
    RETURNS integer
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
    #variable_conflict use_variable
    DECLARE
        -- curtime timestamp := now();
  		data_count integer;
    BEGIN
		-- 將eedm_bom_item裡面的partnumber append進來
-- 		INSERT INTO wiprocurement.eedm_pn_request (partnumber,create_by)  
-- 		(
-- 			SELECT partnumber, table_name FROM wiprocurement.eedm_bom_item x1
-- 			WHERE NOT EXISTS (SELECT null FROM wiprocurement.eedm_pn_request x2 WHERE x1.partnumber=x2.partnumber)
-- 			GROUP BY partnumber,table_name
-- 			ORDER BY table_name
-- 		);
		-- 將資料標記處理時間
		UPDATE wiprocurement.eedm_pn_request SET process_time=NOW() WHERE process_time IS NULL;
		-- 開始寫入資料, 若重覆則覆蓋
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
					wiprocurement.eina.BMATN in (select distinct partnumber FROM wiprocurement.eedm_pn_request)
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

ALTER FUNCTION wiprocurement.fn_eproc_get_pn_price()
    OWNER TO "swpc-user";

----  eedm_bom_item
-- Table: wiprocurement.eedm_bom_item

-- DROP TABLE wiprocurement.eedm_bom_item;

CREATE TABLE wiprocurement.eedm_bom_item
(
    table_name character varying COLLATE pg_catalog."default",
    reference character varying COLLATE pg_catalog."default",
    schematicname character varying COLLATE pg_catalog."default",
    sheet character varying COLLATE pg_catalog."default",
    partnumber character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    usd numeric,
    type character varying COLLATE pg_catalog."default",
    bymodule character varying COLLATE pg_catalog."default",
    pic_role character varying COLLATE pg_catalog."default",
    board character varying COLLATE pg_catalog."default",
    uf character varying COLLATE pg_catalog."default",
    avap character varying COLLATE pg_catalog."default",
    create_time timestamp with time zone DEFAULT now(),
    update_time timestamp with time zone,
    update_by character varying COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.eedm_bom_item
    OWNER to "swpc-user";
----  eedm_cost_summarytable
-- Table: wiprocurement.eedm_cost_summarytable

-- DROP TABLE wiprocurement.eedm_cost_summarytable;

CREATE TABLE wiprocurement.eedm_cost_summarytable
(
    keyid integer,
    pcbno character varying COLLATE pg_catalog."default",
    stage character varying COLLATE pg_catalog."default",
    sku character varying COLLATE pg_catalog."default",
    projectcode character varying COLLATE pg_catalog."default",
    uploadtime character varying COLLATE pg_catalog."default",
    plant character varying COLLATE pg_catalog."default",
    po character varying COLLATE pg_catalog."default",
    create_time timestamp with time zone DEFAULT now(),
    update_time timestamp with time zone,
    update_by character varying COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.eedm_cost_summarytable
    OWNER to "swpc-user";
----  eedm_pn_price
-- Table: wiprocurement.eedm_pn_price

-- DROP TABLE wiprocurement.eedm_pn_price;

CREATE TABLE wiprocurement.eedm_pn_price
(
    partnumber character varying COLLATE pg_catalog."default" NOT NULL,
    mpnno character varying COLLATE pg_catalog."default",
    plant character varying COLLATE pg_catalog."default" NOT NULL,
    purchaseorg character varying COLLATE pg_catalog."default" NOT NULL,
    vendor_code character varying COLLATE pg_catalog."default",
    manufacturer character varying COLLATE pg_catalog."default",
    vendor_pn character varying COLLATE pg_catalog."default",
    price numeric,
    currency character varying COLLATE pg_catalog."default",
    exchange_rate numeric,
    source character varying COLLATE pg_catalog."default",
    update_time timestamp with time zone,
    update_by character varying COLLATE pg_catalog."default",
    create_time timestamp with time zone DEFAULT now(),
    create_by character varying COLLATE pg_catalog."default",
    CONSTRAINT eedm_pn_price_pkey PRIMARY KEY (partnumber, plant, purchaseorg)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.eedm_pn_price
    OWNER to "swpc-user";
----  eedm_pn_request
-- Table: wiprocurement.eedm_pn_request

-- DROP TABLE wiprocurement.eedm_pn_request;

CREATE TABLE wiprocurement.eedm_pn_request
(
    partnumber character varying COLLATE pg_catalog."default",
    process_time timestamp with time zone,
    create_time timestamp with time zone DEFAULT now(),
    create_by character varying COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.eedm_pn_request
    OWNER to "swpc-user";
----  