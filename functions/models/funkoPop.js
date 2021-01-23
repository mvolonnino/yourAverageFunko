class FunkoPop {
  constructor(body) {
    const { genre, name, image, number } = body;
    const keyFields = Object.keys(body);
    const wrongKeyFields = keyFields.filter((key) => {
      return (
        !key.includes("genre") &&
        !key.includes("name") &&
        !key.includes("image") &&
        !key.includes("number")
      );
    });
    if (wrongKeyFields.length >= 1) {
      console.log({ wrongKeyFields });
      return {
        error: `Funko Pop not added to databse - ${wrongKeyFields} is not a defined key for Funko Pop`,
        funkoData: body,
      };
    }
    if (genre && name && image && number) {
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
    } else {
      return {
        error: `Funko Pop not added to database - missing one or more needed details!`,
      };
    }
  }
}

module.exports = FunkoPop;
