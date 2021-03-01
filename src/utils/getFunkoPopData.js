import API from "./API";

const getFunkoPopData = () => {
  const data = API.getFunkoPopData()
    .then((res) => {
      const { data } = res;
      if (data.length > 0) {
        return data;
      } else
        throw new Error("Error retrieving funko pop data. Please try again.");
    })
    .catch((error) => console.error(error));

  return data;
};

export default getFunkoPopData;
