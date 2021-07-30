import { Heading, Text } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import './Services.css';
import AOS from 'aos';
import 'aos/dist/aos.css'

const Services = () => {
    useEffect(() => {
        AOS.init({ duration: 700 })
    }, [])

    return (
        <div className="services" data-aos="fade-up">

            <Heading className="h1 center" size="lg" mt="5">Our Services</Heading>

            <div className="cards" data-aos="fade-up">
                <div className="card">
                    <div className="top">
                        <img src="/images/rent1.png" alt="Rent" />
                    </div>
                    <div className="bottom">
                        <Heading className="center" fontSize="2xl" color="#514A9D">Rent</Heading>
                        <Text className="center" color="gray" mt="5">Select any property which satisfy your needs and wants.</Text>
                        <Text className="center" color="gray">You can trust us.</Text>
                    </div>
                </div>
                <div className="card" data-aos="fade-up">
                    <div className="top">
                        <img src="/images/buy1.png" alt="Buy" />
                    </div>
                    <div className="bottom">
                        <Heading className="center" fontSize="2xl" color="#514A9D">Buy</Heading>
                        <Text className="center" color="gray" mt="5">All the properties belonged to verified and trusted owners and dealers.</Text>
                        <Text className="center" color="gray">So don't waste your time and grab the opportunity.</Text>
                    </div>
                </div>
                <div className="card" data-aos="fade-up">
                    <div className="top mb2">
                        <img src="/images/sale1.png" alt="Sale" />
                    </div>
                    <div className="bottom">
                        <Heading className="center" fontSize="2xl" color="#514A9D">Sale</Heading>
                        <Text className="center" color="gray" mt="5">List your property at the cost which you will decide.</Text>
                        <Text className="center" color="gray">Give your property in good hands.</Text>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
