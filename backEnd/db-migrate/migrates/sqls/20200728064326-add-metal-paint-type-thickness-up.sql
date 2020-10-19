/* Replace with your SQL commands */

INSERT INTO formula.me_spec (spec_category, spec_name, spec_value)
SELECT 'metal_paint_thickness' as spec_category, x as spec_name, x as spec_value
FROM generate_series(60, 100) x where x != 80;


create table if not exists formula.metal_paint_type_and_thickness (
  id  uuid NOT NULL   DEFAULT uuid_generate_v1(),
  type_id   uuid NOT null   references formula.metal_paint_type(id),
  type_name    varchar,
  thickness_id   uuid NOT null,
  thickness   varchar,
  create_time   timestamptz default now(),
  disable_time   timestamptz null
);

insert into formula.metal_paint_type_and_thickness
(id, type_id, type_name, thickness_id, thickness, create_time, disable_time)
select
  uuid_generate_v1() as id,
  paint.id as type_id,
  paint.type_name as type_name,
  thickness.id as thickness_id,
  thickness.spec_value as thickness,
    now() as create_time,
    CASE
    WHEN (thickness.disable_time is null) and
      ((paint.type_name::text = 'Powder coating'::text and thickness.spec_value::text < 60::text and thickness.spec_value::text != '100') or
      (paint.type_name::text != 'Powder coating'::text and (thickness.spec_value::text >= 60::text or thickness.spec_value::text = '100' and thickness.spec_value::text <> 80::text) ))
      THEN '2020-07-28 00:00:01+08'::timestamp with time zone
    ELSE thickness.disable_time
    END AS disable_time
from
(SELECT * from formula.metal_paint_type) paint,
(select * from formula.me_spec ms where ms.spec_category = 'metal_paint_thickness') thickness
order by paint.type_name, thickness.spec_value;


create view formula.v_metal_paint_type_and_thickness AS
  SELECT * FROM formula.metal_paint_type_and_thickness;

ALTER TABLE formula.v_metal_paint_type_and_thickness OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_metal_paint_type_and_thickness TO "swpc-user";
