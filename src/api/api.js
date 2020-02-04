require("dotenv").config();
const MAPQUEST = process.env.MAPQUEST;

export default {
  geocode(city) {
    // console.log(process.env.MAPQUEST);
    return fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=7mgeUcljnphiHOLgKkXGcQNPqhKjZ34B&location=${city}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    ).then(res => res.json());
  }
};