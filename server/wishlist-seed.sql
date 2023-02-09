-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, profile_pic, is_admin)
VALUES ('testadmin', '$2a$12$zzpDmfJDBARKgWaB8ivHreS0fSv6HZBO1rHFRqsziFIySf4b1NEeq', 'Test', 'Admin', 'https://www.shareicon.net/data/2016/05/24/770136_man_512x512.png', TRUE),
        ('testuser', '$2a$12$plxftEFOI8MOedsb7TRBYugMOZ7pyvxmf88JO.a.Qzd5z13519yUC', 'Test', 'User', 'https://www.shareicon.net/data/2016/05/24/770136_man_512x512.png', FALSE),
        ('sheldoncopper', '$2a$12$Mm/nZjeuv4x2IxKNCWEcledQ/c6XjrGxy4F9WwkXi41Vc6MCod3FO', 'Sheldon', 'Copper', 'https://images.immediate.co.uk/production/volatile/sites/3/2016/11/122240.jpg?quality=90&resize=620,413', FALSE),
        ('kimiko', '$2a$12$8OVqVSrkopqAUSZ0l.7tGOrcsEzHjua1oCpdwG76dfXz2u6rZv9Se', 'Kimiko', 'Boys', 'https://cdn.mos.cms.futurecdn.net/SJoxvKNLJNyq3hovJwGmsn.jpg', FALSE),
        ('hermione', '$2a$12$wt11CHacOm/VHjVDLNigI.czbEAmuGu7pNHRhno542VlpN2cJOajm', 'Hermione', 'Granger', 'https://static.wikia.nocookie.net/characters/images/a/a5/Latest_%2810%29.jpg/revision/latest/scale-to-width-down/1200?cb=20141230074301', FALSE),
        ('homer', '$2a$12$gHyy9fRwq6wJj0fBninK6OiWg.JrwqRjOfvLJIjGaHKrSkwmm13ni', 'Homer', 'Simpson', 'https://static.wikia.nocookie.net/p__/images/3/3c/HomerSimpson.png/revision/latest/top-crop/width/360/height/360?cb=20210813010304&path-prefix=protagonist', FALSE),
        ('ronswanson', '$2a$12$K3WaxFNsM3xqo1REeOAtf.SzYY2qOVsfUqDXEVSuawvw74qFo.j.S', 'Ron', 'Swanson', 'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/fc/1681630-inline-inline-1-the-creation-of-a-classic-character-how-ron-swanson-became-ron-swanson.jpg', FALSE),
        ('eleven', '$2a$12$syH5UnIC4odkgWXmEepfKuImrcArosFvl2IpjKHi9VJFrqnm3F./u', 'Jane', 'Hopper', 'https://media.glamourmagazine.co.uk/photos/62a72fbf451fa6418456b4af/2:3/w_1280,h_1920,c_limit/STRANGER%20THINGS%20BEHIND%20THE%20SCENES%20130622%20deefault2StrangerThings_StrangerThings4_1_00_25_43_15.jpg', FALSE)
;

INSERT INTO wishlist_categories (category, color_code) 
VALUES ('birthday', 'lightsteelblue'),
        ('back to school', 'gold'),
        ('baby', 'navajowhite'),
        ('graduation', 'lightslategrey'),
        ('christmas', 'green'),
        ('valentine', 'hotpink'),
        ('wedding', 'lavender'),
        ('housewarming', 'coral')
    ;

INSERT INTO item_categories (category, color_code) 
VALUES ('grocery', '#90EE90'),
        ('books', '#CD853F'),
        ('home', '#DEB887'),
        ('electronics', '#C0C0C0'),
        ('furniture', '#FA8072'),
        ('toys', '#E0FFFF'),
        ('clothing', '#FFE4E1'),
        ('shoes', '#FFFACD'),
        ('accessories', '#FFC0CB'),
        ('pets', '#F8F8FF'),
        ('school supplies', '#FFD700'),
        ('kitchen', '#F4A460'),
        ('outdoor activities', '#808000'),
        ('video games', '#66CDAA'),
        ('garden', '#8FBC8B'),
        ('health', '#AFEEEE'),
        ('party supplies', '#1E90FF'),
        ('household essentials', '#FFA07A'),
        ('baby', '#FFDAB9'),
        ('art and craft', '#8B008B'),
        ('personal care', '#DA70D6'),
        ('beauty', '#D8BFD8'),
        ('sports', '#F0FFF0'),
        ('movies', '#5F9EA0'),
        ('music', '#F0F8FF'),
        ('holiday', '#FF8C00')
    ;

INSERT INTO items (name, price, description, category_id, link, image_link)
VALUES ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
            1, 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 
            'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        ('Gourmia 5qt 12-Function Guided Cook Digital Air Fryer', 39.99, 'Fry Force 360° Technology cooks food quickly and evenly with little to no oil',
            4, 'https://www.target.com/p/gourmia-5qt-12-function-guided-cook-digital-air-fryer-black/-/A-80137210', 
            'https://target.scene7.com/is/image/Target/GUEST_640cc90c-70cc-4d66-9918-b919527263b5?wid=253&hei=253&qlt=80&fmt=pjpeg'),
        ('Volkswagen Scale Beetle Remote Control RC Model Car', 49.99, 'Volkswagen Bettle remote control car. Car measures (6.92" x 2.91" x 2.16"), a highly detailed Beetle replica made out of top-quality material.',
            6, 'https://www.target.com/p/ready-set-go-link-1-24-volkswagen-scale-beetle-remote-control-rc-model-car/-/A-87354892#lnk=sametab', 
            'https://target.scene7.com/is/image/Target/GUEST_5f5b9ab6-bdef-4629-8a7a-602bac42a468?wid=325&hei=325&qlt=80&fmt=pjpeg'),
        ('Costway Vintage Play Kitchen', 133.99, 'Highly Realistic Appearance: The realistic kids play kitchen will provide your little one with an authentic cooking experience, which features stove, sink, fridge, clock and knobs with sound.',
            6, 'https://www.target.com/p/costway-vintage-play-kitchen-pretend-kids-cooking-playset-toys-w-water-dispense/-/A-85325550#lnk=sametab', 
            'https://target.scene7.com/is/image/Target/GUEST_ff04c128-725a-423c-9466-dc9eeb34c25b?wid=325&hei=325&qlt=80&fmt=pjpeg'),
        ('Trendy Queen Womens Oversized Half Zip Pullover', 32.99, 'This Fall Fashion Hoodies Is The Ideal Choice In Your Wardrobe',
            7, 'https://www.amazon.com/Trendy-Queen-Oversized-Pullover-Sweatshirt/dp/B0B5H6N5F5/?_encoding=UTF8&pd_rd_w=vHA2C&content-id=amzn1.sym.5cfdb72e-80b1-4c99-943c-7ad07ad91310&pf_rd_p=5cfdb72e-80b1-4c99-943c-7ad07ad91310&pf_rd_r=125KJSKXR3QY6N5GMBQA&pd_rd_wg=QRA3P&pd_rd_r=e617bc9d-5085-47b6-8474-a3244e9537f2&ref_=pd_gw_bmx_gp_egttw2yn', 
            'https://m.media-amazon.com/images/I/81O6ERy19CL._AC_UY879_.jpg'),
        ('Lighter: Let Go of the Past, Connect with the Present, and Expand the Future', 16.04, 'A radically compassionate plan for turning inward and lifting the heaviness that prevents us from healing ourselves and the world, from the New York Times bestselling author of Clarity & Connection',
            2, 'https://www.amazon.com/Lighter-Connect-Present-Expand-Future/dp/0593233174/?_encoding=UTF8&pd_rd_w=VjlZm&content-id=amzn1.sym.9939c339-3f78-42dc-99de-d15db91a97f8&pf_rd_p=9939c339-3f78-42dc-99de-d15db91a97f8&pf_rd_r=125KJSKXR3QY6N5GMBQA&pd_rd_wg=QRA3P&pd_rd_r=e617bc9d-5085-47b6-8474-a3244e9537f2&ref_=pd_gw_wsixn_inc_v2', 
            'https://m.media-amazon.com/images/I/51J9NPOQQwL._SX329_BO1,204,203,200_.jpg'),
        ('Gnome Garden Statues Outdoor Decor', 24.79, 'Solar Powered Garden Gnome: No wiring is required for the solar powered outdoor lights. ',
            15, 'https://www.amazon.com/Garden-Statues-Lights-Powered-Outdoor/dp/B08PV6XMZQ/ref=sr_1_4_sspa?crid=N1EURB38WXOM&keywords=garden+gnome&qid=1665856791&qu=eyJxc2MiOiI3Ljk0IiwicXNhIjoiNy45MCIsInFzcCI6IjcuNDkifQ%3D%3D&sprefix=garden+gnom%2Caps%2C146&sr=8-4-spons&psc=1', 
            'https://m.media-amazon.com/images/I/71ogiQ1010L._AC_SX679_.jpg'),
        ('POPPI Sparkling Prebiotic Soda w/ Gut Health & Immunity Benefits, Beverages', 26.99, 'Quench your thirst with our crisp, lightly carbonated soda all grown up.',
            16, 'https://www.amazon.com/Sparkling-Prebiotic-Immunity-Benefits-Beverages/dp/B094LFK6DF/ref=sr_1_23?crid=H3OY7AQN2HVG&keywords=health&qid=1665856764&qu=eyJxc2MiOiI3Ljk1IiwicXNhIjoiNy44OCIsInFzcCI6IjcuNjYifQ%3D%3D&sprefix=health%2Caps%2C160&sr=8-23', 
            'https://m.media-amazon.com/images/I/51QvmB-vcOL._SX300_SY300_QL70_FMwebp_.jpg')
        ;

INSERT INTO user_wishlists (username, category_id, description, title)
VALUES ('sheldoncopper', 5, 'What I want for Christmas', 'My Christmas Wishlist'),
        ('sheldoncopper', 1, 'What I want for my Birthday', 'Best Bday')
    ;

-- INSERT INTO user_items (item_id, username, must_have)
-- VALUES (3, 'eleven', true),
--         (4, 'sheldoncopper', true),
--         (9, 'testeadmin', true),
--         (10, 'testadmin', false),
--         (5, 'testuser', true),
--         (6, 'testuser', false)
-- ;

-- INSERT INTO user_wishlists_items (user_items_id, user_wishlists_id)
-- VALUES (10, 2),
--         (10, 3),
--         (10, 7),
--         (11, 3),
--         (11, 7),
--         (1, 11),
--         (12, 8),
--         (12, 9),
--         (13, 10),
--         (13, 8),
--         (8, 4),
--         (8, 5),
--         (9, 5)
-- ;
