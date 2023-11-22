import axios from "axios";

async function getCoordinates(zipCode) {
  const apiKey = "AIzaSyApjd7cqtDon2yQzC3q3aTI6xsnE8naU7Y"; // Replace with your Google Maps API key
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const result = response.data.results[0];

    if (result) {
      const { lat, lng } = result.geometry.location;
      const { formatted_address } = response.data.results[0];
      return {
        lat,
        lng,
        address: formatted_address,
      };
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export default getCoordinates;
