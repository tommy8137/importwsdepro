CREATE OR REPLACE VIEW wiprocurement.predict_item_detail as
select a.wistron_part_number, a.type1, a.type2, a.plant, a.supply_type, a.manufacturer 
	,a.profit_center, (doc.dmbtr/doc.menge) as price, doc.budat_mkpf as gr_date
	,a.spec1, a.spec2, a.spec3, a.spec4, a.spec5, a.spec6, a.spec7, a.spec8, a.spec9, a.spec10, a.spec11, a.spec12, a.spec13, a.spec14, a.spec15, a.spec16, a.spec17, a.spec18, a.spec19, a.spec20, a.spec21, a.spec22, a.spec23, a.spec24, a.spec25, a.spec26, a.spec27, a.spec28, a.spec29, a.spec30
from (select t.item as wistron_part_number, rc.prctr as profit_center,
             m.zzcontyp1 as type1, m.zzcontyp2 as type2, rc.werks as Plant, rc.zzbsar as supply_type, e.mfrnr as manufacturer, e.matnr
             ,t.spec1, t.spec2, t.spec3, t.spec4, t.spec5, t.spec6, t.spec7, t.spec8, t.spec9, t.spec10
             , t.spec11, t.spec12, t.spec13, t.spec14, t.spec15, t.spec16, t.spec17, t.spec18, t.spec19, t.spec20
             , t.spec21, t.spec22, t.spec23, t.spec24, t.spec25, t.spec26, t.spec27, t.spec28, t.spec29, t.spec30
    from epur_itemspec t, mara m, marc rc, eina e, (select distinct part_number from predict_part_number) p
where p.part_number = t.item and t.item = m.matnr and t.item = rc.matnr 
	--and t.item = doc.matnr and doc.ematn = e.matnr
	and t.item = e.bmatn
	)a
left join matdoc_ln doc on a.wistron_part_number = doc.matnr and a.matnr = doc.ematn and doc.werks = a.plant;