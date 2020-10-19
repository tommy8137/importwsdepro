
----  eebom_spa_rules
-- Table: wiprocurement.eebom_spa_rules

-- DROP TABLE wiprocurement.eebom_spa_rules;

CREATE TABLE wiprocurement.eebom_spa_rules
(
    type1 character varying COLLATE pg_catalog."default" NOT NULL,
    type2 character varying COLLATE pg_catalog."default" NOT NULL,
    spec1 character varying COLLATE pg_catalog."default",
    spec2 character varying COLLATE pg_catalog."default",
    spec3 character varying COLLATE pg_catalog."default",
    spec4 character varying COLLATE pg_catalog."default",
    spec5 character varying COLLATE pg_catalog."default",
    spec6 character varying COLLATE pg_catalog."default",
    spec7 character varying COLLATE pg_catalog."default",
    spec8 character varying COLLATE pg_catalog."default",
    spec9 character varying COLLATE pg_catalog."default",
    spec10 character varying COLLATE pg_catalog."default",
    spec11 character varying COLLATE pg_catalog."default",
    spec12 character varying COLLATE pg_catalog."default",
    spec13 character varying COLLATE pg_catalog."default",
    spec14 character varying COLLATE pg_catalog."default",
    spec15 character varying COLLATE pg_catalog."default",
    spec16 character varying COLLATE pg_catalog."default",
    spec17 character varying COLLATE pg_catalog."default",
    spec18 character varying COLLATE pg_catalog."default",
    spec19 character varying COLLATE pg_catalog."default",
    spec20 character varying COLLATE pg_catalog."default",
    spec21 character varying COLLATE pg_catalog."default",
    spec22 character varying COLLATE pg_catalog."default",
    spec23 character varying COLLATE pg_catalog."default",
    spec24 character varying COLLATE pg_catalog."default",
    spec25 character varying COLLATE pg_catalog."default",
    spec26 character varying COLLATE pg_catalog."default",
    spec27 character varying COLLATE pg_catalog."default",
    spec28 character varying COLLATE pg_catalog."default",
    spec29 character varying COLLATE pg_catalog."default",
    spec30 character varying COLLATE pg_catalog."default",
    update_time timestamp with time zone DEFAULT now(),
    CONSTRAINT eebom_spa_rules_pkey PRIMARY KEY (type1, type2)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE wiprocurement.eebom_spa_rules
    OWNER to "swpc-user";


-- INSERT DATA
-- 資料來源: https://wistron.sharepoint.com/:x:/r/teams/mrk3/Shared%20Documents/Wieprocurement/Folder_for_Ray/SPA_Grouping_and_LPP_for_BOM/e-Procurement_IT_EE_Sourcer%E8%A8%AA%E8%AB%87%E7%B4%80%E9%8C%84%20-%20SPA%20LPP%20GROUP%20_0325.xlsx?d=w27128d1efa624c5b85a4328bc9c1b8e5&csf=1&e=F9w1B0

INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Add-on Card','BT');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Add-on Card','FPCa');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Add-on Card','FPCa-CBG');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Add-on Card','LAN Card');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Add-on Card','WLAN');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Add-on Card','WWAN');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Adhesive','OCA');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Adhesive','OCR');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Antenna','Antenna');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','LAN');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','PHY');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','Ethernet Switch');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','Touch Key');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','Touch');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','Thunderbolt');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','CAN Transceiver');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','LIN Transceiver');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','LCD Driver ');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','WIFI');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','BT');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','NFC');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','DP');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','HDMI');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','Audio');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','Card reader');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','Super I/O');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','EC/ECIO');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','MCU');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','PCIE');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','SATA');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','USB 2.0');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','USB 3.0-5.0Gbs');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','USB 3.1-10Gbs');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','Type-C PD');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','I2C');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','CLK-PLL');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','Scalar');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','TPM');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','Interface');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','DSP');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','T-con');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','LVDS');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','MIPI');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','FPGA');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','Others');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','CPLD');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','AUDIO SRC/ARC');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ASIC','BMC');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('BLU','BLU');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('BTY','BTY');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('BTY_RTC','BTY_RTC');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Cable','FPC');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Camera','FHD / 2M');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Camera','HD / 1M');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Camera','SHD / 5M, 8M, 13M~');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Camera','VGA / 0.3M');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Camera','OTHERS');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Capacitor','E-CAP');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Capacitor','Film Cap');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Capacitor','OS-CON');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Capacitor','Polymer');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Capacitor','SuperCap');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Capacitor','Tan. Cap');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Capacitor','Others');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','1394');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','AC INLET');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Audio Jack');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','BACKPLANE');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Battery');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Battery Holder');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','BTB');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Busbar');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','CARD EDGE');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Card reader');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','CPU');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','DC Jack');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','DDR');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Docking');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','DONGLE');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','DP');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','D-SUB');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','DVI');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','FPC');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Gen Z');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','GUIDE MODULE');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','GUIDE PIN');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','HDMI');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','HEADER');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','HIGH SPEED I/O');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','HIGH-SPEED BTB');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','I/O SKT');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','IC SKT');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','IFP CONN');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','INTERPOSER CONN');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','LVDS');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','MEZZANINE');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Micro SIM');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Micro USB');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Mini Din');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Mini DP');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','MINI PCI');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Mini USB');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','NANO SIM');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','NGFF');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Others');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Pogo Pin');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Power + Signal');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','Power Card Edge');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','POWER CONNECTOR');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','POWER GUIDE MODULE');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','POWER GUIDE PIN');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','RCA Jack');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','REED SWITCH');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','RF');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','RJ');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','RJ+USB');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','RJ+USB+XFORM');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','RJ+XFORM');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','SAS');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','SATA GEN2');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','SATA GEN3');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','SD card');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','SIM card');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','SPDIF');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','SWITCH W/LED');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','SWITCH W/O LED');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','TERMINAL BLOCK');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','TEST/SOLDER PIN');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','TUBE SKT');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','USB 2.0 Type A');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','USB 2.0 Type B');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','USB 3.0 Type A');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','USB 3.0 Type B');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','USB 3.1 Type A');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','USB 3.1 Type C');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Connector','WTB');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('CPU','CPU');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Discrete','Bridge');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Discrete','Digital xtor');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Discrete','ESD/TVS');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Discrete','Others');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Discrete','Rectifier');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Discrete','Schotky Diode');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Discrete','Surge');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Discrete','SW Diode');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Discrete','Transistor');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Discrete','Varistor');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Discrete','Zener Diode');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EEPROM','EEPROM');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','Bead ');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','Chip Ind');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','Common Mode');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','High Frequency Ind.');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','MAGNETIC RESIN');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','Flat Pac');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','Molding');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','SR core');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','Shielded Power Choke');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','Couple Solution');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','Others');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','Bead Core');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','Choke Coil');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','line Filter');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','PFC Choke');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','Relay');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('EMI','RF Filter');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Film','Polarizer');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('FingerPrinter','FingerPrinter');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Fuse/Polyswitch','Fuse');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Fuse/Polyswitch','Polyswitch');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('HDD','HDD');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Housing','cover lens');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('KB','KB');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('LCD','LCD');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('LCD','Total Solution');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('LCD','OC');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('LED','SMD');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('LED','Module');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('LED','Array');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('LED','DIP');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('LED','Display');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Logic','Bus Switch');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Logic','Full/Dual Gate');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Logic','Single Gate');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Logic','Level shifter');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Memeory Card','Memeory Card');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Memory','Memory Module');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Memory','Memory Chip');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('MLCC','DIP');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('MLCC','SMD');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('MMB','MMB');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Modem','Modem');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('MOSFET','N CHANNEL');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('MOSFET','NN CHANNEL');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('MOSFET','P CHANNEL');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('MOSFET','NP CHANNEL');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('MOSFET','Small Signal');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('MOSFET','Others');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Nand Flash','DOM');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Nand Flash','MCP');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Nand Flash','eMCP');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Nand Flash','Raw NAND');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Nand Flash','UFS ');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Nand Flash','eMMC');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('NOR Flash','Data Flash ');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('NOR Flash','ISA ');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('NOR Flash','SPI');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('ODD','ODD');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Opto','IR Receiver');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Opto','Photocoupler');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('PCB','PTH');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('PCB','HDI');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('PCB','PCB');

INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','Audio AMP');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','Charger');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','DAC');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','DC-DC Converter');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','Dr.MOS');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','Interface');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','LDO/Regulator');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','LED Driver');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','Mosfet Driver');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','OP Amp');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','Others');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','PMIC');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','POE');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','Power Module');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','Power Switch');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','PWM Controller');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','Reset IC');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power IC','V-Core');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power Supply','ADP');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power Supply','PSU');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power Supply','Open Frame');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Power Supply','DC-DC Module');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('RES','RES-DIP');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('RES','RES-SMD');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('RES','Themistor');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('RES','VR');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Sensor','Inertial Sensor');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Sensor','Magnetic Sensor');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Sensor','Temperature Sensor');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Sensor','Light Sensor');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Sensor','Others');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('SSD','SSD');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('SSD','SSD-M');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('THERMAL PRINTER','THERMAL PRINTER');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Touch','Touch');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Touch','Sensor');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('TouchPad','TouchPad');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Tuner','Tuner');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Wireless Connectivit','RF Switch');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Wireless Connectivit','LNA');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Wireless Connectivit','PA');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Wireless Connectivit','FEM');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Xformer','Power');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('Xformer','Lan');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('XTAL','Crystal');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('XTAL','Resonator');
INSERT INTO wiprocurement.eebom_spa_rules (type1,type2) VALUES ('XTAL','Oscillator');


-- UPDATE RULES



UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec4='Y' WHERE type1='Add-on Card' AND type2='BT';

UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec6='Y',spec19='Y' WHERE type1='Add-on Card' AND type2='FPCa-CBG';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Add-on Card' AND type2='LAN Card';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec4='Y' WHERE type1='Add-on Card' AND type2='WLAN';
UPDATE wiprocurement.eebom_spa_rules SET spec7='Y',spec6='Y',spec3='Y' WHERE type1='Add-on Card' AND type2='WWAN';
UPDATE wiprocurement.eebom_spa_rules SET spec4='Y',spec3='Y',spec5='Y' WHERE type1='Adhesive' AND type2='OCA';

UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Antenna' AND type2='Antenna';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec6='Y' WHERE type1='ASIC' AND type2='LAN';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec6='Y',spec7='Y' WHERE type1='ASIC' AND type2='PHY';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec7='Y' WHERE type1='ASIC' AND type2='Ethernet Switch';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec4='Y',spec8='Y',spec9='Y' WHERE type1='ASIC' AND type2='Touch Key';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec9='Y' WHERE type1='ASIC' AND type2='Touch';

UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec9='Y',spec10='Y' WHERE type1='ASIC' AND type2='CAN Transceiver';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec5='Y',spec7='Y',spec8='Y' WHERE type1='ASIC' AND type2='LIN Transceiver';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y' WHERE type1='ASIC' AND type2='LCD Driver ';



UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec5='Y',spec6='Y',spec7='Y',spec13='Y' WHERE type1='ASIC' AND type2='DP';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec5='Y',spec6='Y',spec7='Y',spec13='Y' WHERE type1='ASIC' AND type2='HDMI';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec5='Y',spec9='Y',spec26='Y' WHERE type1='ASIC' AND type2='Audio';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec10='Y' WHERE type1='ASIC' AND type2='Card reader';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec4='Y',spec6='Y',spec10='Y',spec17='Y' WHERE type1='ASIC' AND type2='Super I/O';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec4='Y',spec7='Y',spec23='Y' WHERE type1='ASIC' AND type2='EC/ECIO';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec3='Y',spec4='Y',spec5='Y',spec24='Y' WHERE type1='ASIC' AND type2='MCU';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec3='Y',spec4='Y',spec5='Y',spec9='Y' WHERE type1='ASIC' AND type2='PCIE';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec3='Y',spec4='Y',spec5='Y',spec9='Y' WHERE type1='ASIC' AND type2='SATA';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec4='Y',spec6='Y',spec7='Y',spec19='Y' WHERE type1='ASIC' AND type2='USB 2.0';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec4='Y',spec6='Y',spec7='Y',spec19='Y' WHERE type1='ASIC' AND type2='USB 3.0-5.0Gbs';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec4='Y',spec6='Y',spec7='Y',spec19='Y' WHERE type1='ASIC' AND type2='USB 3.1-10Gbs';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec3='Y',spec8='Y',spec17='Y',spec24='Y' WHERE type1='ASIC' AND type2='Type-C PD';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec4='Y',spec7='Y',spec8='Y',spec15='Y' WHERE type1='ASIC' AND type2='I2C';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec8='Y',spec15='Y' WHERE type1='ASIC' AND type2='CLK-PLL';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec4='Y',spec5='Y',spec16='Y' WHERE type1='ASIC' AND type2='Scalar';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec4='Y',spec5='Y',spec12='Y' WHERE type1='ASIC' AND type2='TPM';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec6='Y',spec16='Y' WHERE type1='ASIC' AND type2='Interface';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec6='Y',spec7='Y',spec23='Y' WHERE type1='ASIC' AND type2='DSP';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec4='Y',spec5='Y',spec9='Y' WHERE type1='ASIC' AND type2='T-con';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec13='Y' WHERE type1='ASIC' AND type2='LVDS';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec13='Y' WHERE type1='ASIC' AND type2='MIPI';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec17='Y' WHERE type1='ASIC' AND type2='FPGA';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec17='Y' WHERE type1='ASIC' AND type2='Others';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec17='Y' WHERE type1='ASIC' AND type2='CPLD';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec17='Y' WHERE type1='ASIC' AND type2='AUDIO SRC/ARC';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec7='Y',spec19='Y' WHERE type1='ASIC' AND type2='BMC';
UPDATE wiprocurement.eebom_spa_rules SET spec6='Y',spec13='Y',spec11='Y' WHERE type1='BLU' AND type2='BLU';

UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec3='Y',spec7='Y',spec8='Y',spec9='Y' WHERE type1='BTY_RTC' AND type2='BTY_RTC';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec6='Y' WHERE type1='Cable' AND type2='FPC';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Camera' AND type2='FHD / 2M';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Camera' AND type2='HD / 1M';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Camera' AND type2='SHD / 5M, 8M, 13M~';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Camera' AND type2='VGA / 0.3M';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Camera' AND type2='OTHERS';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Capacitor' AND type2='E-CAP';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Capacitor' AND type2='Film Cap';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Capacitor' AND type2='OS-CON';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Capacitor' AND type2='Polymer';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Capacitor' AND type2='SuperCap';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Capacitor' AND type2='Tan. Cap';

UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='1394';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec8='Y',spec19='Y' WHERE type1='Connector' AND type2='AC INLET';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec10='Y' WHERE type1='Connector' AND type2='Audio Jack';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='BACKPLANE';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='Battery';
UPDATE wiprocurement.eebom_spa_rules SET spec3='Y',spec5='Y',spec8='Y',spec11='Y' WHERE type1='Connector' AND type2='Battery Holder';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec16='Y' WHERE type1='Connector' AND type2='BTB';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec5='Y' WHERE type1='Connector' AND type2='Busbar';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec8='Y',spec11='Y',spec16='Y' WHERE type1='Connector' AND type2='CARD EDGE';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y' WHERE type1='Connector' AND type2='Card reader';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y' WHERE type1='Connector' AND type2='CPU';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='DC Jack';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec16='Y' WHERE type1='Connector' AND type2='DDR';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec16='Y' WHERE type1='Connector' AND type2='Docking';

UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='DP';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='D-SUB';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec10='Y' WHERE type1='Connector' AND type2='DVI';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec11='Y',spec13='Y' WHERE type1='Connector' AND type2='FPC';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec11='Y' WHERE type1='Connector' AND type2='Gen Z';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='GUIDE MODULE';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='GUIDE PIN';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='HDMI';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec11='Y',spec21='Y' WHERE type1='Connector' AND type2='HEADER';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='HIGH SPEED I/O';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec16='Y' WHERE type1='Connector' AND type2='HIGH-SPEED BTB';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='I/O SKT';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec5='Y' WHERE type1='Connector' AND type2='IC SKT';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='IFP CONN';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='INTERPOSER CONN';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec11='Y' WHERE type1='Connector' AND type2='LVDS';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec11='Y',spec16='Y' WHERE type1='Connector' AND type2='MEZZANINE';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec3='Y',spec16='Y' WHERE type1='Connector' AND type2='Micro SIM';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='Micro USB';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec10='Y',spec11='Y' WHERE type1='Connector' AND type2='Mini Din';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='Mini DP';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec16='Y' WHERE type1='Connector' AND type2='MINI PCI';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='Mini USB';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec3='Y',spec16='Y' WHERE type1='Connector' AND type2='NANO SIM';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec16='Y' WHERE type1='Connector' AND type2='NGFF';

UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Connector' AND type2='Pogo Pin';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec11='Y',spec16='Y' WHERE type1='Connector' AND type2='Power + Signal';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec11='Y',spec16='Y' WHERE type1='Connector' AND type2='Power Card Edge';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec11='Y',spec16='Y' WHERE type1='Connector' AND type2='POWER CONNECTOR';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='POWER GUIDE MODULE';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='POWER GUIDE PIN';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec10='Y' WHERE type1='Connector' AND type2='RCA Jack';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec10='Y',spec11='Y',spec16='Y' WHERE type1='Connector' AND type2='REED SWITCH';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='RF';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='RJ';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='RJ+USB';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='RJ+USB+XFORM';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='RJ+XFORM';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y' WHERE type1='Connector' AND type2='SAS';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec11='Y',spec16='Y' WHERE type1='Connector' AND type2='SATA GEN2';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec11='Y',spec16='Y' WHERE type1='Connector' AND type2='SATA GEN3';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec3='Y',spec12='Y',spec16='Y' WHERE type1='Connector' AND type2='SD card';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec3='Y',spec16='Y' WHERE type1='Connector' AND type2='SIM card';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='SPDIF';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec10='Y',spec11='Y',spec16='Y' WHERE type1='Connector' AND type2='SWITCH W/LED';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec10='Y',spec11='Y',spec16='Y' WHERE type1='Connector' AND type2='SWITCH W/O LED';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='TERMINAL BLOCK';


UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='USB 2.0 Type A';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='USB 2.0 Type B';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='USB 3.0 Type A';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='USB 3.0 Type B';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='USB 3.1 Type A';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec10='Y',spec11='Y',spec12='Y' WHERE type1='Connector' AND type2='USB 3.1 Type C';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec11='Y' WHERE type1='Connector' AND type2='WTB';

UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y' WHERE type1='Discrete' AND type2='Bridge';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y' WHERE type1='Discrete' AND type2='Digital xtor';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec4='Y' WHERE type1='Discrete' AND type2='ESD/TVS';

UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec3='Y',spec4='Y' WHERE type1='Discrete' AND type2='Rectifier';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec3='Y',spec4='Y' WHERE type1='Discrete' AND type2='Schotky Diode';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec6='Y' WHERE type1='Discrete' AND type2='Surge';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec3='Y',spec4='Y' WHERE type1='Discrete' AND type2='SW Diode';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec6='Y',spec8='Y',spec9='Y' WHERE type1='Discrete' AND type2='Transistor';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec5='Y',spec8='Y' WHERE type1='Discrete' AND type2='Varistor';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y' WHERE type1='Discrete' AND type2='Zener Diode';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec1='Y',spec3='Y',spec6='Y' WHERE type1='EEPROM' AND type2='EEPROM';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec7='Y' WHERE type1='EMI' AND type2='Bead ';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec7='Y' WHERE type1='EMI' AND type2='Chip Ind';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec7='Y' WHERE type1='EMI' AND type2='Common Mode';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec7='Y' WHERE type1='EMI' AND type2='High Frequency Ind.';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec7='Y' WHERE type1='EMI' AND type2='MAGNETIC RESIN';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec4='Y',spec5='Y' WHERE type1='EMI' AND type2='Flat Pac';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec7='Y' WHERE type1='EMI' AND type2='Molding';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y',spec6='Y' WHERE type1='EMI' AND type2='SR core';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec5='Y',spec6='Y' WHERE type1='EMI' AND type2='Shielded Power Choke';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='EMI' AND type2='Couple Solution';

UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y' WHERE type1='EMI' AND type2='Bead Core';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='EMI' AND type2='Choke Coil';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='EMI' AND type2='line Filter';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='EMI' AND type2='PFC Choke';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='EMI' AND type2='Relay';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='EMI' AND type2='RF Filter';
UPDATE wiprocurement.eebom_spa_rules SET spec3='Y',spec4='Y',spec6='Y' WHERE type1='Film' AND type2='Polarizer';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec4='Y' WHERE type1='FingerPrinter' AND type2='FingerPrinter';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Fuse/Polyswitch' AND type2='Fuse';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Fuse/Polyswitch' AND type2='Polyswitch';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec4='Y' WHERE type1='HDD' AND type2='HDD';

UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='KB' AND type2='KB';
UPDATE wiprocurement.eebom_spa_rules SET spec3='Y',spec4='Y',spec6='Y' WHERE type1='LCD' AND type2='LCD';
UPDATE wiprocurement.eebom_spa_rules SET spec3='Y',spec4='Y',spec6='Y' WHERE type1='LCD' AND type2='Total Solution';
UPDATE wiprocurement.eebom_spa_rules SET spec3='Y',spec4='Y',spec9='Y' WHERE type1='LCD' AND type2='OC';
UPDATE wiprocurement.eebom_spa_rules SET spec8='Y',spec9='Y',spec1='Y',spec2='Y',spec4='Y' WHERE type1='LED' AND type2='SMD';

UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec6='Y',spec8='Y',spec9='Y' WHERE type1='LED' AND type2='Array';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec6='Y',spec8='Y',spec9='Y' WHERE type1='LED' AND type2='DIP';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec6='Y',spec8='Y',spec9='Y' WHERE type1='LED' AND type2='Display';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Logic' AND type2='Bus Switch';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Logic' AND type2='Full/Dual Gate';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec6='Y' WHERE type1='Logic' AND type2='Single Gate';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Logic' AND type2='Level shifter';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y' WHERE type1='Memeory Card' AND type2='Memeory Card';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec4='Y' WHERE type1='Memory' AND type2='Memory Module';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec4='Y' WHERE type1='Memory' AND type2='Memory Chip';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec5='Y' WHERE type1='MLCC' AND type2='DIP';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='MLCC' AND type2='SMD';


UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec11='Y' WHERE type1='MOSFET' AND type2='N CHANNEL';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec11='Y' WHERE type1='MOSFET' AND type2='NN CHANNEL';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec11='Y' WHERE type1='MOSFET' AND type2='P CHANNEL';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec11='Y' WHERE type1='MOSFET' AND type2='NP CHANNEL';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec11='Y' WHERE type1='MOSFET' AND type2='Small Signal';


UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec1='Y',spec5='Y',spec3='Y' WHERE type1='Nand Flash' AND type2='MCP';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec1='Y',spec6='Y',spec3='Y',spec4='Y' WHERE type1='Nand Flash' AND type2='eMCP';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec1='Y',spec6='Y',spec4='Y' WHERE type1='Nand Flash' AND type2='Raw NAND';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec1='Y',spec5='Y',spec3='Y' WHERE type1='Nand Flash' AND type2='UFS ';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec1='Y',spec5='Y',spec3='Y' WHERE type1='Nand Flash' AND type2='eMMC';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec5='Y',spec3='Y',spec4='Y' WHERE type1='NOR Flash' AND type2='Data Flash ';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec5='Y',spec3='Y',spec4='Y' WHERE type1='NOR Flash' AND type2='ISA ';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec5='Y',spec3='Y',spec4='Y' WHERE type1='NOR Flash' AND type2='SPI';
UPDATE wiprocurement.eebom_spa_rules SET spec8='Y' WHERE type1='ODD' AND type2='ODD';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec6='Y' WHERE type1='Opto' AND type2='IR Receiver';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y' WHERE type1='Opto' AND type2='Photocoupler';




UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Power IC' AND type2='Audio AMP';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Power IC' AND type2='Charger';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Power IC' AND type2='DAC';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Power IC' AND type2='DC-DC Converter';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Power IC' AND type2='Dr.MOS';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Power IC' AND type2='Interface';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Power IC' AND type2='LDO/Regulator';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Power IC' AND type2='LED Driver';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Power IC' AND type2='Mosfet Driver';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Power IC' AND type2='OP Amp';

UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Power IC' AND type2='PMIC';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Power IC' AND type2='POE';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Power IC' AND type2='Power Module';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Power IC' AND type2='Power Switch';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Power IC' AND type2='PWM Controller';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Power IC' AND type2='Reset IC';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Power IC' AND type2='V-Core';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec4='Y',spec5='Y' WHERE type1='Power Supply' AND type2='ADP';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec4='Y',spec5='Y',spec7='Y' WHERE type1='Power Supply' AND type2='PSU';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec4='Y',spec5='Y' WHERE type1='Power Supply' AND type2='Open Frame';
UPDATE wiprocurement.eebom_spa_rules SET spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Power Supply' AND type2='DC-DC Module';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='RES' AND type2='RES-DIP';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='RES' AND type2='RES-SMD';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y',spec6='Y' WHERE type1='RES' AND type2='Themistor';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y' WHERE type1='RES' AND type2='VR';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Sensor' AND type2='Inertial Sensor';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Sensor' AND type2='Magnetic Sensor';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Sensor' AND type2='Temperature Sensor';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Sensor' AND type2='Light Sensor';

UPDATE wiprocurement.eebom_spa_rules SET spec3='Y',spec4='Y',spec5='Y' WHERE type1='SSD' AND type2='SSD';
UPDATE wiprocurement.eebom_spa_rules SET spec3='Y',spec4='Y',spec5='Y' WHERE type1='SSD' AND type2='SSD-M';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y' WHERE type1='THERMAL PRINTER' AND type2='THERMAL PRINTER';


UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y' WHERE type1='TouchPad' AND type2='TouchPad';

UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec5='Y' WHERE type1='Wireless Connectivit' AND type2='RF Switch';



UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Xformer' AND type2='Power';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y' WHERE type1='Xformer' AND type2='Lan';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec7='Y' WHERE type1='XTAL' AND type2='Crystal';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec7='Y' WHERE type1='XTAL' AND type2='Resonator';
UPDATE wiprocurement.eebom_spa_rules SET spec1='Y',spec2='Y',spec3='Y',spec4='Y',spec7='Y' WHERE type1='XTAL' AND type2='Oscillator';
