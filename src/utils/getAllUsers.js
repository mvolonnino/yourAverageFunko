import API from "./API";

const getAllUsers = () => {
  const data = API.getAllUsers()
    .then((res) => {
      const { data } = res;

      if (data.length > 0) {
        return data;
      } else throw new Error("Hmm. Found no users. Try again.");
    })
    .catch((error) => console.error(error));

  return data;
};

export default getAllUsers;
