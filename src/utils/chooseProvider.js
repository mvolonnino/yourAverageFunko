import { gProvider, fProvider } from "../fire";

const chooseProvider = (value) => {
  if (value === "google") {
    return gProvider;
  }
  if (value === "facebook") {
    return fProvider;
  }
};

export default chooseProvider;
