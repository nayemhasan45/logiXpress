import React from 'react';
import Banner from '../banner/Banner';
import HowItWorks from '../howItWork/HowItWorks';
import OurServices from '../ourServices/OurServices';
import ClientsMarquee from '../ourClient/ClientsMarquee';
import WhatWeOffer from '../ourBenefits/WhatWeOffer';
import MarchentBanner from '../marchentBanner/MarchentBanner';
import CustomerFeedback from '../customerFeedback/CustomerFeedback';
import FaqSection from '../faqSection/FaqSection';

const Home = () => {
    return (
        <div className='max-w-11/12 mx-auto '>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <ClientsMarquee></ClientsMarquee>
            <WhatWeOffer></WhatWeOffer>
            <MarchentBanner></MarchentBanner>
            <CustomerFeedback></CustomerFeedback>
            <FaqSection></FaqSection>
        </div>
    );
};

export default Home;