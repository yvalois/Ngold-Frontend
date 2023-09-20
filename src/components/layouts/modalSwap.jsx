import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal } from "react-bootstrap";
const ModalSwap = (props) => {
    const navegar = useNavigate()

    const redirect =(option)=>{
        if(option === 1){
            navegar("/item-details-v1")
        }else{
            navegar("/coleccion")

        }
    }
    return (

        <Modal
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton></Modal.Header>

            <div className="modal-body space-y-20 pd-40">
                <h3>Felicidades</h3>
                <p className="text-center sub-heading">Acabas de obtener {props.cant} {props.token ? "NGOLD's" : "USDT's"}.</p>
                <div className='modal-buttons'>
                    <button onClick={()=> props.onHide()}>
                        Aceptar
                    </button>
                </div>

            </div>
        </Modal>

    );
};

export default ModalSwap;
