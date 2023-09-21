import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import img1 from '../../assets/images/slider/slider-8.png'
import img2 from '../../assets/images/slider/slider-9.png'
import img3 from '../../assets/images/slider/slider-10.png'
import img4 from '../../assets/images/slider/slider-11.png'
import img5 from '../../assets/images/slider/slider-6.png'
import avt from '../../assets/images/slider/slider-7.png'
import { Link } from 'react-router-dom';
import CardModal from '../layouts/CardModal';
import { useDispatch, useSelector } from "react-redux";
import { ethers } from 'ethers';
import { useAccount } from 'wagmi'
import { updateBalances } from '../../redux/blockchain/blockchainAction';
import { useWeb3Modal } from '@web3modal/react'
import Swal from 'sweetalert2';
import elfo from '../../assets/images/signo.jpeg'
import logo_elf from '../../assets/images/logo/logo_elf.png';
import { ConnectKitButton, useModal } from "connectkit";
import ngold from '../../assets/images/icon/ngold.png'
import usdt from '../../assets/images/icon/usdt.png'

import MintNftModal from '../layouts/MintNftModal';


Banner05.propTypes = {

};

function Banner05(props) {
    const { data } = props;
    const [cant, setCant] = useState(0);
    const [precio, setPrecio] = useState(1);
    const [modalShow, setModalShow] = useState(false);
    const [allowance, setAllowance] = useState(0);
    const [loading, setLoading] = useState(false)
    const { elfosContract, ngoldContract, busdContract, accountAddress, ngoldNftBalance } = useSelector(state => state.blockchain);
    const decimals = 18;
    const { isConnected, isConnecting } = useAccount()
    const [token, setToken] = useState('NGOLD')
    const dispatch = useDispatch();
    const {setOpen} = useModal()
    const manageCant = (type) => {
        switch (type) {
            case "+":
                setCant(cant + 1)
                break;
            case "-":
                if (cant > 0)
                    setCant(cant - 1)
                break;

            default:
                break;
        }
    }
    const getPrice = async () => {
        const price = await elfosContract.valor()
        setPrecio(parseInt(price))
    }
    useEffect(() => {
        if (isConnected && elfosContract !== null) {
            getPrice()
        }
    }, [isConnected, elfosContract]);


    const verifyApprove = async () => {
        try {
            const approvedNgoldAmount = await ngoldContract.allowance(accountAddress, elfosContract.address)
            setAllowance(parseFloat(ethers.utils.formatEther(approvedNgoldAmount)))
        } catch (error) {
            console.log(error)
        }
    }

    const Approve = async () => {
        setLoading(true);
        try {
            if (cant > 0) {
                if (token === "NGOLD") {
                    const tx = await ngoldContract.increaseAllowance(
                        elfosContract.address,
                        ethers.utils.parseUnits("9999999", decimals)
                    );
                    await tx.wait();
                    await verifyApprove();
                    Swal.fire({
                        title: 'Success',
                        text: 'aprobadoi correctamente',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    setLoading(false);

                } else {
                    const tx = await busdContract.approve(
                        elfosContract.address,
                        ethers.utils.parseUnits((precio * cant).toString(), decimals)
                    );
                    await tx.wait();
                    await verifyApprove();
                    Swal.fire({
                        title: 'Success',
                        text: 'aprobadoi correctamente',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    setLoading(false);

                }

            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.reason,
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            })
            setLoading(false);

        }
    }
    const funcion = async () => {
        dispatch(updateBalances())
    }

    const mint = async () => {
        setLoading(true);
        try {
            if (cant > 0) {
                if (token === "NGOLD") {
                    const tx = await elfosContract.buyToken(cant, ngoldContract.address);
                    await tx.wait()
                    await funcion();
                    window.localStorage.setItem("Nft", JSON.stringify(ngoldNftBalance[ngoldNftBalance.length - 1]));
                    //JSON.parse
                    setTimeout(() => {
                        setModalShow(true);
                        setLoading(false);
                    }, 2000);

                } else {
                    const tx = await elfosContract.buyToken(cant, busdContract.address);
                    await tx.wait()
                    await funcion();
                    window.localStorage.setItem("Nft", JSON.stringify(ngoldNftBalance[ngoldNftBalance.length - 1]));
                    //JSON.parse
                    setTimeout(() => {
                        setModalShow(true);
                        setLoading(false);
                    }, 2000);
                }


            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error',
                text: error.reason,
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            })
            setLoading(false);

        }
    }

    const callAction = () => {
        if (allowance >= precio * cant) {
            mint()
        } else {
            Approve();
        }
    }

    useEffect(() => {
        verifyApprove();
    }, [cant])



    useEffect(() => {
        if(isConnected) {
            setOpen(false)
        }
    }, [isConnected])
    
    return (
        <section className="tf-slider">
            <div className="container-fluid">
            <div className="tf-container">
                <div className='row'>
                    <div className="col-md-12">

                        <div className="slider-home">
                            <div className="tf-slider-item style-5">

                                <div className="content-inner">
                                    {/* <img src={img1} alt="Binasea" className="img-star star-1 ani4" />
            <img src={img2} alt="Binasea" className="img-star star-2 ani5" />
            <img src={img3} alt="Binasea" className="img-star star-3 ani4" />
            <img src={img4} alt="Binasea" className="img-star star-4 ani5" /> */}
                                    <h1 className="heading">
                                        Compra tu <span className='palabra'>Golden ELF</span>
                                    </h1>

                                </div>

                                <div className="image">
                                    <div className="img-slider">
                                    <img src={elfo} alt="Binasea"/>
                                    </div>

                                    <div className="swiper-container slider-card-product">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div className="card-product">
                                                
                                                    <h4>Golden ELF #???</h4>
                                                    <div className="infor-author">
                                                        <img src={logo_elf} alt="Binasea" />
                                                        <div className="infor">
                                                            <p>creator</p>
                                                            <h6 className="name">@NGold</h6>
                                                        </div>
                                                    </div>

                                                    <div className="form-select2" id="subject">
                                                        <select
                                                            value={token}
                                                            onChange={(e) => {
                                                                setToken(e.target.value);
                                                            }}
                                                        >
                                                            <option value="NGOLD">
                                                                NGOLD
                                                            </option>
                                                            <option value="USDT" >
                                                                USDT
                                                            </option>

                                                        </select>
                                                    </div>


                                                    <div className="infor-price">

                                                        <div className="curent-bid">
                                                            <p>Price</p>
                                                            <div className="price">
                                                                {/* Ngold Logo */}
                                                                {token === "NGOLD" && <div className="icon"><img src={ngold} /></div>}
                                                                {token === "USDT" && <div className="icon"><img src={usdt} /></div>}

                                                                <p>{parseFloat(precio * cant).toFixed(1)}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="input-wrapper">
                                                        <div onClick={() => manageCant("-")} className='cant' id="decrease-btn">-</div>
                                                        <input 
                                                        type="text" 
                                                        placeholder='cantidad'
                                                        value={cant} 
 
                                                        />
                                                        <div onClick={() => manageCant("+")} className='cant' id="increase-btn">+</div>
                                                    </div>

                                                    <div className="btn-button">
                                                        {isConnected && !loading && <Link to="#" onClick={callAction} data-toggle="modal" data-target="#popup_bid" className="tf-button style-3">{allowance >= precio * cant ? 'Mint' : 'Aprobar'}</Link>}
                                                        {!isConnected && !loading && 
                                                        <ConnectKitButton.Custom>
                                                            {({ isConnected, show, truncatedAddress, ensName }) => {
                                                                return (<Link to="#" onClick={() => { show() }} data-toggle="modal" data-target="#popup_bid" className="tf-button style-3">Conectar</Link>);
                                                            }}
                                                        </ConnectKitButton.Custom>
                                                        }
                                                        {loading && <Link to="#" data-toggle="modal" data-target="#popup_bid" className="tf-button style-3">Cargando</Link>}
                                                        {/* <Link to="/item-details-v1" className="tf-button style-3">View Details</Link> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>


                            </div>

                        </div>


                    </div>
                </div>

            </div>
            </div>



            <MintNftModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={ngoldNftBalance[ngoldNftBalance.length - 1]?.id}
            />
        </section>


    );
}

export default Banner05;