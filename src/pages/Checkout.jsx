import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase.js';
import Cart from "./Cart";

const Checkout = ({ carrito }) => {
    const navigate=useNavigate()
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (email !== email2) {
      console.log("El email no coincide");
    } else {
      const objetoCliente = {
        nombre,
        apellido,
        telefono,
        email,
        carrito
      };
  
      try {
        const ordersCollection = collection(db, 'orders');
        await addDoc(ordersCollection, objetoCliente);
        console.log("Orden guardada en Firebase: ", objetoCliente);
        // Puedes redirigir al usuario a una página de confirmación o realizar otras acciones aquí
      } catch (error) {
        console.error("Error al guardar la orden en Firebase:", error);
      }

      navigate("/orden")
    }
  };

  return (
    <div className="flex">
      <div className="w-[60%]">
        <div className="px-20">
          <h1 className="mt-10 text-2xl  font-semibold">
            Datos de Facturacion
          </h1>
          <form action="">
            <div className="mt-4 ">
              <label className="font-bold" htmlFor="nombre">
                Nombre
              </label>
              <input
                className="w-full mt-3 p-3 rounded-2xl  "
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mt-4 ">
              <label className="font-bold" htmlFor="apellido">
                Apellido
              </label>
              <input
                className="w-full mt-3 p-3 rounded-2xl  "
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
            <div className="mt-4 ">
              <label className="font-bold" htmlFor="telefono">
                Telefono
              </label>
              <input
                className="w-full mt-3 p-3 rounded-2xl  "
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="mt-4 ">
              <label className="font-bold" htmlFor="email">
                Correo electronico
              </label>
              <input
                className="w-full mt-3 p-3 rounded-2xl  "
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4 ">
              <label className="font-bold" htmlFor="email">
                Repetir Correo electronico
              </label>
              <input
                className="w-full mt-3 p-3 rounded-2xl  "
                type="text"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
              />
            </div>

            <div>
              <button
                className="bg-green-500 w-full mt-10 py-3 text-white font-bold rounded-2xl"
                type="submit"
                onClick={handleSubmit}
              >
                Generar orden
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div className="flex justify-around items-center mt-10 ">
          <h1 className="text-2xl  font-semibold ">Tu Carrito</h1>
          <span className="rounded-full bg-slate-700 text-xl text-white py-2 px-4 font-bold ">
            {carrito.length}
          </span>
        </div>
        <div className="border-2 border-black px-10 mt-5">
          {carrito
            .reduce((productos, producto) => {
              const index = productos.findIndex((p) => p.id === producto.id);
              if (index === -1) {
                productos.push({ ...producto, cantidad: 1 });
              } else {
                productos[index].cantidad++;
              }
              return productos;
            }, [])
            .map((producto) => (
              <div key={producto.id} className="border p-2 mb-2 ">
                <div className="flex justify-between items-center">
                  <div className="w-full flex items-center ">
                    <img
                      src={producto.image}
                      alt={producto.nombre}
                      className="w-16 h-16"
                    />
                    <h2 className="text-lg font-semibold">{producto.nombre}</h2>
                  </div>

                  <p className="text-lg font-bold">
                    ${producto.precio * producto.cantidad}
                  </p>
                </div>
                <p className="block">Cantidad: {Number(producto.cantidad)}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
