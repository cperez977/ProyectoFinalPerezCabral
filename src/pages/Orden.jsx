import React, { useEffect, useState } from "react";
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

const Orden = () => {
  const [orden, setOrden] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const orderCollection = collection(db, "orders");
        const orderSnapshot = await getDocs(orderCollection);
        const orderData = orderSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrden(orderData);
        console.log(orden);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  // Calcular el precio total de los productos
  const calcularPrecioTotal = () => {
    if (orden[orden.length - 1]?.carrito) {
      return orden[orden.length - 1]?.carrito.reduce(
        (total, producto) => total + Number(producto.precio),
        0
      );
    }
    return 0;
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Facturado A:</h1>
          <p className="mt-5 font-bold">Nombre </p>
          <p className="mt-2">{orden[orden.length - 1]?.nombre}</p>
          <p className="mt-5 font-bold">Apellido </p>
          <p className="mt-2">{orden[orden.length - 1]?.apellido}</p>
          <p className="mt-5 font-bold">Telefono </p>
          <p className="mt-2">{orden[orden.length - 1]?.telefono}</p>
          <p className="mt-5 font-bold">Correo electronico </p>
          <p className="mt-2">{orden[orden.length - 1]?.email}</p>
        </div>
      </div>
      <div className="mt-10 w-full ">
        <h2 className="font-bold text-xl mb-5">Mis productos</h2>
        {orden[orden.length - 1]?.carrito &&
        orden[orden.length - 1]?.carrito.length > 0 ? (
          <div>
            <table className="table-fixed w-full text-center">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {orden[orden.length - 1]?.carrito.map((producto, index) => (
                  <tr className="font-semibold" key={index}>
                    <td>{producto.nombre}</td>
                    <td>{Number(producto.precio)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 font-bold">
              Precio Total: $ {Number(calcularPrecioTotal())}
            </p>
          </div>
        ) : (
          <p>No hay productos en el carrito.</p>
        )}
      </div>
    </div>
  );
};

export default Orden;
