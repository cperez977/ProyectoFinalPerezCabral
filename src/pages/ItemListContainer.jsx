import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from '../firebase.js';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where, deleteDoc } from 'firebase/firestore';

const ItemListContainer = ({ carrito, setCarrito }) => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const categoriaRef = await getDocs(query(collection(db, 'categorias'), where('key', '==', categoryName)));
        if (categoriaRef.docs.length > 0) {
          const categoriaData = categoriaRef.docs[0].data();
          setCategoriaSeleccionada(categoriaData);
          console.log(categoriaData)
          
          
          const productosRef = await getDocs(query(collection(db, 'items'), where('categoria', '==', categoriaData.key)));
          const productosData = productosRef.docs.map((doc) => doc.data());
          setProductos(productosData);
          console.log(productos)
        } else {
          console.error("Categoría no encontrada");
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    obtenerProductos();
  }, [categoryName]);

  return (
    <div className="container mx-auto mt-5">
      <h2 className="font-bold text-2xl mx-3">
       
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 place-items-center mx-10 mt-10">
        {productos.map((producto) => (
          <div key={producto.id}>
            <div className="bg-white py-10 px-3 w-[300px] rounded-2xl shadow-2xl">
              <img
                className="h-48 mx-auto"
                src={`${producto.image}`}
                alt={`${producto.nombre}`}
              />
              <h3 className="font-bold text-center text-xl">
                {producto.nombre}
              </h3>
              <p className="mt-5 text-center">{producto.descripcion}</p>
              <div className="flex justify-between items-center mx-10 mt-10">
                <p className="text-2xl font-semibold text-blue-500">
                  $ {producto.precio}
                </p>
                <button
                  onClick={() => navigate(`/item/${producto.id}`)}
                  className="text-blue-500 "
                  href="#"
                >
                  Ver mas
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setCarrito([...carrito, producto])}
                  className="bg-slate-700 py-3 w-1/2 font-xl font-semibold text-white rounded-2xl mt-8"
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;

