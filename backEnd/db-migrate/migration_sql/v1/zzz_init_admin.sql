INSERT INTO wiprocurement.user (emplid, name_a, is_me, is_ce, is_ee, is_superuser) VALUES ('10700001', 'ADMIN',true, true, true,true);
UPDATE wiprocurement.user set name_a='ADMIN' WHERE emplid='10700001'

-- CREATE OR REPLACE VIEW wiprocurement.spending_base as 
-- select distinct * from (select tw.ekorg as Purchasing_Organization, tw.werks as plant, eine.infnr as inforecord, eine.ekgrp as sourcer, eina.bmatn as materialnumber, eina.bmatn as matnr,eina.MFRNR as manufacturer,  
-- mara.zzcontyp1 as type1, mara.zzcontyp2 as type2, mara.maktx as material_desc, ekpo.EBELN , ekpo.EBELP,ekko.WKURS as exchange_rate,ekpo.netpr/ekpo.peinh as po_price,ekpo.MENGE as quantity, ekpo.ko_prctr as profit_center, ekpo.MFRNR as brand, ekko.WAERS , ekko.ekgrp as buyer, matdocln.WAERS as currency, matdocln.VGART_MKPF as transactiontype, matdocln.CPUDT_MKPF as date,matdocln.CPUTM_MKPF as time, matdocln.WERKS as matdocplant, marc.ZZBSAR as supply_type, ekko.LIFNR as vendorcode 

--  from wiprocurement.t024w as tw 
--  inner join wiprocurement.eine as eine on tw.ekorg = eine.ekorg 
--  inner join wiprocurement.eina as eina on eine.infnr = eina.infnr
--  inner join wiprocurement.mara as mara on eina.bmatn = mara.matnr
--  inner join wiprocurement.marc as marc on marc.matnr = mara.matnr and marc.werks = tw.werks
--  inner join wiprocurement.ekpo as ekpo on ekpo.infnr = eine.infnr
--  inner join wiprocurement.ekko as ekko on ekpo.ebeln = ekko.ebeln 
--  inner join wiprocurement.matdoc_ln as matdocln on matdocln.EBELN  = ekpo.EBELN and matdocln.EBELP = ekpo.EBELP
--  ) as t 
 
 
 
 
 