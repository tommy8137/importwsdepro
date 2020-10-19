CREATE TABLE IF NOT EXISTS wiprocurement.eina (
  ZCRTDAT               date,
  ZCRTTIM               time,
  MANDT                 varchar(3),
  INFNR                 varchar(10),
  MATNR                 varchar(18),
  MATKL                 varchar(9),
  LIFNR                 varchar(10),
  LOEKZ                 varchar(1),
  ERDAT                 date,
  ERNAM                 varchar(12),
  TXZ01                 varchar(40),
  SORTL                 varchar(10),
  MEINS                 text, --unit
  UMREZ                 decimal(5),
  UMREN                 decimal(5),
  IDNLF                 varchar(35),
  VERKF                 varchar(30),
  TELF1                 varchar(16),
  MAHN1                 decimal(3),
  MAHN2                 decimal(3),
  MAHN3                 decimal(3),
  URZNR                 varchar(10),
  URZDT                 date,
  URZLA                 varchar(3),
  URZTP                 varchar(1),
  URZZT                 varchar(16),
  LMEIN                 text, --unit
  REGIO                 varchar(3),
  VABME                 varchar(1),
  LTSNR                 varchar(6),
  LTSSF                 numeric,
  WGLIF                 varchar(18),
  RUECK                 varchar(2),
  LIFAB                 date,
  LIFBI                 date,
  KOLIF                 varchar(10),
  ANZPU                 decimal(13,3),
  PUNEI                 text, --unit
  RELIF                 varchar(1),
  MFRNR                 varchar(10),
  BMATN                 varchar(18),
  MFRPN                 varchar(40),
  primary key (MANDT, INFNR)
);
CREATE INDEX idx_eina_bmatn ON wiprocurement.eina (bmatn);
CREATE INDEX idx_eina_MFRNR ON wiprocurement.eina (MFRNR);
CREATE INDEX IDX_eina_infnr ON wiprocurement.eina (infnr);
CREATE INDEX IDX_eina_zcrtdat ON wiprocurement.eina (zcrtdat);



CREATE TABLE IF NOT EXISTS wiprocurement.eine (
  MANDT                 varchar(3),
  INFNR                 varchar(10),
  EKORG                 varchar(4),
  ESOKZ                 varchar(1),
  WERKS                 varchar(4),
  LOEKZ                 varchar(1),
  ERDAT                 date,
  ERNAM                 varchar(12),
  EKGRP                 varchar(3),
  WAERS                 text, --CUKY
  BONUS                 varchar(1),
  MGBON                 varchar(1),
  MINBM                 decimal(13,3), --QUAN
  NORBM                 decimal(13,3), --QUAN
  APLFZ                 decimal(3),
  UEBTO                 decimal(3,1),
  UEBTK                 varchar(1),
  UNTTO                 decimal(3,1),
  ANGNR                 varchar(10),
  ANGDT                 date,
  ANFNR                 varchar(10),
  ANFPS                 numeric,
  ABSKZ                 varchar(1),
  AMODV                 date,
  AMODB                 date,
  AMOBM                 decimal(13,3), --QUAN
  AMOBW                 money, --CURR
  AMOAM                 decimal(13,3), --QUAN
  AMOAW                 money, --CURR
  AMORS                 varchar(1),
  BSTYP                 varchar(1),
  EBELN                 varchar(10),
  EBELP                 numeric,
  DATLB                 date,
  NETPR                 money, --CURR
  PEINH                 decimal(5), 
  BPRME                 text, --UNIT
  PRDAT                 date,
  BPUMZ                 decimal(5),
  BPUMN                 decimal(5),
  MTXNO                 varchar(1),
  WEBRE                 varchar(1),
  EFFPR                 money, --CURR
  EKKOL                 varchar(4),
  SKTOF                 varchar(1),
  KZABS                 varchar(1),
  MWSKZ                 varchar(2),
  BWTAR                 varchar(10),
  EBONU                 varchar(2),
  EVERS                 varchar(2),
  EXPRF                 varchar(8),
  BSTAE                 varchar(4),
  MEPRF                 varchar(1),
  INCO1                 varchar(3),
  INCO2                 varchar(28),
  XERSN                 varchar(1),
  EBON2                 varchar(2),
  EBON3                 varchar(2),
  EBONF                 varchar(1),
  MHDRZ                 decimal(4),
  VERID                 varchar(4),
  BSTMA                 decimal(13,3), --QUAN
  RDPRF                 varchar(4),
  MEGRU                 varchar(4),
  J_1BNBM               varchar(16),
  SPE_CRE_REF_DOC       varchar(1),
  IPRKZ                 varchar(1),
  CO_ORDER              varchar(1),
  VENDOR_RMA_REQ        varchar(1),
  DIFF_INVOICE          varchar(2),
  MRPIND                varchar(1),
  SGT_SSREL             varchar(1),
  TRANSPORT_CHAIN       varchar(10),
  STAGING_TIME          decimal(3),
  primary key(MANDT, INFNR, EKORG, ESOKZ)
);
CREATE INDEX idx_eine_ekgrp ON wiprocurement.eine(ekgrp);
CREATE INDEX IDX_eine_ekorg ON wiprocurement.eine(ekorg);
CREATE INDEX IDX_eine_infnr ON wiprocurement.eine(infnr);

CREATE TABLE IF NOT EXISTS wiprocurement.a018_konp (
  MANDT                 varchar(3),
  KAPPL                 varchar(2),
  KSCHL                 varchar(4),
  LIFNR                 varchar(10),
  MATNR                 varchar(18),
  EKORG                 varchar(4),
  ESOKZ                 varchar(1),
  DATBI                 date,
  DATAB                 date,
  KNUMH                 varchar(10),
  KOPOS                 numeric,
  KBETR                 money, --CURR
  KONWA                 text, --CUKY
  KPEIN                 decimal(5),
  KMEIN                 text, --UNIT
  KUMZA                 decimal(5),
  KUMNE                 decimal(5),
  MEINS                 text, --UNIT
  LOEVM_KO              varchar(1),
  primary key(MANDT, KAPPL, KSCHL, LIFNR, MATNR, EKORG, ESOKZ, DATBI, DATAB, KNUMH, KOPOS)
);

CREATE INDEX index_a018_konp_MATNR ON wiprocurement.a018_konp(MATNR);
CREATE INDEX index_a018_konp_LIFNR ON wiprocurement.a018_konp(LIFNR);
CREATE INDEX index_a018_konp_datab ON wiprocurement.a018_konp(datab);
CREATE INDEX index_a018_konp_datbi ON wiprocurement.a018_konp(datbi);