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
          photoUrl: photoURL,
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

  addFunkoPopTooUser: function (uid, funko) {
    console.log({ uid, funko });
    return axios(
      {
        method: "POST",
        withCredentials: true,
        data: {
          funko: funko,
          uid: uid,
        },
        url: "/api/user/addFunkoPop",
      },
      { signal }
    );
  },
};

export default API;
