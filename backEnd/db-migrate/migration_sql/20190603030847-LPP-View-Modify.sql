CREATE OR REPLACE VIEW wiprocurement.predict_part_number
as  
select d.part_number, p.plant, rc.prctr, d.manufacturer 
from eebom_projects p, edm_version v, eebom_detail d, marc rc where 
p.project_code in ('4PD0FT01B001','4PD0GK010001','4PD0FD010001','4PD0F8010001')
and p.id = v.eebom_project_id
and v.id = d.edm_version_id
and rc.matnr = d.part_number
and p.plant = rc.werks;

CREATE OR REPLACE VIEW wiprocurement.predict_item_detail
AS SELECT a.wistron_part_number,
    a.type1,
    a.type2,
    a.plant,
    a.supply_type,
    a.manufacturer,
    a.profit_center,
    doc.dmbtr / doc.menge AS price,
    doc.budat_mkpf AS gr_date,
    a.spec1,
    a.spec2,
    a.spec3,
    a.spec4,
    a.spec5,
    a.spec6,
    a.spec7,
    a.spec8,
    a.spec9,
    a.spec10,
    a.spec11,
    a.spec12,
    a.spec13,
    a.spec14,
    a.spec15,
    a.spec16,
    a.spec17,
    a.spec18,
    a.spec19,
    a.spec20,
    a.spec21,
    a.spec22,
    a.spec23,
    a.spec24,
    a.spec25,
    a.spec26,
    a.spec27,
    a.spec28,
    a.spec29,
    a.spec30,
    doc.waers as currency,
    doc.menge as gr_qty
   FROM ( SELECT t.item AS wistron_part_number,
            rc.prctr AS profit_center,
            m.zzcontyp1 AS type1,
            m.zzcontyp2 AS type2,
            rc.werks AS plant,
            rc.zzbsar AS supply_type,
            e.mfrnr AS manufacturer,
            e.matnr,
            t.spec1,
            t.spec2,
            t.spec3,
            t.spec4,
            t.spec5,
            t.spec6,
            t.spec7,
            t.spec8,
            t.spec9,
            t.spec10,
            t.spec11,
            t.spec12,
            t.spec13,
            t.spec14,
            t.spec15,
            t.spec16,
            t.spec17,
            t.spec18,
            t.spec19,
            t.spec20,
            t.spec21,
            t.spec22,
            t.spec23,
            t.spec24,
            t.spec25,
            t.spec26,
            t.spec27,
            t.spec28,
            t.spec29,
            t.spec30
           FROM epur_itemspec t,
            mara m,
            marc rc,
            eina e,
            ( SELECT DISTINCT predict_part_number.part_number
                   FROM predict_part_number) p
          WHERE p.part_number::text = t.item::text AND t.item::text = m.matnr::text AND t.item::text = rc.matnr::text AND t.item::text = e.bmatn::text) a
     LEFT JOIN matdoc_ln doc ON a.wistron_part_number::text = doc.matnr::text AND a.matnr::text = doc.ematn::text AND doc.werks::text = a.plant::text;

     CREATE OR REPLACE VIEW wiprocurement.epur_item_type_spec as
select spec.item as part_number, ty1.type1name, ty2.type2name, spec.* FROM EPUR_ITEMSPEC spec, EPUR_ITEMTYPE ty, EPUR_TYPE1 ty1, EPUR_TYPE2 ty2
where  spec.item = ty.ITEM AND ty.TYPE1ID = ty1.TYPE1ID AND ty.TYPE2ID = ty2.TYPE2ID;
