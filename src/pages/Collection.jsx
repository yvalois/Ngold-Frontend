    import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../components/pagetitle/PageTitle';

import img1 from '../assets/images/collection/banner-collection.jpg'
import img2 from '../assets/images/collection/img-banner-collection.png'
import { Link } from 'react-router-dom';
import HotPick4 from '../components/hotpick/HotPick4';
import dataHotpick from '../assets/fake-data/data-hotpick';
import logo_elf from '../assets/images/logo/logo_elf.png';
import logo2_elf from '../assets/images/logo/logo2_white.png';

import banner_elf from '../assets/images/collection/Banner.jpg';


Collection.propTypes = {
    
};

function Collection(props) {



    return (
        <div className='page-collection'>
            <PageTitle sub='Explore' title='Inventario ' />

            <section className="tf-banner-collection">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="banner-collection-inner">
                                <img src={banner_elf} alt="Binasea" className="img-bg" />
                                <img src={logo_elf} alt="Binasea" className="img-banner" />
                                {/* <div className="button-top">
                                    <Link to="#" className="btn-wishlish"><i className="fas fa-heart"></i> Add to Wishlist</Link>
                                    <Link to="#" className="btn-collect"><i className="fas fa-long-arrow-right"></i></Link>
                                    <div className="btn-option"><i className="fas fa-ellipsis-h"></i>
                                        <div className="option_popup">
                                            <Link to="#">Delete</Link>
                                            <Link to="#">Edit</Link>
                                        </div>
                                    </div>

                                </div> */}
                            </div>
                            
                            <div className="tf-heading style-5">
                                <h2 className="heading">Golden Elf</h2>
                                <p className="sub-heading">@Golden_Elf</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
                
            <HotPick4 data={dataHotpick} />
            
        </div>
    );
}

export default Collection;