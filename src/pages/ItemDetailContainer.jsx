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
import { useParams, Link } from "react-router-dom";

const ItemDetailContainer = ({ carrito, setCarrito }) => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  console.log(id);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemRef = doc(db, "items", id);
        const itemDoc = await getDoc(itemRef);

        if (itemDoc.exists()) {
          const itemData = itemDoc.data();
          setProducto({ id: itemDoc.id, ...itemData });
        } else {
          console.log("El producto no existe en Firebase.");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    fetchItem();
  }, [id]);

  return (
    <div className="mt-5 container mx-auto">
      <div>
        <h2 className="text-2xl mx-3 font-bold">{producto.nombre}</h2>
        <p className="text-xl mx-3 mt-10">
          <span className="font-bold">Descripcion:</span> {producto.descripcion}
        </p>
        <p className="text-xl mx-3 mt-10">
          <span className="font-bold">Precio:</span> {producto.precio}
        </p>
      </div>

      <img
        className="h-48 mx-auto"
        src={`${producto.image}`}
        alt={`${producto.nombre}`}
      />

      <div className="flex justify-center">
      <button
        onClick={() => setCarrito([...carrito, producto])}
        className="bg-slate-700 py-3 w-1/2 font-xl font-semibold text-white rounded-2xl mt-8"
      >
        Comprar
      </button>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
