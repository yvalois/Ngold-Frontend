import { ethers } from "ethers";
import exchangeAbi from "../../../abis/Exchange.json";
import elfosAbi from "../../../abis/Elfos.json";

import { contract } from "../../blockchain/blockchainRouter";

const router = contract();

const loadingTokenPrice = () => ({
    type: 'LOADING_TOKEN_PRICE',
});

const loadingTokenPriceSuccess = (payload) => ({
    type: 'LOADING_TOKEN_PRICE_SUCCESS',
    payload,
});

const loadingTokenPriceFailure = (payload) => ({
    type: 'LOADING_TOKEN_PRICE_FAILURE',
    payload,
});

export const loadTokenPrice = () => async dispatch => {
    dispatch(loadingTokenPrice());
    try{
    const rpc = router.RPC_URL;
    const exchange = router.EXCHANGE_ADDRESS;
    const elfos = router.ELFOS_ADDRESS;

    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const contract = new ethers.Contract(exchange, exchangeAbi, provider);
    const Elfos = new  ethers.Contract(elfos, elfosAbi, provider);


    const tokenInWei = await contract.calculatePriceU(ethers.utils.parseUnits("1", 18));
    const tokenBInWei = await Elfos.getNftPrice();
    const token = ethers.utils.formatEther(tokenInWei);
    const tokenB = ethers.utils.formatEther(tokenBInWei);


    dispatch(loadingTokenPriceSuccess({ tokenPrice: token, tokenBPrice: tokenB }));
    }catch(e){
        dispatch(loadingTokenPriceFailure({ errorMsg: e.message }));
    }
}