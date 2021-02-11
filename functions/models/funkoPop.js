class FunkoPop {
  constructor(data) {
    const { genre, name, image, number, user, uuid } = data;
    console.log({ uuid });
    const keyFields = Object.keys(data);
    const wrongKeyFields = keyFields.filter((key) => {
      return (
        !key.includes("genre") &&
        !key.includes("name") &&
        !key.includes("image") &&
        !key.includes("number") &&
        !key.includes("user") &&
        !key.includes("id")
      );
    });
    if (wrongKeyFields.length >= 1) {
      console.log({ wrongKeyFields });
      return {
        error: `Error! - ${wrongKeyFields} is not a defined key for Funko Pop`,
        funkoData: data,
      };
    }
    if (!user && !uuid && genre && name && image && number) {
      return Object.assign({
        genre: genre,
        funkoData: [
          {
            name: name,
            image: image,
            number: number,
          },
        ],
      });
    } else if (user && uuid && genre && name && image && number) {
      return Object.assign({
        genre: genre,
        funkoData: [
          {
            name: name,
            image: image,
            number: number,
            user: user,
            uuid: uuid,
          },
        ],
      });
    } else {
      return {
        error: `Error! - missing one or more needed details!`,
      };
    }
  }
}

module.exports = FunkoPop;
