class FunkoPop {
  constructor(data) {
    const { genre, name, image, number, user } = data;
    const keyFields = Object.keys(data);
    const wrongKeyFields = keyFields.filter((key) => {
      return (
        !key.includes("genre") &&
        !key.includes("name") &&
        !key.includes("image") &&
        !key.includes("number") &&
        !key.includes("user")
      );
    });
    if (wrongKeyFields.length >= 1) {
      console.log({ wrongKeyFields });
      return {
        error: `Error! - ${wrongKeyFields} is not a defined key for Funko Pop`,
        funkoData: data,
      };
    }
    if (!user && genre && name && image && number) {
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
    } else if (user && genre && name && image && number) {
      return Object.assign({
        genre: genre,
        funkoData: [
          {
            name: name,
            image: image,
            number: number,
            user: user,
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
