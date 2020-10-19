
DROP VIEW wiprocurement.view_eebom_detail;
CREATE OR REPLACE VIEW wiprocurement.view_eebom_detail
AS SELECT eebom_detail.id,
    eebom_detail.edm_version_id,
    eebom_detail.type1,
    eebom_detail.type2,
    eebom_detail.part_number,
    eebom_detail.description,
    eebom_detail.manufacturer,
    eebom_detail.current_price,
    eebom_detail.spa,
    eebom_detail.lpp,
    eebom_detail.ce_cost,
        CASE
            WHEN eebom_detail.ce_cost IS NOT NULL THEN eebom_detail.ce_cost
            WHEN eebom_detail.currrent_price_adj_percentage IS NOT NULL THEN round(eebom_detail.currrent_price_adj_percentage / 100::numeric, 3) * eebom_detail.current_price
            WHEN eebom_detail.supply_type::text = 'W'::text OR eebom_detail.supply_type::text = 'AV'::text AND eebom_detail.current_price IS NOT NULL THEN LEAST(eebom_detail.current_price, eebom_detail.spa, eebom_detail.lpp)
            WHEN eebom_detail.supply_type::text = 'W'::text OR eebom_detail.supply_type::text = 'AV'::text AND eebom_detail.sourcer_cost IS NOT NULL THEN LEAST(eebom_detail.sourcer_cost, eebom_detail.spa, eebom_detail.lpp)
            WHEN eebom_detail.current_price IS NOT NULL THEN eebom_detail.current_price
            WHEN eebom_detail.sourcer_cost IS NOT NULL THEN eebom_detail.sourcer_cost
            ELSE NULL::numeric
        END AS suggestion_cost,
        CASE
            WHEN eebom_detail.ce_cost IS NOT NULL THEN eebom_detail.ce_cost * eebom_detail.qty
            WHEN eebom_detail.currrent_price_adj_percentage IS NOT NULL THEN round(eebom_detail.currrent_price_adj_percentage / 100::numeric, 3) * eebom_detail.current_price * eebom_detail.qty
            WHEN eebom_detail.supply_type::text = 'W'::text OR eebom_detail.supply_type::text = 'AV'::text AND eebom_detail.current_price IS NOT NULL THEN LEAST(eebom_detail.current_price, eebom_detail.spa, eebom_detail.lpp) * eebom_detail.qty
            WHEN eebom_detail.supply_type::text = 'W'::text OR eebom_detail.supply_type::text = 'AV'::text AND eebom_detail.sourcer_cost IS NOT NULL THEN LEAST(eebom_detail.sourcer_cost, eebom_detail.spa, eebom_detail.lpp) * eebom_detail.qty
            WHEN eebom_detail.current_price IS NOT NULL THEN eebom_detail.current_price * eebom_detail.qty
            WHEN eebom_detail.sourcer_cost IS NOT NULL THEN eebom_detail.sourcer_cost * eebom_detail.qty
            ELSE NULL::numeric
        END AS sub_total_suggestion_cost,
        CASE
            WHEN eebom_detail.current_price IS NOT NULL THEN eebom_detail.current_price * eebom_detail.qty
            ELSE eebom_detail.sourcer_cost * eebom_detail.qty
        END AS sub_total_last_price,
        CASE
            WHEN eebom_detail.current_price IS NOT NULL THEN 'N'::text
            ELSE 'Y'::text
        END AS exp,
    eebom_detail.currrent_price_adj_percentage,
    eebom_detail.remark,
    eebom_detail.qty,
    eebom_detail.vendor,
    eebom_detail.vendor_part_no,
    eebom_detail.supply_type,
    eebom_detail.obs,
    eebom_detail.module,
    eebom_detail.is_personal_checked,
    eebom_detail.is_leader_checked,
    eebom_detail.is_personal_submitted,
    eebom_detail.create_time,
    eebom_detail.update_time,
    eebom_detail.other_manufacture_info,
    eebom_detail.sheet,
    eebom_detail.valid_from,
    eebom_detail.is_reject,
    eebom_detail.leader_checked_status,
    eebom_detail.leader_submitted_status,
    eebom_detail.exp_spa,
    eebom_detail.exp_other_manufacture_info,
    eebom_detail.spa_expire,
    eebom_detail.is_common_parts,
    eebom_detail.sourcer_cost
   FROM wiprocurement.eebom_detail;
