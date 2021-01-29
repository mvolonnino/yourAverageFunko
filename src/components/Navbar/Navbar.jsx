import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import { useHistory } from "react-router-dom";

import "./Navbar.css";
import { useDataLayerValue } from "../../context/DataLayer";
import { auth } from "../../fire";

const Navbar = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [{ user }, dispatch] = useDataLayerValue();
  const history = useHistory();

  const handleTogglerClick = () => {
    setCollapsed(!collapsed);
  };

  const overlay = (
    <div
      id="sidenav-overlay"
      style={{ backgroundColor: "transparent" }}
      onClick={handleTogglerClick}
    />
  );

  return (
    <div id="apppage">
      <MDBNavbar color="info-color" dark expand="md" fixed="top" scrolling>
        <MDBNavbarBrand className="brand mr-5">
          Your Average Funko
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={handleTogglerClick} />
        <MDBCollapse isOpen={collapsed} navbar>
          <MDBNavbarNav left>
            <MDBNavItem className="text-black-50 dividerTab">|</MDBNavItem>
            <MDBNavItem className="text-white searchTab">Search</MDBNavItem>
            <MDBNavItem className="text-white userTab">Users</MDBNavItem>
          </MDBNavbarNav>

          <MDBNavbarNav right>
            <MDBDropdown size="sm" hover>
              <MDBDropdownToggle>
                {`${user.displayName}`}
                <MDBIcon icon="user"></MDBIcon>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem>
                  <MDBNavItem>Profile</MDBNavItem>
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <MDBNavItem
                    className="logoutText"
                    onClick={() =>
                      auth
                        .signOut()
                        .then(() => {
                          history.push("/");
                          dispatch({
                            type: "LOGOUT",
                          });
                        })
                        .catch((err) => {
                          console.error(err);
                        })
                    }
                  >
                    Logout
                  </MDBNavItem>
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      {collapsed && overlay}
    </div>
  );
};

export default Navbar;
