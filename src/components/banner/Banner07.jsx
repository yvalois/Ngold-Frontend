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
import { useDispatch, useSelector } from "react-redux";
import { FaExchangeAlt } from "react-icons/fa";
import { ethers } from 'ethers';
import { useAccount } from 'wagmi'
import { updateBalances } from '../../redux/blockchain/blockchainAction';
import { useWeb3Modal } from '@web3modal/react'
import Swal from 'sweetalert2';

Banner06.propTypes = {

};

function Banner06(props) {
    const { data } = props;

    const [inputAmount, setInputAmount] = useState('');
    const [outputAmount, setOutputAmount] = useState('');
    const [isSwapped, setIsSwapped] = useState(false);
    const [allowance, setAllowance] = useState(0);
    const [isBuy, setIsBuy] = useState(true);
    const [loading, setLoading] = useState(false);
    const { exchangeContract, ngoldContract, busdContract, accountAddress } = useSelector(state => state.blockchain);
    const { isConnected } = useAccount();
    const decimals = 18;
    const { open } = useWeb3Modal()

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
                const approvedNgoldAmount = await ngoldContract.allowance(accountAddress, exchangeContract.address)
                setAllowance(parseFloat(ethers.utils.formatEther(approvedNgoldAmount)))
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
                        const tx = await busdContract.approve(
                            exchangeContract.address,
                            ethers.utils.parseUnits(inputAmount.toString(), decimals)
                        );
                        await tx.wait();
                        await verifyApprove()
                        Swal.fire({
                            title: 'Success',
                            text: 'Aprovado correctamente',
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
            } else {
                setLoading(true)
                try {
                    if (parseFloat(inputAmount) > 0) {
                        const tx = await ngoldContract.approve(
                            exchangeContract.address,
                            ethers.utils.parseUnits(inputAmount.toString(), decimals)
                        );
                        await tx.wait();
                        await verifyApprove()
                        Swal.fire({
                            title: 'Success',
                            text: 'Aprovado correctamente',
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
                    setLoading(false)
                    dispatch(updateBalances)
                    Swal.fire({
                        title: 'Success',
                        text: 'Swap realizado correctamente',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      });
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
                    Swal.fire({
                        title: 'Success',
                        text: 'Swap realizado correctamente',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      });
                    setLoading(false)
                    dispatch(updateBalances)

                } catch (error) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Aprovado correctamente',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      });
                    console.log(error)
                }
            }
        }

    }

    const callAction = async () => {
        if (inputAmount <= allowance ) {
            swap();
        } else {
            approve();
        }
    }

    const setearOutput = async (value) => {
        if(accountAddress){
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
                                    <h1>Crypto Exchange</h1>
                                    <div className='tokens_container'>


                                        {isBuy ?
                                            (<div className='tokens'>
                                                <img src={icon11} alt='token1' />
                                                <div className='icon' onClick={() => setIsBuy(false)}> <FaExchangeAlt /> </div>
                                                <img src={icon22} alt='token2' />
                                            </div>)
                                            : (<div className='tokens'>
                                                <img src={icon22} alt='token2' />
                                                <div className='icon' onClick={() => setIsBuy(true)}> <FaExchangeAlt /> </div>
                                                <img src={icon11} alt='token1' />
                                            </div>)
                                        }


                                    </div>

                                    <div className="input-container">
                                        <input
                                            type="text"
                                            placeholder="Monto"
                                            value={inputAmount}
                                            onChange={(e) => handleSwap(e.target.value)}
                                        />
                                        {!loading && isConnected &&<button onClick={callAction}>{inputAmount <= allowance ? 'Swap' : 'aprobar'}</button>}
                                        {!isConnected && !loading && <button onClick={open}>Conectar</button>}
                                        {loading &&<button>Cargando</button>}


                                    </div>

                                    <div className="output-container">
                                        <p>Monto de salida:</p>
                                        <p>{outputAmount} {isBuy ? 'NGOLD' : 'BUSD'}</p>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner06;
