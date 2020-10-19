CREATE OR REPLACE FUNCTION add_col ()
  RETURNS void AS
$func$
BEGIN
   IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS
               WHERE table_schema='wiprocurement' AND table_name='pcb'  AND column_name='part_number') THEN
      RAISE NOTICE 'Table wiprocurement.pcb already exists.';
   ELSE
      ALTER TABLE wiprocurement.pcb ADD COLUMN part_number varchar(64);
   END IF;
END
$func$  LANGUAGE plpgsql;
SELECT add_col();

