import { MDBIcon } from "mdbreact";
import { MDBTooltip } from "mdb-react-ui-kit";

import "./NewMessageAlert.css";

const NewMessageAlert = ({ seen }) => {
  return (
    <MDBTooltip
      tag="a"
      wrapperProps={{ href: "#" }}
      placement="right"
      title={`New Messages!`}
    >
      <MDBIcon icon="comment" className="newMessageIcon" />
    </MDBTooltip>
  );
};

export default NewMessageAlert;
