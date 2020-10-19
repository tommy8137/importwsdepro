CREATE TABLE wiprocurement.rbac_resources(
    id serial primary key,
    rs_node character varying(32),
    rs_path character varying(256) UNIQUE
);
CREATE TABLE wiprocurement.rbac_actions(
    action character varying(32) primary key,
    rs character varying(32) DEFAULT NULL,
    UNIQUE(action, rs)
);
CREATE TABLE wiprocurement.rbac_roles(
    role_name character varying(32) primary key
);
CREATE TABLE wiprocurement.rbac_policies(
    id serial primary key,
    action character varying(32) references wiprocurement.rbac_actions(action) ON DELETE CASCADE,
    rs_id integer references wiprocurement.rbac_resources(id)  ON DELETE CASCADE,
    effect boolean  not null default true,
    UNIQUE(action, rs_id, effect)
);
CREATE TABLE wiprocurement.rbac_policy_role(
    id serial primary key,
    policy_id integer references wiprocurement.rbac_policies(id) ON DELETE CASCADE,
    role_name character varying(32) references wiprocurement.rbac_roles(role_name) ON DELETE CASCADE,
    UNIQUE(policy_id, role_name)
);
CREATE TABLE wiprocurement.rbac_user_role(
    id serial primary key,
    emplid character varying(22) references wiprocurement.user(emplid)  ON DELETE CASCADE,
    role_name character varying(32) references wiprocurement.rbac_roles(role_name) ON DELETE CASCADE,
    UNIQUE(emplid, role_name)
);

INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) values ('ee_bom_projects', 'ee_bom_projects');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) values ('me_bom_projects', 'me_bom_projects');
INSERT INTO wiprocurement.rbac_resources (rs_node, rs_path) values ('system_cost', 'me_bom_projects.bom_item.system_cost');
INSERT INTO  wiprocurement.rbac_resources (rs_node, rs_path) values ('source_cost', 'me_bom_projects.bom_item.source_cost');

INSERT INTO wiprocurement.rbac_actions (action, rs) VALUES ('List','common');
INSERT INTO wiprocurement.rbac_actions (action, rs) VALUES ('CreateNextStatus','me_bom_projects');
INSERT INTO wiprocurement.rbac_actions (action, rs) VALUES ('Edit','me_bom_projects');
INSERT INTO wiprocurement.rbac_actions (action, rs) VALUES ('Approve','me_bom_projects');
INSERT INTO wiprocurement.rbac_actions (action, rs) VALUES ('VersionComplete','me_bom_projects');
INSERT INTO wiprocurement.rbac_actions (action, rs) VALUES ('Export','me_bom_projects');
INSERT INTO wiprocurement.rbac_actions (action, rs) VALUES ('View','me_bom_projects');

INSERT INTO wiprocurement.rbac_roles (role_name) VALUES ('ce:me');
INSERT INTO wiprocurement.rbac_roles (role_name) VALUES ('ce:ee');
INSERT INTO wiprocurement.rbac_roles (role_name) VALUES ('ce:me_ee');
INSERT INTO wiprocurement.rbac_roles (role_name) VALUES ('rd:me');
INSERT INTO wiprocurement.rbac_roles (role_name) VALUES ('rd:me_tm_fm');
INSERT INTO wiprocurement.rbac_roles (role_name) VALUES ('sourcer:me');
INSERT INTO wiprocurement.rbac_roles (role_name) VALUES ('pm:account');

INSERT INTO wiprocurement.rbac_policies (action, rs_id) VALUES ('List', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'ee_bom_projects'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) VALUES ('List', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) VALUES ('CreateNextStatus', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) VALUES ('Edit', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) VALUES ('Approve', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) VALUES ('View', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) VALUES ('VersionComplete', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id) VALUES ('Export', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'));
INSERT INTO wiprocurement.rbac_policies (action, rs_id, effect) VALUES ('View', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects.bom_item.system_cost'),false);
INSERT INTO wiprocurement.rbac_policies (action, rs_id, effect) VALUES ('Export', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects.bom_item.system_cost'),false);
INSERT INTO wiprocurement.rbac_policies (action, rs_id, effect) VALUES ('View', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects.bom_item.source_cost'),false);
INSERT INTO wiprocurement.rbac_policies (action, rs_id, effect) VALUES ('Export', (SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects.bom_item.source_cost'),false);

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
         SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'ee_bom_projects'
    ) AND ACTION = 'List'),
    'ce:ee'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'ee_bom_projects'
    ) AND ACTION = 'List'),
    'ce:me_ee'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'List'),
    'ce:me'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'List'),
    'ce:me_ee'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'List'),
    'rd:me'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'List'),
    'rd:me_tm_fm'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'List'),
    'sourcer:me'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'List'),
    'pm:account'
);

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'CreateNextStatus'),
    'rd:me'
);

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'CreateNextStatus'),
    'rd:me_tm_fm'
);

INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'Edit'),
    'ce:me'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'Edit'),
    'ce:me_ee'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'Edit'),
    'rd:me'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'Edit'),
    'rd:me_tm_fm'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'Approve'),
    'rd:me_tm_fm'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'VersionComplete'),
    'ce:me'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'VersionComplete'),
    'ce:me_ee'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'Export'),
    'ce:me'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'Export'),
    'ce:me_ee'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'Export'),
    'rd:me'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'Export'),
    'rd:me_tm_fm'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'View'),
    'ce:me'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'View'),
    'ce:me_ee'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'View'),
    'rd:me'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'View'),
    'rd:me_tm_fm'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'View'),
    'sourcer:me'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects'
    ) AND ACTION = 'View'),
    'pm:account'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects.bom_item.system_cost'
    ) AND ACTION = 'Export'),
    'rd:me'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects.bom_item.source_cost'
    ) AND ACTION = 'Export'),
    'rd:me'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects.bom_item.system_cost'
    ) AND ACTION = 'View'),
    'rd:me'
);
INSERT INTO wiprocurement.rbac_policy_role (policy_id, role_name) VALUES (
    (SELECT id FROM wiprocurement.rbac_policies WHERE rs_id = ( 
     SELECT id FROM wiprocurement.rbac_resources WHERE rs_path = 'me_bom_projects.bom_item.source_cost'
    ) AND ACTION = 'View'),
    'rd:me'
);
