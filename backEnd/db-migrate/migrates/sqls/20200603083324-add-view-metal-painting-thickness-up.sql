CREATE OR REPLACE VIEW formula.v_metal_painting_thickness
AS SELECT ms.id,
    ms.spec_name AS name,
    ms.disable_time
   FROM formula.me_spec ms
  WHERE ms.spec_category::text = 'metal_paint_thickness'::text;

-- Permissions

ALTER TABLE formula.v_metal_painting_thickness OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_painting_thickness TO "swpc-user";
GRANT SELECT ON TABLE formula.v_metal_painting_thickness TO emdm;
