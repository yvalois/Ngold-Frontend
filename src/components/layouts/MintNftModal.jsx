import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal } from "react-bootstrap";
const MintNftModal = (props) => {
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
                <h3>GoldenElf #{props.id}</h3>
                <p className="text-center sub-heading">Felicidades acabas de obtener el token con Id #{props.id}, ¿que deseas hacer?</p>
                <div className='modal-buttons'>
                    {/* <button onClick={()=> redirect(1)}>
                        Ver mi GoldenElf.
                    </button> */}

                    <button onClick={()=> redirect(2)}>
                        Ver inventario.
                    </button>
                </div>

            </div>
        </Modal>

    );
};

export default MintNftModal;
