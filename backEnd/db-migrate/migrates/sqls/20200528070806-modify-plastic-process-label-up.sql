UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'PAINTING(1塗)' where loss_rate_name = 'PAINTING (1C1B)';

UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'PAINTING(2塗)' where loss_rate_name = 'PAINTING (2C1B)';

UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'PAINTING(3塗)' where loss_rate_name = 'PAINTING (3C1B)';
UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'NORMAL (咬花or拋光)' where loss_rate_name = 'NORMAL (咬花)';
UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'IMR (一般or單色)' where loss_rate_name = 'IMR-Normal';
UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'IMR (局部高光)' where loss_rate_name = 'IMR-partial high gloss molded';
UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'IMR (高彩or多彩)' where loss_rate_name = 'IMR-高彩';
UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'IMR (含有VM印刷)' where loss_rate_name = 'IMR NCVM';
UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'DOUBLE_INJECTION (一般咬花)' where loss_rate_name = 'DOUBLE_INJECTION-Texture';
UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'DOUBLE_INJECTION (噴漆)' where loss_rate_name = 'DOUBLE_INJECTION-Painting';
UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'DOUBLE_INJECTION (局部高光)' where loss_rate_name = 'DOUBLE_INJECTION-Partial high gloss';
UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'RHCM_GF (玻籤料)' where loss_rate_name = 'RHCM-GFRP';
UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'RHCM_GF (玻籤及噴漆)' where loss_rate_name = 'RHCM-GFRP-Painting';
UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'HIGH_GLOSS (高光)' where loss_rate_name = 'HIGH_GLOSS';
UPDATE formula.plastic_material_loss_rate SET loss_rate_name = 'Texture (咬花及局部高光)' where loss_rate_name = 'Texture-Partial high gloss';