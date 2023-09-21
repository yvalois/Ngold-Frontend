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
import { ConnectKitButton, useModal } from "connectkit";
import { useAccount } from 'wagmi';
function Pools() {
  const dispatch = useDispatch();
  const stakin = useSelector(state => state.blockchain.poolContract);

  const blockchain = useSelector(state => state.blockchain);
  const { isConnect, loading } = useSelector(state => state.blockchain);


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
  const { isConnected } = useAccount()
  const changeLoadingCard = (is) => {
    setCartLoading(is);
  }
  const { open, setOpen } = useModal();
  const stake = async (poolId, amount, show) => {
    setIsLoading(true);
    if (isConnect) {
      if (allowances > amount) {
        try {
          const value = amount * 10 ** 18
          const tx = await stakin.setUserStake(poolId, value.toString());
          stakin.on("Stake", (poolId, amount) => {

            setStakeValue(0);
            dispatch(fetchBalance());
            dispatch(fetchData());
            setIsLoading(false);
          });
          await tx.wait();
          Swal.fire({
            title: 'Success',
            text: 'Bloqueado correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          setIsLoading(false);

        } catch (err) {
          console.log(err);
          Swal.fire({
            title: 'Error',
            text: error.reason,
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          })
          if (err.reason) {
            setErrorMsg(err.reason);
            setError(true);
          }
          setIsLoading(false);
        }
      } else {
        try {
          const value = amount * 10 ** 18
          const tx = await blockchain.ngoldContract.approve(blockchain.poolContract.address, value.toString());
          await tx.wait();
          dispatch(fetchData());

          Swal.fire({
            title: 'Success',
            text: 'aprobadoi correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          blockchain.ngoldContract.on('Approval', (owner, spender, value) => {

            setAllowance(ethers.utils.formatEther(value));
            setIsLoading(false);
          })

        }
        catch (err) {
          if (error.reason) {
            setErrorMsg(error.reason);
            setError(true);

          }
          Swal.fire({
            title: 'Error',
            text: error.reason,
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          })
          setIsLoading(false);
        }
      }
    } else {
      show()
    }

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
      await stakin.userClaimReward(poolId, index);
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

        console.log("errortrigered", err.reason);
      }
      setIsLoading(false);
    }
  }

  const unstake = async (poolId, index) => {
    setIsLoading(true);
    try {
      //Cambio en parametros
      await stakin.userUnstake(poolId, index);
      stakin.on("Unstake", (addr, ammount, apr, mtime) => {

        dispatch(fetchBalance());
        dispatch(fetchData());

        setIsLoading(false);
      }
      );
    } catch (err) {
      if (err.reason) {
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
    dispatch(fetchData());

  }, [blockchain]);


  useEffect(() => {

    setPools(data.pools);
    setMyStaked(data.accountPools);
    setTokenPrice(data.tokenPrice);

  }, [stakin, data]);

  useEffect(() => {
    if (data.Data) {
      const Data = data.Data;
      const sum = Data.reduce((acc, curr) => {
        acc[curr.poolId] = (acc[curr.poolId] || 0) + curr.stakedTokens;
        return acc;
      }, {});
      setTokensPerPool(sum);
      if (allowances == 0) {
        setAllowance(data.allowance)
      }
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

  useEffect(() => {
    if (isConnected) {
      setOpen(false)
    }
  }, [isConnected])

  return (
    <div className='pools-container'>

      {pools.map((item, index) => (
        <div key={index} className='cardpool'>
          <div className='cardpool-info'>
            <span>
              {tokensPerPool[item.poolId] ?
                parseInt(tokensPerPool[item.poolId])
                : "0"
              }/{getTokensLimit(item.poolId)}
            </span>
            <span>
              {data.stakeApr}%
            </span>
          </div>

          <div className='cardpool-input'>
            <input
              type="number"
              value={stakeValue}
              onChange={(e) => setStakeValue(e.target.value)}
            /><span>
              /{getTokensLimit(item.poolId)}
            </span>
          </div>

          <div className='cardpool-action'>
            {parseInt(tokensPerPool[item.poolId]) >= getTokensLimit(item.poolId) ?
              <button
                className="bg-yellow-300 rounded-lg border-none w-36 shadow-md "
              >Pool llena
              </button>
              :
              !isConnected && <ConnectKitButton.Custom>
                {({ show, isConnecting, hide }) => {
                  return (
                    <button
                      className="bg-yellow-300 text-black cursor-pointer w-36 shadow-md rounded-lg"
                      onClick={show}
                    >
                      Conectar
                    </button>)
                }}
              </ConnectKitButton.Custom>


            }
            {isConnected &&
              <button
                className="bg-yellow-300 text-black cursor-pointer w-36 shadow-md rounded-lg"
                onClick={() => stake(item.poolId, stakeValue)}
              >
                {


                  !isLoading ?
                    allowances > stakeValue ?
                      "Bloquear"
                      :
                      "Aprobar"
                    : "Cargando"

                }
              </button>}
          </div>
        </div>)
      )
      }


    </div>
  )
}

export default Pools