let squel = require('squel').useFlavour('postgres')
const _ = require('lodash')
const moment = require('moment')
const { systemDB } = require('../../helpers/database')
const uuidv1 = require('uuid/v4')
let testData = [
  {
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-20.K0678.040",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "FPC",
		"part_number" : "20.K0678.040",
		"description" : "CONN FPC 40P SMD 51540-04001-W01",
		"manufacturer" : "ACES",
		"current_price" : 0.07000,
		"spa" : 0.07,
		"lpp" : 0.069757,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "ACES",
		"vendor_part_no" : "51540-04001-W01",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "Display",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:17:52Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"020.K0160.0040\",\"spa_manufacturer\":\"[\\\"SSTM\\\"]\"}",
		"sheet" : "55",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-022.10005.0901",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "USB 3.0",
		"part_number" : "022.10005.0901",
		"description" : "SKT USB3.0 9P DIP C190J4-90909-L",
		"manufacturer" : "ALLTOP",
		"current_price" : 0.21620,
		"spa" : 0.178,
		"lpp" : 0.201499,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 2,
		"vendor" : "ALLTOP",
		"vendor_part_no" : "C190J4-90909-L",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "USB",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:17:53Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"022.10005.0AG1\",\"spa_manufacturer\":\"[\\\"TCONN\\\"]\"}",
		"sheet" : "35",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-062.10011.00C1",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "DDR",
		"part_number" : "062.10011.00C1",
		"description" : "SKT DDR 260P SMD AS0A821-H2SB-7H LCP",
		"manufacturer" : "FOXCONN",
		"current_price" : 0.17500,
		"spa" : 0.171,
		"lpp" : 0.17734,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "FOXCONN",
		"vendor_part_no" : "AS0A821-H2SB-7H",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "DDR",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:17:59Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"062.10011.00D1\",\"spa_manufacturer\":\"[\\\"BELLWETHER\\\"]\"}",
		"sheet" : "12",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-62.40009.D71",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "Switch",
		"part_number" : "62.40009.D71",
		"description" : "SW TACT 4P SKQGPAE010 SMD",
		"manufacturer" : "ALPS",
		"current_price" : 0.03230,
		"spa" : 0.0223,
		"lpp" : 0.02234,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "ALPS",
		"vendor_part_no" : "SKQGPAE010",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "DB-1",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:17:53Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"62.40009.D71\",\"spa_manufacturer\":\"[\\\"ALPS\\\"]\"}",
		"sheet" : "5",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : "0.0369",
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-022.10005.02Z1",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "USB 3.1 TYPE C",
		"part_number" : "022.10005.02Z1",
		"description" : "SKT USB CONN TYPE C 24P AUSB0152-P704A",
		"manufacturer" : "LOTES",
		"current_price" : 0.55000,
		"spa" : 0.55,
		"lpp" : 0.551869,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "LOTES",
		"vendor_part_no" : "AUSB0152-P704A",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "EXTIO_TypeC",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:17:55Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"022.10005.09C1\",\"spa_manufacturer\":\"[\\\"LOTES\\\"]\"}",
		"sheet" : "73",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-020.K0173.0028",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "FPC",
		"part_number" : "020.K0173.0028",
		"description" : "CONN FPC 28P SMD 50584-02801-W01",
		"manufacturer" : "ACES",
		"current_price" : 0.07880,
		"spa" : 0.0772,
		"lpp" : 0.078994,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "ACES",
		"vendor_part_no" : "50584-02801-W01",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "INTIO_KB\/TP",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:17:54Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"020.K0174.0028\",\"spa_manufacturer\":\"[\\\"ENTERY\\\"]\"}",
		"sheet" : "65",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-020.K0002.0006",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "FPC",
		"part_number" : "020.K0002.0006",
		"description" : "CONN FPC 6P SMD 196415-06031-3",
		"manufacturer" : "PTWO",
		"current_price" : 0.04100,
		"spa" : 0.041,
		"lpp" : 0.043114,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "P-TWO",
		"vendor_part_no" : "196415-06031-3",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "DB-1",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:17:54Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"020.K0002.0006\",\"spa_manufacturer\":\"[\\\"PTWO\\\"]\"}",
		"sheet" : "6",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-020.F0220.0004",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "WTB",
		"part_number" : "020.F0220.0004",
		"description" : "CONN CTR SMD 4P 88631-00401-W02",
		"manufacturer" : "ACES",
		"current_price" : 0.01470,
		"spa" : 0.0144,
		"lpp" : 0.015338,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "ACES",
		"vendor_part_no" : "88631-00401-W02",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "INTIO_Thermal",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:17:55Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"020.F0283.0004\",\"spa_manufacturer\":\"[\\\"ENTERY\\\"]\"}",
		"sheet" : "26",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-20.F1639.002",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "WTB",
		"part_number" : "20.F1639.002",
		"description" : "CONN CTRSMD 2P 50224-0020N-W02",
		"manufacturer" : "ACES",
		"current_price" : 0.01080,
		"spa" : 0.0107,
		"lpp" : 0.011696,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "ACES",
		"vendor_part_no" : "50224-0020N-W02",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "Flash",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:17:58Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"20.F1841.002\",\"spa_manufacturer\":\"[\\\"ENTERY\\\"]\"}",
		"sheet" : "25",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-20.F1639.004",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "WTB",
		"part_number" : "20.F1639.004",
		"description" : "CONN CTR SMD 4P 50224-0040N-W02",
		"manufacturer" : "ACES",
		"current_price" : 0.01360,
		"spa" : 0.01332,
		"lpp" : 0.014213,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "ACES",
		"vendor_part_no" : "50224-0040N-W02",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "Audio",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:18:02Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"20.F1639.004\",\"spa_manufacturer\":\"[\\\"ACES\\\"]\"}",
		"sheet" : "29",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-062.10002.0741",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "SD CARD",
		"part_number" : "062.10002.0741",
		"description" : "SKT SD CARD 11P 43-42916-01101RHF-WT SMD",
		"manufacturer" : "DEREN",
		"current_price" : 0.13140,
		"spa" : 0.1314,
		"lpp" : 0.136491,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "DEREN",
		"vendor_part_no" : "43-42916-01101RHF",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "DB-1",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:18:04Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"062.10002.0741\",\"spa_manufacturer\":\"[\\\"DEREN\\\"]\"}",
		"sheet" : "3",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-022.10005.0991",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "USB 2.0 TYPE A",
		"part_number" : "022.10005.0991",
		"description" : "SKT USB 4P C14773-10409-L",
		"manufacturer" : "ALLTOP",
		"current_price" : 0.10850,
		"spa" : 0.07,
		"lpp" : 0.108737,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "ALLTOP",
		"vendor_part_no" : "C14773-10409-L",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "DB-1",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:18:01Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"022.10005.0821\",\"spa_manufacturer\":\"[\\\"ALLTOP\\\"]\"}",
		"sheet" : "4",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-022.10025.00W1",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "HDMI",
		"part_number" : "022.10025.00W1",
		"description" : "SKT HDMI 19P C128AB-K1939-L DIP",
		"manufacturer" : "ALLTOP",
		"current_price" : 0.13500,
		"spa" : 0.105,
		"lpp" : 0.13495,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "ALLTOP",
		"vendor_part_no" : "C128AB-K1939-L",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "Display",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:18:08Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"022.10025.0161\",\"spa_manufacturer\":\"[\\\"BELLWETHER\\\"]\"}",
		"sheet" : "57",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-062.10003.0611",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "NGFF",
		"part_number" : "062.10003.0611",
		"description" : "SKT NGFF 75P AS0BC21-S40BE-7H SMD",
		"manufacturer" : "FOXCONN",
		"current_price" : 0.11000,
		"spa" : 0.044,
		"lpp" : 0.044738,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "HP",
		"vendor_part_no" : null,
		"supply_type" : "W",
		"obs" : "N",
		"module" : "INTIO_Storage_WiFi",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:18:03Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"062.10003.0C01\",\"spa_manufacturer\":\"[\\\"FOXCONN\\\"]\"}",
		"sheet" : "61",
		"valid_from" : "2018-06-19T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-022.10002.0941",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "AUDIO JACK",
		"part_number" : "022.10002.0941",
		"description" : "SKT AUDIO JACK 6P AJ3R1R-Y050-412",
		"manufacturer" : "SIMULA",
		"current_price" : 0.20000,
		"spa" : 0.2,
		"lpp" : null,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "SIMULA",
		"vendor_part_no" : "AJ3R1R-Y050-412",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "Audio",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:18:08Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"022.10002.0941\",\"spa_manufacturer\":\"[\\\"SIMULA\\\"]\"}",
		"sheet" : "29",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-20.K0397.004",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "FPC",
		"part_number" : "20.K0397.004",
		"description" : "CONN FPC 4P SMD 196353-04041-3",
		"manufacturer" : "PTWO",
		"current_price" : 0.02110,
		"spa" : 0.0186,
		"lpp" : 0.021148,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "P-TWO",
		"vendor_part_no" : "196353-04041-3",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "INTIO_KB\/TP",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:18:09Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"020.K0293.0004\",\"spa_manufacturer\":\"[\\\"ACES\\\"]\"}",
		"sheet" : "65",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-20.F2132.008",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "WTB",
		"part_number" : "20.F2132.008",
		"description" : "CONN CTR WTB 8P SMD 50458-00801-W01",
		"manufacturer" : "ACES",
		"current_price" : 0.05100,
		"spa" : 0.051,
		"lpp" : 0.052188,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "ACES",
		"vendor_part_no" : "50458-00801-W01",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "INTIO_ATX\/DCIN",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:18:05Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"20.F2132.008\",\"spa_manufacturer\":\"[\\\"ACES\\\"]\"}",
		"sheet" : "43",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-062.10003.0461",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "NGFF",
		"part_number" : "062.10003.0461",
		"description" : "SKT NGFF 75P 40-42241-067B1RHF SMD",
		"manufacturer" : "DEREN",
		"current_price" : 0.05560,
		"spa" : 0.0448,
		"lpp" : 0.052167,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "DEREN",
		"vendor_part_no" : "40-42241-067B1RHF",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "INTIO_Storage_WiFi",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:18:11Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"062.10003.0E31\",\"spa_manufacturer\":\"[\\\"LOTES\\\"]\"}",
		"sheet" : "63",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-020.K0182.0008",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "FPC",
		"part_number" : "020.K0182.0008",
		"description" : "CONN FPC 8P SMD 106H08-011001-M1-R",
		"manufacturer" : "STARCONN",
		"current_price" : 0.06500,
		"spa" : 0.0527,
		"lpp" : 0.065207,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "STARCONN",
		"vendor_part_no" : "106H08-011001-M1-R",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "INTIO_KB\/TP",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:18:11Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"020.K0255.0008\",\"spa_manufacturer\":\"[\\\"PTWO\\\"]\"}",
		"sheet" : "65",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	},
	{
		"id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9-020.K0125.0012",
		"edm_version_id" : "9b0df9e9-bbef-4eac-a37a-5394dd9acda9",
		"type1" : "Connector",
		"type2" : "FPC",
		"part_number" : "020.K0125.0012",
		"description" : "CONN FPC 12P SMD 132F12-010000-A2-R",
		"manufacturer" : "STARCONN",
		"current_price" : 0.05680,
		"spa" : 0.052,
		"lpp" : 0.056943,
		"currrent_price_adj_percentage" : null,
		"ce_cost" : null,
		"remark" : null,
		"qty" : 1,
		"vendor" : "STARCONN",
		"vendor_part_no" : "132F12-010000-A2-R",
		"supply_type" : "W",
		"obs" : "N",
		"module" : "INTIO_Storage_WiFi",
		"is_personal_checked" : false,
		"is_leader_checked" : false,
		"is_personal_submitted" : false,
		"create_time" : "2019-05-24T08:49:05Z",
		"update_time" : "2019-06-27T07:18:04Z",
		"other_manufacture_info" : "{\"spa_partnumber\":\"020.K0133.0012\",\"spa_manufacturer\":\"[\\\"ACES\\\"]\"}",
		"sheet" : "60",
		"valid_from" : "2019-06-30T16:00:00Z",
		"is_reject" : false,
		"exp_spa" : null,
		"exp_other_manufacture_info" : null,
		"spa_expire" : null,
		"is_common_parts" : false,
		"leader_checked_status" : null,
		"leader_submitted_status" : null,
		"sourcer_cost" : null,
		"last_price_currency_price" : null,
		"last_price_currency" : null,
		"alt_lowest_price" : null,
		"alt_lowest_partnumber" : null,
		"alt_manufacturer" : null,
		"alt_grouping" : null,
		"alt_other_info" : null,
		"current_price_exp" : null
	}
]

class Test {
  static async addFackData(projectCode) {
    let uuid = uuidv1()
    let sql = squel.insert()
      .into('wiprocurement.eebom_projects')
      .set('id', uuid)
      .set('project_code', projectCode)
      .set('customer', 'Annie')
      .set('product_type', 'Notebook.Computer')
      .set('project_name', 'STRONGBOW_PK')
      .set('stage', 'SA')
      .set('version', '0')
      .set('sku', 'UMA')
      .set('version_remark', 'gen_by_e2e_TEST')
      .set('project_leader', 'JACKAL HO')
      .set('plant', 'F711')
      .set('purchasing_organization', 'PWCQ')
      .set('platform', 'AMD PICASSO')
      .set('panel_size', 'Panel = 14/15/17, Z = 13~18 mm')
      .set('pcbno', '18848')

    let result = await systemDB.Query(sql.toParam())
    let versionUuid = uuidv1()
    let versionSql = squel.insert()
      .into('wiprocurement.edm_version')
      .set('id', versionUuid)
      .set('version', 'e2eTestVersion')
      .set('eebom_project_id', uuid)
      .set('upload_time', 'now()')
      .set('is_saved', 'false')

    result = await systemDB.Query(versionSql.toParam())

    let detailData = _.map(testData, i => {
      i.id = versionUuid + '-' + i.part_number
      i.edm_version_id = versionUuid
      i.create_time = 'now()'
      i.update_time = 'now()'
      return i
    })
    let eebomDetailSql = squel.insert()
      .into('wiprocurement.eebom_detail')
      .setFieldsRows(detailData)
    result = await systemDB.Query(eebomDetailSql.toParam())
  }

  static async deleteFackData() {
    let edmVersionSql = squel.select()
      .field('id')
      .from('wiprocurement.edm_version')
      .where('version = ?', 'e2eTestVersion')
    let delEebomDetailSql = squel.delete()
      .from('wiprocurement.eebom_detail')
      .where('edm_version_id in ?', edmVersionSql)
    let result = await systemDB.Query(delEebomDetailSql.toParam())

    let delEebomVersion = squel.delete()
      .from('wiprocurement.edm_version')
      .where('version = ?', 'e2eTestVersion')
    result = await systemDB.Query(delEebomVersion.toParam())

    let delEebomProject = squel.delete()
    .from('wiprocurement.eebom_projects')
    .where('version_remark = ?', 'gen_by_e2e_TEST')

    result = await systemDB.Query(delEebomProject.toParam())
  }

  static async getMetalNbList() {
		// SELECT item.id AS bom_item_id, item.part_name, item.parts_ctgy_1, item.parts_ctgy_2, stage.version_name,
		// project.id AS project_id, project.project_source, project.project_name, project.product_type, 
		// partlist.formate
		// FROM wiprocurement.bom_item AS item
		// INNER JOIN wiprocurement.bom_partlist_value AS partlist ON partlist.bom_item_id = item.id
		// LEFT JOIN wiprocurement.bom_stage_version AS stage ON stage.id = item.version_id
		// LEFT JOIN wiprocurement.bom_projects AS project ON stage.bom_id = project.id
		// WHERE project.product_type = 'NB' AND partlist.formate = 'housing-metal' AND partlist.partlist_value::text <> '{}'::text
		// ORDER BY project.id DESC 
    const sql = squel.select()
			.field('project.id', 'project_id')
			.field('project.project_source')
			.field('project.project_name')
			.field('project.product_type')
      .field('item.id', 'bom_item_id')
      .field('item.part_name')
      .field('item.parts_ctgy_1')
      .field('item.parts_ctgy_2')
      .field('stage.version_name')
			.field('partlist.formate')
			.field('partlist.partlist_value')
			.field('partlist.partlist_price')
			.from('wiprocurement.bom_item', 'item')
			.join('wiprocurement.bom_partlist_value', 'partlist', 'partlist.bom_item_id = item.id')
			.left_join('wiprocurement.bom_stage_version', 'stage', 'stage.id = item.version_id')
			.left_join('wiprocurement.bom_projects', 'project', 'stage.bom_id = project.id')
			.where('project.product_type = ?', 'NB')
			.where('partlist.formate = ?', 'housing-metal')
			.where('partlist.partlist_value::text <> ?::text', '{}')
			.order('project_id', false)
		
		// console.log(`::::${sql.toString()}:::`)

    const res = await systemDB.Query(sql.toParam())
    return res.rows
	}
	
  static async getPartlistByItem(id) {
		// SELECT id, partlist_value, bom_item_id, update_time, create_time, partlist_price, formate, image_value, partlist_amount
		// FROM wiprocurement.bom_partlist_value
		// WHERE bom_item_id = '7a965fa6-8eb4-11ea-abbb-0242ac110003';

		const sql = squel.select()
			.field('partlist_value')
			.from('wiprocurement.bom_partlist_value')
			.where('bom_item_id = ?', id)

    const res = await systemDB.Query(sql.toParam())
		return res.rows[0]
  }
  static async updatePartlistByItem(id, newData) {
		const sql = squel.update()
			.table('bom_partlist_value')
			.set('partlist_value', JSON.stringify(newData))
			.set('update_time', moment().utc().format())
			.where('bom_item_id = ?', id)
			.returning('*')
    let res = await systemDB.Query(sql.toParam())
		return res.rows
	}
	
	static async searchProject({ productType = null, format = null, isEMDM = null, page = 1, offset = 100, order = 'project_id', asc = false }) {
		// SELECT item.id AS bom_item_id, item.part_name, stage.version_name,
		// project.id AS project_id, project.project_source, project.project_name, project.product_type, 
		// partlist.formate, pc1.category_name AS ctgy1 , pc2.category_name AS ctgy2
		// FROM wiprocurement.bom_item AS item
		// INNER JOIN wiprocurement.bom_partlist_value AS partlist ON partlist.bom_item_id = item.id
		// LEFT JOIN wiprocurement.bom_stage_version AS stage ON stage.id = item.version_id
		// LEFT JOIN wiprocurement.bom_projects AS project ON stage.bom_id = project.id
		// LEFT JOIN wiprocurement.bom_partlist_config AS pconfig ON pconfig.parts_ctgy_1 = item.parts_ctgy_1 AND pconfig.parts_ctgy_2 = item.parts_ctgy_2 
		// INNER JOIN wiprocurement.bom_partlist_format AS pformat ON pconfig.format = pformat.id AND hasui = TRUE 
		// INNER JOIN formula.part_category_1 AS pc1 ON pc1.id = pconfig.parts_ctgy_1 
		// INNER JOIN formula.part_category_2 AS pc2 ON pc2.id = pconfig.parts_ctgy_2 
		// WHERE project.product_type = 'DT'
		// --AND pc1.category_name = 'Housing'
		// --AND pc2.category_name = 'HDD_SSD_BKT'
		// AND partlist.formate = 'housing-metal'
		// AND project.project_source = 'EMDM' 
		// AND partlist.partlist_value::text <> '{}'::text
		// ORDER BY project.product_type ASC, pc2.category_name ASC, project.id DESC 
		let sql = squel.select()
			.field('project.id', 'project_id')
			.field('project.project_source')
			.field('project.project_name')
			.field('project.product_type')
			.field('item.id', 'bom_item_id')
			.field('item.part_name')
			.field('item.parts_ctgy_1')
			.field('item.parts_ctgy_2')
			.field('stage.version_name')
			.field('partlist.formate')
			.field('pc1.category_name', 'ctgy1')
			.field('pc2.category_name', 'ctgy2')
			// .field('partlist.partlist_value')
			// .field('partlist.partlist_price')
			.from('wiprocurement.bom_item', 'item')
			.join('wiprocurement.bom_partlist_value', 'partlist', 'partlist.bom_item_id = item.id')
			.left_join('wiprocurement.bom_stage_version', 'stage', 'stage.id = item.version_id')
			.left_join('wiprocurement.bom_projects', 'project', 'stage.bom_id = project.id') 
			.left_join('wiprocurement.bom_partlist_config', 'pconfig', 'pconfig.parts_ctgy_1 = item.parts_ctgy_1 AND pconfig.parts_ctgy_2 = item.parts_ctgy_2 ')
			.join('wiprocurement.bom_partlist_format', 'pformat', 'pconfig.format = pformat.id AND hasui = TRUE')
			.join('formula.part_category_1', 'pc1', 'pc1.id = pconfig.parts_ctgy_1')
			.join('formula.part_category_2', 'pc2', 'pc2.id = pconfig.parts_ctgy_2')
			.where('partlist.partlist_value::text <> ?::text', '{}')
			.order(order, String(asc).toUpperCase() === 'TRUE')

		
		if (productType) {
			sql = sql.where('project.product_type = ?', productType)
		}

		if (format) {
			sql = sql.where('partlist.formate = ?', format)
		}

		if (isEMDM !== null) {
			if (String(isEMDM).toUpperCase() === 'TRUE') {
				sql = sql.where('project.project_source = ? ', 'EMDM')
			} else {
				sql = sql.where('project.project_source ISNULL')
			}
		}

		// 總資料筆數
		const sqlCnt = squel.select().field('count(1)', 'cnt').from(sql, 'countList')
		const resCount = await systemDB.Query(sqlCnt.toParam())

		// 分頁
		sql.offset((Number(page) - 1) * offset)
		sql.limit(offset)
		const res = await systemDB.Query(sql.toParam())
		return {
			count: resCount.rows.length ? resCount.rows[0]['cnt'] : 0,
			list: res.rows.length ? res.rows : []
		}
	}

	static async getFormats() {
		let sql = squel.select()
			.field('format_key')
			.from('wiprocurement.bom_partlist_format')
			.where('hasui = TRUE')
			.order('format_key', true)
		
		const res = await systemDB.Query(sql.toParam())
		return res.rows
	}
	static async getProductTypes() {
		let sql = squel.select()
			.field('product_type_me', 'product_type')
			.from('wiprocurement.perm_product_type_me')
			.where('emplid = ?', '10700001')
			.order('product_type', true)
		
		const res = await systemDB.Query(sql.toParam())
		return res.rows
	}
	
}


module.exports = Test
