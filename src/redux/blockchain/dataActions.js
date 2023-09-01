import store from "../store";
import { ethers } from "ethers";
import moment from "moment";


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


const loadingData = () => {
    return {
        type: "LOADING_DATA"
    };
}

const loadingDataSuccess = (payload) => {
    return {
        type: "LOADING_DATA_SUCCESS",
        payload
    };
}

const loadingDataFailure = (payload) => {
    return {
        type: "LOADING_DATA_FAILURE",
        payload
    };
}

const updateData = (pools, accountPools, Data) => {
    return {
        type: "UPDATE_DATA",
        payload: {
            pools,
            accountPools,
            Data
        }
    };
}

const logOut = () => {
    return {
        type: "LOG_OUT"
    };
}

export const fetchData = () => {
    return async (dispatch) => {
        dispatch(loadingData());
        try {
            //cambia nombre de funcionas y un poco de logica de como se hacen los gets
            const Pools = [];
            const Data = [];
            const AccountPools = [];
            const staking = await store.getState().blockchain.poolContract;
            const exchange = await store.getState().blockchain.exchangeContract;

            const token = await store.getState().blockchain.ngoldContract;

            
            if(staking){
            const getPools = await staking.getAllPools();

            const data = await staking.getAllData();

            const accountPools = await staking.getStakingPoolInfos();

            const address = await store.getState().blockchain.accountAddress;

            const allow = await token.allowance(store.getState().blockchain.accountAddress, staking.address);

            const allowed = ethers.utils.formatEther(allow);

            const {bannedAccounts, bannedLoaded} = await store.getState().banned
            
            const bannedWallets = bannedAccounts?.banneds;
            const filterbanPools = getPools.filter(pool => {
            const banned  = bannedWallets?.find(banned => banned.addressBanned === address);
                if(banned){
                    if(banned.poolsBanned.includes(pool.poolId)){
                        return false;
                    }
                }
                return true;
            })

            const pools = filterbanPools.map(pool => {
          
                Pools.push({
                    stakeTokensLimit: parseFloat(ethers.utils.formatEther(pool.stakeTokensLimit)),
                    stakingStartTime: moment(pool.stakingStartTime).format("DD MMM YYYY"),
                    stakeApr: parseInt(ethers.utils.formatEther(pool.stakeApr)),
                    tokenLockedTime: timestampToDays(pool.tokenLockedTime),
                    poolId: pool.poolId,
                    active: pool.active,
                    tokenLimitPerWallet: parseFloat(ethers.utils.formatEther(pool.tokenLimitPerWallet)),
                })
            })

            const getData = data.map(data => {
                Data.push({
                    owner: data.owner,
                    stakedTokens: parseFloat(ethers.utils.formatEther(data.stakedTokens)),
                    rewardedAmount: parseFloat(ethers.utils.formatEther(data.rewardedAmount)),
                    index: parseInt(data.index),
                    poolId: data.poolId,
                    stakeTime: timestampToDate(data.stakeTime),
                    startTime: timestampToDate(data.startTime),
                    dateClaimed: timestampToDate(data.dateClaimed),
                    tokenLockedTime: moment.unix(data.tokenLockedTime).format("DD MMM YYYY"),
                    active: data.active,

                })
            })
            const accountsPools1 = accountPools.filter(accountPool => parseFloat(accountPool.stakedTokens) !== 0);


            // filter banned pools from accountPools
            const accountsPools = accountsPools1.filter(accountPool => {

                const banned = bannedWallets?.find(banned => banned.addressBanned === address);

                if (banned) {
                    return !banned.poolsBanned.includes(accountPool.poolId);
                } else {
                    return true;
                }
            })
 

            const getAccountPools = accountsPools.map(pool => {
                if(pool.active === true){
                AccountPools.push({
                    poolId: pool.poolId,
                    stakedTokens: parseFloat(ethers.utils.formatEther(pool.stakedTokens)).toFixed(2),
                    rewardedAmount: parseFloat(ethers.utils.formatEther(pool.rewardedAmount)).toFixed(2),
                    active: pool.active,
                    stakeTime: pool.stakeTime,
                    startTime: moment(pool.startTime).format("DD MMM YYYY"),
                    tokenLockedTime: pool.tokenLockedTime,
                    dateClaimed: pool.dateClaimed,
                    index: parseInt(pool.index),
                })
            }
            })

            const TokenPrice = await exchange.fetchLatestPrice();
            const tokenPrice = parseFloat(ethers.utils.formatEther(TokenPrice));
            
            dispatch(loadingDataSuccess({
                pools: Pools,
                accountPools: AccountPools,
                Data: Data,
                tokenPrice: tokenPrice,
                allowance: allowed,
            }));
            }
        } catch (error) {
            dispatch(loadingDataFailure({
                errorMsg: error
            }));
        }
    }
}

export const updateDataAction = () => {
    return (dispatch) => {
        try{
        dispatch(fetchData());
        }catch(error){
            console.log(error);
        }

    }
}


export const logOutAction = () => {
    return (dispatch) => {
        dispatch(logOut());
    }
}




