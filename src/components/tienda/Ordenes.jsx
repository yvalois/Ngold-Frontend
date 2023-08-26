import React, { useState, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa';
import { AiTwotoneEdit, AiFillCloseCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchAdminOrders, confirmOrCancelOrder } from "../../redux/store/actions/adminOrdersAction";
import { ethers } from "ethers"


function Ordenes() {
    const [details, setDetails] = useState(false);
    const [id, setId] = useState(0);
    const navigate = useNavigate();
    const adminOrders = useSelector(state => state.adminOrders);
    const { orderLoaded, orders } = adminOrders;
    const dispatch = useDispatch();

    const [selectedorder, setSelectedOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [lodedOrders, setLoadedOrders] = useState(false);
    const [orden, setOrden] = useState(false)

    const detalles = (id) => {
        setDetails(!details);
        setId(id);
        const order = adminOrders?.orders?.find((p) => p._id === id);
        setSelectedOrder(order);
        setLoadedOrders(false);
        setOrden(true);

        setLoading(false);
    }
    const fiveDigit = (num) => {
        return num.toString().padStart(5, "0");
    }


    const dateSplit = (date) => {
        const dateArr = date.split("T");
        const dateArr2 = dateArr[0].split("-");
        return `${dateArr2[1]}/${dateArr2[2]}/${dateArr2[0]}`;
    };

    const confirmOrCancelOrders = (orderId, finalStatus) => {
        dispatch(confirmOrCancelOrder(orderId, finalStatus));
        setLoadedOrders(false);
        setLoading(true);
    };

    useEffect(() => {
        setLoadedOrders(adminOrders.orderLoaded);
    }, [adminOrders.orderLoaded]);



    useEffect(() => {
        dispatch(fetchAdminOrders())
    }, [])

    const formatHash = (hash) => {
        return hash.slice(0, 4) + "..." + hash.slice(hash.length - 4);
    }

    return (
        <>
            {!details && orderLoaded &&
                <div className='table-orders'>

                    <div className='orders-contenedor'>
                        <div className="overflow-table">
                            <div className='dashboard-content inventory content-tab'>
                                <div className="inner-content inventory">
                                    <h4 className="title-dashboard">Ordenes</h4>

                                    <div className="table-ranking top">

                                        <div className="title-ranking">
                                            <div className="col-rankingg">Id</div>
                                            <div className="col-rankingg">Numero de pedido</div>
                                            <div className="col-rankingg">Precio</div>
                                            <div className="col-rankingg">Estado</div>
                                            <div className="col-rankingg">Detalles</div>
                                            <div className="col-rankingg">Confirmar</div>
                                            <div className="col-rankingg">Cancelar</div>
                                        </div>

                                    </div>

                                    {orderLoaded ? (
                                        orders.length > 0 ? (
                                            orders.map((order, index) =>
                                                <>
                                                    <div className="table-ranking " key={index}>
                                                        <div className="content-ranking">
                                                            <div className="col-rankingg">{index + 1}</div>
                                                            <div className="col-rankingg">{fiveDigit(order.orderNumber)}</div>
                                                            <div className="col-rankingg coin">${ethers.utils.formatUnits(order.total.toString(), 18)}</div>
                                                            <div className="col-rankingg">
                                                                {order.finalStatus}
                                                            </div>
                                                            <div className="col-rankingg ">
                                                                <div className='details-button'>

                                                                    <button onClick={() => detalles(order._id)}>
                                                                        detalles
                                                                    </button>
                                                                </div>


                                                            </div>
                                                            <div className="col-rankingg ">
                                                                <div className='contenedor-de'>
                                                                    <div className='confirm-button' >

                                                                        <button onClick={() =>
                                                                            confirmOrCancelOrders(order._id, "confirmed")
                                                                        }>
                                                                            Confirmar
                                                                        </button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-rankingg ">
                                                                <div className='contenedor-de'>
                                                                    <div className='cancel-button' onClick={() =>
                                                                        confirmOrCancelOrders(order._id, "cancelled")
                                                                    }>
                                                                        <button >
                                                                            Cancelar
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>

                                            )
                                        )
                                            :
                                            (<h4>
                                                No hay ordenes
                                            </h4>)

                                    )
                                        :
                                        <h4>
                                            Cargando
                                        </h4>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {details &&
                loading ? (
                <h4>
                    Cargando
                </h4>)
                :
                orden && (<div className='table-orders'>
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
                                    <>
                                        <div className="table-ranking ">
                                            <div className="content-ranking">
                                                <div className="col-rankingg"># {fiveDigit(selectedorder.orderNumber)}</div>
                                                <div className="col-rankingg">{selectedorder.finalStatus}</div>
                                                <div className="col-rankingg coin">{dateSplit(selectedorder.createdAt)}</div>
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

                                                                <Link to={`/producto/${item.productId}`}>
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
                    <div className='status-container'>


                        {selectedorder.finalStatus === "pending" ?
                            (<div className='buttons'>
                                <div className='cancel-button'>
                                    <button onClick={() =>
                                        confirmOrCancelOrders(selectedorder._id, "cancelled")
                                    }>
                                        Cancelar
                                    </button>
                                </div>

                                <div className='confirm-button'>
                                    <button onClick={() =>
                                        confirmOrCancelOrders(selectedorder._id, "confirmed")
                                    }>
                                        Confirmar
                                    </button>
                                </div>
                            </div>)
                            : selectedorder.finalStatus === "confirmed" ? (
                                <div className='succes-order'>
                                    Orden Confirmada
                                </div>
                            )
                                : (
                                    <div className='cancel-order'>
                                        Orden Cancelada
                                    </div>

                                )
                        }



                    </div>
                </div>)
            }

        </>
    )
}

export default Ordenes