DROP VIEW IF EXISTS formula.v_metal_press_type;
CREATE VIEW formula.v_metal_press_type AS
  select * from formula.metal_press_type;
  
-- Permissions
ALTER TABLE formula.v_metal_press_type OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_press_type TO "swpc-user";
GRANT SELECT ON TABLE formula.v_metal_press_type TO emdm;