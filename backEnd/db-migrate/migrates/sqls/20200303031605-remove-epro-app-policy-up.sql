delete from wiprocurement.rbac_policy_role where policy_id in (select id from wiprocurement.rbac_policies where rs_id in (select id from wiprocurement.rbac_resources where rs_path in ('rfq', 'rfq.form', 'rfq.request')));

delete from wiprocurement.rbac_policies where rs_id in (select id from wiprocurement.rbac_resources where rs_path in ('rfq', 'rfq.form', 'rfq.request'));

delete from wiprocurement.rbac_actions where "action" = 'Feedback' and rs = 'rfq';
delete from wiprocurement.rbac_actions where "action" = 'Create' and rs = 'rfq';
delete from wiprocurement.rbac_actions where "action" = 'ListOwn' and rs = 'rfq';
delete from wiprocurement.rbac_actions where "action" = 'Copy' and rs = 'rfq';
delete from wiprocurement.rbac_actions where "action" = 'Cancel' and rs = 'rfq';
delete from wiprocurement.rbac_actions where "action" = 'MarkDone' and rs = 'rfq';

delete from wiprocurement.rbac_resources where rs_node = 'request' and rs_path ='rfq.request' and is_root = false;
delete from wiprocurement.rbac_resources where rs_node = 'from' and rs_path ='rfq.form' and is_root = false;
delete from wiprocurement.rbac_resources where rs_node = 'rfq' and rs_path ='rfq' and description = 'ePro Application' and is_root = true;