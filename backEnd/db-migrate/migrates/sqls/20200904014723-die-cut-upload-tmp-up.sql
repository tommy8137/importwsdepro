CREATE TABLE formula.material_price_diecut_upload_tmp(
  uploadId            uuid Not null,
  sheetName           varchar,
  partCategory2Name   varchar,
  materialSpec        varchar,
  material            varchar,
  next                numeric,
  newName             varchar,
  partCategory2Id     uuid,
  materialSpecId      uuid,
  materialId          uuid,
  pass                bool,
  create_time         timestamptz NULL DEFAULT now()
)
