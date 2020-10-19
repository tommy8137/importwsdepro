
delete from formula.parameter_value where parameter_id = (select id from  formula.common_parameter where formula_type_id = (select id from formula.formula_type where name='me_others_screw') and part_type='me_others_screw_molding' and label='lathe_unit_price');
delete from formula.parameter_value where parameter_id = (select id from  formula.common_parameter where formula_type_id = (select id from formula.formula_type where name='me_others_screw') and part_type='me_others_screw_molding' and label='lathe_capacity');
delete from formula.parameter_value where parameter_id = (select id from  formula.common_parameter where formula_type_id = (select id from formula.formula_type where name='me_others_screw') and part_type='me_others_screw_molding' and label='lathe_loss_rate');


delete from  formula.common_parameter where formula_type_id = (select id from formula.formula_type where name='me_others_screw') and part_type='me_others_screw_molding' and label='lathe_unit_price';
delete from  formula.common_parameter where formula_type_id = (select id from formula.formula_type where name='me_others_screw') and part_type='me_others_screw_molding' and label='lathe_capacity';
delete from  formula.common_parameter where formula_type_id = (select id from formula.formula_type where name='me_others_screw') and part_type='me_others_screw_molding' and label='lathe_loss_rate';


--dependence chage by file ME Input BOM_ME_112119.xlsm
delete from wiprocurement.col_dependence where col_val = (select id::varchar from formula.part_category_2 where category_name='Standoff') 
and required_col_id = (select id from wiprocurement.col_definite where used_by = 'bom_item' and col_key='part_size_ef' );

delete from wiprocurement.col_dependence where col_val = (select id::varchar from formula.part_category_2 where category_name='Screw') 
and required_col_id = (select id from wiprocurement.col_definite where used_by = 'bom_item' and col_key='part_size_ef' );

delete from wiprocurement.col_dependence where col_val = (select id::varchar from formula.part_category_2 where category_name='Nut') 
and required_col_id = (select id from wiprocurement.col_definite where used_by = 'bom_item' and col_key='part_size_ef' );

delete from wiprocurement.col_dependence where col_val = (select id::varchar from formula.part_category_2 where category_name='Lens');

--magnet_material
ALTER TABLE formula.magnet_material ADD part_category_2_id uuid;
UPDATE formula.magnet_material set part_category_2_id = (
select b.id
	from formula.part_category_1 a inner join formula.part_category_2 b on a.id = b.part_category_1_id
	where a.category_name='EMC' and b.category_name='Magnet'
);
ALTER TABLE formula.magnet_material ALTER COLUMN part_category_2_id SET NOT NULL;
ALTER TABLE formula.magnet_material ADD CONSTRAINT magnet_material_fk FOREIGN KEY (part_category_2_id) REFERENCES formula.part_category_2(id);

--magnet_material
INSERT INTO formula.magnet_material(id, material_name, remark, create_time, disable_time, part_category_2_id)VALUES(uuid_generate_v1(), 'N48H磁鋼', null, now(), null, (select id from formula.part_category_2 where category_name='Magnet') );
INSERT INTO formula.magnet_material(id, material_name, remark, create_time, disable_time, part_category_2_id)VALUES(uuid_generate_v1(), 'N52H磁鋼', null, now(), null, (select id from formula.part_category_2 where category_name='Magnet') );

INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.magnet_material WHERE (material_name = 'N48H磁鋼')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 35.81, 'number', 'magnet_material', now());
INSERT INTO formula.parameter_value (parameter_id, activate_date_id, value, value_type, source_table, create_time) VALUES ((SELECT id FROM formula.magnet_material WHERE (material_name = 'N52H磁鋼')), (SELECT id FROM formula.schedule_date WHERE (formula_type_id= (SELECT id FROM formula.formula_type WHERE (name= 'emc_magnet' )) ) AND (name = 'emc_magnet_init')), 35.81, 'number', 'magnet_material', now());

update formula.magnet_material set material_name='Nd-Fe-B N48' where material_name='N48磁鋼';
update formula.magnet_material set material_name='Nd-Fe-B N52' where material_name='N52磁鋼';
update formula.magnet_material set material_name='Nd-Fe-B N48H' where material_name='N48H磁鋼';
update formula.magnet_material set material_name='Nd-Fe-B N52H' where material_name='N52H磁鋼';

--view
CREATE OR REPLACE VIEW formula.v_me_bom_materialspec_and_material_value
AS SELECT a.part_cate1_id,
    a.part_cate1_name,
    a.part_cate2_id,
    a.part_cate2_name,
    a.material_spec_id,
    a.material_spec_name,
    a.material_id,
    a.material_name
   FROM ( SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate2_id,
            b.part_cate2_name,
            c.material_spec_id,
            c.material_spec_name,
            c.material_id,
            c.material_name
           FROM formula.part_category_material a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name
                   FROM formula.part_category_1 a_2
                     JOIN formula.part_category_2 b_1 ON a_2.id = b_1.part_category_1_id) b ON a_1.part_category_2_id = b.part_cate2_id
             JOIN ( SELECT a_2.id AS material_spec_id,
                    a_2.material_spec_name,
                    b_1.id AS material_id,
                    b_1.material_name
                   FROM formula.material_spec a_2
                     JOIN formula.material b_1 ON a_2.id = b_1.material_spec_id) c ON a_1.material_id = c.material_id
        UNION ALL
         SELECT c.part_cate1_id,
            c.part_cate1_name,
            c.part_cate2_id,
            c.part_cate2_name,
            a_1.id AS material_spec_id,
            a_1.material_spec_name,
            b.id AS material_id,
            b.material_name
           FROM formula.diecut_material_spec a_1
             JOIN formula.diecut_material b ON a_1.id = b.diecut_material_spec_id
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name
                   FROM formula.part_category_1 a_2
                     JOIN formula.part_category_2 b_1 ON a_2.id = b_1.part_category_1_id) c ON a_1.part_category_2_id = c.part_cate2_id
        UNION ALL
         SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate2_id,
            b.part_cate2_name,
            c.id AS material_spec_id,
            c.name AS material_spec_name,
            NULL::uuid AS material_id,
            NULL::character varying AS material_name
           FROM formula.part_category_material_metal a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name
                   FROM formula.part_category_1 a_2
                     JOIN formula.part_category_2 b_1 ON a_2.id = b_1.part_category_1_id) b ON a_1.pategory_category_2_id = b.part_cate2_id
             JOIN formula.material_metal c ON a_1.material_metal_id = c.id
        UNION ALL
         SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate2_id,
            b.part_cate2_name,
            a_1.id AS material_spec_id,
            a_1.material_name AS material_spec_name,
            NULL::uuid AS material_id,
            NULL::character varying AS material_name
           FROM formula.cablefpc_material a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name
                   FROM formula.part_category_1 a_2
                     JOIN formula.part_category_2 b_1 ON a_2.id = b_1.part_category_1_id) b ON a_1.part_category_2_id = b.part_cate2_id
        UNION ALL
         SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate2_id,
            b.part_cate2_name,
            a_1.id AS material_spec_id,
            a_1.material_name AS material_spec_name,
            NULL::uuid AS material_id,
            NULL::character varying AS material_name
           FROM formula.magnet_material a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name
                   FROM formula.part_category_1 a_2
                     JOIN formula.part_category_2 b_1 ON a_2.id = b_1.part_category_1_id) b ON a_1.part_category_2_id = b.part_cate2_id
        UNION ALL
         SELECT c.part_cate1_id,
            c.part_cate1_name,
            c.part_cate2_id,
            c.part_cate2_name,
            a_1.id AS material_spec_id,
            a_1.spec_name AS material_sepc_name,
            b.id AS material_id,
            b.material_name
           FROM formula.rubber_material_spec a_1
             JOIN formula.rubber_material b ON a_1.id = b.spec_id
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name
                   FROM formula.part_category_1 a_2
                     JOIN formula.part_category_2 b_1 ON a_2.id = b_1.part_category_1_id) c ON a_1.part_category_2_id = c.part_cate2_id
        UNION ALL
         SELECT b.part_cate1_id,
            b.part_cate1_name,
            b.part_cate2_id,
            b.part_cate2_name,
            a_1.id AS material_spec_id,
            a_1.material_name AS material_sepc_name,
            NULL::uuid AS material_id,
            NULL::character varying AS material_name
           FROM formula.turning_material a_1
             JOIN ( SELECT a_2.id AS part_cate1_id,
                    a_2.category_name AS part_cate1_name,
                    b_1.id AS part_cate2_id,
                    b_1.category_name AS part_cate2_name
                   FROM formula.part_category_1 a_2
                     JOIN formula.part_category_2 b_1 ON a_2.id = b_1.part_category_1_id) b ON a_1.part_category_2_id = b.part_cate2_id) a;