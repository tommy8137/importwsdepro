ALTER TABLE formula.turning_screw_diameter ADD column if not exists min_toolth_diameter varchar(50);
ALTER TABLE formula.turning_screw_diameter ADD column if not exists max_toolth_diameter varchar(50);

drop table if exists formula.tmp_turning_screw_diameter_tooth_range;
CREATE TABLE formula.tmp_turning_screw_diameter_tooth_range (
   dia numeric,
   min_dia varchar(50),
   max_dia varchar(50)
);
insert into formula.tmp_turning_screw_diameter_tooth_range (dia, min_dia, max_dia) values 
(1.6, '0', '2'),
(2.0, '2', '3'),
(2.5, '2', '3'),
(3.0, '3', '-1');

update formula.turning_screw_diameter
set min_toolth_diameter=tmp.min_dia,
max_toolth_diameter=tmp.max_dia
from formula.tmp_turning_screw_diameter_tooth_range tmp
where tmp.dia = outter_diameter;

drop table if exists formula.tmp_turning_screw_diameter_tooth_range;
