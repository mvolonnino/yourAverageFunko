import { MDBAlert } from "mdbreact";

const AlertError = ({ err }) => {
  return <MDBAlert color="danger">{err}</MDBAlert>;
};

export default AlertError;
