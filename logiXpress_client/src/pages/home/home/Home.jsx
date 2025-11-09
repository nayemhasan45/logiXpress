import React from 'react';
import Banner from '../banner/Banner';
import HowItWorks from '../howItWork/HowItWorks';
import OurServices from '../ourServices/OurServices';
import ClientsMarquee from '../ourClient/ClientsMarquee';
import WhatWeOffer from '../ourBenefits/WhatWeOffer';
import MarchentBanner from '../marchentBanner/MarchentBanner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <ClientsMarquee></ClientsMarquee>
            <WhatWeOffer></WhatWeOffer>
            <MarchentBanner></MarchentBanner>
        </div>
    );
};

export default Home;