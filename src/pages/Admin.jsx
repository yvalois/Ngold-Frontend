import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import CreateProduct from '../components/tienda/CreateProduct'
import Productos from '../components/tienda/Productos'
import CreateCategoria from '../components/tienda/CreateCategoria'
import Ordenes from '../components/tienda/Ordenes'
import Contractos from '../components/tienda/Contractos'
import Pools from '../components/tienda/Pool/Pools';
import Apr from '../components/tienda/Apr';





const AdminProduct = () => {
    return (
        <div className='admin-store'>
            <Tabs className="tf-tab">
                <TabList className="menu-tab ">
                    <Tab className="tab-title"><Link to="#">Crear producto</Link></Tab>
                    <Tab className="tab-title "><Link to="#">Productos</Link></Tab>
                    <Tab className="tab-title "><Link to="#">Categorias</Link></Tab>
                    <Tab className="tab-title "><Link to="#">Ordenes</Link></Tab>
                    <Tab className="tab-title "><Link to="#">Pools</Link></Tab>
                    <Tab className="tab-title "><Link to="#">Contractos</Link></Tab>
                    <Tab className="tab-title "><Link to="#">Apr de Staking</Link></Tab>


                </TabList>
                <TabPanel>
                    <div className='content'>
                        <CreateProduct />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='content'>
                        <Productos/>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='content'>
                        <CreateCategoria/>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='content'>
                        <Ordenes/>
                    </div>
                </TabPanel>
                <TabPanel>
                        <Pools/>
                </TabPanel>
                <TabPanel>
                    <div className='content'>
                        <Contractos/>
                    </div>
                </TabPanel>
                <TabPanel>
                        <Apr/>
                </TabPanel>

            </Tabs>
        </div>
    )
}

export default AdminProduct