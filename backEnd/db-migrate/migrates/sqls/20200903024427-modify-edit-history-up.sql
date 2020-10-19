/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS wiprocurement.bom_project_edit_type (
  id	uuid NOT NULL DEFAULT uuid_generate_v1(),
  action_type varchar(200) NOT NULL,
  part_type varchar(200) NOT NULL,
  label varchar(200) NOT NULL,
  label_name varchar(200) NOT NULL,
  field_type varchar(200) NULL,
  data_type varchar(200) NOT NULL,
  create_time timestamptz default now(),
  CONSTRAINT bom_project_edit_type_pk PRIMARY KEY (id),
  CONSTRAINT bom_project_edit_type_un UNIQUE (action_type, part_type, label)
);

ALTER TABLE wiprocurement.bom_project_edit_history
  ADD COLUMN IF NOT EXISTS bom_id          int4   REFERENCES wiprocurement.bom_projects(id),
  ADD COLUMN IF NOT EXISTS field_type_id   uuid   REFERENCES wiprocurement.bom_project_edit_type(id),
  ADD COLUMN IF NOT EXISTS value           varchar,
  ADD COLUMN IF NOT EXISTS source_item_id  varchar;


insert into wiprocurement.bom_project_edit_type (action_type, part_type, label, label_name, field_type, data_type) values
( 'project_parameters', 'housing-metal',    'progressive_stamping_fcst_allowance',   '連續模 FCST 寬放值(%)',  'input',  'float'),
( 'project_parameters', 'housing-metal',    'stage_stamping_fcst_allowance',         '工程模 FCST 寬放值(%)',  'input',  'float'),
( 'project_parameters', 'housing-plastic',  'fcst_allowance',                        '成型費FCST寬放值(%)',    'input',  'float'),

--bom_item
( 'bom_item_gerenal', 'spa',      'spa_cost_up',             'SPA Cost (U/P)',  'input',  'float'),
( 'bom_item_gerenal', 'spa',      'material_name',           'SPA Cost 料號',   'input',  'String'),

( 'bom_item_gerenal', 'sourcer',  'sourcer_shipping',        'Sourcer 運包',        'input',  'float'),
( 'bom_item_gerenal', 'sourcer',  'sourcer_pl',              'Sourcer P/L',        'input',  'float'),
( 'bom_item_gerenal', 'sourcer',  'sourcer_assembly',        'Sourcer 組工',        'input',  'float'),
( 'bom_item_gerenal', 'sourcer',  'sourcer_cost',            'Sourcer Cost(U/P)',  'input',  'float'),
( 'bom_item_gerenal', 'sourcer',  'sourcer_remark',          'Sourcer Remark',     'input',  'String'),

( 'bom_item_gerenal', 'ce',       'shipping_check_cost',     'CE 運包',              'input',  'float'),
( 'bom_item_gerenal', 'ce',       'ce_pl',                   'CE P/L',              'input',  'float'),
( 'bom_item_gerenal', 'ce',       'inquiry_cost_up',         'Inquiry Cost (U/P)',  'input',  'float'),
( 'bom_item_gerenal', 'ce',       'suggestion_cost_type',    'CE Cost 選項',         'dropdown',  'String'),
( 'bom_item_gerenal', 'ce',       'ce_cost_up',              'CE Cost (U/P)',       'dropdown',  'float'),
( 'bom_item_gerenal', 'ce',       'suggestion_cost_remark',  'CE Remark',           'input',  'String'),

--Metal DT
( 'ce_parameters',  'housing-metal',  'paintingAreaLengthAllowance',  '噴塗面積寬放(L)',         'input',  'float'),
( 'ce_parameters',  'housing-metal',  'paintingAreaWidthAllowance',   '噴塗面積寬放(W)',         'input',  'float'),
( 'ce_parameters',  'housing-metal',  'NCVMAreaLengthAllowance',      'NCVM面積寬放(L)',        'input',  'float'),
( 'ce_parameters',  'housing-metal',  'NCVMAreaWidthAllowance',       'NCVM面積寬放(W)',        'input',  'float'),
( 'ce_parameters',  'housing-metal',  'cmfPaintingCycleTime',         '噴塗 Cycle Time',       'input',  'float'),
( 'ce_parameters',  'housing-metal',  'paintingLossRate',             '噴漆塗料耗損(%)',         'input',  'float'),
( 'ce_parameters',  'housing-metal',  'cmfPPaintingPcs',              '一次可噴成品數量 (pcs)',  'input',  'float'),
( 'ce_parameters',  'housing-metal',  'cmfPaintingMachineType',       '機台類型',               'dropdown',  'String'),

--Metal NB
( 'ce_parameters',  'housing-metal',  'ce_patintingAreaConst1',                     '噴塗面積計算係數',       'input',  'float'),
( 'ce_parameters',  'housing-metal',  'hmToolingMaterialWidth',                     '邊料尺寸 - W',          'input',  'float'),
( 'ce_parameters',  'housing-metal',  'hmToolingMaterialLength',                    '邊料尺寸 - L',          'input',  'float'),
( 'ce_parameters',  'housing-metal',  'hmWorkpieceSpacingInAssemblyLineDirection',  '流水線方向工件間距(mm)',  'input',  'float'),
( 'ce_parameters',  'housing-metal',  'hmNumberOfRuns',                             '趟數',                  'input',  'float'),
( 'ce_parameters',  'housing-metal',  'hmMaterialLossRateCE',                       '材料費loss rate(%)',    'input',  'float'),
( 'ce_parameters',  'housing-metal',  'hmPickAndPlaceAndToolChangeTime',            '取放與換刀時間(sec)',     'input',  'float'),

--plastic
( 'ce_parameters',  'housing-plastic',  'paintingAreaLengthAllowance',  '噴塗面積寬放(L)',        'input',  'float'),
( 'ce_parameters',  'housing-plastic',  'paintingAreaWidthAllowance',   '噴塗面積寬放(W)',        'input',  'float'),
( 'ce_parameters',  'housing-plastic',  'cmfPaintingCycleTime',         '噴塗 Cycle Time',       'input',  'float'),
( 'ce_parameters',  'housing-plastic',  'paintingLossRate',             '噴漆塗料耗損(%)',        'input',  'float'),
( 'ce_parameters',  'housing-plastic',  'cmfPaintingMachineType',       '機台類型',               'dropdown',  'String'),
( 'ce_parameters',  'housing-plastic',  'cmfPPaintingPcs',              '一次可噴成品數量 (pcs)',  'input',  'float'),
( 'ce_parameters',  'housing-plastic',  'cmfPaintingAreaLW',            '噴漆面 頂面數',          'dropdown',  'float'),
( 'ce_parameters',  'housing-plastic',  'cmfPaintingAreaLH',            '噴漆面 長側面數',         'dropdown',  'float'),
( 'ce_parameters',  'housing-plastic',  'cmfPaintingAreaWH',            '噴漆面 短側面數',         'dropdown',  'float'),
( 'ce_parameters',  'housing-plastic',  'NCVMAreaLengthAllowance',      'NCVM面積寬放(L)',        'input',  'float'),
( 'ce_parameters',  'housing-plastic',  'NCVMAreaWidthAllowance',       'NCVM面積寬放(W)',        'input',  'float'),

--rubber
( 'ce_parameters',  'meothers-rubber',   'rubberFcstAllowance',  'FCST寬放值(%)(月<25K)',  'input',  'float'),
( 'ce_parameters',  'meothers-rubber',   'rubberAllowance',      '成型寬放(%)',            'input',  'float'),

--cable ffc
-- 二次加工 Loss (%)
( 'ce_parameters',  'cable-ffc',  'FFCTagLossRate',                              '標籤 (%)',              'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCAcetateClothLossRate',                     '醋酸布 (%)',            'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCAluminumMylarCompoundLossRate',            '鋁箔麥拉複合 (%)',       'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCConductiveClothLossRate',                  '導電布 (%)',            'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCDoubleSideConductorAluminumFoilLossRate',  '雙導鋁箔 (%)',          'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCDoubleSidedTapeLossRate',                  '雙面膠 (%)',            'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCMylarLossRate',                            '麥拉 (%)',              'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCNoiseAbsorberLossRate',                    '吸波材 (%)',            'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCOneSideConductorAluminumFoilLossRate',     '單導鋁箔 (%)',          'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCReleasePaperTypeLossRate',                 '離型紙 (%)',            'input',  'float'),
-- 組裝
( 'ce_parameters',  'cable-ffc',  'FFCConnectorLossRate',                        'Connector Loss(%)',    'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCReinforcementBoardLossRate',               '補強板 Loss(%)',        'input',  'float'),
-- 材料
( 'ce_parameters',  'cable-ffc',  'FFCCoatingLossRate',                          '皮膜 Loss (%)',         'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCCopperWireLossRate',                       '銅線 Loss (%)',         'input',  'float'),
-- 輔料 Loss (%)
( 'ce_parameters',  'cable-ffc',  'FFCAssembleLossRate',                         '組裝 (%)',              'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCBendLossRate',                             '折彎 (%)',              'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCFlushLossRate',                            '沖型 (%)',              'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCGiltLossRate',                             '金手指掛鍍 (%)',         'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCPastingLossRate',                          '貼合分條及導通裁切 (%)',  'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCPrittingLossRate',                         '印刷 (%)',              'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCSprayCodeLossRate',                        '噴碼 (%)',              'input',  'float'),
( 'ce_parameters',  'cable-ffc',  'FFCStopLineLossRate',                         '停止線 (%)',             'input',  'float')

on conflict do nothing;
