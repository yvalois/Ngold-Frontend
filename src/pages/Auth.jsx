import React from 'react'
import LoginForm from '../components/Login/LoginForm'
import RegisterForm from '../components/Login/RegisterForm'
import Recuperar from '../components/Login/Recuperar'


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';

const Auth = () => {
  return (
    <div className='auth'>
                                        <Tabs className="tf-tab">
                                        <TabList className="menu-tab ">
                                            <Tab className="tab-title"><Link to="#">Sign in</Link></Tab>
                                            <Tab className="tab-title "><Link to="#">Sign Up</Link></Tab>
                                            <Tab className="tab-title "><Link to="#">Forget my password</Link></Tab>
                                        </TabList>
                                        <TabPanel>
                                            <div className='content'>
                                                <LoginForm />
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className='content'>
                                                <RegisterForm />
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className='content'>
                                                <Recuperar />
                                            </div>
                                        </TabPanel>





                                        </Tabs> 
    </div>
  )
}

export default Auth