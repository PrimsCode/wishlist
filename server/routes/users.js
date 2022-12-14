"use strict";

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const jsonschema = require("jsonschema");
const UserUpdateSchema = require("../schemas/userUpdate.json");
const WishlistNewSchema = require("../schemas/wishlistNew.json");

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
      const validator = jsonschema.validate(req.body, UserUpdateSchema);
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


    /** GET all wishlists of user by username
   * Returns an array of wishlist
   * Authorization required: logged in
   **/
  router.get("/:username/wishlists", ensureLoggedIn, async function (req, res, next) {
    try {
      console.log("got to endpoint");
      const wishlists = await User.getAllWishlists(req.params.username);
      return res.json({ wishlists });
    } catch (err) {
      return next(err);
    }
  });
  
  /** POST a new wishlist for a user by username
   * Requests {wishlistCategory, description}
   * Returns { id, username, wishlistCategory, description}
   * Authorization required: admin or same user as username
   **/
  router.post("/:username/wishlists", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, WishlistNewSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
      console.log(req.params.username);
      console.log(req.body.category);
      console.log(req.body.description);
      const wishlist = await User.createWishlist(req.params.username, req.body);
      return res.json({ wishlist});
    } catch (err) {
      return next(err);
    }
  });


      /** GET a wishlist by category of user by username
       * Returns a wishlist
       * Authorization required: logged in
       **/
       router.get("/:username/wishlists/:category", ensureLoggedIn, async function (req, res, next) {
        try {
          const wishlist = await User.getWishlistByCategory(req.params.username, req.params.category);
          return res.json({ wishlist });
        } catch (err) {
          return next(err);
        }
      });
  
  // /** PATCH user by username
  //  * Data can include: { firstName, lastName, password, profilePic}
  //  * Returns { username, firstName, lastName, profilePic, isAdmin }
  //  * Authorization required: admin or same user as username
  //  **/
  // router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  //   try {
  //     const validator = jsonschema.validate(req.body, UserUpdateSchema);
  //     if (!validator.valid) {
  //       const errs = validator.errors.map(e => e.stack);
  //       throw new BadRequestError(errs);
  //     }
  //     const user = await User.update(req.params.username, req.body);
  //     return res.json({ user });
  //   } catch (err) {
  //     return next(err);
  //   }
  // });


  router.patch("/:username/wishlists/:category", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, WishlistNewSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
      console.log(req.params.username);
      console.log(req.body.category);
      console.log(req.body.description);
      const wishlist = await User.createWishlist(req.params.username, req.body);
      return res.json({ wishlist});
    } catch (err) {
      return next(err);
    }
  });


  
  
  /** DELETE user by username
   * Authorization required: admin or same user as username
   **/
  router.delete("/:username/wishlists/:category", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      await User.removeWishlist(req.params.username, req.params.category);
      return res.json({ deleted: `${req.params.username}'s wishlist of ${req.params.category}` });
    } catch (err) {
      return next(err);
    }
  });




module.exports = router;