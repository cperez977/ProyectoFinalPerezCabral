import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase.js'
import Producto from "./Producto";
import productos from "../data/productos";

const Catalogo = ({ setCarrito, carrito }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemCollection = collection(db, 'items');
        const itemSnapshot = await getDocs(itemCollection);
        const itemsData = itemSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  
  return (
    <>
      <div className="container mx-auto">
        <h1 className="mt-5 text-2xl font-bold text-center">
          Catalogo de Productos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 place-items-center mx-10 mt-10">
          {items.map((item, index) => (
            <Producto item={item} key={index}  setCarrito={setCarrito} carrito={carrito} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Catalogo;
