import { auth } from "../fire";
import { API, chooseProvider } from "./index";

const signInWithProvider = (provider) => {
  try {
    return auth.signInWithPopup(provider).then(async (res) => {
      const { isNewUser } = res.additionalUserInfo;

      const {
        uid,
        displayName,
        email,
        photoURL,
        phoneNumber,
        providerData,
      } = auth.currentUser;

      if (isNewUser) {
        const res = await API.signUpUser({
          uid,
          displayName,
          email,
          photoURL,
          phoneNumber,
          providerData,
        });
        if (res.headers["auth-token"]) {
          localStorage.setItem("userSignedIn", JSON.stringify(uid));
          return {
            res,
            newUser: true,
          };
        }
      } else {
        await localStorage.setItem("userSignedIn", JSON.stringify(uid));
        return res;
      }
    });
  } catch (error) {
    return error;
  }
};

export default signInWithProvider;
