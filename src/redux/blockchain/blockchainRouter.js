
export const contract = () => {
    if (process.env.REACT_APP_PRODUCTION === "development") {
        return (
            {
                BUSD_ADDRESS: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
                NGOLD_ADDRESS: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
                EXCHANGE_ADDRESS: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
                STAKING_ADDRESS: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
                COBRO_ADDRESS: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
                TIENDA_ADDRESS: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
                ELFOS_ADDRESS: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
                POOL_ADDRESS: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
                RPC_URL: "http://127.0.0.1:8545/",
            }
        )
    }

    if (process.env.REACT_APP_PRODUCTION === "production") {
        return (
            {
                BUSD_ADDRESS: "0x4dE51584360e73A3826277D53F275A7A0BfEd637",
                NGOLD_ADDRESS: "0x6d37D81Fe3E02d3AAfa3f21121227660526464B1",
                EXCHANGE_ADDRESS: "0x53BE3630d2188C43D8dfa81991281aadcd7F223a",
                STAKING_ADDRESS: "0xAe0D62Eead13845a375b16e0c8a628A6ea08c9a7",
                COBRO_ADDRESS: "0x2Fb9Fb5999667C474c032a966a07Fb94184A3439",
                TIENDA_ADDRESS: "0x9433d274F8216aCdF75Ec10d7429a0fc2804ee8b",
                ELFOS_ADDRESS: "0x1b4ed61074EDA356bFF681540CF27D77b8EdcF8d",
                POOL_ADDRESS: "0x683b12E8c093AA2D261FC87049f4f5783A6FD136",
                RPC_URL: 'https://rpc-mainnet.maticvigil.com',

            }

        )
    }
}


//new exchange 0xd6DDD0d35850E2Fde80C7B1E6599EdC8E434E3Ce

//old exchange 0x1001Fa76BA2880acdC2Ab260713Dbd7E6243c446