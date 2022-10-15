"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {itemExistCheck, itemCategoryCheck} = require("../helpers/checks");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Item {
  /**Get all items.
   * Returns [{id, name, price, description, category, link, imageLink}, ...]
   **/
   static async getAll() {
    const result = await db.query(
          `SELECT i.id,
                  i.name,
                  i.price,
                  i.description,
                  i.link,
                  i.image_link AS "imageLink",
                  c.category AS "category"
           FROM items i
           INNER JOIN item_categories c ON c.id = i.category_id 
           ORDER BY i.name`,
    );
    return result.rows;
  }

  /** Get item by id
   * Returns { id, name, price, description, link, imageLink, category}
   * Throws NotFoundError if item not found.
   **/
  static async get(id) {
    const itemRes = await db.query(
          `SELECT i.id,
                  i.name,
                  i.price,
                  i.description,
                  i.link,
                  i.image_link AS "imageLink",
                  c.category AS "category"
           FROM items i
           INNER JOIN item_categories c ON c.id = i.category_id 
           WHERE i.id = $1`,
        [id],
    );

    const item = itemRes.rows[0];
    if (!item) throw new NotFoundError(`${name} doesn't exist!`);
    return item;
  }

  /** Post an item
   * Request {id, name, price, description, link, imageLink, category}
   * Returns { id, name}
   * Throws BadRequest if item already exists or fields are null
   **/
  static async createItem({ name, price, description, link, imageLink, category }) {
    const duplicateCheck = await itemExistCheck(name, link);
    if (duplicateCheck) {
      throw new BadRequestError(`${name} already exists`);
    }

  const categoryId = await itemCategoryCheck(category);

  const result = await db.query(
        `INSERT INTO items
         (name, price, description, link, image_link, category_id)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, name`,
      [name, price, description, link, imageLink, categoryId],
  );
  const item = result.rows[0];
  return item;
}

  /** Update an item by id
   * Partial update is allowed
   * Requests { name, price, description, link, imageLink, category}
   * Returns { id, name }
   * Throws NotFoundError if not found.
   */
  static async update(id, data) {
    if (data.category) {
      const categoryId = await itemCategoryCheck(data.category);
      data.category = categoryId;
    }

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          name: "name",
          price: "price",
          description: "description",
          link: "link",
          imageLink:"imageLink",
          categoryId:"categoryId"
        });

    const idVarIdx = "$" + (values.length + 1);
    const querySql = `UPDATE items 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, name`;
    const result = await db.query(querySql, [...values, id]);
    const item = result.rows[0];

    if (!item) throw new NotFoundError(`The item doesn't exist!`);
    return item;
  }

  /**Delete an item by its id */
  static async remove(id) {
    let result = await db.query(
          `DELETE
           FROM items
           WHERE id = $1
           RETURNING id, name`,
        [id],
    );
    const item = result.rows[0];

    if (!item) throw new NotFoundError(`The item doesn't exist!`);
    return `${item.name} has been deleted!`
  }
}

module.exports = Item;