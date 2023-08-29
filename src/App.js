
import { React, useEffect } from 'react';
import AOS from 'aos';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';

import routes from './pages';
import Page404 from './pages/404';

import '../src/assets/binasea.css';
import '../src/assets/font-awesome.css';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, hardhat,polygon } from 'wagmi/chains'
function App() {


    const chains = [hardhat]

    const projectId = '022ab2b4b6b684c47db3d9b652065c92'
    const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
    const wagmiConfig = createConfig({
        autoConnect: true,
        connectors: w3mConnectors({ projectId, chains }),
        publicClient
    })
    const ethereumClient = new EthereumClient(wagmiConfig, chains);


    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);

    return (
        <>
            <WagmiConfig config={wagmiConfig}>
                <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
                <Header />

                <Routes>

                    {
                        routes.map((data, idx) => (
                            <Route key={idx} path={data.path} element={data.component} exact />
                        ))
                    }

                    <Route path='*' element={<Page404 />} />
                </Routes>

                <Footer />
            </WagmiConfig>
        </>
    );
}

export default App;
