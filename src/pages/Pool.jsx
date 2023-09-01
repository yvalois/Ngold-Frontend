import React from 'react'

import Pools from '../components/pools/publicpools/Pools'
import MyPool from '../components/pools/mypools/MyPool';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';


const Pool = () => {
  return (
    <div className='auth'>
                                        <Tabs className="tf-tab">
                                        <TabList className="menu-tab ">
                                            <Tab className="tab-title"><Link to="#">Pools activos</Link></Tab>
                                            <Tab className="tab-title "><Link to="#">Mis pools</Link></Tab>
                                        </TabList>
                                        <TabPanel>
                                            <div className='content'>
                                                <Pools/>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className='content'>
                                                <MyPool/>
                                            </div>
                                        </TabPanel>
                                        </Tabs> 
    </div>
  )
}

export default Pool