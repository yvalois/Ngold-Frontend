import React, { useState } from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const Producto = ({ producto, eliminarProducto }) => {
  const [cantidad, setCantidad] = useState(producto.cantidad);

  const aumentarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <tr>
      <td>
        <div>
          <img src={producto.image} alt="Producto" />

        </div>

      </td>
      <td><div>
        {producto.nombre}
      </div></td>
      <td>${producto.precio.toFixed(2)}</td>
      <td>
        <div className='cant-buttons'>
          <div className='decrease' onClick={disminuirCantidad}><FaMinus /></div>
          <p> {cantidad} </p>
          <div className='increase' onClick={aumentarCantidad}><FaPlus /></div>
        </div>

      </td>
      <td>

          <div className='delete-button' >

            <FaTrash />


        </div>


      </td>
    </tr>
  );
};

export default Producto;
