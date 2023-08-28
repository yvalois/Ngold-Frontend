import { ethers } from "ethers";
import exchangeAbi from "../../../abis/Exchange.json";
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
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const contract = new ethers.Contract(exchange, exchangeAbi, provider);

    const tokenInWei = await contract.fetchPrice();
    const token = ethers.utils.formatEther(tokenInWei);

    dispatch(loadingTokenPriceSuccess({ tokenPrice: tokenInWei }));
    }catch(e){
        dispatch(loadingTokenPriceFailure({ errorMsg: e.message }));
    }
}