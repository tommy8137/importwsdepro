UPDATE wiprocurement.eebom_spa_rules SET type1='Memory Card', type2='Memory Card' WHERE type1='Memeory Card' AND type2='Memeory Card';
UPDATE wiprocurement.eebom_spa_rules SET type2='Thermistor' WHERE type1='RES' AND type2='Themistor';
UPDATE wiprocurement.eebom_spa_rules SET type2='Schottky Diode' WHERE type1='Discrete' AND type2='Schotky Diode';
UPDATE wiprocurement.eebom_spa_rules SET type2='I/O STACKS' WHERE type1='Connector' AND type2='I/O SKT';
INSERT INTO wiprocurement.eebom_spa_rules (type1, type2, spec3, spec4, spec8, spec16, update_time) VALUES('Connector', 'JUMPER', 'Y', 'Y', 'Y', 'Y', now());