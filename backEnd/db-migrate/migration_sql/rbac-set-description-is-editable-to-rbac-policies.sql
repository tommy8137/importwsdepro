UPDATE wiprocurement.rbac_policies SET
  description='Project View', 
  is_editable=true 
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'dashboard' AND actions.action='List'
);

UPDATE wiprocurement.rbac_policies SET
  description='SPA 分析',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'xray.me' AND actions.action='View'
);

UPDATE wiprocurement.rbac_policies SET
  description='SPA 分析 Export',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'xray.me' AND actions.action='Export'
);

UPDATE wiprocurement.rbac_policies SET
  description='SPA 分析',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'xray.ee' AND actions.action='View'
);

UPDATE wiprocurement.rbac_policies SET
  description='SPA 分析 Export',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'xray.ee' AND actions.action='Export'
);


UPDATE wiprocurement.rbac_policies SET
  description='BOM List',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'me_bom_projects' AND actions.action='List'
);

UPDATE wiprocurement.rbac_policies SET
  description='Create BOM',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'me_bom_projects' AND actions.action='CreateNextStatus'
);

UPDATE wiprocurement.rbac_policies SET
  description='BOM Detail [All Tab] Edit',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'me_bom_projects' AND actions.action='EditAll'
);

UPDATE wiprocurement.rbac_policies SET
  description='BOM Detail [Self Tab] Edit',
  is_editable=false
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'me_bom_projects' AND actions.action='EditOwn'
);

UPDATE wiprocurement.rbac_policies SET
  description='Approve BOM',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'me_bom_projects' AND actions.action='Approve'
);

UPDATE wiprocurement.rbac_policies SET
  description='Complete BOM Version',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'me_bom_projects' AND actions.action='VersionComplete'
);

UPDATE wiprocurement.rbac_policies SET
  description='BOM Export',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'me_bom_projects' AND actions.action='Export'
);

UPDATE wiprocurement.rbac_policies SET
  description='BOM Detail',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'me_bom_projects' AND actions.action='View'
);

UPDATE wiprocurement.rbac_policies SET
  description='No System Cost In View',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'me_bom_projects.bom_item.system_cost' AND actions.action='View'
);

UPDATE wiprocurement.rbac_policies SET
  description='No Sourcer Cost In View',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'me_bom_projects.bom_item.source_cost' AND actions.action='View'
);

UPDATE wiprocurement.rbac_policies SET
  description='No System Cost In Export',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'me_bom_projects.bom_item.system_cost' AND actions.action='Export'
);

UPDATE wiprocurement.rbac_policies SET
  description='No Sourcer Cost In Export',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'me_bom_projects.bom_item.source_cost' AND actions.action='Export'
);

UPDATE wiprocurement.rbac_policies SET
  description='All List',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'permission.all' AND actions.action='List'
);

UPDATE wiprocurement.rbac_policies SET
  description='Contact Window List',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'permission.contact_window' AND actions.action='List'
);

UPDATE wiprocurement.rbac_policies SET
  description='All Edit',
  is_editable=false
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'permission.all' AND actions.action='Edit'
);

UPDATE wiprocurement.rbac_policies SET
  description='Contact Window Edit',
  is_editable=false
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'permission.contact_window' AND actions.action='Edit'
);

UPDATE wiprocurement.rbac_policies SET
  description='Setting List',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'setting.me' AND actions.action='List'
);

UPDATE wiprocurement.rbac_policies SET
  description='X-Ray Spec Title Edit',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'setting.me' AND actions.action='EditAll'
);

UPDATE wiprocurement.rbac_policies SET
  description='X-Ray Spec Title List',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'setting.me' AND actions.action='View'
);

UPDATE wiprocurement.rbac_policies SET
  description='Setting List',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'setting.ee' AND actions.action='List'
);

UPDATE wiprocurement.rbac_policies SET
  description='X-Ray Spec Title Edit',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'setting.ee' AND actions.action='EditAll'
);


UPDATE wiprocurement.rbac_policies SET
  description='X-Ray Spec Title List',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'setting.ee' AND actions.action='View'
);

UPDATE wiprocurement.rbac_policies SET
  description='Clean Sheet',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'cleansheet.cal.thermal-module' AND actions.action='Edit'
);

UPDATE wiprocurement.rbac_policies SET
  description='BOM List',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'ee_bom_projects' AND actions.action='List'
);

UPDATE wiprocurement.rbac_policies SET
  description='View BOM Information',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'ee_bom_projects' AND actions.action='View'
);

UPDATE wiprocurement.rbac_policies SET
  description='Edit BOM Information',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'ee_bom_projects' AND actions.action='Edit'
);

UPDATE wiprocurement.rbac_policies SET
  description='Choose eEDM Version',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'ee_bom_projects.version' AND actions.action='List'
);

UPDATE wiprocurement.rbac_policies SET
  description='BOM Detail [View All Tab]',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'ee_bom_projects.detail' AND actions.action='List'
);

UPDATE wiprocurement.rbac_policies SET
  description='Approve BOM',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'ee_bom_projects.detail' AND actions.action='Approve'
);

UPDATE wiprocurement.rbac_policies SET
  description='BOM Detail [Proxy Tab] Edit',
  is_editable=false
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'ee_bom_projects.detail' AND actions.action='Edit'
);

UPDATE wiprocurement.rbac_policies SET
  description='Leader Submit',
  is_editable=false
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'ee_bom_projects.detail' AND actions.action='LeaderSubmit'
);

UPDATE wiprocurement.rbac_policies SET
  description='BOM Detail [Self Tab] Submit',
  is_editable=false
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'ee_bom_projects.detail' AND actions.action='PersonalSubmit'
);

UPDATE wiprocurement.rbac_policies SET
  description='BOM Export',
  is_editable=true
WHERE wiprocurement.rbac_policies.id=(
    SELECT policies.id
    FROM wiprocurement.rbac_policies AS policies
    join wiprocurement.rbac_actions AS actions ON policies.action = actions.action
    join wiprocurement.rbac_resources AS resources ON resources.id = policies.rs_id
    WHERE resources.rs_path = 'ee_bom_projects.detail' AND actions.action='Export'
);
