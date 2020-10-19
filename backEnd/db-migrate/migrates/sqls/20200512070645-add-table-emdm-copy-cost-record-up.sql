CREATE table if not exists wiprocurement.emdm_copy_cost_record (
	bom_id int4 not null,
	from_bom_id int4 not NULL,
	from_cost_version varchar(5) not null,
	create_time timestamptz not null default now(),
	CONSTRAINT emdm_copy_cost_record_pk PRIMARY KEY (bom_id)
);
-- 根據原始規則建立舊資料 相同 project_code site stage 往回一個emdm版本 且 cost_version 不是'0.0'版
insert into wiprocurement.emdm_copy_cost_record (bom_id, from_bom_id, from_cost_version)
select from_project.id, to_project.id, to_project.version_name
from
(
	select a.id, a.project_code, a.site, a.stage_name, max(cast(b.source_version as numeric)):: text as source_version
	from
	(select bp.id, bp.project_code, bp.site, bs.stage_name, bp.source_version, bv.version_name from wiprocurement.bom_projects bp
	left join (
	  select a.* from wiprocurement.bom_stage_version a,
	  (
	    select bsv.bom_id, max(bsv.create_time) as create_time from wiprocurement.bom_stage_version bsv group by bsv.bom_id
	  ) b
	  where a.bom_id = b.bom_id and a.create_time = b.create_time
	) bv on bp.id = bv.bom_id
	left join wiprocurement.bom_stage bs on bs.id::text = bv.stage_id
	where bp.project_source = 'EMDM'
	and bv.version_name != '0.0'
	order by source_version desc) a,
	(select bp.id, bp.project_code, bp.site, bs.stage_name, bp.source_version, bv.version_name from wiprocurement.bom_projects bp
	left join (
	  select a.* from wiprocurement.bom_stage_version a,
	  (
	    select bsv.bom_id, max(bsv.create_time) as create_time from wiprocurement.bom_stage_version bsv group by bsv.bom_id
	  ) b
	  where a.bom_id = b.bom_id and a.create_time = b.create_time
	) bv on bp.id = bv.bom_id
	left join wiprocurement.bom_stage bs on bs.id::text = bv.stage_id
	where bp.project_source = 'EMDM'
	order by source_version desc) b
	where b.project_code = a.project_code and b.site = a.site and b.stage_name = a.stage_name and cast(b.source_version as numeric) < cast(a.source_version as numeric)
	group by (a.id, a.project_code, a.site, a.stage_name)
) as from_project,
(
	select bp.id, bp.project_code, bp.site, bs.stage_name, bp.source_version, bv.version_name from wiprocurement.bom_projects bp
	left join (
	  select a.* from wiprocurement.bom_stage_version a,
	  (
	    select bsv.bom_id, max(bsv.create_time) as create_time from wiprocurement.bom_stage_version bsv group by bsv.bom_id
	  ) b
	  where a.bom_id = b.bom_id and a.create_time = b.create_time
	) bv on bp.id = bv.bom_id
	left join wiprocurement.bom_stage bs on bs.id::text = bv.stage_id
	where bp.project_source = 'EMDM'
	order by source_version desc
) as to_project
where from_project.project_code = to_project.project_code
and from_project.site = to_project.site
and from_project.stage_name = to_project.stage_name
and from_project.source_version = to_project.source_version
and to_project.version_name != '0.0'
on conflict do nothing;