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
GET /users
> get all users
```
Response:
{
   username
   first_name
   last_name
   profile_pic
}
```

GET /users/{username}
> get specific user by username
```
Response:
{
   username
   first_name
   last_name
   profile_pic
   isAdmin
}
```

PATCH /users/{username}
> edit a specific user by username
```
Request
{
   first_name
   last_name
   profile_pic
}
```
```
Response:
{
   username
   first_name
   last_name
   profile_pic
   isAdmin
}
```

Delete /users/{username}
> delete a specific user by username (admin or same user function)

## Wishlist Endpoints
GET /wishlists
> get all wishlists
```
Response:
{
   wishlists:
   [ 
      {
         id
         username
         wishlist_category
      }
   ]
}
```
GET /users/username/wishlists
> get all wishlists of a specific user by username
```
Response:
{
   wishlists:
   [ 
      {
         id
         wishlist_category
         items
      }
   ]
}
```
GET /users/username/wishlists/{wishlist_category}
> get a wishlist by cateogy of a specific user
```
Response:
{
   id
   items
}
```
POST /users/username/wishlists
> create a new wishlist for a specific user by username
```
Request:
{
   wishlist_category
}
```

Delete /users/username/wishlists/{wishlist_category}
> delete a wishlist for a specific user by username
```
Request:
{
   token
}
```

## Item Endpoints
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
         location
         link
         image_link
      }
   ]
}
```

POST /items
> create a new item
```
Request:
{
   name
   price
   description
   location
   link
   image_link
}
```

Delete /items/{item_id}
> delete an item by item (admin function)
```
Request:
{
   token
}
```

POST /users/username/wishlists/{wishlist_category}
> add an item to a specific wishlist of a user
```
Request:
{
   item_id
   item_name
   must_have
}
```