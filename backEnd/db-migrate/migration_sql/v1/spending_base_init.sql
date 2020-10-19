CREATE TABLE IF NOT EXISTS wiprocurement.spending_base (
  inforecord varchar(10),
  sourcer varchar(3),
  po_no varchar(10),
  currency text,
  date date,
  po_price numeric,
  quantity text,
  profit_center varchar(10),
  materialnumber varchar(18),
  type1 varchar(40),
  type2 varchar(40),
  material_desc varchar(40),
  brand varchar(10),
  plant varchar(4),
  supply_type varchar(4),
  supply_type_name varchar(10),
  odmoem varchar(10),
  exchange_rate numeric(9,5),
  buyer varchar(3),
  vendorcode varchar(10),
  werks varchar(4),
  month varchar(18),
  vendor_base VARCHAR(20),
  vendor_group VARCHAR(60),  
  short_name VARCHAR(70),  
  vendor_name VARCHAR(40),  
  site VARCHAR(30),  
  product_name VARCHAR(512), 
  bu2_description VARCHAR(510), 
  sourcername VARCHAR(18),
  buyername VARCHAR(18),
  manufacturer varchar(10),
  date_cpudt_mkpf date
 );
 CREATE INDEX index_spending_base ON wiprocurement.spending_base(date,plant,sourcer,type1,type2,supply_type,site,product_name,bu2_description,sourcername,buyername,manufacturer,month, profit_center,odmoem);
 CREATE INDEX idx_spending_base_date_cpudt ON wiprocurement.spending_base(date_cpudt_mkpf);
