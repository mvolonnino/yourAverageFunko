import React, { useState, useContext, useEffect } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBFormInline,
} from "mdbreact";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, useLocation } from "react-router-dom";

import "./Navbar.css";
import { auth } from "../../fire";
import { searchData, getFunkoPopData } from "../../utils";
import { UserContext, FunkosContext } from "../../context";
import { NewMessageAlert } from "../../pages/MessagesPage/components";

const Navbar = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const { funkoState, funkoDispatch } = useContext(FunkosContext);
  const { user } = userState;
  const { dbFunkoPops } = funkoState;
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { state } = location;
  const [messageAlert, setMessageAlert] = useState(false);

  const handleTogglerClick = () => {
    setCollapsed(!collapsed);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      setLoading(true);
      if (dbFunkoPops.length === 0) {
        console.log("fetching db funko pops...");
        getFunkoPopData()
          .then((res) => {
            setLoading(false);
            funkoDispatch({
              type: "SET_DB_FUNKOPOPS",
              dbFunkoPops: res,
            });

            const results = searchData(res, search);
            history.push({
              pathname: "/results",
              search: search,
              state: results,
            });
          })
          .catch((error) => console.error(error));
      } else {
        setLoading(false);
        const results = searchData(dbFunkoPops, search);
        history.push({
          pathname: "/results",
          search: search,
          state: results,
        });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userSignedIn");
    auth
      .signOut()
      .then(() => {
        history.push("/");
        userDispatch({
          type: "LOGOUT",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const overlay = (
    <div
      id="sidenav-overlay"
      style={{ backgroundColor: "transparent" }}
      onClick={handleTogglerClick}
    />
  );

  useEffect(() => {
    if (state === true) {
      setMessageAlert(true);
    } else if (state === false) {
      setMessageAlert(false);
    }
  }, [state]);

  return (
    <div id="apppage">
      <MDBNavbar
        color="unique-color-dark"
        dark
        expand="md"
        fixed="top"
        scrolling
        hover="true"
      >
        <MDBNavbarBrand className="brand mr-2">
          <MDBDropdown size="sm" className="userDropdown">
            <MDBDropdownToggle color="primary" className="navDropdown">
              YAF
              <Avatar
                src={user?.photoURL}
                alt={user?.displayName}
                className="userAvatar mr-2"
              />
              {messageAlert === true ? <NewMessageAlert /> : null}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem>
                <MDBNavItem>{user?.displayName}</MDBNavItem>
              </MDBDropdownItem>
              <MDBDropdownItem>
                <MDBNavItem>
                  <MDBLink to="/home">My Profile</MDBLink>
                </MDBNavItem>
              </MDBDropdownItem>
              <MDBDropdownItem>
                <MDBNavItem>
                  <MDBLink to="/messages">{`My Messages ${
                    messageAlert === true ? "(new)" : ""
                  }`}</MDBLink>
                </MDBNavItem>
              </MDBDropdownItem>
              <MDBDropdownItem>
                <MDBNavItem className="logoutText" onClick={handleLogout}>
                  Logout
                </MDBNavItem>
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={handleTogglerClick} />
        <MDBCollapse isOpen={collapsed} navbar>
          <MDBNavbarNav left>
            <MDBNavItem className="text-black-50 dividerTab">|</MDBNavItem>
            <MDBNavItem className="text-white ">
              <MDBLink to="/funkos">Search Collections</MDBLink>
            </MDBNavItem>
            <MDBNavItem className="text-white ">
              <MDBLink to="/users">Users</MDBLink>
            </MDBNavItem>
          </MDBNavbarNav>

          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline
                waves
                className="navSearch"
                onSubmit={handleSearch}
              >
                <div className="md-form my-0 navbarSearch">
                  <input
                    className="form-control mr-sm-2 navInput"
                    type="text"
                    placeholder="Search Series, Name or Number"
                    value={search && search}
                    aria-label="Search"
                    onChange={(e) => setSearch(e.currentTarget.value)}
                  />
                  <SearchIcon className="searchIcon" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      {collapsed && overlay}
    </div>
  );
};

export default Navbar;
