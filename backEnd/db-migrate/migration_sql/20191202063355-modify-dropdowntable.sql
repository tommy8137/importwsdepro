-- MEothers
 -- Non_Woven_of_Mylar_Sponge_Poron
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), '非阻燃黑色不織布', 'MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.FZRHSBZB', 'material_spec', 'bom_item', now());
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), '阻燃黑色不織布', 'MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.ZRHSBZB', 'material_spec', 'bom_item', now());

	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.T025';
	
	
	--非阻燃黑色不織布
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'T0.25Non_Woven', 'MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.FZRHSBZB.T025_NON_WOVEN', 'material', 'bom_item', now());
	
	--阻燃黑色不織布
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'T0.25Non_Woven', 'MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.ZRHSBZB.T025_NON_WOVEN', 'material', 'bom_item', now());
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'T0.35Non_Woven', 'MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.ZRHSBZB.T035_NON_WOVEN', 'material', 'bom_item', now());
	
	--修改 非阻燃黑色不織布 舊資料 material
	update wiprocurement.bom_item set material= (select id from wiprocurement.drop_down_item where 
	path='MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.FZRHSBZB.T025_NON_WOVEN') 
	where material=(select id from wiprocurement.drop_down_item where path='MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.T025.FZRHSBZB'); 
	
	--修改 非阻燃黑色不織 阻燃黑色不織布 舊資料 material_spec
	update wiprocurement.bom_item set material_spec = (select id from wiprocurement.drop_down_item where path='MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.FZRHSBZB') 
	where material=(select id from wiprocurement.drop_down_item where path='MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.FZRHSBZB.T025_NON_WOVEN');  
	
	--修改 阻燃黑色不織布 舊資料 material
	update wiprocurement.bom_item set material= (select id from wiprocurement.drop_down_item where 
	path='MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.ZRHSBZB.T025_NON_WOVEN') 
	where material=(select id from wiprocurement.drop_down_item where path='MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.T025.ZRHSBZB'); 
	
	
	--修改 阻燃黑色不織布 舊資料 material_spec
	update wiprocurement.bom_item set material_spec = (select id from wiprocurement.drop_down_item where path='MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.ZRHSBZB') 
	where material=(select id from wiprocurement.drop_down_item where path='MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.ZRHSBZB.T025_NON_WOVEN');

	
 -- Sponge_of_Mylar_Sponge_Poron
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T4';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T4P5';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T5';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T0P2';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T0P3';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T0P4';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T0P5';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T0P6';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T0P7';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T0P8';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T0P9';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T1';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T1P5';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T2';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T2P5';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T3';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.T3P5';
 
 
 -- Mylar_of_Mylar_Sponge_Poron
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.T0P05';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.T0P075';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.T0P1';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.T0P125';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.T0P175';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.T0P188';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.T0P25';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.T0P38';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.T0P43';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.T0P5';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.T0P76';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.T1';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.T0P8';
	
 -- Adhesive_of_Mylar_Sponge_Poron
 	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.ADHES.T0P05';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.ADHES.T0P07';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.ADHES.T0P13';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.ADHES.T0P15';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.ADHES.T0P2';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.ADHES.T0P25';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.ADHES.T0P3';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.ADHES.T0P64';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.ADHES.T0P7';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.T0P76';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.ADHES.T0P8';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.ADHES.T0P4';
	
 -- Protection_Film_of_Mylar_Sponge_Poron 
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.PROTE.T0P075';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.PROTE.T0P1';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.PROTE.T0P05';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.PROTE.T0P06';
	
 -- Acetate_Tape_of_Mylar_Sponge_Poron

	-- INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    -- VALUES(uuid_generate_v1(), '阻燃醋酸膠布', 'MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.ZRCSJB', 'material_spec', 'bom_item', now());
	-- INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    -- VALUES(uuid_generate_v1(), '非阻燃醋酸膠布', 'MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.FZRCSJB', 'material_spec', 'bom_item', now());
	
	-- 新增material
	
	--阻燃醋酸膠布
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'T0.25Acetate', 'MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.ZRCSJB.T025_ZRCSJB', 'material', 'bom_item', now());
	
	--非阻燃醋酸膠布
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'T0.12Acetate', 'MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.FZRCSJB.T012_FZRCSJB', 'material', 'bom_item', now());
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'T0.25Acetate', 'MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.FZRCSJB.T025_FZRCSJB', 'material', 'bom_item', now());
	
	update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.T025';
	
	--修改舊資料 material
	update wiprocurement.bom_item set material= (select id from wiprocurement.drop_down_item where 
	path='MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.FZRCSJB.T025_FZRCSJB') 
	where material=(select id from wiprocurement.drop_down_item where path='MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.T025.FZRCSJB'); 
	
	update wiprocurement.bom_item set material= (select id from wiprocurement.drop_down_item where 
	path='MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.ZRCSJB.T025_ZRCSJB') 
	where material=(select id from wiprocurement.drop_down_item where path='MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.T025.ZRCSJB'); 
	
	--修改舊資料 material_spec
	update wiprocurement.bom_item set material_spec = (select id from wiprocurement.drop_down_item where 
	path='MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.FZRCSJB') 
	where material=(select id from wiprocurement.drop_down_item where path='MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.FZRCSJB.T025_FZRCSJB');  
	
	update wiprocurement.bom_item set material_spec = (select id from wiprocurement.drop_down_item where 
	path='MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.ZRCSJB') 
	where material=(select id from wiprocurement.drop_down_item where path='MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.ZRCSJB.T025_ZRCSJB');  
 
-- EMC 
 -- Absorber 
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.ABSOR.T0P1';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.ABSOR.T0P15';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.ABSOR.T0P2';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.ABSOR.T0P25';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.ABSOR.T0P3';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.ABSOR.T0P35';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.ABSOR.T0P55';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.ABSOR.T1';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.ABSOR.T2P5';
	
 -- Conductive_tape 僅留下Non_UL導電布灰、UL導電布灰、UL導電布黑、Other_Fill_ME_Remark
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.CONDU.T0085';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.CONDU.T013';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.CONDU.NUGRAYT0085';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.CONDU.UGRAYT013';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.CONDU.NUGRAYT013';
	update wiprocurement.drop_down_item set item_name='UL導電布黑' where path = 'EMC2.CONDU.UBLACKT013';
	update wiprocurement.drop_down_item set item_name='Non_UL導電布黑' where path = 'EMC2.CONDU.NUBLACKT013';

	--Non_UL導電布灰
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'Other_Fill_ME_Remark', 'EMC2.CONDU.NON_ULGRAYCLOTH.OTHER_FILL_ME_REMARK', 'material', 'bom_item', now());
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'T0.085', 'EMC2.CONDU.NON_ULGRAYCLOTH.T0085', 'material', 'bom_item', now());
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'T0.13', 'EMC2.CONDU.NON_ULGRAYCLOTH.T013', 'material', 'bom_item', now());

	--UL導電布灰
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'Other_Fill_ME_Remark', 'EMC2.CONDU.ULGRAYCLOTH.OTHER_FILL_ME_REMARK', 'material', 'bom_item', now());
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'T0.13', 'EMC2.CONDU.ULGRAYCLOTH.T013', 'material', 'bom_item', now());

	--UL導電布黑
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'Other_Fill_ME_Remark', 'EMC2.CONDU.UBLACKT013.OTHER_FILL_ME_REMARK', 'material', 'bom_item', now());
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'T0.13', 'EMC2.CONDU.UBLACKT013.T013', 'material', 'bom_item', now());

	--Non_UL導電布黑
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'Other_Fill_ME_Remark', 'EMC2.CONDU.NUBLACKT013.OTHER_FILL_ME_REMARK', 'material', 'bom_item', now());
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'T0.13', 'EMC2.CONDU.NUBLACKT013.T013', 'material', 'bom_item', now());

	update wiprocurement.drop_down_item set disable_time = now() where path='MEOTHERS.MYLAR_SPONGE_PORON';
	
	--ULGasket灰
	update wiprocurement.drop_down_item set disable_time = now() where path='EMC2.GASKE.ULGASKETG';
	
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'Other_Fill_ME_Remark', 'EMC2.GASKE.ULGasket_GRAY.OTHER_FILL_ME_REMARK', 'material', 'bom_item', now());
	
	update wiprocurement.bom_item set material_spec = (select id from wiprocurement.drop_down_item where path='EMC2.GASKE.ULGasket_GRAY')
	where material_spec = (select id from wiprocurement.drop_down_item where path='EMC2.GASKE.EMC2.GASKE.ULGASKETG');
	
	--Non_ULGasket灰
	update wiprocurement.drop_down_item set disable_time = now() where path='EMC2.GASKE.NON_ULGASKETG';
	
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'Other_Fill_ME_Remark', 'EMC2.GASKE.Non_ULGasket_GRAY.OTHER_FILL_ME_REMARK', 'material', 'bom_item', now());
	
	update wiprocurement.bom_item set material_spec = (select id from wiprocurement.drop_down_item where path='EMC2.GASKE.Non_ULGasket_GRAY')
	where material_spec = (select id from wiprocurement.drop_down_item where path='EMC2.GASKE.EMC2.GASKE.NON_ULGASKETG');
	
	
	--ULGasket黑
	update wiprocurement.drop_down_item set disable_time = now() where path='EMC2.GASKE.ULGASKETB';
	
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'Other_Fill_ME_Remark', 'EMC2.GASKE.ULGasket_BLACK.OTHER_FILL_ME_REMARK', 'material', 'bom_item', now());
	
	update wiprocurement.bom_item set material_spec = (select id from wiprocurement.drop_down_item where path='EMC2.GASKE.ULGasket_BLACK')
	where material_spec = (select id from wiprocurement.drop_down_item where path='EMC2.GASKE.ULGASKETB');
	
	--Non_ULGasket黑
	update wiprocurement.drop_down_item set disable_time = now() where path='EMC2.GASKE.NON_ULGASKETB';
	INSERT INTO wiprocurement.drop_down_item(id, item_name, "path", field_name, layout_name, create_time)
    VALUES(uuid_generate_v1(), 'Other_Fill_ME_Remark', 'EMC2.GASKE.Non_ULGasket_BLACK.OTHER_FILL_ME_REMARK', 'material', 'bom_item', now());
	update wiprocurement.bom_item set material_spec = (select id from wiprocurement.drop_down_item where path='EMC2.GASKE.Non_ULGasket_BLACK')
	where material_spec = (select id from wiprocurement.drop_down_item where path='EMC2.GASKE.NON_ULGASKETB');
	
	--Non_UL_Eco_Form
	update wiprocurement.drop_down_item set disable_time = now() where path='EMC2.GASKE.NON_UL_ECO_FORM';
	update wiprocurement.bom_item set material_spec=(select id from  wiprocurement.drop_down_item where path='EMC2.GASKE.Non_UL_Eco_Form')
	where material_spec=(select id from wiprocurement.drop_down_item where path='EMC2.GASKE.NON_UL_ECO_FORM');

	--UL_Eco_Form
	update wiprocurement.drop_down_item set disable_time = now() where path='EMC2.GASKE.UL_ECO_FORM';
	update wiprocurement.bom_item set material_spec=(select id from  wiprocurement.drop_down_item where path='EMC2.GASKE.UL_Eco_Form')
	where material_spec=(select id from wiprocurement.drop_down_item where path='EMC2.GASKE.UL_ECO_FORM');

	update wiprocurement.drop_down_item set disable_time = now() where path='EMC2.GASKE.Other_Fill_ME_Remark';
	update wiprocurement.drop_down_item set disable_time = now() where path='EMC2.GASKE.OTHER_FILL_ME_REMARK';

	--AL_CU
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.AL_CU.T0P05';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.AL_CU.T0P06';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.AL_CU.T0P075';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.AL_CU.T0P1';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.AL_CU.T0P15';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.AL_CU.T0P2';
	update wiprocurement.drop_down_item set disable_time = now() where path = 'EMC2.AL_CU.T0P25';

	--ME_Other remark
	-- update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MYLAR.OTHER_FILL_ME_REMARK';
	-- update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.SPONG.OTHER_FILL_ME_REMARK';
	-- update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.ADHES.OTHER_FILL_ME_REMARK';
	-- update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.PROTE.OTHER_FILL_ME_REMARK';
	-- update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.ACETATE_TAPE_OF_MYLAR_SPONGE_PORON.OTHER_FILL_ME_REMARK';
	-- update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.NON_WOVEN_OF_MYLAR_SPONGE_PORON.OTHER_FILL_ME_REMARK';
	-- update wiprocurement.drop_down_item set disable_time = now() where path = 'MEOTHERS.MESH.OTHER_FILL_ME_REMARK';
