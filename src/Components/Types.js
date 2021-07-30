import { Heading, Text } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import './Types.css';
import AOS from 'aos';
import 'aos/dist/aos.css'

const Types = () => {
    useEffect(() => {
        AOS.init({ duration: 700 })
    }, [])
    return (
        <div className="types" data-aos="fade-up">
            <Heading className="h1 center" mb="20" padding="10" size="lg" mt="32">Types of Properties you can post here</Heading>

            <div className="timeline">
                <div className="container left">
                    <div className="content" data-aos="fade-up">
                        <Text>House</Text>
                    </div>
                </div>
                <div className="container right" data-aos="fade-up">
                    <div className="content">
                        <Text>Flats</Text>
                    </div>
                </div>
                <div className="container left" data-aos="fade-up">
                    <div className="content">
                        <Text>Farm House</Text>
                    </div>
                </div>
                <div className="container right" data-aos="fade-up">
                    <div className="content">
                        <Text>Villa</Text>
                    </div>
                </div>
                <div className="container left" data-aos="fade-up">
                    <div className="content">
                        <Text>Land</Text>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Types
