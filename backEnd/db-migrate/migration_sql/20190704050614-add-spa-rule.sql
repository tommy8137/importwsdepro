--modify spa rules
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='DP';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec5,spec6,spec7,spec13,spec21,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','DP') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='HDMI';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec5,spec6,spec7,spec13,spec21,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','HDMI') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='Audio';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec5,spec9,spec26,spec30,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','Audio') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='Card reader';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec10,spec20,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','Card reader') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='Super I/O';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec4,spec6,spec10,spec17,spec22,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','Super I/O') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='EC/ECIO';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec4,spec7,spec23,spec22,spec28,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','ASIC','EC/ECIO') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='MCU';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec3,spec4,spec5,spec24,spec29,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','MCU') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='PCIE';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec3,spec4,spec5,spec9,spec17,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','PCIE') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='SATA';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec3,spec4,spec5,spec9,spec17,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','SATA') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='USB 2.0-480Mbs';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec4,spec6,spec7,spec19,spec26,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','USB 2.0-480Mbs') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='USB 3.0-5.0Gbs';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec4,spec6,spec7,spec19,spec26,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','USB 3.0-5.0Gbs') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='USB 3.1-10Gbs';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec4,spec6,spec7,spec19,spec26,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','USB 3.1-10Gbs') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='Type-C PD';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec3,spec8,spec17,spec24,spec29,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','Type-C PD') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='I2C';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec4,spec7,spec8,spec15,spec22,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','ASIC','I2C') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='CLK-PLL';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec8,spec15,spec22,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','CLK-PLL') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='Scalar';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec4,spec5,spec16,spec21,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','Scalar') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='TPM';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec4,spec5,spec12,type1,type2) VALUES ('Y','Y','Y','Y','Y','ASIC','TPM') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='Interface';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec5,spec6,spec16,spec24,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','ASIC','Interface') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='DSP';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec6,spec7,spec23,spec28,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','ASIC','DSP') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='T-con';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec4,spec5,spec9,spec14,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','T-con') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='LVDS';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec13,spec18,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','LVDS') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='MIPI';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec13,spec18,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','MIPI') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='FPGA';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec17,spec22,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','FPGA') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='CPLD';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec17,spec22,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','CPLD') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='AUDIO SRC/ARC';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec17,spec21,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','ASIC','AUDIO SRC/ARC') ;
DELETE from wiprocurement.eebom_spa_rules where type1='ASIC' AND type2='BMC';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec7,spec19,spec24,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','ASIC','BMC') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Capacitor' AND type2='E-CAP';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec8,spec10,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','Capacitor','E-CAP') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Capacitor' AND type2='Film Cap';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec8,spec10,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','Capacitor','Film Cap') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Capacitor' AND type2='OS-CON';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec8,spec10,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','Capacitor','OS-CON') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Capacitor' AND type2='Polymer';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec8,spec10,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','Capacitor','Polymer') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Capacitor' AND type2='SuperCap';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec8,spec10,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','Capacitor','SuperCap') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Capacitor' AND type2='Tan. Cap';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec8,spec10,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','Capacitor','Tan. Cap') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Discrete' AND type2='Schottky Diode';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec3,spec4,spec6,type1,type2) VALUES ('Y','Y','Y','Y','Discrete','Schottky Diode') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Discrete' AND type2='SW Diode';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec3,spec4,spec7,type1,type2) VALUES ('Y','Y','Y','Y','Discrete','SW Diode') ;
DELETE from wiprocurement.eebom_spa_rules where type1='LED' AND type2='SMD';
    INSERT INTO wiprocurement.eebom_spa_rules (spec8,spec9,spec1,spec2,spec4,spec7,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','LED','SMD') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Logic' AND type2='Bus Switch';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,type1,type2) VALUES ('Y','Y','Y','Y','Y','Logic','Bus Switch') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Logic' AND type2='Single Gate';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec6,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Logic','Single Gate') ;
DELETE from wiprocurement.eebom_spa_rules where type1='MLCC' AND type2='DIP';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec6,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','MLCC','DIP') ;
DELETE from wiprocurement.eebom_spa_rules where type1='MLCC' AND type2='SMD';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec6,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','MLCC','SMD') ;
DELETE from wiprocurement.eebom_spa_rules where type1='MOSFET' AND type2='N CHANNEL';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec3,spec4,spec5,spec10,spec11,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','MOSFET','N CHANNEL') ;
DELETE from wiprocurement.eebom_spa_rules where type1='MOSFET' AND type2='NN CHANNEL';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec3,spec4,spec5,spec10,spec11,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','MOSFET','NN CHANNEL') ;
DELETE from wiprocurement.eebom_spa_rules where type1='MOSFET' AND type2='P CHANNEL';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec3,spec4,spec5,spec10,spec11,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','MOSFET','P CHANNEL') ;
DELETE from wiprocurement.eebom_spa_rules where type1='MOSFET' AND type2='NP CHANNEL';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec3,spec4,spec5,spec10,spec11,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','MOSFET','NP CHANNEL') ;
DELETE from wiprocurement.eebom_spa_rules where type1='MOSFET' AND type2='Small Signal';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec3,spec4,spec5,spec10,spec11,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','MOSFET','Small Signal') ;
DELETE from wiprocurement.eebom_spa_rules where type1='MOSFET' AND type2='PP CHANNE';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec3,spec4,spec5,spec10,spec11,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','MOSFET','PP CHANNE') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Nand Flash' AND type2='MCP';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec1,spec5,spec3,spec4,type1,type2) VALUES ('Y','Y','Y','Y','Y','Nand Flash','MCP') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Nand Flash' AND type2='eMCP';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec1,spec6,spec3,spec4,spec5,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Nand Flash','eMCP') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Nand Flash' AND type2='Raw NAND';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec6,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Nand Flash','Raw NAND') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Nand Flash' AND type2='UFS';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec7,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Nand Flash','UFS') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Nand Flash' AND type2='eMMC';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec6,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Nand Flash','eMMC') ;
DELETE from wiprocurement.eebom_spa_rules where type1='NOR Flash' AND type2='Data Flash';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec1,spec3,spec6,spec4,spec5,spec8,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','NOR Flash','Data Flash') ;
DELETE from wiprocurement.eebom_spa_rules where type1='NOR Flash' AND type2='ISA';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec1,spec3,spec6,spec4,spec5,spec8,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','NOR Flash','ISA') ;
DELETE from wiprocurement.eebom_spa_rules where type1='NOR Flash' AND type2='SPI';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec1,spec3,spec6,spec4,spec5,spec8,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','NOR Flash','SPI') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Opto' AND type2='IR Receiver';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec6,spec7,spec8,spec9,spec10,spec11,spec12,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Opto','IR Receiver') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Opto' AND type2='IR emitter';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec6,spec7,spec8,spec9,spec10,spec11,spec12,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Opto','IR emitter') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Opto' AND type2='Photocoupler';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec6,spec7,spec8,spec9,spec10,spec11,spec12,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Opto','Photocoupler') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='Audio AMP';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec9,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Power IC','Audio AMP') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='Charger';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec10,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Power IC','Charger') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='DAC';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec6,type1,type2) VALUES ('Y','Y','Y','Y','Y','Power IC','DAC') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='DC-DC Converter';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec6,spec8,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Power IC','DC-DC Converter') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='Dr.MOS';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec7,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Power IC','Dr.MOS') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='Fan Driver';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec7,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Power IC','Fan Driver') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='Interface';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec7,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Power IC','Interface') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='LDO/Regulator';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec7,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Power IC','LDO/Regulator') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='LED Driver';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec6,spec8,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','Power IC','LED Driver') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='Mosfet Driver';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec6,type1,type2) VALUES ('Y','Y','Y','Y','Y','Power IC','Mosfet Driver') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='OP Amp';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec6,type1,type2) VALUES ('Y','Y','Y','Y','Y','Power IC','OP Amp') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='PMIC';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec11,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Power IC','PMIC') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='POE';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec6,type1,type2) VALUES ('Y','Y','Y','Y','Y','Power IC','POE') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='Power Module';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec7,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Power IC','Power Module') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='Power Switch';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec6,spec8,spec12,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','Y','Power IC','Power Switch') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='PWM Controller';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec6,spec9,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','Power IC','PWM Controller') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='Reset IC';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec7,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Power IC','Reset IC') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='V-Core';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec9,type1,type2) VALUES ('Y','Y','Y','Y','Y','Power IC','V-Core') ;
DELETE from wiprocurement.eebom_spa_rules where type1='RES' AND type2='Thermistor';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec6,spec7,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','RES','Thermistor') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='Shut';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec7,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Power IC','Shut') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Power IC' AND type2='OVP';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec6,spec7,spec9,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','Power IC','OVP') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Sensor' AND type2='Inertial Sensor';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec6,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Sensor','Inertial Sensor') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Sensor' AND type2='Magnetic Sensor';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec8,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Sensor','Magnetic Sensor') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Sensor' AND type2='Temperature Sensor';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec7,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Sensor','Temperature Sensor') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Sensor' AND type2='Light Sensor';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec9,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Sensor','Light Sensor') ;
DELETE from wiprocurement.eebom_spa_rules where type1='XTAL' AND type2='Crystal';
    INSERT INTO wiprocurement.eebom_spa_rules (spec1,spec2,spec3,spec4,spec5,spec7,spec8,type1,type2) VALUES ('Y','Y','Y','Y','Y','Y','Y','XTAL','Crystal') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Film' AND type2='Complex';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec4,spec9,type1,type2) VALUES ('Y','Y','Y','Film','Complex') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Film' AND type2='DBEF';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec4,spec9,type1,type2) VALUES ('Y','Y','Y','Film','DBEF') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Film' AND type2='Diffuser DLED';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec4,spec9,type1,type2) VALUES ('Y','Y','Y','Film','Diffuser DLED') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Film' AND type2='Diffuser ELED';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec4,spec9,type1,type2) VALUES ('Y','Y','Y','Film','Diffuser ELED') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Film' AND type2='Prism DLED';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec4,spec9,type1,type2) VALUES ('Y','Y','Y','Film','Prism DLED') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Film' AND type2='Prism ELED';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec4,spec9,type1,type2) VALUES ('Y','Y','Y','Film','Prism ELED') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Film' AND type2='Reflector DLED';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec4,spec9,type1,type2) VALUES ('Y','Y','Y','Film','Reflector DLED') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Film' AND type2='Reflector ELED';
    INSERT INTO wiprocurement.eebom_spa_rules (spec2,spec4,spec9,type1,type2) VALUES ('Y','Y','Y','Film','Reflector ELED') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Film' AND type2='Diffuser plate';
    INSERT INTO wiprocurement.eebom_spa_rules (spec5,spec9,spec4,type1,type2) VALUES ('Y','Y','Y','Film','Diffuser plate') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Film' AND type2='LGP';
    INSERT INTO wiprocurement.eebom_spa_rules (spec5,spec9,spec10,type1,type2) VALUES ('Y','Y','Y','Film','LGP') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Light Bar' AND type2='DLED';
    INSERT INTO wiprocurement.eebom_spa_rules (spec11,spec10,spec5,type1,type2) VALUES ('Y','Y','Y','Light Bar','DLED') ;
DELETE from wiprocurement.eebom_spa_rules where type1='Light Bar' AND type2='ELED';
    INSERT INTO wiprocurement.eebom_spa_rules (spec11,spec10,spec9,type1,type2) VALUES ('Y','Y','Y','Light Bar','ELED') ;

INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Electro-Mechanical','Buzzer') ;
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Electro-Mechanical','Mic') ;
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ME-Others','Standoff') ;
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Others','Spring') ;
--modify view filter
CREATE OR REPLACE VIEW wiprocurement.view_epur_spec_title
AS SELECT t1.type1name,
    t2.type2name,
    item.type1id,
    item.type2id,
    item.lvalid,
    item.spec_t1,
    item.spec_t2,
    item.spec_t3,
    item.spec_t4,
    item.spec_t5,
    item.spec_t6,
    item.spec_t7,
    item.spec_t8,
    item.spec_t9,
    item.spec_t10,
    item.spec_t11,
    item.spec_t12,
    item.spec_t13,
    item.spec_t14,
    item.spec_t15,
    item.spec_t16,
    item.spec_t17,
    item.spec_t18,
    item.spec_t19,
    item.spec_t20,
    item.spec_t21,
    item.spec_t22,
    item.spec_t23,
    item.spec_t24,
    item.spec_t25,
    item.spec_t26,
    item.spec_t27,
    item.spec_t28,
    item.spec_t29,
    item.spec_t30,
    item.act_flag,
    item.insdate
   FROM epur_spec_title item
     LEFT JOIN epur_type1 t1 ON item.type1id::text = t1.type1id::text
     LEFT JOIN epur_type2 t2 ON item.type2id::text = t2.type2id::text
   WHERE item.lvalid = '1';