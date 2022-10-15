import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class WishlistApi {
    
  // token storage for activating API
  static token;
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    //pass token through the header
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
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

//   /** Get details on a company by handle. */
//   static async getCompany(handle) {
//     let res = await this.request(`companies/${handle}`);
//     return res.company;
//   }
  
//   //get all companies
//   static async getCompanies(handle) {
//     let res = await this.request("companies", { handle });
//     return res.companies;
//   }

//   //get all jobs
//   static async getJobs(title) {
//     let res = await this.request(`jobs`, { title });
//     return res.jobs;
//   }

//   //post apply to a job
//   static async applyToJob(username, id) {
//     let res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
//     return res;
//   }
}

export default WishlistApi;