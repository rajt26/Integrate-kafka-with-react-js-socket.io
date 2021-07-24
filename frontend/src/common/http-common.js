import axios from "axios"

// set backend url for call api

export default axios.create({
    baseURL:  "http://localhost:3000",
    headers: {
      "Content-type": "application/json",
      }
})