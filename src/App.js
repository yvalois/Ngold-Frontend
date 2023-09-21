
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
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit"


function App() {


    const chains = [polygon]

    const wagmiConfig = createConfig(
        getDefaultConfig({
          alchemyId: "gS7apTrs7AzWt0gYkd2p9fikCNpPtvNR",
          walletConnectProjectId: "022ab2b4b6b684c47db3d9b652065c92",
          appName: "Ngold",

          chains,
        }),
      );

    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);

    return (
        <>
            <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider>

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
      </ConnectKitProvider>

            </WagmiConfig>
        </>
    );
}

export default App;
