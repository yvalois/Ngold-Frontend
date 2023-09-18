import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import TablaProductos from '../components/store/TablaProductos/TablaProductos';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Api } from '../utils/Api'
import { modifyCart, removeFromCart } from '../redux/store/actions/cartActions';

const Carrito = ({ producto, eliminarProducto }) => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.user)
  const { tokenPrice } = useSelector(state => state.tokenPrice)
  const { loginSuccess } = user
  const { cartLoaded, products, loading } = cart


  const aumentarCantidad = (id, stock, cantidad) => {
  if(parseInt(cantidad) + 1 <= stock  ){
    qtyChangeHandler(id, parseInt(cantidad) + 1)
  } 
  };

  const disminuirCantidad = (id, cantidad) => {
    if (cantidad > 1) {
      qtyChangeHandler(id, parseInt(cantidad) - 1)
    }
  };

  const qtyChangeHandler = (id, qty) => {
    dispatch(modifyCart(id, qty))
  }

  const removeFromCartHandler = item => {
    dispatch(removeFromCart(item._id))
  }



  if (!cartLoaded) return (
    <div className="w-full h-full">
      <div className='w-full flex justify-center mt-12'>
        <h2 className='font-bold'>Loading.....</h2>

      </div>
    </div>
  )

  else if (cartLoaded)
    return (
      <div className='car-container'>

        <div className='car-contenedor'>
          <div className="overflow-table">
            <div className='dashboard-content inventory content-tab'>
              <div className="inner-content inventory">
                <h4 className="title-dashboard">Carrito</h4>

                <div className="table-ranking top">

                  <div className="title-ranking">
                    <div className="col-rankingg">Imagen</div>
                    <div className="col-rankingg">Producto </div>
                    <div className="col-rankingg">Precio de unidad</div>
                    <div className="col-rankingg">cantidad</div>
                    <div className="col-rankingg">SubTotal</div>
                    <div className="col-rankingg">Eliminar</div>
                  </div>

                </div>
                {
                  products.length == 0 &&
                  <div>
                    Your Cart Is Empty <Link to="tienda" className="text-blue-500">Go Back</Link>

                  </div>
                }
                {products.map(item => (<>
                  <div className="table-ranking ">
                    <div className="content-ranking">
                      <div className="col-rankingg"><div className="image"><img src={item.imageUrl.url} alt={item.name} /></div></div>
                      <div className="col-rankingg">{item.name}</div>
                      <div className="col-rankingg coin">{item.price} USDT</div>
                      <div className="col-rankingg">
                        <div className='cant-buttons'>
                          <div className='decrease' onClick={()=>disminuirCantidad(item.product, item.qty)}><FaMinus /></div>
                          <p> {item.qty} </p>
                          <div className='increase' onClick={()=>aumentarCantidad(item.product, item.countInStock, item.qty)}><FaPlus /></div>
                        </div>

                      </div>
                      <div className="col-rankingg ">
                        {parseFloat(item.qty * item.price).toFixed(2) } USDT
                      </div>
                      <div className="col-rankingg ">
                        <div className='contenedor-de'>
                          <div className='delete-button' onClick={() => removeFromCartHandler(item)}>

                            <FaTrash />

                          </div>
                        </div>


                      </div>
                    </div>


                  </div>
                </>))}

              </div>
            </div>
          </div>
        </div>

        <div>
          <button onClick={()=>{window.location.href="/checkout"}}> Hacer checkOut </button>
        </div>

      </div>
    );
};

export default Carrito;
