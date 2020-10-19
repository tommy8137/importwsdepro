/* Replace with your SQL commands */

delete from wiprocurement.eebom_spa_rules esr where esr.type1 = 'Fuse/Polyswitch' and esr.type2 = 'Fuse';
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Fuse/Polyswitch','Fuse');
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Fuse/Polyswitch' AND type2='Fuse';

delete from wiprocurement.eebom_spa_rules esr where esr.type1 = 'Fuse/Polyswitch' and esr.type2 = 'Polyswitch';
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Fuse/Polyswitch','Polyswitch');
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Fuse/Polyswitch' AND type2='Polyswitch';

delete from wiprocurement.eebom_spa_rules esr where esr.type1 = 'Power IC' and esr.type2 = 'Dr.MOS';
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','Dr.MOS');
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec9='Y' WHERE type1='Power IC' AND type2='Dr.MOS';

delete from wiprocurement.eebom_spa_rules esr where esr.type1 = 'Power IC' and esr.type2 = 'Power Switch';
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','Power Switch');
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec6='Y',spec8='Y',spec11='Y' WHERE type1='Power IC' AND type2='Power Switch';

delete from wiprocurement.eebom_spa_rules esr where esr.type1 = 'Power IC' and esr.type2 = 'Shut';
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','Shut');
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec7='Y' WHERE type1='Power IC' AND type2='Shut';

delete from wiprocurement.eebom_spa_rules esr where esr.type1 = 'Power IC' and esr.type2 = 'OVP';
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','OVP');
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec9='Y' WHERE type1='Power IC' AND type2='OVP';

delete from wiprocurement.eebom_spa_rules esr where esr.type1 = 'Sensor' and esr.type2 = 'Inertial Sensor';
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Sensor','Inertial Sensor');
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec6='Y',spec9='Y' WHERE type1='Sensor' AND type2='Inertial Sensor';

INSERT INTO wiprocurement.plant_list (plant,plant_desc,purchase_org) values ('F237','WKB','PWKB') on conflict (plant) DO UPDATE SET plant_desc='WKB', purchase_org='PWKB';
