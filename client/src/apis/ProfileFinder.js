import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:4400/api/v1/profile"
})