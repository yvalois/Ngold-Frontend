import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import img1 from '../../assets/images/product/product4.jpg'
import img2 from '../../assets/images/product/product5.jpg'
import img3 from '../../assets/images/product/product6.jpg'
import img4 from '../../assets/images/product/product7.jpg'
import img5 from '../../assets/images/product/product8.jpg'
import img6 from '../../assets/images/product/product9.jpg'
import icon11 from '../../assets/images/svg/icon-wallet-1.svg'
import icon22 from '../../assets/images/svg/icon-wallet-2.svg'
import icon33 from '../../assets/images/svg/icon-wallet-3.svg'
import icon4 from '../../assets/images/svg/icon-wallet-4.svg'
import icon5 from '../../assets/images/svg/icon-wallet-5.svg'
import icon6 from '../../assets/images/svg/icon-wallet-6.svg'
import icon7 from '../../assets/images/svg/icon-wallet-7.svg'
import icon8 from '../../assets/images/svg/icon-wallet-8.svg'
import avt1 from '../../assets/images/author/history-at1.jpg'
import avt2 from '../../assets/images/author/history-at2.jpg'
import avt3 from '../../assets/images/author/history-at3.jpg'
import avt4 from '../../assets/images/author/history-at4.jpg'
import avt5 from '../../assets/images/author/history-at5.jpg'
import avt6 from '../../assets/images/author/history-at6.jpg'
import avtf1 from '../../assets/images/author/author-follow1.jpg'
import avtf2 from '../../assets/images/author/author-follow2.jpg'
import avtf3 from '../../assets/images/author/author-follow3.jpg'
import avtf4 from '../../assets/images/author/author-follow4.jpg'
import avtf5 from '../../assets/images/author/author-follow3.jpg'
import avtf6 from '../../assets/images/author/author-follow4.jpg'
import imgp1 from '../../assets/images/product/product27.jpg'
import imgp2 from '../../assets/images/product/product4.jpg'
import imgp3 from '../../assets/images/product/product5.jpg'
import imgp4 from '../../assets/images/product/product9.jpg'
import imgp5 from '../../assets/images/product/product10.jpg'
import imgp6 from '../../assets/images/product/product11.jpg'
import imgp7 from '../../assets/images/product/product6.jpg'
import avtp1 from '../../assets/images/author/avt-fv1.jpg'
import avtp2 from '../../assets/images/author/avt-fv2.jpg'
import avtp3 from '../../assets/images/author/avt-fv3.jpg'
import avtp4 from '../../assets/images/author/avt-fv4.jpg'
import avtp5 from '../../assets/images/author/avt-fv5.jpg'
import avtp6 from '../../assets/images/author/avt-fv6.jpg'
import avtp7 from '../../assets/images/author/avt-fv7.jpg'
import icon1 from '../../assets/images/icon/rain1.svg'
import icon2 from '../../assets/images/icon/rain2.svg'
import icon3 from '../../assets/images/icon/ethe.svg'
import StakingModal from '../layouts/StakingModal';
import { useDispatch, useSelector } from "react-redux";
import { ethers } from 'ethers';
import { useAccount } from 'wagmi'
import Swal from 'sweetalert2';
import { updateBalances } from '../../redux/blockchain/blockchainAction';
import { useNavigate } from 'react-router-dom';

HotPick4.propTypes = {
    data: PropTypes.array,
};

function HotPick4(props) {

    const [modalShow, setModalShow] = useState(false);
    const { data } = props;
    const { stakingContract, accountAddress, ngoldNftBalance, ngoldNftStakingBalance, ngoldContract } = useSelector(state => state.blockchain);
    const { isConnected } = useAccount();
    const [id, setId] = useState(10000);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const navegar = useNavigate();
    const [dataTab] = useState([
        {
            id: 1,
            title: 'Mis Nfts',
            item: 0,
        },
        {
            id: 2,
            title: 'Staking',
            item: 3,
        }

    ]);
    const [dataWallet] = useState([
        {
            id: 1,
            img: icon11,
            cate: '',
            title: 'Meta Mask',
            text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
        {
            id: 2,
            img: icon22,
            cate: 'none',
            title: 'Bitski',
            text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
        {
            id: 3,
            img: icon33,
            cate: '',
            title: 'Wallet Connect',
            text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
        {
            id: 4,
            img: icon4,
            cate: 'none',
            title: 'Coin Base',
            text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
        {
            id: 5,
            img: icon5,
            cate: '',
            title: 'Authereum',
            text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
        {
            id: 6,
            img: icon6,
            cate: '',
            title: 'Kaikas',
            text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
        {
            id: 7,
            img: icon7,
            cate: 'none',
            title: 'Torus',
            text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
        {
            id: 8,
            img: icon8,
            cate: '',
            title: 'Fortmatic',
            text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
        },
    ])
    const manageModal = async (id) => {
        if (modalShow) {
            setModalShow(false);
            setId(10000)
        } else {
            setId(id)
            setModalShow(true);
        }
    }

    const claim = async (id) => {
        setLoading(true)
        try {
            const tx = await stakingContract.claimReward(id, ngoldContract.address)
            await tx.wait();
            dispatch(updateBalances())

            setLoading(false)
            Swal.fire({
                title: 'Success',
                text: 'Claim realizado correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.reason,
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            })
            setLoading(false)
        }
    }

    const withdraw = async (id) => {
        setLoading(true)
        try {
            const tx = await stakingContract.withdraw(id)
            await tx.wait();
            dispatch(updateBalances())
            setLoading(false)
            Swal.fire({
                title: 'Success',
                text: 'Token retirado correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.reason,
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            })
            setLoading(false)
        }
    }

    const setToken = (id)=>{
        let position 
        for (let i = 0; position === undefined; i++){
            if(ngoldNftBalance[i].id === id){
                position = i;
                window.localStorage.setItem('Nft',JSON.stringify(ngoldNftBalance[position]))
                navegar('/item-details-v1')
                break
            }else{
                position = undefined;
            }
        }

    }
    return (
        <section className="tf-section tf-hot-pick tf-filter">
            <div className="tf-container">
                <div className="row ">
                    <div className="col-md-12">
                        <div className="tf-heading style-3 mb26 wow fadeInUp">
                            <h3 className="heading">Hot Sales</h3>
                            <p className="sub-heading">The most creative creator - Based on the last 30 days </p>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <Tabs>
                            <div className="d-flex justify-content-between mb-wr">
                                <TabList>

                                    {
                                        dataTab.map(idx => (
                                            <Tab key={idx.id} className="new-design">{idx.title}</Tab>
                                        ))
                                    }



                                </TabList>
                                {/* <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" className=''>
                                            Recently create    
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                        <Dropdown.Item href="#">
                                            <li><span>Recently Listed</span></li>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <li className="active"><span>Recently Created</span></li>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <li><span>Recently Sold</span></li>
                                        </Dropdown.Item>
                                        
                                        </Dropdown.Menu>
                                    </Dropdown> */}

                            </div>



                            <TabPanel >
                                <div className="row tf-filter-container wow fadeInUp">
                                    {ngoldNftBalance.length > 0 &&
                                        (ngoldNftBalance.map((idx, index) => (
                                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d cyber" key={index} >
                                                <div className="sc-product style2">
                                                    <div className="top">
                                                        <Link to="/item-details-v1" className="tag">{idx.Nombre}</Link>

                                                    </div>
                                                    <div className="bottom">
                                                        <div className="details-product">

                                                        </div>
                                                    </div>
                                                    <div className="features">
                                                        <div className="product-media" onClick={()=>{setToken(idx.id)}}>
                                                            <img src={`https://silver-technical-koi-106.mypinata.cloud/ipfs/QmfHjwZUMgd4AxLMNMCdb9Q6VE1zybSeX3wtdJZ6AvaPjc/${idx.id + 1}.png`} alt="images" />
                                                        </div>
                                                        <div className="rain-drop1"><img src={icon1} alt="images" /></div>
                                                        <div className="rain-drop2"><img src={icon2} alt="images" /></div>
                                                    </div>
                                                    <div className="bottom-style2">

                                                        <div className="product-button">
                                                            <Link to="#" onClick={() => manageModal(idx.id)} data-toggle="modal" data-target="#popup_bid" className="tf-button">Stakear</Link>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )))
                                    }

                                </div>
                            </TabPanel>
                            <div className="overflow-table">
                                <div className="dashboard-content inventory content-tab">
                                    <TabPanel>
                                    <div className="inner-content inventory">
                                                <h4 className="title-dashboard">Staking</h4>
                                                <div className="table-ranking top">

                                                    <div className="title-ranking">
                                                        <div className="col-rankingg">Token</div>
                                                        <div className="col-rankingg">ID </div>
                                                        <div className="col-rankingg">Blockchain</div>
                                                        <div className="col-rankingg">Proximo pago</div>
                                                        <div className="col-rankingg">Claim reward</div>
                                                        <div className="col-rankingg">Retirar</div>
                                                    </div>

                                                </div>
                                        {ngoldNftStakingBalance.length > 0 &&
                                            (ngoldNftStakingBalance.map(item => (
                                                <div className="table-ranking ">
                                                    <div className="content-ranking">
                                                        <div className="col-rankingg"><div className="image"><img src={item.image} alt="Binasea" /></div></div>
                                                        <div className="col-rankingg">{item.id}</div>
                                                        <div className="col-rankingg coin">
                                                            Polygon</div>
                                                        <div className="col-rankingg">{item.currentReward} Ngold</div>
                                                        <div className="col-rankingg ">
                                                            {!loading && <div className='nofication2' onClick={() => claim(item.id)}>
                                                                <i className="fas fa-circle"></i> Reclamar
                                                            </div>}
                                                            {loading && <div className='nofication2'>
                                                                <i className="fas fa-circle"></i> Cargando
                                                            </div>}


                                                        </div>
                                                        {!loading && <div className="col-rankingg nofication" onClick={() => withdraw(item.id)}> <i className="fas fa-circle"></i>Retirar</div>}
                                                        {loading && <div className="col-rankingg nofication" > <i className="fas fa-circle"></i>Cargando</div>}
                                                    </div>


                                                </div>
                                            )))
                                        }
                                        </div>
                                    </TabPanel>
                                </div>
                            </div>


                        </Tabs>

                    </div>
                </div>
            </div>

            <StakingModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={id}
            />
        </section>
    );
}

export default HotPick4;