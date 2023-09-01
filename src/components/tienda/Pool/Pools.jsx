import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CreatePool from './CreatePool';
import { AiTwotoneEdit, AiFillCloseCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from "react-redux";
import { fetchNewProduct } from "../../../redux/store/actions/productActions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ethers } from "ethers";
import moment from "moment";

const Pools = () => {
    const [id, setId] = useState(0);
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch();
    const stakin = useSelector(state => state.blockchain.poolContract);
    const { exchangeContract } = useSelector(state => state.blockchain);


    const [pools, setPools] = useState([]);
    const [poolUserCounter, setPoolUserCounter] = useState(0);
    const [tokensPerPool, setTokensPerPool] = useState(0);
    const [rewarded, setRewarded] = useState(0);

    const [newPoolAPr, setNewPoolAPr] = useState("");
    const [newTimeLocked, setNewTimeLocked] = useState("");
    const [newPoolTokenLimit, setNewPoolTokenLimit] = useState("");
    const [newMaxPerWallet, setNewMaxPerWallet] = useState("");
    const [tokenPrice, setTokenPrice] = useState("");
    const [pool, setPool] = useState({});
    const [newApr, setNewApr] = useState("");
    const [newTokenLimit, setNewTokenLimit] = useState("");
    const [time, setTime] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [first, setFirst] = useState(0);
    const [AllData, setAllData] = useState([]);

    const getAllPools = async () => {
        setIsLoading(true);
        let Pools = [];
        try {
            await stakin.getAllPools().then(res => {
                res.map(pool => {
                    Pools.push({
                        stakeTokensLimit: ethers.utils.formatEther(pool.stakeTokensLimit),
                        stakingStartTime: moment(pool.stakingStartTime).format("DD MMM YYYY"),
                        stakeApr: ethers.utils.formatEther(pool.stakeApr),
                        tokenLockedTime: timestampToDays(pool.tokenLockedTime),
                        tokenLockedTime2: pool.tokenLockedTime,
                        poolId: pool.poolId,
                        active: pool.active,
                        staketTokens: getPoolTokensLimit(pool.poolId),
                        tokenLimitPerWallet: ethers.utils.formatEther(pool.tokenLimitPerWallet),
                    })
                })
            })
            setPools(Pools);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const getAllData = async () => {
        setIsLoading(true);
        let poolIds = [];
        const AllData = [];
        try {
            const data = await stakin.getAllData();
            //console.log(data);
            const Data = data.map(data => {
                AllData.push({
                    owner: data.owner,
                    stakedTokens: ethers.utils.formatEther(data.stakedTokens),
                    rewardedAmount: ethers.utils.formatEther(data.rewardedAmount),
                    index: parseInt(data.index),
                    poolId: data.poolId,
                    stakeTime: timestampToDate(data.stakeTime),
                    startTime: timestampToDate(data.startTime),
                    dateClaimed: timestampToDate(data.dateClaimed),
                    clearStartTime: data.startTime,
                    clearDateClaimed: data.dateClaimed,
                    tokenLockedTime: moment.unix(data.tokenLockedTime).format("DD MMM YYYY"),
                    tokenLockedTime2:data.tokenLockedTime,
                    active: data.active,

                })
            })

            setAllData(AllData);


            const addressPerId = data.filter(pool => pool.active === true);
            const addresPerIDS = addressPerId.map(pool => {
                poolIds.push({
                    poolId: pool.poolId,
                    address: pool.address,
                    stakedTokens: pool.stakedTokens / 10 ** 18,
                    rewardedAmount: pool.rewardedAmount / 10 ** 18,
                })
            })
            //count same poolIds
            const count = poolIds.reduce((acc, curr) => {
                acc[curr.poolId] = (acc[curr.poolId] || 0) + 1;
                return acc;
            }, {});
            //console.log(count);
            setPoolUserCounter(count);

            //sum stakedTokens per poolId
            const sum = poolIds.reduce((acc, curr) => {
                acc[curr.poolId] = (acc[curr.poolId] || 0) + curr.stakedTokens;
                return acc;
            }
                , {});
            //console.log(sum);
            setTokensPerPool(sum);

            //getRewardedAmount per poolId
            const reward = poolIds.reduce((acc, curr) => {
                acc[curr.poolId] = (acc[curr.poolId] || 0) + curr.rewardedAmount;
                return acc;
            }
                , {});
            //console.log("tokenPrice", tokenPrice);
            //console.log("reward", reward);
            setRewarded(reward);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const createNewPool = async () => {
        setIsLoading(true);
        try {
            const tokenLimit = ethers.utils.parseEther(newPoolTokenLimit);
            const timelocked = newTimeLocked * 24 * 60 * 60;
            const stakeApr = ethers.utils.parseEther(newPoolAPr);
            const Max = ethers.utils.parseEther(newMaxPerWallet);

            await stakin.setStakePool(tokenLimit, timelocked, stakeApr, Max);
            stakin.on("setNewPool", (apr, limit, locked) => {

                getAllData();
                getAllPools();
                setIsLoading(false);
            }
            )
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }

    }

    const fixApr = async (poolId) => {
        setIsLoading(true);
        try {
            const apr = ethers.utils.parseEther(newApr);
            const tx = await stakin.setPoolApr(poolId, apr);
            setTimeout(() => {
                getAllData();
                getAllPools();
                setIsLoading(false);
            }, 4100);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const fixTokenLimit = async (poolId) => {
        setIsLoading(true);
        try {
            const tokenLimit = ethers.utils.parseEther(newTokenLimit);
            const tx = await stakin.setPoolTokenLimit(poolId, tokenLimit);
            tx.wait();
            setTimeout(() => {
                getAllData();
                getAllPools();
                setIsLoading(false);
            }, 4100);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }

    }

    const udesactivatePool = async (poolId) => {
        setIsLoading(true);
        try {
            const desactivate = await stakin.setPoolFalse(poolId);

        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const activatePool = async (poolId) => {
        setIsLoading(true);
        try {
            const activate = await stakin.setPoolTrue(poolId);
            //console.log(activate);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const getAprWithPoolId = (poolId) => {
        let apr = 0;
        pools.map(pool => {
            if (pool.poolId === poolId) {
                //console.log("stakeapr",parseInt(pool.stakeApr));
                apr = parseInt(pool.stakeApr);
            }
        })
        return apr;
    }

    const filterCounter = (poolId) => {
        const count = poolUserCounter[poolId];
        return count;
    }

    const getPoolTokensLimit = async (poolId) => {

        try {

            const get = await stakin.getPoolTokenLimit(poolId);
            return ethers.utils.formatEther(get);
        } catch (e) {
            return "0";
        }

    }

    const timestampToDays = (timestamp) => {
        if (timestamp < 60) {
            return `${timestamp} seconds`;
        }
        else if (timestamp < 3600) {
            return `${Math.floor(timestamp / 60)} minutes`;
        }
        else if (timestamp < 86400) {
            return `${Math.floor(timestamp / 3600)} hours`;
        }
        else if (timestamp < 2592000) {
            return `${Math.floor(timestamp / 86400)} days`;
        }
        else if (timestamp < 31536000) {
            return `${Math.floor(timestamp / 2592000)} months`;
        }
        else {
            return `${Math.floor(timestamp / 31536000)} years`;
        }
    }

    const timestampToDate = (timestamp) => {
        return moment.unix(timestamp).format("DD MMM, YYYY");
    }


    const tokenPricefetch = async () => {
        const tokenPrice = await exchangeContract.token_price();
        //const tokenPrice = await exchangeContract.fetchLatestPrice();
        setTokenPrice(parseFloat(ethers.utils.formatEther(tokenPrice)));
    }

    const sliceAddress = (address) => {
        const Address = address.slice(0, 6) + "..." + address.slice(-4);
        return Address;
    }


    const estados = [
        "Pausado",
        "Activo"
    ]
    const [newPool, setNewPool] = useState({
        apr: 0,
        max_w: 0,
        max_p: 0,
        tiempo_bloqueo: 0,
        estado: ""
    });


    const [dataTab] = useState([
        {
            id: 1,
            title: 'Crear',
            item: 0,
        },
        {
            id: 2,
            title: 'Pools',
            item: 3,
        }

    ]);

    const editar = (_id) => {

        setId(_id)
        setEdit(!edit)
        setPool(pools[_id])
        setFirst(pools[_id].tokenLockedTime)
    }


    useEffect(() => {
        if (stakin) {
            getAllData();
            getAllPools();
            tokenPricefetch();
        }
    }, [stakin]);

    const [allDataFilter, setAllDataFilter] = useState(AllData);
    const [filterWord, setFilterWord] = useState("");

    const filterData = () => {
        if (filterWord === "") {
            setAllDataFilter(AllData);
        } else {
            const filter = AllData.filter((data) => data.owner.toLowerCase().includes(filterWord.toLowerCase()));
            setAllDataFilter(filter);
        }
    }

    useEffect(() => {
        filterData();
    }, [filterWord, AllData]);


    const calculateAcumulatedReward = (apr, dateClaimed, amuntStaked) => {
        const aprPerDay = apr / 365;
        const timePass = moment().unix() - dateClaimed;
        const daysPass = timePass / 86400;
        const reward = (aprPerDay * daysPass * amuntStaked) / 100;
        const calcWithTokenPrice = reward * tokenPrice;
        return calcWithTokenPrice.toFixed(6);

    }

    const editPool = async(e)=>{
        e.preventDefault()
        let seconds;
        if(first.toString() !== pool.tokenLockedTime.toString()){
            seconds = daysToSeconds(parseInt(pool.tokenLockedTime))
        }else{
            seconds = pool.tokenLockedTime2
        }
        try {
            const tx = await stakin.editStakePool(pool.poolId, ethers.utils.parseEther(parseInt(pool.stakeTokensLimit).toString()), seconds, ethers.utils.parseEther(parseInt(pool.stakeApr).toString()), ethers.utils.parseEther(parseInt(pool.tokenLimitPerWallet).toString()), pool.activate);
            await tx.wait();
            await getAllPools()
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Pool creado correctamente",
              });
              editar(pool.poolId)
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ha ocurrido un error",
              });
        }
    }

    const daysToSeconds=(days)=>{
        return days * 24 * 60 * 60
      }


    return (
        <div>                        <Tabs>
            <div className="d-flex justify-content-between mb-wr">
                <TabList>

                    {
                        dataTab.map(idx => (
                            <Tab key={idx.id} className="new-design">{idx.title}</Tab>
                        ))
                    }



                </TabList>
            </div>

            <TabPanel >
                <div className='content'>
                    <CreatePool />

                </div>
            </TabPanel>
            <TabPanel>
                {!edit && (
                    <div className='content'>

                        <div className='car-contenedor'>
                            <div className="overflow-table">
                                <div className='dashboard-content inventory content-tab'>
                                    <div className="inner-content inventory">
                                        <h4 className="title-dashboard">Pools</h4>

                                        <div className="table-ranking top">

                                            <div className="title-ranking">
                                                <div className="col-rankingg">Pool ID</div>
                                                <div className="col-rankingg">Apr</div>
                                                <div className="col-rankingg">Limite de tokens</div>
                                                <div className="col-rankingg">Tiempo de bloqueo</div>
                                                <div className="col-rankingg">Usuarios</div>
                                                <div className="col-rankingg">maximo por wallet</div>
                                                <div className="col-rankingg">rewarded</div>
                                            </div>
                                        </div>

                                        {pools.length > 0 ?
                                            <>
                                                {pools.map((pool, index) => (
                                                    <div className="table-ranking " >
                                                        <div className="content-ranking">
                                                            <div className="col-rankingg">{parseInt(pool.poolId)}</div>
                                                            <div className="col-rankingg">
                                                                {parseInt(pool.stakeApr)}
                                                            </div>
                                                            <div className="col-rankingg coin">
                                                                {tokensPerPool[pool.poolId] ?
                                                                    tokensPerPool[pool.poolId] : 0
                                                                }/{pool.stakeTokensLimit}
                                                            </div>
                                                            <div className="col-rankingg">
                                                                {pool.tokenLockedTime}

                                                            </div>
                                                            <div className="col-rankingg ">
                                                                {filterCounter(pool.poolId) ?
                                                                    filterCounter(pool.poolId) : 0
                                                                }
                                                            </div>
                                                            <div className="col-rankingg ">
                                                                {pool.tokenLimitPerWallet}
                                                            </div>

                                                            <div className="col-rankingg ">
                                                                {rewarded[pool.poolId] ?
                                                                    (rewarded[pool.poolId] * tokenPrice).toFixed(4) : 0
                                                                }
                                                            </div>
                                                            <div className="col-rankingg ">
                                                                <div className='contenedor-de'>
                                                                    <div className='delete-button' onClick={() => editar(pool.poolId)}>

                                                                        <AiTwotoneEdit />

                                                                    </div>
                                                                </div>


                                                            </div>

                                                        </div>


                                                    </div>))
                                                }</> :
                                            <h4>No hay pools</h4>}


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {edit && <div className='content'>
                    <form onSubmit={(e)=>editPool(e)}>
                        <div className='create-pool'>
                            <div className='close-edit' >
                                <span>
                                    <AiFillCloseCircle onClick={() => editar(id)} />
                                </span>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Apr"
                                    value={pool.stakeApr}
                                    onChange={(e) => setPool({ ...pool, stakeApr : e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Maximo por wallet"
                                    value={pool.tokenLimitPerWallet}
                                    onChange={(e) => setPool({ ...pool, tokenLimitPerWallet : e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Maximo por pool"
                                    value={pool.stakeTokensLimit}
                                    onChange={(e) => setPool({ ...pool, stakeTokensLimit : e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Tiempo de bloqueo"
                                    value={pool.tokenLockedTime}
                                    onChange={(e) => {
                                        setFirst(pool.tokenLockedTime)
                                        setPool({ ...pool, tokenLockedTime : e.target.value })
                                        }}
                                    required
                                />
                            </div>
                            <div className="form-select" id="subject">
                                <select
                                    value={newPool.estado}
                                    onChange={(e) => setNewPool({ ...newPool, estado: e.target.value })}>
                                    <option value="">estado</option>

                                    {estados.map((estado, index) => (
                                        <option key={index} value={estado}>
                                            {estado}
                                        </option>
                                    ))}
                                </select>
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
                </div>}
            </TabPanel>


        </Tabs></div>
    )
}

export default Pools