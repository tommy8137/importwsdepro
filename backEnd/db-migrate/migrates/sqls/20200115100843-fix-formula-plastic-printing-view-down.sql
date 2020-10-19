DROP VIEW IF EXISTS formula.v_plastic_printing;

create or replace view formula.v_plastic_printing as
select pp.id, pp.printing_name as name, pp.disable_time from formula.plastic_printing pp;

