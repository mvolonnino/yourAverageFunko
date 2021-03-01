import API from "./API";

const getPickedGenre = (genre) => {
  const data = API.getPickedGenre(genre)
    .then((res) => {
      const { data } = res;
      console.log(data);

      if (Object.keys(data).length > 0) {
        return data;
      } else throw new Error();
    })
    .catch((error) => console.error(error));

  return data;
};

export default getPickedGenre;
