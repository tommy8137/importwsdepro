-- 20200224 與 條件 >=8 衝突 客戶希望移除此規則
delete from wiprocurement.pcb_formula_adder_rules
where reference='Array' and spec='Spec06' and reference_value='8~19';