\echo 'Delete and recreate wishlist db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE wishlist;
CREATE DATABASE wishlist;
\connect wishlist

\i wishlist-schema.sql
\i wishlist-seed.sql

\echo 'Delete and recreate wishlist_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE wishlist_test;
CREATE DATABASE wishlist_test;
\connect wishlist_test

\i wishlist-schema.sql


DROP TABLE users CASCADE;
DROP TABLE items CASCADE;
DROP TABLE wishlist_categories CASCADE;
DROP TABLE item_categories CASCADE;
DROP TABLE location CASCADE;
DROP TABLE wishlists CASCADE;
DROP TABLE status CASCADE;
DROP TABLE wishlist_items CASCADE;
DROP TABLE follow CASCADE;

-- {
-- 		"name": "duchessMeg",
-- 		"password":"password6",
-- 		"firstName": "Meghen",
-- 		"lastName": "Markle",
-- 		"profilePic": "https://phantom-marca.unidadeditorial.es/4a010a8f04f983d421fe7aa1dcb4023d/crop/0x0/951x634/resize/1320/f/jpg/assets/multimedia/imagenes/2022/10/11/16654898156339.png"
-- }


-- {
-- 		"name": "Gourmia 5qt 12-Function Guided Cook Digital Air Fryer",
-- 		"price": 39.99,
-- 		"description": "Fry Force 360° Technology cooks food quickly and evenly with little to no oil",
-- 		"link": "https://www.target.com/p/gourmia-5qt-12-function-guided-cook-digital-air-fryer-black/-/A-80137210",
-- 		"imageLink": "https://target.scene7.com/is/image/Target/GUEST_640cc90c-70cc-4d66-9918-b919527263b5?wid=253&hei=253&qlt=80&fmt=pjpeg",
-- 		"location": "target",
-- 		"category": "electronics"
-- }

-- {
-- 		"name": "Frida Baby Fridababy 3-in-1 Humidifier with Diffuser and Nightlight, White",
-- 	"price": 33.21,
-- 		"description": "COOL MIST HUMIDIFIER: Uses the power of ultrasonic vibration to turn water into a cool hydrating mist that runs for up to 12 hours.",
-- 		"link": "https://www.amazon.com/Frida-Baby-Fridababy-Humidifier-Nightlight/dp/B07L51PWD2/?_encoding=UTF8&pd_rd_w=wnLnS&content-id=amzn1.sym.3582b376-b34d-4a05-8009-7fe01723f0ea&pf_rd_p=3582b376-b34d-4a05-8009-7fe01723f0ea&pf_rd_r=7XEFCY2HEGN892MZF723&pd_rd_wg=9eafP&pd_rd_r=ca7f696e-316e-43a1-b4af-aaab702ef0d3&ref_=pd_gw_deals_vi",
-- 		"imageLink": "https://m.media-amazon.com/images/I/31tQTiMOLuL._SX300_SY300_QL70_FMwebp_.jpg",
-- 		"location": "amazon",
-- 		"category": "baby"
-- }


-- {
-- 		"name": "Post-it Notes Limited Edition Super Sticky Color Collection",
-- 	"price": 12.74,
-- 		"description": "Post-it Super sticky Notes stick and re-stick so your thoughts get noticed",
-- 		"link": "https://www.amazon.com/Post-Limited-Sticky-Collection-654-15SSALL/dp/B07YNHMVRT/?_encoding=UTF8&pd_rd_w=Ur5ky&content-id=amzn1.sym.81586424-cc98-49d1-90d8-27a208f1979d&pf_rd_p=81586424-cc98-49d1-90d8-27a208f1979d&pf_rd_r=4MZNP0BG4HKB53YA4WD7&pd_rd_wg=HEWk9&pd_rd_r=d8ff68c5-40e7-4589-801c-091081423d87&ref_=pd_gw_deals_4s&th=1",
-- 		"imageLink": "https://m.media-amazon.com/images/I/71-Yy9DvksL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
-- 		"location": "amazon",
-- 		"category": "office supplies"
-- }