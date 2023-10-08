import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ carrito }) => {
  return (
    <>
      <Navbar carrito={carrito} />
      <Outlet />
    </>
  );
};

export default Layout;
