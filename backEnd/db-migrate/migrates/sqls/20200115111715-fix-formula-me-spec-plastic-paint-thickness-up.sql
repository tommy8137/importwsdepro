UPDATE formula.me_spec
SET disable_time = now()
WHERE spec_category = 'plastic_paint_thickness' and spec_name <> '0';

INSERT INTO formula.me_spec (spec_category, spec_name, spec_value)
  VALUES('plastic_paint_thickness', '10', '10'),
  ('plastic_paint_thickness', '11', '11'),
  ('plastic_paint_thickness', '12', '12'),
  ('plastic_paint_thickness', '13', '13'),
  ('plastic_paint_thickness', '14', '14'),
  ('plastic_paint_thickness', '15', '15'),
  ('plastic_paint_thickness', '16', '16'),
  ('plastic_paint_thickness', '17', '17'),
  ('plastic_paint_thickness', '18', '18'),
  ('plastic_paint_thickness', '19', '19'),
  ('plastic_paint_thickness', '20', '20'),
  ('plastic_paint_thickness', '21', '21'),
  ('plastic_paint_thickness', '22', '22'),
  ('plastic_paint_thickness', '23', '23'),
  ('plastic_paint_thickness', '24', '24'),
  ('plastic_paint_thickness', '25', '25');
