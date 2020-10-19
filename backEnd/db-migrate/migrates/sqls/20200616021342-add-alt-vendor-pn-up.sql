/* Replace with your SQL commands */
ALTER TABLE wiprocurement.sapalt_price
  ADD COLUMN if NOT EXISTS vendor_pn varchar(50),
  ADD COLUMN if NOT EXISTS vendor_pn_without_main_pn varchar(50);
