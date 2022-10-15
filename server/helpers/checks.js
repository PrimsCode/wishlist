const db = require("../db");

const userExistCheck = async(username) => {
    const user = await db.query(
        `SELECT username
        FROM users
        WHERE username = $1`, [username],
      );
    if (user.rows[0]) return true;
    return false;
  }

const itemExistCheck = async(name, link) => {
    const item = await db.query(
        `SELECT name
        FROM items
        WHERE name = $1 AND link = $2`, [name, link],
      );
    if (item.rows[0] != undefined) return true;
    return false;
  }

//Checks if item category exists, if not then add a new category
const itemCategoryCheck = async(category) => {
  const lowerCaseCategory = category.toLowerCase(); 
    const itemCategory = await db.query(
        `SELECT id, category
        FROM item_categories
        WHERE category = $1`, [lowerCaseCategory],
      );
    if (itemCategory.rows[0]) return itemCategory.rows[0].id;

    const result = await db.query(
      `INSERT INTO item_categories (category) VALUES ($1) RETURNING id, category`,
      [category],
    );
    const newCategory = result.rows[0];
    return  newCategory.rows[0].id;
  }

  const wishlistCategoryCheck = async(category) => {
    const lowerCaseCategory = category.toLowerCase(); 
      const wishlistCategory = await db.query(
          `SELECT id, category
          FROM wishlist_categories
          WHERE category = $1`, [lowerCaseCategory],
        );
      if (wishlistCategory.rows[0] != undefined) return wishlistCategory.rows[0];
      return false;
    }

    
  const userWishlistExistCheck = async(username, categoryId) => {

      const userWishlist = await db.query(
          `SELECT id, username, category_id
          FROM user_wishlists
          WHERE username = $1 AND category_id = $2`, [username, categoryId],
        );
      if (userWishlist.rows[0] != undefined) return userWishlist.rows[0];
      return false;
    }

module.exports = { userExistCheck, itemExistCheck, itemCategoryCheck, wishlistCategoryCheck, userWishlistExistCheck };
