import React, { useState } from 'react';
import Producto from './Producto';


const TablaProductos = () => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Producto 1', precio: 10, cantidad: 1, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXi_2EdBhfOFR5axvlr9RdYPow7B38SVCcBA&usqp=CAU" },
    { id: 2, nombre: 'Producto 2', precio: 15, cantidad: 1, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXi_2EdBhfOFR5axvlr9RdYPow7B38SVCcBA&usqp=CAU" },
    // Agrega más productos aquí
  ]);

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter(producto => producto.id !== id);
    setProductos(nuevosProductos);
  };

  return (
    <div className="tabla-productos">
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre del Producto</th>
            <th>Precio de Unidad</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <Producto
              key={producto.id}
              producto={producto}
              eliminarProducto={eliminarProducto}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaProductos;
