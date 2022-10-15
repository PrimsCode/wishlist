CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  profile_pic TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE item_categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(40) UNIQUE NOT NULL
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  price DECIMAL NOT NULL,
  description VARCHAR(300),
  category_id INTEGER NOT NULL
    REFERENCES item_categories ON DELETE CASCADE,
  link TEXT UNIQUE NOT NULL,
  image_link TEXT
);

CREATE TABLE wishlist_categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(40) UNIQUE NOT NULL
);

CREATE TABLE user_wishlists (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL
        REFERENCES users ON DELETE CASCADE,
    category_id INTEGER NOT NULL
        REFERENCES wishlist_categories ON DELETE CASCADE,
    description VARCHAR(300)
);

CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    purchase BOOLEAN NOT NULL DEFAULT FALSE,
    anonymous BOOLEAN NOT NULL DEFAULT FALSE, 
    username VARCHAR
        REFERENCES users ON DELETE CASCADE
);

CREATE TABLE user_items (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL
        REFERENCES users ON DELETE CASCADE,
    item_id INTEGER NOT NULL
        REFERENCES items ON DELETE CASCADE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    must_have BOOLEAN NOT NULL DEFAULT FALSE,
    status_id INTEGER NOT NULL
        REFERENCES status ON DELETE CASCADE
);

CREATE TABLE follow (
    follower VARCHAR
        REFERENCES users ON DELETE CASCADE,
    following VARCHAR
        REFERENCES users ON DELETE CASCADE,
    PRIMARY KEY (follower, following)
);

CREATE TABLE user_wishlists_items (
    user_items_id INTEGER
        REFERENCES user_items ON DELETE CASCADE,
    user_wishlists_id INTEGER
        REFERENCES user_wishlists ON DELETE CASCADE,
    PRIMARY KEY (user_items_id, user_wishlists_id)
);