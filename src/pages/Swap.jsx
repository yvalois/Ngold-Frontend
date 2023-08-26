import React from 'react';
import PropTypes from 'prop-types';
import Banner07 from '../components/banner/Banner07';
import dataBanner from '../assets/fake-data/data-banner';
import Artis from '../components/artis/Artis';
import dataLiveaution from '../assets/fake-data/data-liveaution';
import dataCollection from '../assets/fake-data/data-collection';
import Collection from '../components/collection/Collection';
import LiveAutions from '../components/liveautions/LiveAuctions';
import HotPick from '../components/hotpick/HotPick';
import dataHotpick from '../assets/fake-data/data-hotpick';
import TopSeller6 from '../components/topseller/TopSeller6';
import dataSeller from '../assets/fake-data/data-topseller';
import Create5 from '../components/create/Create5';

Swap.propTypes = {
    
};

function Swap(props) {
    return (
        <div className='home-6'>

            <div id="page">
                <Banner07 data={dataBanner} />


            </div>
            
        </div>
    );
}

export default Swap;