import axios from "axios";
import {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_PROJECT_URL
} from "../config";

export const request = ({ url, method = "POST", data, headers = {} }) => {
  return axios({ url, method, data, headers });
};

const baseURL = AUTH0_PROJECT_URL;

const endpoints = {
  START: baseURL + "/passwordless/start",
  VERIFY: baseURL + "/oauth/token",
  VALIDITY: baseURL + "/userinfo"
};

export default {
  login(email) {
    const data = {
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      connection: "email",
      send: "code",
      email
    };

    return request({
      url: endpoints.START,
      data
    });
  },

  verify(email, otp) {
    const data = {
      grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      realm: "email",
      username: email,
      otp
    };

    return request({
      url: endpoints.VERIFY,
      data
    });
  },

  checkValidity(token) {
    return request({
      url: endpoints.VALIDITY,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};
