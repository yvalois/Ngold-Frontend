import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import TablaProductos from '../components/store/TablaProductos/TablaProductos';
import { useDispatch, useSelector } from "react-redux";
import { ethers } from 'ethers';

import { useNavigate, Link } from "react-router-dom";
const Carrito = ({ producto, eliminarProducto }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const Orders = useSelector((state) => state.orders);
  const { orderLoaded, orders } = Orders;
  const [id, setId] = useState(0)
  const [details, setDetails] = useState(false)
  const [loading, setLoading] = useState(false)
  const { loginSuccess, userDetails } = user;
  const [selectedorder, setSelectedOrder] = useState({
    orderNumber: "",
    finalStatus: "",
    total: "",
    _id: "",
  });
  const [orden, setOrden] = useState(false)


  const getDetails =(id)=>{
    setId(id);
    setDetails(!details);
    const order = orders.find((p) => p._id === id);
    setSelectedOrder(order);
    setOrden(true);
    setLoading(false);
  }

  const fiveDigit = (num) => {
    return num.toString().padStart(5, "0");
  };


  const splitDate = (date) => {
    const dateArr = date.split("T");
    const dateArr2 = dateArr[0].split("-");
    return `${dateArr2[1]}/${dateArr2[2]}/${dateArr2[0]}`;
  };


  const ordenes = orders.reverse();

  const formatHash =(hash)=>{
    return hash.slice(0, 4) + "..." + hash.slice(hash.length - 4);
  }

  useEffect(() => {
    if (orderLoaded && loading) {
      const order = orders.find((p) => p._id === id);
      setSelectedOrder(order);
      setOrden(true);
      setLoading(false);
    }
  }, [id, orders, orderLoaded, selectedorder]);

  return (
    <div className='car-container'>

      <div className='car-contenedor'>
        <div className="overflow-table">
          <div className='dashboard-content inventory content-tab'>
            <div className="inner-content inventory">
              <h4 className="title-dashboard">Ordenes</h4>
               <div className="table-ranking top">

                <div className="title-ranking">
                  <div className="col-rankingg">Id</div>
                  <div className="col-rankingg">Estado</div>
                  <div className="col-rankingg">Precio</div>
                  <div className="col-rankingg">Fecha</div>
                  <div className="col-rankingg">Detalles</div>
                  <div className="col-rankingg"></div>

                </div>

              </div>
             
             
              {
                !details && orderLoaded ? (
                  ordenes.length > 0 ? (ordenes.reverse().map((order, index) => (
                    <div className="table-ranking ">
                      <div className="content-ranking">
                        <div className="col-rankingg"># {fiveDigit(order.orderNumber)}</div>
                        <div className="col-rankingg coin">{order.finalStatus}</div>
                        <div className="col-rankingg">
                          <p>{ethers.utils.formatUnits(order.total.toString(),18)}</p>

                        </div>
                        <div className="col-rankingg ">
                          {splitDate(order.createdAt)}
                        </div>
                        <div className="col-rankingg "> 
                        <div>
                          <button onClick={() => getDetails(order._id)}>
                            Detalles
                          </button>
                        </div>
                      </div>
                      </div>


                    </div>
                  ))
                  )
                    : (
                      <h4 >No tienes órdenes</h4>
                    )
                ) :details && orden ? (
                  <div className='table-orders'>
                    <div className='orders-contenedor'>
                        <div className="overflow-table">
                            <div className='dashboard-content inventory content-tab'>
                                <div className="inner-content inventory">
                                    <h4 className="title-dashboard">Orden</h4>

                                    <div className="table-ranking top">

                                        <div className="title-ranking">
                                            <div className="col-rankingg">Numero de pedido</div>
                                            <div className="col-rankingg">Estado</div>
                                            <div className="col-rankingg">Fecha</div>
                                            <div className="col-rankingg">Nombre</div>
                                            <div className="col-rankingg">Telefono</div>
                                            <div className="col-rankingg">Correo</div>

                                        </div>
                                    </div>
                                    {/* {
      products.length == 0 &&
      <div>
        Your Cart Is Empty <Link to="tienda" className="text-blue-500">Go Back</Link>

      </div>
    } */}
                                    <>
                                        <div className="table-ranking ">
                                            <div className="content-ranking">
                                                <div className="col-rankingg"># {fiveDigit(selectedorder.orderNumber)}</div>
                                                <div className="col-rankingg">{selectedorder.finalStatus}</div>
                                                <div className="col-rankingg coin">{splitDate(selectedorder.createdAt)}</div>
                                                <div className="col-rankingg">
                                                {selectedorder.ownerName}
                                                </div>
                                                <div className="col-rankingg ">
                                                    <div className='details-button'>
                                                    {selectedorder?.ownerPhone}
                                                    </div>


                                                </div>
                                                <div className="col-rankingg ">
                                                {selectedorder.orderEmail}
                                                </div>

                                            </div>
                                        </div>
                                    </>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='create-category-2'>
                        <div className='car-contenedor'>
                            <div className="overflow-table">
                                <div className='dashboard-content inventory content-tab'>
                                    <div className="inner-content inventory">
                                        <h4 className="title-dashboard">Productos</h4>

                                        <div className="table-ranking top">

                                            <div className="title-ranking2">
                                                <div className="col-rankingg">Nombre del producto</div>
                                                <div className="col-rankingg">Cantidad</div>
                                                <div className="col-rankingg">Precio</div>
                                                <div className="col-rankingg">Ver</div>

                                            </div>

                                        </div>
                                        {/* {
                  products.length == 0 &&
                  <div>
                    Your Cart Is Empty <Link to="tienda" className="text-blue-500">Go Back</Link>

                  </div>
                } */}
                {selectedorder.products.map((item, index) => (<>
                                            <div className="table-ranking " key={index}>
                                                <div className="content-ranking2">
                                                    <div className="col-rankingg">{item.name}</div>
                                                    <div className="col-rankingg">{item.count}</div>

                                                    <div className="col-rankingg">{item.price.toFixed(2)}</div>
                                                    <div className="col-rankingg ">
                                                        <div className='contenedor-de'>
                                                            <div className='delete-button'>

                                                                <Link to={`/store/product/${item.productId}`}>
                                                                    ver
                                                                </Link>

                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>


                                            </div>
                                        </>
                                        )
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='create-category-2'>
                        <div className='car-contenedor'>
                            <div className="overflow-table">
                                <div className='dashboard-content inventory content-tab'>
                                    <div className="inner-content inventory">
                                        <h4 className="title-dashboard">Datos</h4>

                                        <div className="table-ranking top">

                                            <div className="title-ranking2">
                                                <div className="col-rankingg">Total</div>
                                                <div className="col-rankingg">TxHAsh</div>
                                                <div className="col-rankingg">Direccion</div>
                                                <div className="col-rankingg">Token</div>

                                            </div>

                                        </div>
                                        {/* {
                  products.length == 0 &&
                  <div>
                    Your Cart Is Empty <Link to="tienda" className="text-blue-500">Go Back</Link>

                  </div>
                } */}
                                        <>
                                            <div className="table-ranking ">
                                                <div className="content-ranking2">
                                                    <div className="col-rankingg"> {selectedorder.total.toFixed(2)}</div>
                                                    <div className="col-rankingg"><Link >{formatHash(selectedorder.txHash)}</Link></div>
                                                    <div className="col-rankingg ">
                                                    {selectedorder.delivery}
                                                    </div>
                                                    <div className="col-rankingg ">
                                                    {selectedorder.tokenUsed}
                                                    </div>
                                                </div>


                                            </div>
                                        </>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
                :(<h4>
                  Cargando
                </h4>)
              }

              <div>

              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Carrito;
