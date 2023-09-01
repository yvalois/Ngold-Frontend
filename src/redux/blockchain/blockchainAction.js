import { ethers } from "ethers";
import Web3Modal from "web3modal";
import abiToken from '../../abis/abiERC20.json';
import Cobro from '../../abis/Cobro.json';
import Elfos from '../../abis/Elfos.json';
import Exchange from '../../abis/Exchange.json';
import Ngold from '../../abis/Ngold.json';
import Staking from '../../abis/Staking.json';
import Tienda from '../../abis/Tienda.json';
import Pool from '../../abis/Pool.json';
import elfo from '../../assets/images/elf_6.jpg'




import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { contract } from './blockchainRouter';
import { Alert } from "react-bootstrap";

const router = contract();

const BUSD_ADDRESS = router.BUSD_ADDRESS;
const NGOLD_ADDRESS = router.NGOLD_ADDRESS;
const EXCHANGE_ADDRESS = router.EXCHANGE_ADDRESS;
const STAKING_ADDRESS = router.STAKING_ADDRESS;
const COBRO_ADDRESS = router.COBRO_ADDRESS;
const TIENDA_ADDRESS = router.TIENDA_ADDRESS;
const ELFOS_ADDRESS = router.ELFOS_ADDRESS;
const POOL_ADDRESS = router.POOL_ADDRESS;


const loadingBlockchain = () => ({
    type: 'LOADING_BLOCKCHAIN',
})

const loadingBlockchainSuccess = (payload) => ({
    type: 'LOADING_BLOCKCHAIN_SUCCESS',
    payload,
})

const loadingBlockchainFailure = (payload) => ({
    type: 'LOADING_BLOCKCHAIN_FAILURE',
    payload,
})

const updateAccount = (payload) => ({
    type: 'UPDATE_ACCOUNT',
    payload
})

const updateBalance = (payload) => ({
    type: 'UPDATE_BALANCE',
    payload,
})

export const updateTokenS = (tokens) => ({
    type: 'UPDATE_BALANCE_STAKING',
    payload: {
        tokens
    },
})

export const updateTokenI = (tokens) => ({
    type: 'UPDATE_BALANCE_INVERSIONES',
    payload: {
        tokens
    },
})

const disconnectBlockchain = () => ({
    type: 'DISCONNECT_BLOCKCHAIN',
})



export const updateInversionTokens = (inversionesContract, accountAddress) => async (dispatch) => {
    let inversionesBalance = [];
    let inversionesBalances = await inversionesContract.getMyInventory(accountAddress);

    for (let i = 0; inversionesBalances.length > i; i++) {
        const tipo = await inversionesContract.getTipo(parseInt(inversionesBalances[i]));
        const name = `Inversiones ${tipo}`
        let info = {
            nombre: name,
            id: parseInt(inversionesBalances[i]),
            tipo: parseInt(tipo),
            image: `https://violet-disgusted-halibut-418.mypinata.cloud/ipfs/QmUncKwRVF1yXsckcTA3cQ6GgfMag1M8nQxgrKXMLWkbWH/${tipo}.png`

        }
        inversionesBalance.push(info)
    }


    dispatch(updateTokenI(inversionesBalance))
}

export const updateStakingTokens = (inversioneStakingContract, accountAddress) => async (dispatch) => {
    let inversionesStakingBalance = [];
    let inversionesStakingBalances = await inversioneStakingContract.getNfts(accountAddress);

    for (let i = 0; inversionesStakingBalances.length > i; i++) {
        const restTime = await inversioneStakingContract.getRestTime(parseInt(inversionesStakingBalances[i]));
        const reward = await inversioneStakingContract.rewardPerToken(parseInt(inversionesStakingBalances[i]), accountAddress);
        const valorConvertido = ethers.utils.formatUnits(reward, 8);
        let info = {
            id: parseInt(inversionesStakingBalances[i]),
            Tiempo: parseInt(restTime),
            currentReward: valorConvertido,

        }
        inversionesStakingBalance.push(info)
    }
    dispatch(updateTokenS(inversionesStakingBalance))
}

export const updateBalances = () => async (dispatch, getState) => {
    const { ngoldContract, busdContract, elfosContract, stakingContract, cobroContract, accountAddress } = getState().blockchain;
    const ngoldBalance = parseFloat(await ngoldContract.balanceOf(accountAddress)) / 10 ** 18;
    const exchangeBusdBalance = parseFloat(await ngoldContract.balanceOf(EXCHANGE_ADDRESS)) / 10 ** 18;
    const exchangeNgoldBalance = parseFloat(await ngoldContract.balanceOf(EXCHANGE_ADDRESS)) / 10 ** 18;
    const busdBalance = parseFloat(await busdContract.balanceOf(accountAddress)) / 10 ** 18;
    const cobroBalance = parseFloat(await ngoldContract.balanceOf(accountAddress)) / 10 ** 18;

    //8 decimals token


    let ngoldNftBalance = [];
    let ngoldNftStakingBalance = [];
    let NgoldNftBalance = await elfosContract.getMyInventory(accountAddress);
    let NgoldStakingBalance = await stakingContract.getNftsInStaking();
    for (let i = 0; NgoldNftBalance.length > i; i++) {
        const name = `Elfo`
        let info = {
            nombre: name,
            id: parseInt(NgoldNftBalance[i]),
            image: elfo
        }
        ngoldNftBalance.push(info)
    }

    for (let i = 0; NgoldStakingBalance.length > i; i++) {
        const reward = await stakingContract.rewardPerToken(parseInt(NgoldStakingBalance[i]));
        const valorConvertido = parseFloat(ethers.utils.formatUnits(reward, 8)).toFixed(2);
        let info = {
            id: parseInt(NgoldStakingBalance[i]),
            currentReward: valorConvertido,
            image: elfo

        }
        ngoldNftStakingBalance.push(info)
    }

    dispatch(updateBalance({
        ngoldBalance,
        busdBalance,
        cobroBalance,
        exchangeBusdBalance,
        exchangeNgoldBalance,
        ngoldNftBalance,
        ngoldNftStakingBalance
    }))

}

export const fetchBlockchain = (accountAddress, signer, provider) => {
    return async (dispatch) => {
        const a = "production"
        dispatch(loadingBlockchain())
        try {
            try {
                const networkID = await provider.getNetwork();
                if ((process.env.REACT_APP_PRODUCTION === 'production' && networkID.chainId === 137) ||
                    (process.env.REACT_APP_PRODUCTION === 'development' && networkID.chainId === 31337)) {
                    const ngoldContract = new ethers.Contract(NGOLD_ADDRESS, abiToken, signer);
                    const busdContract = new ethers.Contract(BUSD_ADDRESS, abiToken, signer);
                    const exchangeContract = new ethers.Contract(EXCHANGE_ADDRESS, Exchange, signer);
                    const stakingContract = new ethers.Contract(STAKING_ADDRESS, Staking, signer);
                    const cobroContract = new ethers.Contract(COBRO_ADDRESS, Cobro, signer);
                    const elfosContract = new ethers.Contract(ELFOS_ADDRESS, Elfos, signer);
                    const tiendaContract = new ethers.Contract(TIENDA_ADDRESS, Tienda, signer);
                    const poolContract = new ethers.Contract(POOL_ADDRESS, Pool, signer);


                    const ngoldBalance = parseFloat(await ngoldContract.balanceOf(accountAddress)) / 10 ** 18;
                    const exchangeBusdBalance = parseFloat(await ngoldContract.balanceOf(EXCHANGE_ADDRESS)) / 10 ** 18;
                    const exchangeNgoldBalance = parseFloat(await ngoldContract.balanceOf(EXCHANGE_ADDRESS)) / 10 ** 18;
                    const busdBalance = parseFloat(await busdContract.balanceOf(accountAddress)) / 10 ** 18;
                    const cobroBalance = parseFloat(await ngoldContract.balanceOf(accountAddress)) / 10 ** 18;

                    //8 decimals token
                    const exchangeOwner = await exchangeContract.owner();
                    const isOwner = accountAddress.toLowerCase() === exchangeOwner.toLowerCase(); // *TODO: Buscar una mejor solucion.
                    let ngoldNftBalance = [];
                    let ngoldNftStakingBalance = [];
                    let NgoldNftBalance = await elfosContract.getMyInventory(accountAddress);
                    let NgoldStakingBalance = await stakingContract.getNftsInStaking();
                    for (let i = 0; NgoldNftBalance.length > i; i++) {
                        const name = `Elfo`
                        let info = {
                            nombre: name,
                            id: parseInt(NgoldNftBalance[i]),
                            image: elfo
                        }
                        ngoldNftBalance.push(info)
                    }

                    for (let i = 0; NgoldStakingBalance.length > i; i++) {
                        const reward = await stakingContract.rewardPerToken(parseInt(NgoldStakingBalance[i]));
                        const valorConvertido = parseFloat(ethers.utils.formatUnits(reward, 8)).toFixed(2);
                        let info = {
                            id: parseInt(NgoldStakingBalance[i]),
                            currentReward: valorConvertido,
                            image: elfo
                        }
                        ngoldNftStakingBalance.push(info)
                    }
                    await dispatch(loadingBlockchainSuccess({
                        ngoldContract,
                        busdContract,
                        elfosContract,
                        stakingContract,
                        poolContract,
                        ngoldBalance: ngoldBalance,
                        busdBalance: busdBalance,
                        ngoldNftBalance,
                        ngoldNftStakingBalance,
                        accountAddress: accountAddress,
                        exchangeContract,
                        networkID: networkID.chainId,
                        exchangeBusdBalance: exchangeBusdBalance,
                        exchangeNgoldBalance,
                        signer,
                        tiendaContract,
                        cobroContract,
                        cobroBalance,
                        isOwner
                    }))
                }
                else {
                    if (a === 'production') {
                        try {
                            await provider.provider.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{ chainId: `0x${Number(56).toString(16)}` }],
                            })
                        } catch (switchError) {
                            if (switchError.code === 4902) {
                                try {
                                    await provider.provider.request({
                                        method: 'wallet_addEthereumChain',
                                        params: [{
                                            chainId: `0x${Number(56).toString(16)}`,
                                            chainName: "Binance Smart Chain ",
                                            nativeCurrency: {
                                                name: "Binance Chain Native Token",
                                                symbol: "BNB",
                                                decimals: 18,
                                            },
                                            rpcUrls: [
                                                "https:bsc-dataseed.binance.org",
                                            ],
                                            blockExplorerUrls: [
                                                "https:bscscan.com",
                                            ],
                                        }],
                                    })
                                } catch (addError) {
                                    console.log(addError)
                                    dispatch(loadingBlockchainFailure(addError))
                                }
                            }
                        }
                    } else if (a === 'development') {
                        try {
                            await provider.provider.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{ chainId: `0x${Number(97).toString(16)}` }],
                            })

                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            } catch (error) {
                dispatch(loadingBlockchainFailure({
                    errorMsg: 'Error de transaccion',
                }))
                console.log(error)
            }
        } catch (error) {
            dispatch(loadingBlockchainFailure({
                errorMsg: 'Error de conneccion',
            }))
            console.log(error)
        }
    }
}

export const fetchBalance = () => {
    return async (dispatch, getState) => {
        const { ngoldContract, busdContract,  accountAddress } = getState().blockchain
        const tokenBalance = await ngoldContract.balanceOf(accountAddress)
        const busdBalance = await busdContract.balanceOf(accountAddress)
        const tokenBalanceFormatted = parseFloat(tokenBalance) / 10 ** 18
        const busdBalanceFormatted = parseFloat(ethers.utils.formatEther(busdBalance))
        dispatch(updateBalance(tokenBalanceFormatted, busdBalanceFormatted, 0))
    }
}

export const disconnectBlockchainAction = () => {
    return async (dispatch) => {
        //providerOptions.clearCachedProvider();
        dispatch(disconnectBlockchain())
    }
};


