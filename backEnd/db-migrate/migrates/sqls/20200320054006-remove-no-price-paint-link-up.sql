update formula.plastic_paint_vendor_type_color_bottom_top 
set disable_time = now()
where id in (
select link.id from formula.v_plastic_painting_vendor_type_color_bottom_top link
left join formula.parameter_value pv on pv.parameter_id = link.id
where pv.value is null
and pv.activate_date_id is null
and link.link_disable_time is null);

DROP VIEW IF EXISTS formula.v_plastic_painting_vendor_v2;

-- v_plastic_painting_vendor_v2
CREATE OR REPLACE VIEW formula.v_plastic_painting_vendor_v2
AS SELECT DISTINCT link.paint_type_id,
    link.paint_type_name,
    link.paint_color_id,
    link.paint_color_name,
        CASE
            WHEN (( SELECT count(link_b.id) AS count
               FROM formula.v_plastic_painting_vendor_type_color_bottom_top link_b
              WHERE link_b.paint_color_id = link.paint_color_id AND link_b.paint_type_id = link.paint_type_id AND link_b.paint_bottom_top_name::text = '底漆'::text AND link_b.link_disable_time IS NULL)) > 0 THEN true
            ELSE false
        END AS bottom,
        CASE
            WHEN (( SELECT count(link_t.id) AS count
               FROM formula.v_plastic_painting_vendor_type_color_bottom_top link_t
              WHERE link_t.paint_color_id = link.paint_color_id AND link_t.paint_type_id = link.paint_type_id AND link_t.paint_bottom_top_name::text = '面漆'::text AND link_t.link_disable_time IS NULL)) > 0 THEN true
            ELSE false
        END AS top,
    link.paint_vendor_id,
    link.paint_vendor_name
   FROM formula.v_plastic_painting_vendor_type_color_bottom_top link
     LEFT JOIN formula.parameter_value pv ON link.id = pv.parameter_id
     LEFT JOIN formula.schedule_date sd ON sd.id = pv.activate_date_id
  WHERE pv.value IS NOT NULL AND sd.id = (( SELECT max(sd2.id) AS id
           FROM formula.schedule_date sd2
          WHERE sd2.activate_date < now() AND sd2.product_type_id IS NULL AND sd2.formula_type_id = (( SELECT ft.id
                   FROM formula.formula_type ft
                  WHERE ft.name::text = 'housing_plastic'::text))));

-- Permissions

ALTER TABLE formula.v_plastic_painting_vendor_v2 OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_painting_vendor_v2 TO "swpc-user";
GRANT SELECT ON TABLE formula.v_plastic_painting_vendor_v2 TO emdm;