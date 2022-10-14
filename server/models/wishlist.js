"use strict";

const db = require("../db");
const {wishlistCategoryCheck} = require("../helpers/checks");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Wishlist {
    /**Get all active wishlists
   * Returns [{id, username, wishlsit_category, description}, ...]
   **/
     static async getAll() {
      const result = await db.query(
            `SELECT w.id, u.username, c.category, w.description
             FROM user_wishlists w
             INNER JOIN users u ON w.user_id = u.id 
             INNER JOIN wishlist_categories c ON w.category_id = c.id 
             WHERE active = true
             ORDER BY c.category`,
      );
      return result.rows;
    }
  
    /**Get all wishlist cateogies
   * Returns [{id, category}, ...]
   **/
     static async getAllCategories() {
      const result = await db.query(
            `SELECT id, category
             FROM wishlist_categories
             ORDER BY category`,
      );
      return result.rows;
    }

    /**POST create a new wishlist category
     * Requests {category}
   * Returns {id, category}
   * Throws BadRequestError if category already exists
   **/
     static async createNewCategory(category) {
      const categoryCheck = await wishlistCategoryCheck(category);
      if (categoryCheck) throw new BadRequestError(`${category} arleady exists!`);
      
      const lowerCaseCategory = category.toLowerCase();

      const result = await db.query(
            `INSERT INTO wishlist_categories
            (category)
            VALUES ($1)
            RETURNING id, category`,
            [lowerCaseCategory]
      );
      return result.rows[0];
    }

    /**Get all wishlists of a specific category
   * Returns [{id, username, wishlsit_category, description}, ...]
   * Throws NotFoundError if category does not exist
   **/
       static async getAllWishlistOfCategory(category) {
        const categoryCheck = await wishlistCategoryCheck(category);
        if (!categoryCheck) throw new NotFoundError(`${category} does not exist!`);

        const lowerCaseCategory = category.toLowerCase();

        const result = await db.query(
              `SELECT w.id, u.username, c.category, w.description
               FROM user_wishlists w
               INNER JOIN users u ON w.user_id = u.id 
               INNER JOIN wishlist_categories c ON w.category_id = c.id 
               WHERE active = true AND c.category = $1
               ORDER BY c.category`, 
               [lowerCaseCategory]
        );
        return result.rows;
      }

      /**DELETE a wishlist category
       *Throws NotFoundError if category does not exist
      **/
         static async removeWishlistCategory(category) {
          const categoryCheck = await wishlistCategoryCheck(category);
          if (!categoryCheck) throw new NotFoundError(`${category} does not exist!`);
  
          const lowerCaseCategory = category.toLowerCase()
  
          const result = await db.query(
                `DELETE
                 FROM wishlist_categories
                 WHERE category = $1`, 
                 [lowerCaseCategory]
          );
          return `${category} has been deleted!`
        }
}

module.exports = Wishlist;