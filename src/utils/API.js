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

  signInUser: function ({
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
        url: "/api/user/signin",
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

  deleteFunkoPopFromWant: function (uid, uuid, genre, authToken) {
    return axios(
      {
        method: "DELETE",
        withCredentials: true,
        data: {
          uuid,
          uid,
          genre,
        },
        url: "/api/user/deleteFromWant",
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

  getUserWantList: function (uid) {
    return axios(
      {
        method: "GET",
        withCredentials: true,
        url: `/api/user/getUserWantList/${uid}`,
      },
      { signal }
    );
  },

  uploadUserPhoto: function (uid, authToken, fileUpload) {
    return axios(
      {
        method: "POST",
        data: {
          uid,
          fileUpload,
        },
        headers: {
          "auth-token": authToken,
        },
        url: "/api/user/uploadPhoto",
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

  // NOT IN USE -> USING 2 DIFFERENT FUNCTIONS NOW INCASE USER DOESNT WANT TO LOOK AT BOTH COLLECTIONS TO KEEP COST DOWN
  getSelectedUser: function (uid) {
    return axios(
      {
        method: "GET",
        withCredentials: true,
        url: `/api/user/getSelectedUser/${uid}`,
      },
      { signal }
    );
  },

  getSelectedUserCollection: function (uid) {
    return axios(
      {
        method: "GET",
        withCredentials: true,
        url: `/api/user/getSelectedUserCollection/${uid}`,
      },
      { signal }
    );
  },

  getSelectedUserWantList: function (uid) {
    return axios(
      {
        method: "GET",
        withCredentials: true,
        url: `/api/user/getSelectedUserWantList/${uid}`,
      },
      { signal }
    );
  },

  sendMessageToChat: function ({
    authToken,
    uids,
    chatMessage,
    users,
    chatId,
    userUID,
    selUserUID,
  }) {
    return axios({
      method: "POST",
      data: {
        uids,
        chatMessage,
        users,
        chatId,
        userUID,
        selUserUID,
      },
      url: "/api/user/sendMessage",
      headers: {
        "auth-token": authToken,
      },
    });
  },

  getUserMessages: function (authToken, uid) {
    return axios({
      method: "GET",
      withCredentials: true,
      url: `/api/user/getUserMessages/${uid}`,
      headers: {
        "auth-token": authToken,
      },
    });
  },
};

export default API;
