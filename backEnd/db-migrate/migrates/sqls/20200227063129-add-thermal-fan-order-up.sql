-- sort_order
ALTER TABLE formula.thermal_fan ADD column if not exists sort_order int default 0;

CREATE TABLE formula.tmp_thermal_fan (
   fan_size VARCHAR (200),
   sort_order int
);

insert into formula.tmp_thermal_fan (fan_size, sort_order) values
('60x60x3.0', 1),
('60x60x3.5', 2),
('60x60x4.0', 3),
('60x60x4.5', 4),
('60x60x5.0', 5),
('60x60x5.5', 6),
('60x60x6.0', 7),
('60x60x6.5', 8),
('60x60x7.0', 9),
('60x60x7.5', 10),
('80x80x8.0', 11),
('80x80x8.5', 12),
('80x80x9.0', 13),
('80x80x9.5', 14),
('80x80x10',  15),
('80x80x10.5',16),
('80x80x11',  17),
('80x80x11.5',18),
('80x80x12',  19);

update formula.thermal_fan
set sort_order = tmp.sort_order
from formula.tmp_thermal_fan tmp
where tmp.fan_size = formula.thermal_fan.fan_size;

DROP TABLE IF EXISTS formula.tmp_thermal_fan;