import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AiTwotoneEdit, AiFillCloseCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from "react-redux";

import Swal from "sweetalert2";
import { ethers } from "ethers";
import moment from "moment";

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

const Apr = () => {
    const {ngoldContract, accountAddress,stakingContract} =  useSelector(state => state.blockchain);
    const [apr, setApr] = useState(1);
    const [cApr, setCApr] = useState(options)        
    const [loading, setLoading] = useState(false);
    const [newApr, setNewApr] = useState(0)



    const handleSubmit = async() => {


        setLoading(true)
        try {
            const balance = await ngoldContract.balanceOf(accountAddress);
            alert(ethers.utils.formatUnits(balance, 18))
            const tx = await stakingContract.setApr(apr.toString(), ethers.utils.parseUnits(newApr.toString(), 18) );
            await tx.wait()
            Swal.fire({
                title: 'Success',
                text: 'Cambio realizado correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            setLoading(false)
            
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


    const updateApr =async()=>{

        for(let i = 0; i < cApr.length; i++) {
            let apr = await stakingContract.Apr(cApr[i].id.toString());
        cApr[i].apr = `${ethers.utils.formatUnits(apr,18)}%`;
        }

    }
    useEffect(() => {
        updateApr()
    }, [])
    
    return (

        <div className='content'>
            <div className='content'>
                <form onSubmit={handleSubmit}>
                    <div className='create-pool'>

                        <div className="form-select" id="subject">
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

                        <div>
                            <input
                                type="number"
                                placeholder="Apr"
                                value={newApr}
                                onChange={(e)=>setNewApr(e.target.value)}
                                required
                            />
                        </div>

                        <div className='save'>
                            <input
                                type="submit"
                                className="button-admin-product-save"
                                value={!loading ? "Cambiar Apr" : "Cargando"}
                            />

                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Apr