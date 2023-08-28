import React from 'react'
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Api } from "../utils/Api";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import PhoneInput from 'react-phone-number-input'
import { addOrder, createOrder } from "../redux/store/actions/orderActions";
import { clearCart } from "../redux/store/actions/cartActions";
import { useWeb3Modal } from '@web3modal/react'
import { loadTokenPrice } from '../redux/store/actions/tokenPriceActions';

const CheckOut = () => {
    const userInfo = useSelector((State) => State.user.userDetails);
    const { tokenPrice } = useSelector((State) => State.tokenPrice);
    const { accountAddress, ngoldContract, busdContract, tiendaContract } = useSelector((State) => State.blockchain);
    const { discount } = useSelector((State) => State.store);
    const { infoLoaded } = useSelector((State) => State.user);
    const { fullName, address, country, city, zipCode, state, phone, email, verificationCode } = userInfo;
    const { open } = useWeb3Modal()

    const [checkApprovedToken, setCheckApprovedToken] = useState(false);
    const [checkApprovedBusd, setCheckApprovedBusd] = useState(0);
    const [approvedUnits, setApprovedUnits] = useState(0);
    const [approvedUnitsBusd, setApprovedUnitsBusd] = useState(0);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [createdOrder, setCreatedOrder] = useState({});
    const [precio, setPrecio] = useState('')
    const [precioBusd, setPrecioBusd] = useState('')

    const [Phone, setPhone] = useState("");
    const managePhone = (e) => {
        if (e.target.value.length < 10) {
            setPhone(e.target.value)
        } else if (e.target.value.length === 10) {
            setPhone("+57 " + e.target.value)

        }
    }
    const checkApprove = async () => {
        try {
            const approvedToken = await ngoldContract.allowance(accountAddress, tiendaContract.address);
            const approvedBusd = await busdContract.allowance(accountAddress, tiendaContract.address);
            const approveToNumber = parseFloat(approvedToken) / 10 ** 18;
            const approveToNumberBusd = ethers.utils.formatEther(approvedBusd);

            setApprovedUnits(approveToNumber);
            setApprovedUnitsBusd(approveToNumberBusd);
            setCheckApprovedBusd(approveToNumberBusd);
        } catch (err) {
            console.log(err);
        }
    }   
    const approveToken = async () => {
        try {
            setLoading(true);
            const approve = await ngoldContract.approve(tiendaContract.address, ethers.utils.parseEther("999999999999"));
            await approve.wait();
            // Suscribirse al evento 'Approval'
            setLoading(false);
            checkApprove()
            Swal.fire({
                title: 'Success',
                text: 'Approved successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (err) {
            setLoading(false);
            Swal.fire({
                title: 'failed',
                text: err.reason,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

    };


    const approveBusd = async () => {
        try {
            setLoading(true);
            const approve = await busdContract.approve(tiendaContract.address, ethers.utils.parseEther("999999999999"));
            await approve.wait();
            setLoading(false);
            checkApprove()

            setCheckApprovedToken(false);
            Swal.fire({
                title: 'Success',
                text: 'Approved successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            })


        } catch (err) {
            setLoading(false);
            Swal.fire({
                title: 'failed',
                text: err.reason,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (accountAddress) {
            if (!checkApprovedToken) {
                checkApprove();
                setCheckApprovedToken(true);
            }
        }
    }, [checkApprovedToken, accountAddress]);

    const [Address, setAddress] = useState({
        fullName: fullName,
        address: address,
        country: country,
        city: city,
        zipCode: zipCode,
        state: state,
        phone: phone
    });

    const [token, setToken] = useState(Api.TOKEN_NAME);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((State) => State.cart);
    const { products, cartTotal } = cart;
    const cartItems = products;



    const [checkoutFull, setCheckoutFull] = useState(false);


    const handleOrden = async () => {
        if (verificationCode === false) {
            Swal.fire({
                title: 'Please Verify Your email',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Login',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancel',
                preConfirm: () => {
                    navigate(`/code`)
                }
            })

        }
        if (
            accountAddress === null ||
            accountAddress === undefined ||
            accountAddress === ""
        ) {
            setLoading(true)
            open()
        } else {
            if (checkoutFull) {
                try {
                    setLoading(true);
                    const total = token === "BUSD" ? getCartSubTotal() : getCartTotalToken();
                    let amountToPay = 0
                    if (token === "BUSD") {
                        amountToPay = (total * 10 ** 18).toFixed(0);
                        if (checkApprovedBusd < getCartSubTotal()) {
                            approveBusd();
                            return;
                        }
                    }
                    if (token === Api.TOKEN_NAME) {
                        amountToPay = total;
                        if (approvedUnits < parseFloat(precio)
                        ) {
                            approveToken();
                            return;
                        }
                    }
                    const tokenAddress = token === "BUSD" ? busdContract.address : ngoldContract.address;
                    try {

                        const buy = await tiendaContract.buyProduct(
                            tokenAddress,
                            amountToPay.toString()
                        )
                        await buy.wait()
                        const Order = {
                            Address,
                            cartItems,
                            total: token === "BUSD" ? getCartSubTotal() : getCartTotalToken(),
                            tokenUsed: token,
                            wallet: accountAddress,
                            orderType: 'entrega',
                            payed: true,
                            txHash: buy.hash
                        };
                        dispatch(createOrder(Order));
                        setCreatedOrder(Order);

                        dispatch(clearCart());
                        setLoading(false);
                        setSuccess(true);
                        Swal.fire({
                            title: 'Success',
                            text: 'orden realizada correctamente',
                            icon: 'success',
                            confirmButtonText: 'OK'
                          });


                    } catch (err) {
                        setLoading(false);
                        Swal.fire({
                            title: 'failed',
                            text: err.reason,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });

                    }


                } catch (err) {
                    if (err.reason) {
                        setError(true);
                        setErrorMessage(err.reason);
                    }
                    console.log(err);
                    setLoading(false);
                }

            } else {
                Swal.fire({
                    title: "Error",
                    text: "You need to fill all the fields",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        }
    };

    useEffect(() => {
        if (infoLoaded) {
            setAddress({
                fullName: fullName,
                address: address,
                country: country,
                city: city,
                zipCode: zipCode,
                state: state,
                phone: phone,
            })
        }
    }, [infoLoaded]);

    useEffect(() => {
        setAddress({
            ...Address,
            phone: Phone,
        })
    }, [Phone]);


    useEffect(() => {
        if (
            Address.fullName === "" ||
            Address.address === "" ||
            Address.country === "" ||
            Address.city === "" ||
            Address.zipCode === "" ||
            Address.state === "" ||
            Address.fullName === undefined ||
            Address.address === undefined ||
            Address.country === undefined ||
            Address.city === undefined ||
            Address.zipCode === undefined ||
            Address.state === undefined ||
            Address.phone === undefined
        ) {
            setCheckoutFull(false);
        } else {
            setCheckoutFull(true);
        }
    }, [fullName, address, country, city, zipCode, state, Address, Phone]);

    const resetAddress = () => {
        setAddress({
            fullName: "",
            address: "",
            country: "",
            city: "",
            zipCode: "",
            state: "",
            phone: "",
        });
    };

    const getCartSubTotal = async() => {

        return cartItems        
            .reduce((price, item) => price + item.price * item.qty, 0)
            .toFixed(2);
    };

    const getCartSubTotalToken = () => {
        return cartItems
            .reduce((price, item) => price + item.price * item.qty / tokenPrice, 0)
            .toFixed(2)
    }

    

    const getCartTotalToken = () => {


        return cartItems
        .reduce((price, item) => price + item.price * item.qty / tokenPrice , 0)
    }

    useEffect(() => {
        if(tokenPrice > 0 ){
            const parsePrecio = getCartTotalToken().toString()
            const parsePrecioBusd = (parseInt(getCartTotalToken() * tokenPrice).toString())

            setPrecio(parseFloat(parsePrecio).toFixed(2))
            setPrecioBusd(parseFloat(parsePrecioBusd).toFixed(2))
            
        }


    }, [tokenPrice,cartItems]);
    

    useEffect(() => {
        setLoading(false)
    }, [accountAddress])
    
    

    return (
        <div className='checkout'>
           <div className='checkout-container'>


                <div className='checkout-form-container'>
                    <div className='checkout-form'>
                        <div>
                            <input type="text" placeholder="Nombre" value={Address.fullName}
                                onChange={(e) => setAddress({ ...Address, fullName: e.target.value })} />

                        </div>
                        <div>
                            <input type="text" placeholder="Telefono" value={Phone}
                                onChange={(e) => { managePhone(e) }} />
                        </div>
                        <div>
                            <input type="text" placeholder="Direccion" value={Address.address}
                                onChange={(e) => setAddress({ ...Address, address: e.target.value })} />
                        </div>




                        <div>
                            <input type="text" placeholder="Pais" value={Address.country}
                                onChange={(e) => setAddress({ ...Address, country: e.target.value })} />
                        </div>
                        <div className='three-inputs'>
                            <input type="text" placeholder="Ciudad" value={Address.city}
                                onChange={(e) => setAddress({ ...Address, city: e.target.value })} />
                            <input type="text" placeholder="Departamento" value={Address.state}
                                onChange={(e) => setAddress({ ...Address, state: e.target.value })} />
                            <input type="text" placeholder="Codigo postal" value={Address.zipCode}
                                onChange={(e) => setAddress({ ...Address, zipCode: e.target.value })} />
                        </div>

                        <div className="form-select" id="subject">
                            <select
                                value={token}
                                onChange={(e) => {
                                    setToken(e.target.value);
                                }}

                            >
                                <option value={Api.TOKEN_NAME}>{Api.TOKEN_NAME}</option>
                                <option value="BUSD">BUSD </option>
                            </select>
                        </div>

                        <div >
                            <button type="submit"
                                onClick={handleOrden}>
                                {accountAddress && !loading ?


                                    token === Api.TOKEN_NAME && !loading ?

                                    precio >= approvedUnits ?
                                            'Approve '
                                            : 'Buy '

                                    :loading ?
                                    'Cargando':
                                     precioBusd >= approvedUnitsBusd ?
                                            'Approve '
                                            : 'Buy '


                                    : loading   ?
                                    'Cargando'
                                    :'Connect '
                                }
                            </button>
                        </div>
                    </div>
                </div>
      
                <div className='products-information-container'>


                    {cartItems.map((item, index) => (<div className='product'>
                        <div key={index} className='left-side'>
                            <div className='image'>
                                <img src={item.imageUrl.url} alt='CPesito' />
                                <div className='cant'>
                                    <p>{item.qty}</p>
                                </div>
                            </div>
                            <div>
                                <p>{item.name}</p>
                            </div>
                        </div>

                        <div className='rigth-side'>
                            <p>${item.price}</p>
                        </div>
                    </div>))}




                    <div className='money'>
                        <p>Total:</p> <p>{token === Api.TOKEN_NAME ? `${Api.TOKEN_NAME}: ${precio}` : `BUSD: ${getCartTotalToken() * tokenPrice}`}</p>
                    </div>

                    
                </div>




            </div> 
        </div>

    )
}

export default CheckOut