export default {
  revGeocode(latLon) {
    return fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=7mgeUcljnphiHOLgKkXGcQNPqhKjZ34B&location=${latLon}`,
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
