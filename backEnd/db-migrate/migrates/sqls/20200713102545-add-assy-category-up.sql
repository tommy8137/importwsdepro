-- NB
insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)values
('LCD COVER', (select id from formula.product_type where type_name = 'NB')),
('U-CASE', (select id from formula.product_type where type_name = 'NB')),
('LCD BEZEL', (select id from formula.product_type where type_name = 'NB')),
('OTHERS', (select id from formula.product_type where type_name = 'NB')),
('L-CASE', (select id from formula.product_type where type_name = 'NB')),
('OTHER PART', (select id from formula.product_type where type_name = 'NB')),
('OTHER 60 ASSY', (select id from formula.product_type where type_name = 'NB')),
('SYSTEM DC-LEVEL', (select id from formula.product_type where type_name = 'NB')),
('LCD DC-LEVEL', (select id from formula.product_type where type_name = 'NB')),
('KB SUPPORT', (select id from formula.product_type where type_name = 'NB')),
('PCB', (select id from formula.product_type where type_name = 'NB'))
on conflict do nothing;
-- DT
insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)values
('OTHER PART', (select id from formula.product_type where type_name = 'DT')),
('OTHER 60 ASSY', (select id from formula.product_type where type_name = 'DT')),
('ASSY IO SHIELDING', (select id from formula.product_type where type_name = 'DT')),
('ASSY ODD BRKT', (select id from formula.product_type where type_name = 'DT')),
('ASSY SUB CHASSIS', (select id from formula.product_type where type_name = 'DT')),
('ASSY REAR HOLDER', (select id from formula.product_type where type_name = 'DT')),
('OTHERS', (select id from formula.product_type where type_name = 'DT')),
('ASSY REAR IO BRKT', (select id from formula.product_type where type_name = 'DT')),
('ASSY FRONT IO MODULE', (select id from formula.product_type where type_name = 'DT')),
('ASSY REAR  FOOT STAND', (select id from formula.product_type where type_name = 'DT')),
('ASSY RUBBER FRONT FOOT STAND', (select id from formula.product_type where type_name = 'DT')),
('ASSY HDD BRACKET', (select id from formula.product_type where type_name = 'DT')),
('ASSY HANDLE COVER', (select id from formula.product_type where type_name = 'DT')),
('ASSY ODD BEZEL', (select id from formula.product_type where type_name = 'DT')),
('ASSY REAR COVER', (select id from formula.product_type where type_name = 'DT')),
('ASSY BOTTOM COVER', (select id from formula.product_type where type_name = 'DT')),
('SYSTEM DC-LEVEL', (select id from formula.product_type where type_name = 'DT')),
('ASSY FRONT BEZEL', (select id from formula.product_type where type_name = 'DT')),
('ASSY L SIDE', (select id from formula.product_type where type_name = 'DT')),
('ASSY R SIDE', (select id from formula.product_type where type_name = 'DT')),
('ASSY TOP-COVER', (select id from formula.product_type where type_name = 'DT')),
('ASSY CHASSIS', (select id from formula.product_type where type_name = 'DT'))
on conflict do nothing;

-- AIO
insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)values
('ASSY WEBCAM HOLDER', (select id from formula.product_type where type_name = 'AIO')),
('OTHER PART', (select id from formula.product_type where type_name = 'AIO')),
('OTHER 60 ASSY', (select id from formula.product_type where type_name = 'AIO')),
('ASSY FRONT COVER SIDE', (select id from formula.product_type where type_name = 'AIO')),
('ASSY REAR IO COVER', (select id from formula.product_type where type_name = 'AIO')),
('ASSY HINGE COVER', (select id from formula.product_type where type_name = 'AIO')),
('ASSY DIMM DOOR', (select id from formula.product_type where type_name = 'AIO')),
('ASSY REAR IO BRKT', (select id from formula.product_type where type_name = 'AIO')),
('ASSY SIDE IO BRKT', (select id from formula.product_type where type_name = 'AIO')),
('ASS SPEAKER COVER', (select id from formula.product_type where type_name = 'AIO')),
('ASSY_WEBCAM_SHUTTER', (select id from formula.product_type where type_name = 'AIO')),
('ASSY VGA BRACKET', (select id from formula.product_type where type_name = 'AIO')),
('ASSY WIFI HOLDER', (select id from formula.product_type where type_name = 'AIO')),
('ASSY ODD BEZEL', (select id from formula.product_type where type_name = 'AIO')),
('ASSY VESA BRKT', (select id from formula.product_type where type_name = 'AIO')),
('ASSY SIDE IO', (select id from formula.product_type where type_name = 'AIO')),
('ASSY FRONT DECO', (select id from formula.product_type where type_name = 'AIO')),
('ASSY MAIN BRKT', (select id from formula.product_type where type_name = 'AIO')),
('SYSTEM DC-LEVEL', (select id from formula.product_type where type_name = 'AIO')),
('LCD DC-LEVEL', (select id from formula.product_type where type_name = 'AIO')),
('ASSY HDD BRACKET', (select id from formula.product_type where type_name = 'AIO')),
('ASSY ODD BRACKET', (select id from formula.product_type where type_name = 'AIO')),
('ASSY STAND', (select id from formula.product_type where type_name = 'AIO')),
('ASSY PANEL BASE', (select id from formula.product_type where type_name = 'AIO')),
('ASSY MB SHIELDING', (select id from formula.product_type where type_name = 'AIO')),
('ASSY MIDDLE FRAME', (select id from formula.product_type where type_name = 'AIO')),
('ASSY REAR COVER', (select id from formula.product_type where type_name = 'AIO')),
('ASSY FRONT BEZEL', (select id from formula.product_type where type_name = 'AIO')),
('OTHERS', (select id from formula.product_type where type_name = 'AIO'))
on conflict do nothing;

-- IPC
insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)values
('OTHERS', (select id from formula.product_type where type_name = 'IPC'))
on conflict do nothing;

-- LCM
insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)values
('OTHERS', (select id from formula.product_type where type_name = 'LCM'))
on conflict do nothing;

-- Monitor
insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)values
('OTHERS', (select id from formula.product_type where type_name = 'Monitor'))
on conflict do nothing;

-- PD
insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)values
('OTHERS', (select id from formula.product_type where type_name = 'PD'))
on conflict do nothing;

-- Server
insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)values
('ASSY DIMM DUMMY', (select id from formula.product_type where type_name = 'Server')),
('AVAP PART', (select id from formula.product_type where type_name = 'Server')),
('OTHER 60 ASSY', (select id from formula.product_type where type_name = 'Server')),
('OTHER PART', (select id from formula.product_type where type_name = 'Server')),
('ASSY FAN DUMMY', (select id from formula.product_type where type_name = 'Server')),
('ASSY NODE DUMMY', (select id from formula.product_type where type_name = 'Server')),
('ASSY HDD DUMMY', (select id from formula.product_type where type_name = 'Server')),
('ASSY FOOT STAND', (select id from formula.product_type where type_name = 'Server')),
('ASSY CABLE HOLDER', (select id from formula.product_type where type_name = 'Server')),
('ASSY PSU BAFFLE', (select id from formula.product_type where type_name = 'Server')),
('ASSY DIMM BAFFLE', (select id from formula.product_type where type_name = 'Server')),
('ASSY MAIN BAFFLE', (select id from formula.product_type where type_name = 'Server')),
('ASSY CABLE COVER', (select id from formula.product_type where type_name = 'Server')),
('ASSY 240VA COVER', (select id from formula.product_type where type_name = 'Server')),
('ASSY IO BRKACET', (select id from formula.product_type where type_name = 'Server')),
('ASSY MEDIA CAGE', (select id from formula.product_type where type_name = 'Server')),
('ASSY FRONT IO MODULE', (select id from formula.product_type where type_name = 'Server')),
('ASSY FRONT BEZEL', (select id from formula.product_type where type_name = 'Server')),
('ASSY EAR-R', (select id from formula.product_type where type_name = 'Server')),
('ASSY EAR-L', (select id from formula.product_type where type_name = 'Server')),
('ASSY MID PLAN BRKT', (select id from formula.product_type where type_name = 'Server')),
('ASSY CPU BD TRAY', (select id from formula.product_type where type_name = 'Server')),
('ASSY NODE TRAY', (select id from formula.product_type where type_name = 'Server')),
('ASSY MB TRAY', (select id from formula.product_type where type_name = 'Server')),
('ASSY PDB BRACKET', (select id from formula.product_type where type_name = 'Server')),
('ASSY PSU CAGE', (select id from formula.product_type where type_name = 'Server')),
('ASSY FAN DOOR', (select id from formula.product_type where type_name = 'Server')),
('ASSY FAN CAGE', (select id from formula.product_type where type_name = 'Server')),
('ASSY FAN HOLDER', (select id from formula.product_type where type_name = 'Server')),
('ASSY RISER CAGE', (select id from formula.product_type where type_name = 'Server')),
('ASSY ODD CAGE', (select id from formula.product_type where type_name = 'Server')),
('ASSY ODD BRACKET', (select id from formula.product_type where type_name = 'Server')),
('ASSY HDD BACK PLATE BRKT', (select id from formula.product_type where type_name = 'Server')),
('ASSY HDD CAGE', (select id from formula.product_type where type_name = 'Server')),
('ASSY HDD CARRIER', (select id from formula.product_type where type_name = 'Server')),
('ASSY SIDE COVER-R', (select id from formula.product_type where type_name = 'Server')),
('ASSY SIDE COVER-L', (select id from formula.product_type where type_name = 'Server')),
('ASSY FRONT COVER', (select id from formula.product_type where type_name = 'Server')),
('ASSY TOP COVER', (select id from formula.product_type where type_name = 'Server')),
('ASSY CHASSIS', (select id from formula.product_type where type_name = 'Server')),
('OTHERS', (select id from formula.product_type where type_name = 'Server')),
('ASSY PSU DUMMY', (select id from formula.product_type where type_name = 'Server')),
('ASSY CMA', (select id from formula.product_type where type_name = 'Server')),
('ASSY RMK', (select id from formula.product_type where type_name = 'Server')),
('ASSY CABLE', (select id from formula.product_type where type_name = 'Server')),
('ASSY HANDLE COVER', (select id from formula.product_type where type_name = 'Server')),
('ASSY HANDLE BRACKET', (select id from formula.product_type where type_name = 'Server'))
on conflict do nothing;

-- TC
insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)values
('ASSY R SIDE', (select id from formula.product_type where type_name = 'TC')),
('ASSY HDD BRACKET', (select id from formula.product_type where type_name = 'TC')),
('ASSY BOTTOM COVER', (select id from formula.product_type where type_name = 'TC')),
('ASSY CHASSIS', (select id from formula.product_type where type_name = 'TC')),
('ASSY FRONT BEZEL', (select id from formula.product_type where type_name = 'TC')),
('ASSY FRONT IO MODULE', (select id from formula.product_type where type_name = 'TC')),
('ASSY HANDLE COVER', (select id from formula.product_type where type_name = 'TC')),
('ASSY TOP-COVER', (select id from formula.product_type where type_name = 'TC')),
('OTHER 60 ASSY', (select id from formula.product_type where type_name = 'TC')),
('SYSTEM DC-LEVEL', (select id from formula.product_type where type_name = 'TC')),
('ASSY REAR  FOOT STAND', (select id from formula.product_type where type_name = 'TC')),
('ASSY REAR IO BRKT', (select id from formula.product_type where type_name = 'TC')),
('ASSY IO SHIELDING', (select id from formula.product_type where type_name = 'TC')),
('ASSY SUB CHASSIS', (select id from formula.product_type where type_name = 'TC')),
('OTHER PART', (select id from formula.product_type where type_name = 'TC')),
('ASSY ODD BEZEL', (select id from formula.product_type where type_name = 'TC')),
('OTHERS', (select id from formula.product_type where type_name = 'TC')),
('ASSY REAR COVER', (select id from formula.product_type where type_name = 'TC')),
('ASSY ODD BRKT', (select id from formula.product_type where type_name = 'TC')),
('ASSY REAR HOLDER', (select id from formula.product_type where type_name = 'TC')),
('ASSY L SIDE', (select id from formula.product_type where type_name = 'TC')),
('ASSY RUBBER FRONT FOOT STAND', (select id from formula.product_type where type_name = 'TC'))
on conflict do nothing;

-- VoIP
insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)values
('Cable', (select id from formula.product_type where type_name = 'VoIP')),
('OTHER PART', (select id from formula.product_type where type_name = 'VoIP')),
('OTHER 60 ASSY', (select id from formula.product_type where type_name = 'VoIP')),
('AVAP', (select id from formula.product_type where type_name = 'VoIP')),
('OTHERS', (select id from formula.product_type where type_name = 'VoIP')),
('EM', (select id from formula.product_type where type_name = 'VoIP')),
('KEYPAD ASSY', (select id from formula.product_type where type_name = 'VoIP')),
('STAND ASSY', (select id from formula.product_type where type_name = 'VoIP')),
('REAR(BOTTOM) ASSY', (select id from formula.product_type where type_name = 'VoIP')),
('FRONT(TOP) ASSY', (select id from formula.product_type where type_name = 'VoIP')),
('VOIP Assy Category', (select id from formula.product_type where type_name = 'VoIP'))
on conflict do nothing;

-- VAD
insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)values
('MAIN HOUNSING', (select id from formula.product_type where type_name = 'VAD')),
('BACK HOUNSING', (select id from formula.product_type where type_name = 'VAD')),
('FRAME', (select id from formula.product_type where type_name = 'VAD')),
('END CAP', (select id from formula.product_type where type_name = 'VAD')),
('KEY PAD', (select id from formula.product_type where type_name = 'VAD')),
('RUBBER SEALING', (select id from formula.product_type where type_name = 'VAD')),
('OTHER 60 ASSY', (select id from formula.product_type where type_name = 'VAD')),
('OTHER PART', (select id from formula.product_type where type_name = 'VAD')),
('PCB', (select id from formula.product_type where type_name = 'VAD'))
on conflict do nothing;

-- VAD ACC
insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)values
('TOP HOUNSING', (select id from formula.product_type where type_name = 'VAD ACC')),
('BOTTOM HOUNSING', (select id from formula.product_type where type_name = 'VAD ACC')),
('FRAME', (select id from formula.product_type where type_name = 'VAD ACC')),
('RUBBER SEALING', (select id from formula.product_type where type_name = 'VAD ACC')),
('OTHER 60 ASSY', (select id from formula.product_type where type_name = 'VAD ACC')),
('OTHER PART', (select id from formula.product_type where type_name = 'VAD ACC')),
('PCB', (select id from formula.product_type where type_name = 'VAD ACC'))
on conflict do nothing;

-- Smart Device
insert into formula.gb_assy_ctgy (gb_assy_ctgy_name, product_type_id)values
('MAIN HOUNSING', (select id from formula.product_type where type_name = 'Smart Device')),
('MAIN COVER', (select id from formula.product_type where type_name = 'Smart Device')),
('FRAME', (select id from formula.product_type where type_name = 'Smart Device')),
('OTHER 60 ASSY', (select id from formula.product_type where type_name = 'Smart Device')),
('OTHER PART', (select id from formula.product_type where type_name = 'Smart Device')),
('PCB', (select id from formula.product_type where type_name = 'Smart Device'))
on conflict do nothing;