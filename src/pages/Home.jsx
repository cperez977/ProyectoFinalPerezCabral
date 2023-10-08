import { useState } from "react";
import Navbar from "../components/Navbar";
import Catalogo from "../components/Catalogo";

const Home = ({carrito, setCarrito}) => {
  
  return (
    <>
     
      <Catalogo setCarrito={setCarrito} carrito={carrito} />
    </>
  );
};

export default Home;
