drop function if exists wiprocurement.temp_fn_nb_plastic_replacement;

CREATE OR REPLACE FUNCTION wiprocurement.temp_fn_nb_plastic_replacement()
 RETURNS void
 LANGUAGE plpgsql
AS $function$

    --#variable_conflict use_variable
    declare
	  plastic_item RECORD;
    begin
	  for plastic_item in (
		select
		bpv.id,
		case when bpv.partlist_value -> 'formData' -> 'CMFProcessList' -> 'cmfPPainting' ->> 'cmfPaintingAreaLW' is not null
			 then bpv.partlist_value -> 'formData' -> 'CMFProcessList' -> 'cmfPPainting' ->> 'cmfPaintingAreaLW'
			else '2'
		end as lw,
		case when bpv.partlist_value -> 'formData' -> 'CMFProcessList' -> 'cmfPPainting' ->> 'cmfPaintingAreaLH' is not null
			 then bpv.partlist_value -> 'formData' -> 'CMFProcessList' -> 'cmfPPainting' ->> 'cmfPaintingAreaLH'
			else '2'
		end as lh,
		case when bpv.partlist_value -> 'formData' -> 'CMFProcessList' -> 'cmfPPainting' ->> 'cmfPaintingAreaWH' is not null
			 then bpv.partlist_value -> 'formData' -> 'CMFProcessList' -> 'cmfPPainting' ->> 'cmfPaintingAreaWH'
			else '2'
		end as wh
		from wiprocurement.bom_partlist_value bpv
		left join wiprocurement.bom_item bi on bi.id = bpv.bom_item_id
		left join wiprocurement.bom_stage_version bsv on bi.version_id = bsv.id
		left join wiprocurement.bom_projects bp on bsv.bom_id = bp.id 
		where bpv.partlist_value -> 'formData' -> 'hpCeParametersTab' ->> 'hpCeParameters' is not null -- 找出有填的part list
		and bpv.partlist_value -> 'formData' -> 'hpCeParametersTab' -> 'hpCeParameters' ->> 'cmfPaintingAreaLW' is null
		and bpv.partlist_value -> 'formData' -> 'hpCeParametersTab' -> 'hpCeParameters' ->> 'cmfPaintingAreaLH' is null
		and bpv.partlist_value -> 'formData' -> 'hpCeParametersTab' -> 'hpCeParameters' ->> 'cmfPaintingAreaWH' is null
		and product_type in ('NB', 'VAD', 'VAD ACC', 'Smart Device')
		and bpv.formate = 'housing-plastic'
	  )
	  LOOP
	  	update wiprocurement.bom_partlist_value bpv
	  	set partlist_value = jsonb_set(bpv.partlist_value::jsonb, '{formData,hpCeParametersTab,hpCeParameters,cmfPaintingAreaLW}'::text[], plastic_item.lw::jsonb) ::json
	  	where bpv.id = plastic_item.id;
	  
	  	update wiprocurement.bom_partlist_value bpv
	  	set partlist_value = jsonb_set(bpv.partlist_value::jsonb, '{formData,hpCeParametersTab,hpCeParameters,cmfPaintingAreaLH}'::text[], plastic_item.lh::jsonb)::json
	  	where bpv.id = plastic_item.id;
	  
	  	update wiprocurement.bom_partlist_value bpv
	  	set partlist_value = jsonb_set(bpv.partlist_value::jsonb, '{formData,hpCeParametersTab,hpCeParameters,cmfPaintingAreaWH}'::text[], plastic_item.wh::jsonb)::json
	  	where bpv.id = plastic_item.id;

	  	update wiprocurement.bom_partlist_value bpv
	  	set partlist_value = (bpv.partlist_value::jsonb #- '{formData,CMFProcessList,cmfPPainting,cmfPaintingAreaLW}')::json
	  	where bpv.id = plastic_item.id;

	  	update wiprocurement.bom_partlist_value bpv
	  	set partlist_value = (bpv.partlist_value::jsonb #- '{formData,CMFProcessList,cmfPPainting,cmfPaintingAreaLH}')::json
	  	where bpv.id = plastic_item.id;

	  	update wiprocurement.bom_partlist_value bpv
	  	set partlist_value = (bpv.partlist_value::jsonb #- '{formData,CMFProcessList,cmfPPainting,cmfPaintingAreaWH}')::json
	  	where bpv.id = plastic_item.id;
	  end loop;
    END;  
    
$function$;

select wiprocurement.temp_fn_nb_plastic_replacement();

drop function if exists wiprocurement.temp_fn_nb_plastic_replacement;

-- ============================DT========================================

drop function if exists wiprocurement.temp_fn_dt_plastic_replacement;

CREATE OR REPLACE FUNCTION wiprocurement.temp_fn_dt_plastic_replacement()
 RETURNS void
 LANGUAGE plpgsql
AS $function$

    --#variable_conflict use_variable
    declare
	  plastic_item RECORD;
    begin
	  for plastic_item in (
		select
		bpv.id,
		case when bpv.partlist_value -> 'formData' -> 'CMFProcessList' -> 'cmfPPainting' ->> 'cmfPaintingAreaLW' is not null
			 then bpv.partlist_value -> 'formData' -> 'CMFProcessList' -> 'cmfPPainting' ->> 'cmfPaintingAreaLW'
			else '1'
		end as lw,
		case when bpv.partlist_value -> 'formData' -> 'CMFProcessList' -> 'cmfPPainting' ->> 'cmfPaintingAreaLH' is not null
			 then bpv.partlist_value -> 'formData' -> 'CMFProcessList' -> 'cmfPPainting' ->> 'cmfPaintingAreaLH'
			else '2'
		end as lh,
		case when bpv.partlist_value -> 'formData' -> 'CMFProcessList' -> 'cmfPPainting' ->> 'cmfPaintingAreaWH' is not null
			 then bpv.partlist_value -> 'formData' -> 'CMFProcessList' -> 'cmfPPainting' ->> 'cmfPaintingAreaWH'
			else '2'
		end as wh
		from wiprocurement.bom_partlist_value bpv
		left join wiprocurement.bom_item bi on bi.id = bpv.bom_item_id
		left join wiprocurement.bom_stage_version bsv on bi.version_id = bsv.id
		left join wiprocurement.bom_projects bp on bsv.bom_id = bp.id 
		where bpv.partlist_value -> 'formData' -> 'hpCeParametersTab' ->> 'hpCeParameters' is not null -- 找出有填的part list
		and bpv.partlist_value -> 'formData' -> 'hpCeParametersTab' -> 'hpCeParameters' ->> 'cmfPaintingAreaLW' is null
		and bpv.partlist_value -> 'formData' -> 'hpCeParametersTab' -> 'hpCeParameters' ->> 'cmfPaintingAreaLH' is null
		and bpv.partlist_value -> 'formData' -> 'hpCeParametersTab' -> 'hpCeParameters' ->> 'cmfPaintingAreaWH' is null
		and product_type in ('DT', 'AIO', 'VoIP', 'Server')
		and bpv.formate = 'housing-plastic'
	  )
	  LOOP
	  	update wiprocurement.bom_partlist_value bpv
	  	set partlist_value = jsonb_set(bpv.partlist_value::jsonb, '{formData,hpCeParametersTab,hpCeParameters,cmfPaintingAreaLW}'::text[], plastic_item.lw::jsonb) ::json
	  	where bpv.id = plastic_item.id;
	  
	  	update wiprocurement.bom_partlist_value bpv
	  	set partlist_value = jsonb_set(bpv.partlist_value::jsonb, '{formData,hpCeParametersTab,hpCeParameters,cmfPaintingAreaLH}'::text[], plastic_item.lh::jsonb)::json
	  	where bpv.id = plastic_item.id;
	  
	  	update wiprocurement.bom_partlist_value bpv
	  	set partlist_value = jsonb_set(bpv.partlist_value::jsonb, '{formData,hpCeParametersTab,hpCeParameters,cmfPaintingAreaWH}'::text[], plastic_item.wh::jsonb)::json
	  	where bpv.id = plastic_item.id;

	  	update wiprocurement.bom_partlist_value bpv
	  	set partlist_value = (bpv.partlist_value::jsonb #- '{formData,CMFProcessList,cmfPPainting,cmfPaintingAreaLW}')::json
	  	where bpv.id = plastic_item.id;

	  	update wiprocurement.bom_partlist_value bpv
	  	set partlist_value = (bpv.partlist_value::jsonb #- '{formData,CMFProcessList,cmfPPainting,cmfPaintingAreaLH}')::json
	  	where bpv.id = plastic_item.id;

	  	update wiprocurement.bom_partlist_value bpv
	  	set partlist_value = (bpv.partlist_value::jsonb #- '{formData,CMFProcessList,cmfPPainting,cmfPaintingAreaWH}')::json
	  	where bpv.id = plastic_item.id;
	  end loop;
    END;  
    
$function$;

select wiprocurement.temp_fn_dt_plastic_replacement();

drop function if exists wiprocurement.temp_fn_dt_plastic_replacement;