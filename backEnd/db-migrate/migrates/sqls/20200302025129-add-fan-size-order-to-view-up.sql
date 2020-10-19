CREATE OR REPLACE VIEW formula.v_thermal_fan_size
AS SELECT tf.id,
    tf.fan_size AS name,
    tf.disable_time,
    tf.sort_order
   FROM formula.thermal_fan tf;

-- Permissions

ALTER TABLE formula.v_thermal_fan_size OWNER TO "swpc-user";
GRANT ALL ON TABLE formula.v_thermal_fan_size TO "swpc-user";
GRANT SELECT ON TABLE formula.v_thermal_fan_size TO emdm;