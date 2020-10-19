delete from wiprocurement.rbac_user_role where emplid ='10700001' and role_id !=( select id from wiprocurement.rbac_roles where role_name='ce:me_ee')
