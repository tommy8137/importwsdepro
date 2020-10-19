DROP VIEW IF EXISTS formula.v_plastic_printing;

CREATE OR REPLACE VIEW formula.v_plastic_printing AS
  SELECT pp.id, pp.printing_name AS name, pp.disable_time
  FROM formula.plastic_printing pp
  WHERE pp.product_type_id = (
    SELECT id FROM formula.product_type pt WHERE pt.type_name = 'NB'
  );
