--modify spa rules
DELETE from wiprocurement.eebom_spa_rules where type1='Discrete' AND type2='Schottky Diode';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec3,spec4,spec6,spec7,type1,type2) VALUES ('Y','Y','Y','Y','Y','Discrete','Schottky Diode') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Discrete' AND type2='SW Diode';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec3,spec4,spec7,spec8,type1,type2) VALUES ('Y','Y','Y','Y','Y','Discrete','SW Diode') ;