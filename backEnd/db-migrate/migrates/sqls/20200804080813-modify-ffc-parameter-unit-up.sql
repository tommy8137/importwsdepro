/* Replace with your SQL commands */

UPDATE formula.common_parameter
SET unit='USD/M²'
WHERE part_type='cable_ffc_components' and product_type_id = '1'
and (
  label_name='Al foil 單價' or
  label_name='Mylar(CY28_PET) T=0.05 單價' or
  label_name='Mylar(PET_6027D) T=0.1 單價' or
  label_name='kapton單價' or
  label_name='導電布單價' or
  label_name='導電雙面膠單價' or
  label_name='補強板單價' or
  label_name='雙面膠單價');
