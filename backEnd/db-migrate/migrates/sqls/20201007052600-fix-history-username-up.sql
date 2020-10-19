/* Replace with your SQL commands */

ALTER TABLE wiprocurement.bom_project_edit_history
  ADD COLUMN IF NOT EXISTS name_a  varchar;

UPDATE wiprocurement.bom_project_edit_history
SET name_a = subquery.name_a
from (select name_a, emplid from wiprocurement."user" ) as subquery
where user_id=subquery.emplid;


ALTER TABLE wiprocurement.bom_project_edit_history DROP CONSTRAINT IF EXISTS bom_project_edit_history_user_id_fkey;
ALTER TABLE wiprocurement.bom_user_favorite DROP CONSTRAINT IF EXISTS bom_user_favorite_user_id_fkey;

