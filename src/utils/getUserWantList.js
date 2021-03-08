import API from "./API";

const getUserWantList = (uid) => {
  const data = API.getUserWantList(uid)
    .then((res) => {
      const { data } = res;

      return data;
    })
    .catch((error) => {
      console.error(error);
    });

  return data;
};

export default getUserWantList;
