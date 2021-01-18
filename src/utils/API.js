import axios from "axios";

export default {
  signUpUser: function ({ u }) {
    console.log({ u });

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
};
