/* Replace with your SQL commands */

CREATE OR REPLACE FUNCTION wiprocurement.fn_get_ee_type()
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
    #variable_conflict use_variable
    DECLARE
        curtime timestamp := now();
        data_count integer;
    BEGIN
INSERT INTO wiprocurement.ee_assignment(type1,type2)
select distinct et1.type1name, et2.type2name from wiprocurement.epur_itemtype ei
left join wiprocurement.epur_type1 et1 on ei.type1id = et1.type1id and et1.lvalid != '0'
left join wiprocurement.epur_type2 et2 on ei.type2id = et2.type2id and et2.lvalid != '0'
where et1.type1name is not null and et2.type2name is not null
ON CONFLICT ON CONSTRAINT ee_assignment_pkey DO NOTHING;
GET DIAGNOSTICS data_count = ROW_COUNT;
    RETURN data_count;
--  EXCEPTION
--    WHEN unique_violation
--    THEN NULL;
    END;
$function$
;

delete from wiprocurement.ee_assignment ea where ea.type1 in ('Others','Software');
delete from wiprocurement.ee_assignment ea where ea.type2 in ('Camera','Combo Card','Converter','DISPLAY PORT','DPAK','Diffuser film','Diode','Dual 5x6','ESD Array','ESD Single','Filter','Glue','L6 System','Lens','Mesh','Metal dome','Niche','Nut','POL','POWER EDGE','PPAK22','PPAK33','PPAK56','Prism','Reflector','Rubber','SO8','SOT23','SOT363','Screw','Sensor','Spring','Standoff','Surge Arrey','Surge Single','TSOP6','Transistor NPN','Transistor PNP','VGA','Waterproof film');
