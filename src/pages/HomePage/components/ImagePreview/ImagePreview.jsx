import { useState, useEffect } from "react";

import "./ImagePreview.css";
import { API } from "../../../../utils";
import { auth } from "../../../../fire";
import { AlertError } from "../../../../components";

const ImagePreview = ({ uid, authToken, setUpdatePhoto }) => {
  const [fileUpload, setFileUpload] = useState("");
  const [previewImage, setPreviewImage] = useState();
  const [previewDefaultText, setPreviewDefaultText] = useState();
  const [fileSizeBig, setFileSizeBig] = useState(false);
  const [wrongFileType, setWrongFileType] = useState(false);

  const handlePreviewPhoto = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setFileSizeBig(false);
      setWrongFileType(false);
      const fileSize = file.size;
      const fileType = file.type;

      previewDefaultText.style.display = "block";
      previewImage.style.display = "none";

      if (
        fileType !== "image/jpeg" &&
        fileType !== "image/png" &&
        fileType !== "image/svg+xml"
      ) {
        setWrongFileType(true);
      } else if (fileSize > 100000) {
        setFileSizeBig(true);
      } else {
        const reader = new FileReader();

        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";

        reader.readAsDataURL(file);

        reader.onload = (e) => {
          setFileUpload(e.target.result);
        };
      }
    } else {
      previewDefaultText.style.display = "block";
      previewImage.style.display = "none";

      setFileUpload("");
      setFileSizeBig(false);
      setWrongFileType(false);
    }
  };

  const handleSavePhoto = (e) => {
    e.preventDefault();
    if (fileUpload) {
      const { currentUser } = auth;
      console.log(currentUser);

      // currentUser
      //   .updateProfile({
      //     photoURL: fileUpload,
      //   })
      //   .then((res) => {
      //     console.log({ res });
      //   });
      // API.uploadUserPhoto(uid, authToken, fileUpload)
      //   .then((res) => {
      //     console.log(res);
      //     setFileSizeBig(false);
      //   })
      //   .catch((error) => {
      //     console.log({ error });
      //   });
    }
  };

  const handleClose = () => {
    setUpdatePhoto(false);
  };

  useEffect(() => {
    const previewContainer = document.getElementById("imagePreview");
    const previewImage = previewContainer.querySelector(".imagePreviewImage");
    setPreviewImage(previewImage);
    const previewDefaultText = previewContainer.querySelector(
      ".imagePreviewDefaultText"
    );
    setPreviewDefaultText(previewDefaultText);
  }, [handlePreviewPhoto]);

  return (
    <div className="imageUploadPreview text-center text-white bg-dark">
      <h3 className="photoUploadTitle">
        Choose new photo to upload for your avatar
      </h3>
      <small className={`m-2 ${fileSizeBig ? "text-danger" : "text-white-50"}`}>
        File must be less than 100kb
      </small>
      <input
        type="file"
        name="inputFile"
        id="inputFile"
        onChange={(e) => handlePreviewPhoto(e)}
      />
      <div id="imagePreview">
        <img
          src={fileUpload}
          alt="Image Preview"
          className="imagePreviewImage"
        />
        <span className="imagePreviewDefaultText">
          {wrongFileType
            ? "File must be PNG or JPEG"
            : fileSizeBig
            ? "File must be less than 100kbs"
            : !wrongFileType && !fileSizeBig && "Image Preview"}
        </span>
      </div>
      <div className="imageFooter">
        <button
          className={`btn ${fileUpload && !fileSizeBig ? null : "disabled"}`}
          onClick={(e) => handleSavePhoto(e)}
        >
          upload
        </button>
        <button className="btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
