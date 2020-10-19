CREATE OR REPLACE VIEW wiprocurement.sap_info_record
AS SELECT na.bmatn,
    na.matnr,
    na.infnr,
    na.lifnr,
    na.mfrnr,
    na.mfrpn,
    a.ekorg,
    a.datbi,
    a.datab,
    a.knumh,
    a.kbetr,
    a.konwa,
    a.kpein,
    a.kumza,
    a.kumne
   FROM wiprocurement.eina na
     JOIN wiprocurement.a018_konp a ON na.matnr::text = a.matnr::text AND na.lifnr::text = a.lifnr::text
  ORDER BY na.matnr, na.infnr, a.ekorg, a.datbi DESC;