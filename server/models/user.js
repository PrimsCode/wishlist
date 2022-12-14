"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {userExistCheck, wishlistCategoryCheck, userWishlistExistCheck, itemExistCheck} = require("../helpers/checks");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");


class User {

  /** Register a new user
   *  Requests {username, password, firstName, lastName, profilePic, isAdmin}
   *  Returns {username, firstName, lastName, profilePic, isAdmin} 
   *  Throws BadRequestError on duplicates or blank Not Null fields
   * */
   static async register({ username, password, firstName, lastName, profilePic, isAdmin }) {
      const duplicateCheck = await userExistCheck();
      if (duplicateCheck) throw new BadRequestError(`${username} already exists`);

      const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
      const result = await db.query(
            `INSERT INTO users
            (username,
              password,
              first_name,
              last_name,
              profile_pic,
              is_admin)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING username, first_name AS "firstName", last_name AS "lastName", profile_pic AS "profilePic", is_admin AS "isAdmin"`,
          [
            username,
            hashedPassword,
            firstName,
            lastName,
            profilePic,
            isAdmin,
          ],
      );

    const user = result.rows[0];
    return user;
  }

  /** Authenticate a user
   *  Requests {username, password}
   *  Returns {username, firstName, lastName, profilePic, isAdmin} 
   *  Throws UnauthorizedError if username doesn't exist or password is wrong
   * */
  static async authenticate(username, password) {
    //find user
    const result = await db.query(
          `SELECT username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  profile_pic AS "profilePic",
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }
    throw new UnauthorizedError("Invalid username/password");
  }

  /**Get all users.
   * Returns [{ username, first_name, last_name, profile_pic, is_admin }, ...]
   **/
   static async getAll() {
    const result = await db.query(
          `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  profile_pic  AS "profilePic",
                  is_admin AS "isAdmin"
           FROM users
           ORDER BY username`,
    );
    return result.rows;
  }

  /** Get user by username
   * Returns { username, first_name, last_name, profile_pic, is_admin, wishlists[], items[]}
   * Throws NotFoundError if user not found.
   **/
  static async get(username) {
    const userRes = await db.query(
          `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  profile_pic  AS "profilePic",
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = userRes.rows[0];
    if (!user) throw new NotFoundError(`${username} doesn't exist!`);

    const wishlistRes = await db.query(
      `SELECT w.id, c.category
      FROM user_wishlists w
      INNER JOIN wishlist_categories c ON w.category_id = c.id
      WHERE w.username = $1
      ORDER BY c.category`,
      [username],
    );
    user.wishlists = wishlistRes.rows;

    const itemRes = await db.query(
      `SELECT ui.id, i.name, c.category, i.description, i.link, i.image_link, i.price
      FROM user_items ui
      INNER JOIN items i ON ui.item_id = i.id
      INNER JOIN item_categories c ON i.category_id = c.id
      WHERE ui.username = $1
      ORDER BY i.name`,
      [username],
    );

    user.items = itemRes.rows;

    return user;
  }

  /** Update a user by their username
   * Partial update is allowed
   * Requests { firstName, lastName, password, profilePic}
   * Returns { username, firstName, lastName, profilePic, isAdmin }
   * Throws NotFoundError if not found.
   */
  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          firstName: "first_name",
          lastName: "last_name",
          profilePic: "profile_pic",
        });
    const usernameVarIdx = "$" + (values.length + 1);
    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                profile_pic AS "profilePic"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`${username} doesn't exist!`);
    delete user.password;
    return user;
  }

  /**Delete a user by their username. */
  static async remove(username) {
    let result = await db.query(
          `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
        [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`${username} doesn't exist!`);

    return `${username} has been deleted!`
  }



/**Get all active wishlists of a specific user by username.
   * Returns [{ id, wishlist_category, description }, ...]
   **/
 static async getAllWishlists(username) {
  // const existCheck = await userExistCheck();
  // console.log(existCheck);
  // if (!existCheck) throw new NotFoundError(`${username} doesn't exist!`);
  // console.log("got to models");
  const result = await db.query(
        `SELECT w.id, w.username, c.category, w.description
         FROM user_wishlists w
         INNER JOIN wishlist_categories c ON w.category_id = c.id
         WHERE w.username = $1
         ORDER BY c.category`,
         [username]
  );

  return result.rows;
}


  /** Create a wishlist for a specific user by username
   *  Requests {username, wishlist_category, description}
   *  Returns {id, username, wishlist_category, description} 
   *  Throws NotFoundError if username or wishlist_category is not found
   * */
   static async createWishlist(username, data) {
    // console.log(username);
    // const existCheck = await userExistCheck();
    // console.log(existCheck);
    // if (!existCheck) throw new NotFoundError(`${username} doesn't exist!`);

    const wishlistCategory = await wishlistCategoryCheck(data.category);
    console.log(wishlistCategory.id);
    if (!wishlistCategory) throw new NotFoundError(`${data.category} doesn't exist!`);

    const userWishlist = await userWishlistExistCheck(username, wishlistCategory.id);
    console.log(userWishlist);
    if (userWishlist) throw new BadRequestError(`The ${data.category} wishlist already exists for ${username}`);

    const result = await db.query(
          `INSERT INTO user_wishlists
          (username, category_id, description)
          VALUES ($1, $2, $3)
          RETURNING id, username, category_id, description`,
        [
          username,
          wishlistCategory.id,
          data.description
        ],
    );

  const wishlist = result.rows[0];
  return wishlist;
}

/**Get wishlist by category of a specific user by username.
   * Returns [{ id, useranme, wishlist_category, description }, ...]
   **/
 static async getWishlistByCategory(username, wishlistCategory) {
  // const existCheck = await userExistCheck();
  // if (!existCheck) throw new NotFoundError(`${username} doesn't exist!`);

  const wishlistCategoryFound = await wishlistCategoryCheck(wishlistCategory);
  if (!wishlistCategoryFound) throw new NotFoundError(`${wishlistCategory} doesn't exist!`);

  const result = await db.query(
        `SELECT w.id, w.username, c.category, w.description
         FROM user_wishlists w
         INNER JOIN wishlist_categories c ON w.category_id = c.id
         WHERE w.username = $1 AND w.category_id = $2`,
         [username, wishlistCategoryFound.id]
  );

  const userWishlist = result.rows[0];
  if (!userWishlist) throw new NotFoundError(`${username} doesn't have a ${wishlistCategory} wishlist!`);


  const itemRes = await db.query(
    `SELECT i.name, c.category, i.description, i.link, i.image_link, i.price
    FROM user_wishlists_items uwi
    INNER JOIN user_items ui ON uwi.user_items_id = ui.id
    INNER JOIN items i ON ui.item_id = i.id
    INNER JOIN item_categories c ON i.category_id = c.id
    WHERE uwi.user_wishlists_id = $1
    ORDER BY i.name`,
    [wishlistCategoryFound.id],
  );

  userWishlsit.items = itemRes.rows;

  return userWishlist;
}



/** Deactivate a wishlist of a user by username
 * TThrows NotFoundError if username or wishlist is not found
 **/
static async removeWishlist(username, wishlistCategory) {
  // const duplicateCheck = await userExistCheck();
  // if (!duplicateCheck) throw new NotFoundError(`${username} doesn't exist!`);

  const wishlistCategoryId = await wishlistCategoryCheck(wishlistCategory);
  if (!wishlistCategoryId) throw new NotFoundError(`${wishlistCategory} doesn't exist!`);

  const result = await db.query(
        `DELETE FROM user_wishlists
         WHERE username = $1 AND category_id = $2
         RETURNING id, username, category_id`,
      [username, wishlistCategoryId.id],
  );

  const wishlist = result.rows[0]
  if (!wishlist) throw new NotFoundError(`The ${wishlistCategory} wishlist doesn't exists for ${username}`);
  return `${wishlistCategory} wishlist for ${username} has been deleted!`;
}

  /** Update a user by their username
   * Partial update is allowed
   * Requests { firstName, lastName, password, profilePic}
   * Returns { username, firstName, lastName, profilePic, isAdmin }
   * Throws NotFoundError if not found.
   */
   static async addItemToWishlist(username, wishlistCategory, data) {

    const itemFound = await itemExistCheck(data.itemName);

    const result = await db.query(
      `INSERT INTO user_items
      (item_id, username, must_have)
      VALUES ($1, $2, $3)
      RETURNING id`, [itemFound.id, username, data.mustHave],
    );

    const addedItem = result.rows[0];
    
    const wishlistRes = await db.query(
      `INSERT INTO user_wishlist_items
      (user_item_id, user_wishlists_id)
      VALUES ($1, $2)
      RETURNING `
    )
  }

}

module.exports = User;