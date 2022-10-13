"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {userExistCheck} = require("../helpers/checks");
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
   * Returns { username, first_name, last_name, profile_pic, is_admin}
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

}

module.exports = User;