import API from "./API";

const getUserFunkoPops = (uid) => {
  const data = API.getUserFunkoPops(uid)
    .then((res) => {
      const { data } = res;
      if (data) {
        return data;
      } else {
        throw new Error("Error retrieving User funkopops. Please try again");
      }
    })
    .catch((error) => console.error(error));

  return data;
};

export default getUserFunkoPops;
