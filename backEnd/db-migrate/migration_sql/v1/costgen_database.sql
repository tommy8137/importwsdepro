-- Table: wiprocurement.costgen_database_table

-- DROP TABLE wiprocurement.costgen_database_table;

CREATE TABLE wiprocurement.costgen_database_table
(
    tabletype character varying COLLATE pg_catalog."default" NOT NULL,
    tablename character varying COLLATE pg_catalog."default" NOT NULL,
    versionnumber integer NOT NULL,
    updateby character varying COLLATE pg_catalog."default",
    updatetime timestamp with time zone,
    CONSTRAINT costgen_database_table_pkey PRIMARY KEY (tabletype, tablename, versionnumber)
);

-- Table: wiprocurement.costgen_database_header

-- DROP TABLE wiprocurement.costgen_database_header;

CREATE TABLE wiprocurement.costgen_database_header
(
    tabletype character varying COLLATE pg_catalog."default" NOT NULL,
    tablename character varying COLLATE pg_catalog."default" NOT NULL,
    headerkey character varying COLLATE pg_catalog."default" NOT NULL,
    headername character varying COLLATE pg_catalog."default",
    headertypeof character varying COLLATE pg_catalog."default",
    CONSTRAINT costgen_database_header_pkey PRIMARY KEY (tabletype, tablename, headerkey)
);

-- Table: wiprocurement.costgen_database_data

-- DROP TABLE wiprocurement.costgen_database_data;

CREATE TABLE wiprocurement.costgen_database_data
(
    tabletype character varying COLLATE pg_catalog."default" NOT NULL,
    tablename character varying COLLATE pg_catalog."default" NOT NULL,
    data character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT costgen_database_data_pkey PRIMARY KEY (tabletype, tablename, data)
);

-- Data Insert
--costgen_database_data
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanTypeTable', '{"fanType":"Axial(軸流扇)"}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanTypeTable', '{"fanType":"Cross Flow Fan(橫流扇)"}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanTypeTable', '{"fanType":"Blower(離心扇)"}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'materialTable', '{"type":"有鹵"}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'bearingAndSleeveTable', '{"type":"Sleeve+塑膠_H<=7.5","price":0}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'magnetMaterialAndSizeTable', '{"type":"橡膠_H<=7.5","price":0}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'materialTable', '{"type":"無鹵"}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'bearingAndSleeveTable', '{"type":"Sleeve+金屬_H<=7.5","price":0}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'magnetMaterialAndSizeTable', '{"type":"MQ_H<= 5.5","price":0.1}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'motorArchitectureTable', '{"type":"1_phase_H<=7.5","price":0}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanSizeTable', '{"fanSize":"60*60*3.5","price":5.5}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'bearingAndSleeveTable', '{"type":"FDB+金屬_H<=4.5","price":0}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'magnetMaterialAndSizeTable', '{"type":"MQ_H>=6","price":0.15}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D4_","flatteningThickness":">=2.0mm","math":2,"cost":0}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'motorArchitectureTable', '{"type":"3_phase_H<=4.5","price":0}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanSizeTable', '{"fanSize":"60*60*4","price":3.7}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterLengthTable', '{"outerDiameter":"D4_","lengthRange":">=250","math":250,"cost":0.75}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'bearingAndSleeveTable', '{"type":"FDB+金屬_H>=5.0","price":0.35}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D4_","flatteningThickness":">=1.8mm","math":1.8,"cost":0.15}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'motorArchitectureTable', '{"type":"3_phase_H>=5.0","price":0.25}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanSizeTable', '{"fanSize":"60*60*4.5","price":3.5}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterLengthTable', '{"outerDiameter":"D4_","lengthRange":">=200","math":200,"cost":0.7}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanBladeMaterialTable', '{"type":"PBT_H<=7.5","price":0}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanSizeTable', '{"fanSize":"60*60*5","price":2.5}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D4_","flatteningThickness":">=1.6mm","math":1.6,"cost":0.2}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D4_","flatteningThickness":">=1.4mm","math":1.4,"cost":0.25}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D4_","flatteningThickness":">=1.2mm","math":1.2,"cost":0.35}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D4_","flatteningThickness":">=1.0mm","math":1,"cost":0.45}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D4_","flatteningThickness":">=0.8mm","math":0.8,"cost":0.6}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D4_","flatteningThickness":">=0.6mm","math":0.6,"cost":0.8}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D4_","flatteningThickness":">=0mm","math":0,"cost":1}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D6_","flatteningThickness":">=2.0mm","math":2,"cost":0}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D6_","flatteningThickness":">=1.8mm","math":1.8,"cost":0.15}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D6_","flatteningThickness":">=1.6mm","math":1.6,"cost":0.2}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D6_","flatteningThickness":">=1.4mm","math":1.4,"cost":0.25}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D6_","flatteningThickness":">=1.2mm","math":1.2,"cost":0.35}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D6_","flatteningThickness":">=1.0mm","math":1,"cost":0.45}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D6_","flatteningThickness":">=0.8mm","math":0.8,"cost":0.6}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D6_","flatteningThickness":">=0mm","math":0,"cost":1}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D8_","flatteningThickness":">=2.0mm","math":2,"cost":0}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D8_","flatteningThickness":">=1.8mm","math":1.8,"cost":0.25}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D8_","flatteningThickness":">=1.6mm","math":1.6,"cost":0.3}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D8_","flatteningThickness":">=1.4mm","math":1.4,"cost":0.4}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D8_","flatteningThickness":">=1.2mm","math":1.2,"cost":0.5}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D8_","flatteningThickness":">=1.0mm","math":1,"cost":0.6}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', '{"outerDiameter":"D8_","flatteningThickness":">=0mm","math":0,"cost":1}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Screw', 'polishedRodTable', '{"type":"Yes"}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Screw', 'polishedRodTable', '{"type":"No"}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterLengthTable', '{"outerDiameter":"D4_","lengthRange":">=175","math":175,"cost":0.65}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterLengthTable', '{"outerDiameter":"D4_","lengthRange":">=0","math":0,"cost":0.6}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterLengthTable', '{"outerDiameter":"D6_","lengthRange":">=250","math":250,"cost":0.75}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterLengthTable', '{"outerDiameter":"D6_","lengthRange":">=200","math":200,"cost":0.7}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterLengthTable', '{"outerDiameter":"D6_","lengthRange":">=175","math":175,"cost":0.65}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterLengthTable', '{"outerDiameter":"D6_","lengthRange":">=0","math":0,"cost":0.6}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterLengthTable', '{"outerDiameter":"D8_","lengthRange":">=250","math":250,"cost":0.95}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterLengthTable', '{"outerDiameter":"D8_","lengthRange":">=200","math":200,"cost":0.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterLengthTable', '{"outerDiameter":"D8_","lengthRange":">=175","math":175,"cost":0.85}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterLengthTable', '{"outerDiameter":"D8_","lengthRange":">=0","math":0,"cost":0.8}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'thicknessTable', '{"heatTransferCoefficient":6,"thickness":0.5,"price":257,"shore":45}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'thicknessTable', '{"heatTransferCoefficient":6,"thickness":0.8,"price":300,"shore":45}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'thicknessTable', '{"heatTransferCoefficient":6,"thickness":1,"price":320,"shore":45}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'thicknessTable', '{"heatTransferCoefficient":1.3,"thickness":0.5,"price":74,"shore":24}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'thicknessTable', '{"heatTransferCoefficient":1.3,"thickness":1,"price":98,"shore":24}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'thicknessTable', '{"heatTransferCoefficient":1.3,"thickness":1.5,"price":136,"shore":24}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'thicknessTable', '{"heatTransferCoefficient":1.3,"thickness":3,"price":197,"shore":24}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'thicknessTable', '{"heatTransferCoefficient":3,"thickness":0.5,"price":95,"shore":42}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'thicknessTable', '{"heatTransferCoefficient":3,"thickness":1,"price":121,"shore":42}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'thicknessTable', '{"heatTransferCoefficient":3,"thickness":1.5,"price":168,"shore":42}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'thicknessTable', '{"heatTransferCoefficient":3,"thickness":2.25,"price":270,"shore":42}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'thicknessTable', '{"heatTransferCoefficient":3,"thickness":2.5,"price":315,"shore":42}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'thicknessTable', '{"heatTransferCoefficient":6,"thickness":0.3,"price":189,"shore":45}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterTable', '{"outerDiameter":"D4_"}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterTable', '{"outerDiameter":"D6_"}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'outerDiameterTable', '{"outerDiameter":"D8_"}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"CU1100","materialThickness":0.5,"materialCostPerKilogram":4.5}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"CU1100","materialThickness":0.6,"materialCostPerKilogram":4.5}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"CU1100","materialThickness":0.8,"materialCostPerKilogram":4.5}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"C18400","materialThickness":0.3,"materialCostPerKilogram":4.5}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"KU400","materialThickness":0.5,"materialCostPerKilogram":1.5}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"KU400","materialThickness":0.6,"materialCostPerKilogram":1.5}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"SGCC","materialThickness":0.5,"materialCostPerKilogram":1.4}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"SGCC","materialThickness":0.6,"materialCostPerKilogram":1.37}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"SGCC","materialThickness":0.8,"materialCostPerKilogram":1}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"SGCC","materialThickness":1,"materialCostPerKilogram":1.35}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"SGCC","materialThickness":1.2,"materialCostPerKilogram":1.36}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"SECC","materialThickness":0.5,"materialCostPerKilogram":1.39}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"SECC","materialThickness":0.6,"materialCostPerKilogram":1.37}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"SPCC","materialThickness":0.5,"materialCostPerKilogram":0.95}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"SPCC","materialThickness":0.6,"materialCostPerKilogram":0.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"SPCC","materialThickness":0.8,"materialCostPerKilogram":0.8}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"SPCC","materialThickness":1,"materialCostPerKilogram":0.8}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"SPCC","materialThickness":1.2,"materialCostPerKilogram":0.8}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', '{"material":"SPCC","materialThickness":1.6,"materialCostPerKilogram":0.8}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fin', 'materialCostPerKilogramTable', '{"material":"AL1050","materialThickness":0.15,"materialCostPerKilogram":3.6}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fin', 'materialCostPerKilogramTable', '{"material":"AL1050","materialThickness":0.2,"materialCostPerKilogram":2.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fin', 'materialCostPerKilogramTable', '{"material":"AL1050","materialThickness":0.3,"materialCostPerKilogram":2.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fin', 'materialCostPerKilogramTable', '{"material":"CU1100","materialThickness":0.1,"materialCostPerKilogram":8.6}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fin', 'materialCostPerKilogramTable', '{"material":"CU1100","materialThickness":0.2,"materialCostPerKilogram":8.2}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fin', 'materialCostPerKilogramTable', '{"material":"CU1100","materialThickness":0.3,"materialCostPerKilogram":8.2}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fin', 'densityTable', '{"material":"AL1050","density":2.75,"price":2.75}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fin', 'densityTable', '{"material":"CU1100","density":8.9,"price":8.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanSizeTable', '{"fanSize":"60*60*5.5","price":2.1}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanSizeTable', '{"fanSize":"60*60*6","price":1.75}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanSizeTable', '{"fanSize":"60*60*6.5","price":1.65}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanSizeTable', '{"fanSize":"60*60*7","price":1.4}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanSizeTable', '{"fanSize":"60*60*7.5","price":1.4}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanSizeTable', '{"fanSize":"80*80*5.5","price":2.2}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'pipeTypeTable', '{"pipeType":"Powder(結燒管)"}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'pipeTypeTable', '{"pipeType":"Groove(溝槽管)"}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'pipeTypeTable', '{"pipeType":"Complex(複合管)"}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Pipe', 'pipeTypeTable', '{"pipeType":"VC(均熱管)"}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialDensityTable', '{"material":"CU1100","density":8.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialDensityTable', '{"material":"KU400","density":7.85}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialDensityTable', '{"material":"SGCC","density":7.85}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialDensityTable', '{"material":"SECC","density":7.85}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialDensityTable', '{"material":"SPCC","density":7.85}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPlate', 'materialDensityTable', '{"material":"C18400","density":8.8}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Grease', 'materialTable', '{"material":"7783","materialCost":490}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Grease', 'materialTable', '{"material":"7762","materialCost":145}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"CU1100","materialThickness":0.1,"materialCostPerKilogram":8.6}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"CU1100","materialThickness":0.2,"materialCostPerKilogram":8.2}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"CU1100","materialThickness":0.3,"materialCostPerKilogram":8.2}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"CU1100","materialThickness":0.5,"materialCostPerKilogram":8.2}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"CU1100","materialThickness":0.6,"materialCostPerKilogram":8.2}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"CU1100","materialThickness":0.8,"materialCostPerKilogram":8.2}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"皮銅","materialThickness":0.5,"materialCostPerKilogram":8.2}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"AL1050","materialThickness":0.15,"materialCostPerKilogram":3.6}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"AL1050","materialThickness":0.2,"materialCostPerKilogram":2.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"AL1050","materialThickness":0.3,"materialCostPerKilogram":2.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"AL1050","materialThickness":0.4,"materialCostPerKilogram":2.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"AL1050","materialThickness":0.5,"materialCostPerKilogram":2.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"AL1050","materialThickness":0.6,"materialCostPerKilogram":2.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"AL1050","materialThickness":0.8,"materialCostPerKilogram":2.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'thermalBlockTable', '{"material":"AL1052","materialThickness":1,"materialCostPerKilogram":5}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'materialDensityTable', '{"material":"CU1100","density":8.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'materialDensityTable', '{"material":"皮銅","density":8.8}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'materialDensityTable', '{"material":"AL1050","density":2.75}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalBlock', 'materialDensityTable', '{"material":"AL1052","density":2.71}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"CR1015","materialThickness":0.5,"materialCostPerMM":0.98}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"CR1015","materialThickness":0.8,"materialCostPerMM":1.15}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"CR1015","materialThickness":1,"materialCostPerMM":1.31}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"CR1015","materialThickness":1.5,"materialCostPerMM":2.62}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"CR1015","materialThickness":2,"materialCostPerMM":2.62}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"CR1015","materialThickness":2.5,"materialCostPerMM":3.93}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"CR1015","materialThickness":3,"materialCostPerMM":3.93}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"CR1015","materialThickness":4,"materialCostPerMM":5.25}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"CR1015","materialThickness":5,"materialCostPerMM":6.56}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"SM55","materialThickness":2,"materialCostPerMM":4.43}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"SM55","materialThickness":2.5,"materialCostPerMM":4.59}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"SM55","materialThickness":3,"materialCostPerMM":4.75}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"SM55","materialThickness":4,"materialCostPerMM":5.74}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"SM55","materialThickness":4.5,"materialCostPerMM":6.23}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"SM55","materialThickness":5,"materialCostPerMM":7.38}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"藍色PMP1800","materialThickness":1,"materialCostPerMM":5.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"藍色PMP1800","materialThickness":1.5,"materialCostPerMM":6.56}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"藍色PMP1800","materialThickness":2,"materialCostPerMM":6.56}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"藍色PMP1800","materialThickness":2.5,"materialCostPerMM":7.87}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"黑色PMP1800","materialThickness":1,"materialCostPerMM":5.9}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"黑色PMP1800","materialThickness":2,"materialCostPerMM":6.5}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"黑色PMP1800","materialThickness":3,"materialCostPerMM":8.2}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"E4382","materialThickness":0.5,"materialCostPerMM":4.92}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"E4382","materialThickness":1,"materialCostPerMM":4.92}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"E4382","materialThickness":1.5,"materialCostPerMM":7.38}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"E4382","materialThickness":2.5,"materialCostPerMM":12.3}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"E4382","materialThickness":3.5,"materialCostPerMM":17.21}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Sponge', 'materialTable', '{"material":"E4382","materialThickness":4.5,"materialCostPerMM":22.13}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanBladeMaterialTable', '{"type":"LCP_H<= 5.5","price":0.1}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('Fan', 'fanBladeMaterialTable', '{"type":"LCP_H>=6","price":0.15}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'heatTransferCoefficientTable', '{"heatTransferCoefficient":1.3,"shore":24}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'heatTransferCoefficientTable', '{"heatTransferCoefficient":3,"shore":42}');
INSERT INTO wiprocurement.costgen_database_data (tabletype, tablename, data) VALUES ('ThermalPad', 'heatTransferCoefficientTable', '{"heatTransferCoefficient":6,"shore":45}');

--costgen_database_header
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Pipe', 'outerDiameterLengthTable', 'outerDiameter', '外徑', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fan', 'motorArchitectureTable', 'type', '馬達', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', 'outerDiameter', '外徑', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fan', 'fanSizeTable', 'fanSize', 'Size', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fan', 'fanBladeMaterialTable', 'type', '扇葉材料', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fan', 'bearingAndSleeveTable', 'type', '軸承+套筒類別', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Pipe', 'outerDiameterLengthTable', 'lengthRange', '長度範圍', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fan', 'magnetMaterialAndSizeTable', 'type', '磁石材料', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fan', 'materialTable', 'type', '材質', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fan', 'motorArchitectureTable', 'price', '價格', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fan', 'fanTypeTable', 'fanType', '風扇類型', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fan', 'bearingAndSleeveTable', 'price', '價格', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Pipe', 'outerDiameterLengthTable', 'math', '數學', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fan', 'magnetMaterialAndSizeTable', 'price', '價格', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', 'flatteningThickness', '打扁', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fan', 'fanSizeTable', 'price', '價格', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fan', 'fanBladeMaterialTable', 'price', '價格', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Pipe', 'outerDiameterLengthTable', 'cost', 'cost', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', 'math', '數學', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', 'cost', 'Cost', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fin', 'materialCostPerKilogramTable', 'material', '材料', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fin', 'materialCostPerKilogramTable', 'materialThickness', '材料厚度', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fin', 'materialCostPerKilogramTable', 'materialCostPerKilogram', '材料每公斤費用', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Grease', 'materialTable', 'material', '材質', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalPad', 'thicknessTable', 'heatTransferCoefficient', '熱傳係數(K值)', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Grease', 'materialTable', 'materialCost', '材料成本', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalPad', 'thicknessTable', 'thickness', '厚度', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Pipe', 'pipeTypeTable', 'pipeType', 'pipe形式', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Screw', 'polishedRodTable', 'type', '光桿', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Pipe', 'outerDiameterTable', 'outerDiameter', '外徑直徑', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalPad', 'thicknessTable', 'price', '價格', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalBlock', 'materialDensityTable', 'material', '材料', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalPad', 'thicknessTable', 'shore', '硬度', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalBlock', 'materialDensityTable', 'density', '密度', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Sponge', 'materialTable', 'material', '材料', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', 'material', '材料', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalBlock', 'thermalBlockTable', 'material', '材料', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalPad', 'heatTransferCoefficientTable', 'heatTransferCoefficient', '熱傳係數(K值)', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Sponge', 'materialTable', 'materialThickness', '材料厚度', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalBlock', 'thermalBlockTable', 'materialThickness', '材料厚度', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Sponge', 'materialTable', 'materialCostPerMM', '材料每mm費用', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalPlate', 'materialDensityTable', 'material', '材料', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fin', 'densityTable', 'material', '材料', 'string');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fin', 'densityTable', 'density', '密度', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', 'materialThickness', '材料厚度', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', 'materialCostPerKilogram', '材料每公斤費用', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalBlock', 'thermalBlockTable', 'materialCostPerKilogram', '材料每公斤費用', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalPad', 'heatTransferCoefficientTable', 'shore', '硬度', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('Fin', 'densityTable', 'price', 'Price USD', 'number');
INSERT INTO wiprocurement.costgen_database_header (tabletype, tablename, headerkey, headername, headertypeof) VALUES ('ThermalPlate', 'materialDensityTable', 'density', '密度', 'number');

--costgen_database_table
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('ThermalPad', 'heatTransferCoefficientTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Fan', 'materialTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('ThermalPlate', 'materialCostPerKilogramTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Fan', 'bearingAndSleeveTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Sponge', 'materialTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('ThermalPad', 'thicknessTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Grease', 'materialTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Fan', 'magnetMaterialAndSizeTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('ThermalBlock', 'materialDensityTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('ThermalPlate', 'materialDensityTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('ThermalBlock', 'thermalBlockTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Fin', 'densityTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Fan', 'fanSizeTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Fin', 'materialCostPerKilogramTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Fan', 'fanTypeTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Pipe', 'pipeTypeTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Pipe', 'outerDiameterLengthTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Pipe', 'outerDiameterFlatteningThicknessTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Screw', 'polishedRodTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Fan', 'fanBladeMaterialTable', 1, NULL, now());
INSERT INTO wiprocurement.costgen_database_table (tabletype, tablename, versionnumber, updateby, updatetime) VALUES ('Fan', 'motorArchitectureTable', 1, NULL, now());

