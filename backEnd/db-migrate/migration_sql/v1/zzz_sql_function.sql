-- FUNCTION: wiprocurement.fn_eproc_get_spendingbase(character varying, character varying)

-- DROP FUNCTION wiprocurement.fn_eproc_get_spendingbase(character varying, character varying);

CREATE OR REPLACE FUNCTION wiprocurement.fn_eproc_get_spendingbase(
	date_from character varying,
	date_to character varying)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

    --#variable_conflict use_variable
    DECLARE
        curtime timestamp := now();
    BEGIN
		DELETE FROM wiprocurement.spending_base WHERE date_cpudt_mkpf >= to_date(date_from, 'YYYY-MM-DD') AND date_cpudt_mkpf < to_date(date_to, 'YYYY-MM-DD');
		INSERT INTO wiprocurement.spending_base(inforecord,sourcer,po_no,currency,date,po_price,quantity,
												profit_center, materialnumber, type1, type2, material_desc, 
												brand, plant, manufacturer,supply_type, supply_type_name, 
												odmoem, exchange_rate, buyer, vendorcode, werks, vendor_base, vendor_group, 
												short_name, vendor_name, site, product_name, bu2_description, sourcername, 
												buyername,month,date_cpudt_mkpf)
				 SELECT 
					t5.infnr AS inforecord, t5.ekgrp AS sourcer, t5.EBELN as po_no, t5.WAERS AS currency,t5.BUDAT_MKPF AS date, t5.po_price, t5.MENGE AS quantity, 
					t5.ko_prctr AS profit_center, t5.bmatn as materialnumber,t5.zzcontyp1 AS type1, t5.zzcontyp2 AS type2, t5.maktx AS material_desc,
					t5.brand,t5.matdocplant as plant,t5.MFRNR AS manufacturer, marc.ZZBSAR as supply_type, marc.supply_type as supply_type_name, 
					marc.odmoem, ekko.WKURS AS exchange_rate, ekko.ekgrp AS buyer,ekko.LIFNR AS vendorcode,t5.werks,vendor.vendor_base, vendor.vendor_group,
					vendor.short_name, vendor.vendor_name, plantList.plantname as site,profit.product_name, profit.bu2_description,t024_s.eknam as sourcername,
					t024_b.eknam as buyername,to_char(to_date($1, 'YYYY-MM'), 'YYYY-MM'), t5.date_cpudt_mkpf                    
				  FROM
                        (
                        -- start 5: INNER JOIN wiprocurement.mara as mara on eina.bmatn = mara.matnr
                        SELECT  t4.EBELN, t4.WAERS, t4.BUDAT_MKPF, t4.matdocplant, t4.po_price, t4.MENGE, t4.date_cpudt_mkpf, t4.ko_prctr, t4.brand,  
							t4.werks, t4.infnr, t4.ekgrp, t4.bmatn, t4.MFRNR, 
							mara.zzcontyp1, mara.zzcontyp2, mara.maktx, mara.matnr
                        FROM
                        (
                        -- start 3 INNER JOIN ekpo.infnr = eine.infnr
                        SELECT  t3.EBELN, t3.WAERS, t3.BUDAT_MKPF, t3.matdocplant, 
							t3.po_price, t3.MENGE, t3.date_cpudt_mkpf, t3.ko_prctr, t3.brand,
							t3.werks, t3.infnr, t3.ekgrp, eina.bmatn, eina.MFRNR
                        FROM
                        (
                        SELECT  t1.EBELN, t1.WAERS, t1.BUDAT_MKPF, t1.matdocplant,
							t1.po_price::numeric, t1.MENGE, t1.date_cpudt_mkpf, t1.ko_prctr, t1.brand, 
							t2.werks, t2.infnr, t2.ekgrp
                        FROM
                        (
                        -- start 1: INNER JOIN wiprocurement.matdoc_ln on matdocln.EBELN  = ekpo.EBELN and matdocln.EBELP = ekpo.EBELP
                        SELECT  matdocln.EBELN, matdocln.WAERS, matdocln.BUDAT_MKPF, matdocln.WERKS as matdocplant, 
						CASE WHEN matdocln.SHKZG='H' THEN (ekpo.po_price*-1)::TEXT ELSE ekpo.po_price::TEXT END as po_price,
						CASE WHEN matdocln.SHKZG='H' THEN (ekpo.MENGE::numeric*-1)::TEXT ELSE ekpo.MENGE END MENGE,
						matdocln.CPUDT_MKPF as date_cpudt_mkpf, ekpo.infnr, ekpo.ebelp, ekpo.ko_prctr, ekpo.brand
                        FROM
                        (
							SELECT EBELN, EBELP, WAERS, BUDAT_MKPF, WERKS, SHKZG, CPUDT_MKPF 
							FROM wiprocurement.matdoc_ln  
							WHERE CPUDT_MKPF >= to_date(date_from, 'YYYY-MM-DD') AND CPUDT_MKPF < to_date(date_to, 'YYYY-MM-DD') 
							AND BWART = ANY(VALUES ('101'),('102'),('122'),('123'),('161'),('162'))
                         ) AS matdocln
                        INNER JOIN
                        (
							SELECT  infnr, ebeln, ebelp, netpr/NULLIF(peinh,0) AS po_price, MENGE, ko_prctr, MFRNR AS brand FROM  wiprocurement.ekpo 
                         ) AS ekpo
                        on matdocln.EBELN = ekpo.EBELN and matdocln.EBELP = ekpo.EBELP
                        ) AS t1
                        -- end 1: INNER JOIN wiprocurement.matdoc_ln on matdocln.EBELN  = ekpo.EBELN and matdocln.EBELP = ekpo.EBELP
                        INNER JOIN
                        (
                        -- start 2: INNER JOIN  wiprocurement.eine as eine on tw.ekorg = eine.ekorg
							SELECT  eine.infnr, eine.ekgrp, eine.ekorg, tw.werks FROM 
							(
								SELECT  ekorg, werks FROM wiprocurement.t024w WHERE werks is not null
							) as tw
                        INNER JOIN
							(
								SELECT  infnr, ekgrp, ekorg FROM wiprocurement.eine WHERE ekgrp is not null 
							) AS eine
                        ON   tw.ekorg = eine.ekorg
                        -- end 2: INNER JOIN     wiprocurement.eine as eine ON tw.ekorg = eine.ekorg
                        ) AS t2
                        ON t1.infnr = t2.infnr
                        -- end 3: INNER JOIN ekpo.infnr = eine.infnr
                        ) AS t3
                        INNER JOIN wiprocurement.eina ON t3.infnr = eina.infnr
                        -- end 4:  eine.infnr = eina.infnr
                        ) AS t4
                        INNER JOIN
                        (
							SELECT zzcontyp1, zzcontyp2, maktx, matnr FROM wiprocurement.mara   
                         )  AS mara
                        --- end 5 INNER JOIN wiprocurement.mara as mara on eina.bmatn = mara.matnr
                        ON t4.bmatn = mara.matnr
                        ) AS t5
                        -- start 6: INNER JOIN wiprocurement.marc as marc on marc.matnr = mara.matnr and marc.werks = tw.werks
                        INNER JOIN (
							SELECT marc_1.ZZBSAR,marc_1.matnr,marc_1.werks,mapp.supply_type,mapp.odmoem FROM 
							(
								SELECT ZZBSAR,matnr,werks FROM wiprocurement.marc  
								WHERE ZZBSAR = ANY(VALUES ('1'),('11'),('13'),('14'),('15')) 
							) AS marc_1
							LEFT JOIN  wiprocurement.supplytypemapping as mapp on marc_1.ZZBSAR=mapp.key  
                         ) AS marc ON marc.matnr = t5.matnr AND marc.werks = t5.werks
                        -- start 7: INNER JOIN wiprocurement.marc as marc on marc.matnr = mara.matnr and marc.werks = tw.werks
                        INNER JOIN  wiprocurement.ekko AS ekko ON t5.ebeln = ekko.ebeln
                        LEFT JOIN
                        (SELECT lfal.lifnr as vcode,vgroup.vbase as vendor_base, vgroup.vgname as vendor_group ,vgroup.vsname as   short_name, lfal.name1 as vendor_name from wiprocurement.lfa1 as lfal 
                        LEFT JOIN wiprocurement.epur_vgroup as vgroup ON vgroup.vcode = lfal.lifnr ) as vendor
                        ON vendor.vcode = ekko.LIFNR
                        LEFT JOIN wiprocurement.plant_list as plantList on plantList.plant =  t5.matdocplant
                        LEFT JOIN (SELECT product_name, bu2_description,profit_center_key FROM wiprocurement.v_businessorg_bo) as profit ON 
                        t5.ko_prctr = profit.profit_center_key
                        LEFT JOIN wiprocurement.t024 as t024_s ON t024_s.ekgrp = t5.ekgrp
                        LEFT JOIN wiprocurement.t024 as t024_b ON t024_b.ekgrp = ekko.ekgrp;
		--ON CONFLICT ON CONSTRAINT spending_types_pkey 
		--DO NOTHING;
    END;

$BODY$;

ALTER FUNCTION wiprocurement.fn_eproc_get_spendingbase(character varying, character varying)
    OWNER TO "swpc-user";
