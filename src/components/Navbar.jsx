import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";
import Cart from "../pages/Cart.jsx";

const Navbar = ({ carrito }) => {
  const navigate = useNavigate();
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const itemCollection = collection(db, "categorias");
        const itemSnapshot = await getDocs(itemCollection);
        const itemsData = itemSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategoria(itemsData);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchCategorias();
  }, []);

  const totalPrecio = carrito.reduce(
    (total, producto) => total + Number(producto.precio),
    0
  );

  const toggleCarrito = () => {
    setCarritoVisible(!carritoVisible);
  };

  const handleClickCarrito = () => {
    navigate("/cart");
    setCarritoVisible(!carritoVisible);
  };
  console.log(carrito);

  return (
    <div className="bg-slate-800 w-full relative">
      <div className="container mx-auto flex justify-between h-40 items-center">
        <Link to={"/"}>
          <div className="text-white text-3xl font-bold">CPStore</div>
        </Link>
        <div className="flex flex-col md:flex-row md:gap-10">
          {categoria.map((item, index) => (
            <button
              className="text-white text-xl "
              onClick={() => navigate(`/category/${item.key}`)}
            >
              {item.descripcion}
            </button>
          ))}
        </div>

        <div className="relative">
          <button onClick={toggleCarrito}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-white absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <span className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 text-center rounded-full text-xs">
              {carrito.length}
            </span>
          </button>

          {carritoVisible && (
            <div className="absolute top-full right-0 bg-white p-4 shadow-md h-[300px] w-[400px]  ">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-center">
                  Carrito de Compras
                </h1>
                <button className="text-blue-500 " onClick={handleClickCarrito}>
                  Ver Carrito
                </button>
              </div>
              <div className=" overflow-y-auto  h-[90%]">
                <Cart carrito={carrito} />
                <div className="text-lg font-bold mt-4">
                  Total: ${Number(totalPrecio)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
