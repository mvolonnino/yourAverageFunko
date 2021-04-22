import { MDBTooltip } from "mdb-react-ui-kit";
import { MDBIcon } from "mdbreact";

import "./IconSent.css";

const IconSent = ({ icon, lastMessage }) => {
  return (
    <MDBTooltip
      tag="a"
      wrapperProps={{ href: "#" }}
      placement="top"
      title={`Message sent successfuly - '${
        lastMessage.message
      }', delivered at ${new Date(lastMessage.timestamp).toLocaleTimeString()}`}
      className="toolTip"
    >
      <MDBIcon icon={icon} size="2x" className="greenIcon animated rotateIn" />
    </MDBTooltip>
  );
};

export default IconSent;
