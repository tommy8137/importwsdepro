--metal_anode_color
DROP VIEW IF EXISTS formula.v_metal_andoe_color;
CREATE OR REPLACE VIEW formula.v_metal_andoe_color
AS SELECT mac.id,
    mac.name,
    mac.disable_time
FROM formula.metal_anode_color mac
where mac.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
);
ALTER TABLE formula.v_metal_andoe_color OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_andoe_color TO "swpc-user";

-- metal_glue
DROP VIEW IF EXISTS formula.v_metal_glue;
CREATE OR REPLACE VIEW formula.v_metal_glue
AS SELECT mg.id,
    mg.glue_name AS name,
    mg.disable_time
   FROM formula.metal_glue mg
where mg.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
);
ALTER TABLE formula.v_metal_glue OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_glue TO "swpc-user";

-- v_metal_glue_syringe_diameter
DROP VIEW IF EXISTS formula.v_metal_glue_syringe_diameter;
CREATE OR REPLACE VIEW formula.v_metal_glue_syringe_diameter
AS SELECT ms.id,
    ms.syringe_name AS name,
    ms.disable_time
   FROM formula.metal_syringe ms
where ms.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
);
ALTER TABLE formula.v_metal_glue_syringe_diameter OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_glue_syringe_diameter TO "swpc-user";


--plastic_embed_nail
DROP VIEW IF EXISTS formula.v_plastic_embed_nail;
CREATE OR REPLACE VIEW formula.v_plastic_embed_nail
AS SELECT pen.id,
    pen.embed_nail_name AS name,
    pen.disable_time
   FROM formula.plastic_embed_nail pen
where pen.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
);
ALTER TABLE formula.v_plastic_embed_nail OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_embed_nail TO "swpc-user";

--plastic_emi_sputtering_base
DROP VIEW IF EXISTS formula.v_plastic_emi_sputtering_base;
CREATE OR REPLACE VIEW formula.v_plastic_emi_sputtering_base
AS SELECT pesb.id,
    pesb.emi_base AS name,
    pesb.disable_time
   FROM formula.plastic_emi_sputtering_base pesb
where pesb.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
);
ALTER TABLE formula.v_plastic_emi_sputtering_base OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_emi_sputtering_base TO "swpc-user";

--plastic_emi_sputtering_size
DROP VIEW IF EXISTS formula.v_plastic_emi_sputtering_size;
CREATE OR REPLACE VIEW formula.v_plastic_emi_sputtering_size
AS SELECT pess.id,
    pess.emi_size AS name,
    pess.disable_time
   FROM formula.plastic_emi_sputtering_size pess
where pess.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
);
ALTER TABLE formula.v_plastic_emi_sputtering_size OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_emi_sputtering_size TO "swpc-user";

--plastic_grinding
DROP VIEW IF EXISTS formula.v_plastic_grinding;
CREATE OR REPLACE VIEW formula.v_plastic_grinding
AS SELECT pg.id,
    pg.grinding_name AS name,
    pg.disable_time
   FROM formula.plastic_grinding pg
where pg.product_type_id = (
	select id from formula.product_type pt where pt.type_name = 'NB'
);
ALTER TABLE formula.v_plastic_grinding OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_grinding TO "swpc-user";

-- v_plastic_printing
DROP VIEW IF EXISTS formula.v_plastic_printing;
CREATE VIEW formula.v_plastic_printing AS
  SELECT pp.id,
    pp.printing_name AS name,
    pp.disable_time,
    pp.product_type_id
  FROM formula.plastic_printing pp
 WHERE pp.product_type_id = (
    SELECT id FROM formula.product_type pt WHERE pt.type_name = 'NB'
  );
ALTER TABLE formula.v_plastic_printing OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_plastic_printing TO "swpc-user";