import React , {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../components/pagetitle/PageTitle';
import { Link } from 'react-router-dom';
import img1 from '../assets/images/item-details.jpg'
import avt1 from '../assets/images/author/author-detail-3.png'
import data from '../assets/fake-data/data-hotpick'
import icon1 from '../assets/images/icon/rain1.svg'
import icon2 from '../assets/images/icon/rain2.svg'
import icon3 from '../assets/images/icon/ethe.svg'
import CardModal from '../components/layouts/CardModal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import avtd1 from '../assets/images/author/author-detail-1.png'
import avtd2 from '../assets/images/author/author-detail-2.png'
import avtd3 from '../assets/images/author/authour-bid-1.png'
import avtd4 from '../assets/images/author/authour-bid-2.png'
import avtd5 from '../assets/images/author/authour-bid-3.png'
import avtd6 from '../assets/images/author/author-history-1.jpg'
import avtd7 from '../assets/images/author/author-history-2.jpg'
import StakingModal from '../components/layouts/StakingModal';

ItemDetails01.propTypes = {
    
};

function ItemDetails01(props) {
    const [modalShow, setModalShow] = useState(false);
    const [nft, setNft] = useState({
        nombre: "",
        id:0,
        descripcion:"",
        image:""
    })
    const [tabDetails] = useState([

        {
            id: 1,
            heading : 'Creator',
            avt: avtd2,
            name: 'Nosotros'
        }
    ])
    
    useEffect(() => {
        const token = window.localStorage.getItem('Nft');
        setNft(JSON.parse(token))
    }, [])
    
    return (
        <div>

            <PageTitle sub='Explore' title='Item Details' />

            <section className="tf-item-detail">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-item-detail-inner">  
                                <div className="image">
                                    <img width={"700px"} src={`https://silver-technical-koi-106.mypinata.cloud/ipfs/QmfHjwZUMgd4AxLMNMCdb9Q6VE1zybSeX3wtdJZ6AvaPjc/${nft.id + 1}.png`} alt="Binasea" />
                                </div>
                                <div className="content">
                                    <h2 className="title-detail">{nft.nombre} #{nft.id}</h2>
                                    <p className="except">A Collection Of 10,000 Undead NFTs Minted On The Ethereum Blockchain. Each Unique Deadfella Is Randomly Generated From A Combination.</p>

                                    <Tabs className="tf-tab">
                                        <TabList className="menu-tab ">
                                            <Tab className="tab-title active"><Link to="#">Details</Link></Tab>                                            
                                        </TabList>

                                        <TabPanel >
                                            <div className="tab-details">
                                                    <div className="top">

                                                        {
                                                            tabDetails.map(idx => (
                                                                <div key={idx.id} className="author">
                                                                    <div className="heading">{idx.heading}</div>
                                                                    <div className="infor">
                                                                        <img src={idx.avt} alt="Binasea" />
                                                                        <h6 className="name">{idx.name}</h6>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
  
                                                    </div>
                                                    <div className="title-propepties">Properties</div>
                                                    <ul className="properties">
                                                        <li><Link to="#"><svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 11.375L1.09375 7.53125L0 8.375L6 13.0312L12 8.375L10.9062 7.53125L6 11.375ZM6 9.65625L10.9062 5.84375L12 5L6 0.34375L0 5L1.09375 5.84375L6 9.65625ZM6 2.03125L9.8125 5L6 7.96875L2.1875 5L6 2.03125Z" fill="white"/>
                                                            </svg>Background: Blue</Link></li>
                                                        <li><Link to="#"><svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.125 8.28125L7.96875 7.21875C8.8125 6.53125 9.375 5.5 9.375 4.34375C9.375 2.3125 7.71875 0.65625 5.71875 0.65625C3.6875 0.65625 2.03125 2.3125 2.03125 4.34375C2.03125 5.75 2.875 7 4.03125 7.59375V9.78125C2.625 9.46875 2.6875 9.46875 2.53125 9.46875C2.1875 9.46875 1.84375 9.625 1.59375 9.875L0.65625 10.8125L4.0625 14.2188C4.34375 14.5 4.75 14.6562 5.15625 14.6562H9.375C10 14.6562 10.5625 14.1875 10.6875 13.5625L11.2188 10.4062C11.3438 9.53125 10.9062 8.6875 10.125 8.28125ZM9.90625 10.1875L9.375 13.3438H5.15625C5.09375 13.3438 5.03125 13.3125 5 13.2812L2.53125 10.8125L5.375 11.4062V4.34375C5.375 4.15625 5.53125 4 5.71875 4C5.90625 4 6.03125 4.15625 6.03125 4.34375V8.34375H7.21875L9.53125 9.5C9.78125 9.625 9.9375 9.90625 9.90625 10.1875ZM3.375 4.34375C3.375 3.03125 4.4375 2 5.71875 2C7 2 8.03125 3.03125 8.03125 4.34375C8.03125 4.96875 7.78125 5.53125 7.375 5.96875V4.34375C7.375 3.40625 6.625 2.65625 5.71875 2.65625C4.78125 2.65625 4.03125 3.40625 4.03125 4.34375V5.96875C3.625 5.53125 3.375 4.96875 3.375 4.34375Z" fill="white"/>
                                                            </svg>Mouth Grade: Fresh</Link></li>
                                                        <li><Link to="#"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.34375 3.65625H7.65625V5H6.34375V3.65625ZM6.34375 6.34375H7.65625V10.3438H6.34375V6.34375ZM7 0.34375C3.3125 0.34375 0.34375 3.3125 0.34375 7C0.34375 10.6875 3.3125 13.6562 7 13.6562C10.6875 13.6562 13.6562 10.6875 13.6562 7C13.6562 3.3125 10.6875 0.34375 7 0.34375ZM7 12.3438C4.0625 12.3438 1.65625 9.9375 1.65625 7C1.65625 4.0625 4.0625 1.65625 7 1.65625C9.9375 1.65625 12.3438 4.0625 12.3438 7C12.3438 9.9375 9.9375 12.3438 7 12.3438Z" fill="white"/>
                                                            </svg>2400 x 2278 px (1.72MB)</Link></li>
                                                        <li><Link to="#"><svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5 5C6.28125 5 7.34375 3.96875 7.34375 2.65625C7.34375 1.375 6.28125 0.34375 5 0.34375C3.71875 0.34375 2.65625 1.375 2.65625 2.65625C2.65625 3.96875 3.71875 5 5 5ZM5 1.65625C5.5625 1.65625 6 2.125 6 2.65625C6 3.21875 5.5625 3.65625 5 3.65625C4.4375 3.65625 4 3.21875 4 2.65625C4 2.125 4.4375 1.65625 5 1.65625ZM5.03125 8.34375H2.1875C2.84375 8 3.96875 7.65625 5 7.65625C5.0625 7.65625 5.15625 7.6875 5.21875 7.6875C5.46875 7.1875 5.84375 6.78125 6.3125 6.46875C5.84375 6.375 5.375 6.34375 5 6.34375C3.4375 6.34375 0.34375 7.125 0.34375 8.65625V9.65625H5V8.65625C5 8.5625 5 8.4375 5.03125 8.34375ZM10 6.65625C8.78125 6.65625 6.34375 7.34375 6.34375 8.65625V9.65625H13.6562V8.65625C13.6562 7.34375 11.2188 6.65625 10 6.65625ZM10.8125 5.46875C11.3125 5.15625 11.6562 4.625 11.6562 4C11.6562 3.09375 10.9062 2.34375 10 2.34375C9.09375 2.34375 8.34375 3.09375 8.34375 4C8.34375 4.625 8.6875 5.15625 9.1875 5.46875C9.4375 5.59375 9.71875 5.65625 10 5.65625C10.2812 5.65625 10.5625 5.59375 10.8125 5.46875Z" fill="white"/>
                                                            </svg>
                                                            Head: Bowlcut</Link></li>
                                                        <li><Link to="#"><svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1.65625 13.6562V8.65625H0.65625V5C0.65625 4.28125 1.28125 3.65625 2 3.65625H4C4.71875 3.65625 5.34375 4.28125 5.34375 5V8.65625H4.34375V13.6562H1.65625ZM10 13.6562V9.65625H12L10.3125 4.59375C10.125 4.03125 9.625 3.65625 9.03125 3.65625H8.96875C8.375 3.65625 7.875 4.03125 7.6875 4.59375L6 9.65625H8V13.6562H10ZM3 3C3.75 3 4.34375 2.40625 4.34375 1.65625C4.34375 0.9375 3.75 0.34375 3 0.34375C2.25 0.34375 1.65625 0.9375 1.65625 1.65625C1.65625 2.40625 2.25 3 3 3ZM9 3C9.75 3 10.3438 2.40625 10.3438 1.65625C10.3438 0.9375 9.75 0.34375 9 0.34375C8.25 0.34375 7.65625 0.9375 7.65625 1.65625C7.65625 2.40625 8.25 3 9 3Z" fill="white"/>
                                                            </svg>
                                                            Body: Red</Link></li>
                                                        <li><Link to="#" className="active">See more</Link></li>
                                                    </ul>
                                                </div>
                                        </TabPanel>

                                    

                            </Tabs> 
         
                                    <div className="content-bottom">
                                        <div className="heading">
                                            <h6>Acciones</h6>
                                        </div>
                                        <div className="button" onClick={()=>setModalShow(true)}>
                                            <Link to="#" className="tf-button" data-toggle="modal" data-target="#popup_bid" >Stakear</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <StakingModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={nft.id}
            />
        </div>
    );
}

export default ItemDetails01;