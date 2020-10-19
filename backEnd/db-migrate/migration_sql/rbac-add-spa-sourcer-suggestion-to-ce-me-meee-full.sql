


INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) SELECT 'spa_sourcer_suggestion', 'me_bom_projects.spa_sourcer_suggestion' WHERE NOT EXISTS (SELECT* FROM wiprocurement.rbac_resources WHERE rs_node='spa_sourcer_suggestion' AND rs_path='me_bom_projects.spa_sourcer_suggestion');

INSERT INTO wiprocurement.rbac_policies (action, rs_id) SELECT 'EditAll', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects.spa_sourcer_suggestion')
  WHERE NOT EXISTS (SELECT * FROM wiprocurement.rbac_policies WHERE action='EditAll' AND rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects.spa_sourcer_suggestion'));

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects.spa_sourcer_suggestion'
    ) AND action='EditAll'), 'ce:me' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects.spa_sourcer_suggestion') AND action='EditAll')
                             AND role_name='ce:me');
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) SELECT
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id=(
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects.spa_sourcer_suggestion'
    ) AND action='EditAll'), 'ce:me_ee' 
    WHERE NOT EXISTS ( SELECT * FROM  wiprocurement.rbac_policy_role 
                       WHERE policy_id=(SELECT id FROM wiprocurement.rbac_policies 
                                        WHERE rs_id=(SELECT id FROM wiprocurement.rbac_resources WHERE rs_path='me_bom_projects.spa_sourcer_suggestion') AND action='EditAll')
                             AND role_name='ce:me_ee');

