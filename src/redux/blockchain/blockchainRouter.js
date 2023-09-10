
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
                BUSD_ADDRESS: "0x633DFd65865a887A5077a1Fc188B71f97Bb20C6F",
                NGOLD_ADDRESS: "0xa1B8Ccb6F39F498138637145E4d5992352851f77",
                EXCHANGE_ADDRESS: "0x682b886EdaE22363639C625b33885f34B2852651",
                STAKING_ADDRESS: "0x657A44cdF7E48B8E608900eD9869ba850842071d",
                COBRO_ADDRESS: "0x2Fb9Fb5999667C474c032a966a07Fb94184A3439",
                TIENDA_ADDRESS: "0x559D6cb329A0Ff70F5b4bdE297fa979386172C0d",
                ELFOS_ADDRESS: "0x93902711d15f671a9A3aDaF308E97C0A560b9Bb3",
                POOL_ADDRESS: "0x3833CFBB66623ae0F572F6Aa2184E41C67e6c069",
                RPC_URL: 'https://rpc-mainnet.maticvigil.com',

            }

        )
    }
}


//new exchange 0xd6DDD0d35850E2Fde80C7B1E6599EdC8E434E3Ce

//old exchange 0x1001Fa76BA2880acdC2Ab260713Dbd7E6243c446