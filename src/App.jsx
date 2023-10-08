import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ItemDetailContainer from "./pages/ItemDetailContainer";
import ItemListContainer from "./pages/ItemListContainer";
import Layout from "./components/Layout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orden from "./pages/Orden";


function App() {
  const [carrito, setCarrito] = useState([]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout carrito={carrito} setCarrito={setCarrito} />,
      children: [
        {
          path: "/",
          index:true,
          element: <Home carrito={carrito} setCarrito={setCarrito} />,
        },
        {
          path: "/item/:id",
          element: (
            <ItemDetailContainer carrito={carrito} setCarrito={setCarrito} />
          ),
        },
        {
          path: "/category/:categoryName",
          element: (
            <ItemListContainer carrito={carrito} setCarrito={setCarrito} />
          ),
        },

        {
          path: "/cart",
          element: <Cart  carrito={carrito} setCarrito={setCarrito}/>
        },
        {
          path: "/checkout",
          element: <Checkout carrito={carrito}/>
        },
        {
          path: "/orden",
          element: <Orden carrito={carrito}/>
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
