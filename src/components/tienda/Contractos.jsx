import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ethers } from 'ethers';
import moment from 'moment';
import { contract } from '../../redux/blockchain/blockchainRouter';
import Swal from 'sweetalert2';
import RetireModal from '../layouts/RetireModal';
import { updateBalances } from '../../redux/blockchain/blockchainAction';

function Contractos() {
    const [showModal, setShowModal] = useState(false)

    const router = contract();
    const timestampToDate = (timestamp) => {
        return moment.unix(timestamp).format("DD MMM, YYYY");
    }
    const sliceAddress = (address) => {
        return address.slice(0, 4) + "..." + address.slice(address.length - 4);
    }

    const { ngoldContract, busdContract, accountAddress, exchangeContract, tiendaContract, elfosContract } = useSelector(state => state.blockchain);
    const dispatch = useDispatch();

    const [busdBalance, setBusdBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [tokenAmount, setTokenAmount] = useState(0);
    const [busdAmount, setBusdAmount] = useState(0);
    const [busdBalance2, setBusdBalance2] = useState(0);
    const [tokenBalance2, setTokenBalance2] = useState(0);
    const [busdBalance3, setBusdBalance3] = useState(0);
    const [tokenBalance3, setTokenBalance3] = useState(0);

    const [data, setData] = useState([]);
    const [totalBusd, setTotalBusd] = useState(0);
    const [loading, setLoading] = useState(false)
    const exchangeBalanace = async () => {
        const busd = await busdContract.balanceOf(exchangeContract.address);
        const token = await ngoldContract.balanceOf(exchangeContract.address);

        setBusdBalance(ethers.utils.formatUnits(busd, 8));
        setTokenBalance(ethers.utils.formatEther(token));
    }

    const nftBalanace = async () => {
        const busd = await busdContract.balanceOf(elfosContract.address);
        const token = await ngoldContract.balanceOf(elfosContract.address);
        setBusdBalance3(parseFloat(busd / 10**8));
        setTokenBalance3(parseFloat(token / 10 ** 18));
    }


    useEffect(() => {
        if (accountAddress) {
            exchangeBalanace();
            nftBalanace();
        }
    }, [accountAddress])

    const Data = async () => {
        const fetchData = await exchangeContract.getSaledata();
        setData(fetchData.filter(data => data.claimed === false));
    }

    useEffect(() => {
        if (accountAddress) {
            Data();
        }
    }, [accountAddress])

    useEffect(() => {
        if (data.length > 0) {
            let total = 0;
            data.forEach(data => {
                total += parseFloat(ethers.utils.formatEther(data.busdAmount));
            });
            setTotalBusd(total);
        }
    }, [data])

    const retire = async (option) => {

        if (option === 1) {
            setLoading(true)
            try {
                const tx = await exchangeContract.retireTokenBalance(ngoldContract.address);
                await tx.wait();
                exchangeBalanace();
                setTokenAmount(0);
                await exchangeBalanace();

                Swal.fire({
                    title: 'Success',
                    text: 'withdraw successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                setLoading(false)
            } catch (error) {
                setLoading(false)
                Swal.fire({
                    title: 'failed',
                    text: error.reason,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

        }
        if (option === 2) {
            setLoading(true)
            try {
                const tx = await exchangeContract.retireTokenBalance(busdContract.address);
                await tx.wait();
                exchangeBalanace();
                setTokenAmount(0);
                await exchangeBalanace();

                Swal.fire({
                    title: 'Success',
                    text: 'withdraw successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                setLoading(false)

            } catch (error) {
                setLoading(false)
                Swal.fire({
                    title: 'failed',
                    text: error.reason,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

        }

    }



    const busdStoreBalance = async () => {
        const balance = await busdContract.balanceOf(tiendaContract.address);
        setBusdBalance2(ethers.utils.formatUnits(balance,8));
    }

    const tokenStoreBalance = async () => {
        const balance = await ngoldContract.balanceOf(tiendaContract.address);
        setTokenBalance2(ethers.utils.formatEther(balance));
    }

    useEffect(() => {
        if (accountAddress) {
            busdStoreBalance();
            tokenStoreBalance();
        }
    }, [accountAddress]);


    const retire2 = async (option) => {

        if (option === 1) {
            try {
                setLoading(true)
                const tx = await tiendaContract.retireTokenBalance(ngoldContract.address);
                await tx.wait();
                setLoading(false);
                await tokenStoreBalance()
                Swal.fire({
                    title: 'Success',
                    text: 'withdraw successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                setTokenAmount(0);
            } catch (error) {
                setLoading(false)
                Swal.fire({
                    title: 'failed',
                    text: error.reason,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

        }
        if (option === 2) {
            setLoading(true)

            try {
                const tx = await tiendaContract.retireTokenBalance(busdContract.address);
                await tx.wait();
                exchangeBalanace();
                setTokenAmount(0);
                await busdStoreBalance()
                Swal.fire({
                    title: 'Success',
                    text: 'withdraw successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            } catch (error) {
                setLoading(false)
                Swal.fire({
                    title: 'failed',
                    text: error.reason,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

        }

    }

    const retire3 = async (option) => {

        if (option === 1) {
            setLoading(true)
            try {
                const tx = await elfosContract.withdrawToken(ngoldContract.address);
                await tx.wait();
                exchangeBalanace();
                setTokenAmount(0);
                await nftBalanace();
                Swal.fire({
                    title: 'Success',
                    text: 'withdraw successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                setLoading(false)
            } catch (error) {
                setLoading(false)
                Swal.fire({
                    title: 'failed',
                    text: error.reason,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

        }
        if (option === 2) {
            setLoading(true)

            try {
                const tx = await elfosContract.withdrawToken(busdContract.address);
                await tx.wait();
                exchangeBalanace();
                setTokenAmount(0);
                await nftBalanace();
                Swal.fire({
                    title: 'Success',
                    text: 'withdraw successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                setLoading(false)
            } catch (error) {
                setLoading(false)
                Swal.fire({
                    title: 'failed',
                    text: error.reason,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }


        }

    }

    const [contracto, setContracto] = useState('')
    const [token, setToken] = useState('')


    const manageModal = (token, contracto) =>{
        setToken(token)
        setContracto(contracto)
        setShowModal(true)
    }

    
    useEffect(() => {
        dispatch(updateBalances())
    }, [showModal])
    

    return (
        <div className='contracts'>
            <div className='orders-contenedor'>
                <div className="overflow-table">
                    <div className='dashboard-content inventory content-tab'>
                        <div className="inner-content inventory">
                            <h4 className="title-dashboard">Balances</h4>

                            <div className="table-ranking top">

                                <div className="title-ranking">
                                    <div className="col-rankingg">Contracto</div>
                                    <div className="col-rankingg">Balance Ngold</div>
                                    <div className="col-rankingg">Balance USDT</div>
                                    <div className="col-rankingg">Retirar Ngold</div>
                                    <div className="col-rankingg">Retirar USDT</div>

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
                                        <div className="col-rankingg">Exchange</div>
                                        <div className="col-rankingg">{tokenBalance}</div>
                                        <div className="col-rankingg coin"> {busdBalance}</div>
                                        <div className="col-rankingg">
                                            <div className='action-button'>
                                                <button onClick={() =>  manageModal("NGOLD", "Exchange")}>
                                                    {loading ? "Cargando" : "Retirar"}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-rankingg ">
                                            <div className='action-button'>
                                                <button onClick={() =>manageModal("USDT", "Exchange")} >
                                                    {loading ? "Cargando" : "Retirar"}
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-ranking ">
                                    <div className="content-ranking">
                                        <div className="col-rankingg">Tienda</div>
                                        <div className="col-rankingg">{tokenBalance2}</div>
                                        <div className="col-rankingg coin">{busdBalance2}</div>
                                        <div className="col-rankingg">
                                            <div className='action-button'>
                                                <button onClick={() => manageModal("NGOLD", "Tienda")}>
                                                    {loading ? "Cargando" : "Retirar"}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-rankingg ">
                                            <div className='action-button'>
                                                <button onClick={() => manageModal("USDT", "Tienda")}>
                                                    {loading ? "Cargando" : "Retirar"}
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-ranking ">
                                    <div className="content-ranking">
                                        <div className="col-rankingg">NFts</div>
                                        <div className="col-rankingg">{tokenBalance3}</div>
                                        <div className="col-rankingg coin">{busdBalance3}</div>
                                        <div className="col-rankingg">
                                            <div className='action-button'>
                                                <button onClick={() => manageModal("NGOLD", "NFts")}>
                                                    {loading ? "Cargando" : "Retirar"}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-rankingg ">
                                            <div className='action-button'>
                                                <button onClick={() => manageModal("USDT", "Nfts")}>
                                                    {loading ? "Cargando" : "Retirar"}
                                                </button>

                                            </div>
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
                                <h4 className="title-dashboard">Retiros pendientes (Exchange)</h4>

                                <div className="table-ranking top">

                                    <div className="title-ranking2">
                                        <div className="col-rankingg">Wallet</div>
                                        <div className="col-rankingg">Ngold</div>
                                        <div className="col-rankingg">USDT</div>
                                        <div className="col-rankingg">Tiempo restante</div>
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
                                {accountAddress && data.map((data, index) => (<>
                                    <div className="table-ranking ">
                                        <div className="content-ranking2">
                                            <div className="col-rankingg">{sliceAddress(data.owner)} </div>
                                            <div className="col-rankingg">{parseFloat(data.opcoAmount / 10 ** 8)}</div>
                                            <div className="col-rankingg">{parseFloat(data.opcoAmount / 10 ** 8)}</div>
                                            <div className="col-rankingg ">
                                                {timestampToDate(parseInt(data.unlockTime))}
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


                                    </div>

                                </>))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RetireModal
                show={showModal}
                token={token}
                contract={contracto}
                onHide={() => setShowModal(false)}
            />
        </div>
    )
}

export default Contractos