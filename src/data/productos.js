const productos = [
  {
    id: 1,
    tipo: "notebook",
    imagen:
      "https://ofishop.com/4677-large_default/notebook-dell-latitude-3520-intel-core-i5-.jpg",
    titulo: "Notebook Dell 15",
    descripcion: "La mejor Laptop de la historia",
    precio: 2300,
  },
  {
    id: 2,
    tipo: "celular",
    imagen:
      "https://www.shoppingchina.com.py/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNWF5QlE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c2e6ab964b6b41d0f688b9c57689deceb640b74e/869762.jpg",
    titulo: "Iphone 14 PRO 128GB",
    descripcion: "El mejor Celular de la historia",
    precio: 1000,
  },
  {
    id: 3,
    tipo: "pc_escritorio",
    imagen: "https://mla-s1-p.mlstatic.com/777167-MLA46258832185_062021-F.jpg",
    titulo: "PC Intel i9-10700",
    descripcion: "El PC Mas potente del mundo",
    precio: 2000,
  },
  {
    id: 4,
    tipo: "notebook",
    imagen:
      "https://www.cordobanotebooks.com.ar/wp-content/uploads/2023/04/NP750XDA-KD1US4.jpg",
    titulo: "Notebook Samsung Galaxy Pro",
    descripcion: "Una Notebook Samsung",
    precio: 2500,
  },
];

export default productos;

export function obtenerProductoPorId(id) {
  // Buscamos el producto con el ID proporcionado
  const productoEncontrado = productos.find((producto) => producto.id === id);

  // Verificamos si se encontró un producto con ese ID
  if (productoEncontrado) {
    return productoEncontrado; // Devolvemos el producto encontrado
  } else {
    return null; // Si no se encontró ningún producto con ese ID, puedes devolver null u otro valor indicativo.
  }
}
