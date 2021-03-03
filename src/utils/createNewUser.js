import { auth } from "../fire";
import API from "./API";

const createNewUser = (userObj) => {
  const { email, password, displayName } = userObj;
  try {
    return auth.createUserWithEmailAndPassword(email, password).then((res) => {
      const { uid, email, photoURL, phoneNumber, providerData } = res.user;

      localStorage.setItem("userSignedIn", JSON.stringify(uid));

      return auth.currentUser
        .updateProfile({
          displayName: displayName,
        })
        .then(async () => {
          const res = await API.signUpUser({
            uid,
            displayName,
            email,
            photoURL,
            phoneNumber,
            providerData,
          });
          if (res.headers["auth-token"]) {
            return res;
          }
        });
    });
  } catch (error) {
    return error;
  }
};

export default createNewUser;
