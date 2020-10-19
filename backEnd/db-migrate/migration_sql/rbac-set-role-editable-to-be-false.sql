UPDATE wiprocurement.rbac_roles SET
  is_editable=false
WHERE wiprocurement.rbac_roles.role_name in ('ce:me','rd:me','rd:me_tm_fm','sourcer:me','pm:account','sourcer:ee','rd:ee','ce:me_ee','sourcer:me_ee','ce:ee',':contactwindow');

