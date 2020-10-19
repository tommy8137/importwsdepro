INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES (trim('Connector'),trim('SATA'));
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES (trim('Connector'),trim('SWITCH'));
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES (trim('Connector'),trim('USB 2.0'));
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES (trim('Connector'),trim('USB 3.0'));
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES (trim('Connector'),trim('USB 3.1'));

UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec11='Y',spec16='Y' WHERE type1=trim('Connector') AND type2=trim('SATA');
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec10='Y',spec11='Y',spec16='Y' WHERE type1=trim('Connector') AND type2=trim('SWITCH');
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1=trim('Connector') AND type2=trim('USB 2.0');
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1=trim('Connector') AND type2=trim('USB 3.0');
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1=trim('Connector') AND type2=trim('USB 3.1');
