import React, { useState } from "react";
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
import { useHistory } from "react-router-dom";

import "./Navbar.css";
import { useDataLayerValue } from "../../context/DataLayer";
import { auth } from "../../fire";
import API from "../../utils/API";
import searchData from "../../utils/searchData";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [{ user, dbFunkoPops }, dispatch] = useDataLayerValue();
  const history = useHistory();

  const handleTogglerClick = () => {
    setCollapsed(!collapsed);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_IS_LOADING",
      isLoading: true,
    });

    const results = await searchData(dbFunkoPops, search);
    history.push({
      pathname: "/results",
      search: search,
      state: results,
    });

    dispatch({
      type: "SET_IS_LOADING",
      isLoading: false,
    });
    // API.searchFunkoPopData(search)
    //   .then((res) => {
    //     const { data } = res;
    //     history.push({
    //       pathname: "/results",
    //       search: search,
    //       state: data,
    //     });
    //     dispatch({
    //       type: "SET_SEARCHED_FUNKOPOPS",
    //       searchedFunkoPops: data,
    //     });
    //     dispatch({
    //       type: "SET_IS_LOADING",
    //       isLoading: false,
    //     });
    //   })
    //   .catch((err) => console.error(err));
  };

  const handleLogout = () => {
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
      });
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
      <MDBNavbar
        color="unique-color-dark"
        dark
        expand="md"
        fixed="top"
        scrolling
        hover
      >
        <MDBNavbarBrand className="brand mr-2">
          <MDBDropdown hover size="sm" className="userDropdown">
            <MDBDropdownToggle color="primary" className="navDropdown">
              YAF
              <Avatar
                src={user?.photoUrl || "alt will be used"}
                alt={user?.displayName}
                className="userAvatar"
              />
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
            <MDBNavItem
              className="text-white funkosTab"
              onClick={handleTogglerClick}
            >
              <MDBLink to="/funkos">Search Collections</MDBLink>
            </MDBNavItem>
            <MDBNavItem className="text-white userTab">Users</MDBNavItem>
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
