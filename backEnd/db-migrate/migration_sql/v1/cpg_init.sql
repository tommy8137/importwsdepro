CREATE TABLE IF NOT EXISTS wiprocurement.EPUR_ITEMSPEC
(
  SCODE     VARCHAR(3),
  ITEM      VARCHAR(18), 
  SPEC1     VARCHAR(100),
  SPEC2     VARCHAR(100),
  SPEC3     VARCHAR(100), 
  SPEC4     VARCHAR(100), 
  SPEC5     VARCHAR(100), 
  SPEC6     VARCHAR(100), 
  SPEC7     VARCHAR(100), 
  SPEC8     VARCHAR(100), 
  SPEC9     VARCHAR(100), 
  SPEC10    VARCHAR(100), 
  SPEC11    VARCHAR(100), 
  SPEC12    VARCHAR(100), 
  SPEC13    VARCHAR(100), 
  SPEC14    VARCHAR(100), 
  SPEC15    VARCHAR(100), 
  SPEC16    VARCHAR(100), 
  SPEC17    VARCHAR(100), 
  SPEC18    VARCHAR(100), 
  SPEC19    VARCHAR(100), 
  SPEC20    VARCHAR(100), 
  ACT_FLAG  VARCHAR(1), 
  INSDATE   timestamp with time zone,
  SPEC21    VARCHAR(100),
  SPEC22    VARCHAR(100), 
  SPEC23    VARCHAR(100), 
  SPEC24    VARCHAR(100), 
  SPEC25    VARCHAR(100), 
  SPEC26    VARCHAR(100), 
  SPEC27    VARCHAR(100), 
  SPEC28    VARCHAR(100), 
  SPEC29    VARCHAR(100), 
  SPEC30    VARCHAR(100),
  PRIMARY KEY (SCODE, ITEM)
);
CREATE INDEX index_ITEMSPEC_SCODE ON wiprocurement.EPUR_ITEMSPEC(SCODE);
CREATE INDEX index_ITEMSPEC_ITEM ON wiprocurement.EPUR_ITEMSPEC(ITEM);
CREATE INDEX index_ITEMSPEC_INSDATE ON wiprocurement.EPUR_ITEMSPEC(INSDATE);

CREATE TABLE IF NOT EXISTS wiprocurement.EPUR_SOURCERDEF
(
  SCODE VARCHAR(3) NOT NULL,
  ENO VARCHAR(11) NOT NULL,
  GROUPNAME VARCHAR(20), 
  ACT_FLAG VARCHAR(1), 
  INSDATE timestamp with time zone,
  PRIMARY KEY (SCODE)
);

CREATE TABLE IF NOT EXISTS wiprocurement.EPUR_SOURCERPROXY
(
  SCODE VARCHAR(3) NOT NULL, 
  ENO_PROXY VARCHAR(11) NOT NULL, 
  ACT_FLAG VARCHAR(1), 
  INSDATE timestamp with time zone,
  PRIMARY KEY (SCODE, ENO_PROXY)
);

CREATE TABLE IF NOT EXISTS wiprocurement.EPUR_VGROUP
(
  VCODE VARCHAR(10), 
  VGNAME VARCHAR(60), 
  REF1 VARCHAR(60), 
  VBASE VARCHAR(20), 
  VSNAME VARCHAR(70), 
  ACT_FLAG VARCHAR(1), 
  INSDATE timestamp with time zone,
  PRIMARY KEY (VCODE)
);
CREATE INDEX IDX_epur_vgroup_vcode ON wiprocurement.epur_vgroup(vcode);


CREATE TABLE IF NOT EXISTS wiprocurement.ePur_Type1
(
  TYPE1ID VARCHAR(10), 
  TYPE1NAME VARCHAR(20), 
  LVALID VARCHAR(1), 
  ACT_FLAG VARCHAR(1), 
  INSDATE timestamp with time zone,
  PRIMARY KEY (TYPE1ID)
);

CREATE TABLE IF NOT EXISTS wiprocurement.ePur_Type2
(
  TYPE2ID VARCHAR(10), 
  TYPE2NAME VARCHAR(20), 
  LVALID VARCHAR(1), 
  ACT_FLAG VARCHAR(1), 
  INSDATE timestamp with time zone,
  PRIMARY KEY (TYPE2ID)
);

CREATE TABLE IF NOT EXISTS wiprocurement.ePur_Spec_Title
(
  TYPE1ID VARCHAR(10), 
  TYPE2ID VARCHAR(10), 
  LVALID VARCHAR(1), 
  SPEC_T1 VARCHAR(60),
  SPEC_T2 VARCHAR(60),
  SPEC_T3 VARCHAR(60),
  SPEC_T4 VARCHAR(60),
  SPEC_T5 VARCHAR(60),
  SPEC_T6 VARCHAR(60),
  SPEC_T7 VARCHAR(60),
  SPEC_T8 VARCHAR(60),
  SPEC_T9 VARCHAR(60),
  SPEC_T10 VARCHAR(60),
  SPEC_T11 VARCHAR(60),
  SPEC_T12 VARCHAR(60),
  SPEC_T13 VARCHAR(60),
  SPEC_T14 VARCHAR(60),
  SPEC_T15 VARCHAR(60),
  SPEC_T16 VARCHAR(60),
  SPEC_T17 VARCHAR(60),
  SPEC_T18 VARCHAR(60),
  SPEC_T19 VARCHAR(60),
  SPEC_T20 VARCHAR(60),
  SPEC_T21 VARCHAR(60),
  SPEC_T22 VARCHAR(60),
  SPEC_T23 VARCHAR(60),
  SPEC_T24 VARCHAR(60),
  SPEC_T25 VARCHAR(60),
  SPEC_T26 VARCHAR(60),
  SPEC_T27 VARCHAR(60),
  SPEC_T28 VARCHAR(60),
  SPEC_T29 VARCHAR(60),
  SPEC_T30 VARCHAR(60),
  ACT_FLAG VARCHAR(1), 
  INSDATE timestamp with time zone,
  PRIMARY KEY (TYPE1ID, TYPE2ID)
);


CREATE OR REPLACE VIEW wiprocurement.view_epur_spec_title AS
 SELECT t1.type1name,
    t2.type2name,
    item.type1id,
    item.type2id,
    item.lvalid,
    item.spec_t1,
    item.spec_t2,
    item.spec_t3,
    item.spec_t4,
    item.spec_t5,
    item.spec_t6,
    item.spec_t7,
    item.spec_t8,
    item.spec_t9,
    item.spec_t10,
    item.spec_t11,
    item.spec_t12,
    item.spec_t13,
    item.spec_t14,
    item.spec_t15,
    item.spec_t16,
    item.spec_t17,
    item.spec_t18,
    item.spec_t19,
    item.spec_t20,
    item.spec_t21,
    item.spec_t22,
    item.spec_t23,
    item.spec_t24,
    item.spec_t25,
    item.spec_t26,
    item.spec_t27,
    item.spec_t28,
    item.spec_t29,
    item.spec_t30,
    item.act_flag,
    item.insdate
   FROM wiprocurement.epur_spec_title item
     LEFT JOIN wiprocurement.epur_type1 t1 ON item.type1id::text = t1.type1id::text
     LEFT JOIN wiprocurement.epur_type2 t2 ON item.type2id::text = t2.type2id::text;