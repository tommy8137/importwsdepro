/* Replace with your SQL commands */
drop view if exists formula.v_graphite_pet;
CREATE OR REPLACE VIEW formula.v_graphite_pet
AS SELECT gp.id, gp.thickness as name, gp.disable_time from formula.graphite_pet gp; 

drop view if exists formula.v_graphite_second_process;
CREATE OR REPLACE VIEW formula.v_graphite_second_process AS 
SELECT gsp.id, gsp.process_name as name, gsp.disable_time from formula.graphite_second_process gsp; 

drop view if exists formula.v_graphite_thickness;
CREATE OR REPLACE VIEW formula.v_graphite_thickness AS 
SELECT gsp.id as graphite_id, gsp.graphite_name, gsp.disable_time as graphite_disable_time, ggt.id as graphite_thickness_id, ggt.thickness, ggt.disable_time as graphite_thickness_disable_time from formula.graphite_graphite gsp, formula.graphite_graphite_thickness ggt
where gsp.id = ggt.graphite_id; 

drop view if exists formula.v_graphite_glue;
CREATE OR REPLACE VIEW formula.v_graphite_glue as
SELECT gsp.id, gsp.thickness as name, gsp.disable_time from formula.graphite_glue gsp; 

drop view if exists formula.v_rubber_stamping;
CREATE OR REPLACE VIEW formula.v_rubber_stamping as
SELECT rs.id, rs.stamping_name as name, rs.disable_time from formula.rubber_stamping rs; 

drop view if exists formula.v_rubber_adhesive;
CREATE OR REPLACE VIEW formula.v_rubber_adhesive as
SELECT ra.id, ra.adhesive_name as name, ra.disable_time from formula.rubber_adhesive ra; 

drop view if exists formula.v_rubber_printing;
CREATE OR REPLACE VIEW formula.v_rubber_printing as
SELECT ra.id, ra.printing_name as name, ra.disable_time from formula.rubber_printing ra;

drop view if exists formula.v_rubber_machine;
CREATE OR REPLACE VIEW formula.v_rubber_machine as
SELECT ra.id, ra.ton as name, ra.disable_time from formula.rubber_machine ra;

-- rubber_printing_times
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('rubber_printing_times', '0', '0') on conflict do nothing;
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('rubber_printing_times', '1', '1') on conflict do nothing;
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('rubber_printing_times', '2', '2') on conflict do nothing;
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('rubber_printing_times', '3', '3') on conflict do nothing;
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('rubber_printing_times', '4', '4') on conflict do nothing;
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('rubber_printing_times', '5', '5') on conflict do nothing;
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('rubber_printing_times', '6', '6') on conflict do nothing;
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('rubber_printing_times', '7', '7') on conflict do nothing;

drop view if exists formula.v_rubber_printing_times;
CREATE OR REPLACE VIEW formula.v_rubber_printing_times as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'rubber_printing_times';

drop view if exists formula.v_turning_plating;
CREATE OR REPLACE VIEW formula.v_turning_plating as
select tp.id, tp.plating_name as name, tp.disable_time from formula.turning_plating tp;

drop view if exists formula.v_turning_screw_diameter;
CREATE OR REPLACE VIEW formula.v_turning_screw_diameter as
select tsd.id, tsd.outter_diameter as name, tsd.disable_time from formula.turning_screw_diameter tsd;

drop view if exists formula.v_turning_nylok_color;
CREATE OR REPLACE VIEW formula.v_turning_nylok_color as
select tnc.id, tnc.color_name as name, tnc.disable_time from formula.turning_nylok_color tnc;

INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('nut_type', 'Bracket NUT', '0') on conflict do nothing;
INSERT INTO formula.me_spec (spec_category, spec_name, spec_value) VALUES('nut_type', 'Insert NUT', '1') on conflict do nothing;

drop view if exists formula.v_nut_type;
CREATE OR REPLACE VIEW formula.v_nut_type as
select ms.id, ms.spec_name as name, ms.disable_time from formula.me_spec ms where ms.spec_category = 'nut_type';