
export const contract = () => {
    if (process.env.REACT_APP_PRODUCTION === "development") {
        return (
            {
                BUSD_ADDRESS: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
                NGOLD_ADDRESS: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
                EXCHANGE_ADDRESS: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
                STAKING_ADDRESS: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
                COBRO_ADDRESS: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
                TIENDA_ADDRESS: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
                ELFOS_ADDRESS: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
                RPC_URL: "http://127.0.0.1:8545/",


            }
        )
    }

    if (process.env.REACT_APP_PRODUCTION === "production") {
        return (
            {
                BUSD_ADDRESS: "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7",
                NGOLD_ADDRESS: "0x4bb18aEf2cb6F01703031137eFAaD56b3B99F035",
                EXCHANGE_ADDRESS: "0xf8769b8C4D345b3333958a54f69a32D655eA522A",
                STAKING_ADDRESS: "0x58aeD71a7235D986F2858960F84849a7632B4f5B",
                COBRO_ADDRESS: "0x2Fb9Fb5999667C474c032a966a07Fb94184A3439",
                TIENDA_ADDRESS: "0xFE6d8A839466845a2eC3b1199C925D226b1F398e",
                ELFOS_ADDRESS: "0xFE6d8A839466845a2eC3b1199C925D226b1F398e",
                RPC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',

            }

        )
    }
}


//new exchange 0xd6DDD0d35850E2Fde80C7B1E6599EdC8E434E3Ce

//old exchange 0x1001Fa76BA2880acdC2Ab260713Dbd7E6243c446