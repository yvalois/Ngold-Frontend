import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { FreeMode, Thumbs, Scrollbar, A11y, EffectCoverflow, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import shape1 from '../../assets/images/slider/slider-12.png'
import shape2 from '../../assets/images/slider/slider-13.png'
import shape3 from '../../assets/images/slider/slider-14.png'
import shape4 from '../../assets/images/slider/slider-15.png'
import { Link } from 'react-router-dom';
import ProductCard from '../store/cardProduct/ProductCard'
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'

Banner03.propTypes = {
    data: PropTypes.array,
};

function Banner03(props) {
    const { data } = props;
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [filterSearch, setFilterSearch] = useState('');
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const getProducts = useSelector(state => state.product)
    const state = useSelector(state => state)
    const { products, loading, error, initialLoad } = getProducts
    const [loadedProducts, setLoadedProducts] = useState(products);



    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };



    const filter = () => {
        const filteredProducts = products.filter(product => {
            return product.name.toLowerCase().includes(filterSearch.toLowerCase())
        })
        if (filterSearch === '' || filterSearch === null || filterSearch === undefined || filterSearch === ' ') {
            setLoadedProducts(products)
        } else {
            setLoadedProducts(filteredProducts)
        }
    }

    useEffect(() => {
        filter()
    }, [filterSearch, initialLoad])



    return (
        <section className="tf-slider">

            <div className="search-bar">
                <form id='store-search-bar'>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="store_searchbar"
                        value={filterSearch}
                        onChange={(e) => {
                            setFilterSearch(e.target.value)
                        }}  
                    />
                    <button type="submit">
                        <AiOutlineSearch />
                    </button>
                </form>
            </div>
            <div className='products-container'>
                {loadedProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}

            </div>

            {/* <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="swiper-container slider-home-3">
                            <Swiper
                            style={{
                            "--swiper-navigation-color": "#fff",
                            "--swiper-pagination-color": "#fff",
                            }}
                            loop={true}
                            effect={"coverflow"}
                            grabCursor={true}
                            centeredSlides={true}
                            spaceBetween={0}
                            slidesPerView={3}
                            // autoplay={{
                            //     delay: 2500,
                            //     disableOnInteraction: true,
                            //   }}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 15,
                                depth: 320,
                                modifier: 1,
                                slideShadows: false,
                              }}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[Autoplay, FreeMode, Thumbs , EffectCoverflow]}
                            className=" mySwiper2 slider-thump"
                        >

                            {
                                data.map(idx =>(
                                    <SwiperSlide key={idx.id}>
                                        <img src={idx.img} alt="Binasea"/>
                                    </SwiperSlide>
                                ))
                            }
                   
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={0}
                            slidesPerView={1}
                            freeMode={true}
                            watchSlidesProgress={true}
                            
                            modules={[FreeMode, Thumbs]}
                            className="mySwiper"
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: true,
                              }}
                        >
                            {
                                data.map(idx =>(
                                    <SwiperSlide key={idx.id}>
                                        <div className="tf-slider-item style-3">
                                            <div className="content-inner">
                                                <img src={shape1} alt="Binasea" className="img-star star-1 ani4" />
                                                <img src={shape2} alt="Binasea" className="img-star star-2 ani5" />
                                                <img src={shape3} alt="Binasea" className="img-star star-3 ani4" />
                                                <img src={shape4} alt="Binasea" className="img-star star-4 ani5" />
                                                <h1 className="heading">
                                                    {idx.heading} 
                                                </h1>
                                                <p className="sub-heading">{idx.desc}</p>
                                                <div className="btn-slider ">
                                                    <Link to="/explore-v1" className="tf-button style-6">Explore now</Link>
                                                    <Link to="/create" className="tf-button style-7">Creat</Link>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                            <SwiperSlide>
                                <div className="tf-slider-item style-3">
                                    <div className="content-inner">
                                        <img src="assets/images/slider/slider-12.png" alt="Binasea" className="img-star star-1 ani4" />
                                        <img src="assets/images/slider/slider-13.png" alt="Binasea" className="img-star star-2 ani5" />
                                        <img src="assets/images/slider/slider-14.png" alt="Binasea" className="img-star star-3 ani4" />
                                        <img src="assets/images/slider/slider-15.png" alt="Binasea" className="img-star star-4 ani5" />
                                        <h1 className="heading">
                                            Defind, Collect and Sell Super Rate <span>NFT</span>   
                                        </h1>
                                        <p className="sub-heading">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Integer Nec Odio. Praesent Libero. Sed Cursus Ante Dapibus Diam.</p>
                                        <div className="btn-slider ">
                                            <Link to="/explore-v1" className="tf-button style-6">Explore now</Link>
                                            <Link to="/create" className="tf-button style-7">Creat</Link>
                                        </div>
                                    </div>
                                    
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="tf-slider-item style-3">
                                    <div className="content-inner">
                                        <img src="assets/images/slider/slider-12.png" alt="Binasea" className="img-star star-1 ani4" />
                                        <img src="assets/images/slider/slider-13.png" alt="Binasea" className="img-star star-2 ani5" />
                                        <img src="assets/images/slider/slider-14.png" alt="Binasea" className="img-star star-3 ani4" />
                                        <img src="assets/images/slider/slider-15.png" alt="Binasea" className="img-star star-4 ani5" />
                                        <h1 className="heading">
                                            Defind, Collect and Sell Super Rate <span>NFT</span>   
                                        </h1>
                                        <p className="sub-heading">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Integer Nec Odio. Praesent Libero. Sed Cursus Ante Dapibus Diam.</p>
                                        <div className="btn-slider ">
                                            <Link to="/explore-v1" className="tf-button style-6">Explore now</Link>
                                            <Link to="/create" className="tf-button style-7">Creat</Link>
                                        </div>
                                    </div>
                                    
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="tf-slider-item style-3">
                                    <div className="content-inner">
                                        <img src="assets/images/slider/slider-12.png" alt="Binasea" className="img-star star-1 ani4" />
                                        <img src="assets/images/slider/slider-13.png" alt="Binasea" className="img-star star-2 ani5" />
                                        <img src="assets/images/slider/slider-14.png" alt="Binasea" className="img-star star-3 ani4" />
                                        <img src="assets/images/slider/slider-15.png" alt="Binasea" className="img-star star-4 ani5" />
                                        <h1 className="heading">
                                            Defind, Collect and Sell Super Rate <span>NFT</span>   
                                        </h1>
                                        <p className="sub-heading">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Integer Nec Odio. Praesent Libero. Sed Cursus Ante Dapibus Diam.</p>
                                        <div className="btn-slider ">
                                            <Link to="/explore-v1" className="tf-button style-6">Explore now</Link>
                                            <Link to="/create" className="tf-button style-7">Creat</Link>
                                        </div>
                                    </div>
                                    
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="tf-slider-item style-3">
                                    <div className="content-inner">
                                        <img src="assets/images/slider/slider-12.png" alt="Binasea" className="img-star star-1 ani4" />
                                        <img src="assets/images/slider/slider-13.png" alt="Binasea" className="img-star star-2 ani5" />
                                        <img src="assets/images/slider/slider-14.png" alt="Binasea" className="img-star star-3 ani4" />
                                        <img src="assets/images/slider/slider-15.png" alt="Binasea" className="img-star star-4 ani5" />
                                        <h1 className="heading">
                                            Defind, Collect and Sell Super Rate <span>NFT</span>   
                                        </h1>
                                        <p className="sub-heading">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Integer Nec Odio. Praesent Libero. Sed Cursus Ante Dapibus Diam.</p>
                                        <div className="btn-slider ">
                                            <Link to="/explore-v1" className="tf-button style-6">Explore now</Link>
                                            <Link to="/create" className="tf-button style-7">Creat</Link>
                                        </div>
                                    </div>
                                    
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="tf-slider-item style-3">
                                    <div className="content-inner">
                                        <img src="assets/images/slider/slider-12.png" alt="Binasea" className="img-star star-1 ani4" />
                                        <img src="assets/images/slider/slider-13.png" alt="Binasea" className="img-star star-2 ani5" />
                                        <img src="assets/images/slider/slider-14.png" alt="Binasea" className="img-star star-3 ani4" />
                                        <img src="assets/images/slider/slider-15.png" alt="Binasea" className="img-star star-4 ani5" />
                                        <h1 className="heading">
                                            Defind, Collect and Sell Super Rate <span>NFT</span>   
                                        </h1>
                                        <p className="sub-heading">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Integer Nec Odio. Praesent Libero. Sed Cursus Ante Dapibus Diam.</p>
                                        <div className="btn-slider ">
                                            <Link to="/explore-v1" className="tf-button style-6">Explore now</Link>
                                            <Link to="/create" className="tf-button style-7">Creat</Link>
                                        </div>
                                    </div>
                                    
                                </div>
                            </SwiperSlide>
                        </Swiper>
                            </div>
                        
                        
    
                            
                        </div>
                    </div>
                </div> */}
        </section>
    );
}

export default Banner03;