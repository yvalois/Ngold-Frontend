import React, { useState, useEffect } from 'react';

import { Modal } from "react-bootstrap";
import { ethers } from 'ethers';
import { useAccount } from 'wagmi'
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { ConnectKitButton, useModal } from "connectkit";
import { updateBalances } from '../../redux/blockchain/blockchainAction';

const StakingModal = (props) => {
    const [loading, setLoading] = useState(false);
    const [cant, setCant] = useState('')
    const [address, setAddress] = useState('')

    const { ngoldContract } = useSelector(state => state.blockchain);
    const { isConnected } = useAccount();
    const dispatch = useDispatch()


    const transfer = async (show) => {
        if (isConnected) {
            setLoading(true)
            try {
                const tx = await ngoldContract.transfer(address, ethers.utils.parseUnits(cant, 18));
                await tx.wait();
                setLoading(false)
                dispatch(updateBalances())
                setAddress('')
                setCant('')
                Swal.fire({
                    title: 'Success',
                    text: 'Transferencia realizada correctamente',
                    icon: 'success',
                    confirmButtonColor: '#FFAE00',
                    confirmButtonText: 'OK'
                }).then(() => {
                    props.onHide()
                });
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
            show()
        }
    }

    return (

        <Modal
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton></Modal.Header>

            <div className="modal-body space-y-20 pd-40">
                <h3>Transferir NGOLD</h3>
                <div className='transfer-container'>
                    <input
                        type="number"
                        placeholder="Monto"
                        value={cant}
                        onChange={(e) => { setCant(e.target.value); }}
                    />
                    <input
                        type="text"
                        placeholder="Cartera"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}

                    />
                    <ConnectKitButton.Custom>
                        {({ isConnected, show, truncatedAddress, ensName }) => {
                            return (
                                <button onClick={() => transfer(show)}>
                                    {isConnected ?
                                        !loading ? "Transferir" : "Cargando"
                                        :
                                        "Conectar"
                                    }
                                </button>);
                        }}
                    </ConnectKitButton.Custom>
                </div>

                {/* input address */}
                {/* boton */}


            </div>
        </Modal>

    );
};

export default StakingModal;
