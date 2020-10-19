CREATE OR REPLACE VIEW formula.v_plastic_material_loss_rate
AS SELECT ptlr.id,
    ptlr.loss_rate_name AS name,
    case when ptlr.disable_time is not null
    	then ptlr.disable_time
    when ptpo.disable_time is not null
    	then ptpo.disable_time
    else
    	null 
    end as disable_time,
    pt.type_name as product_type_name
   FROM formula.plastic_material_loss_rate ptlr
   right join formula.plastic_material_loss_rate_product_type ptpo on ptpo.plastic_material_loss_rate_id = ptlr.id
   left join formula.product_type pt on pt.id = ptpo.product_type_id;
  
update formula.plastic_material_loss_rate_product_type
set disable_time = now()
where plastic_material_loss_rate_id in (select ml.id from formula.plastic_material_loss_rate ml where ml.loss_rate_name in ('IMR (含有VM印刷)', 'IMR (高彩or多彩)', 'IMR (局部高光)', 'IMR (一般or單色)'))
and product_type_id != (select id from formula.product_type where type_name = 'NB');


/*update formula.plastic_material_loss_rate_product_type
set disable_time = null
where disable_time is not null;*/

/* drop view if exists formula.v_plastic_material_loss_rate;
CREATE OR REPLACE VIEW formula.v_plastic_material_loss_rate
AS SELECT ptlr.id,
    ptlr.loss_rate_name AS name,
    ptlr.disable_time
   FROM formula.plastic_material_loss_rate ptlr;  */
