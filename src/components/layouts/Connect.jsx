import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap";
import { useAccount, useNetwork } from 'wagmi'
import { updateBalances } from '../../redux/blockchain/blockchainAction';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { ConnectKitButton, useModal } from "connectkit";
import { getEthersProvider, getEthersSigner } from '../../utils/ethers'
import { fetchBlockchain, disconnectBlockchainAction } from '../../redux/blockchain/blockchainAction';

const Connect = (props) => {
    const [shortAddress, setShortAddress] = useState('')

    const { accountAddress, loading, isConnect, errorMsg } = useSelector(state => state.blockchain);
    const { address, isConnected } = useAccount()
    const { chain } = useNetwork();
    const dispatch = useDispatch()

    // const getSign = async () => {
    //     const signer = await getEthersSigner(chain.id);
    //     const provider = getEthersProvider(chain.id);
    //     dispatch(fetchBlockchain(address, signer, provider));
    // }

    useEffect(() => {
        if (accountAddress !== null) {
            let addr = accountAddress.slice(0, 4) + "..." + accountAddress.slice(accountAddress.length - 4);
            setShortAddress(addr)
        }

    }, [accountAddress, address])


    // useEffect(() => {

    //     if (chain?.unsupported !== undefined && chain.unsupported === false) {
    //         setTimeout(() => {
    //             getSign();
    //             setIs(true)
    //         }, 2000);
    //     } else if (chain?.unsupported !== undefined && chain.unsupported === true) {
    //         setTimeout(() => {
    //             switchChain()
    //             setIs(false)
    //         }, 2000);
    //     } else {
    //         window.localStorage.removeItem("wc@2:core:0.3//keychain")

    //     }
    // }, [chain, errorMsg])

    useEffect(() => {
        if(isConnected){
            props.onHide()
        }
    }, [isConnected])
    

    return (

        <Modal
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton></Modal.Header>

            <div className="modal-body space-y-20 pd-40">
                <h3>Bienvenido a NGOLD</h3>
                <p className="text-center sub-heading">Conectate para estar en conexion con NGOLD.</p>
                <div className="button-popup2">
                    <ConnectKitButton.Custom>
                        {({ isConnected, show, truncatedAddress, ensName }) => {
                            return (
                                <button onClick={show} className="tf-button "><span>{
                                    loading || (isConnected && !isConnect) ?
                                        "cargando"
                                        : isConnect ?
                                            shortAddress :
                                            "Connect Wallet"}</span></button>
                            );
                        }}



                    </ConnectKitButton.Custom>
                </div>


            </div>
        </Modal>

    );
};

export default Connect;
