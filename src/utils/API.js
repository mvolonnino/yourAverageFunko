import axios from "axios";

export default {
  signUpUser: function ({ u }) {
    return axios({
      method: "POST",
      data: {
        uid: u.uid,
        displayName: u.displayName,
        email: u.email,
        photoUrl: u.photoURL,
        phoneNumber: u.phoneNumber,
        providerId: u.providerData[0].providerId,
      },
      withCredentials: true,
      url: "/api/user/signup",
    });
  },

  getFunkoPopData: function (data) {
    return axios({
      method: "GET",
      withCredentials: true,
      url: "/api/funkoPop/getAll",
    });
  },
};
