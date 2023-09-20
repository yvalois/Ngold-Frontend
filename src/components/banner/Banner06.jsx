import React from 'react';
import PropTypes from 'prop-types';

import { Navigation, Scrollbar, A11y   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Link } from 'react-router-dom';

import img from '../../assets/images/product/product75.jpg'
import img2 from '../../assets/images/product/product79.jpg'

import icon1 from '../../assets/images/icon/rain1.svg'
import icon2 from '../../assets/images/icon/rain2.svg'
import icon3 from '../../assets/images/icon/ethe.svg'
import avt from '../../assets/images/author/author1.png'
import elfo from '../../assets/images/product/elf_6.jpg'

Banner06.propTypes = {
    
};

function Banner06(props) {
    const {data} = props;
    return (
        <section className="tf-slider">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                        <img src="assets/images/slider/bg-slider-2.png" alt="Binasea" className="img-slider-1" />  
                        {/* <Swiper 
                            modules={[Navigation,  Scrollbar, A11y ]}
                            spaceBetween={0}
                            slidesPerView={1}
                            className="slider-home"
                  
                        >
                        {
                            data.map(idx => (
                                <SwiperSlide key={idx.id}>

                                </SwiperSlide>
                                
                            ))
                        }
                    </Swiper> */}

                    <div className="tf-slider-item style-6">
                                                <div className="content-inner">
                                                    <h1 className="heading">
                                                        Descubre nuestro universo y obten tu <span className='palabra'>NFT.</span>  
                                                    </h1>
                                                    <p className="sub-heading">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Integer Nec Odio. Praesent Libero. Sed </p>
                                                    <div className="btn-slider text-center">
                                                        <Link to="/mint" className="tf-button style-2">Obten tu Golden ELF</Link>
                                                        {/* <Link to="/create" className="tf-button style-9">Creat NFT</Link> */}
                                                    </div>
                                                </div>
                                                <div className="image ani4">

                                                    <div className="sc-product  ">
                                                    <div className="top">
                                                            <Link to="/mint" className="tag">NgoldElf #???</Link>
                                                        </div>
                                                        <div className="features">
                                                            <div className="product-media">
                                                                <img src={elfo} alt="images" />
                                                            </div>
                                                            <div className="featured-countdown">
                                                                <span className="js-countdown" data-timer="55555" data-labels=" ,  h , m , s "></span>
                                                            </div>
                                                            <div className="rain-drop1"><img src={icon1} alt="images" /></div>
                                                            <div className="rain-drop2"><img src={icon2} alt="images" /></div>
                                                        </div>
                                                        <div className="bottom">
                                                            {/* <div className="details-product">
                                                                <div className="author">
                                                                    <div className="avatar">
                                                                        <img src={avt} alt="images" />
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="position">Creator</div>
                                                                        <div className="name"> <Link to="#">Magnus Perry</Link></div>
                                                                    </div>
                                                                </div>
                                                                <div className="bid">
                                                                    <div className="subtitle">Current bid</div>
                                                                    <div className="price">
                                                                        <span className="cash">5 ETH</span><span className="icon"><img src={icon3} alt="images" /></span>
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                            <div className="product-button">
                                                                <Link to="/mint" data-toggle="modal" data-target="/mintpopup_bid" className="tf-button"> <span className="icon-btn-product"></span> Mint</Link>
                                                            </div>
                        
                                                        </div>
                                                    </div>
                                                    <div className="sc-product  ">
                                                    <div className="top">
                                                            <Link to="/mint" className="tag">NgoldElf #???</Link>
                                                        </div>
                                                        <div className="features">
                                                            <div className="product-media">
                                                                <img src={elfo} alt="images" />
                                                            </div>
                                                            <div className="featured-countdown">
                                                                <span className="js-countdown" data-timer="55555" data-labels=" ,  h , m , s "></span>
                                                            </div>
                                                            <div className="rain-drop1"><img src={icon1} alt="images" /></div>
                                                            <div className="rain-drop2"><img src={icon2} alt="images" /></div>
                                                        </div>
                                                        <div className="bottom">
                                                            {/* <div className="details-product">
                                                                <div className="author">
                                                                    <div className="avatar">
                                                                        <img src={avt} alt="images" />
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="position">Creator</div>
                                                                        <div className="name"> <Link to="#">Magnus Perry</Link></div>
                                                                    </div>
                                                                </div>
                                                                <div className="bid">
                                                                    <div className="subtitle">Current bid</div>
                                                                    <div className="price">
                                                                        <span className="cash">5 ETH</span><span className="icon"><img src={icon3} alt="images" /></span>
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                            <div className="product-button">
                                                                <Link to="/mint" data-toggle="modal" data-target="#popup_bid" className="tf-button"> <span className="icon-btn-product"></span> Mint</Link>
                                                            </div>
                        
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                            
                        </div>
                    </div>
                </div>
            </section>
    );
}

export default Banner06;