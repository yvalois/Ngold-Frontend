import React, { useState } from 'react'
import Card from './Card'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import { useEffect } from "react";
import { fetchBalance } from "../../../redux/blockchain/blockchainAction";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'
import { fetchData } from "../../../redux/blockchain/dataActions";
const MyPool = () => {
  const dispatch = useDispatch();
  const stakin = useSelector(state => state.blockchain.poolContract);

  const blockchain = useSelector(state => state.blockchain);
  const { ngoldContract } = useSelector(state => state.blockchain);



  const data = useSelector(state => state.data);


  const [pools, setPools] = useState([]);
  const [stakedOn, setStakedOn] = useState(false);
  const [tokensPerPool, setTokensPerPool] = useState(0);
  const [myStaked, setMyStaked] = useState([]);
  const [filteredStaked, setFilteredStaked] = useState([]);
  const [stakeValue, setStakeValue] = useState(0);
  const [allowances, setAllowance] = useState(0);
  const [owner, setOwner] = useState(false);
  const [tokenPrice, setTokenPrice] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const changeLoadingCard = (is) => {
    setCartLoading(is);
  }

  const getAPr = (poolId) => {
    const apr = pools.filter(pool => pool.poolId === poolId)[0].stakeApr;
    return apr;
  }

  const getTokensLimit = (poolId) => {
    const tokensLimit = pools.filter(pool => pool.poolId === poolId)[0].stakeTokensLimit;
    return tokensLimit;
  }

  const contractOwnerEqualToAddress = async () => {
    if (blockchain.accountAddress) {
      const owner = await stakin.owner();

      if (owner.toLowerCase() === blockchain.accountAddress.toLowerCase()) {
        setOwner(true);
      }
    }


  }

  const claimReward = async (poolId, index) => {
    setIsLoading(true);
    try {
      //Cambia logica y parametros
      const calculate = await stakin.calculateStakingReward(poolId, index)
      const tx = await stakin.userClaimReward(poolId, index, ngoldContract.address);
      await tx.wait()
      Swal.fire({
        title: 'Success',
        text: 'Recompensa retirada',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      stakin.on("Claim", (addr, ammount, apr, mtime) => {
        dispatch(fetchBalance());
        dispatch(fetchData());
        setIsLoading(false);
      }
      );
    } catch (err) {
      if (err.reason) {
        setErrorMsg(err.reason);
        setError(true);
        Swal.fire({
          title: 'Error',
          text: error.reason,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })
        console.log("errortrigered", err.reason);
      }
      setIsLoading(false);
    }
  }

  const unstake = async (poolId, index) => {
    setIsLoading(true);
    try {
      //Cambio en parametros
      const tx = await stakin.userUnstake(poolId, index);
      await tx.wait();
      Swal.fire({
        title: 'Success',
        text: 'Desbloqueado correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      stakin.on("Unstake", (addr, ammount, apr, mtime) => {

        dispatch(fetchBalance());
        dispatch(fetchData());

        setIsLoading(false);
      }
      );
    } catch (err) {
      if (err.reason) {
        Swal.fire({
          title: 'Error',
          text: error.reason,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })
        setErrorMsg(err.reason);
        setError(true);

      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (blockchain.accountAddress) {
      setIsLoading(true);
      dispatch(fetchData());
      contractOwnerEqualToAddress();
    }
  }, [blockchain]);

  useEffect(() => {

    if (stakin) {
      setPools(data.pools);
      setMyStaked(data.accountPools);
      setTokenPrice(data.tokenPrice);

    }
  }, [stakin, data]);

  useEffect(() => {
    if (data.Data) {
      const Data = data.Data;
      const sum = Data.reduce((acc, curr) => {
        acc[curr.poolId] = (acc[curr.poolId] || 0) + curr.stakedTokens;
        return acc;
      }, {});

      setTokensPerPool(sum);
      setAllowance(data.allowance)
    }

  }, [data]);

  useEffect(() => {
    if (myStaked && pools) {

      let filtered = [];
      pools.filter(pool => {
        let found = false;
        myStaked.map(myStake => {
          if (myStake.poolId === pool.poolId) {
            found = true;
          }
        })
        if (!found) {
          filtered.push(pool);
        }
      })

      setFilteredStaked(filtered);
    }
    setIsLoading(false);
  }, [myStaked, pools]);


  return (
    <div className='my-pools-container'>
      {myStaked.map((pool, index) => (
        <div className='my-cardpool'>
          <div className='my-cardpool-item'>

            <div>
              <p><span>                              {getAPr(pool.poolId)}%
                Apr</span></p>
            </div>

            <div>
              <p><span>{pool.stakedTokens} Ngold</span></p>
            </div>

          </div>

          <div className='my-cardpool-item'>


            <div>
              <p><span>2</span></p>
              <p><span>Acumulado</span></p>
            </div>

            <div>
              <p><span>{pool.stakeTime} </span></p>
              <p><span>Tiempo restante</span></p>
            </div>


          </div>

          <div className='my-cardpool-item'>


            <div>
              <p><span>                              {parseInt(tokensPerPool[pool.poolId])}/{getTokensLimit(pool.poolId)}
                Cap</span></p>
            </div>

            <div>
              <p><span>{pool.stakeTime}</span></p>
              <p><span>Bloqueados</span></p>
            </div>


          </div>

          <div className='my-cardpool-item'>
            {!isLoading ?
              pool.active ?
                <>
                  <button
                    onClick={() => claimReward(pool.poolId, pool.index)}
                  >Reclamar</button>
                  <button
                    onClick={() => unstake(pool.poolId, pool.index)}
                  > Devolver </button>
                </>
                :
                <>
                  <button
                    onClick={() => claimReward(pool.poolId, pool.index)}

                  >reclamar</button>

                  {1 > 0 ?
                    <button
                      onClick={() => unstake(pool.poolId, pool.index)}
                    > Retirar</button>
                    :
                    <button
                    > Devolver </button>
                  }
                </>
              :
              <>
                <button>
                  Cargando....
                </button>
                <button>
                  Cargando....
                </button>
              </>

            }
          </div>
        </div>
      ))}

    </div>
  )
}

export default MyPool