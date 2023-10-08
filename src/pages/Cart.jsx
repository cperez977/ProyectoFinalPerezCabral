import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Cart = ({carrito}) => {
    const navigate = useNavigate();
  return (
    <div>
        {carrito
                  .reduce((productos, producto) => {
                    const index = productos.findIndex(
                      (p) => p.id === producto.id
                    );
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
                          <h2 className="text-lg font-semibold">
                            {producto.nombre}
                          </h2>
                        </div>

                        <p className="text-lg font-bold">
                          ${producto.precio * producto.cantidad}
                        </p>
                      </div>
                      <p className="block">
                        Cantidad: {Number(producto.cantidad)}
                      </p>
                    </div>
                  ))}

                  <div className='flex justify-center mt-10'>
                    <button onClick={()=>navigate("/checkout")} className='text-2xl bg-green-600 w-1/4 py-2 text-white font-bold'>Ir a Checkout</button>
                  </div>
    </div>
  )
}

export default Cart