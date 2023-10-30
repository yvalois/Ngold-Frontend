import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap";
import { useAccount } from 'wagmi'
import { updateBalances } from '../../redux/blockchain/blockchainAction';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { ethers } from "ethers";

const options = [{
    id: 1,
    time: "6 Meses",
    apr: "0.75%"
},
{
    id: 2,
    time: "1 Año",
    apr: "1.0%"
},
{
    id: 3,
    time: "1 Año y 6 Meses",
    apr: "1.25%"
},
{
    id: 4,
    time: "2 Años",
    apr: "1.50%"
}]


const StakingModal = (props) => {
    const [loading, setLoading] = useState(false);
    const [isApprove, setIsApprove] = useState(false)
    const [cApr, setCApr] = useState(options)        

    const [apr, setApr] = useState(1);
    const { elfosContract, stakingContract, accountAddress } = useSelector(state => state.blockchain);
    const { isConnected } = useAccount();
    const dispatch = useDispatch()
    const verifyApprove = async () => {
        setLoading(true)
        try {
            const verify = await elfosContract.isApprovedForAll(accountAddress, stakingContract.address);
            setIsApprove(verify);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const approve = async () => {
        setLoading(true)
        try {
            const tx = await elfosContract.setApprovalForAll(stakingContract.address, true);
            await tx.wait();
            verifyApprove();
            setLoading(false)
            Swal.fire({
                title: 'Success',
                text: 'aprobado correctamente',
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
            setLoading(false)

        }
    }
    const funcion = async () => {
        dispatch(updateBalances())
    }

    const stakeToken = async () => {
        setLoading(true)
        try {
            const tx = await stakingContract.stake(props.id.toString(), apr.toString());
            await tx.wait();
            await funcion()
            setLoading(false)
            Swal.fire({
                title: 'Success',
                text: 'Stakeado correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => { props.onHide() })
        } catch (error) {
            console.log(error.reason)
            Swal.fire({
                title: 'Error',
                text: error.reason,
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            })
            setLoading(false)
        }
    }
    const updateApr =async()=>{

        for(let i = 0; i < cApr.length; i++) {
            let apr = await stakingContract.Apr(cApr[i].id.toString());
        cApr[i].apr = `${ethers.utils.formatUnits(apr,18)}%`;
        }

    }

    useEffect(() => {
        verifyApprove();
    }, [props.id])

    useEffect(() => {
        updateApr()
    }, [])


    return (

        <Modal
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton></Modal.Header>

            <div className="modal-body space-y-20 pd-40">



                <h3>Staking #{props.id}</h3>
                <p className="text-center sub-heading">Recuerda que al stakear el contrato se quedara con tu token NFT, lo puedes retirar cuando quieras.</p>

                <div className="form-select2" id="subject">
                    <select
                        value={apr}
                        onChange={(e) => {
                            setApr(e.target.value);
                        }}
                    >

                        {
                            cApr.map(item => (
                                <option value={item.id}>
                                    <p>{item.time} ({item.apr})</p>
                                </option>   
                            ))
                        }
                    </select>
                </div>

                {isApprove && !loading && <Link onClick={stakeToken} className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Stake</Link>}
                {!isApprove && !loading && <Link onClick={approve} className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Aprobar</Link>}
                {loading && <Link className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">cargando</Link>}


            </div>
        </Modal>

    );
};

export default StakingModal;
