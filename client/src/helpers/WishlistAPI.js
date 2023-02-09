import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class WishlistApi {
    
  // token storage for activating API
  static token;
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    //pass token through the header
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${WishlistApi.token}` };
    const params = (method === "get")
        ? data
        : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /**USERS API ******************************************************/

  //post new user during signup and create token
  static async registerNewUser(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  //post token for user authentication during login
  static async createToken(data) {
    let res = await this.request(`auth/login`, data, "post");
    return res.token;
  }

  //get user info
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  //update user info
  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }


  /**WISHLISTS API *****************************************************/

  //get all wishlists in the database
  static async getAllWishlists() {
    let res = await this.request(`wishlists`);
    return res.wishlists;
  }

  //get all wishlist categories in the database
  static async getAllWishlistCategories() {
    let res = await this.request(`wishlists/categories`);
    return res.categories;
  }

  //get all wishlists of a user
  static async getUserWishlists(username) {
    let res = await this.request(`users/${username}/wishlists`);
    return res.wishlists;
  }

  //create a new wishlist for a user
  static async createUserWishlist(username, data) {
    let res = await this.request(`users/${username}/wishlists`, data, "post");
    return res.wishlist;
  }

  //get all wishlist categories in the database
  static async getUserWishlistsByCategory(username, category) {
    let res = await this.request(`users/${username}/wishlists/${category}`);
    return res.wishlist;
  }

  //get all wishlist categories in the database
  static async getUserWishlistByTitle(username, category, title) {
    let res = await this.request(`users/${username}/wishlists/${category}/${title}`);
    return res.wishlist;
  }

  //get all wishlist categories in the database
  static async addItemToUserWishlist(username, category, title, data) {
    let res = await this.request(`users/${username}/wishlists/${category}/${title}`, data, "post");
    return res;
  }

  /**ITEMS API *****************************************************/

  //get all items in the database
  static async getItems() {
    let res = await this.request(`items`);
    return res.items;
  }

  //create a new item
  static async createNewItem(data) {
    let res = await this.request(`items`, data, "post");
    return res.items;
  }

  //get an item in the database
  static async getItem(id) {
    let res = await this.request(`items/${id}`);
    return res.item;
  }

  //update an item in the database
  static async updateItem(id, data) {
    let res = await this.request(`items/${id}`, data, "patch");
    return res.item;
  }

  //get all items categories
  static async getItemCategories() {
    let res = await this.request(`items/categories`);
    return res.categories;
  }

}

export default WishlistApi;