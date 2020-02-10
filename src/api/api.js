export default {
  geocode(city) {
    return fetch(
      `https://www.mapquestapi.com/geocoding/v1/address?key=7mgeUcljnphiHOLgKkXGcQNPqhKjZ34B&location=${city}`,
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
