"use strict";

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const jsonschema = require("jsonschema");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

/** Routes for users. */

  /** GET all users in the database
   * Returns list of all users.
   * Authorization required: logged in
   **/
  router.get("/", ensureLoggedIn, async function (req, res, next) {
    try {
      const users = await User.getAll();
      return res.json({ users });
    } catch (err) {
      return next(err);
    }
  });
  
  /** GET user by username
   * Returns { username, firstName, lastName, profilePic, isAdmin}
   * Authorization required: admin or same user as username
   **/
  router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const user = await User.get(req.params.username);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });
  
  /** PATCH user by username
   * Data can include: { firstName, lastName, password, profilePic}
   * Returns { username, firstName, lastName, profilePic, isAdmin }
   * Authorization required: admin or same user as username
   **/
  router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, userUpdateSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
      const user = await User.update(req.params.username, req.body);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });
  
  /** DELETE user by username
   * Authorization required: admin or same user as username
   **/
  router.delete("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      await User.remove(req.params.username);
      return res.json({ deleted: req.params.username });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;