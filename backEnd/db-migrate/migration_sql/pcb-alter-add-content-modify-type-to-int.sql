ALTER TABLE wiprocurement.pcb ALTER COLUMN type TYPE INTEGER USING type::integer;

CREATE OR REPLACE FUNCTION add_col ()
  RETURNS void AS
$func$
BEGIN
   IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS
               WHERE table_schema='wiprocurement' AND table_name='pcb'  AND column_name='content') THEN
      RAISE NOTICE 'Table wiprocurement.pcb already exists.';
   ELSE
      ALTER TABLE wiprocurement.pcb ADD COLUMN content varchar(800);
   END IF;
END
$func$  LANGUAGE plpgsql;
SELECT add_col();

CREATE OR REPLACE FUNCTION add_create_time ()
  RETURNS void AS
$func$
BEGIN
   IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS
               WHERE table_schema='wiprocurement' AND table_name='pcb'  AND column_name='create_time') THEN
      RAISE NOTICE 'Table wiprocurement.pcb already exists.';
   ELSE
       ALTER TABLE wiprocurement.pcb ADD COLUMN create_time timestamp with time zone DEFAULT now();
   END IF;
END
$func$  LANGUAGE plpgsql;

SELECT add_create_time();

CREATE OR REPLACE FUNCTION add_update_time ()
  RETURNS void AS
$func$
BEGIN
   IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS
               WHERE table_schema='wiprocurement' AND table_name='pcb'  AND column_name='update_time') THEN
      RAISE NOTICE 'Table wiprocurement.pcb already exists.';
   ELSE
       ALTER TABLE wiprocurement.pcb ADD COLUMN update_time timestamp with time zone DEFAULT now();
   END IF;
END
$func$  LANGUAGE plpgsql;
SELECT add_update_time();
