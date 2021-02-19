import axios from "axios";
const controller = new AbortController();
const signal = controller.signal;

const API = {
  signUpUser: function ({
    uid,
    displayName,
    email,
    photoURL,
    phoneNumber,
    providerData,
  }) {
    return axios(
      {
        method: "POST",
        data: {
          uid: uid,
          displayName: displayName,
          email: email,
          photoURL: photoURL,
          phoneNumber: phoneNumber,
          providerId: providerData[0].providerId,
        },
        withCredentials: true,
        url: "/api/user/signup",
      },
      { signal }
    );
  },

  getFunkoPopData: function () {
    return axios(
      {
        method: "GET",
        withCredentials: true,
        url: "/api/funkoPop/getAll",
      },
      { signal }
    );
  },

  getGenreListData: function () {
    return axios(
      {
        method: "GET",
        withCredentials: true,
        url: "/api/funkoPop/getAllGenres",
      },
      { signal }
    );
  },

  getPickedGenre: function (query) {
    return axios(
      {
        method: "GET",
        withCredentials: true,
        url: `/api/funkoPop/getPickedGenre/${query}`,
      },
      { signal }
    );
  },

  searchFunkoPopData: function (query) {
    return axios(
      {
        method: "GET",
        withCredentials: true,
        url: `/api/funkoPop/search/${query}`,
      },
      { signal }
    );
  },

  addFunkoPopTooUser: function (uid, funko, authToken) {
    return axios(
      {
        method: "POST",
        withCredentials: true,
        data: {
          funko: funko,
          uid: uid,
        },
        url: "/api/user/addFunkoPop",
        headers: {
          "auth-token": authToken,
        },
      },
      { signal }
    );
  },

  deleteFunkoPopFromUser: function (uid, uuid, genre, authToken) {
    return axios(
      {
        method: "DELETE",
        withCredentials: true,
        data: {
          uuid: uuid,
          uid: uid,
          genre: genre,
        },
        url: "/api/user/deleteFunkoPop",
        headers: {
          "auth-token": authToken,
        },
      },
      { signal }
    );
  },

  getUserFunkoPops: function (uid) {
    return axios(
      {
        method: "GET",
        withCredentials: true,
        url: `/api/user/getUserFunkoPops/${uid}`,
      },
      { signal }
    );
  },

  getAllUsers: function () {
    return axios(
      {
        method: "GET",
        withCredentials: true,
        url: "/api/user/getAll",
      },
      { signal }
    );
  },
};

export default API;
