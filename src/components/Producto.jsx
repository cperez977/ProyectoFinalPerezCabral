import React from "react";
import { useNavigate } from "react-router-dom";

const Producto = ({ item, setCarrito, carrito }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-10 w-[300px] rounded-2xl shadow-2xl">
      <img
        className="h-48 mx-auto"
        src={`${item.image}`}
        alt={`${item.nombre}`}
      />
      <h3 className="font-bold text-center mx-3 text-xl">{item.nombre}</h3>
      <p className="mt-5 text-center">{item.descripcion}</p>
      <div className="flex justify-between items-center mx-10 mt-10">
        <p className="text-2xl font-semibold text-blue-500">$ {item.precio}</p>
        <button
          onClick={() => navigate(`/item/${item.id}`)}
          className="text-blue-500 "
          href="#"
        >
          Ver mas
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setCarrito([...carrito, item])}
          className="bg-slate-700 py-3 w-1/2 font-xl font-semibold text-white rounded-2xl mt-8"
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default Producto;
