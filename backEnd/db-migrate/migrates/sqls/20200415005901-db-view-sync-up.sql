/* Replace with your SQL commands */
-- v_metal_andoe_color
DROP VIEW IF EXISTS formula.v_metal_andoe_color;
CREATE VIEW formula.v_metal_andoe_color AS
  SELECT mac.id,
    mac.name,
    mac.disable_time,
    mac.product_type_id
  FROM formula.metal_anode_color mac;
ALTER TABLE formula.v_metal_andoe_color OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_andoe_color TO "swpc-user";

-- v_metal_glue
DROP VIEW IF EXISTS formula.v_metal_glue;
CREATE VIEW formula.v_metal_glue AS
  SELECT mg.id,
    mg.glue_name AS name,
    mg.disable_time,
    mg.product_type_id
  FROM formula.metal_glue mg;
ALTER TABLE formula.v_metal_glue OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_glue TO "swpc-user";

-- v_metal_glue_syringe_diameter
DROP VIEW IF EXISTS formula.v_metal_glue_syringe_diameter;
CREATE VIEW formula.v_metal_glue_syringe_diameter AS
  SELECT ms.id,
    ms.syringe_name AS name,
    ms.disable_time,
    ms.product_type_id
  FROM formula.metal_syringe ms;
ALTER TABLE formula.v_metal_glue_syringe_diameter OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_glue_syringe_diameter TO "swpc-user";

-- v_plastic_embed_nail
DROP VIEW IF EXISTS formula.v_plastic_embed_nail;
CREATE VIEW formula.v_plastic_embed_nail AS
  SELECT pen.id,
    pen.embed_nail_name AS name,
    pen.disable_time,
    pen.product_type_id
  FROM formula.plastic_embed_nail pen;
ALTER TABLE formula.v_plastic_embed_nail OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_embed_nail TO "swpc-user";

-- v_plastic_emi_sputtering_base
DROP VIEW IF EXISTS formula.v_plastic_emi_sputtering_base;
CREATE VIEW formula.v_plastic_emi_sputtering_base AS
  SELECT pesb.id,
    pesb.emi_base AS name,
    pesb.disable_time,
    pesb.product_type_id
  FROM formula.plastic_emi_sputtering_base pesb;
ALTER TABLE formula.v_plastic_emi_sputtering_base OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_emi_sputtering_base TO "swpc-user";

-- v_plastic_emi_sputtering_size
DROP VIEW IF EXISTS formula.v_plastic_emi_sputtering_size;
CREATE VIEW formula.v_plastic_emi_sputtering_size AS
  SELECT pess.id,
    pess.emi_size AS name,
    pess.disable_time,
    pess.product_type_id
  FROM formula.plastic_emi_sputtering_size pess;
ALTER TABLE formula.v_plastic_emi_sputtering_size OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_emi_sputtering_size TO "swpc-user";

-- v_plastic_grinding
DROP VIEW IF EXISTS formula.v_plastic_grinding;
CREATE VIEW formula.v_plastic_grinding AS
  SELECT pg.id,
    pg.grinding_name AS name,
    pg.disable_time,
    pg.product_type_id
  FROM formula.plastic_grinding pg;
ALTER TABLE formula.v_plastic_grinding OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_grinding TO "swpc-user";

-- v_plastic_printing
DROP VIEW IF EXISTS formula.v_plastic_printing;
CREATE VIEW formula.v_plastic_printing AS
  SELECT pp.id,
    pp.printing_name AS name,
    pp.disable_time,
    pp.product_type_id
  FROM formula.plastic_printing pp;
ALTER TABLE formula.v_plastic_printing OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_printing TO "swpc-user";

-- v_metal_machine_ton
DROP VIEW IF EXISTS formula.v_metal_machine_ton;
CREATE VIEW formula.v_metal_machine_ton AS
  SELECT mm.id,
    mm.ton,
    mmetal.disable_time,
    mmetal.product_type_id
  FROM formula.machine_metal AS mm
  LEFT JOIN formula.module_machine_metal AS mval
    ON (mm.id = mval.machine_metal_id)
  LEFT JOIN formula.module_metal AS mmetal
    ON (mmetal.id = mval.module_metal_id);
ALTER TABLE formula.v_metal_machine_ton OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_machine_ton TO "swpc-user";
