import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap";
import ngold from '../../assets/images/icon/ngold.png'
import usdt from '../../assets/images/icon/usdt.png'
import { useSelector, useDispatch } from "react-redux";
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
import { updateBalances } from '../../redux/blockchain/blockchainAction';

const RetireModal = (props) => {
    const [value, setValue] = useState(0);
    const [inputAmount, setInputAmount] = useState('');
    const [ngoldBalance, setNgoldBalance] = useState(0)
    const [busdBalance, setBusdBalance] = useState(0)
    const [contracto, setContracto] = useState("")
    const [loading, setLoading] = useState(false)
    const Ndecimals = 18 
    const Udecimals = 8 
    const dispatch = useDispatch()
    
    const { exchangeContract, ngoldContract, busdContract, elfosContract, tiendaContract } = useSelector(state => state.blockchain);

    const setPer = (valor) => {
        setInputAmount('')
        let fra
        if (props.token == "NGOLD") {
            fra = (ngoldBalance * valor) / 100
        } else {
            fra = (busdBalance * valor) / 100

        }

        handleSwap(fra)
        setValue(valor)

    }

    const handleChange = (event) => {
        setInputAmount('')
        let fra
        if (props.token == "NGOLD") {
            fra = (ngoldBalance * event.target.value) / 100
        } else {
            fra = (busdBalance * event.target.value) / 100
        }

        handleSwap(fra)
        setValue(event.target.value)
    };

    const handleSwap = (value) => {
        setValue(0)
        setInputAmount(value)
    };

    const getBalance = async () => {
        if (props.contract === "Exchange") {
            setNgoldBalance(parseFloat(await ngoldContract.balanceOf(exchangeContract.address)) / 10 ** 18);
            setBusdBalance(parseFloat(await busdContract.balanceOf(exchangeContract.address)) / 10 ** 8);
        } else if (props.contract === "Tienda") {
            setNgoldBalance(parseFloat(await ngoldContract.balanceOf(tiendaContract.address)) / 10 ** 18);
            setBusdBalance(parseFloat(await busdContract.balanceOf(tiendaContract.address)) / 10 ** 8);
        } else {
            setNgoldBalance(parseFloat(await ngoldContract.balanceOf(elfosContract.address)) / 10 ** 18);
            setBusdBalance(parseFloat(await busdContract.balanceOf(elfosContract.address)) / 10 ** 8);
        }

        setContracto(props.contract)

    }

    const retirar = async () => {
        setLoading(true)
        try{
            let tx
            if (props.contract === "Exchange") {
                if (props.token === "NGOLD") {
                    tx = await exchangeContract.retire(ngoldContract.address, ethers.utils.parseUnits(inputAmount.toString(), Ndecimals))
                }else{

                    tx = await exchangeContract.retire(busdContract.address, ethers.utils.parseUnits(inputAmount.toString(), Udecimals))
                }
            } else if (props.contract === "Tienda") {
                if (props.token === "NGOLD") {
                    tx = await tiendaContract.retire(ngoldContract.address, ethers.utils.parseUnits(inputAmount.toString(), Ndecimals))
                }else{
                    tx = await tiendaContract.retire(busdContract.address, ethers.utils.parseUnits(inputAmount.toString(), Udecimals))
                }
            } else {
                if (props.token === "NGOLD") {
                    tx = await elfosContract.retire(ngoldContract.address, ethers.utils.parseUnits(inputAmount.toString(), Ndecimals))
                }else{
                    tx = await elfosContract.retire(busdContract.address, ethers.utils.parseUnits(inputAmount.toString(), Udecimals))
                }
            }
            
            await tx.wait()
            setLoading(false)
            dispatch(updateBalances())

            Swal.fire({
                title: 'Success',
                text: 'Retirado correctamente',
                icon: 'success',
                confirmButtonColor: '#FFAE00',

                confirmButtonText: 'OK'
            });

        }catch(e){
            console.log(e)

            Swal.fire({
                title: 'Error',
                text: e.reason,
                icon: 'error',
                confirmButtonColor: '#FFAE00',
    
                confirmButtonText: 'OK',
            })
            setLoading(false)

        }


    }

    const maxBalance = () => {
        let maxValue = ngoldBalance;

        if (props.token == "USDT") {
            maxValue = busdBalance
        } else {
            maxValue = ngoldBalance
        }

        setValue(0)
        handleSwap(maxValue)

    }

    useEffect(() => {
        getBalance()
        setValue(0)
        setInputAmount('')
    }, [props])

    return (

        <Modal
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton></Modal.Header>
            <div className="modal-body space-y-20 pd-40">
                <div style={{ marginBottom: "10px" }}>
                    <h6>
                        Retiro  de {props.token} del contracto {props.contract}
                    </h6>
                </div>
                <div className="r-container">
                    <div className='r-balances'>
                        <div>
                            <p>
                                Balances: {props.token === "NGOLD" ? ngoldBalance : busdBalance}
                            </p>
                        </div>

                        <div className='r-button-max' onClick={maxBalance}>
                            Max
                        </div>
                    </div>
                    <div className='r-input'>
                        <input
                            type="text"
                            placeholder="Monto"
                            value={inputAmount}
                            onChange={(e) => handleSwap(e.target.value)}
                        />
                    </div>
                    <div className='r-slide'>
                        <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px", marginBottom: "10px" }}>
                            <p>{value}%</p>
                        </div>
                        <div className="progress-container">

                            <div className="cont-progress">
                                <div className="progress" style={{ width: `${value}%` }}>
                                </div>
                            </div>
                            <div className='porcentage-points'>
                                <div className='porcentage-point' onClick={() => setPer(25)}>

                                </div>
                                <div className='porcentage-point1' onClick={() => setPer(50)}>

                                </div>
                                <div className='porcentage-point2' onClick={() => setPer(75)}>

                                </div>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={value}
                                onChange={handleChange}
                                className="progress-slider"
                                style={{ border: "none" }}
                            />


                        </div>
                    </div>
                    <div className='r-button'>
                        <button onClick={retirar}>
                            {loading? "Cargando": "Retirar"}
                        </button>
                    </div>

                </div>

            </div>
        </Modal>

    );
};

export default RetireModal;
