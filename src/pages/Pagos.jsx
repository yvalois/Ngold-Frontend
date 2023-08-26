import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers'
import moment from "moment";
import Swal from 'sweetalert2';
const Pagos = () => {

    const [data, setData] = useState([]);
    const [viewHistory, setViewHistory] = useState(false);
    const { accountAddress, exchangeContract, busdContract } = useSelector(state => state.blockchain);
    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");


    const Data = async () => {
        const fetchData = await exchangeContract.getSaledata();
        if (viewHistory) {
            setData(fetchData.filter(data => data.claimed === true && data.owner.toLowerCase() === accountAddress.toLowerCase()));
        } else {
            setData(fetchData.filter(data => data.claimed === false && data.owner.toLowerCase() === accountAddress.toLowerCase()));
        }
    }
    const timestampToDate = (timestamp) => {
        return moment.unix(timestamp).format("DD MMM, YYYY");
    }

    const retire = async (id) => {
        try {
            const tx = await exchangeContract.claimSell(id, busdContract.address);
            await tx.wait();
            Swal.fire({
                title: 'Success',
                text: 'Aprovado correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
              });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: error.reason,
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            })
        }
    }


    useEffect(() => {
        if (accountAddress) {
            Data();
        }
    }, [viewHistory, accountAddress])

    return (
        <div className='create-category-2'>
            <div className='car-contenedor'>
                <div className="overflow-table">
                    <div className='dashboard-content inventory content-tab'>
                        <div className="inner-content inventory">
                            <h4 className="title-dashboard">Retiros pendientes (Exchange)</h4>

                            <div className="table-ranking top">

                                <div className="title-ranking2">
                                    <div className="col-rankingg">Opco ingresados</div>
                                    <div className="col-rankingg">Busd a retirar</div>
                                    <div className="col-rankingg">dia de retiro</div>
                                    <div className="col-rankingg">Retirar</div>
                                    <div className="col-rankingg"></div>
                                    <div className="col-rankingg"></div>
                                    <div className="col-rankingg"></div>



                                </div>

                            </div>
                            {/* {
products.length == 0 &&
<div>
Your Cart Is Empty <Link to="tienda" className="text-blue-500">Go Back</Link>

</div>
} */}

                            {data.length > 0 ? (<div className="table-ranking ">
                                <div className="content-ranking2">
                                    <div className="col-rankingg">{parseFloat((data.opcoAmount / 10 ** 8))}</div>
                                    <div className="col-rankingg">{parseFloat(ethers.utils.formatEther(data.busdAmount))}</div>
                                    <div className="col-rankingg">{timestampToDate(parseInt(data.unlockTime))}</div>
                                    <div className="col-rankingg ">
                                        <div>
                                            <button  onClick={() => retire(data.id)}>
                                                Retirar
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-rankingg ">
                                    </div>
                                    <div className="col-rankingg ">
                                    </div>
                                    <div className="col-rankingg ">
                                    </div>
                                    <div className="col-rankingg ">
                                    </div>
                                </div>


                            </div>) :
                                (<h4 >No tienes retiros pendientes</h4>
                                )}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pagos