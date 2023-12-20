const initialState = {
    loading: false,
    error: null,
    errorMsg: null,
    ngoldContract: 0,
    busdContract: 0,
    cobroContract: null,
    cobroBalance:null,
    ngoldBalance: null,
    busdBalance: null,
    ngoldNftBalance: [],
    ngoldNftStakingBalance: [],
    elfosContract:null,
    stakingContract:null,
    poolContract:null,
    accountAddress: null,  
    exchangeContract: null,  
    exchangeContractP: null,
    tiendaContract: null,
    networkID: null,
    exchangeBusdBalance: null,
    exchangeNgoldBalance: null,
    signer: null,
    provider: null,
    isOwner: false,
    isConnect: false

}

const blockchainReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOADING_BLOCKCHAIN':
            return {
                ...state,
                loading: true,
                error: null,
                errorMsg: null,
            }
        case 'LOADING_BLOCKCHAIN_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                errorMsg: null,
                ngoldContract: action.payload.ngoldContract,
                busdContract: action.payload.busdContract,
                elfosContract: action.payload.elfosContract,
                stakingContract: action.payload.stakingContract,
                poolContract: action.payload.poolContract,
                ngoldBalance: action.payload.ngoldBalance,
                busdBalance: action.payload.busdBalance,
                ngoldNftBalance: action.payload.ngoldNftBalance,
                ngoldNftStakingBalance: action.payload.ngoldNftStakingBalance,
                accountAddress: action.payload.accountAddress,
                exchangeContract: action.payload.exchangeContract,
                networkID: action.payload.networkID,
                exchangeBusdBalance: action.payload.exchangeBusdBalance,
                exchangeNgoldBalance: action.payload.exchangeNgoldBalance,
                signer: action.payload.signer,
                provider: action.payload.provider,
                tiendaContract: action.payload.tiendaContract,
                cobroContract: action.payload.cobroContract,
                cobroBalance: action.payload.cobroBalance,
                isOwner: action.payload.isOwner,
                isConnect: true
        }
        case 'LOADING_BLOCKCHAIN_FAILURE':
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.errorMsg,
            }
        case 'UPDATE_ACCOUNT':
            return {
                ...state,
                accountAddress: action.payload.accountAddress,
                ngoldBalance: action.payload.ngoldBalance,
                busdBalance: action.payload.busdBalance,
                exchangeBalance: action.payload.exchangeBalance,
                isOwner: action.payload.isOwner,
                isConnect: true
            }
        case 'UPDATE_BALANCE':
            return {
                ...state,
                ngoldBalance: action.payload.ngoldBalance,
                busdBalance: action.payload.busdBalance,
                cobroBalance: action.payload.cobroBalance,
                exchangeBusdBalance: action.payload.exchangeBusdBalance,
                exchangeNgoldBalance: action.payload.exchangeNgoldBalance,
                ngoldNftBalance:action.payload.ngoldNftBalance,
                ngoldNftStakingBalance: action.payload.ngoldNftStakingBalance
            }
            case 'UPDATE_BALANCE_STAKING':
                return {
                    ...state,
                    inversionesStakingBalance: action.payload.tokens,
                }
            case 'UPDATE_BALANCE_INVERSIONES':
                return {
                    ...state,
                    inversionesBalance: action.payload.tokens,
                }
            case 'UPDATE_INVERSIONES_PROVIDER':
                return{
                    ...state,
                    inversionesContractProvider: action.payload.inversionesContract
                }
        case 'DISCONNECT_BLOCKCHAIN':
            return {
                ...state,
                loading: false,
                error: null,
                errorMsg: null,
                ngoldContract: 0,
                busdContract: 0,
                cobroContract: null,
                cobroBalance:null,
                ngoldBalance: null,
                busdBalance: null,
                ngoldNftBalance: [],
                ngoldNftStakingBalance: [],
                elfosContract:null,
                stakingContract:null,
                poolContract:null,
                accountAddress: null,  
                exchangeContract: null,  
                tiendaContract: null,
                networkID: null,
                exchangeBusdBalance: null,
                exchangeNgoldBalance: null,
                signer: null,
                provider: null,
                isOwner: false,
                isConnect: false
            }
        default:
            return state
        }
}

export default blockchainReducer