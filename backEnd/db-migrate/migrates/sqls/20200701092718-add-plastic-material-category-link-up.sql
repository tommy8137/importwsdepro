ALTER TABLE formula.plastic_material_loss_rate ADD column if not exists category_2_id uuid;

drop table if exists formula.tmp_plastic_material_loss_rate;
CREATE TABLE if not exists formula.tmp_plastic_material_loss_rate (
	loss_rate_name varchar(200),
	category_name varchar(200)
);
insert into formula.tmp_plastic_material_loss_rate(loss_rate_name, category_name) values
('NORMAL (咬花)_高礦粉','Plastic'),
('NORMAL (咬花)_局部高光','Plastic'),
('NORMAL (咬花)_模內埋釘','Plastic'),
('NORMAL (咬花or拋光)','Plastic'),
('SPECIAL-TEXTURE (特殊咬花)','Plastic'),
('NCVM','Plastic'),
('PAINTING(2塗)','Plastic'),
('PAINTING(1塗)','Plastic'),
('PAINTING(3塗)','Plastic'),
('IMR (一般or單色)','IMR'),
('IMR (局部高光)','IMR'),
('IMR (高彩or多彩)','IMR'),
('IMR (含有VM印刷)','IMR'),
('DOUBLE_INJECTION (一般咬花)','Double_Injection'),
('DOUBLE_INJECTION (噴漆)','Double_Injection'),
('DOUBLE_INJECTION (局部高光)','Double_Injection'),
('RHCM_GF (玻籤料)','RHCM_Process'),
('RHCM_GF (玻籤及噴漆)','RHCM_Process'),
('RHCM-模內埋釘','RHCM_Process'),
('RHCM (一般塑料)','RHCM_Process'),
('HIGH_GLOSS (高光)','Plastic'),
('Texture (咬花及局部高光)','Plastic')
on conflict do nothing ;

update formula.plastic_material_loss_rate pl
set category_2_id = tmp.ctgy_id
from (
	select pl.id, tp.*, p2.id as ctgy_id
	from formula.tmp_plastic_material_loss_rate tp
	left join formula.plastic_material_loss_rate pl on tp.loss_rate_name = pl.loss_rate_name
	left join formula.part_category_2 p2 on p2.category_name = tp.category_name
) tmp
where pl.id = tmp.id;


ALTER TABLE formula.plastic_material_loss_rate alter column category_2_id set not null;

ALTER TABLE formula.plastic_material_loss_rate ADD CONSTRAINT fk_plastic_material_loss_rate_category_2_id FOREIGN KEY (category_2_id) REFERENCES formula.part_category_2 (id);

drop table if exists formula.tmp_plastic_material_loss_rate;