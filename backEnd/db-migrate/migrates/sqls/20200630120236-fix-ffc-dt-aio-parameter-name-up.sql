update formula.common_parameter cp
set label_name  = '刺破式，每connector的組裝秒數'
where cp.label_name  = '刺破式，每pin的組裝秒數';


update formula.common_parameter cp
set label_name  = '纏繞 長度 > {{cable_ffc,cable_ffc_components,twine_l_const_1}} 時，從 {{cable_ffc,cable_ffc_components,twine_l_const_1}} + 1 開始，每50的區間增加的組裝秒數'
where cp.label_name  = '纏繞 長度 > {{cable_ffc,cable_ffc_components,twine_l_const_1}} 時，從 {{cable_ffc,cable_ffc_components,twine_l_const_1}} + 1 開始，每{{cable_ffc,cable_ffc_components,twine_gap_l_const_1}}的區間增加的組裝秒數';


update formula.common_parameter cp
set label_name  = '鍍金長度>{{cable_ffc,cable_ffc_secondary_processing,gilt_length}}時，長度超過{{cable_ffc,cable_ffc_secondary_processing,gilt_length}}的部分，每100的區間所增加的額外費用'
where cp.label_name  = '鍍金長度>{{cable_ffc,cable_ffc_secondary_processing,gilt_length}}時，長度超過{{cable_ffc,cable_ffc_secondary_processing,gilt_length}}的部分，每{{cable_ffc,cable_ffc_secondary_processing,gilt_length}}的區間所增加的額外費用';
