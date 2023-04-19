export async function processManualLocation(address: string) {
  //let city = "Praça Vicente Jorge, 57-B, Cachoeira do Norte, CEP: 39.648, Chapada do Norte - MG"; // manual lat entry is already in store state
  // let state = props.userPostalCode // manual long entry is already in store state
  // This fetch uses the API key stored in your fron-end .env file "process.env.REACT_APP_googleKey"
  console.info("\n\n address \n\n", address);

  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=+${address}&key=AIzaSyC1LdqTsA0TtB0yEJdJg2pGZZf8pXZTnic`;

  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "OK") {
        console.info(res.results);
        return getUserCoords(res.results);
      } else if (res.status === "ZERO_RESULTS") {
        return {
          lat: 0,
          lng: 0,
        };
      }
    });
}

// Obtaining and dispatching lat and long coords from google geocoding API response
const getUserCoords = (googleRes: any) => {
  // let lat = googleRes[0].geocode.location.latitude // You have obtained latitude coordinate!
  // let long = googleRes[0].geocode.location.longitude // You have obtained longitude coordinate!
  // props.set_lat(lat) // dispatching to store state
  // props.set_long(long) //dispatching to store state
  return {
    lat: googleRes[0].geometry.location.lat,
    lng: googleRes[0].geometry.location.lng,
  };
};
