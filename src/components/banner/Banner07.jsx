import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Link } from 'react-router-dom';
import img from '../../assets/images/product/product75.jpg'
import img2 from '../../assets/images/product/product79.jpg'

import icon11 from '../../assets/images/svg/icon-wallet-1.svg'
import icon22 from '../../assets/images/svg/icon-wallet-2.svg'
import ngold from '../../assets/images/icon/ngold.png'
import usdt from '../../assets/images/icon/usdt.png'


import { useDispatch, useSelector } from "react-redux";
import { FaExchangeAlt } from "react-icons/fa";
import { ethers } from 'ethers';
import { useAccount } from 'wagmi'
import { updateBalances } from '../../redux/blockchain/blockchainAction';
import { useWeb3Modal } from '@web3modal/react'
import Swal from 'sweetalert2';
import { ConnectKitButton } from "connectkit";
import { contract } from './../../redux/blockchain/blockchainRouter';
import { getWalletClient } from '@wagmi/core'
import { useNetwork } from 'wagmi';
import ModalSwap from '../layouts/modalSwap';
import Connect from '../layouts/Connect';

Banner06.propTypes = {

};

function Banner06(props) {
    const { data } = props;
    const router = contract();
    const { chain } = useNetwork();
    const [inputAmount, setInputAmount] = useState('');
    const [outputAmount, setOutputAmount] = useState('');
    const [isSwapped, setIsSwapped] = useState(false);
    const [allowance, setAllowance] = useState(0);
    const [isBuy, setIsBuy] = useState(true);
    const [loading, setLoading] = useState(false);
    const [cant, setCant] = useState(0);
    const [showModal, setShowModal] = useState(false)
    const { exchangeContract, ngoldContract, busdContract, accountAddress, ngoldBalance, busdBalance, provider, isConnect } = useSelector(state => state.blockchain);
    const { isConnected } = useAccount();
    const [connectShow, setConnectShow] = useState(false)
    const decimals = 18;

    const dispatch = useDispatch();
    const handleSwap = (value) => {
        setInputAmount(value)
        // Aquí podrías implementar la lógica real para el intercambio de criptomonedas.
        // Por simplicidad, solo calcularemos el monto de salida como el doble del monto de entrada.
        if (value) {
            setearOutput(value)
        } else {
            setOutputAmount('');

        }
    };

    const verifyApprove = async () => {
        if (isBuy) {
            try {
                const approvedNgoldAmount = await busdContract.allowance(accountAddress, exchangeContract.address)
                setAllowance(parseFloat(ethers.utils.formatEther(approvedNgoldAmount)))
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const approvedBusdAmount = await ngoldContract.allowance(accountAddress, exchangeContract.address)
                setAllowance(parseFloat(ethers.utils.formatEther(approvedBusdAmount)))
            } catch (error) {
                console.log(error)
            }
        }

    }

    const approve = async () => {
        if (parseFloat(inputAmount).toFixed(2) > 0) {
            if (isBuy) {
                setLoading(true)
                try {
                    if (parseFloat(inputAmount) > 0) {
                        const tx = await busdContract.increaseAllowance(
                            exchangeContract.address,
                            ethers.utils.parseUnits("9999999", decimals)
                        );
                        await tx.wait();
                        await verifyApprove()
                        Swal.fire({
                            title: 'Success',
                            text: 'Aprobado correctamente',
                            icon: 'success',
                            confirmButtonColor: '#FFAE00',

                            confirmButtonText: 'OK'
                        });
                        setLoading(false)
                    }
                } catch (error) {
                    setLoading(false)
                    Swal.fire({
                        title: 'Error',
                        text: error.reason,
                        icon: 'error',
                        confirmButtonColor: '#FFAE00',

                        confirmButtonText: 'OK',
                    })
                }
            } else {
                setLoading(true)
                try {
                    if (parseFloat(inputAmount) > 0) {
                        const tx = await ngoldContract.increaseAllowance(
                            exchangeContract.address,
                            ethers.utils.parseUnits("9999999", decimals)
                        );
                        await tx.wait();
                        await verifyApprove()
                        Swal.fire({
                            title: 'Success',
                            text: 'Aprobado correctamente',
                            icon: 'success',

                            confirmButtonText: 'OK'
                        });
                        setLoading(false)
                    }
                } catch (error) {
                    setLoading(false)
                    Swal.fire({
                        title: 'Error',
                        text: error.reason,
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    })
                }
            }

        }

    }

    const swap = async () => {

        if (parseFloat(inputAmount).toFixed(2) > 0) {
            if (isBuy) {
                setLoading(true)
                try {
                    const tx = await exchangeContract.buyToken(ethers.utils.parseUnits(inputAmount.toString(), decimals), busdContract.address);
                    await tx.wait();
                    setLoading(false);
                    dispatch(updateBalances());
                    setCant(outputAmount);
                    setShowModal(true)
                    setOutputAmount('');
                    setInputAmount('');
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: error.reason,
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    })
                    console.log(error)
                }
            }
            else {
                setLoading(true)
                try {
                    const tx = await exchangeContract.sellToken(ethers.utils.parseUnits(inputAmount.toString(), decimals), ngoldContract.address);
                    await tx.wait();

                    setLoading(false)
                    dispatch(updateBalances());
                    setCant(outputAmount);
                    setShowModal(true)
                    setOutputAmount('');
                    setInputAmount('');

                } catch (error) {
                    Swal.fire({
                        title: 'Success',
                        text: 'aprobado correctamente',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    console.log(error)
                }
            }
        }

    }

    const callAction = async () => {
        if (inputAmount <= allowance) {
            swap();
        } else {
            approve();
        }
    }

    const setearOutput = async (value) => {
        if (accountAddress) {
            if (isBuy) {
                const valor = await exchangeContract.calculatePriceU(ethers.utils.parseUnits(value.toString(), decimals));
                setOutputAmount(parseFloat(ethers.utils.formatEther(valor)))
            } else {
                const valor = await exchangeContract.calculatePriceN(ethers.utils.parseUnits(value.toString(), decimals));
                setOutputAmount(parseFloat(ethers.utils.formatEther(valor)))
            }
        }

    }

    useEffect(() => {
        if (isConnected && exchangeContract !== null) {
            verifyApprove();
        }
    }, [inputAmount])


    useEffect(() => {
        setOutputAmount('')
        setInputAmount('')
    }, [isBuy])


    const addToMetamask = async () => {
        const walletClient = await getWalletClient(chain?.id)

        const tokenAddress = router.NGOLD_ADDRESS;
        const tokenSymbol = "NGOLD";
        const tokenDecimals = 18;
        try {
            const wasAdded = await walletClient.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: tokenAddress,
                        symbol: tokenSymbol,
                        decimals: tokenDecimals,

                    },
                },
            });

            if (wasAdded) {
                console.log("Thanks for your interest!");
            } else {
                console.log("Your loss!");
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <section className="tf-slider">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <img src="assets/images/slider/bg-slider-2.png" alt="Binasea" className="img-slider-1" />
                        {/* <Swiper 
                            modules={[Navigation,  Scrollbar, A11y ]}
                            spaceBetween={0}
                            slidesPerView={1}
                            className="slider-home"
                  
                        >
                        {
                            data.map(idx => (
                                <SwiperSlide key={idx.id}>

                                </SwiperSlide>
                                
                            ))
                        }
                    </Swiper> */}

                        <div className="tf-slider-item style-6">
                            <div className="content-inner">
                                <h1 className="heading">
                                    Obten tus tokens de <span className='palabra'>NGold's.</span>
                                </h1>
                                <p className="sub-heading">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Integer Nec Odio. Praesent Libero. Sed </p>
                            </div>
                            <div className="image ani4">
                                <div className="crypto-swap">
                                    <h4>Crypto Exchange</h4>
                                    <h6>{isBuy ? "(Comprar NGOLD)" : "(Vender NGOLD)"}</h6>
                                    <div className='tokens_container'>


                                        {isBuy ?
                                            (<div className='tokens'>
                                                <img src={usdt} alt='token1' />
                                                <div className='icon' onClick={() => setIsBuy(false)}> <FaExchangeAlt /> </div>
                                                <img src={ngold} alt='token2' />
                                            </div>)
                                            : (<div className='tokens'>
                                                <img src={ngold} alt='token2' />
                                                <div className='icon' onClick={() => setIsBuy(true)}> <FaExchangeAlt /> </div>
                                                <img src={usdt} alt='token1' />
                                            </div>)
                                        }


                                    </div>

                                    <div className="input-container">
                                        <div className='balance'>
                                            <input
                                                type="text"
                                                placeholder="Monto"
                                                value={inputAmount}
                                                onChange={(e) => handleSwap(e.target.value)}
                                            />

                                            <div className='balances-item'>
                                                <img src={ngold} alt='token2' />

                                                <p>Balance: {ngoldBalance !== undefined ? parseFloat(ngoldBalance).toFixed(2) : 0} NGOLD'S  </p>
                                            </div>
                                            <div className='balances-item'>
                                                <img src={usdt} alt='token1' />

                                                <p>Balance: {busdBalance !== undefined ? parseFloat(busdBalance).toFixed(2) : 0} USDT</p>

                                            </div>

                                        </div>

                                        {!loading && isConnected && <button onClick={callAction}>{inputAmount <= allowance ? isBuy ? "Comprar NGOLD" : "Vender NGOLD" : 'aprobar'}</button>}
                                        {!isConnected && !loading &&
                                            
                                                   <button onClick={()=>setConnectShow(true)}>Conectar</button>}
                                        {loading && <button>Cargando</button>}

                                    </div>
                                    <div className="output-container">
                                        <p>1 NGOLD = 1 Gramo Oro</p>

                                        <p>Monto a recibir:</p>
                                        <p>{outputAmount} {isBuy ? 'NGOLD' : 'USDT'}</p>
                                        {isConnect && <button onClick={addToMetamask}> Agregar token</button>}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <ModalSwap
                show={showModal}
                onHide={() => setShowModal(false)}
                cant={cant}
                token={isBuy}
            />
                        <Connect
                show={connectShow}
                onHide={() => setConnectShow(false)}
            />
        </section>
    );
}

export default Banner06;
