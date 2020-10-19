
CREATE OR REPLACE FUNCTION wiprocurement.fn_eproc_get_xray_analysis_price()
RETURNS integer
LANGUAGE 'plpgsql'
    --#variable_conflict use_variable
AS $BODY$
    DECLARE
      data_count integer;
    BEGIN
		DELETE FROM wiprocurement.xray_analysis_price;
    INSERT INTO wiprocurement.xray_analysis_price(partnumber, manufacturer, price, currency, unit,
matnr, vendor_pn, vendor_name, datbi, datab)
    (
      SELECT DISTINCT ON (matnr) eina.bmatn AS partnumber,
        MFRNR AS manufacturer,
        cast( KBETR as numeric)/KPEIN AS price,
        KONWA AS currency,
        KPEIN as unit,
        eina.matnr AS matnr,
        mfrpn AS vendor_pn,
        vgroup.vgName AS vendor_name,
        datbi,
        datab
        FROM wiprocurement.a018_konp AS a018
        inner join wiprocurement.eina AS eina on (eina.matnr = a018.matnr and eina.lifnr = a018.lifnr)
        LEFT JOIN wiprocurement.epur_vgroup AS vgroup ON (a018.LIFNR = vgroup.vcode)
        WHERE (LOEVM_KO is null and MFRNR is not null and MFRNR != '' and (eina.bmatn is not null or eina.bmatn != ''))
        ORDER BY matnr ASC, knumh DESC
    );

    GET DIAGNOSTICS data_count = ROW_COUNT;
    RETURN data_count;
    END;
$BODY$;

ALTER FUNCTION wiprocurement.fn_eproc_get_xray_analysis_price()
    OWNER TO "swpc-user";

CREATE TABLE wiprocurement.xray_analysis_price
(
    partnumber character varying,
    manufacturer character varying,
    price numeric,
    currency character varying,
    unit numeric,
    matnr character varying,
    vendor_pn character varying,
    vendor_name character varying,
    datbi date,
    datab date,
    create_time timestamp with time zone DEFAULT now(),
    CONSTRAINT xray_analysis_price_pkey PRIMARY KEY (partnumber, matnr)
);
CREATE INDEX if not exists xray_analysis_price_idx ON wiprocurement.xray_analysis_price (partnumber);
