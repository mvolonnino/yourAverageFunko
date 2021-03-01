import React, { useState, useContext } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon,
} from "mdbreact";
import { API } from "../../utils";
import { UserContext } from "../../context";

const RemoveModal = ({ data, genre }) => {
  const { userState, userDispatch } = useContext(UserContext);
  const { user, authToken, getUserFunkos } = userState;
  const [status, setStatus] = useState("");
  const [noGenre, setNoGenre] = useState(false);
  const [state, setState] = useState({
    modal14: false,
  });

  const handleRemoveFunkoPop = (e) => {
    e.preventDefault();
    const { uid } = user;
    const { uuid } = data;

    API.deleteFunkoPopFromUser(uid, uuid, genre, authToken)
      .then((res) => {
        if (res.status === 200) {
          setStatus(res.status);
        }
        if (res.data.length === 0) {
          setNoGenre(true);
        }
      })
      .catch((err) => {
        if (err) {
          console.error(err);
          setStatus(400);
        }
      });
  };

  const toggle = (nr) => () => {
    let modalNumber = "modal" + nr;
    if (status === 200) {
      if (!getUserFunkos) {
        userDispatch({
          type: "GET_USER_FUNKOS",
          getUserFunkos: true,
        });
      }
    }
    setState({
      [modalNumber]: !state[modalNumber],
    });
    setStatus("");
    setNoGenre(false);
  };

  return (
    <MDBContainer>
      <MDBBtn color="primary" onClick={toggle(14)}>
        Remove!
      </MDBBtn>
      <MDBModal isOpen={state.modal14} toggle={toggle(14)} centered>
        <MDBModalHeader toggle={toggle(14)}>
          {noGenre ? "Their is no more funko pops in this genre" : data?.name}
        </MDBModalHeader>
        {status === 200 ? (
          <MDBModalBody className="text-center alert alert-success m-0">
            Funko Pop has been removed!
          </MDBModalBody>
        ) : status === 400 ? (
          <MDBModalBody className="text-center alert alert-danger m-0">
            400! Funko Pop not removed - Close popup and try again
          </MDBModalBody>
        ) : (
          <MDBModalBody className="text-center">
            <MDBIcon icon="trash" size="4x" className="animated rotateIn" />
          </MDBModalBody>
        )}
        {!status ? (
          <MDBModalBody>
            {`Are you sure you would like to remove this funko pop from your collection?`}
          </MDBModalBody>
        ) : status === 200 ? (
          <MDBModalBody>{`Wow, you really did it... the funko pop is gone 🤯`}</MDBModalBody>
        ) : (
          status === 400 && (
            <MDBModalBody>{`🤨 Hmm, seems like this funko wants to stay...  `}</MDBModalBody>
          )
        )}

        <MDBModalFooter
          className={`justify-content-center ${
            (status === 200 && "d-none") || (status === 400 && "d-none")
          }`}
        >
          <MDBBtn color="secondary" onClick={handleRemoveFunkoPop}>
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

export default RemoveModal;
