import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8800", //the api url (cloud Function)
});
export default instance;
