ALTER TABLE wiprocurement.eebom_detail ADD COLUMN IF NOT EXISTS leader_checked_status varchar(10) default null;
ALTER TABLE wiprocurement.eebom_detail ADD COLUMN IF NOT EXISTS leader_submitted_status varchar(10) default null;
ALTER TABLE wiprocurement.eebom_detail ADD COLUMN IF NOT EXISTS is_reject boolean default false;


DROP VIEW IF EXISTS wiprocurement.view_eebom_detail;

CREATE OR REPLACE VIEW wiprocurement.view_eebom_detail AS
 SELECT eebom_detail.id,
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
            ELSE LEAST(eebom_detail.current_price, eebom_detail.spa, eebom_detail.lpp)
        END AS suggestion_cost,
        CASE
            WHEN eebom_detail.ce_cost IS NOT NULL THEN eebom_detail.ce_cost * eebom_detail.qty
            ELSE LEAST(eebom_detail.current_price, eebom_detail.spa, eebom_detail.lpp) * eebom_detail.qty
        END AS sub_total_suggestion_cost,
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
    eebom_detail.is_common_parts
   FROM wiprocurement.eebom_detail;

ALTER TABLE wiprocurement.view_eebom_detail
    OWNER TO "swpc-user";

