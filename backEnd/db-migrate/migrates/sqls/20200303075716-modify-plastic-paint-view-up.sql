
DROP VIEW IF EXISTS formula.v_plastic_painting_type_v2;
DROP VIEW IF EXISTS formula.v_plastic_painting_vendor_v2;
DROP VIEW IF EXISTS formula.v_plastic_painting_type_vendor;
DROP VIEW IF EXISTS formula.v_plastic_painting_vendor_type_color_bottom_top;

-- v_plastic_painting_vendor_type_color_bottom_top
CREATE OR REPLACE VIEW formula.v_plastic_painting_vendor_type_color_bottom_top
AS 
select 
all_link.id,
"type".id  as paint_type_id,
"type".type_name as paint_type_name,
color.id as paint_color_id,
color.color_name as paint_color_name,
"level".id as paint_bottom_top_id,
"level".bottom_top_name as paint_bottom_top_name,
all_link.paint_vendor_id,
vendor.vendor_name as paint_vendor_name, 
all_link.disable_time as link_disable_time
from formula.plastic_paint_vendor_type_color_bottom_top all_link
left join formula.plastic_paint_vendor vendor on vendor.id = all_link.paint_vendor_id
left join formula.plastic_paint_type_color_bottom_top cb_link on all_link.type_color_bottom_top_id = cb_link.id
left join formula.plastic_paint_bottom_top "level" on cb_link.paint_bottom_top_id = "level".id 
left join formula.plastic_paint_type_color tc_link on tc_link.id = cb_link.paint_type_color_id 
left join formula.plastic_paint_color color on color.id = tc_link.paint_color_id
left join formula.plastic_paint_type "type" on "type".id = tc_link.paint_type_id
order by "type".type_name, color.color_name, "level".bottom_top_name, vendor.vendor_name;

-- Permissions
ALTER TABLE formula.v_plastic_painting_vendor_type_color_bottom_top OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_painting_vendor_type_color_bottom_top TO "swpc-user";
GRANT SELECT ON TABLE formula.v_plastic_painting_vendor_type_color_bottom_top TO emdm;


-- v_plastic_painting_type_v2
CREATE OR REPLACE VIEW formula.v_plastic_painting_type_v2
AS 
select
tp.id,
tp.type_name as"name",
case when (select count(link.id) from formula.v_plastic_painting_vendor_type_color_bottom_top link where link.paint_type_id = tp.id and link.paint_bottom_top_name = '底漆' and link.link_disable_time is null) > 0 then true else false end as bottom,
case when (select count(link.id) from formula.v_plastic_painting_vendor_type_color_bottom_top link where link.paint_type_id = tp.id and link.paint_bottom_top_name = '面漆' and link.link_disable_time is null) > 0 then true else false end as top,
tp.disable_time
from formula.plastic_paint_type tp;

-- Permissions
ALTER TABLE formula.v_plastic_painting_type_v2 OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_painting_type_v2 TO "swpc-user";
GRANT SELECT ON TABLE formula.v_plastic_painting_type_v2 TO emdm;

-- v_plastic_painting_vendor_v2
CREATE OR REPLACE VIEW formula.v_plastic_painting_vendor_v2
AS 
select
link.paint_vendor_id as id,
link.paint_vendor_name as "name",
link.paint_type_id as type_id,
link.paint_color_id as color_id,
link_disable_time as disable_time
from formula.v_plastic_painting_vendor_type_color_bottom_top link;

-- Permissions
ALTER TABLE formula.v_plastic_painting_vendor_v2 OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_painting_vendor_v2 TO "swpc-user";
GRANT SELECT ON TABLE formula.v_plastic_painting_vendor_v2 TO emdm;