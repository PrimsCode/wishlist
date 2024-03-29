# Wishlist API Documentation

## Authentication Endpoints
POST /auth/register
> create a new user and token
```
Request:
{
   users: 
   [
      {
         username
         password
         first_name
         last_name
         profile_pic
      }
   ]
}
```
```
Response:
{
   token
}
```

POST /auth/register
> create a token if username and password are correct
```
Request:
{
   username
   password
}
```
```
Response:
{
   token
}
```

## User Endpoints

# User Info

GET /users
> get all users
```
Response:
{ users: 
[
{	id,
username,
first_name,
last_name,
profile_pic,
isAdmin
}
]
}
```

GET /users/{username}
> get specific user by username
```
Response:
{
id,
username,
first_name,
last_name,
profile_pic,
isAdmin
}
```

PATCH /users/{username}
> edit a specific user
*must be admin or user of that username*
```
Request:
{
first_name,
last_name,
profile_pic
}
```
```
Response:
{
id,
username,
first_name,
last_name,
profile_pic,
isAdmin
}
```

DELETE /users/{username}
> delete a specific user
*must be admin or user of that username*
```
Request:
{
	token
}
```

GET /users/{username}/wishlists
> get all wishlists of a specific user
```
Response:
{ wishlists: 
[
{	id,
username,
category,
color_code,
title, 
description, 
banner_img
}
]

}
```
POST /users/{username}/wishlists
> create a new wishlist for a specific user
*must be admin or user of that username*
```
Request:
{
	category, 
title, 
description, 
banner_img
}
```
```
Response:
{
	category, 
title, 
description, 
banner_img
}
```

GET /users/{username}/wishlists/{category}
> get all wishlists of a specific user by category
```
Response:
{ wishlists: 
[
{	id,
username,
category,
color_code,
title, 
description, 
banner_img
}
]

}
```
GET /users/{username}/wishlists/{category}/{title}
> get a specific wishlist of a specific user
```
Response:
{	id,
   username,
category,
color_code,
title, 
description, 
banner_img,
items:
[
{
name, 
category, 
description,
link, 
image_link, 
price
}
]
}
```


PATCH /users/{username}/wishlists/{category}
> update a wishlist of a category for a specific user by username
```
Response:
{
   wishlist_category
}
```
DELETE /users/{username}/wishlists/{category}
> delete a wishlist of a category for a specific user by username

POST /users/{username}/wishlists/{category}
> add an item to a wishlist of a category for a specific user by username
```
Response:
{
   wishlist_category
}
```
DELETE /users/{username}/wishlists/{category}
> delete an item to a wishlist of a category for a specific user by username
```
Response:
{
   wishlist_category
}
```
GET /users/{username}/items
> get all the items in the wishlists of a specific user by username
```
Response:
{
   items
}
```
GET /users/{username}/items/{item_id}
> get a specific item by id in the wishlists of a specific user by username
```
Response:
{
   item
}
```

## Item Endpoints
POST /items
> create a new item
```
Request:
{
   name
   price
   description
   category
   link
   image_link
}
```
```
Response:
{
         id
         name
         price
         description
         category
         link
         image_link
}
```

GET /items
> get all items in the database
```
Response:
{
   items:
   [ 
      {
         id
         name
         price
         description
         category
         link
         image_link
      }
   ]
}
```
GET /items/{item_id}
> get an item by item id
```
Response:
{
         id
         name
         price
         description
         category
         link
         image_link
}
```

PATCH /items/{item_id}
> update an item by item id
```
Request:
{
   name
   price
   description
   category
   link
   image_link
}
```
```
Response:
{
   id
   name
   price
   description
   category
   link
   image_link
}
```

DELETE /items/{item_id}
> delete an item by item id (admin function)


## Wishlist Endpoints
GET /wishlists
> get all active wishlists
```
Response:
{
   wishlists:
   [ 
      {
         id
         username
         wishlist_category
         description
      }
   ]
}
```
GET /wishlists/categories
> get wishlist categories
```
Response:
{
   categories:
   [ 
      {
         id
         wishlist_category
      }
   ]
}
```
POST /wishlists/categories
> create a new category for wishlists
```
Request:
{
   category
}
```
```
Response:
{
   id
   category
}
```
GET /wishlists/categories/{category}
> get all wishlists from a specific category
```
Response:
{
   [{
      id
      username
      wishlist_category
      description
   }]
}
```

Delete /wishlist/categories/{categor}
> delete a wishlist's category
