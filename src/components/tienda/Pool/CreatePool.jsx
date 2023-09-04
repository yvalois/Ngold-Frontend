import React, { useEffect, useState } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewProduct } from "../../../redux/store/actions/productActions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ethers } from "ethers";

const CreatePool = () => {

    const [Nombre, setNombre] = useState("")
    const navigate = useNavigate();
    
    const {poolContract} = useSelector((state) => state.blockchain);


  
  
  
  
    const dispatch = useDispatch();
  
    const [newPool, setNewPool] = useState({
      apr: '',
      max_w: '',
      max_p: '',
      tiempo_bloqueo: ''
    });
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      if (newPool.apr === "" || newPool.max_w === "" || newPool.max_p === "" || newPool.tiempo_bloqueo === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill all fields",
        });
        return;
      }
      try {
        let time = daysToSeconds(newPool.tiempo_bloqueo); 
        const tx = await poolContract.setStakePool(ethers.utils.parseEther(newPool.max_p), time, ethers.utils.parseEther(newPool.apr), ethers.utils.parseEther(newPool.max_w));
        await tx.wait();
        setNewPool({
          apr: 0,
          max_w: 0,
          max_p: 0,
          tiempo_bloqueo: 0
        });
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Pool creado correctamente",
        });
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
        });
      }
    }

    const daysToSeconds=(days)=>{
      return days * 24 * 60 * 60
    }

  return (
    <form onSubmit={handleSubmit}>
      <div className='create-pool'>
        <div>
          <input
            type="number"
            placeholder="Apr"
            value={newPool.price}
            onChange={(e) => setNewPool({ ...newPool, apr: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Maximo por wallet"
            value={newPool.max_w}
            onChange={(e) => setNewPool({ ...newPool, max_w: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Maximo por pool"
            value={newPool.max_p}
            onChange={(e) => setNewPool({ ...newPool, max_p: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Tiempo de bloqueo"
            value={newPool.tiempo_bloqueo}
            onChange={(e) => setNewPool({ ...newPool, tiempo_bloqueo: e.target.value })}
            required
          />
        </div>
        <div className='save'>
        <input
                  type="submit"
                  className="button-admin-product-save"
                  value="Guardar producto"
                />

        </div>
      </div>
    </form>
  )
}

export default CreatePool