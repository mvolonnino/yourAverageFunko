import React, { useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon,
} from "mdbreact";
import { useDataLayerValue } from "../../context/DataLayer";
import API from "../../utils/API";

const AddModal = ({ data, genre }) => {
  const [state, setState] = useState({
    modal14: false,
  });
  const [status, setStatus] = useState("");
  const [{ user, authToken, reGetUserFunkos }, dispatch] = useDataLayerValue();

  const uuid = () => {
    return Math.floor(Math.random() * Date.now());
  };

  const handleAddFunkoPop = (e) => {
    e.preventDefault();
    const { name, number, image } = data;
    const { uid } = user;

    if (!reGetUserFunkos) {
      dispatch({
        type: "REGET_USER_FUNKOS",
        reGetUserFunkos: true,
      });
    }

    const funko = {
      genre: genre,
      name: name,
      number: number,
      image: image,
      user: true,
      uuid: uuid(),
    };

    API.addFunkoPopTooUser(uid, funko, authToken)
      .then((res) => {
        setStatus(res.status);
        if (!reGetUserFunkos) {
          dispatch({
            type: "REGET_USER_FUNKOS",
            reGetUserFunkos: true,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const toggle = (nr) => () => {
    let modalNumber = "modal" + nr;
    setState({
      [modalNumber]: !state[modalNumber],
    });
  };

  return (
    <MDBContainer>
      <MDBBtn color="primary" onClick={toggle(14)}>
        I Have!
      </MDBBtn>
      <MDBModal isOpen={state.modal14} toggle={toggle(14)} centered>
        <MDBModalHeader toggle={toggle(14)}>{`${data?.name}`}</MDBModalHeader>
        {status === 200 ? (
          <MDBModalBody className="text-center alert alert-success m-0">
            Funko Pop has been added!
          </MDBModalBody>
        ) : status === 400 ? (
          <MDBModalBody className="text-center alert alert-danger m-0">
            400! Funko Pop not added - Close popup and try again
          </MDBModalBody>
        ) : (
          <MDBModalBody className="text-center">
            <MDBIcon icon="check" size="4x" className="animated rotateIn" />
          </MDBModalBody>
        )}
        {!status ? (
          <MDBModalBody>
            {`Are you sure you would like to add this funko pop to your collection?`}
          </MDBModalBody>
        ) : status === 200 ? (
          <MDBModalBody>{`🥳 Woohoo!! 🥳 `}</MDBModalBody>
        ) : (
          status === 400 && <MDBModalBody>{`🤨 Awh Man.. 🥺 `}</MDBModalBody>
        )}

        <MDBModalFooter
          className={`justify-content-center ${status === 200 && "d-none"}`}
        >
          <MDBBtn color="secondary" onClick={handleAddFunkoPop}>
            YES
          </MDBBtn>
          <MDBBtn color="danger" onClick={toggle(14)}>
            NO
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default AddModal;
