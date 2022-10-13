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

INSERT INTO wishlist_categories (category) 
VALUES ('birthday'),
        ('back to school'),
        ('baby'),
        ('graduation'),
        ('christmas'),
        ('sweet 16'),
        ('wedding'),
        ('housewarming')
    ;

INSERT INTO item_categories (category) 
VALUES ('grocery'),
        ('books'),
        ('home'),
        ('electronics'),
        ('furniture'),
        ('toys'),
        ('clothing'),
        ('shoes'),
        ('accessories'),
        ('pets'),
        ('school supplies'),
        ('kitchen'),
        ('outdoor activities'),
        ('video games'),
        ('garden'),
        ('health'),
        ('party supplies'),
        ('household essentials'),
        ('baby'),
        ('art and craft'),
        ('personal care'),
        ('beauty'),
        ('sports'),
        ('movies'),
        ('music'),
        ('holiday')
    ;

INSERT INTO location (name)
VALUES ('target'),
        ('walmart'),
        ('amazon'),
        ('kroger'),
        ('heb'),
        ('sephora'),
        ('ulta')
    ;

INSERT INTO items (name, price, description, location_id, category_id, link, image_link)
VALUES ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
            2, 1, 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg');
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg'),
        -- ('Eggo Homestyle Waffles', 2.85, 'Best frozen waffles in the world',
        --     'Walmart', 'https://www.walmart.com/ip/Eggo-Frozen-Waffles-Homestyle-12-3-Oz-Box-Frozen/10891827', 'https://i5.walmartimages.com/asr/4f5b9fcf-6b7e-4c5d-8a10-4ac168c26f60.49d43f5cd31ebda2e6d4bb71c4e310a3.jpeg')
        -- ;
    





